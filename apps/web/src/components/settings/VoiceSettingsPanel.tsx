import {
  cancelEnvironmentSpeechModelDownload,
  downloadEnvironmentSpeechModel,
  getEnvironmentSpeechModels,
  getEnvironmentSpeechStatus,
  linkEnvironmentSpeechModels,
  removeEnvironmentSpeechModel,
  selectEnvironmentSpeechModel,
  updateEnvironmentSpeechAcceleration,
  updateEnvironmentSpeechModelUnloadTimeout,
} from "@t3tools/client-runtime/voice-input";
import type { PreparedConnection } from "@t3tools/client-runtime/connection";
import { openRouterIcon } from "@t3tools/client-runtime/provider-clients";
import {
  AuthFilesystemReadScope,
  AuthSettingsWriteScope,
  CLOUD_SPEECH_LABELS,
  CloudSpeechProvider,
  DEFAULT_SPEECH_POST_PROCESSING_PROMPT,
  type EnvironmentId,
  type EnvironmentSpeechModel,
  type EnvironmentSpeechStatus,
  type ProjectId,
  ProviderDriverKind,
  type SpeechAcceleration,
  type SpeechBenchmarkTier,
  type SpeechCustomWords,
  type SpeechModelUnloadTimeout,
  type VoiceShortcutMode,
} from "@t3tools/contracts";
import { createModelSelection } from "@t3tools/shared/model";
import { resolveSpeechPostProcessingModelSelection } from "@t3tools/shared/serverSettings";
import { cloudSpeechLanguages } from "@t3tools/shared/speech";
import {
  ArrowDownUpIcon,
  AudioLinesIcon,
  CheckIcon,
  DownloadIcon,
  LanguagesIcon,
  KeyRoundIcon,
  MonitorIcon,
  MicOffIcon,
  MicIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  StarIcon,
  Trash2Icon,
  UnlinkIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useStableCallback } from "~/hooks/useStableCallback";
import { useI18n } from "~/i18n/WebI18nContext";
import { cn } from "~/lib/utils";
import {
  listAudioInputs,
  updateMicrophoneOrder,
  type BrowserMicrophone,
} from "../../speech/browserMicrophones";
import {
  microphoneOrder,
  preferredMicrophoneId,
  rememberMicrophones,
} from "../../speech/microphoneOrder";
import { preferredSpeechLanguages } from "../../speech/preferredSpeechLanguages";
import {
  chooseAudioDestination,
  chooseTranscriptCleanup,
  useCleanupGrant,
} from "../../speech/voiceConsent";
import { updateClientSettings, useClientSettings } from "../../hooks/useSettings";
import { runEnvironmentSpeech } from "../../speech/runEnvironmentSpeech";
import {
  getTextGenerationModelOptionsByInstance,
  resolveAppModelSelectionState,
} from "../../modelSelection";
import { useTextGenerationTargets } from "../../textGenerators";
import { useEnvironmentProviders, useEnvironments } from "../../state/environments";
import { useEnvironmentScope } from "../../state/session";
import { EMPTY_SERVER_PROVIDERS } from "../../state/server";
import {
  useEnvironmentSpeechInput,
  useVoiceTranscriptionDestination,
} from "../../speech/useEnvironmentSpeechInput";
import { ComposerSpeechRecordingPill } from "../chat/ComposerSpeechButton";
import { ProviderModelPicker } from "../chat/ProviderModelPicker";
import { ProviderInstanceIcon } from "../chat/ProviderInstanceIcon";
import { ProviderPackageIcon } from "../chat/ProviderPackageIcon";
import { TraitsPicker } from "../chat/TraitsPicker";
import { VoiceInputSetup } from "../chat/VoiceInputSetup";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSearchInput,
  MenuSeparator,
  MenuTrigger,
} from "../ui/menu";
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { toastManager } from "../ui/toast";
import { MicrophoneOrderList } from "./MicrophoneOrderList";
import { MicrophoneTest } from "./MicrophoneTest";
import { CloudVoiceConfiguration } from "./CloudVoiceConfiguration";
import { ModelBenchmarks, orderSpeechLanguages } from "./SpeechModelComparison";
import { languageLabel, SpeechLanguageSelect } from "./SpeechLanguageSelect";
import { filterSpeechModels, type SpeechModelSort } from "./speechModelBrowser";
import { AdvancedSettings } from "./AdvancedSettings";
import {
  SETTINGS_PICKER_TRIGGER_CLASSNAME,
  SettingsPageContainer,
  SettingsRow,
  SettingsSearchTarget,
  SettingsSection,
} from "./settingsLayout";
import { searchableSetting } from "./settingsSearch";
import { useOptionalSettingsScope, useSettingsScope } from "./SettingsScopeContext";
import { useScopedModelDisabledReason } from "./useScopedModelAvailability";
import { useScopedSettings, useUpdateScopedSettings } from "./useScopedSettings";

const OFF = "off";
function CloudSpeechLogo({ provider }: { provider: CloudSpeechProvider }) {
  if (provider === "openrouter")
    return <ProviderPackageIcon icon={openRouterIcon} aria-hidden className="size-4 shrink-0" />;
  return (
    <ProviderInstanceIcon
      driverKind={ProviderDriverKind.make(provider === "openai" ? "codex" : "grok")}
      displayName={CLOUD_SPEECH_LABELS[provider]}
      iconClassName="size-4"
    />
  );
}
const formatSize = (bytes: number) => `${Math.round(bytes / 1024 / 1024)} MB`;
const SHORTCUT_MODES: Record<VoiceShortcutMode, { label: string; hint: string }> = {
  auto: { label: "Auto", hint: "Tap to toggle, hold to talk" },
  hold: { label: "Hold", hint: "Record while held" },
  toggle: { label: "Toggle", hint: "Tap to start, tap to stop" },
};
const UNLOAD_LABELS: Record<SpeechModelUnloadTimeout, string> = {
  never: "Never",
  immediately: "Immediately",
  min_2: "After 2 minutes",
  min_5: "After 5 minutes",
  min_10: "After 10 minutes",
  min_15: "After 15 minutes",
  hour_1: "After 1 hour",
};
const normalizeTerm = (value: string) => value.replace(/\s+/g, " ").trim().normalize("NFC");
const spellingsOf = (words: SpeechCustomWords) =>
  new Set(
    words.flatMap(({ term, aliases }) =>
      [term, ...aliases].map((spelling) => spelling.toLocaleLowerCase()),
    ),
  );

type ModelCardProps = {
  readonly model: EnvironmentSpeechModel;
  readonly comparisonLanguages: readonly string[];
  readonly benchmarkTier: SpeechBenchmarkTier;
  readonly busy: boolean;
  readonly canCancel: boolean;
  readonly onDownload: () => void;
  readonly onSelect: () => void;
  readonly onCancel: () => void;
  readonly onDelete: () => void;
  readonly testControls?: ReactNode;
  /** Keeps the controls under the text, so a live test never squeezes the model's details. */
  readonly stacked?: boolean;
  readonly children?: ReactNode;
};

function ModelBadge(props: { icon: ReactNode; label: string; tooltip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Badge variant="outline" />}>
        {props.icon}
        {props.label}
      </TooltipTrigger>
      <TooltipPopup side="top">{props.tooltip}</TooltipPopup>
    </Tooltip>
  );
}

