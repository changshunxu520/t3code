import type { AppLocalePreference } from "@t3tools/contracts/settings";
import type { ResolvedAppLocale } from "@t3tools/shared/appLocale";
import { createContext, useContext } from "react";

import {
  translateWebMessage,
  translateWebSource,
  type WebMessageKey,
  type WebMessageValues,
} from "./messages";

export type WebTranslate = (key: WebMessageKey, values?: WebMessageValues) => string;

export interface WebI18nContextValue {
  readonly locale: ResolvedAppLocale;
  readonly appLocale: AppLocalePreference;
  readonly setAppLocale: (locale: AppLocalePreference) => void;
  readonly t: WebTranslate;
  readonly tx?: (source: string) => string;
}

interface UseWebI18nResult extends WebI18nContextValue {
  readonly tx: (source: string) => string;
}

const translateEnglish: WebTranslate = (key, values) => translateWebMessage("en", key, values);
const translateEnglishSource = (source: string) => translateWebSource("en", source);
const noopSetAppLocale = (_locale: AppLocalePreference) => undefined;

export const WebI18nContext = createContext<WebI18nContextValue>({
  locale: "en",
  appLocale: "system",
  setAppLocale: noopSetAppLocale,
  t: translateEnglish,
  tx: translateEnglishSource,
});

/** Read locale state without importing the settings store or connection runtime. */
export function useI18n(): UseWebI18nResult {
  const context = useContext(WebI18nContext);
  return {
    ...context,
    tx: context.tx ?? ((source: string) => translateWebSource(context.locale, source)),
  };
}

export function splitWebTranslation(
  t: WebTranslate,
  key: WebMessageKey,
  placeholder: string,
  values: WebMessageValues = {},
): readonly [before: string, after: string] {
  const marker = `\u0000t3-${placeholder}\u0000`;
  const message = t(key, { ...values, [placeholder]: marker });
  const markerIndex = message.indexOf(marker);
  return markerIndex === -1
    ? [message, ""]
    : [message.slice(0, markerIndex), message.slice(markerIndex + marker.length)];
}
