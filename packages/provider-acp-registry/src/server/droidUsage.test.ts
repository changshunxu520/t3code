import { describe, expect, it } from "vite-plus/test";

import { droidSessionUsageRecord } from "./droidUsage.ts";

const AT = 1_794_700_000_000;

describe("droidSessionUsageRecord", () => {
  it("maps a session's own totals with thinking inside output", () => {
    expect(
      droidSessionUsageRecord(
        {
          model: "claude-opus-5-5",
          tokenUsage: {
            inputTokens: 2_106,
            outputTokens: 180_210,
            cacheCreationTokens: 1_546_611,
            cacheReadTokens: 65_954_369,
            thinkingTokens: 60_255,
            factoryCredits: 9_812_834,
          },
        },
        "session-1",
        AT,
      ),
    ).toEqual({
      provider: "droid",
      timestampMs: AT,
      model: "claude-opus-5-5",
      sessionId: "session-1",
      totals: {
        uncachedInputTokens: 2_106,
        cachedInputTokens: 65_954_369,
        cacheCreationTokens: 1_546_611,
        outputTokens: 180_210,
        reasoningTokens: 60_255,
      },
      reportedCostUsd: null,
      speed: "standard",
      dedupeKey: "droid:session-1",
    });
  });

  it("never counts more thinking than output", () => {
    const record = droidSessionUsageRecord(
      { model: "glm-5.2", tokenUsage: { outputTokens: 10, thinkingTokens: 40 } },
      "session-2",
      AT,
    );
    expect(record?.totals.reasoningTokens).toBe(10);
  });

  it.each([
    ["no model", { tokenUsage: { outputTokens: 5 } }],
    ["no token usage", { model: "glm-5.2" }],
    ["only zero counts", { model: "glm-5.2", tokenUsage: { inputTokens: 0, outputTokens: 0 } }],
    ["a non-object file", ["not", "settings"]],
  ])("skips a session with %s", (_name, settings) => {
    expect(droidSessionUsageRecord(settings, "session-3", AT)).toBeNull();
  });
});
