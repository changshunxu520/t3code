import { useI18n } from "~/i18n/WebI18nContext";
import { cn } from "~/lib/utils";

import { CommandBlock } from "./CommandBlock";

/**
 * Setup steps for another computer: install `t3`, then run `command`. Both installers are shown
 * because the browser showing this is often not the computer being set up.
 */
export function InstallT3Commands({
  command,
  className,
}: {
  readonly command: string;
  readonly className?: string;
}) {
  const { locale, tx } = useI18n();
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs text-muted-foreground">{tx("macOS, Linux")}</p>
      <CommandBlock command="curl -fsSL https://t3.codes/install.sh | sh" />
      <p className="text-xs text-muted-foreground">{tx("Windows (PowerShell)")}</p>
      <CommandBlock command="irm https://t3.codes/install.ps1 | iex" />
      <p className="text-xs text-muted-foreground">{tx("Then")}</p>
      <CommandBlock command={command} />
      <p className="text-xs text-muted-foreground">
        {locale === "zh-CN" ? (
          <>
            若已安装 <code className="font-mono">t3</code> 可跳过安装步骤。若安装后未找到{" "}
            <code className="font-mono">t3</code>，请将安装程序提示的文件夹添加到 PATH 中。
          </>
        ) : (
          <>
            Skip the install if you already have <code className="font-mono">t3</code>. If{" "}
            <code className="font-mono">t3</code> is not found after installing, add the folder the
            installer names to your PATH.
          </>
        )}
      </p>
    </div>
  );
}
