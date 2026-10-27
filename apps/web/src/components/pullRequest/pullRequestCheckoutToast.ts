import type { WebTranslate } from "~/i18n/WebI18nContext";

import type { ChangeRequestTerminology } from "@t3tools/client-runtime/source-control-clients";

export function offHeadPullRequestCheckoutToast(terminology: ChangeRequestTerminology) {
  return {
    type: "warning",
    title: "Checked out, but not confirmed on the latest commit",
    description: `This checkout could not be confirmed at the ${terminology.singular}'s latest commit, so its code may differ. Local commits or uncommitted work keep a checkout where it is.`,
  } as const;
}

export function localizedOffHeadPullRequestCheckoutToast(t: WebTranslate) {
  return {
    type: "warning" as const,
    title: t("pullRequests.handoff.checkoutUnconfirmed"),
    description: t("pullRequests.handoff.checkoutUnconfirmedDescription"),
  };
}
