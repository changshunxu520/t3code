// @effect-diagnostics nodeBuiltinImport:off -- Factory's credential file is AES-256-GCM, which needs node:crypto.
// The Factory billing endpoint and CLI credential layout follow Synara's Droid usage reader (MIT).
import * as NodeCrypto from "node:crypto";

import type { ServerProviderUsageLimits, ServerProviderUsageWindow } from "@t3tools/contracts";
import { spawnAndCollect } from "@t3tools/provider-core/server/snapshotProbe";
import {
  clampPercent,
  makeUnavailableUsageLimits,
  makeUsageLimits,
} from "@t3tools/provider-core/server/usageLimits";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as Clock from "effect/Clock";
import * as DateTime from "effect/DateTime";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Ref from "effect/Ref";
import * as Schema from "effect/Schema";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as ChildProcess from "effect/process/ChildProcess";

export const FACTORY_DROID_AGENT_ID = "factory-droid";

const GLOBAL_API_BASE_URL = "https://api.factory.ai";
const EU_API_BASE_URL = "https://api.eu.factory.ai";
const KEYCHAIN_SERVICE = "Factory CLI";
const MAX_CREDENTIAL_BYTES = 64 * 1024;
const FIVE_HOUR_MINS = 5 * 60;
const WEEKLY_MINS = 7 * 24 * 60;
const MONTHLY_MINS = 30 * 24 * 60;

const NullishNumber = Schema.optional(Schema.NullOr(Schema.Number));
const LimitWindow = Schema.Struct({
  usedPercent: NullishNumber,
  windowEnd: Schema.optional(Schema.NullOr(Schema.Union([Schema.String, Schema.Number]))),
});
const LimitGroup = Schema.Struct({
  fiveHour: Schema.optional(Schema.NullOr(LimitWindow)),
  weekly: Schema.optional(Schema.NullOr(LimitWindow)),
  monthly: Schema.optional(Schema.NullOr(LimitWindow)),
});
const BillingLimits = Schema.Struct({
  usesTokenRateLimitsBilling: Schema.optional(Schema.NullOr(Schema.Boolean)),
  limits: Schema.optional(
    Schema.NullOr(
      Schema.Struct({
        standard: Schema.optional(Schema.NullOr(LimitGroup)),
        core: Schema.optional(Schema.NullOr(LimitGroup)),
      }),
    ),
  ),
});
type BillingLimits = typeof BillingLimits.Type;
type LimitGroup = typeof LimitGroup.Type;

const Whoami = Schema.Struct({
  orgId: Schema.optional(Schema.NullOr(Schema.String)),
  region: Schema.optional(Schema.NullOr(Schema.String)),
  isOnPrem: Schema.optional(Schema.NullOr(Schema.Boolean)),
});

const LocalCredential = Schema.Struct({
  access_token: Schema.String,
  active_organization_id: Schema.optional(Schema.NullOr(Schema.String)),
  region: Schema.optional(Schema.NullOr(Schema.String)),
});
const decodeLocalCredential = Schema.decodeUnknownOption(LocalCredential);

interface DroidAuth {
  readonly token: string;
  readonly organizationId?: string | undefined;
  readonly region?: string | undefined;
}

type KeySource = "login-keychain" | "keyring" | "keyfile";

// Newest layout first; a present but unreadable newer store never falls back to an older account.
const CREDENTIAL_LAYOUTS: ReadonlyArray<{ readonly file: string; readonly key: KeySource }> = [
  { file: "auth.v2.loginkeychain", key: "login-keychain" },
  { file: "auth.v2.keyring", key: "keyring" },
  { file: "auth.v2.file", key: "keyfile" },
];

function windowResetsAt(value: string | number | null | undefined): string | undefined {
  if (value === null || value === undefined) return undefined;
  const parsed = DateTime.make(value);
  return Option.isSome(parsed) ? DateTime.formatIso(parsed.value) : undefined;
}