function ModelCard(props: ModelCardProps) {
  const { locale, tx } = useI18n();
  const { model } = props;
  const downloading = model.state === "downloading" || model.state === "verifying";
  const progress = model.downloaded === undefined ? 0 : (model.downloaded / model.size) * 100;
  return (
    <div className="@container/model px-3 py-3">
      <div
        className={cn(
          "flex flex-col gap-2.5",
          !props.stacked &&
            "@min-[28rem]/model:flex-row @min-[28rem]/model:items-start @min-[28rem]/model:gap-4",
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-medium leading-5">{model.name}</span>
            {model.recommended ? (
              <ModelBadge
                icon={<StarIcon className="mr-1 size-3" />}
                label={tx("Recommended")}
                tooltip={tx("A good default pick for the languages it covers.")}
              />
            ) : null}
            {model.supportsStreaming ? (
              <ModelBadge
                icon={<AudioLinesIcon className="mr-1 size-3" />}
                label={tx("Live preview")}
                tooltip={tx(
                  "Shows words in your draft as you speak, before the recording finishes.",
                )}
              />
            ) : null}
            {model.supportsTranslation ? (
              <ModelBadge
                icon={<LanguagesIcon className="mr-1 size-3" />}
                label={tx("Translate")}
                tooltip={tx(
                  "Can write English text from speech in another language. Turn on Translate to English to use it.",
                )}
              />
            ) : null}
          </div>
          {model.description ? (
            <p className="mt-0.5 text-xs leading-normal text-muted-foreground">
              {model.description}
            </p>
          ) : null}
          {model.linkedFrom ? (
            <p className="mt-0.5 break-all text-2xs text-muted-foreground">
              {locale === "zh-CN"
                ? `正在使用你的文件：${model.linkedFrom}`
                : `Using your file at ${model.linkedFrom}`}
            </p>
          ) : null}
          <ModelBenchmarks
            model={model}
            languages={props.comparisonLanguages}
            tier={props.benchmarkTier}
            facts={[
              ...(model.languages.length > 1
                ? [
                    locale === "zh-CN"
                      ? `${model.languages.length} 种语言`
                      : `${model.languages.length} languages`,
                  ]
                : model.benchmark
                  ? []
                  : [languageLabel(model.languages[0] ?? "")]),
              formatSize(model.size),
            ]}
          />
          {downloading ? (
            <div className="mt-2">
              <div
                role="progressbar"
                aria-label={
                  locale === "zh-CN" ? `${model.name} 下载进度` : `${model.name} download progress`
                }
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                className="h-1 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full bg-primary transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-2xs text-muted-foreground">
                {model.state === "verifying"
                  ? tx("Verifying download…")
                  : locale === "zh-CN"
                    ? `已下载 ${Math.round(progress)}%`
                    : `${Math.round(progress)}% downloaded`}
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex max-w-full shrink-0 flex-wrap items-center gap-1.5">
          {props.testControls}
          {downloading ? (
            <Button
              size="icon-sm"
              variant="outline"
              aria-label={
                locale === "zh-CN" ? `取消下载 ${model.name}` : `Cancel ${model.name} download`
              }
              disabled={!props.canCancel}
              onClick={props.onCancel}
            >
              <XIcon className="size-3.5" />
            </Button>
          ) : model.state === "downloadable" ? (
            <Button size="sm" variant="outline" disabled={props.busy} onClick={props.onDownload}>
              <DownloadIcon />
              {tx("Download")}
            </Button>
          ) : model.active ? (
            <Button size="sm" variant="secondary" disabled>
              <CheckIcon />
              {tx("Selected")}
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled={props.busy} onClick={props.onSelect}>
              {tx("Use model")}
            </Button>
          )}
          {model.state === "installed" ? (
            <Button
              size="icon-sm"
              variant="outline"
              disabled={props.busy}
              aria-label={
                model.linkedFrom
                  ? locale === "zh-CN"
                    ? `停止使用你的 ${model.name} 文件；该文件将保留在磁盘上`
                    : `Stop using your ${model.name} file; the file stays on disk`
                  : locale === "zh-CN"
                    ? `删除 ${model.name}`
                    : `Delete ${model.name}`
              }
              onClick={props.onDelete}
            >
              {model.linkedFrom ? <UnlinkIcon /> : <Trash2Icon />}
            </Button>
          ) : null}
        </div>
      </div>
      {props.children}
    </div>
  );
}

function DictionaryEditor(props: {
  readonly label: string;
  readonly words: SpeechCustomWords;
  readonly disabled?: boolean;
  readonly onChange: (words: SpeechCustomWords) => void;
}) {
  const { locale, tx } = useI18n();
  const { words, label, disabled = false, onChange } = props;
  const [termDraft, setTermDraft] = useState("");
  const [aliasDraft, setAliasDraft] = useState<{ term: string; value: string } | null>(null);
  const spellings = spellingsOf(words);
  const seen = new Set(spellings);
  const newTerms = termDraft
    .split(/[,\n]/)
    .map(normalizeTerm)
    .filter((term) => {
      const key = term.toLocaleLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const canAddTerm =
    !disabled &&
    newTerms.length > 0 &&
    newTerms.every((term) => term.length <= 50) &&
    words.length + newTerms.length <= 100;
  const addTerm = () => {
    if (!canAddTerm) return;
    onChange([...words, ...newTerms.map((term) => ({ term, aliases: [] }))]);
    setTermDraft("");
  };
  const addAlias = () => {
    if (!aliasDraft) return;
    const value = normalizeTerm(aliasDraft.value);
    if (!value || value.length > 50 || spellings.has(value.toLocaleLowerCase())) return;
    onChange(
      words.map((entry) =>
        entry.term === aliasDraft.term && entry.aliases.length < 8
          ? { term: entry.term, aliases: [...entry.aliases, value] }
          : entry,
      ),
    );
    setAliasDraft(null);
  };
  return (
    <>
      <div className="flex items-start gap-2">
        {/* One line while empty, so a wrapped placeholder never makes the field taller than Add. */}
        <div className="min-w-0 flex-1 [&_textarea]:placeholder-shown:whitespace-nowrap">
          <Textarea
            value={termDraft}
            rows={1}
            maxLength={5_100}
            disabled={disabled}
            placeholder={tx("Add words, separated by commas")}
            aria-label={
              locale === "zh-CN"
                ? `向${label}添加词条或短语`
                : `Add a word or phrase to the ${label}`
            }
            onChange={(event) => setTermDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing || event.keyCode === 229) return;
              if (event.key !== "Enter" || event.shiftKey) return;
              event.preventDefault();
              addTerm();
            }}
          />
        </div>
        <Button type="button" variant="outline" disabled={!canAddTerm} onClick={addTerm}>
          <PlusIcon />
          {tx("Add")}
        </Button>
      </div>
      {words.length > 0 ? (
        <ul
          aria-label={locale === "zh-CN" ? `${label}词条` : `${label} entries`}
          className="mt-2.5 flex flex-col gap-1.5 @min-[32rem]/settings-row:flex-row @min-[32rem]/settings-row:flex-wrap"
        >
          {words.map(({ term, aliases }) => (
            <li
              key={term}
              className="flex items-center gap-1 rounded-md border border-border/60 bg-muted/30 py-0.5 pl-2 pr-0.5 text-xs"
            >
              <span className="font-medium">{term}</span>
              {aliases.length > 0 ? (
                <span className="text-muted-foreground">← {aliases.join(", ")}</span>
              ) : null}
              {aliasDraft?.term === term ? (
                <Input
                  autoFocus
                  value={aliasDraft.value}
                  maxLength={50}
                  aria-label={locale === "zh-CN" ? `${term} 的别名` : `Alias for ${term}`}
                  placeholder={tx("Misspelling")}
                  className="ms-auto w-32"
                  onChange={(event) => setAliasDraft({ term, value: event.target.value })}
                  onBlur={() => setAliasDraft(null)}
                  onKeyDown={(event) => {
                    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
                    if (event.key === "Escape") setAliasDraft(null);
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    addAlias();
                  }}
                />
              ) : (
                <Button
                  type="button"
                  size="xs"
                  variant="ghost-muted"
                  className="ms-auto"
                  disabled={disabled || aliases.length >= 8}
                  aria-label={
                    locale === "zh-CN" ? `为 ${term} 添加别名` : `Add an alias for ${term}`
                  }
                  onClick={() => setAliasDraft({ term, value: "" })}
                >
                  {tx("Alias")}
                </Button>
              )}
              <Button
                type="button"
                size="icon-xs"
                variant="ghost-muted"
                disabled={disabled}
                aria-label={locale === "zh-CN" ? `移除 ${term}` : `Remove ${term}`}
                onClick={() => onChange(words.filter((entry) => entry.term !== term))}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

/** Vocabulary stored on the environment with the project, read by everyone who dictates there. */
function ProjectDictionaryRow() {
  const { locale, tx } = useI18n();
  const scope = useOptionalSettingsScope();
  const words = useScopedSettings((settings) => settings.speechProjectCustomWords);
  const updateScopedSettings = useUpdateScopedSettings();
  if (scope === null) return null;
  const isProjectScope = scope.scope.kind === "project" || scope.scope.kind === "checkout";
  return (
    <SettingsRow
      serverScoped
      settingKeys={["speechProjectCustomWords"]}
      {...searchableSetting("speech-project-dictionary")}
      title={isProjectScope ? tx("Project dictionary") : tx("Shared dictionary")}
      description={
        isProjectScope
          ? locale === "zh-CN"
            ? `供所有在 ${scope.scope.label} 中使用语音听写的人共享。`
            : `Used by everyone who dictates in ${scope.scope.label}.`
          : tx("Used by everyone who dictates on this environment.")
      }
    >
      <div className="mt-3 pb-2">
        <DictionaryEditor
          label={isProjectScope ? tx("project dictionary") : tx("shared dictionary")}
          words={words}
          disabled={scope.connectedEnvironments.length === 0}
          onChange={(next) => updateScopedSettings({ speechProjectCustomWords: next })}
        />
      </div>
    </SettingsRow>
  );
}

/** Cleanup runs on the draft's environment, so its model is an environment setting there. */
function CleanupModelRow() {
  const { tx } = useI18n();
  const { environment, connectedEnvironments } = useSettingsScope();
  const settings = useScopedSettings();
  const updateSettings = useUpdateScopedSettings();
  const providersByEnvironment = useEnvironmentProviders();
  const providers =
    (environment?.serverConfig
      ? providersByEnvironment.get(environment.environmentId)
      : undefined) ?? EMPTY_SERVER_PROVIDERS;
  const targets = useTextGenerationTargets({
    environmentId: environment?.environmentId ?? null,
    settings,
    providers: providers.filter((provider) => provider.supportsTextGeneration !== false),
    projectId: null,
    selections: [
      settings.speechPostProcessingModelSelection,
      settings.textGenerationModelSelection,
    ],
  });
  const textGenerationProviders = targets.providers;
  const instanceEntries = targets.entries;
  const hasProvider = instanceEntries.some((entry) => entry.enabled && entry.isAvailable);
  const dedicated = settings.speechPostProcessingModelSelection !== null;
  const selection = resolveAppModelSelectionState(
    {
      ...settings,
      textGenerationModelSelection: resolveSpeechPostProcessingModelSelection(
        settings,
        textGenerationProviders,
      ),
    },
    textGenerationProviders,
  );
  const modelOptionsByInstance = getTextGenerationModelOptionsByInstance(
    settings,
    textGenerationProviders,
    selection.instanceId,
    selection.model,
  );
  const instanceEntry = instanceEntries.find((entry) => entry.instanceId === selection.instanceId);
  const modelDisabledReason = useScopedModelDisabledReason(settings, instanceEntries, true);
  const setModel = (next: ReturnType<typeof createModelSelection>) => {
    const reason = modelDisabledReason(next.instanceId, next.model);
    if (reason) {
      toastManager.add({
        type: "error",
        title: tx("Cleanup model not saved"),
        description: reason,
      });
      return;
    }
    updateSettings({ speechPostProcessingModelSelection: next });
  };
  return (
    <SettingsRow
      serverScoped
      settingKeys={["speechPostProcessingModelSelection"]}
      {...searchableSetting("speech-post-processing-model")}
      title={tx("Cleanup model")}
      description={tx(
        "Model for transcript cleanup, such as a cheaper or faster one. When disabled, use the text generation model configured for this environment.",
      )}
      control={
        connectedEnvironments.length === 0 ? (
          <span className="text-sm text-muted-foreground">
            {tx("Connect an environment first.")}
          </span>
        ) : (
          <div className="flex min-w-0 flex-wrap items-center gap-2 @min-[32rem]/settings-row:justify-end">
            {dedicated && (!hasProvider || !instanceEntry) ? (
              <span className="text-sm text-muted-foreground">
                {tx("No text generation providers available.")}
              </span>
            ) : null}
            {dedicated && hasProvider && instanceEntry ? (
              <>
                <ProviderModelPicker
                  environmentId={environment?.environmentId ?? null}
                  activeInstanceId={selection.instanceId}
                  model={selection.model}
                  lockedProvider={null}
                  instanceEntries={instanceEntries}
                  modelOptionsByInstance={modelOptionsByInstance}
                  triggerClassName={SETTINGS_PICKER_TRIGGER_CLASSNAME}
                  getModelDisabledReason={modelDisabledReason}
                  onInstanceModelChange={(instanceId, model) =>
                    setModel(createModelSelection(instanceId, model))
                  }
                />
                <TraitsPicker
                  provider={instanceEntry.driverKind}
                  models={instanceEntry.models}
                  model={selection.model}
                  modelOptions={selection.options ?? []}
                  allowPromptInjectedEffort={false}
                  triggerClassName={SETTINGS_PICKER_TRIGGER_CLASSNAME}
                  onModelOptionsChange={(options) =>
                    setModel(createModelSelection(selection.instanceId, selection.model, options))
                  }
                />
              </>
            ) : null}
            <Switch
              checked={dedicated}
              disabled={!dedicated && !hasProvider}
              onCheckedChange={(checked) =>
                updateSettings({
                  speechPostProcessingModelSelection: checked
                    ? createModelSelection(
                        settings.textGenerationModelSelection.instanceId,
                        settings.textGenerationModelSelection.model,
                        settings.textGenerationModelSelection.options,
                      )
                    : null,
                })
              }
              aria-label={tx("Use a separate cleanup model")}
            />
          </div>
        )
      }
    />
  );
}

function useVoiceModels(prepared: PreparedConnection | null) {
  const { tx } = useI18n();
  const canManage = useEnvironmentScope(prepared?.environmentId ?? null, AuthSettingsWriteScope);
  const [models, setModels] = useState<readonly EnvironmentSpeechModel[]>([]);
  const [status, setStatus] = useState<EnvironmentSpeechStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [requestedDownload, setRequestedDownload] = useState<string | null>(null);
  const [actionConnection, setActionConnection] = useState(prepared);
  if (actionConnection !== prepared) {
    setActionConnection(prepared);
    setBusy(false);
    setRequestedDownload(null);
    setModels([]);
    setStatus(null);
  }
  const epoch = useRef(0);
  const refreshRevision = useRef(0);
  const refresh = useStableCallback(
    async (connection: PreparedConnection, mode: "foreground" | "progress") => {
      const current = epoch.current;
      const revision = ++refreshRevision.current;
      try {
        const [nextStatus, nextModels] = await Promise.all([
          runEnvironmentSpeech(getEnvironmentSpeechStatus(connection)),
          runEnvironmentSpeech(getEnvironmentSpeechModels(connection, mode === "foreground")),
        ]);
        if (current !== epoch.current || revision !== refreshRevision.current) return;
        setStatus(nextStatus);
        setModels((previous) => {
          if (mode === "foreground") return nextModels.models;
          const benchmarks = new Map(previous.map((model) => [model.id, model.benchmark]));
          return nextModels.models.map((model) => {
            const benchmark = benchmarks.get(model.id);
            return benchmark ? { ...model, benchmark } : model;
          });
        });
      } catch (error) {
        if (mode === "progress") return;
        if (current !== epoch.current || revision !== refreshRevision.current) return;
        toastManager.add({
          type: "error",
          title: tx("Could not load transcription models"),
          description: error instanceof Error ? error.message : String(error),
        });
      }
    },
  );
  // oxlint-disable-next-line t3code/no-unreasoned-state-sync -- loads the environment's model catalog when its connection becomes available
  useEffect(() => {
    epoch.current += 1;
    if (prepared) void refresh(prepared, "foreground");
    return () => {
      epoch.current += 1;
    };
  }, [prepared, refresh]);
  const downloading =
    requestedDownload !== null ||
    models.some((model) => model.state === "downloading" || model.state === "verifying");
  // oxlint-disable-next-line t3code/no-unreasoned-state-sync -- polls progress while a local request or the environment reports an active download
  useEffect(() => {
    if (!prepared || !downloading) return;
    let cancelled = false;
    let timer: number | undefined;
    const poll = async () => {
      await refresh(prepared, "progress");
      if (!cancelled) timer = window.setTimeout(() => void poll(), 1_000);
    };
    void poll();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [downloading, prepared, refresh]);

  const run = async (label: string, work: () => Promise<unknown>, downloadId?: string) => {
    if (!prepared || !canManage) return;
    const current = epoch.current;
    if (downloadId) setRequestedDownload(downloadId);
    else setBusy(true);
    try {
      await work();
    } catch (error) {
      if (current === epoch.current)
        toastManager.add({
          type: "error",
          title: label,
          description: error instanceof Error ? error.message : String(error),
        });
    }
    if (current === epoch.current) {
      if (downloadId) setRequestedDownload(null);
      else setBusy(false);
      await refresh(prepared, "foreground");
    }
  };
  return {
    models,
    status,
    run,
    controlsDisabled: busy || downloading || !canManage,
    canCancel: canManage && !busy,
    requestedDownload,
  };
}

type VoiceModels = ReturnType<typeof useVoiceModels>;

function AdvancedSpeechSettings({
  prepared,
  catalog,
}: {
  prepared: PreparedConnection;
  catalog: VoiceModels;
}) {
  const { tx } = useI18n();
  const { run, controlsDisabled, status } = catalog;
  if (!status?.supported) return null;
  const supported = status;
  return (
    <AdvancedSettings targetIds={[searchableSetting("speech-hardware").id]}>
      <SettingsRow
        {...searchableSetting("speech-hardware")}
        title={tx("Hardware")}
        description={tx("Auto uses the environment’s GPU when it has one.")}
        control={
          <Select
            value={supported.acceleration}
            disabled={controlsDisabled}
            onValueChange={(value) => {
              if (value)
                void run(tx("Could not change transcription hardware"), () =>
                  runEnvironmentSpeech(
                    updateEnvironmentSpeechAcceleration(prepared, value as SpeechAcceleration),
                  ),
                );
            }}
          >
            <SelectTrigger size="sm" aria-label={tx("Transcription hardware")} className="max-w-72">
              <SelectValue>
                {supported.acceleration === "auto"
                  ? tx("Auto")
                  : supported.acceleration === "cpu"
                    ? "CPU"
                    : (supported.gpuDevices.find(
                        (device) => `gpu:${device.id}` === supported.acceleration,
                      )?.name ?? tx("Selected GPU"))}
              </SelectValue>
            </SelectTrigger>
            <SelectPopup align="end" alignItemWithTrigger={false}>
              <SelectItem value="auto">{tx("Auto")}</SelectItem>
              <SelectItem value="cpu">CPU</SelectItem>
              {supported.gpuDevices.map((device) => (
                <SelectItem key={device.id} value={`gpu:${device.id}`}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        }
      />
      <SettingsRow
        title={tx("Unload model")}
        description={tx("Release the model’s memory on the environment after it sits idle.")}
        control={
          <Select
            value={supported.modelUnloadTimeout}
            disabled={controlsDisabled}
            onValueChange={(value) => {
              if (value)
                void run(tx("Could not change when the model unloads"), () =>
                  runEnvironmentSpeech(
                    updateEnvironmentSpeechModelUnloadTimeout(
                      prepared,
                      value as SpeechModelUnloadTimeout,
                    ),
                  ),
                );
            }}
          >
            <SelectTrigger size="sm" aria-label={tx("Unload model")} className="max-w-72">
              <SelectValue>{tx(UNLOAD_LABELS[supported.modelUnloadTimeout])}</SelectValue>
            </SelectTrigger>
            <SelectPopup align="end" alignItemWithTrigger={false}>
              {(Object.keys(UNLOAD_LABELS) as SpeechModelUnloadTimeout[]).map((timeout) => (
                <SelectItem key={timeout} value={timeout}>
                  {tx(UNLOAD_LABELS[timeout])}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        }
      />
    </AdvancedSettings>
  );
}

function SpeechModelBrowser(props: {
  prepared: PreparedConnection;
  catalog: VoiceModels;
  testEnvironmentId: EnvironmentId;
  projectId: ProjectId | null;
  projectName: string | null;
}) {
  const { locale, tx } = useI18n();
  const {
    prepared,
    catalog: { status, models, run, controlsDisabled, canCancel, requestedDownload },
  } = props;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SpeechModelSort>("recommended");
  const [downloadedOnly, setDownloadedOnly] = useState(false);
  const [existingPath, setExistingPath] = useState("");
  const canReadFiles = useEnvironmentScope(prepared.environmentId, AuthFilesystemReadScope);
  const [languageSearch, setLanguageSearch] = useState("");
  const [selection, setSelection] = useState<string[] | null>(null);
  const [preferred] = useState(preferredSpeechLanguages);
  const supportedLanguages = [...new Set(models.flatMap((model) => model.languages))];
  const defaultLanguage = preferred.find((code) => supportedLanguages.includes(code));
  const selectedLanguages = selection ?? (defaultLanguage ? [defaultLanguage] : []);
  const languages = orderSpeechLanguages(supportedLanguages, preferred);
  const needle = languageSearch.trim().toLocaleLowerCase();
  const visibleLanguages = languages.filter(
    (code) =>
      !needle || code.includes(needle) || languageLabel(code).toLocaleLowerCase().includes(needle),
  );
  const accuracyLanguage = selectedLanguages[0] ?? "en";
  const sortLabels: Record<SpeechModelSort, string> = {
    recommended: tx("Recommended"),
    size: tx("Smallest"),
    accuracy: tx("Most accurate"),
    speed: tx("Fastest"),
  };
  const languagesLabel =
    selectedLanguages.length === 0
      ? tx("All languages")
      : selectedLanguages.map((code) => languageLabel(code)).join(", ");
  const sortedModels = filterSpeechModels(models, {
    search,
    languages: selectedLanguages,
    downloadedOnly,
    sort,
    accuracyLanguage,
    benchmarkTier: status?.supported ? status.benchmarkTier : "accelerated",
  });
  const activeModel = models.find((model) => model.active);
  const renderedModels =
    activeModel && !sortedModels.includes(activeModel)
      ? [activeModel, ...sortedModels]
      : sortedModels;

  if (!status) return null;
  if (!status.supported)
    return (
      <SettingsRow
        {...searchableSetting("speech-models")}
        title={tx("Models")}
        description={
          locale === "zh-CN"
            ? `此环境无法转录音频：${status.reason}。`
            : `This environment can’t transcribe audio: ${status.reason}.`
        }
      />
    );
  return (
    <SettingsRow
      {...searchableSetting("speech-models")}
      title={tx("Models")}
      description={
        locale === "zh-CN"
          ? `等级表示错误率，速度表示每 30 秒音频所需秒数，数据来自 Handy 的 ${status.benchmarkTier === "cpu" ? "CPU" : "GPU"} 基准测试。`
          : `Grades are error rates and speed is seconds per 30 s of audio, from Handy’s benchmark ${status.benchmarkTier === "cpu" ? "CPU" : "GPU"}.`
      }
      className="@container/voice-models"
    >
      <div className="mt-3 flex min-w-0 gap-2">
        <InputGroup className="min-w-0 flex-1 **:[input]:h-9 sm:**:[input]:h-8">
          <InputGroupAddon>
            <SearchIcon aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            aria-label={tx("Search transcription models")}
            placeholder={tx("Search models")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Menu>
          <MenuTrigger
            render={<Button variant="outline" className="max-w-56" />}
            aria-label={
              locale === "zh-CN"
                ? `按语言筛选：${languagesLabel}`
                : `Filter by language: ${languagesLabel}`
            }
          >
            <LanguagesIcon />
            <span className="hidden truncate @min-[34rem]/voice-models:inline">
              {languagesLabel}
            </span>
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuSearchInput
              autoFocus
              aria-label={tx("Search languages")}
              placeholder={tx("Search languages")}
              value={languageSearch}
              onChange={(e) => setLanguageSearch(e.target.value)}
            />
            <div
              role="group"
              aria-label={tx("Browse models by language")}
              className="max-h-72 overflow-y-auto"
            >
              {needle ? null : (
                <MenuCheckboxItem
                  checked={selectedLanguages.length === 0}
                  onCheckedChange={() => setSelection([])}
                >
                  {tx("All languages")}
                </MenuCheckboxItem>
              )}
              {visibleLanguages.map((code) => (
                <MenuCheckboxItem
                  key={code}
                  checked={selectedLanguages.includes(code)}
                  onCheckedChange={() =>
                    setSelection(
                      selectedLanguages.includes(code)
                        ? selectedLanguages.filter((language) => language !== code)
                        : [...selectedLanguages, code],
                    )
                  }
                >
                  {languageLabel(code)}
                </MenuCheckboxItem>
              ))}
              {visibleLanguages.length === 0 && (
                <p className="px-2 py-1.5 text-sm text-muted-foreground">
                  {tx("No languages match.")}
                </p>
              )}
            </div>
          </MenuPopup>
        </Menu>
        <Menu>
          <MenuTrigger
            render={<Button variant="outline" />}
            aria-label={
              locale === "zh-CN"
                ? `排序和筛选模型：${sortLabels[sort]}${downloadedOnly ? "，仅已下载" : ""}`
                : `Sort and filter models: ${sortLabels[sort]}${downloadedOnly ? ", downloaded only" : ""}`
            }
          >
            <ArrowDownUpIcon />
            <span className="hidden @min-[34rem]/voice-models:inline">{sortLabels[sort]}</span>
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuGroup>
              <MenuGroupLabel>{tx("Sort by")}</MenuGroupLabel>
              <MenuRadioGroup
                value={sort}
                onValueChange={(value) => setSort(value as SpeechModelSort)}
              >
                {(Object.keys(sortLabels) as SpeechModelSort[]).map((value) => (
                  <MenuRadioItem key={value} value={value} closeOnClick>
                    <span className="flex items-center justify-between gap-3">
                      {value === "accuracy"
                        ? locale === "zh-CN"
                          ? `在${languageLabel(accuracyLanguage)}中最准确`
                          : `Most accurate in ${languageLabel(accuracyLanguage)}`
                        : sortLabels[value]}
                      <MenuRadioItemIndicator />
                    </span>
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuGroup>
            <MenuSeparator />
            <MenuCheckboxItem checked={downloadedOnly} onCheckedChange={setDownloadedOnly}>
              {tx("Downloaded only")}
            </MenuCheckboxItem>
          </MenuPopup>
        </Menu>
      </div>
      <div
        className="mt-2 mb-2 max-h-96 divide-y divide-border/60 overflow-y-auto rounded-lg border border-border/60"
        role="region"
        aria-label={tx("Transcription models")}
        tabIndex={0}
      >
        {sortedModels.length === 0 && (
          <p className="px-3 py-3 text-sm text-muted-foreground">{tx("No models match.")}</p>
        )}
        {renderedModels.map((model) => {
          const card: ModelCardProps = {
            model:
              model.id === requestedDownload && model.state === "downloadable"
                ? { ...model, state: "downloading" }
                : model,
            busy: controlsDisabled,
            canCancel,
            comparisonLanguages: selectedLanguages,
            benchmarkTier: status.benchmarkTier,
            onDownload: () =>
              void run(
                tx("Could not download the model"),
                () => runEnvironmentSpeech(downloadEnvironmentSpeechModel(prepared, model.id)),
                model.id,
              ),
            onSelect: () =>
              void run(tx("Could not select the model"), () =>
                runEnvironmentSpeech(selectEnvironmentSpeechModel(prepared, model.id)),
              ),
            onCancel: () =>
              void run(tx("Could not cancel the download"), () =>
                runEnvironmentSpeech(cancelEnvironmentSpeechModelDownload(prepared, model.id)),
              ),
            onDelete: () =>
              void run(tx("Could not delete the model"), () =>
                runEnvironmentSpeech(removeEnvironmentSpeechModel(prepared, model.id)),
              ),
          };
          return model.active ? (
            <TranscriptionTest
              key={model.id}
              card={card}
              hidden={!sortedModels.includes(model)}
              environmentId={props.testEnvironmentId}
              projectId={props.projectId}
              projectName={props.projectName}
            />
          ) : (
            <ModelCard key={model.id} {...card} />
          );
        })}
      </div>
      {status.supportsModelLinking && canReadFiles ? (
        <form
          className="mb-2 flex flex-col items-start gap-2 @min-[28rem]/voice-models:flex-row @min-[28rem]/voice-models:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            void run(tx("Could not use a model from that path"), async () => {
              await runEnvironmentSpeech(linkEnvironmentSpeechModels(prepared, existingPath));
              setExistingPath("");
            });
          }}
        >
          <div className="w-full min-w-0 flex-1">
            <Input
              size="compact"
              aria-label={tx("Path to a model file or folder already on this environment")}
              placeholder={tx("Already downloaded elsewhere? Paste the model file or folder path")}
              value={existingPath}
              onChange={(e) => setExistingPath(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            variant="outline"
            disabled={controlsDisabled || !existingPath.trim()}
          >
            {tx("Use existing")}
          </Button>
        </form>
      ) : null}
    </SettingsRow>
  );
}

function TranscriptionTest(props: {
  readonly card: ModelCardProps;
  readonly hidden: boolean;
  readonly environmentId: EnvironmentId;
  readonly projectId: ProjectId | null;
  readonly projectName: string | null;
}) {
  const { tx } = useI18n();
  const [transcript, setTranscript] = useState<string | null>(null);
  const draft = transcript ?? "";
  const [showTranscript, setShowTranscript] = useState(false);
  const draftRef = useRef(draft);
  // oxlint-disable-next-line t3code/no-unreasoned-state-sync -- publishes the committed draft to the asynchronous transcription controller
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);
  const speech = useEnvironmentSpeechInput({
    environmentId: props.environmentId,
    projectId: props.projectId,
    projectName: props.projectName,
    ownerKey: JSON.stringify([props.environmentId, props.projectId]),
    cleanup: false,
    readDraft: () => ({
      text: draftRef.current,
      selection: { start: draftRef.current.length, end: draftRef.current.length },
    }),
    commitDraft: (text) => setTranscript(text),
  });
  return (
    <SettingsSearchTarget {...searchableSetting("transcription-test")} hidden={props.hidden}>
      <ModelCard
        {...props.card}
        stacked={showTranscript}
        testControls={
          <div className="order-last flex min-w-0 max-w-full basis-full items-center gap-1 @min-[28rem]/model:order-none @min-[28rem]/model:basis-auto">
            <ComposerSpeechRecordingPill
              state={speech.state}
              progress={null}
              level={speech.level}
              onStart={() => void speech.start()}
              onStop={() => void speech.stop()}
              onCancel={() => speech.cancel()}
              onSkipPostProcessing={() => speech.skipPostProcessing()}
            />
            {speech.available ? (
              speech.state.phase === "idle" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowTranscript(true);
                    void speech.start();
                  }}
                >
                  <MicIcon />
                  {tx("Test model")}
                </Button>
              ) : null
            ) : (
              <span className="text-xs text-muted-foreground">
                {speech.status?.supported === false
                  ? speech.status.reason
                  : tx("Waiting for the environment to connect")}
              </span>
            )}
          </div>
        }
      >
        {showTranscript ? (
          <div className="mt-3 flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 py-1 ps-3 pe-1">
            <div className="min-w-0 flex-1 py-1.5">
              {speech.preview || transcript !== null ? null : (
                <p className="text-xs text-muted-foreground">
                  {tx(
                    "Say a sentence. Cleanup is skipped, so you see exactly what the model heard.",
                  )}
                </p>
              )}
              {speech.preview || transcript !== null ? (
                <p
                  role="status"
                  aria-label={tx("Test transcript")}
                  className="select-text whitespace-pre-wrap break-words text-sm leading-relaxed"
                >
                  {speech.preview ? (
                    <>
                      {speech.preview.committed}
                      <span className="text-muted-foreground">{speech.preview.tentative}</span>
                    </>
                  ) : (
                    transcript || tx("No speech recognized. Try again.")
                  )}
                </p>
              ) : null}
            </div>
            <Button
              size="icon-sm"
              variant="ghost-muted"
              aria-label={tx("Close model test")}
              onClick={() => {
                speech.cancel();
                setShowTranscript(false);
              }}
            >
              <XIcon />
            </Button>
          </div>
        ) : null}
      </ModelCard>
      <VoiceInputSetup
        environmentId={speech.transcriptionEnvironmentId}
        open={speech.setup.open}
        step={speech.setup.step}
        status={speech.status}
        model={speech.setup.model}
        language={speech.setup.language}
        downloading={speech.setup.downloading}
        error={speech.setup.error}
        onOpenChange={speech.setup.setOpen}
        onRetryCatalog={speech.setup.retryCatalog}
        onDownload={() => void speech.setup.download()}
        onCancelDownload={() => void speech.setup.cancelDownload()}
        onStartRecording={() => void speech.setup.startRecording()}
      />
    </SettingsSearchTarget>
  );
}

export function VoiceSettingsPanel() {
  const { locale, t, tx } = useI18n();
  const cleanupEnabled = useCleanupGrant() !== null;
  const settings = useClientSettings();
  const settingsScope = useOptionalSettingsScope();
  const destination = useVoiceTranscriptionDestination();
  const canManageKey = useEnvironmentScope(destination.environmentId, AuthSettingsWriteScope);
  const [pendingCloud, setPendingCloud] = useState<{
    provider: CloudSpeechProvider;
    environmentId: EnvironmentId;
  } | null>(null);
  const { environments } = useEnvironments();
  const [microphones, setMicrophones] = useState<BrowserMicrophone[]>([]);
  const prepared = destination.cloudProvider ? null : destination.prepared;
  const catalog = useVoiceModels(prepared);

  const refreshMicrophones = useStableCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    try {
      const devices = await listAudioInputs();
      setMicrophones(devices);
      updateMicrophoneOrder((order) => rememberMicrophones(order, devices));
    } catch {
      setMicrophones([]);
    }
  });
  // oxlint-disable-next-line t3code/no-unreasoned-state-sync -- subscribes to microphone device changes while settings are open
  useEffect(() => {
    queueMicrotask(() => void refreshMicrophones());
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices?.addEventListener) return;
    const onChange = () => void refreshMicrophones();
    mediaDevices.addEventListener("devicechange", onChange);
    return () => mediaDevices.removeEventListener("devicechange", onChange);
  }, [refreshMicrophones]);
  const modelStatus = catalog.status;
  const target = settingsScope?.target;
  const members = settingsScope?.scope.members;
  const project =
    members?.find(
      (member) => member.environmentId === target?.environmentId && member.id === target.projectId,
    ) ?? members?.[0];

  const order = microphoneOrder(settings);
  const selectedMicrophone = preferredMicrophoneId(order, microphones);
  const environmentChoices = environments.map((environment) => ({
    environment,
    value: JSON.stringify(["environment", environment.environmentId]),
  }));
  const cloudGroups = environments
    .filter(
      (environment) => environment.serverConfig?.environment.capabilities.cloudVoiceTranscription,
    )
    .map((environment) => ({
      environment,
      choices: CloudSpeechProvider.literals.map((provider) => ({
        environment,
        provider,
        value: JSON.stringify(["cloud", environment.environmentId, provider]),
      })),
    }));
  const cloudChoices = cloudGroups.flatMap((group) => group.choices);
  const destinationValue = destination.cloudProvider
    ? JSON.stringify(["cloud", destination.environmentId, destination.cloudProvider])
    : destination.environmentId
      ? JSON.stringify(["environment", destination.environmentId])
      : OFF;
  const cloudEnvironment = environments.find(
    (env) => env.environmentId === pendingCloud?.environmentId,
  );
  // OpenRouter users without settings access still manage their own model choice.
  const manageLabel =
    destination.cloudProvider === "openrouter" ? tx("Manage OpenRouter") : tx("Manage key");
  const chosenEnvironment = environments.find(
    (environment) => environment.environmentId === destination.environmentId,
  );
  const chosenUnsupported =
    !destination.cloudProvider &&
    chosenEnvironment?.serverConfig != null &&
    chosenEnvironment.serverConfig.environment.capabilities.voiceTranscription !== true;
  const model = prepared && modelStatus?.supported ? modelStatus : null;

  return (
    <SettingsPageContainer
      searchTargetFallbacks={{
        "speech-language":
          model || destination.cloudProvider ? undefined : "voice-transcription-destination",
        "speech-models": prepared ? undefined : "voice-transcription-destination",
        "speech-hardware": prepared && model ? undefined : "voice-transcription-destination",
        "transcription-test": !prepared
          ? "voice-transcription-destination"
          : !model || model.state === "missing-model"
            ? "speech-models"
            : undefined,
        "speech-post-processing-model":
          cleanupEnabled && settingsScope ? undefined : "speech-post-processing",
        "speech-correction-word": cleanupEnabled ? undefined : "speech-post-processing",
      }}
    >
      <SettingsSection id="voice-input" title={t("settings.voice.input")}>
        <SettingsRow
          {...searchableSetting("voice-microphone")}
          title={tx("Microphone")}
          description={tx("Voice input uses the first connected microphone in this list.")}
          control={
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label={tx("Refresh microphones")}
                    onClick={() => void refreshMicrophones()}
                  >
                    <RefreshCwIcon />
                  </Button>
                }
              />
              <TooltipPopup>{tx("Refresh microphones")}</TooltipPopup>
            </Tooltip>
          }
        >
          <div className="mt-3 pb-2">
            <MicrophoneOrderList order={order} devices={microphones} />
          </div>
        </SettingsRow>
        <MicrophoneTest
          key={selectedMicrophone}
          microphoneId={selectedMicrophone}
          onMicrophoneAccess={() => void refreshMicrophones()}
        />
        <SettingsRow
          {...searchableSetting("dictation-shortcut-mode")}
          title={tx("Dictation shortcut")}
          description={
            locale === "zh-CN"
              ? `${tx(SHORTCUT_MODES[settings.voiceShortcutMode].hint)}。`
              : `${SHORTCUT_MODES[settings.voiceShortcutMode].hint}.`
          }
          control={
            <Select
              value={settings.voiceShortcutMode}
              onValueChange={(value) => {
                if (value)
                  void updateClientSettings({ voiceShortcutMode: value as VoiceShortcutMode });
              }}
            >
              <SelectTrigger size="sm" aria-label={tx("Dictation shortcut mode")}>
                <SelectValue>{tx(SHORTCUT_MODES[settings.voiceShortcutMode].label)}</SelectValue>
              </SelectTrigger>
              <SelectPopup align="end" alignItemWithTrigger={false}>
                {(Object.keys(SHORTCUT_MODES) as VoiceShortcutMode[]).map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    <span className="flex flex-col">
                      {tx(SHORTCUT_MODES[mode].label)}
                      <span className="text-xs text-muted-foreground">
                        {tx(SHORTCUT_MODES[mode].hint)}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          }
        />
      </SettingsSection>

      <SettingsSection id="voice-transcription" title={tx("Transcription")}>
        <SettingsRow
          {...searchableSetting("voice-transcription-destination")}
          title={tx("Transcribe with")}
          description={
            destination.environmentId && chosenUnsupported
              ? locale === "zh-CN"
                ? `${chosenEnvironment.label} 无法在本地转录音频，请选择其他目标。`
                : `${chosenEnvironment.label} can’t transcribe audio locally. Choose another destination.`
              : tx("Where your speech is turned into text.")
          }
          control={
            <div className="flex w-full min-w-0 items-center gap-1.5 @min-[32rem]/settings-row:w-auto">
              <Select
                value={destinationValue}
                onValueChange={(value) => {
                  if (!value) return;
                  const cloud = cloudChoices.find((choice) => choice.value === value);
                  if (cloud) {
                    setPendingCloud({
                      environmentId: cloud.environment.environmentId,
                      provider: cloud.provider,
                    });
                    return;
                  }
                  setPendingCloud(null);
                  const chosen = environmentChoices.find((choice) => choice.value === value);
                  if (value === OFF) chooseAudioDestination(null);
                  else if (chosen)
                    chooseAudioDestination({
                      kind: "environment",
                      environmentId: chosen.environment.environmentId,
                    });
                }}
              >
                <SelectTrigger
                  size="sm"
                  aria-label={tx("Transcribe with")}
                  className="min-w-0 @min-[32rem]/settings-row:w-auto @min-[32rem]/settings-row:max-w-72"
                >
                  <SelectValue>
                    <span className="flex min-w-0 items-center gap-2">
                      {destination.cloudProvider ? (
                        <CloudSpeechLogo provider={destination.cloudProvider} />
                      ) : destination.environmentId ? (
                        <MonitorIcon aria-hidden className="size-4" />
                      ) : (
                        <MicOffIcon aria-hidden className="size-4" />
                      )}
                      <span className="truncate">
                        {destination.cloudProvider
                          ? CLOUD_SPEECH_LABELS[destination.cloudProvider]
                          : destination.environmentId
                            ? (chosenEnvironment?.label ?? tx("Chosen environment (unavailable)"))
                            : tx("Off")}
                        {destination.cloudProvider && (
                          <span className="text-muted-foreground">
                            {locale === "zh-CN" ? " 经由 " : " via "}
                            {chosenEnvironment?.label ?? tx("unavailable environment")}
                          </span>
                        )}
                      </span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectPopup align="end" alignItemWithTrigger={false}>
                  <SelectItem value={OFF}>
                    <span className="flex items-center gap-2">
                      <MicOffIcon aria-hidden className="size-4" />
                      {tx("Off")}
                    </span>
                  </SelectItem>
                  {environmentChoices.length > 0 && (
                    <SelectGroup>
                      <SelectGroupLabel>{tx("On an environment")}</SelectGroupLabel>
                      {environmentChoices.map(({ environment, value }) => (
                        <SelectItem key={value} value={value}>
                          <span className="flex items-center gap-2">
                            <MonitorIcon aria-hidden className="size-4" />
                            {environment.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  {cloudGroups.map(({ environment, choices }) => (
                    <SelectGroup key={environment.environmentId}>
                      <SelectGroupLabel>
                        {locale === "zh-CN"
                          ? `云端（经由 ${environment.label}）`
                          : `Cloud via ${environment.label}`}
                      </SelectGroupLabel>
                      {choices.map(({ value, provider }) => (
                        <SelectItem
                          key={value}
                          value={value}
                          aria-label={
                            locale === "zh-CN"
                              ? `${CLOUD_SPEECH_LABELS[provider]}（经由 ${environment.label}）`
                              : `${CLOUD_SPEECH_LABELS[provider]} via ${environment.label}`
                          }
                        >
                          <span className="flex items-center gap-2">
                            <CloudSpeechLogo provider={provider} />
                            {CLOUD_SPEECH_LABELS[provider]}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                  {destination.environmentId &&
                  (!chosenEnvironment ||
                    (destination.cloudProvider &&
                      !cloudChoices.some((option) => option.value === destinationValue))) ? (
                    <SelectItem value={destinationValue}>
                      {tx("Chosen environment (unavailable)")}
                    </SelectItem>
                  ) : null}
                </SelectPopup>
              </Select>
              {destination.cloudProvider &&
                chosenEnvironment &&
                (canManageKey || destination.cloudProvider === "openrouter") && (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          size="icon-sm"
                          type="button"
                          variant="ghost"
                          aria-label={manageLabel}
                          onClick={() => {
                            if (destination.cloudProvider)
                              setPendingCloud({
                                provider: destination.cloudProvider,
                                environmentId: chosenEnvironment.environmentId,
                              });
                          }}
                        >
                          <KeyRoundIcon aria-hidden className="size-4" />
                        </Button>
                      }
                    />
                    <TooltipPopup>{manageLabel}</TooltipPopup>
                  </Tooltip>
                )}
            </div>
          }
        />
        {pendingCloud && cloudEnvironment && (
          <CloudVoiceConfiguration
            key={JSON.stringify(pendingCloud)}
            provider={pendingCloud.provider}
            environment={cloudEnvironment}
            active={
              destination.environmentId === pendingCloud.environmentId &&
              destination.cloudProvider === pendingCloud.provider
            }
            close={() => setPendingCloud(null)}
          />
        )}
        {(model || destination.cloudProvider) && (
          <SettingsRow
            {...searchableSetting("speech-language")}
            title={tx("Language")}
            description={
              destination.cloudProvider
                ? tx("The provider detects your language automatically.")
                : model?.supportsLanguageDetection
                  ? locale === "zh-CN"
                    ? `${model.model} 会自动检测语言。`
                    : `${model.model} detects the language automatically.`
                  : locale === "zh-CN"
                    ? `${model?.model ?? "此模型"} 使用单一固定语言。`
                    : `${model?.model ?? "This model"} uses one fixed language.`
            }
            control={
              <SpeechLanguageSelect
                model={destination.cloudProvider ? cloudSpeechLanguages : model}
              />
            }
          />
        )}
        {model?.supportsTranslation ? (
          <SettingsRow
            title={tx("Translate to English")}
            description={tx("Speak any language and get English text.")}
            control={
              <Switch
                aria-label={tx("Translate to English")}
                checked={settings.speechTranslateToEnglish}
                onCheckedChange={(checked) =>
                  void updateClientSettings({ speechTranslateToEnglish: checked })
                }
              />
            }
          />
        ) : null}
        <SettingsRow
          {...searchableSetting("speech-silence-filtering")}
          title={tx("Silence filtering")}
          description={
            destination.cloudProvider === "openai"
              ? tx("OpenAI handles silence itself.")
              : tx("Skip silence and background noise before transcribing.")
          }
          control={
            <Switch
              aria-label={tx("Silence filtering")}
              disabled={destination.cloudProvider === "openai"}
              checked={settings.speechSilenceFiltering}
              onCheckedChange={(checked) =>
                void updateClientSettings({ speechSilenceFiltering: checked })
              }
            />
          }
        />
        <SettingsRow
          {...searchableSetting("remove-filler-words")}
          title={tx("Remove filler words")}
          description={tx("Drop “um” and “uh” from transcripts.")}
          control={
            <Switch
              aria-label={tx("Remove filler words")}
              checked={settings.speechRemoveFillerWords}
              onCheckedChange={(checked) =>
                void updateClientSettings({ speechRemoveFillerWords: checked })
              }
            />
          }
        />
        {prepared ? (
          <SpeechModelBrowser
            key={prepared.environmentId}
            prepared={prepared}
            catalog={catalog}
            testEnvironmentId={
              project?.environmentId ?? target?.environmentId ?? prepared.environmentId
            }
            projectId={project?.id ?? null}
            projectName={project?.title ?? null}
          />
        ) : null}
        {prepared && <AdvancedSpeechSettings prepared={prepared} catalog={catalog} />}
      </SettingsSection>

      <SettingsSection id="voice-dictionary" title={tx("Dictionary")}>
        <SettingsRow
          {...searchableSetting("speech-dictionary")}
          title={tx("Your dictionary")}
          description={tx("Names and terms to spell your way, saved on this device.")}
        >
          <div className="mt-3 pb-2">
            <DictionaryEditor
              label={tx("dictionary")}
              words={settings.speechCustomWords}
              onChange={(words) => void updateClientSettings({ speechCustomWords: words })}
            />
          </div>
        </SettingsRow>
        <ProjectDictionaryRow />
      </SettingsSection>

      <SettingsSection id={searchableSetting("speech-post-processing").id} title={tx("Cleanup")}>
        <SettingsRow
          title={tx("Clean up transcripts")}
          description={tx(
            "Off by default. Sends the transcript and nearby draft text, never audio, to the cleanup model.",
          )}
          control={
            <Switch
              aria-label={tx("Clean up transcripts")}
              checked={cleanupEnabled}
              onCheckedChange={chooseTranscriptCleanup}
            />
          }
        />
        {cleanupEnabled ? (
          <SettingsRow
            title={tx("Instructions")}
            description={
              settings.speechPostProcessingPrompt.mode === "custom"
                ? tx("Your own instructions for cleanup.")
                : tx("Fix punctuation, numbers, lists, and spoken corrections.")
            }
            control={
              <Select
                value={settings.speechPostProcessingPrompt.mode}
                onValueChange={(value) => {
                  if (value === "default" || value === "custom")
                    void updateClientSettings({
                      speechPostProcessingPrompt: {
                        mode: value,
                        customInstructions:
                          value === "custom" &&
                          !settings.speechPostProcessingPrompt.customInstructions.trim()
                            ? DEFAULT_SPEECH_POST_PROCESSING_PROMPT
                            : settings.speechPostProcessingPrompt.customInstructions,
                      },
                    });
                }}
              >
                <SelectTrigger size="sm" aria-label={tx("Cleanup instructions")}>
                  <SelectValue>
                    {settings.speechPostProcessingPrompt.mode === "custom"
                      ? tx("Custom")
                      : tx("Built-in")}
                  </SelectValue>
                </SelectTrigger>
                <SelectPopup align="end" alignItemWithTrigger={false}>
                  <SelectItem value="default">{tx("Built-in")}</SelectItem>
                  <SelectItem value="custom">{tx("Custom")}</SelectItem>
                </SelectPopup>
              </Select>
            }
          >
            {settings.speechPostProcessingPrompt.mode === "custom" ? (
              <div className="mt-3 pb-2">
                <Textarea
                  aria-label={tx("Custom cleanup instructions")}
                  maxLength={10_000}
                  value={settings.speechPostProcessingPrompt.customInstructions}
                  onChange={(event) =>
                    void updateClientSettings({
                      speechPostProcessingPrompt: {
                        mode: "custom",
                        customInstructions: event.target.value,
                      },
                    })
                  }
                />
              </div>
            ) : null}
          </SettingsRow>
        ) : null}
        {cleanupEnabled && settingsScope !== null ? <CleanupModelRow /> : null}
        {cleanupEnabled ? (
          <SettingsRow
            {...searchableSetting("speech-correction-word")}
            title={tx("Correction cue")}
            description={tx("The phrase you say to fix a mistake, like “scratch that”.")}
            control={
              <Input
                key={settings.speechCorrectionWord}
                defaultValue={settings.speechCorrectionWord}
                maxLength={50}
                placeholder={locale === "zh-CN" ? "抱歉" : "sorry"}
                aria-label={tx("Correction cue")}
                className="@min-[32rem]/settings-row:w-40"
                onBlur={(event) => {
                  const next = event.target.value.trim();
                  if (next !== settings.speechCorrectionWord)
                    void updateClientSettings({ speechCorrectionWord: next });
                }}
              />
            }
          />
        ) : null}
      </SettingsSection>
    </SettingsPageContainer>
  );
}
