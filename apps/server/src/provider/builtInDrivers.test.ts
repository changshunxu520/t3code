import { UsageProviderKind } from "@t3tools/contracts";
import { describe, expect, it } from "vite-plus/test";

import { BUILT_IN_USAGE_DRIVERS } from "./builtInDrivers.ts";

describe("BUILT_IN_USAGE_DRIVERS", () => {
  it("has a usage reader for every usage provider", () => {
    const providers = BUILT_IN_USAGE_DRIVERS.flatMap((driver) =>
      driver.usage ? [driver.usage.provider] : [],
    );
    expect(providers.toSorted()).toEqual([...UsageProviderKind.literals].toSorted());
  });
});
