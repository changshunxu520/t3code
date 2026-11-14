// @effect-diagnostics nodeBuiltinImport:off -- the fixture encrypts with Factory's AES-256-GCM format.
import * as NodeCrypto from "node:crypto";

import { describe, expect, it } from "vite-plus/test";

import { decryptDroidCredentialFile, droidBillingLimitsToUsageLimits } from "./droidUsageLimits.ts";

const CHECKED_AT = "2026-11-14T08:00:00.000Z";

function encrypt(value: unknown, key: Uint8Array): string {
  const iv = NodeCrypto.randomBytes(16);
  const cipher = NodeCrypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), ciphertext].map((part) => part.toString("base64")).join(":");
}

describe("decryptDroidCredentialFile", () => {
  const key = NodeCrypto.randomBytes(32);
  const credential = { access_token: "token", active_organization_id: "org", region: "eu" };

  it("reads Factory's iv:authTag:ciphertext file", () => {
    expect(decryptDroidCredentialFile(encrypt(credential, key), key)).toEqual(credential);
  });

  it.each([
    ["a different key", encrypt(credential, key), NodeCrypto.randomBytes(32)],
    ["a short key", encrypt(credential, key), NodeCrypto.randomBytes(16)],
    [
      "a tampered tag",
      encrypt(credential, key).replace(/:[^:]+:/, ":AAAAAAAAAAAAAAAAAAAAAA==:"),
      key,
    ],
    ["a malformed file", "not-a-credential", key],
  ])("returns nothing for %s", (_name, contents, candidate) => {
    expect(decryptDroidCredentialFile(contents, candidate)).toBeUndefined();
  });
});

describe("droidBillingLimitsToUsageLimits", () => {
  it("maps standard and Core windows with their resets", () => {
    const limits = droidBillingLimitsToUsageLimits(
      {
        usesTokenRateLimitsBilling: true,
        limits: {
          standard: {
            fiveHour: { usedPercent: 12.5, windowEnd: "2026-11-14T10:00:00Z" },
            weekly: { usedPercent: 140, windowEnd: 1_794_700_000_000 },
            monthly: { usedPercent: null },
          },
          core: { weekly: { usedPercent: 3 } },
        },
      },
      CHECKED_AT,
    );
    expect(limits).toEqual({
      checkedAt: CHECKED_AT,
      windows: [
        {
          id: "droid-fiveHour",
          kind: "session",
          label: "5-hour",
          usedPercent: 12.5,
          windowDurationMins: 300,
          resetsAt: "2026-11-14T10:00:00.000Z",
        },
        {
          id: "droid-weekly",
          kind: "weekly",
          label: "Weekly",
          usedPercent: 100,
          windowDurationMins: 10_080,
          resetsAt: "2026-11-14T23:46:40.000Z",
        },
        {
          id: "droid-weekly-core",
          kind: "weekly",
          label: "Core weekly",
          usedPercent: 3,
          windowDurationMins: 10_080,
        },
      ],
    });
  });

  it.each([
    ["token-rate billing is off", { usesTokenRateLimitsBilling: false, limits: { standard: {} } }],
    ["no standard limits", { limits: {} }],
  ])("reports unsupported when %s", (_name, body) => {
    expect(droidBillingLimitsToUsageLimits(body, CHECKED_AT).unavailable?.reason).toBe(
      "unsupported",
    );
  });
});
