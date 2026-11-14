import type { ThreadTitleRegenerationOutcome } from "@t3tools/contracts";
import {
  type AtomCommandResult,
  isAtomCommandInterrupted,
  squashAtomCommandFailure,
} from "@t3tools/client-runtime/state/runtime";

import { readWebI18n } from "~/i18n/readWebI18n";
import { stackedThreadToast } from "./ui/toast";

type TitleRegenerationResult = AtomCommandResult<ThreadTitleRegenerationOutcome | null, unknown>;

function failureMessage(result: TitleRegenerationResult): string | null {
  const { tx } = readWebI18n();
  if (result._tag === "Failure") {
    if (isAtomCommandInterrupted(result)) return null;
    const error = squashAtomCommandFailure(result);
    return error instanceof Error ? error.message : tx("An error occurred.");
  }
  return result.value?.status === "failed"
    ? (result.value.message ?? tx("Title generation failed."))
    : null;
}

function isKept(result: TitleRegenerationResult): boolean {
  return result._tag === "Success" && result.value?.status === "unchanged";
}

export function titleRegenerationToast(results: ReadonlyArray<TitleRegenerationResult>) {
  const { locale, tx } = readWebI18n();
  const failures = results.flatMap((result) => {
    const message = failureMessage(result);
    return message === null ? [] : [message];
  });
  if (failures.length > 0) {
    return stackedThreadToast({
      type: "error",
      title:
        results.length === 1
          ? tx("Failed to regenerate thread title")
          : locale === "zh-CN"
            ? `${failures.length} / ${results.length} 个线程标题重新生成失败`
            : `Failed to regenerate ${failures.length} of ${results.length} thread titles`,
      description: failures[0],
    });
  }
  const kept = results.filter(isKept).length;
  if (kept === 0) return null;
  if (results.length === 1) {
    return stackedThreadToast({
      type: "info",
      title: tx("Title kept"),
      description: tx("The current title already fits this thread."),
    });
  }
  return stackedThreadToast({
    type: "info",
    title:
      kept === results.length
        ? tx("Titles kept")
        : locale === "zh-CN"
          ? `保留了 ${kept} / ${results.length} 个标题`
          : `Kept ${kept} of ${results.length} titles`,
    description:
      kept === results.length
        ? tx("The current titles already fit these threads.")
        : tx("Those titles already fit their threads."),
  });
}
