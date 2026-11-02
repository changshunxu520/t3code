import { type ProviderInstanceId, type ServerProvider } from "@t3tools/contracts";
import { memo } from "react";
import { InfoIcon, XIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../ui/alert";
import { Button, InlineButton } from "../ui/button";
import { formatProviderDriverKindLabel } from "../../providerModels";
import { useI18n } from "~/i18n/WebI18nContext";
import { translateWebSource, type WebLocale } from "~/i18n/messages";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../ui/tooltip";

function getIncompatibleVersion(status: ServerProvider) {
  const compatibility = status.compatibilityAdvisory;
  if (status.status === "error" && status.auth.status === "unauthenticated") return null;
  return compatibility?.status === "broken" ||
    (status.status === "ready" && compatibility?.status === "unsupported")
    ? compatibility
    : null;
}

export function getProviderStatusBannerKey(status: ServerProvider | null): string | null {
  if (!status || status.status === "disabled") return null;
  const incompatible = getIncompatibleVersion(status);
  if (incompatible) {
    return [
      status.instanceId,
      incompatible.status,
      status.version ?? "",
      incompatible.message ?? "",
    ].join("\u0000");
  }
  if (status.status === "ready") return null;
  // Antigravity validates credentials at session start; unknown restart auth is not failure.
  if (
    status.driver === "antigravity" &&
    status.installed &&
    status.status === "warning" &&
    status.auth.status === "unknown"
  ) {
    return null;
  }
  return [status.instanceId, status.status, status.auth.status, status.message ?? ""].join(
    "\u0000",
  );
}

export function shouldShowProviderStatusBanner(
  status: ServerProvider | null,
  dismissedBannerKey: string | null,
): boolean {
  const bannerKey = getProviderStatusBannerKey(status);
  return bannerKey !== null && bannerKey !== dismissedBannerKey;
}

export function hasProviderSetup(status: ServerProvider): boolean {
  return (
    status.driver === "antigravity" ||
    status.setup?.canAuthenticate === true ||
    status.setup?.canInstall === true
  );
}

export function getProviderStatusMessage(status: ServerProvider, locale: WebLocale = "en"): string {
  if (
    status.auth.status !== "unauthenticated" &&
    status.compatibilityAdvisory?.status === "broken" &&
    status.compatibilityAdvisory.message
  ) {
    return status.compatibilityAdvisory.message;
  }
  if (status.message) return status.message;
  const providerName = status.displayName?.trim() || formatProviderDriverKindLabel(status.driver);
  if (!status.installed && hasProviderSetup(status)) {
    const driverLabel = formatProviderDriverKindLabel(status.driver);
    return locale === "zh-CN"
      ? `打开提供商设置以在此环境中安装 ${driverLabel}。`
      : `Open provider setup to install ${driverLabel} on this environment.`;
  }
  if (status.auth.status === "unauthenticated") {
    if (hasProviderSetup(status)) {
      return translateWebSource(
        locale,
        status.driver === "antigravity"
          ? "Open provider setup to sign in with Google."
          : "Open provider setup to sign in.",
      );
    }
    return translateWebSource(locale, "Sign in via the CLI to authenticate again.");
  }
  return status.status === "ready"
    ? translateWebSource(locale, "No models are available for this provider.")
    : status.status === "error"
      ? locale === "zh-CN"
        ? `${providerName} 提供商不可用。`
        : `${providerName} provider is unavailable.`
      : locale === "zh-CN"
        ? `${providerName} 提供商可用性受限。`
        : `${providerName} provider has limited availability.`;
}

export const ProviderStatusBanner = memo(function ProviderStatusBanner({
  onDismiss,
  onOpenProviderSetup,
  status,
}: {
  onDismiss: () => void;
  onOpenProviderSetup?: (instanceId: ProviderInstanceId) => void;
  status: ServerProvider | null;
}) {
  const { locale, t } = useI18n();
  if (!status || getProviderStatusBannerKey(status) === null) {
    return null;
  }

  const providerName = status.displayName?.trim() || formatProviderDriverKindLabel(status.driver);
  const isUnauthenticated = status.status === "error" && status.auth.status === "unauthenticated";
  const incompatible = getIncompatibleVersion(status);
  const title = isUnauthenticated
    ? t("providerStatus.unauthenticatedTitle", { provider: providerName })
    : incompatible
      ? incompatible.status === "broken"
        ? t("providerStatus.brokenVersionTitle", {
            provider: providerName,
            version: status.version ?? "",
          })
        : t("providerStatus.unsupportedVersionTitle", {
            provider: providerName,
            version: status.version ?? "",
          })
      : t("providerStatus.defaultTitle", { provider: providerName });
  const message = incompatible?.message ?? getProviderStatusMessage(status, locale);
  const isWarning =
    incompatible?.status !== "broken" && (status.status === "warning" || incompatible !== null);

  return (
    <div className="pointer-events-auto mx-auto w-fit max-w-[calc(100%-2rem)] pt-3">
      <Alert
        variant={isWarning ? "warning" : "error"}
        role={incompatible && incompatible.status !== "broken" ? "status" : "alert"}
        surface="glass"
        controlAlignment="first-line"
      >
        <InfoIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <Tooltip>
            <TooltipTrigger render={<div className="line-clamp-3" />}>{message}</TooltipTrigger>
            <TooltipPopup side="top" className="whitespace-pre-wrap">
              {message}
            </TooltipPopup>
          </Tooltip>
          {onOpenProviderSetup && hasProviderSetup(status) ? (
            <InlineButton onClick={() => onOpenProviderSetup(status.instanceId)}>
              {translateWebSource(locale, "Open provider setup")}
            </InlineButton>
          ) : null}
        </AlertDescription>
        <AlertAction>
          <Button
            aria-label={t("providerStatus.dismissAria", {
              provider: providerName,
              status: status.status,
            })}
            onClick={onDismiss}
            size="icon-xs"
            variant="ghost-muted"
          >
            <XIcon />
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
});
