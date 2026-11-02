import { Discovery } from "@t3tools/client-runtime/relay";
import type { EnvironmentId } from "@t3tools/contracts";
import { useState } from "react";

import { useRelayEnvironmentDiscovery } from "../../state/environments";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button, InlineButton } from "../ui/button";
import { useT3ConnectAccountPage } from "./T3ConnectAccountPages";
import { useI18n } from "~/i18n/WebI18nContext";
import { translateWebMessage, translateWebSource } from "~/i18n/messages";

export function RemoveT3ConnectEnvironmentDialog({
  environmentLabel,
  environmentId,
  onCancel,
  onConfirm,
}: {
  readonly environmentLabel: string | null;
  readonly environmentId: EnvironmentId | null;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}) {
  const { locale, t } = useI18n();
  const tr = (text: string) => translateWebSource(locale, text);
  const accountPage = useT3ConnectAccountPage();
  const discovery = useRelayEnvironmentDiscovery();
  const registration = environmentId
    ? Discovery.relayEnvironmentRegistration(discovery, environmentId)
    : "unknown";
  const [shown, setShown] = useState({ label: environmentLabel, registration });
  if (
    environmentLabel !== null &&
    (environmentLabel !== shown.label || registration !== shown.registration)
  ) {
    setShown({ label: environmentLabel, registration });
  }
  const openAccountPage = accountPage.open;
  const accountPageLink = openAccountPage ? (
    <InlineButton
      onClick={() => {
        onCancel();
        openAccountPage();
      }}
    >
      {tr("T3 Connect settings")}
    </InlineButton>
  ) : (
    tr("T3 Connect settings")
  );

  return (
    <>
      <AlertDialog
        open={environmentLabel !== null}
        onOpenChange={(open) => {
          if (!open) onCancel();
        }}
      >
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("clerk.removeEnvironmentTitle", { label: shown.label ?? "" })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {tr("This forgets its pairing, credentials, and cached threads here.")}
            </AlertDialogDescription>
            <AlertDialogDescription>
              {shown.registration === "registered" ? (
                <>
                  {tr(
                    "It stays on your T3 Connect account and keeps its host space. Deregister it in",
                  )}{" "}
                  {accountPageLink} {tr("to free it.")}
                </>
              ) : shown.registration === "unregistered" ? (
                tr("It's no longer on your T3 Connect account.")
              ) : (
                <>
                  {tr("This doesn't change your T3 Connect account. To deregister it there, use")}{" "}
                  {accountPageLink}.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="outline" />}>
              {translateWebMessage(locale, "common.cancel")}
            </AlertDialogClose>
            <Button variant="destructive" onClick={onConfirm}>
              {tr("Remove from this device")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
      {accountPage.portals}
    </>
  );
}
