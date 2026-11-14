import { FACTORY_DROID_AGENT_ID } from "./droidUsageLimits.ts";
import {
  tokenCount,
  totalTokens,
  type ProviderUsageReader,
  type UsageRecord,
} from "@t3tools/provider-core/server/usage";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Schema from "effect/Schema";

import type { AcpRegistrySettings } from "../settings.ts";

const decodeJson = Schema.decodeUnknownEffect(Schema.fromJsonString(Schema.Unknown));
const SETTINGS_SUFFIX = ".settings.json";
const MAX_SETTINGS_BYTES = 256 * 1024;
const READ_CONCURRENCY = 8;

function object(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

/**
 * Droid keeps only per-session totals in `<session>.settings.json`, so one session becomes one
 * record dated by its last write. A parent's `tokenUsage` excludes its subagents, which have
 * their own session files, so every file counts exactly once.
 */
export function droidSessionUsageRecord(
  settings: unknown,
  sessionId: string,
  timestampMs: number,
): UsageRecord | null {
  const root = object(settings);
  const usage = object(root?.tokenUsage);
  const model = typeof root?.model === "string" ? root.model.trim() : "";
  if (!usage || !model) return null;
  const outputTokens = tokenCount(usage.outputTokens);
  const totals = {
    // Droid reports input without cache reads and writes, like Anthropic.
    uncachedInputTokens: tokenCount(usage.inputTokens),
    cachedInputTokens: tokenCount(usage.cacheReadTokens),
    cacheCreationTokens: tokenCount(usage.cacheCreationTokens),
    outputTokens,
    reasoningTokens: Math.min(tokenCount(usage.thinkingTokens), outputTokens),
  };
  if (totalTokens(totals) === 0) return null;
  return {
    provider: "droid",
    timestampMs,
    model,
    sessionId,
    totals,
    // Droid bills Factory credits, not dollars; shared model pricing estimates the cost.
    reportedCostUsd: null,
    speed: "standard",
    dedupeKey: `droid:${sessionId}`,
  };
}

const readSessionFile = Effect.fn("droidUsage.readSessionFile")(function* (
  file: string,
  sessionId: string,
  retentionCutoffMs: number,
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const info = yield* fileSystem.stat(file);
  const timestampMs = Option.getOrUndefined(Option.map(info.mtime, (date) => date.getTime()));
  if (info.type !== "File" || Number(info.size) > MAX_SETTINGS_BYTES) return null;
  if (timestampMs === undefined || timestampMs < retentionCutoffMs) return null;
  const parsed = yield* decodeJson(yield* fileSystem.readFileString(file));
  return droidSessionUsageRecord(parsed, sessionId, timestampMs);
});

const readDroidSessions = Effect.fn("droidUsage.readSessions")(function* (
  sessionsDir: string,
  retentionCutoffMs: number,
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const projects = yield* fileSystem.readDirectory(sessionsDir);
  let failed = false;
  const candidates: Array<{ readonly file: string; readonly sessionId: string }> = [];
  for (const project of projects) {
    const projectDir = path.join(sessionsDir, project);
    const entries = yield* fileSystem
      .readDirectory(projectDir)
      .pipe(Effect.orElseSucceed((): ReadonlyArray<string> => []));
    for (const entry of entries) {
      if (!entry.endsWith(SETTINGS_SUFFIX)) continue;
      candidates.push({
        file: path.join(projectDir, entry),
        sessionId: entry.slice(0, -SETTINGS_SUFFIX.length),
      });
    }
  }
  const files = yield* Effect.forEach(
    candidates,
    ({ file, sessionId }) =>
      readSessionFile(file, sessionId, retentionCutoffMs).pipe(
        Effect.map((record) => (record === null ? [] : [{ path: file, records: [record] }])),
        Effect.catchCause(() =>
          Effect.sync(() => {
            failed = true;
            return [];
          }),
        ),
      ),
    { concurrency: READ_CONCURRENCY },
  );
  return { files: files.flat(), failed };
});

export type DroidUsageReaderEnv = FileSystem.FileSystem | Path.Path;

export const droidUsageReader: ProviderUsageReader<AcpRegistrySettings, DroidUsageReaderEnv> = {
  kind: "scan",
  provider: "droid",
  scan: Effect.fn("droidUsageReader.scan")(function* ({ instances, retentionCutoffMs }) {
    if (!instances.some((instance) => instance.config?.agentId === FACTORY_DROID_AGENT_ID)) {
      return [];
    }
    const path = yield* Path.Path;
    const dir = path.join(yield* HostProcess.HomeDirectory, ".factory", "sessions");
    const fileSystem = yield* FileSystem.FileSystem;
    if (!(yield* fileSystem.exists(dir).pipe(Effect.orElseSucceed(() => false)))) {
      return [{ dir, files: null }];
    }
    const result = yield* readDroidSessions(dir, retentionCutoffMs).pipe(Effect.result);
    if (result._tag === "Failure") {
      return [
        {
          dir,
          files: null,
          status: "failed" as const,
          message: "Droid history could not be read.",
        },
      ];
    }
    return [
      {
        dir,
        files: result.success.files,
        status: result.success.failed ? ("partial" as const) : ("ok" as const),
        ...(result.success.failed ? { message: "Some Droid sessions could not be read." } : {}),
      },
    ];
  }),
};
