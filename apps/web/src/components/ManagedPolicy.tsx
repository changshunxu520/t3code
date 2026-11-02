import type { ManagedPolicySummary } from "@t3tools/contracts";
import { BuildingIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useI18n } from "../i18n/WebI18nContext";
import { translateWebSource, type WebLocale } from "../i18n/messages";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./ui/tooltip";

const CAPABILITY_LABELS_ZH: Readonly<Record<string, string>> = {
  "connecting from other devices": "从其他设备连接",
  "T3 Connect": "使用 T3 Connect",
  "webhook tasks": "创建 Webhook 任务",
  "importing browser cookies": "导入浏览器 Cookie",
};

export function localizeManagedPolicyReason(locale: WebLocale, reason: string): string {
  if (locale !== "zh-CN") return reason;
  const translated = translateWebSource(locale, reason);
  if (translated !== reason) return translated;

  const managedBy = /^Managed by (.+)\.$/.exec(reason);
  if (managedBy) return `由 ${managedBy[1]} 管理。`;

  const nightlyDenied =
    /^(.+) manages T3 Code updates\. Only stable releases can be installed\.$/.exec(reason);
  if (nightlyDenied) return `${nightlyDenied[1]} 管理 T3 Code 更新。仅可安装稳定版。`;

  const updatesManaged = /^(.+) manages T3 Code updates\.$/.exec(reason);
  if (updatesManaged) return `${updatesManaged[1]} 管理 T3 Code 更新。`;

  const telemetryOff = /^(.+) turned off anonymous usage data\.$/.exec(reason);
  if (telemetryOff) return `${telemetryOff[1]} 已关闭匿名用量数据。`;

  const capabilityDenied = /^(.+)'s policy does not allow (.+)\.$/.exec(reason);
  if (capabilityDenied) {
    const cap =
      CAPABILITY_LABELS_ZH[capabilityDenied[2]!] ??
      translateWebSource(locale, capabilityDenied[2]!);
    return `${capabilityDenied[1]} 的策略不允许${cap}。`;
  }

  const runtimeCeiling = /^(.+) limits threads to (.+)\.$/.exec(reason);
  if (runtimeCeiling) {
    const mode = translateWebSource(locale, runtimeCeiling[2]!);
    return `${runtimeCeiling[1]} 将会话权限上限设为“${mode}”。`;
  }

  return reason;
}

/**
 * A control an administrator's policy turns off: shown inert, with the policy's reason on hover
 * and focus. Without a reason it renders the control untouched.
 */
export function ManagedControl({
  reason,
  children,
}: {
  reason: string | undefined;
  children: ReactNode;
}) {
  const { locale } = useI18n();
  if (reason === undefined) return children;
  const localizedReason = localizeManagedPolicyReason(locale, reason);
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            tabIndex={0}
            role="group"
            aria-disabled="true"
            aria-label={localizedReason}
            className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          />
        }
      >
        <span inert className="inline-flex opacity-50">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipPopup side="top">{localizedReason}</TooltipPopup>
    </Tooltip>
  );
}

/** One line of policy text with the building mark, for places a whole feature is managed. */
export function ManagedNotice({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-muted-foreground text-xs leading-relaxed">
      <BuildingIcon aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** "This environment is managed by <organization>", linking the support page when there is one. */
export function ManagedByOrganization({ policy }: { policy: ManagedPolicySummary }) {
  const { locale } = useI18n();
  return (
    <ManagedNotice>
      {locale === "zh-CN"
        ? `此环境由 ${policy.organization} 管理。`
        : `This environment is managed by ${policy.organization}.`}
      {policy.supportUrl ? (
        <>
          {" "}
          <a
            href={policy.supportUrl}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            {translateWebSource(locale, "Get help")}
          </a>
        </>
      ) : null}
    </ManagedNotice>
  );
}
