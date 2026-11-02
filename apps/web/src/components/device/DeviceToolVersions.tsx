import type { ReactNode } from "react";
import type { DeviceToolVersions as ToolVersions } from "@t3tools/contracts";
import { InlineButton } from "~/components/ui/button";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "~/components/ui/popover";
import { useI18n } from "~/i18n/WebI18nContext";
import { translateWebMessage, translateWebSource } from "~/i18n/messages";

export function DeviceToolVersions({
  tools,
  action,
  kind,
  owner,
  error,
}: {
  tools: ToolVersions | undefined;
  action?: ReactNode;
  kind?: keyof ToolVersions;
  owner?: string | undefined;
  error?: string | undefined;
}) {
  const { locale, t } = useI18n();
  const tx = (text: string) => translateWebSource(locale, text);
  const selected = kind ? tools?.[kind] : undefined;
  const version =
    selected?.runningVersion ??
    (selected?.installedVersions.includes(selected.requiredVersion)
      ? selected.requiredVersion
      : selected?.installedVersions
          .toSorted((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          .at(-1));
  const label = kind === "hub" ? "Device hub" : "Agent device";
  return (
    <Popover>
      <PopoverTrigger
        aria-label={
          kind
            ? version
              ? t("device.versions.ariaVersion", { label: tx(label), version })
              : t(selected ? "device.versions.ariaNotInstalled" : "device.versions.ariaUnknown", {
                  label: tx(label),
                })
            : undefined
        }
        render={<InlineButton tone="muted" />}
      >
        {kind
          ? version
            ? `v${version}`
            : selected
              ? tx("Not installed")
              : tx("Version unknown")
          : tx(error ? "Versions unavailable" : "Versions")}
      </PopoverTrigger>
      <PopoverPopup align="end" width="md">
        <PopoverTitle>{tx(kind ? label : "Device tools")}</PopoverTitle>
        {tools ? (
          <div className="mt-4 divide-y divide-border/50">
            {(
              [
                ["Device hub", tools.hub],
                ["Agent device", tools.agent],
              ] as const
            )
              .filter(([name]) => !kind || name === label)
              .map(([name, tool]) => (
                <div key={name} className="space-y-2 py-3 first:pt-0 last:pb-0">
                  {!kind ? <p className="text-xs font-medium">{tx(name)}</p> : null}
                  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-xs">
                    <dt className="text-muted-foreground">{tx("Running")}</dt>
                    <dd className="text-right font-mono">
                      {tool.runningVersion ?? tx("Not running")}
                    </dd>
                    <dt className="text-muted-foreground">{tx("Required")}</dt>
                    <dd className="text-right font-mono">{tool.requiredVersion}</dd>
                    <dt className="text-muted-foreground">{tx("Installed")}</dt>
                    <dd className="text-right font-mono break-words">
                      {tool.installedVersions.join(", ") ||
                        translateWebMessage(locale, "common.none")}
                    </dd>
                  </dl>
                </div>
              ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            {tx("Versions have not been checked.")}
          </p>
        )}
        <p className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
          {owner ? t("device.versions.managedBy", { owner }) : ""}
          {tx("Tools update automatically on this host when needed.")}
        </p>
        {error ? (
          <p role="status" className="mt-2 text-xs text-destructive">
            {error}
          </p>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </PopoverPopup>
    </Popover>
  );
}
