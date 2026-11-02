import { describe, expect, it } from "vite-plus/test";

import { localizeAlertArguments, localizeMobileString } from "./mobileStrings";

describe("mobile strings", () => {
  it.each([
    [
      "The provider process for this request is no longer available. Interrupt or restart the run to continue.",
      "此请求的提供商进程已不可用。请中断或重新启动运行以继续。",
    ],
    [
      "Context unavailable. The reference was copied without its payload. Copy it again from the original message or remove it.",
      "上下文不可用。此引用复制时未包含内容。请从原始消息重新复制，或将其移除。",
    ],
    [
      "This task previously ran more than once per minute. Saving requires an interval of at least 1 minute.",
      "此定时任务此前每分钟运行多次。保存时，运行间隔必须至少为 1 分钟。",
    ],
    ["Agent browser access", "智能体浏览器访问"],
    ["Provider accounts", "提供商账户"],
    ["New thread", "新建任务"],
    ["No conversation yet", "还没有对话"],
    ["Labs", "实验功能"],
    ["Routes", "连接路径"],
    ["Draft", "草稿"],
  ])("localizes complete rendered copy: %s", (source, translated) => {
    expect(localizeMobileString(source, "zh-CN")).toBe(translated);
    expect(localizeMobileString(source, "en")).toBe(source);
  });

  it("localizes diagnosis labels and status notes before they are composed", () => {
    expect(localizeMobileString(" · Failed", "zh-CN")).toBe(" · 失败");
    expect(localizeMobileString(" · Not checked", "zh-CN")).toBe(" · 未检查");
    expect(localizeMobileString("This device", "zh-CN")).toBe("当前设备");
    expect(localizeMobileString("HTTP status", "zh-CN")).toBe("HTTP 状态");
    expect(localizeMobileString("Cause", "zh-CN")).toBe("原因");
    expect(localizeMobileString("Retry. If it keeps failing, copy the diagnostics.", "zh-CN")).toBe(
      "请重试。如果持续失败，请复制诊断信息。",
    );
  });
  it.each(["Mac mini", "小王的 Mac (dev).local", "Alex's Mac"])(
    "translates diagnosis copy for %s without changing the host name",
    (host) => {
      const messages = {
        "{host} runs an older T3 Code": "{host} 正在运行旧版 T3 Code",
        "{host} is not linked to your T3 Connect account": "{host} 尚未关联到你的 T3 Connect 账户",
        "{host}'s tunnel is still being set up": "正在为 {host} 设置隧道",
        "T3 Connect is not turned on for {host}": "{host} 尚未启用 T3 Connect",
        "{host}'s tunnel is offline": "{host} 的隧道已离线",
        "Tunnel works, but T3 Code on {host} did not answer":
          "隧道正常，但 {host} 上的 T3 Code 未响应",
        "T3 Code on {host} sent an unexpected answer": "{host} 上的 T3 Code 返回了异常响应",
        "{host}'s tunnel address did not resolve": "无法解析 {host} 的隧道地址",
        "Secure connection to {host}'s tunnel failed": "无法与 {host} 的隧道建立安全连接",
        "{host}'s tunnel refused the connection": "{host} 的隧道拒绝了连接",
        "{host} did not answer in time": "{host} 未及时响应",
        "This device can't reach {host}'s tunnel": "此设备无法连接 {host} 的隧道",
        "T3 Connect could not reach {host}'s tunnel": "T3 Connect 无法连接 {host} 的隧道",
        "T3 Code on {host} did not accept this device": "{host} 上的 T3 Code 未允许此设备连接",
        "T3 Code on {host} did not answer": "{host} 上的 T3 Code 未响应",
        "On {host}, check Settings > Sharing & access or run `t3 connect status`.":
          "在 {host} 上查看“设置 > 共享与访问”，或运行 `t3 connect status`。",
        "Update T3 Code on {host}.": "请更新 {host} 上的 T3 Code。",
        "Turn on automatic date and time on this device and on {host}, then retry.":
          "请在此设备和 {host} 上启用自动设置日期和时间，然后重试。",
        "On {host}, open Settings > Sharing & access and turn T3 Connect on.":
          "在 {host} 上打开“设置 > 共享与访问”，并启用 T3 Connect。",
        "Make sure {host} is awake and T3 Code is running on it.":
          "请确保 {host} 处于唤醒状态，且 T3 Code 正在运行。",
        "A VPN or Tailscale exit node on {host} can block the tunnel (port 7844). Turn it off or allow the tunnel.":
          "{host} 上的 VPN 或 Tailscale 出口节点可能会阻止隧道连接（端口 7844）。请关闭它，或放行隧道连接。",
        "Open or restart T3 Code on {host}.": "请打开或重启 {host} 上的 T3 Code。",
        "Make sure {host} is awake and online.": "请确保 {host} 处于唤醒状态且已联网。",
        "If it keeps failing, remove {host} from this device and add it again.":
          "如果持续失败，请从此设备中移除 {host}，然后重新添加。",
        "Make sure T3 Code is running on {host}.": "请确保 T3 Code 正在 {host} 上运行。",
        "{host} tunnel": "{host} 隧道",
        "T3 Code on {host}": "{host} 上的 T3 Code",
      };
      for (const [source, translated] of Object.entries(messages)) {
        const message = source.replaceAll("{host}", host);
        expect(localizeMobileString(message, "zh-CN")).toBe(translated.replaceAll("{host}", host));
        expect(localizeMobileString(message, "en")).toBe(message);
      }
    },
  );
  it("translates the new commit, linking, webhook, and preview controls", () => {
    const messages = {
      "Cancel commit": "取消提交",
      "Commit on a new branch": "提交到新分支",
      "Link pull request": "关联拉取请求",
      "Back to document": "返回文档",
      "Render math": "渲染数学公式",
      "Replay key template": "重放去重键模板",
      "Coalesce window (seconds, 10–3600)": "合并窗口（秒，10–3600）",
      "Resume queue": "恢复队列",
    };
    for (const [source, translated] of Object.entries(messages)) {
      expect(localizeMobileString(source, "zh-CN")).toBe(translated);
      expect(localizeMobileString(source, "en")).toBe(source);
    }
  });

  it("translates the new commit counts and quota pace without changing account names", () => {
    expect(localizeMobileString("3 of 8 selected · +1.2k −30", "zh-CN")).toBe(
      "已选择 3 / 8 个文件 · +1.2k −30",
    );
    expect(
      localizeMobileString("Segment 2, Work Mac, 80% left, 62% of the window left", "zh-CN"),
    ).toBe("区段 2，Work Mac，剩余 80%，额度周期剩余 62%");
    expect(localizeMobileString("Segment 2, Work Mac, 80% left", "zh-CN")).toBe(
      "区段 2，Work Mac，剩余 80%",
    );
  });

  it("translates project creation and scratch-task copy", () => {
    const messages = {
      "New project": "新建项目",
      "Start a new Git repository from a name": "输入名称以创建新的 Git 仓库",
      "Project name": "项目名称",
      "Create private repository on GitHub": "在 GitHub 上创建私有仓库",
      "Create project": "创建项目",
      "Add existing project": "添加已有项目",
      "No project": "不关联项目",
      "Start a task without a project": "创建不关联项目的任务",
      "Start without a project": "不关联项目并开始",
      "What should we work on?": "我们来做些什么？",
      "Choose a project": "选择项目",
      "Opens the project picker": "打开项目选择器",
    };
    for (const [source, translated] of Object.entries(messages)) {
      expect(localizeMobileString(source, "zh-CN")).toBe(translated);
      expect(localizeMobileString(source, "en")).toBe(source);
    }
  });

  it("translates repository publishing for each host without changing host names", () => {
    for (const provider of [
      "GitHub",
      "GitLab",
      "Forgejo",
      "GitCafe",
      "Azure DevOps",
      "Bitbucket",
    ]) {
      expect(localizeMobileString(`Create private repository on ${provider}`, "zh-CN")).toBe(
        `在 ${provider} 上创建私有仓库`,
      );
      expect(localizeMobileString(`Could not create the ${provider} repository`, "zh-CN")).toBe(
        `无法创建 ${provider} 仓库`,
      );
      expect(localizeMobileString(`Create private repository on ${provider}`, "en")).toBe(
        `Create private repository on ${provider}`,
      );
    }
  });

  it("translates incremental usage progress and preserves environment names and errors", () => {
    expect(localizeMobileString("Updating Codex…", "zh-CN")).toBe("正在更新 Codex…");
    expect(localizeMobileString("Updating 2 providers…", "zh-CN")).toBe("正在更新 2 个提供商…");
    expect(localizeMobileString("Updating 3 environments…", "zh-CN")).toBe("正在更新 3 个环境…");
    expect(localizeMobileString("Updating Work Mac…", "zh-CN")).toBe("正在更新 Work Mac…");
    expect(localizeMobileString("EACCES: /private/usage. Showing saved totals.", "zh-CN")).toBe(
      "EACCES: /private/usage. 正在显示已保存的总计。",
    );
    expect(localizeMobileString("Updating 2 providers…", "en")).toBe("Updating 2 providers…");
  });

  it("localizes new-task alerts and preserves machine names", () => {
    expect(
      localizeAlertArguments(
        "Could not switch machine",
        "It has not reached this device yet. Try again.",
        undefined,
        "zh-CN",
      ),
    ).toMatchObject({ title: "无法切换机器", message: "尚未同步到此设备，请重试。" });
    expect(localizeMobileString("Created without a first commit", "zh-CN")).toBe(
      "项目已创建，但未完成首次提交",
    );
    expect(localizeMobileString("Could not start without a project", "zh-CN")).toBe(
      "无法在不关联项目的情况下启动",
    );
    expect(localizeMobileString("Environment: Work Mac", "zh-CN")).toBe("环境：Work Mac");
    expect(localizeMobileString("on Settings", "zh-CN")).toBe("在 Settings 上");
  });

  it("translates the new shared usage and Cursor access copy", () => {
    expect(localizeMobileString("ChatGPT shared usage", "zh-CN")).toBe("ChatGPT 共享用量");
    expect(localizeMobileString("Manage usage", "zh-CN")).toBe("管理用量");
    expect(localizeMobileString("Enable Cursor usage from Work Mac", "zh-CN")).toBe(
      "启用 Work Mac 的 Cursor 用量统计",
    );
    expect(localizeMobileString("Enable on Work Mac", "zh-CN")).toBe("在 Work Mac 上启用");
    expect(localizeMobileString("no known rates · 20K tokens", "zh-CN")).toBe(
      "暂无已知费率 · 20K 个令牌",
    );
  });

  it("keeps English and technical values unchanged", () => {
    expect(localizeMobileString("Settings", "en")).toBe("Settings");
    expect(localizeMobileString("gpt-5.6-sol", "zh-CN")).toBe("gpt-5.6-sol");
    expect(localizeMobileString("feature/mobile-polish", "zh-CN")).toBe("feature/mobile-polish");
  });

  it("translates fixed messages while preserving surrounding whitespace", () => {
    expect(localizeMobileString("  Settings ", "zh-CN")).toBe("  设置 ");
    expect(localizeMobileString("No conversation yet", "zh-CN")).toBe("还没有对话");
    expect(localizeMobileString("Add Environment", "zh-CN")).toBe("添加环境");
    expect(localizeMobileString("Scan QR Code", "zh-CN")).toBe("扫描二维码");
  });

  it("translates dynamic thread states", () => {
    expect(localizeMobileString('No threads matching "docs".', "zh-CN")).toBe(
      "没有与“docs”匹配的任务。",
    );
    expect(localizeMobileString("Show more (3 settled hidden)", "zh-CN")).toBe(
      "显示更多（已隐藏 3 个已收起任务）",
    );
    expect(
      localizeMobileString(
        "This session is 2h 5m old and uses 250,000 tokens. Compact it before continuing?",
        "zh-CN",
      ),
    ).toBe("此会话已有 2 小时 5 分钟，当前使用 250,000 个令牌。是否先压缩再继续？");
    expect(localizeMobileString("Recording 1:04", "zh-CN")).toBe("正在录音 1:04");
    expect(localizeMobileString("Base branch: main", "zh-CN")).toBe("基础分支：main");
    expect(localizeMobileString("Switches to a new worktree", "zh-CN")).toBe("切换到新工作树");
    expect(localizeMobileString("New thread on feature/mobile", "zh-CN")).toBe(
      "基于 feature/mobile 新建任务",
    );
  });

  it("translates attachment and voice input controls", () => {
    expect(localizeMobileString("Photo Library", "zh-CN")).toBe("照片图库");
    expect(localizeMobileString("Choose Files", "zh-CN")).toBe("选择文件");
    expect(localizeMobileString("Preparing", "zh-CN")).toBe("正在准备");
    expect(localizeMobileString("Transcribing", "zh-CN")).toBe("正在转写");
  });

  it("translates usage limits and provider setup states", () => {
    expect(localizeMobileString("82% used", "zh-CN")).toBe("已使用 82%");
    expect(localizeMobileString("in 2h 5m", "zh-CN")).toBe("2 小时 5 分钟后");
    expect(localizeMobileString("Dismiss usage limits", "zh-CN")).toBe("关闭用量限额");
    expect(localizeMobileString("ahead of pace · resets in 2h 5m", "zh-CN")).toBe(
      "用量偏快 · 2 小时 5 分钟后重置",
    );
    expect(localizeMobileString("2 reset credits banked · next expires in 3d 4h", "zh-CN")).toBe(
      "有 2 个重置额度 · 下一额度将在 3 天 4 小时后过期",
    );
    expect(localizeMobileString("Set up Antigravity", "zh-CN")).toBe("设置 Antigravity");
    expect(localizeMobileString("Enabled. Installed 1.2.3", "zh-CN")).toBe("已启用 · 已安装 1.2.3");
  });

  it("translates workspace image and Codex feedback states", () => {
    expect(localizeMobileString("Loading image…", "zh-CN")).toBe("正在加载图片…");
    expect(
      localizeMobileString("Feedback sent to OpenAI.\n\nThread ID: `feedback-123`", "zh-CN"),
    ).toBe("反馈已发送给 OpenAI。\n\n任务 ID：`feedback-123`");
  });

  it("translates alert titles, messages, and button labels", () => {
    expect(
      localizeAlertArguments(
        "No open PR",
        "This branch does not have an open pull request.",
        [{ text: "Cancel" }, { text: "Confirm" }],
        "zh-CN",
      ),
    ).toEqual({
      title: "没有打开的 PR",
      message: "此分支没有打开的 Pull Request。",
      buttons: [{ text: "取消" }, { text: "确认" }],
    });
  });
});
