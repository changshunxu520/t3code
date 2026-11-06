import type { EnvironmentSpeechStatus } from "@t3tools/contracts";
import type { ResolvedAppLocale } from "@t3tools/shared/appLocale";
import { effectiveSpeechLanguage } from "@t3tools/shared/speech";
import { readWebI18n } from "~/i18n/readWebI18n";
import { useI18n } from "~/i18n/WebI18nContext";
import { updateClientSettings, useClientSettings } from "../../hooks/useSettings";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "../ui/select";

const languageNames: Record<ResolvedAppLocale, Intl.DisplayNames> = {
  en: new Intl.DisplayNames(["en"], { type: "language" }),
  "zh-CN": new Intl.DisplayNames(["zh-CN"], { type: "language" }),
};
export const languageLabel = (code: string, locale?: ResolvedAppLocale) =>
  languageNames[typeof locale === "string" ? locale : readWebI18n().locale].of(code) ?? code;

type ModelLanguages = Pick<
  Extract<EnvironmentSpeechStatus, { supported: true }>,
  "languages" | "supportsLanguageDetection"
>;

export function SpeechLanguageSelect({ model }: { readonly model: ModelLanguages | null }) {
  const { locale, tx } = useI18n();
  const preference = useClientSettings((settings) => settings.speechLanguage);
  const languages = model?.languages ?? [];
  const resolved = model
    ? effectiveSpeechLanguage(
        { languages, supportsLanguageDetection: model.supportsLanguageDetection ?? false },
        preference,
      )
    : preference;
  const effectiveLabel = resolved === "auto" ? tx("Auto-detect") : languageLabel(resolved, locale);
  const unavailable =
    preference !== "auto" && preference !== resolved
      ? locale === "zh-CN"
        ? `${languageLabel(preference, locale)}不可用`
        : `${languageLabel(preference, locale)} unavailable`
      : null;
  const label = unavailable
    ? `${effectiveLabel} (${unavailable})`
    : preference === "auto" && resolved !== "auto"
      ? `${tx("Auto")} (${effectiveLabel})`
      : effectiveLabel;
  return (
    <Select
      value={preference}
      disabled={!model}
      onValueChange={(value) => {
        if (value) void updateClientSettings({ speechLanguage: value });
      }}
    >
      <SelectTrigger size="sm" aria-label={tx("Transcription language")} className="max-w-64">
        <SelectValue>{label}</SelectValue>
      </SelectTrigger>
      <SelectPopup align="end" alignItemWithTrigger={false}>
        <SelectItem value="auto">{tx("Auto")}</SelectItem>
        {unavailable ? (
          <SelectItem value={preference} disabled>
            {unavailable}
          </SelectItem>
        ) : null}
        {languages
          .toSorted((left, right) =>
            languageLabel(left, locale).localeCompare(languageLabel(right, locale)),
          )
          .map((code) => (
            <SelectItem key={code} value={code}>
              {languageLabel(code, locale)}
            </SelectItem>
          ))}
      </SelectPopup>
    </Select>
  );
}
