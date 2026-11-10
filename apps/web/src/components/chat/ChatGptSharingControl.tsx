import { usesChatGptSharing } from "@t3tools/shared/usageLimits";
import type { ServerProvider } from "@t3tools/contracts";
import { useId } from "react";
import { useI18n } from "~/i18n/WebI18nContext";
import { translateWebSource } from "~/i18n/messages";
import { OpenAI } from "../Icons";
import { ChatGptUsageButton } from "../settings/ChatGptUsageButton";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../ui/tooltip";

const speedNotice =
  "Fast and Ultrafast are unavailable with this ChatGPT connection. Use an existing Codex CLI login for speed options your account supports.";

export function ChatGptSharingControl({ provider }: { provider: ServerProvider | null }) {
  const { locale } = useI18n();
  const tx = (source: string) => translateWebSource(locale, source);
  const speedNoticeId = useId();
  if (!usesChatGptSharing(provider)) return null;
  const localizedSpeedNotice = tx(speedNotice);
  return (
    <div className="flex items-center justify-between gap-4 border-t px-3 py-2">
      <Tooltip>
        <TooltipTrigger
          render={
            <span
              aria-describedby={speedNoticeId}
              tabIndex={0}
              className="flex items-center gap-2 rounded-sm text-xs text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            />
          }
        >
          <OpenAI className="size-3.5" aria-hidden="true" />
          {tx("Using ChatGPT plan")}
        </TooltipTrigger>
        <span id={speedNoticeId} className="sr-only">
          {localizedSpeedNotice}
        </span>
        <TooltipPopup side="top">{localizedSpeedNotice}</TooltipPopup>
      </Tooltip>
      <ChatGptUsageButton size="xs" />
    </div>
  );
}