function groupWindows(
  group: LimitGroup | null | undefined,
  prefix: "standard" | "core",
): ReadonlyArray<ServerProviderUsageWindow> {
  if (!group) return [];
  const labelPrefix = prefix === "core" ? "Core " : "";
  const entries = [
    { key: "fiveHour", kind: "session", label: "5-hour", mins: FIVE_HOUR_MINS },
    { key: "weekly", kind: "weekly", label: "weekly", mins: WEEKLY_MINS },
    { key: "monthly", kind: "monthly", label: "monthly", mins: MONTHLY_MINS },
  ] as const;
  return entries.flatMap(({ key, kind, label, mins }) => {
    const window = group[key];
    if (!window || typeof window.usedPercent !== "number") return [];
    const resetsAt = windowResetsAt(window.windowEnd);
    const text = labelPrefix ? `${labelPrefix}${label}` : label[0]!.toUpperCase() + label.slice(1);
    return [
      {
        // Suffixing Core keeps each standard window ahead of its Core twin in id-sorted output.
        id: prefix === "core" ? `droid-${key}-core` : `droid-${key}`,
        kind,
        label: text,
        usedPercent: clampPercent(window.usedPercent),
        windowDurationMins: mins,
        ...(resetsAt ? { resetsAt } : {}),
      },
    ];
  });
}

/** Maps Factory's `/api/billing/limits` body, the data behind Droid's `/limits`. */
export function droidBillingLimitsToUsageLimits(
  body: BillingLimits,
  checkedAt: string,
): ServerProviderUsageLimits {
  const standard = body.limits?.standard;
  if (body.usesTokenRateLimitsBilling === false || !standard) {
    return makeUnavailableUsageLimits({
      checkedAt,
      reason: "unsupported",
      message: "This Factory organization does not expose personal usage limits.",
    });
  }
  const windows = [
    ...groupWindows(standard, "standard"),
    ...groupWindows(body.limits?.core, "core"),
  ];
  return windows.length > 0
    ? makeUsageLimits({ checkedAt, windows })
    : makeUnavailableUsageLimits({ checkedAt, reason: "unsupported" });
}

/** Factory stores `base64(iv):base64(authTag):base64(ciphertext)` under a 32-byte key. */
export function decryptDroidCredentialFile(contents: string, key: Uint8Array): unknown {
  if (key.length !== 32 || contents.length > MAX_CREDENTIAL_BYTES) return undefined;
  const parts = contents.trim().split(":");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) return undefined;
  try {
    const [iv, authTag, ciphertext] = parts.map((part) => Buffer.from(part, "base64"));
    if (iv!.length !== 16 || authTag!.length !== 16) return undefined;
    const decipher = NodeCrypto.createDecipheriv("aes-256-gcm", key, iv!);
    decipher.setAuthTag(authTag!);
    const plaintext = Buffer.concat([decipher.update(ciphertext!), decipher.final()]);
    return JSON.parse(plaintext.toString("utf8"));
  } catch {
    return undefined;
  }
}

function decodeEncryptionKey(text: string): Uint8Array | undefined {
  const trimmed = text.trim();
  if (!/^[A-Za-z0-9+/]{43}=$/u.test(trimmed)) return undefined;
  const key = Buffer.from(trimmed, "base64");
  return key.length === 32 ? key : undefined;
}

function jwtExpiresAtMs(token: string): number | undefined {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8"),
    );
    return typeof payload?.exp === "number" ? payload.exp * 1_000 : undefined;
  } catch {
    return undefined;
  }
}

function apiBaseUrl(region: string | undefined): string {
  return region?.toLowerCase() === "eu" ? EU_API_BASE_URL : GLOBAL_API_BASE_URL;
}

class DroidUsageUnavailable extends Schema.TaggedError<DroidUsageUnavailable>()(
  "DroidUsageUnavailable",
  { reason: Schema.Literals(["unsupported", "probeFailed"]), message: Schema.String },
) {}

const unavailable = (reason: "unsupported" | "probeFailed", message: string) =>
  new DroidUsageUnavailable({ reason, message });

/**
 * Reads Droid usage limits on the host running T3. Credentials are read only; the encryption
 * key is cached after the first keychain read, and a refused keychain prompt is not repeated.
 */
export const makeDroidUsageLimitsReader = Effect.fn("makeDroidUsageLimitsReader")(function* (
  environment: NodeJS.ProcessEnv,
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const homeDirectory = yield* HostProcess.HomeDirectory;
  const platform = yield* HostProcess.Platform;
  const httpClient = yield* Effect.serviceOption(HttpClient.HttpClient);
  const cachedKey = yield* Ref.make<
    Option.Option<{ readonly source: KeySource; readonly key: Uint8Array } | "denied">
  >(Option.none());
  const factoryHome = path.join(homeDirectory, ".factory");

  const readSecureKey = Effect.fn("DroidUsageLimits.readSecureKey")(function* (
    source: "login-keychain" | "keyring",
  ) {
    const cached = yield* Ref.get(cachedKey);
    if (Option.isSome(cached)) {
      if (cached.value === "denied") {
        return yield* unavailable("probeFailed", "Keychain access to the Droid login was refused.");
      }
      if (cached.value.source === source) return cached.value.key;
    }
    const account =
      source === "login-keychain" ? "auth-encryption-key-security-cli" : "auth-encryption-key";
    // Only the OS key utility runs, with no inherited environment that could carry API keys.
    const baseEnv = { HOME: homeDirectory, PATH: "/usr/bin:/bin" };
    const spawn =
      platform === "darwin"
        ? {
            executable: "/usr/bin/security",
            args: ["find-generic-password", "-s", KEYCHAIN_SERVICE, "-a", account, "-w"],
            env: baseEnv,
          }
        : platform === "linux" && source === "keyring"
          ? {
              executable: "/usr/bin/secret-tool",
              args: ["lookup", "service", KEYCHAIN_SERVICE, "account", account],
              env: {
                ...baseEnv,
                ...(environment.DBUS_SESSION_BUS_ADDRESS
                  ? { DBUS_SESSION_BUS_ADDRESS: environment.DBUS_SESSION_BUS_ADDRESS }
                  : {}),
                ...(environment.XDG_RUNTIME_DIR
                  ? { XDG_RUNTIME_DIR: environment.XDG_RUNTIME_DIR }
                  : {}),
              },
            }
          : undefined;
    if (spawn === undefined) {
      return yield* unavailable(
        "unsupported",
        "Droid usage needs FACTORY_API_KEY on this platform.",
      );
    }
    const command = ChildProcess.make(spawn.executable, spawn.args, {
      env: spawn.env,
      extendEnv: false,
    });
    // Never surface the command's output in errors: stdout is the key itself.
    const result = yield* spawnAndCollect(spawn.executable, command).pipe(
      Effect.timeout("60 seconds"),
      Effect.mapError(() => unavailable("probeFailed", "Could not read the Droid login key.")),
    );
    const key = result.code === 0 ? decodeEncryptionKey(result.stdout) : undefined;
    if (key === undefined) {
      yield* Ref.set(cachedKey, Option.some("denied" as const));
      return yield* unavailable("probeFailed", "Keychain access to the Droid login was refused.");
    }
    yield* Ref.set(cachedKey, Option.some({ source, key }));
    return key;
  });

  const readTextFile = Effect.fn("DroidUsageLimits.readTextFile")(function* (file: string) {
    const notReadable = () => unavailable("probeFailed", "The Droid login file is not readable.");
    const info = yield* fileSystem.stat(file).pipe(Effect.mapError(notReadable));
    if (info.type !== "File" || Number(info.size) > MAX_CREDENTIAL_BYTES) {
      return yield* notReadable();
    }
    return yield* fileSystem.readFileString(file).pipe(Effect.mapError(notReadable));
  });

  const readLocalAuth = Effect.fn("DroidUsageLimits.readLocalAuth")(function* () {
    for (const layout of CREDENTIAL_LAYOUTS) {
      const file = path.join(factoryHome, layout.file);
      if (!(yield* fileSystem.exists(file).pipe(Effect.orElseSucceed(() => false)))) continue;
      const contents = yield* readTextFile(file);
      const key =
        layout.key === "keyfile"
          ? decodeEncryptionKey(yield* readTextFile(path.join(factoryHome, "auth.v2.key")))
          : yield* readSecureKey(layout.key);
      if (key === undefined) {
        return yield* unavailable("probeFailed", "Could not read the Droid login key.");
      }
      const credential = decodeLocalCredential(decryptDroidCredentialFile(contents, key));
      if (Option.isNone(credential)) {
        return yield* unavailable("probeFailed", "Could not read the Droid login.");
      }
      const expiresAt = jwtExpiresAtMs(credential.value.access_token);
      if (expiresAt !== undefined && expiresAt <= (yield* Clock.currentTimeMillis)) {
        return yield* unavailable(
          "probeFailed",
          "The Droid login expired. Run Droid to refresh it.",
        );
      }
      return {
        token: credential.value.access_token,
        organizationId: credential.value.active_organization_id ?? undefined,
        region: credential.value.region ?? undefined,
      } satisfies DroidAuth;
    }
    return yield* unavailable("unsupported", "Sign in to Droid on this machine to see its limits.");
  });

  const getOk = (client: HttpClient.HttpClient, url: string, headers: Record<string, string>) =>
    client
      .execute(HttpClientRequest.get(url).pipe(HttpClientRequest.setHeaders(headers)))
      .pipe(Effect.flatMap(HttpClientResponse.filterStatusOk));

  const readApiKeyAuth = Effect.fn("DroidUsageLimits.readApiKeyAuth")(function* (
    client: HttpClient.HttpClient,
    apiKey: string,
  ) {
    // The key's own organization and region come from whoami, never from a local login.
    const identity = yield* getOk(client, `${GLOBAL_API_BASE_URL}/api/cli/whoami`, {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "X-Factory-Whoami-Extended": "true",
    }).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Whoami)),
      Effect.mapError(() => unavailable("probeFailed", "Factory did not accept FACTORY_API_KEY.")),
    );
    const region = identity.region ?? "global";
    if (!identity.orgId || identity.isOnPrem === true || (region !== "global" && region !== "eu")) {
      return yield* unavailable(
        "unsupported",
        "This Factory account does not expose usage limits.",
      );
    }
    return { token: apiKey, organizationId: identity.orgId, region } satisfies DroidAuth;
  });

  return Effect.gen(function* () {
    const checkedAt = DateTime.formatIso(yield* DateTime.now);
    if (Option.isNone(httpClient)) {
      return makeUnavailableUsageLimits({ checkedAt, reason: "unsupported" });
    }
    const client = httpClient.value;
    return yield* Effect.gen(function* () {
      const apiKey = environment.FACTORY_API_KEY?.trim();
      const auth = apiKey ? yield* readApiKeyAuth(client, apiKey) : yield* readLocalAuth();
      const body = yield* getOk(client, `${apiBaseUrl(auth.region)}/api/billing/limits`, {
        Authorization: `Bearer ${auth.token}`,
        Accept: "application/json",
        "X-Factory-Client": "cli",
        ...(auth.organizationId ? { "X-Factory-Org-Id": auth.organizationId } : {}),
      }).pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(BillingLimits)),
        Effect.mapError(() => unavailable("probeFailed", "Factory did not return usage limits.")),
      );
      return droidBillingLimitsToUsageLimits(body, checkedAt);
    }).pipe(
      Effect.timeout("90 seconds"),
      Effect.catchTags({
        DroidUsageUnavailable: (error) =>
          Effect.succeed(
            makeUnavailableUsageLimits({ checkedAt, reason: error.reason, message: error.message }),
          ),
      }),
      Effect.orElseSucceed(() =>
        makeUnavailableUsageLimits({
          checkedAt,
          reason: "probeFailed",
          message: "Droid could not read usage limits.",
        }),
      ),
    );
  });
});
