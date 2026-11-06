import type { AlertButton, AlertOptions } from "react-native";

export type MobileLocale = "en" | "zh-CN";

export const MOBILE_LOCALE: MobileLocale =
  process.env.EXPO_PUBLIC_APP_LOCALE === "zh-CN" ? "zh-CN" : "en";

const ZH_CN_MESSAGES = {
  "started a discussion": "发起了讨论",
  "Use t3 or t3/ for t3/add-search. Leave empty for no prefix.":
    "输入 t3 或 t3/ 可生成 t3/add-search。留空则不添加前缀。",
  "Notifications require T3 Connect in this app build.": "此应用版本的通知功能需要 T3 Connect。",
  "Intervals must be at least 1 minute. Update this interval before saving.":
    "运行间隔必须至少为 1 分钟。请调整后再保存。",
  "Signature check configured on desktop/web.": "已在桌面端或网页端配置签名校验。",
  "Long-press the send button to use the other option for a single message. With a hardware keyboard, hold Command while sending.":
    "长按发送按钮，可为单条消息使用另一种发送方式。使用实体键盘时，按住 Command 键发送即可。",
  "Sent by T3 Code": "由 T3 Code 发送",
  Labs: "实验功能",
  Routes: "连接路径",
  Draft: "草稿",
  "Reading crash log…": "正在读取崩溃日志…",
  "Searching messages…": "正在搜索消息…",
  "Loading tasks…": "正在加载任务…",
  "Context unavailable. The reference was copied without its payload. Copy it again from the original message or remove it.":
    "上下文不可用。此引用复制时未包含内容。请从原始消息重新复制，或将其移除。",
  "This context type is not supported by this version of the app. Its payload will be preserved when sent.":
    "此版本的应用不支持这种上下文类型。发送时会保留其内容。",
  "Choose environments you trust to share PR data and use each other's source control access. Enable both environments. This applies only to this client.":
    "选择你信任的环境，以共享拉取请求数据并相互使用源代码管理访问权限。请同时启用两个环境。此设置仅适用于当前客户端。",
  "Paste the report into a GitHub issue. It contains the app version, the JavaScript error message, and the component stack. Error messages can quote values from the app, so read it over before sharing.":
    "将报告粘贴到 GitHub 问题中。报告包含应用版本、JavaScript 错误消息和组件堆栈。错误消息可能包含应用中的数据，请在分享前检查内容。",
  "This repository has more labels than are listed here. Apply the rest on the provider.":
    "此仓库还有未在此处列出的标签。请在提供商平台上应用其他标签。",
  "The provider has more reviewers than it returned. Find additional reviewers on the provider.":
    "提供商尚未返回全部评审人。请在提供商平台上查找其他评审人。",
  "Applies to the route marked In use. Other routes may have different permissions and have not been checked.":
    "适用于标记为“使用中”的连接路径。其他路径的权限可能不同，且尚未检查。",
  "Permissions not checked. Connect to this environment to view this session’s permissions.":
    "尚未检查权限。请连接此环境以查看当前会话的权限。",
  "Voice input records from the first connected microphone in this list. Wired and Bluetooth devices are added by name after you use voice input with them connected; until then, the Other row ranks them.":
    "语音输入使用此列表中第一个已连接的麦克风录音。连接有线或蓝牙设备并使用语音输入后，设备会按名称加入列表；在此之前，其优先级由“其他”项决定。",
  "This project has no checkout on the selected connected environments. Change the filter above.":
    "此项目在所选的已连接环境中没有检出条目。请调整上方的筛选条件。",
  "This task previously ran more than once per minute. Saving requires an interval of at least 1 minute.":
    "此定时任务此前每分钟运行多次。保存时，运行间隔必须至少为 1 分钟。",
  "Fold working and monitoring threads into a Working section. They return to the top of the list when they need you. While this is on, active threads are ordered by time and cannot be moved.":
    "将正在运行和监控中的任务收起到“进行中”分区。需要你处理时，它们会回到列表顶部。启用此项后，活跃任务按时间排序，无法手动移动。",
  "The provider process for this request is no longer available. Interrupt or restart the run to continue.":
    "此请求的提供商进程已不可用。请中断或重新启动运行以继续。",
  "This device": "当前设备",
  Cause: "原因",
  Attempts: "尝试次数",
  Route: "连接路径",
  Direct: "直连",
  "· Failed": "· 失败",
  "· Not checked": "· 未检查",
  "This device is offline": "此设备已离线",
  "This device's clock is off": "此设备的系统时间不准确",
  "T3 Connect returned an error": "T3 Connect 返回错误",
  "This device could not prepare the connection": "此设备未能完成连接准备",
  "T3 Connect did not accept this device's sign-in": "T3 Connect 未接受此设备的登录凭据",
  "This device can't reach T3 Connect": "此设备无法连接 T3 Connect",
  "Connect this device to the internet. T3 Code reconnects on its own.":
    "请将此设备连接到互联网，T3 Code 会自动重新连接。",
  "Check that this device is signed in to the same T3 Connect account as the host.":
    "请确认此设备与主机登录的是同一个 T3 Connect 账户。",
  "Wait a minute. T3 Code retries on its own.": "请稍等片刻，T3 Code 会自动重试。",
  "Wait a few minutes. T3 Code retries on its own.": "请稍等几分钟，T3 Code 会自动重试。",
  "If it keeps failing, copy the diagnostics and report it.":
    "如果持续失败，请复制诊断信息并反馈问题。",
  "Restart T3 Code on this device.": "请重启此设备上的 T3 Code。",
  "Sign out of T3 Connect and sign in again.": "请退出 T3 Connect 账户，然后重新登录。",
  "Check this device's internet connection.": "请检查此设备的网络连接。",
  "A VPN, firewall, or ad blocker on this device can block T3 Connect.":
    "此设备上的 VPN、防火墙或广告拦截器可能会阻止 T3 Connect 连接。",
  "A VPN, firewall, or DNS filter on this device can block the tunnel.":
    "此设备上的 VPN、防火墙或 DNS 过滤器可能会阻止隧道连接。",
  "Try another network, or add a direct route such as a Tailscale address.":
    "请尝试切换网络，或添加直连路径，例如 Tailscale 地址。",
  "Retry. If it keeps failing, copy the diagnostics.": "请重试。如果持续失败，请复制诊断信息。",
  "T3 Connect": "T3 Connect",
  "HTTP status": "HTTP 状态",
  "Next retry": "下次重试",
  "App version": "应用版本",
  "Host version": "主机版本",
  "Trace ID": "追踪 ID",
  "Some attachments could not be copied. Reconnect to the source environment and copy them again.":
    "部分附件无法复制。请重新连接来源环境后再次复制。",
  "Some context is unavailable": "部分上下文不可用",
  "Those references are marked unavailable.": "这些引用已标记为不可用。",
  Close: "关闭",
  "New thread": "新建任务",
  "The PDF could not be loaded.": "无法加载 PDF。",
  "Could not load PDF": "无法加载 PDF",
  "Loading PDF...": "正在加载 PDF…",
  "The PDF could not be rendered. It may be damaged or password protected.":
    "无法显示 PDF，它可能已损坏或受密码保护。",
  Success: "成功",
  "Close tab": "关闭标签页",
  Paste: "粘贴",
  "Could not close this browser tab": "无法关闭此浏览器标签页",
  "Could not read the clipboard": "无法读取剪贴板",
  "Refreshing environments": "正在刷新环境",
  "What to try": "建议尝试",
  "Copy diagnostics": "复制诊断信息",
  "More info": "更多信息",
  Collapse: "收起",
  Expand: "展开",
  "This connection still uses the old permissions, so some actions may no longer be available. Pair again using a new link with the permissions you need.":
    "此连接仍使用旧权限，因此部分操作可能已不可用。请使用包含所需权限的新链接重新配对。",
  "Got it": "知道了",
  Overview: "概览",
  Activity: "动态",
  "Discard changes?": "放弃更改？",
  Discard: "放弃",
  Dark: "深色",
  Projects: "项目",
  Notifications: "通知",
  "Updates from your active threads": "来自活跃任务的更新",
  Name: "名称",
  Continue: "继续",
  Prompt: "提示词",
  Rename: "重命名",
  Copy: "复制",
  Menu: "菜单",
  "Back 15 seconds": "后退 15 秒",
  "Loading…": "正在加载…",
  Pause: "暂停",
  Play: "播放",
  "Forward 15 seconds": "前进 15 秒",
  "This audio could not be played. Try again or save it to open in another app.":
    "无法播放此音频。请重试，或保存后用其他应用打开。",
  "File options": "文件选项",
  "Close file search": "关闭文件搜索",
  "Clear file search": "清除文件搜索",
  "Back to document": "返回文档",
  Home: "主页",
  "Filter threads": "筛选任务",
  Code: "代码",
  Tests: "测试",
  Mocks: "模拟数据",
  Generated: "生成的文件",
  Docs: "文档",
  State: "状态",
  Involvement: "参与方式",
  "Copy link": "复制链接",
  "Share…": "分享…",
  "Search pull requests": "搜索拉取请求",
  "Filter pull requests": "筛选拉取请求",
  "Failed to share pull request link.": "无法分享拉取请求链接。",
  "This diff is too large to show in full.": "此差异内容过大，无法完整显示。",
  "Clear package search": "清除包搜索",
  Filter: "筛选",
  Path: "路径",
  Test: "条件",
  "Values, comma-separated": "值，以逗号分隔",
  Value: "值",
  "Add filter": "添加筛选条件",
  "Runs only when every filter matches. Other requests are logged as filtered. Separate “is one of” values with commas; a value can't contain a comma.":
    "仅在所有筛选条件匹配时运行。其他请求会记为已过滤。“属于以下之一”的值请用逗号分隔，单个值不能包含逗号。",
  "Invalid filter": "筛选条件无效",
  "Invalid webhook settings": "Webhook 设置无效",
  "Each dedupe key must contain a valid request placeholder. The coalesce window must be whole seconds from 10 to 3600, or blank.":
    "每个去重键都必须包含有效的请求占位符。合并窗口须为 10 至 3600 之间的整数秒，或留空。",
  "Replay key template": "重放去重键模板",
  "Coalesce key template": "合并键模板",
  "Coalesce window (seconds, 10–3600)": "合并窗口（秒，10–3600）",
  "Replay keys suppress repeats for 7 days. Coalescing runs the latest payload when the window from the first delivery closes. Empty keys run normally.":
    "重放去重键会在 7 天内抑制重复请求。合并操作会在首次投递开始的窗口结束后，使用最新请求内容运行。键留空时按常规运行。",
  "Start from remote": "从远程分支开始",
  "Uses the latest commit of the base branch’s tracked remote branch, even if its name differs. Otherwise uses the same-named branch on origin. Uses your local branch if that remote branch is missing.":
    "使用基础分支所跟踪远程分支的最新提交，即使名称不同也如此。否则使用 origin 上的同名分支；若该远程分支不存在，则使用本地分支。",
  "Render math": "渲染数学公式",
  "Old history is cleaned up automatically, but this database still holds the freed space. Run this command on":
    "旧历史记录会自动清理，但此数据库仍占用已释放的空间。请在以下机器上运行此命令：",
  "Copy command": "复制命令",
  Dismiss: "关闭",
  "Use environment defaults for this project": "为此项目使用环境默认设置",
  Failure: "失败",
  "Could not save settings": "无法保存设置",
  "Could not copy": "无法复制",
  "Source control": "版本控制",
  "Open PR": "打开拉取请求",
  "Touch and hold for actions.": "长按以查看操作。",
  "Waiting for host state": "正在等待主机状态",
  "Clear branch search": "清除分支搜索",
  "Attached thread unavailable": "附加的任务不可用",
  "Client not supported": "客户端不受支持",
  Cloning: "正在克隆",
  "Remove project": "移除项目",
  "Close arrange threads": "关闭任务排序",
  "Resume queue": "恢复队列",
  "View instructions": "查看指令",
  "Copy skill": "复制技能",
  "Open thread": "打开任务",
  "Linked pull requests": "已关联的拉取请求",
  "No linked pull requests.": "没有已关联的拉取请求。",
  "Link pull request": "关联拉取请求",
  "Queue paused": "队列已暂停",
  "The server did not report whether this project is at the repository root, so this worktree cannot be reused safely. Update the server or choose another branch.":
    "服务器未报告此项目是否位于仓库根目录，因此无法安全复用此工作树。请更新服务器或选择其他分支。",
  "This project is a repository subdirectory. Choose another branch or add the repository root as a project to reuse this worktree.":
    "此项目位于仓库子目录中。请选择其他分支，或将仓库根目录添加为项目以复用此工作树。",
  "Cancel commit": "取消提交",
  "You’re on the default branch. You can create a new branch when committing.":
    "当前位于默认分支。提交时可以创建新分支。",
  "Describe your changes…": "描述你的更改…",
  "Leave empty to generate a message automatically.": "留空以自动生成提交说明。",
  "Deselect all": "取消全选",
  "Select all": "全选",
  "No changed files to commit.": "没有可提交的文件更改。",
  "Commit on a new branch": "提交到新分支",
  "Attach a pull request by URL or number": "通过网址或编号关联拉取请求",
  "Loading output…": "正在加载输出…",
  "No output.": "暂无输出。",
  "Earlier output not shown": "较早的输出未显示",
  "Opens this agent's thread": "打开此智能体的任务",
  Thread: "任务",
  "Workflow started": "工作流已启动",
  "Show less": "收起",
  "Show full script": "显示完整脚本",
  "Couldn't link this pull request": "无法关联此拉取请求",
  "Couldn't unlink this pull request": "无法取消关联此拉取请求",
  "Pull request URL or #42": "拉取请求网址或 #42",
  Link: "关联",
  "Use a pull request URL, 123, or #123.": "请输入拉取请求网址、123 或 #123。",
  "Stop watching": "停止关注",
  "Watch for changes": "关注更改",
  "Dismiss from thread": "从任务中隐藏",
  "Unlink from thread": "取消与任务的关联",
  "Couldn't change watching": "无法更改关注状态",
  Steer: "即时引导",
  "Even pace:": "均衡用量：",
  "Close search": "关闭搜索",
  "Pull requests": "拉取请求",
  "The server did not return a PDF. Check the connection and try again.":
    "服务器未返回 PDF。请检查连接后重试。",
  "Your edit is still in the composer.": "你的编辑仍保留在输入框中。",
  "No limits available": "暂无可用额度",
  "Subscription remaining": "订阅剩余额度",
  "Reset time unavailable": "重置时间不可用",
  "As of": "截至",
  "New threads": "新任务",
  "Agent behavior": "智能体行为",
  "Provider accounts": "提供商账户",
  Maintenance: "维护",
  "Thread behavior": "任务行为",
  "About T3 Code": "关于 T3 Code",
  Organization: "组织",
  "Project overview": "项目概览",
  Keyboard: "键盘",
  Microphone: "麦克风",
  "Follow-ups": "后续任务",
  "Scheduled Tasks": "计划任务",
  "Scheduled tasks": "计划任务",
  "New scheduled task": "新建计划任务",
  "Edit scheduled task": "编辑计划任务",
  Diagnostics: "诊断",
  "Open source licenses": "开源许可证",
  "License notice": "许可声明",
  "Go back": "返回",
  "Add Project": "添加项目",
  Page: "页面",
  Selection: "选择内容",
  "Requested changes": "请求的更改",
  Element: "元素",
  Selector: "选择器",
  Styles: "样式",
  File: "文件",
  Skill: "技能",
  Description: "描述",
  "Open attachment": "打开附件",
  "Open pull request": "打开拉取请求",
  "Remove from draft": "从草稿中移除",
  "Copying context…": "正在复制上下文…",
  "Opening document…": "正在打开文档…",
  "Copy details": "复制详细信息",
  "Try again. If it keeps happening, copy the details for a bug report.":
    "请重试。如果问题持续出现，请复制详细信息以报告问题。",
  "More actions": "更多操作",
  Done: "完成",
  "Dismiss message": "关闭消息",
  "Archived threads": "已归档任务",
  Unarchive: "取消归档",
  "Close browser": "关闭浏览器",
  Back: "后退",
  Forward: "前进",
  Address: "地址",
  "Enter a URL": "输入网址",
  "Reload page": "重新加载页面",
  Tabs: "标签页",
  "Browser tab options": "浏览器标签页选项",
  "Fit to screen": "适应屏幕",
  "Hard reload": "强制重新加载",
  "Zoom in": "放大",
  "Zoom out": "缩小",
  "Actual size": "实际大小",
  Viewport: "视口",
  "Site data": "网站数据",
  "Clear cookies": "清除 Cookie",
  "Clear cache": "清除缓存",
  "Dialog response": "对话框响应",
  Accept: "接受",
  "Take control to respond.": "接管控制以响应。",
  "Opens the browser tab full screen": "全屏打开浏览器标签页",
  "Close floating preview": "关闭悬浮预览",
  "Watch and control browser tabs open in this thread": "查看并控制此任务中打开的浏览器标签页",
  "Refresh environments": "刷新环境",
  "No servers registered": "没有已注册的服务器",
  "Registered servers": "已注册的服务器",
  "Connections on this device are managed in Settings.": "此设备上的连接在设置中管理。",
  Deregister: "取消注册",
  "Reconnect environment": "重新连接环境",
  "Remove environment": "移除环境",
  "Reach your machines from anywhere, no network setup.": "随时随地访问你的机器，无需配置网络。",
  "Or enter it": "或手动输入",
  "Tap to scan": "轻点扫描",
  "Scan the code from t3 pair or desktop Connections settings":
    "扫描 t3 pair 命令或桌面端连接设置中的二维码",
  "Or use the managed relay": "或使用托管中继",
  Off: "关闭",
  "Read PRs": "读取拉取请求",
  "Read and act": "读取并操作",
  "Hide device controls": "隐藏设备控制",
  "Close device preview": "关闭设备预览",
  "Show device controls": "显示设备控制",
  "Device options": "设备选项",
  "Connecting to device...": "正在连接设备…",
  "Reload stream": "重新加载画面",
  "App switcher": "应用切换器",
  "Rotate device": "旋转设备",
  Devices: "设备",
  Reconnect: "重新连接",
  "No preview for this file": "此文件无预览",
  "Preview limited to the first 1 MB. Save or share the file to read it in full.":
    "预览仅显示前 1 MB。保存或分享文件以查看完整内容。",
  "Table limited to the first 100 rows and 30 columns. Source shows the rest.":
    "表格仅显示前 100 行和 30 列。其余内容可在源文件中查看。",
  "More search results available. Refine your search to see them.":
    "还有更多搜索结果，请缩小搜索范围以查看。",
  "Open PDF": "打开 PDF",
  "Filter threads by environment": "按环境筛选任务",
  "Filter threads by project": "按项目筛选任务",
  "Reset thread filters": "重置任务筛选",
  "Opens environment settings": "打开环境设置",
  "Close command palette": "关闭命令面板",
  "Search commands, projects, and threads": "搜索命令、项目和任务",
  "Search commands, projects, and threads…": "搜索命令、项目和任务…",
  "New thread in…": "在以下位置新建任务…",
  "The sidebar couldn't be displayed": "无法显示侧栏",
  "The inspector couldn't be displayed": "无法显示检查面板",
  "Make pane wider": "加宽面板",
  "Make pane narrower": "缩窄面板",
  "Review files": "审查文件",
  "Filter review files": "筛选审查文件",
  "Test files are hidden from this review.": "此次审查已隐藏测试文件。",
  "Show test files": "显示测试文件",
  "Loading changed files": "正在加载已更改文件",
  "Hide test files": "隐藏测试文件",
  "Diff options": "差异选项",
  "Word wrap": "自动换行",
  "Only test files changed": "仅测试文件有更改",
  "Retry loading remaining files": "重试加载其余文件",
  "Submit review": "提交审查",
  "Add comment": "添加评论",
  "Copy line": "复制行",
  "Start tour": "开始导览",
  "Guide options": "导览选项",
  "Runs on": "运行环境",
  Task: "任务",
  "Check for issues": "检查问题",
  Context: "上下文",
  Model: "模型",
  Workspace: "工作区",
  "Run in": "运行位置",
  "Checkout path": "检出路径",
  Schedule: "计划",
  Repeat: "重复",
  "Skip requests older than (minutes)": "跳过早于此时间的请求（分钟）",
  "Run every request": "运行每个请求",
  "Minutes between runs": "运行间隔（分钟）",
  "Task enabled": "任务已启用",
  "This task no longer exists.": "此任务已不存在。",
  Time: "时间",
  Edit: "编辑",
  "Save changes": "保存更改",
  "Create task": "创建任务",
  "Rotating…": "正在轮换…",
  "Rotate URL": "轮换网址",
  "Terminal output": "终端输出",
  "Attach output": "附加输出",
  "Could not load terminals": "无法加载终端",
  "Loading terminals": "正在加载终端",
  "Reading existing terminal sessions.": "正在读取已有终端会话。",
  "Custom snooze": "自定义稍后处理",
  "Cancel custom snooze": "取消自定义稍后处理",
  "Show app": "显示应用",
  "Model unavailable. Open model settings.": "模型不可用。请打开模型设置。",
  "Open parent": "打开父任务",
  "Arrange threads": "排列任务",
  "Load earlier activity": "加载更早的动态",
  "Loading earlier activity…": "正在加载更早的动态…",
  "Open terminal": "打开终端",
  "Retry workspace preparation": "重试准备工作区",
  "Worktree setup": "工作树设置",
  "Cancel setup": "取消设置",
  "Work locally": "在本地工作",
  "Close setup details": "关闭设置详情",
  "Select a pull request": "选择拉取请求",
  PRs: "拉取请求",
  "24h": "24 小时",
  "7d": "7 天",
  "30d": "30 天",
  "90d": "90 天",
  "New project": "新建项目",
  "Start a new Git repository from a name": "输入名称以创建新的 Git 仓库",
  "Created without a first commit": "项目已创建，但未完成首次提交",
  "Could not create the GitHub repository": "无法创建 GitHub 仓库",
  "The project was created but has not reached this device yet. It will appear in the project list once the connection catches up.":
    "项目已创建，但尚未同步到此设备。连接恢复同步后，它将出现在项目列表中。",
  "Project name": "项目名称",
  "Create private repository on GitHub": "在 GitHub 上创建私有仓库",
  "Create project": "创建项目",
  "Add existing project": "添加已有项目",
  "Open a folder or clone a repository": "打开文件夹或克隆仓库",
  Creates: "创建位置：",
  "Goes in": "存放位置：",
  "Could not switch machine": "无法切换机器",
  "The folder for threads without a project could not be created.":
    "无法创建未关联项目任务的文件夹。",
  "It has not reached this device yet. Try again.": "尚未同步到此设备，请重试。",
  "Could not start without a project": "无法在不关联项目的情况下启动",
  "It has not reached this device yet. Pick No project from the list once it appears.":
    "尚未同步到此设备。同步完成后，请在列表中选择“不关联项目”。",
  "No project": "不关联项目",
  "Start a task without a project": "创建不关联项目的任务",
  "Start without a project": "不关联项目并开始",
  "What should we work on?": "我们来做些什么？",
  "Choose a project": "选择项目",
  "Opens the project picker": "打开项目选择器",
  "Search projects": "搜索项目",
  "Try a different project name or workspace path.": "请尝试其他项目名称或工作区路径。",
  "No matching projects": "没有匹配的项目",
  "Clear model search": "清除模型搜索",
  Enable: "启用",
  "Requires access to your Cursor login in macOS Keychain.":
    "需要访问 macOS 钥匙串中的 Cursor 登录信息。",
  "Manage usage": "管理用量",
  "ChatGPT shared usage": "ChatGPT 共享用量",
  Account: "账户",
  Actions: "操作",
  "Add attachment": "添加附件",
  "Add Comment": "添加评论",
  "Add Environment": "添加环境",
  "Add environment": "添加环境",
  "Add image": "添加图片",
  "Add new project": "添加新项目",
  "Add project": "添加项目",
  "Add an environment before creating a task.": "请先添加环境，再创建任务。",
  "Add an environment to load projects and start coding sessions.":
    "添加环境以加载项目并开始编程会话。",
  "All environments": "所有环境",
  "All projects": "所有项目",
  "All providers": "所有提供商",
  "Allow camera": "允许使用相机",
  "Allow camera access to scan an environment pairing QR code.": "允许使用相机扫描环境配对二维码。",
  "Allow once": "仅允许一次",
  "Allow session": "本次会话允许",
  App: "应用",
  Appearance: "外观",
  "Approval needed": "需要批准",
  Approval: "待批准",
  Archive: "归档",
  "Archived thread options": "归档任务选项",
  "Archived Threads": "已归档任务",
  "Ask anything…": "输入任何问题…",
  "Ask the agent to inspect the repo, run a command, or continue the active thread.":
    "让智能体检查仓库、运行命令或继续当前任务。",
  "Ask the repo agent, or run a command…": "向仓库智能体提问，或运行命令…",
  "Auto-settle merged threads": "合并后自动收起任务",
  "Auto-accept edits": "自动接受编辑",
  Auto: "自动",
  Available: "可用",
  "Awaiting Input": "等待输入",
  "Back to chat": "返回对话",
  Branch: "分支",
  "Base branch": "基础分支",
  "Branch changes": "分支更改",
  "Branches & worktrees": "分支与工作树",
  "Browse a folder on disk": "浏览磁盘上的文件夹",
  "Browse folders": "浏览文件夹",
  "By model": "按模型",
  "Cache savings": "缓存节省",
  "Cached input": "缓存输入",
  "Camera access needed": "需要相机权限",
  "Camera access was denied for this app. Open Settings to enable it.":
    "此应用的相机权限已被拒绝。请前往系统设置启用。",
  "Camera permission is required to scan a QR code.": "扫描二维码需要相机权限。",
  Cancel: "取消",
  "Cancel new task": "取消新任务",
  "Cancel thread settings": "取消任务设置",
  Catalog: "目录",
  "Changed files": "已更改文件",
  "Choose project": "选择项目",
  "Choose model": "选择模型",
  "Choose a thread from the sidebar or start a new task.": "从侧栏选择任务，或新建任务。",
  "Choose another environment or create a new task.": "选择其他环境，或新建任务。",
  "Choose another project or create a new task.": "选择其他项目，或新建任务。",
  "Choose branch": "选择分支",
  "Choose Files": "选择文件",
  Clear: "清除",
  "Clear all client caches?": "清除所有客户端缓存？",
  "Clear search": "清除搜索",
  "Clearing caches never removes environment connections, credentials, account data, or appearance preferences.":
    "清除缓存不会移除环境连接、凭据、账户数据或外观偏好。",
  Clean: "干净",
  "Client Storage": "客户端存储",
  "Client storage is temporarily unavailable. Try again after restarting the app.":
    "客户端存储暂时不可用。请重启应用后重试。",
  "Clone project": "克隆项目",
  "Close scanner": "关闭扫码器",
  "Close legal document": "关闭法律文档",
  "Close new task": "关闭新任务",
  "Code & Diffs": "代码与差异",
  "Collapse user input": "收起用户输入",
  "Color scheme": "配色方案",
  Commands: "命令",
  Comment: "评论",
  Commit: "提交",
  "Commit changes": "提交更改",
  "Commit message": "提交说明",
  "Commit on new branch": "提交到新分支",
  "Commit, files, branches": "提交、文件和分支",
  Configuration: "配置",
  Confirm: "确认",
  "Confirm action": "确认操作",
  "Connect an environment to see usage.": "连接环境后即可查看用量。",
  Connected: "已连接",
  Connecting: "正在连接",
  "Connecting to environment": "正在连接环境",
  "Connection failed": "连接失败",
  Copied: "已复制",
  "Copy code": "复制代码",
  "Copy message": "复制消息",
  "Copy path": "复制路径",
  "Copy trace ID": "复制跟踪 ID",
  "Could not cancel import": "无法取消导入",
  "Could not change project": "无法更改项目",
  "Could not delete pending task": "无法删除待处理任务",
  "Could not import shared content": "无法导入共享内容",
  "Could not load every archive": "部分归档加载失败",
  "Could not load T3 Connect environments": "无法加载 T3 Connect 环境",
  "Could not load conversation": "无法加载对话",
  "Could not read limits.": "无法读取额度。",
  "Could not archive thread": "无法归档任务",
  "Could not delete thread": "无法删除任务",
  "Could not settle thread": "无法收起任务",
  "Could not unarchive thread": "无法取消归档任务",
  "Could not un-settle thread": "无法恢复任务",
  "Could not move thread": "无法移动任务",
  "Could not pin thread": "无法置顶任务",
  "Could not queue task": "无法将任务加入队列",
  "Could not regenerate title": "无法重新生成标题",
  "could not report usage.": "无法报告用量。",
  "Could not snooze thread": "无法稍后处理任务",
  "Could not start task": "无法启动任务",
  "Could not switch branch": "无法切换分支",
  "Could not restore draft": "无法恢复草稿",
  "Could not unpin thread": "无法取消置顶任务",
  "Could not update environment": "无法更新环境",
  "Could not wake thread": "无法唤醒任务",
  "Create & checkout": "创建并切换",
  "Create a task to start a new coding session.": "创建任务以开始新的编程会话。",
  "Create worktree": "创建工作树",
  "Created at": "创建时间",
  "Custom font size": "自定义字号",
  Decline: "拒绝",
  Default: "默认",
  "Default grouping": "默认分组",
  "Delete pending task?": "删除待处理任务？",
  "Device Notifications": "设备通知",
  "Dismiss voice input error": "关闭语音输入错误",
  "Disable notifications": "关闭通知",
  "Dismiss keyboard": "收起键盘",
  Environment: "环境",
  "Environment caches": "环境缓存",
  "Environment unavailable": "环境不可用",
  Error: "错误",
  "Excluded from this commit": "未包含在本次提交中",
  "Existing branches": "现有分支",
  Failed: "失败",
  "Feature branch & continue": "创建功能分支并继续",
  "File actions": "文件操作",
  "File unavailable": "文件不可用",
  Files: "文件",
  "Files unavailable": "文件列表不可用",
  "Fill in the pending answers": "填写待回答内容",
  "Filter and sort archived threads": "筛选和排序已归档任务",
  "Filter and sort threads": "筛选和排序任务",
  "Filter models": "筛选模型",
  "Find a branch": "查找分支",
  "Find a model": "查找模型",
  "Full access": "完全访问",
  "Font size": "字号",
  General: "常规",
  Host: "主机",
  "Image unavailable": "图片不可用",
  "Markdown image": "Markdown 图片",
  Input: "待输入",
  "Inspect turn diffs, worktree changes, and base branch diff":
    "检查轮次差异、工作树更改和基础分支差异",
  "Inspecting cached data…": "正在检查缓存数据…",
  "Invalid QR code": "无效的二维码",
  Label: "名称",
  "Latest turn": "最新轮次",
  "Last user message": "最近用户消息",
  "Live Activity Updates": "实时活动更新",
  Light: "浅色",
  "Leave a comment...": "留下评论…",
  "Leave empty to auto-generate": "留空以自动生成",
  Legacy: "旧版功能",
  "Legacy models": "旧版模型",
  "Legacy Thread List": "旧版任务列表",
  Legal: "法律信息",
  "Loading archive...": "正在加载归档…",
  "Loading branches...": "正在加载分支…",
  "Loading branches…": "正在加载分支…",
  "Loading diff…": "正在加载差异…",
  "Loading file...": "正在加载文件…",
  "Loading image...": "正在加载图片…",
  "Loading image…": "正在加载图片…",
  "Loading linked cloud environments.": "正在加载关联的云端环境。",
  "Loading environments": "正在加载环境",
  "Loading messages...": "正在加载消息…",
  "Loading projects and threads from the saved environment.": "正在从已保存的环境加载项目和任务。",
  "Loading projects from the saved environment.": "正在从已保存的环境加载项目。",
  "Loading task": "正在加载任务",
  Limits: "额度",
  "Local folder": "本地文件夹",
  "Managed by T3 Connect. Tunnel details update automatically.":
    "由 T3 Connect 管理，隧道信息会自动更新。",
  "Messages, labels, and headings scale with this size.": "消息、标签和标题会随此字号缩放。",
  "Mobile control surface for your live coding environments": "随时控制正在运行的编程环境",
  "Cloud VM": "云端虚拟机",
  "Mac mini": "Mac mini",
  "Mac Studio": "Mac Studio",
  "Model and reasoning settings": "模型与推理设置",
  "Model filters": "模型筛选",
  "Microphone unavailable": "麦克风不可用",
  "Move down": "下移",
  "Move up": "上移",
  "Messages not cached": "消息尚未缓存",
  More: "更多",
  "more files": "个其他文件",
  "Navigate up": "返回上一级",
  "Native terminal unavailable. Using text fallback.": "原生终端不可用，正在使用文本模式。",
  "New branch": "新建分支",
  "New task": "新建任务",
  "New Task": "新建任务",
  "New Thread": "新建任务",
  "New worktree": "新建工作树",
  "Newest first": "最新优先",
  "No activity in this window.": "此时间范围内没有活动。",
  "No additional linked cloud environments.": "没有其他关联的云端环境。",
  "No cached data": "没有缓存数据",
  "No changed files are available to commit.": "没有可提交的文件更改。",
  "No changes": "没有更改",
  "No conversation yet": "还没有对话",
  "No environments connected yet.": "尚未连接环境。",
  "No environments connected": "尚未连接环境",
  "No files found": "未找到文件",
  "No local branches found.": "未找到本地分支。",
  "No matching models": "没有匹配的模型",
  "No matching commands.": "没有匹配的命令。",
  "No matching files or folders.": "没有匹配的文件或文件夹。",
  "No open PR": "没有打开的 PR",
  "No project scripts": "没有项目脚本",
  "No projects found": "未找到项目",
  "No results": "没有结果",
  "No review diffs": "没有可审查的差异",
  "No selection": "尚未选择内容",
  "No threads yet": "还没有任务",
  "No skills found.": "未找到技能。",
  "No results.": "没有结果。",
  "Not a git repository": "不是 Git 仓库",
  "Not a repo": "不是仓库",
  "Not connected": "未连接",
  "Notifications disabled": "通知已关闭",
  "Notifications enabled": "通知已启用",
  "Notifications unavailable": "通知不可用",
  "Notifications were denied for this app. Open Settings to enable them.":
    "此应用的通知权限已被拒绝。请前往系统设置启用。",
  "Notifications were not enabled.": "通知未能启用。",
  "Offline cache records will appear here after environments are used.":
    "使用环境后，离线缓存记录会显示在这里。",
  "Oldest first": "最早优先",
  "Open files": "打开文件",
  "Open in Browser": "在浏览器中打开",
  "Open in browser": "在浏览器中打开",
  "Open in Safari": "在浏览器中打开",
  "Open legal documents in external browser": "在外部浏览器中打开法律文档",
  "Open new terminal": "打开新终端",
  "Open terminal to start a shell.": "打开终端以启动 Shell。",
  "Open settings": "打开设置",
  "Open microphone settings": "打开麦克风设置",
  Offline: "离线",
  "Opt into retired interfaces kept for compatibility. Plan Mode restores the Build/Plan control; otherwise every task runs in Build mode.":
    "启用为兼容性保留的旧版界面。计划模式会恢复构建/计划控制；否则所有任务均以构建模式运行。",
  Options: "选项",
  "Or type a custom answer": "或输入自定义回答",
  Output: "输出",
  "Pairing code": "配对码",
  "Partial diff": "差异内容不完整",
  "Partial file": "文件内容不完整",
  Pending: "等待中",
  "Plain text": "纯文本",
  "Plan Mode": "计划模式",
  Plan: "方案",
  Build: "执行",
  "Plan Ready": "计划已就绪",
  "Photo Library": "照片图库",
  Preparing: "正在准备",
  "Preparing voice input": "正在准备语音输入",
  Pin: "置顶",
  "Preparing image preview...": "正在准备图片预览…",
  "Preparing preview...": "正在准备预览…",
  Preview: "预览",
  "Preview failed": "预览失败",
  "Preview limited to the first 1 MB of a truncated file.": "截断文件仅预览前 1 MB。",
  "Processed tokens": "已处理 Token",
  Photos: "照片",
  Project: "项目",
  "Project already exists": "项目已存在",
  "Project Grouping": "项目分组",
  Provider: "提供商",
  Providers: "提供商",
  Reasoning: "推理强度",
  Reconnecting: "正在重新连接",
  "Reconnect this environment to load the conversation.": "重新连接此环境以加载对话。",
  "Regenerate title": "重新生成标题",
  "Regenerating…": "正在重新生成…",
  "Pull latest": "拉取最新更改",
  Queued: "已排队",
  "queued message": "条排队消息",
  Refresh: "刷新",
  "Refresh models": "刷新模型",
  "Refresh archived threads": "刷新已归档任务",
  "Refresh files": "刷新文件",
  "Remove environment?": "移除环境？",
  Repository: "仓库",
  Reset: "重置",
  "Resize detail pane": "调整详情面板大小",
  "Restart the app and try again.": "请重启应用后重试。",
  "Retry now": "立即重试",
  "Return home": "返回首页",
  "Return to chat": "返回对话",
  "Review changes": "审查更改",
  "Review unavailable": "审查不可用",
  "Run command": "运行命令",
  "Route not found": "找不到页面",
  Runtime: "运行环境",
  Save: "保存",
  "Scan QR Code": "扫描二维码",
  "Scan QR code": "扫描二维码",
  "Scanning provider transcripts…": "正在扫描提供商记录…",
  "Scroll to end": "滚动到底部",
  Search: "搜索",
  "Search archived threads": "搜索已归档任务",
  "Search files": "搜索文件",
  "Search threads": "搜索任务",
  "Select a diff line or range first.": "请先选择一行或一段差异。",
  "Select a thread": "选择任务",
  "Select diff": "选择差异",
  "Select review diff": "选择要审查的差异",
  "Set up T3 Connect": "设置 T3 Connect",
  Settle: "收起",
  Settings: "设置",
  "Shared content unavailable": "共享内容不可用",
  "Show keyboard": "显示键盘",
  "Show legacy models": "显示旧版模型",
  "Show threads from every environment": "显示所有环境的任务",
  "Show threads from every project": "显示所有项目的任务",
  "Sign in to T3 Connect": "登录 T3 Connect",
  "Sign in to your T3 account to set up T3 Connect.": "登录 T3 账户以设置 T3 Connect。",
  "Sign in": "登录",
  Skills: "技能",
  Snooze: "稍后处理",
  "Snooze until": "稍后处理至",
  "Some environments are still reporting. Totals are partial.":
    "部分环境仍在上报，用量汇总暂不完整。",
  "Some shared content was skipped": "部分共享内容已跳过",
  "Sort by archived date": "按归档日期排序",
  "Sort projects": "排序项目",
  "Sort threads": "排序任务",
  Source: "来源",
  "Start another shell for this thread": "为此任务启动另一个终端",
  "Start dictation": "开始语音输入",
  "Start from origin": "从 origin 开始",
  "Start or reconnect an environment before adding a project.":
    "添加项目前，请先启动或重新连接环境。",
  Stop: "停止",
  "Stop agent": "停止智能体",
  Supervised: "监督模式",
  System: "跟随系统",
  "Syncing messages...": "正在同步消息…",
  Transcribing: "正在转写",
  "Storage unavailable": "存储不可用",
  "Submit answers": "提交回答",
  "Switch branch, create branch, or move to a worktree": "切换或创建分支，或移动到工作树",
  "T3 Account": "T3 账户",
  "T3 Code works locally without signing in. Cloud features are optional.":
    "无需登录即可在本地使用 T3 Code，云端功能为可选项。",
  Tap: "点击",
  Terminal: "终端",
  "Terminal options": "终端选项",
  "Terminal unavailable": "终端不可用",
  Text: "文本",
  "Text size": "文本字号",
  "That snooze time has passed. Choose another time.": "该稍后处理时间已经过去，请选择其他时间。",
  "The image could not be loaded into the local cache.": "无法将图片加载到本地缓存。",
  "The pull request could not be opened.": "无法打开 Pull Request。",
  "The shared content is no longer in the inbox. You can continue editing this task draft.":
    "共享内容已不在收件箱中，你仍可继续编辑此任务草稿。",
  Themes: "主题",
  "This branch does not have an open pull request.": "此分支没有打开的 Pull Request。",
  "The connected environment did not report any projects.": "已连接的环境没有返回任何项目。",
  "The pending task could not be removed.": "无法移除待处理任务。",
  "This thread was deleted or is no longer available.": "此任务已删除或不再可用。",
  "This environment's server does not support pinned reordering yet. Update the server to reorder pins.":
    "此环境的服务器暂不支持调整置顶顺序，请更新服务器。",
  "This environment's server does not support pinning yet. Update the server to use Pin.":
    "此环境的服务器暂不支持置顶，请更新服务器。",
  "This environment's server does not support settling yet. Update the server to use Settle.":
    "此环境的服务器暂不支持收起任务，请更新服务器。",
  "This environment's server does not support snoozing yet. Update the server to use Snooze.":
    "此环境的服务器暂不支持稍后处理，请更新服务器。",
  "This environment's server does not support snoozing yet. Update the server to wake this thread.":
    "此环境的服务器暂不支持唤醒任务，请更新服务器。",
  "This environment's server does not support title regeneration yet. Update the server to regenerate thread titles.":
    "此环境的服务器暂不支持重新生成标题，请更新服务器。",
  "This file path is invalid.": "文件路径无效。",
  "This project has no saved scripts yet": "此项目还没有已保存的脚本",
  "This removes offline data for every environment. Connections, credentials, account data, and app preferences stay intact.":
    "这会移除所有环境的离线数据，但会保留连接、凭据、账户数据和应用偏好。",
  "This removes offline threads, server metadata, and cached branches for this environment. The saved connection and credentials stay intact.":
    "这会移除此环境的离线任务、服务器元数据和缓存分支，但会保留连接与凭据。",
  "This terminal route needs an active thread and workspace.": "打开终端需要有效的任务和工作区。",
  "This thread does not have a workspace root yet, so there is nowhere to open a shell.":
    "此任务还没有工作区根目录，无法打开终端。",
  "This thread does not have an active workspace path.": "此任务没有有效的工作区路径。",
  "This thread has no ready turn diffs and the worktree diff is empty.":
    "此任务没有可用的轮次差异，工作树差异也为空。",
  "This thread is not available in the current mobile snapshot.": "当前移动端快照中没有此任务。",
  "This thread is working. Interrupt it first, then try again.": "此任务仍在运行，请先中断后重试。",
  "This thread still needs attention. Resolve or interrupt it first, then try again.":
    "此任务仍需处理，请先解决或中断后重试。",
  "Thread list options": "任务列表选项",
  "Thread settings": "任务设置",
  "Thread unavailable": "任务不可用",
  Threads: "任务",
  Totals: "汇总",
  "Try again": "重试",
  "Try Again": "重试",
  Turn: "轮次",
  "Turn diffs and worktree changes": "轮次差异与工作树更改",
  "type and press return": "输入后按回车",
  "Unable to open PR": "无法打开 PR",
  "Uncached input": "未缓存输入",
  Unpriced: "未计价",
  "Update failed": "更新失败",
  "Update ready": "更新已就绪",
  "Use template": "使用模板",
  "Start a Codex thread first": "请先启动 Codex 任务",
  "Send a message before you submit feedback.": "发送一条消息后才能提交反馈。",
  "Could not send feedback to OpenAI": "无法向 OpenAI 发送反馈",
  "Feedback sent to OpenAI": "反馈已发送给 OpenAI",
  "Sending feedback to OpenAI...": "正在向 OpenAI 发送反馈...",
  "An error occurred.": "发生了错误。",
  "Copy ID": "复制 ID",
  "Codex feedback thread ID": "Codex 反馈任务 ID",
  "Install Now": "立即安装",
  Later: "稍后",
  Delete: "删除",
  "Clear Cache": "清除缓存",
  Usage: "用量",
  "User input needed": "需要用户输入",
  "Un-settle": "恢复任务",
  Unpin: "取消置顶",
  Version: "版本",
  "Warning: this is the default branch.": "警告：这是默认分支。",
  Wake: "唤醒",
  "Wake thread": "唤醒任务",
  "What should we build": "想要构建什么",
  "Word break": "自动换行",
  "work log": "工作日志",
  "Working for": "已运行",
  "Working tree": "工作树",
  Working: "运行中",
  "You are offline": "当前处于离线状态",
  "Compact and continue": "压缩并继续",
  "Don't ask again": "不再询问",
  "Keep full history": "保留完整历史",
  "Keep full history and skip future resume prompts.": "保留完整历史，并跳过以后继续会话时的提示。",
  "Resume session": "继续会话",
  "Resume with a summary and use fewer tokens.": "生成摘要后继续，以减少令牌用量。",
  "Resume without changing the conversation.": "保留对话不变并继续。",
  "Cancel dictation": "取消语音输入",
  "Finish dictation": "完成语音输入",
  "All accounts are shown by connected providers.": "所有账户均已由已连接的提供商显示。",
  "Antigravity cannot be installed on this environment. Use a supported server host or set an executable path in provider settings.":
    "此环境无法安装 Antigravity。请使用受支持的服务器主机，或在提供商设置中指定可执行文件路径。",
  "Attach the file again and retry.": "请重新附加文件后重试。",
  "Cancel install": "取消安装",
  "Cancel sign-in": "取消登录",
  "Checking credentials.": "正在检查凭据。",
  "Checking environment access.": "正在检查环境访问权限。",
  "Checking Google sign-in.": "正在检查 Google 登录状态。",
  "Checking the Antigravity installation.": "正在检查 Antigravity 安装。",
  "Close image": "关闭图片",
  "Close video": "关闭视频",
  "Complete sign-in": "完成登录",
  Connect: "连接",
  "Connect with the credentials set in provider settings on web or desktop.":
    "使用网页版或桌面版提供商设置中配置的凭据进行连接。",
  "Copy full path": "复制完整路径",
  "Copy relative path": "复制相对路径",
  "Copy sign-in link": "复制登录链接",
  "Copy URL": "复制 URL",
  "Could not cancel sign-in. Try again.": "无法取消登录，请重试。",
  "Could not cancel the install. Try again.": "无法取消安装，请重试。",
  "Could not change this provider. Reconnect and try again.":
    "无法更改此提供商，请重新连接后重试。",
  "Could not check your environment access.": "无法检查环境访问权限。",
  "Could not complete Google sign-in. Check the return URL and try again.":
    "无法完成 Google 登录，请检查返回 URL 后重试。",
  "Could not copy the sign-in link.": "无法复制登录链接。",
  "Could not load this video.": "无法加载此视频。",
  "Could not load this video. Check the connection and try again.":
    "无法加载此视频，请检查连接后重试。",
  "Could not open Google sign-in. Copy the link and open it in your browser.":
    "无法打开 Google 登录页面，请复制链接并在浏览器中打开。",
  "Could not open PDF": "无法打开 PDF",
  "Could not open preview": "无法打开预览",
  "Could not open video": "无法打开视频",
  "Could not remove the managed install. Try again.": "无法移除托管安装，请重试。",
  "Could not share file": "无法共享文件",
  "Could not sign out of Google. Try again.": "无法退出 Google 登录，请重试。",
  "Could not start Google sign-in. Try again.": "无法启动 Google 登录，请重试。",
  "Could not start the install. Try again.": "无法启动安装，请重试。",
  "Could not use the reset credit.": "无法使用重置额度。",
  "Disable Antigravity": "停用 Antigravity",
  "Disable Antigravity?": "停用 Antigravity？",
  Disabled: "已停用",
  Disable: "停用",
  Disconnect: "断开连接",
  "Disconnect Antigravity?": "断开 Antigravity 连接？",
  Enabled: "已启用",
  "Enable Antigravity": "启用 Antigravity",
  "Enable Antigravity to sign in.": "请先启用 Antigravity 再登录。",
  "Extracting Antigravity files.": "正在解压 Antigravity 文件。",
  "Google account": "Google 账户",
  "Gemini Enterprise": "Gemini 企业版",
  "Gemini API key": "Gemini API 密钥",
  "Agent Platform (Vertex AI)": "Agent Platform（Vertex AI）",
  "Google sign-in return URL": "Google 登录返回 URL",
  Image: "图片",
  "Install Antigravity": "安装 Antigravity",
  "Install Antigravity to sign in.": "请先安装 Antigravity 再登录。",
  "Install status is unavailable. Reconnect and try again.": "无法获取安装状态，请重新连接后重试。",
  Installed: "已安装",
  Loading: "正在加载",
  "Loading provider settings.": "正在加载提供商设置。",
  "Loading video": "正在加载视频",
  "Loading video...": "正在加载视频...",
  "Media actions": "媒体操作",
  "No accounts reported.": "未报告任何账户。",
  "No limits reported.": "未报告额度。",
  "No reset credit left.": "没有剩余的重置额度。",
  "No reset credits banked": "没有可用的重置额度",
  "Not installed": "未安装",
  ". Not installed": "。未安装",
  "Nothing to reset right now.": "当前没有需要重置的额度窗口。",
  "Open Google sign-in": "打开 Google 登录页面",
  "Open in file viewer": "在文件查看器中打开",
  "Opening share sheet…": "正在打开共享面板…",
  "Opening share sheet...": "正在打开共享面板...",
  "Please try again.": "请重试。",
  "Preview unavailable": "预览不可用",
  "Reconnect to this environment and open the video again.": "请重新连接此环境后再次打开视频。",
  "Reconnect to this environment and try again.": "请重新连接此环境后重试。",
  "Reconnect to this environment to continue setup.": "请重新连接此环境以继续设置。",
  Remove: "移除",
  "Remove managed install": "移除托管安装",
  "Remove the Antigravity install?": "移除 Antigravity 安装？",
  "Reset applied. Your windows have cleared.": "重置已生效，当前额度窗口已清空。",
  "Retry connection": "重试连接",
  "Retry Google sign-in": "重试 Google 登录",
  "Retry install": "重试安装",
  "Retry video": "重试播放视频",
  Retry: "重试",
  "Save or share": "保存或共享",
  "Save or share video": "保存或共享视频",
  "Sign in with Google": "使用 Google 登录",
  "Sign in with the Google account you use for Antigravity.":
    "使用你用于 Antigravity 的 Google 账户登录。",
  "Sign-in has not been checked.": "尚未检查登录状态。",
  "Sign-in is open on another client. Complete it there or wait for it to expire.":
    "登录流程已在另一客户端打开，请在那里完成，或等待其过期。",
  "Sign-in status is unavailable. Reconnect and try again.": "无法获取登录状态，请重新连接后重试。",
  "Signed in. Credentials stay on this environment.": "已登录，凭据将保存在此环境中。",
  "Sign out": "退出登录",
  "Sign out of Google": "退出 Google 登录",
  "Sign out of Google?": "退出 Google 登录？",
  "Starting Google sign-in.": "正在启动 Google 登录。",
  "That credit was already redeemed.": "该重置额度已被使用。",
  "The file could not be loaded. It may have been moved or deleted.":
    "无法加载该文件，它可能已被移动或删除。",
  "The file could not be loaded. Please try again.": "无法加载该文件，请重试。",
  "The file could not be loaded. Reconnect and try again.": "无法加载该文件，请重新连接后重试。",
  "The local attachment file is missing.": "本地附件文件已丢失。",
  "The rest of this setup can be completed from web or desktop.":
    "其余设置可在网页版或桌面版中完成。",
  "This account has no subscription limits.": "此账户没有订阅额度。",
  "This attachment is no longer available. Attach the file again.":
    "此附件已不可用，请重新附加该文件。",
  "This connection cannot manage providers. Pair again with permission to operate this environment.":
    "此连接无权管理提供商。请重新配对，并授予操作此环境的权限。",
  "This file may be missing, unsupported, or unavailable on this environment.":
    "此文件可能已丢失、格式不受支持，或在该环境中不可用。",
  "This provider is not available on this environment.": "此环境中没有该提供商。",
  "This provider link is not valid.": "此提供商链接无效。",
  "This video couldn't be loaded or played. Check the connection, or touch and hold the video to save or share the original.":
    "无法加载或播放此视频。请检查连接，或长按视频以保存或共享原文件。",
  "Touch and hold for media actions": "长按以显示媒体操作",
  "Try again.": "请重试。",
  "Upload failed. Tap to retry.": "上传失败，点击重试。",
  "Use a reset credit": "使用重置额度",
  "Use a reset credit?": "使用一个重置额度？",
  "Use credit": "使用额度",
  "Using credit…": "正在使用额度…",
  "Use reset": "使用重置额度",
  "Usage limits": "用量限额",
  "Dismiss usage limits": "关闭用量限额",
  "Dismiss feedback notice": "关闭反馈提示",
  "Dismiss without answering": "不回答并关闭",
  "Ahead of pace": "用量偏快",
  "On pace": "用量正常",
  "Under pace": "用量偏慢",
  left: "剩余",
  now: "现在",
  "Show account details": "显示账号详情",
  "Select an environment to see limits.": "选择一个环境以查看限额。",
  "No provider on the selected environments reports subscription limits.":
    "所选环境中没有提供商报告订阅限额。",
  "Hide account email": "隐藏账号邮箱",
  "Reveal account email": "显示账号邮箱",
  "This account is no longer reporting limits on the selected environments.":
    "此账号已不再报告所选环境的限额。",
  Resets: "重置时间",
  Restores: "恢复额度",
  "Signed in": "登录位置",
  "Reset credits": "重置额度",
  "Raw token cost": "原始 Token 成本",
  "* if billed at full API rate": "* 按完整 API 费率估算",
  "Past 24 hours": "过去 24 小时",
  "Past 7 days": "过去 7 天",
  "Past 30 days": "过去 30 天",
  "Past 90 days": "过去 90 天",
  Cost: "成本",
  Tokens: "Token",
  Environments: "环境",
  "Filter usage environments": "筛选用量环境",
  "Filter usage environments, some environments are loading": "筛选用量环境，部分环境仍在加载",
  "Select an environment to see usage.": "选择一个环境以查看用量。",
  "Older server · excluded from usage totals": "服务器版本较旧 · 未计入用量总计",
  "Disconnected · showing saved usage": "连接已断开 · 正在显示已保存的用量",
  "Waiting for connection…": "正在等待连接…",
  "Usage unavailable · showing saved totals": "用量不可用 · 正在显示已保存的总计",
  "Usage unavailable": "用量不可用",
  "Updating usage…": "正在更新用量…",
  "Loading usage…": "正在加载用量…",
  "Usage up to date": "用量已是最新",
  "Cache read": "缓存读取",
  "Cache write": "缓存写入",
  "of records, excluded from cost": "记录未计价，已从成本中排除",
  "Video unavailable": "视频不可用",
  "Waiting for the environment.": "正在等待环境响应。",
  "Complete sign-in in your browser.": "请在浏览器中完成登录。",
  "After sign-in, the browser will open a 127.0.0.1 address that cannot load on your phone. Copy that full address and paste it here.":
    "登录后，浏览器会打开一个手机无法访问的 127.0.0.1 地址。请复制完整地址并粘贴到这里。",
  "This redeems one credit on your account and clears the current rate-limit windows. It cannot be undone.":
    "这会使用账户中的一个重置额度并清空当前速率限制窗口，且无法撤销。",
  "Attachment still uploading": "附件仍在上传",
  "Retry or remove the failed attachment": "请重试或移除上传失败的附件",
  Worktree: "工作树",
  "Switching branch...": "正在切换分支…",
  "The branch could not be checked out.": "无法检出该分支。",
  "The task could not be saved to the outbox.": "无法将任务保存到发送队列。",
  "Your prompt was kept in the project draft.": "你的提示词已保留在项目草稿中。",
  "Edit task": "编辑任务",
  "Setting up worktree…": "正在设置工作树…",
  "Starting…": "正在启动…",
  "Starting the task…": "正在启动任务…",
  "New thread on branch": "基于分支新建任务",
  "Default workspace": "默认工作区",
  "Default permissions": "默认权限",
  "Response streaming": "流式响应",
  "Preview browser": "预览浏览器",
  "Agent browser access": "智能体浏览器访问",
  "Remove agent credits when merging": "合并时移除智能体署名",
  "Default branch": "默认分支",
  "Automatically pull": "自动拉取",
  "New worktrees": "新工作树",
  "Worktree submodules": "工作树子模块",
  "Manage environments": "管理环境",
  "Check provider updates": "检查提供商更新",
  "Continue after restart": "重启后继续",
  "Resume interrupted agent turns when this server starts again.":
    "此服务器重新启动时恢复中断的智能体轮次。",
  "Applies across connected environments unless a project overrides it.":
    "应用于所有已连接的环境，除非项目另有覆盖设置。",
  "Update the selected environments to change default workspace, permissions, or streaming.":
    "更新所选环境以更改默认工作区、权限或流式传输设置。",
  "No connected environments support these controls yet.": "尚无已连接的环境支持这些控制项。",
  "Only environments with permission to change settings are updated.":
    "仅更新具有更改设置权限的环境。",
  "Check whether installed provider CLIs have newer versions.":
    "检查已安装的提供商 CLI 是否有新版本。",
  "Where new threads open when you do not pick a worktree mode.":
    "未选择工作树模式时新任务的打开位置。",
  "Approval level for new threads before a project or thread overrides it.":
    "项目或任务覆盖前新任务的审批级别。",
  "How assistant text appears while the agent is still responding.":
    "智能体响应期间助手文本的显示方式。",
  "Whole messages": "完整消息",
  "In-app browser panel and agent browser control on this server.":
    "此服务器上的应用内浏览器面板与智能体浏览器控制。",
  "Let agents open and inspect pages through the built-in browser.":
    "允许智能体通过内置浏览器打开和检查页面。",
  "Strip Co-Authored-By lines and PR attribution footers when T3 merges a PR.":
    "T3 合并拉取请求时移除 Co-Authored-By 行和 PR 署名页脚。",
  "Branches, pulling, and worktree setup on this server.": "此服务器上的分支、拉取和工作树设置。",
  "Used when initializing a new Git repository.": "初始化新 Git 仓库时使用。",
  "Fast-forward clean branches from their upstream remote in the background.":
    "在后台从上游远程分支快进合并干净的分支。",
  "Initialize and update Git submodules when creating a worktree.":
    "创建工作树时初始化并更新 Git 子模块。",
  "This environment is disconnected. Reconnect before saving.":
    "此环境已断开连接，请重新连接后再保存。",
  "Time uses the environment's time zone, which may differ from your phone's.":
    "时间使用环境所在时区，可能与手机时区不同。",
  "Save the task to get its webhook URL.": "保存任务以获取其 Webhook URL。",
  "No connected environments": "没有已连接的环境",
  "Connect an environment before creating a scheduled task.": "请先连接环境，再创建计划任务。",
  "Run prompts on a schedule or from an incoming webhook on a connected environment.":
    "在已连接的环境上按计划或通过传入的 Webhook 运行提示词。",
  "Read-only on this connection": "此连接为只读",
  "This connection can view scheduled tasks, but needs Operate permission to create or change them.":
    "此连接可查看计划任务，但需要操作权限才能创建或更改。",
  "New task requires Operate permission": "新建任务需要操作权限",
  "Select or reconnect an environment with Operate permission to create a scheduled task.":
    "请选择或重新连接具有操作权限的环境以创建计划任务。",
  "Delete scheduled task?": "删除计划任务？",
  "Enter a name and prompt.": "请输入名称和提示词。",
  "Missing fields": "缺少必填项",
  "Could not save task": "无法保存任务",
  "Rotate webhook URL?": "轮换 Webhook 网址？",
  "Send a POST request to this URL. The secret is shown in full only when created or rotated; treat it like a password.":
    "向此网址发送 POST 请求。密钥仅在创建或轮换时完整显示，请妥善保管。",
  "Current Checkout": "当前检出目录",
  "New Worktree": "新工作树",
  "Specific Checkout": "指定检出目录",
  Hourly: "每小时",
  Daily: "每天",
  Weekly: "每周",
  Monthly: "每月",
  Cron: "Cron",
  Webhook: "Webhook",
  "Interval (hours)": "间隔（小时）",
  "Cron expression": "Cron 表达式",
  "Webhook settings": "Webhook 设置",
  "Delete task": "删除任务",
  "Environment options": "环境选项",
  "While the agent is running": "当智能体运行时",
  "Choose what sending a message does while a turn is in progress. The other action remains available from the send button menu.":
    "选择轮次进行中发送消息时的操作。另一操作仍可通过发送按钮菜单使用。",
  "Queue sends after the current turn finishes. Steer interrupts and redirects the agent right away.":
    "排队会在当前轮次结束后发送；即时引导会立即中断并引导智能体。",
  "Microphone access": "麦克风权限",
  "Preferred order": "优先顺序",
  "T3 Code uses the first connected input in this list when recording voice prompts.":
    "录制语音提示词时，T3 Code 会优先使用此列表中第一个已连接的输入设备。",
  "Check the microphone permission for this app.": "请检查此应用的麦克风权限。",
  "Grant microphone access to list and reorder recording inputs.":
    "授予麦克风权限以列出并调整录音输入设备顺序。",
  "Allow microphone": "允许使用麦克风",
  "Built-in": "内置",
  Wired: "有线",
  Bluetooth: "蓝牙",
  "USB audio": "USB 音频",
  "Check for updates": "检查更新",
  "Agent activity": "智能体活动",
  "Turn off Live Activity preference": "关闭实时活动偏好设置",
  "Live Update Settings": "实时更新设置",
  "Choose a project with the filter above to manage its name, checkouts and removal.":
    "使用上方筛选器选择项目，以管理其名称、检出和移除。",
  "Remove checkout": "移除检出",
  "Remove checkout?": "移除检出？",
  "Cannot remove checkout": "无法移除检出",
  "Could not remove checkout": "无法移除检出",
  "Remove project?": "移除项目？",
  "Remove from all environments": "从所有环境中移除",
  "Could not remove project": "无法移除项目",
  "Checkouts & worktrees": "检出与工作树",
  "Removing a project only removes it from T3 Code. Files on disk are not deleted.":
    "移除项目仅会将其从 T3 Code 中移除，不会删除磁盘上的文件。",
  "Your permissions": "你的权限",
  "Add route": "添加路由",
  "In use": "使用中",
  "Routes are tried in order when connecting to this environment.":
    "连接此环境时会按顺序尝试各个路由。",
  "Routes cannot be edited for this environment.": "无法编辑此环境的路由。",
  "Route URL": "路由网址",
  "Days before auto-settle": "自动收起前天数",
  "Settings scope": "设置范围",
  "Append instructions to the naming prompt.": "在命名提示词后追加说明。",
  "Worktree branch naming": "工作树分支命名",
  "Optional instructions": "可选说明",
  "Generate from task": "根据任务生成",
  "Random name": "随机名称",
  "Custom instructions": "自定义说明",
  "Update the selected environments to edit project overrides.": "更新所选环境以编辑项目覆盖项。",
  "Use defaults": "使用默认值",
  "Project overrides": "项目覆盖项",
  "What should the agent do each time?": "智能体每次应执行什么操作？",
  "Reclaim database space": "回收数据库空间",
  "Inactive days": "不活跃天数",
  "Auto-settle defaults differ": "自动收起默认值不一致",
  "Resume after usage limits": "用量限额重置后恢复",
  "Snooze until limits reset": "稍后处理直至限额重置",
  "Auto-settle inactive threads": "自动收起不活跃任务",
  "Across environments": "跨环境",
  "Apply auto-settle defaults": "应用自动收起默认值",
  "Working section": "进行中分组",
  "When a turn stops for a usage limit, snooze the thread until the window resets.":
    "当轮次因用量限额停止时，将任务稍后处理直至限额窗口重置。",
  "Keep actively running threads in a separate Working section at the top of the list.":
    "将正在运行的任务保留在列表顶部独立的“进行中”分组内。",
  "Automatically settle threads when their pull request merges.":
    "当关联的拉取请求合并时自动收起任务。",
  "Automatically settle threads that have not had activity for the configured number of days.":
    "当任务在设定天数内无活动时自动收起。",
  "Navigation tabs": "导航标签页",
  "Tab order": "标签页顺序",
  "Reset tabs": "重置标签页",
  "Applies to the composer when a hardware keyboard is connected.": "连接硬件键盘时应用于输入框。",
  "Return key": "回车键",
  "Send message": "发送消息",
  "Insert newline": "插入换行",
  "Project grouping": "项目分组",
  "Choose how projects are grouped in the sidebar.": "选择侧栏中项目的分组方式。",
  "Select a connected environment.": "请选择已连接的环境。",
  "Limited permissions": "权限受限",
  "Configure a provider with in-app sign-in in web or desktop Settings.":
    "请在网页端或桌面端“设置”中通过应用内登录配置提供商。",
  "Send response": "发送响应",
  "Open sign-in page": "打开登录页面",
  "Open docs": "打开文档",
  "Open a scheduled task form first.": "请先打开定时任务表单。",
  "Scheduled task": "定时任务",
  "This environment is no longer saved on this device.": "此设备不再保存该环境。",
  "Connect this environment to manage it.": "连接此环境以进行管理。",
  "Update this provider on the environment's machine.": "请在该环境所在机器上更新此提供商。",
  "Refresh providers": "刷新提供商",
  "License notices are unavailable in this build.": "此构建版本中不可用许可证声明。",
  "No licenses match that search.": "没有匹配该搜索的许可证。",
  "This license notice is unavailable.": "此许可证声明不可用。",
  "Project source": "项目源码",
  "Search packages": "搜索包",
  "Pull request routing": "拉取请求路由",
  "Choose where pull request actions open or create threads.":
    "选择拉取请求操作打开或创建任务的位置。",
  "My MacBook": "我的 MacBook",
  "This connection cannot clone projects.": "此连接无法克隆项目。",
  "Clone destination": "克隆目标路径",
  "Cancel search": "取消搜索",
  "All sections are hidden": "所有分区均已隐藏",
  "Re-enable at least one tab in Navigation settings.": "请在导航设置中至少重新启用一个标签页。",
  "Open Navigation settings": "打开导航设置",
  "Tap the first and last line to select a range.": "轻点首行和末行以选择范围。",
  "Select fewer lines to fit the context limit.": "请选择较少的行以符合上下文限制。",
  "Attach selected output": "附加所选输出",
  "Attach visible output": "附加可见输出",
  "Checking terminal access": "正在检查终端访问权限",
  "No terminal sessions": "无终端会话",
  "This connection cannot manage provider accounts.": "此连接无法管理提供商账号。",
  "By type": "按类型",
  "By speed": "按速度",
  "Nothing running in the background.": "后台没有正在运行的任务。",
  "Background work": "后台工作",
  "The conversation couldn't be displayed": "无法显示对话",
  "This app cannot be shown.": "无法显示此应用。",
  "Save securely": "安全保存",
  "Snooze mode": "稍后处理模式",
  "Duration amount": "时长数值",
  "Duration unit": "时长单位",
  "Choose when snoozed threads return to your inbox.": "选择稍后处理的任务何时返回收件箱。",
  "Snooze for": "稍后处理时长",
  "Date and time": "日期与时间",
  Duration: "时长",
  Minutes: "分钟",
  Hours: "小时",
  Days: "天",
  "Choose a date and time in the future.": "请选择未来的日期和时间。",
  "Enter a positive duration.": "请输入大于零的时长。",
  "Choose date": "选择日期",
  "Choose time": "选择时间",
  "Manage hidden models": "管理隐藏模型",
  Favorites: "收藏",
  "ChatGPT usage limit reached": "已达到 ChatGPT 用量限额",
  "Copy request for admin": "复制给管理员的请求",
  "Open automation": "打开自动化",
  "Context handoff pending": "上下文交接等待中",
  "Page unavailable": "页面不可用",
  "This connection cannot control this task. You can still edit your draft.":
    "此连接无法控制该任务，你仍可编辑草稿。",
  "Stop sharing": "停止共享",
  "Drag to reorder, pin, or settle. Changes save when you drop.":
    "拖动以重新排序、置顶或收起。松开后自动保存更改。",
  "Editing queued message": "正在编辑排队消息",
  "Your draft is saved on this device. Connect to an environment to choose its first model.":
    "草稿已保存在此设备上。连接到环境以选择首个模型。",
  "Using ChatGPT plan": "正在使用 ChatGPT 套餐",
  "No agents in this turn.": "本轮中没有智能体。",
  Agents: "智能体",
  "Provider-managed agent. Its work appears in the transcript.":
    "由提供商管理的智能体，其工作内容会显示在对话记录中。",
  "Context handoff": "上下文交接",
  "This connection cannot respond to approvals.": "此连接无法响应审批。",
  "No messages waiting in this queue.": "队列中没有等待的消息。",
  "Sends on reconnect": "重连后发送",
  "This connection cannot submit answers.": "此连接无法提交回答。",
  "Reconnect now": "立即重连",
  "Inspect changes, uncommitted edits, and turn diffs": "检查更改、未提交编辑和轮次差异",
  "Repository options": "仓库选项",
  "Native diff view unavailable. Showing the raw patch.": "原生差异视图不可用，正在显示原始补丁。",
  "This diff is empty.": "此差异为空。",
  "Startup crashes": "启动崩溃",
  "Crash log unavailable": "崩溃日志不可用",
  "No startup crashes": "无启动崩溃",
  "Tap someone to request a review. Tap a requested reviewer to remove the request.":
    "轻点成员以请求评审，轻点已请求的评审人以移除请求。",
  "This provider accepts a reviewer ID but cannot list candidates.":
    "此提供商接受评审人 ID，但无法列出候选人。",
  "Request review": "请求评审",
  "Search reviewers": "搜索评审人",
  "Reviewer login or ID": "评审人用户名或 ID",
  "Remove review request": "移除评审请求",
  "Review guides are disabled for this server.": "此服务器已禁用评审导览。",
  "This guide was rewritten. Go back to start the new tour.":
    "此导览已重写，请返回以开始新的导览。",
  "Excerpts are hidden until the guide is rewritten for the current head.":
    "在针对当前提交重写导览前，代码摘录将保持隐藏。",
  "Notes on this stop": "本站说明",
  "Questions to consider": "需要考虑的问题",
  "The branch changed since you wrote a comment. Choose its current line before submitting.":
    "你编写评论后分支已更改，请在提交前选择当前行。",
  "No activity matches these filters.": "没有匹配这些筛选条件的活动。",
  "Edit title": "编辑标题",
  "Edit description": "编辑描述",
  "The branch changed. Reload before adding line comments.":
    "分支已更改，请重新加载后再添加行评论。",
  "Reload changes": "重新加载更改",
  "Diff unavailable": "差异不可用",
  "Select a current line, then choose “Move draft to this line” from its menu.":
    "请选择当前行，然后从菜单中选择“将草稿移至此行”。",
  "Move draft to this line": "将草稿移至此行",
  "Add review comment": "添加评审评论",
  "Loading more files…": "正在加载更多文件…",
  "Loading changes": "正在加载更改",
  Changes: "更改",
  Guide: "导览",
  "No text changes available.": "无可用文本更改。",
  "Merge options": "合并选项",
  "Retry stack lookup": "重试堆栈查询",
  "No checks reported.": "未报告检查项。",
  "Fix failing checks": "修复失败的检查",
  "Approve workflows": "批准工作流",
  "Open checks on provider": "在提供商上打开检查",
  "View reviewers on provider": "在提供商上查看评审人",
  "Show in activity": "在活动中显示",
  "Load more": "加载更多",
  "Search labels": "搜索标签",
  "More activity is available on the provider.": "提供商上有更多活动。",
  "No description provided.": "未提供描述。",
  "AI helpers": "AI 助手",
  "This discussion is no longer available.": "此讨论已不可用。",
  "View file diff": "查看文件差异",
  "Saved comments are private until you submit your review.":
    "保存的评论在你提交评审前仅自己可见。",
  "The branch changed. Return to the current diff and select the line again.":
    "分支已更改，请返回当前差异视图并重新选择行。",
  "Write feedback on this line…": "在此行编写反馈…",
  "Delete draft": "删除草稿",
  "In messages": "消息中",
  "No subscription limits available.": "暂无订阅限额。",
  Linked: "已关联",
  Declined: "已拒绝",
  "Request ended": "请求已结束",
  Reachable: "可连接",
  "Link a machine": "关联机器",
  "Link a machine to this environment": "将机器关联到此环境",
  "Expired. Link it again with a new pairing code.": "已过期。请使用新配对码重新关联。",
  "Not answering right now.": "当前无响应。",
  "Waiting for an answer in the original thread": "正在等待原任务中的答复",
  "The ZIP wasn't downloaded. Try again to list its files.":
    "ZIP 尚未下载。请重试以查看其中的文件。",
  "Save the ZIP to open it in another app.": "保存 ZIP 后可使用其他应用打开。",
  "Check the connection to this environment and try again.": "请检查与此环境的连接，然后重试。",
  "Agents here can then launch, message and wait on threads there. It appears in that machine's Connections, where it can be revoked.":
    "此处的 Agent 随后可以启动目标环境中的任务、发送消息并等待任务完成。该关联将出现在目标机器的“连接”设置中，可随时撤销。",
  "An agent here never gets more there than its own mode here either. Threads it starts there cannot change that environment's own threads, projects or settings.":
    "Agent 在目标环境中的权限也不会超过它在此处的运行模式所允许的权限。它在目标环境中启动的任务无法更改该环境原有的任务、项目或设置。",
  "Add to chat": "添加到聊天",
  "Allow edits from maintainers": "允许维护者编辑",
  "Another address…": "其他地址…",
  "Beta: Linked environments": "测试版：关联环境",
  "Built-in microphone": "内置麦克风",
  "Change account": "切换账户",
  "Clear filter": "清除筛选",
  "Close files": "关闭文件",
  "Copy thread": "复制任务",
  "Couldn't browse this ZIP": "无法浏览此 ZIP",
  "Couldn't download this ZIP": "无法下载此 ZIP",
  "Couldn't read this file": "无法读取此文件",
  "Crash reports": "崩溃报告",
  "Download cancelled": "下载已取消",
  "Earlier work": "此前工作",
  "Extra High": "极高",
  "Filter files in ZIP": "筛选 ZIP 中的文件",
  "Floating navigation with a separate compose button.": "浮动导航与独立撰写按钮。",
  Forget: "忘记",
  "Git action failed": "Git 操作失败",
  "Go to threads list": "前往任务列表",
  "Link a machine this app does not know, by its https or Tailscale address.":
    "通过 HTTPS 或 Tailscale 地址关联此应用尚未连接的机器。",
  Machine: "机器",
  Navigation: "导航",
  "Open link": "打开链接",
  "Opens queued messages to send now, edit, or remove": "打开排队消息以立即发送、编辑或移除",
  "Paste the code": "粘贴代码",
  Pushed: "已推送",
  "Read only": "只读",
  "Read projects and threads. Cannot start, message or change anything.":
    "读取项目和任务，不能启动任务、发送消息或进行任何更改。",
  "Refreshing source control status": "正在刷新源代码管理状态",
  "Resume interrupted threads after an update or restart.": "更新或重启后恢复中断的任务。",
  "Save ZIP": "保存 ZIP",
  "Save file": "保存文件",
  "Send crash reports": "发送崩溃报告",
  "Send now": "立即发送",
  "Share link": "分享链接",
  "Sign in with": "登录方式",
  "Standard Android navigation bar and side rail.": "标准 Android 导航栏与侧边栏。",
  "Start new threads in the last project you used on this device.":
    "在此设备上最近使用的项目中新建任务。",
  "This ZIP is empty": "此 ZIP 为空",
  "It has no files.": "其中没有文件。",
  "Too big to preview": "文件过大，无法预览",
  "Too large to browse here": "文件过大，无法在此浏览",
  Triage: "问题分流",
  "Triage an issue": "对问题进行分流",
  "Turn into project": "转为项目",
  "Use last project": "使用上次项目",
  "What agents here may do there": "此处 Agent 可在目标环境执行的操作",
  "ZIP actions": "ZIP 操作",
  "ZIP download progress": "ZIP 下载进度",
  "Stop workflow?": "停止工作流？",
  "Stop agent?": "停止 Agent？",
  "Could not stop workflow": "无法停止工作流",
  "Could not stop agent": "无法停止 Agent",
  "Choose machine…": "选择机器…",
  "Review link…": "检查关联…",
  "Linking…": "正在关联…",
  "Use this link": "使用此关联",
  "Add a reaction": "添加回应",
  "Allow agents to use the in-app preview browser.": "允许 Agent 使用应用内预览浏览器。",
  "Ask anything": "输入任何问题",
  "Close thread preview": "关闭任务预览",
  "Could not display diff": "无法显示差异",
  "Dismiss Woke notification": "关闭唤醒通知",
  "Edit comment": "编辑评论",
  "Edit labels": "编辑标签",
  "Enter fullscreen": "进入全屏",
  "Exit fullscreen": "退出全屏",
  "Fix checkout": "修复检出",
  Interface: "界面",
  "Keep source control requests on this environment.": "在此环境中处理源代码管理请求。",
  "Load more pull requests": "加载更多拉取请求",
  "Maximize device": "最大化设备",
  "Maximize thread": "最大化任务",
  "Opening changes": "正在打开更改",
  "Remove recognized agent credits from merge and squash messages on hosts that support it, keeping human co-authors. Includes auto-merge. Excludes merge queues, stack merges, and existing commits.":
    "在支持的平台上，从合并和压缩合并消息中移除已识别的 Agent 署名，保留人类共同作者。包含自动合并，不包含合并队列、堆叠合并和现有提交。",
  "Resize inspector": "调整检查器大小",
  "Restore drag handles": "恢复拖动手柄",
  "Search authors…": "搜索作者…",
  "Search labels…": "搜索标签…",
  "Search settings": "搜索设置",
  "Select range end": "选择范围终点",
  "Server settings": "服务器设置",
  "Stop sharing?": "停止共享？",
  Woke: "已唤醒",
  "Checking saved environments on this device.": "正在检查此设备上已保存的环境。",
  "The saved environment is offline. Check the URL or start the environment, then retry.":
    "已保存的环境当前离线。请检查网址或启动环境后重试。",
  "Choose a project for what you shared": "为你分享的内容选择一个项目",
  "Start a task": "新建任务",
  "The shared content reservation could not be updated.": "无法更新所分享内容的预留状态。",
  Queue: "排队",
  "Steer now": "立即引导",
  "Restart turn": "重新开始本轮",
  "Run after the current turn": "在当前轮次结束后运行",
  "Interrupt what the agent is doing": "中断智能体当前正在执行的操作",
  "Start the turn over with this message": "使用此消息重新开始当前轮次",
  "Choose how to send this message": "选择此消息的发送方式",
  "Usage limits unavailable": "用量限额不可用",
  "This provider does not currently report limits.": "此提供商当前未报告额度信息。",
  "Untitled thread": "未命名任务",
  "Saving…": "正在保存…",
  "Attaching pasted text": "正在附加粘贴的文本",
  "Pasted text is too large for this message": "粘贴的文本对此消息而言过大",
  "Remove some text or an attachment, then paste again.": "请移除部分文本或附件后再重新粘贴。",
  "Resume thread": "恢复任务",
  "(detached HEAD)": "（分离头指针）",
  Request: "请求",
  Waiting: "等待中",
  Limited: "受限",
  Snoozed: "已延后",
  Settled: "已收起",
  "Could not load older threads. Retry": "无法加载更早的任务。重试",
  Unsent: "未发送",
  Goal: "目标",
  "Custom…": "自定义…",
  "Arrange threads…": "排序任务…",
  "Auto-settle behavior": "自动收起行为",
  "Try copying this thread again.": "请重新尝试复制此任务。",
  "Opens the thread": "打开此任务",
  "Copy thread ID": "复制任务 ID",
  Mon: "周一",
  Tue: "周二",
  Wed: "周三",
  Thu: "周四",
  Fri: "周五",
  Sat: "周六",
  Sun: "周日",
  "On webhook": "Webhook 触发",
  "Every day": "每天",
  Weekdays: "工作日",
  "Choose days": "选择日期",
  "Connect an environment to view and create scheduled tasks.":
    "请先连接环境，以查看和创建计划任务。",
  "No environments match these filters. Change the filter above.":
    "没有匹配这些筛选条件的环境。请更改上方的筛选条件。",
  "Saving task": "正在保存任务",
  "Wait for the task to finish saving before leaving.": "请等待任务保存完成后再离开。",
  "Your unsaved changes will be lost.": "未保存的更改将会丢失。",
  "Keep editing": "继续编辑",
  "Discard changes": "放弃更改",
  "Connect an environment to create a scheduled task.": "请先连接环境以创建计划任务。",
  "No environments match the current filters. Change the filters to create a task.":
    "没有匹配当前筛选条件的环境。请更改筛选条件以创建任务。",
  "Invalid age limit": "时效限制无效",
  "Once is not available here": "此处不支持单次运行",
  "This environment runs an older T3 Code. Update it to schedule a one-time task, or pick another schedule.":
    "此环境运行的是旧版 T3 Code。请更新后再设置单次计划任务，或选择其他运行计划。",
  "Incomplete task": "任务信息不完整",
  "Add a name, prompt, project, model, valid schedule, and checkout path if needed.":
    "请填写名称、提示词、项目、模型、有效的运行计划，以及所需的检出路径。",
  "Project unavailable": "项目不可用",
  "Choose a project in this environment.": "请在此环境中选择一个项目。",
  "No projects available": "暂无可用项目",
  "No models available": "暂无可用模型",
  "Project checkout": "项目检出目录",
  "Specific checkout": "指定检出目录",
  "At a time": "定时",
  Once: "单次",
  Interval: "按间隔",
  Date: "日期",
  "Duplicate request key": "重复请求去重键",
  "Requests with the same key run only once within 7 days.":
    "具有相同键的请求在 7 天内仅运行一次。",
  "Coalescing runs the latest payload when the window from the first delivery closes. Empty keys run normally.":
    "合并操作会在首次投递开始的窗口结束后，使用最新请求内容运行。键留空时按常规运行。",
  "The prompt can use {{body.a.b}}, {{headers.name}}, {{query.name}}, {{body}} and {{request}}. The filled-in prompt is all the agent sees.":
    "提示词可使用 {{body.a.b}}、{{headers.name}}、{{query.name}}、{{body}} 和 {{request}}。填充后的提示词即为智能体看到的全部内容。",
  "Copy webhook URL": "复制 Webhook 网址",
  "Copies the URL to the clipboard": "将网址复制到剪贴板",
  "Webhook URL": "Webhook 网址",
  "Webhook path": "Webhook 路径",
  "Rotate URL?": "轮换网址？",
  "The current URL stops working immediately.": "当前网址将立即失效。",
  Rotate: "轮换",
  "Could not rotate URL": "无法轮换网址",
  "No scheduled tasks yet.": "暂无计划任务。",
  "No tasks in this project.": "此项目中暂无计划任务。",
  "· Paused": "· 已暂停",
  Resume: "恢复",
  "Run now": "立即运行",
  "Delete task?": "删除任务？",
  "Other wired": "其他有线设备",
  "Headsets and USB microphones not listed": "未列出的耳机和 USB 麦克风",
  "Other Bluetooth": "其他蓝牙设备",
  "AirPods, headsets, and cars not listed": "未列出的 AirPods、耳机和车载设备",
  "The microphone on this device": "此设备上的麦克风",
  "The car’s microphone": "车载麦克风",
  "Voice input": "语音输入",
  "Not available on this device": "在此设备上不可用",
  "T3 Code's voice input uses Apple's on-device speech transcription, which needs iOS 26 or later on a device that supports it. Without it, the composer has no microphone button, and allowing microphone access won't add one. Apple keyboard dictation is separate and isn't affected.":
    "T3 Code 的语音输入使用 Apple 设备端语音转写，需要支持该功能的设备运行 iOS 26 或更高版本。不支持时，输入框不会显示麦克风按钮，开启麦克风权限也不会显示该按钮。Apple 键盘听写功能相互独立，不受影响。",
  "Allow microphone access": "允许访问麦克风",
  "Open Settings": "打开系统设置",
  "Voice input needs microphone access before it can record or list your microphones.":
    "语音输入需要先获得麦克风权限，才能录音或列出麦克风设备。",
  "Microphone access is off for T3 Code. Turn it on in Settings to use voice input.":
    "T3 Code 的麦克风权限已关闭。请在系统设置中开启以使用语音输入。",
  "Voice input records from the first connected microphone in this list. Wired and Bluetooth devices are added by name after you use voice input with them connected; until then, the Other row ranks them. Swipe a device left to forget it.":
    "语音输入使用此列表中第一个已连接的麦克风录音。连接有线或蓝牙设备并使用语音输入后，设备会按名称加入列表；在此之前，其优先级由“其他”项决定。向左滑动设备可将其移除。",
  "Filter settings environments and projects": "筛选设置的环境和项目",
  "All connected environments": "所有已连接环境",
  "Unavailable project": "不可用的项目",
  "Static prefix": "固定前缀",
  "Add your prefix to the generated branch name.": "在生成的分支名称前添加指定前缀。",
  "Semantic prefix": "语义前缀",
  "Let the model choose feat/, fix/, refactor/, or another prefix.":
    "由模型自动选择 feat/、fix/、refactor/ 或其他前缀。",
  "Generate the complete name with no added prefix or suffix.":
    "直接生成完整分支名称，不额外添加前缀或后缀。",
  "Branch prefix": "分支前缀",
  Mixed: "混合",
  "No prefix": "无前缀",
  "Branch naming instructions": "分支命名说明",
  "Mixed. Enter instructions for all selected targets.": "混合值。输入后将应用于所有已选目标。",
  "Use julius/ followed by the issue ID and a short description.":
    "使用 julius/ 加问题编号和简短描述。",
  "Search open-source licenses": "搜索开源许可证",
  "Opens the project website": "打开项目网站",
  "New chat": "新建对话",
  "Enter a workspace path": "请输入工作区路径",
  "Plan saved to workspace": "方案已保存到工作区",
  "Could not save plan": "无法保存方案",
  "Proposed plan": "建议方案",
  "Copy plan": "复制方案",
  "Save to workspace": "保存到工作区",
  "Save plan to workspace": "保存方案到工作区",
  "Enter a path relative to the thread's workspace. A file already at that path is replaced.":
    "请输入相对于任务工作区的路径。如果该路径已有文件，将会被覆盖。",
  "Exit full screen": "退出全屏",
  "Side chats": "旁路对话",
  "Copy prompt link": "复制提示词链接",
  "Fork from this response": "从此回复创建分支任务",
  "Fork created": "已创建分支任务",
  "Could not open attachment": "无法打开附件",
  "The attachment is unavailable.": "附件不可用。",
  "The attachment could not be opened.": "无法打开此附件。",
  Agent: "智能体",
  Automation: "自动化",
  "Context compacted": "上下文已压缩",
  "Context compaction": "上下文压缩",
  "Compacting context": "正在压缩上下文",
  "Couldn't load work. Tap to retry.": "无法加载工作记录，点按以重试。",
  "Edit pending message": "编辑待发送消息",
  "Context unavailable": "上下文不可用",
  "Open context": "打开上下文",
  "Copy context": "复制上下文",
  "Could not copy context": "无法复制上下文",
  "Try copying this context again.": "请重新尝试复制此上下文。",
  "Open file": "打开文件",
  "Collapses the workflow": "收起工作流",
  "Opens the current phase": "打开当前阶段",
  "No agents yet": "暂无智能体",
  "Its thread is not available yet": "其任务暂不可用",
  "Cancel editing queued message": "取消编辑排队消息",
  "Setup script": "初始化脚本",
  "Setup continues…": "正在后台继续初始化…",
  "Worktree setup cancelled": "工作树初始化已取消",
  "Worktree setup failed": "工作树初始化失败",
  "Setup script failed": "初始化脚本执行失败",
  "Worktree ready": "工作树已就绪",
  "Worktree setup details": "工作树初始化详情",
  "Background setup": "后台初始化",
  Details: "详情",
  "Cancel worktree setup": "取消工作树初始化",
  "Setup script output": "初始化脚本输出",
  "ChatGPT token sharing is active": "ChatGPT 令牌共享已启用",
  "ChatGPT sharing is on": "ChatGPT 共享已开启",
  "Eligible usage uses your ChatGPT plan. Credit settings and limits are managed in ChatGPT.":
    "符合条件的用量将使用你的 ChatGPT 套餐额度。额度设置与限额在 ChatGPT 中管理。",
  "Only a session that manages access here can answer this.":
    "只有拥有此处访问管理权限的会话才能响应此请求。",
  "Subagent work": "子智能体工作记录",
  "Read only. These subagents cannot take messages.": "只读。这些子智能体无法接收消息。",
  "The provider has no record of which subagents this call started.":
    "提供商没有记录此次调用启动了哪些子智能体。",
  Subagent: "子智能体",
  "Earlier steps are not shown.": "较早的步骤未显示。",
  "No transcript yet.": "暂无记录。",
  "Detached HEAD": "分离头指针",
  "New branch name": "新分支名称",
  "Worktree base branch": "工作树基础分支",
  "Worktree branch name": "工作树分支名称",
  "Checked out in this thread": "已在此任务中检出",
  "Checked out in another worktree": "已在其他工作树中检出",
  "Local branch": "本地分支",
  "Couldn't update this review request. Try again.": "无法更新此评审请求，请重试。",
  "Close request review": "关闭请求评审",
  "· Team": "· 团队",
  Requested: "已请求",
  "Couldn't load reviewers": "无法加载评审人",
  "No matching reviewers": "没有匹配的评审人",
  "No reviewers available": "暂无可用评审人",
  "Search people and teams with access to this repository.": "搜索有权访问此仓库的成员和团队。",
  "Reviewer ID": "评审人 ID",
  "Loading pull request details": "正在加载拉取请求详情",
  "Checks completed": "检查已完成",
  "Checks failing": "检查未通过",
  "Checks running": "检查运行中",
  Checks: "检查",
  Reviews: "评审",
  Open: "打开",
  Closed: "已关闭",
  Merged: "已合并",
  "All states": "所有状态",
  "All PRs": "所有 PR",
  "Your review": "待你评审",
  "By you": "由你创建",
  "All drafts": "所有草稿状态",
  "Drafts only": "仅草稿",
  "Hide drafts": "隐藏草稿",
  "All reviews": "所有评审状态",
  Approved: "已批准",
  "Changes requested": "请求修改",
  "Review required": "需要评审",
  "No reviews": "暂无评审",
  "All checks": "所有检查状态",
  Passing: "已通过",
  Failing: "未通过",
  "Recently updated": "最近更新",
  "Newest created": "最新创建",
  "Oldest updated": "最早更新",
  Drafts: "草稿",
  "Reset filters": "重置筛选条件",
  "All labels": "所有标签",
  "All authors": "所有作者",
  Me: "我",
  Labels: "标签",
  Author: "作者",
  Filters: "筛选",
  "More filters": "更多筛选条件",
  "Choose pull request environment": "选择拉取请求环境",
  "Filter by state": "按状态筛选",
  "Filter by involvement": "按参与方式筛选",
  "Filter by label": "按标签筛选",
  "Filter by author": "按作者筛选",
  "Loading more pull requests": "正在加载更多拉取请求",
  "Retry loading more pull requests": "重试加载更多拉取请求",
  "Couldn't load pull requests": "无法加载拉取请求",
  "Environment offline": "环境已离线",
  "No matching pull requests": "没有匹配的拉取请求",
  "Connect an environment": "连接环境",
  "Reconnect to load pull requests that aren't saved on this device.":
    "请重新连接以加载未保存在此设备上的拉取请求。",
  "Add an environment in Settings to browse its pull requests.":
    "请在“设置”中添加环境以浏览其拉取请求。",
  "The provider could not complete this action.": "提供商无法完成此操作。",
  "Reply posted.": "回复已发布。",
  Unresolve: "标记为未解决",
  Resolve: "标记为已解决",
  Discussion: "讨论",
  Resolved: "已解决",
  Unresolved: "未解决",
  "· Outdated": "· 已过期",
  "Unknown author": "未知作者",
  "Load more replies": "加载更多回复",
  "Discussion reply": "讨论回复",
  "Reply…": "回复…",
  "Posting…": "正在发布…",
  Reply: "回复",
  "Edit review comment": "编辑评审评论",
  "Review comment": "评审评论",
  "Save draft": "保存草稿",
  "Inline review comment": "行内评审评论",
  "Delete this draft?": "删除此草稿？",
  "Your other review comments will be kept.": "你的其他评审评论将会保留。",
  "Select a setting": "选择一项设置",
  "This connection cannot add projects.": "此连接无权添加项目。",
  "Opening terminal…": "正在打开终端…",
  "Opening thread…": "正在打开任务…",
  "Opening in file viewer...": "正在文件查看器中打开...",
  "Opening ZIP...": "正在打开 ZIP...",
  "Opening files...": "正在打开文件列表...",
  "Checking file access...": "正在检查文件访问权限...",
  "Opening file...": "正在打开文件...",
  "Link date unavailable": "关联日期不可用",
  "Managed tunnel": "托管隧道",
  "Activity publishing only": "仅发布活动状态",
  "Deregister server?": "要注销服务器吗？",
  "Link a server from its local Settings to reach it through T3 Connect.":
    "在服务器的本地“设置”中关联后，即可通过 T3 Connect 连接。",
  "Use the repository's t3.json, or initialize recursively.":
    "使用仓库的 t3.json 配置，或递归初始化子模块。",
  "Initialize nested submodules too.": "同时初始化嵌套子模块。",
  "Top level only": "仅顶层子模块",
  "Skip submodules declared inside other submodules.": "跳过其他子模块内部声明的子模块。",
  "Leave submodules empty for a setup script.": "保留子模块为空，交由初始化脚本处理。",
  "Use the repository's t3.json, or the current checkout.":
    "使用仓库的 t3.json 配置，或使用当前检出目录。",
  "Current checkout": "当前检出目录",
  "Start new threads in the existing workspace.": "在现有工作区中启动新任务。",
  "Give each new thread a separate checkout.": "为每个新任务创建独立的检出目录。",
  "After the turn": "轮次结束后",
  "Show the answer when the agent finishes.": "在智能体完成后显示完整回答。",
  "Finished paragraphs": "按已完成段落",
  "Show each paragraph or code block as it completes.": "每完成一个段落或代码块即立即显示。",
  "Refresh cloud environments": "刷新云端环境",
  "Your message waits and runs after the current turn finishes.":
    "消息将排队等待，并在当前轮次结束后运行。",
  "Your message reaches the agent right away, changing what it is working on.":
    "消息将立即发送给智能体，引导其调整当前工作。",
  "Return sends the message. Shift-Return inserts a new line.":
    "按 Return 发送消息，按 Shift-Return 换行。",
  "Insert new line": "换行",
  "Return inserts a new line. Command-Return sends the message.":
    "按 Return 换行，按 Command-Return 发送消息。",
  "Group by repository": "按仓库分组",
  "Matching repositories appear as one project.": "相同仓库合并显示为一个项目。",
  "Group by repository path": "按仓库路径分组",
  "Keep monorepo paths separate.": "将单体仓库（Monorepo）中的不同子路径分开显示。",
  "Keep separate": "保持独立",
  "Show every workspace as its own project.": "将每个工作区都作为独立项目显示。",
  "Clear All Caches": "清除所有缓存",
  "Rename thread": "重命名任务",
  "Share PR data with other enabled environments.": "与其他已启用的环境共享拉取请求数据。",
  "Actions may use broader source control permissions than the original environment.":
    "执行操作时可能会使用比原环境更宽泛的源代码管理权限。",
  "Force stop the agent?": "要强制停止智能体吗？",
  "It has not answered Stop. Force stop ends the turn and kills the agent's processes, unless other working threads share them.":
    "智能体未响应停止请求。强制停止将结束当前轮次并终止其进程（与其他运行中任务共享的进程除外）。",
  "Force stop": "强制停止",
  "Switch model": "切换模型",
  "Switch to plan mode": "切换到计划模式",
  "Switch to default mode": "切换到默认模式",
  "Ask before commands and file changes.": "在执行命令和修改文件前询问。",
  "Auto-approve edits, ask before other actions.": "自动批准文件编辑，在执行其他操作前询问。",
  "Supported providers approve routine actions; others still ask.":
    "受支持的提供商会自动批准常规操作；其余操作仍会询问。",
  "Allow commands and edits without prompts.": "允许直接执行命令和修改文件，无需确认。",
  "The guest loses access and the link stops working.":
    "访客将失去访问权限，且分享链接将立即失效。",
  "Update queued message": "更新排队消息",
  "Git unavailable": "Git 不可用",
  "Bring this thread's latest turn into its source": "将此任务的最新轮次合并回来源对话",
  "Merge back to source": "合并回来源对话",
  "Git controls": "Git 操作",
  "Refresh repository status": "刷新仓库状态",
  "Non-text file": "非文本文件",
  "Diff preview is not available for this file format.": "此文件格式不支持差异预览。",
  "Large diff": "大型差异",
  "Large diffs are not rendered by default.": "默认不直接渲染过大的差异内容。",
  "Refresh current diff": "刷新当前差异",
  "Relay URL is not configured.": "未配置中继服务 URL。",
  "Relay returned credentials for a different environment.": "中继服务返回了其他环境的凭据。",
  "Relay returned credentials for a different endpoint provider.":
    "中继服务返回了其他端点提供商的凭据。",
  "Only a locally paired bearer connection can be linked to the cloud.":
    "只有本地配对的 Bearer 连接才能关联到云端。",
  "DPoP URL is invalid.": "DPoP URL 无效。",
  "Rewriting guide": "正在重写审查指南",
  "Could not write guide": "无法生成审查指南",
  "Could not refresh guide": "无法刷新审查指南",
  "Review guide": "审查指南",
  "Checking for a saved guide…": "正在检查已保存的审查指南…",
  "New changes since this guide": "自生成指南后有新变更",
  "You can read the previous guide, or rewrite it for the latest changes.":
    "你可以阅读之前的指南，或根据最新变更重新生成。",
  "Get a tour of the change, with code excerpts and notes on what needs a closer look.":
    "按导览逐步查看代码变更摘录与需要重点关注的说明。",
  "Rewrite guide": "重写指南",
  "Request changes": "请求修改",
  "All activity": "全部动态",
  "Bot comments": "机器人评论",
  "Resolved or dismissed": "已解决或已忽略",
  "Action required": "需要处理",
  "Checks need attention": "检查项需要关注",
  "Squash and merge": "压缩并合并（Squash）",
  "Combine the commits into one commit.": "将所有提交压缩合并为一个提交。",
  "Create a merge commit": "创建合并提交（Merge）",
  "Keep the commits and add a merge commit.": "保留原有提交并新增一个合并提交。",
  "Rebase and merge": "变基并合并（Rebase）",
  "Add the commits without a merge commit.": "线性合入所有提交，不产生合并提交。",
  "Start a new thread": "新建任务",
  "Ask a question": "提问",
  "Address feedback": "处理评审反馈",
  "Resolve conflicts": "解决冲突",
  "Check device tool versions": "检查设备工具版本",
  "Device tool versions": "设备工具版本",
  "This connection cannot update the thread's branch.": "此连接无权更新任务的分支。",
  "This connection cannot change attachments.": "此连接无权更改附件。",
  "UI components": "UI 组件",
  "Provider not allowed": "不允许使用该提供商",
  "Model turned off for this project": "此项目已停用该模型",
  "Antigravity model unavailable": "Antigravity 模型不可用",
  "Resolve conflicts to merge": "请先解决冲突后再合并",
  "Checking stack…": "正在检查堆栈…",
  "Auto-merge pending": "等待自动合并",
  "Auto-merge pending (squash)": "等待自动合并（压缩合并）",
  "Auto-merge pending (merge)": "等待自动合并（创建合并提交）",
  "Auto-merge pending (rebase)": "等待自动合并（变基合并）",
  "Earbuds, headsets, and cars, including Android Auto, not listed":
    "未列出的耳机、耳麦及车载设备（含 Android Auto）",
  "T3 Code's voice input uses Google's on-device speech recognition, which needs Android 12 or later with compatible Google speech services for the device language. Without it, the composer has no microphone button, and allowing microphone access won't add one. Keyboard voice typing is separate and isn't affected.":
    "T3 Code 的语音输入使用 Google 设备端语音识别，需要 Android 12 或更高版本，并配备支持当前设备语言的 Google 语音服务。若不支持，输入框将不显示麦克风按钮，授予麦克风权限也不会显示。系统键盘自带的语音输入相互独立，不受影响。",
  "Voice input prefers the first connected microphone in this list. Wired and Bluetooth devices are added by name after you use voice input with them connected; until then, the Other row ranks them. Swipe a device left to forget it. Android may use another input when the preferred microphone cannot be routed.":
    "语音输入会优先使用此列表中第一个已连接的麦克风。有线和蓝牙设备在连接状态下使用过语音输入后会按名称加入列表；在此之前由“其他”行决定其优先级。向左滑动设备可将其忽略。当首选麦克风无法路由时，Android 可能会改用其他输入设备。",
  "Waiting for the T3 Connect sign-in to load.": "正在等待 T3 Connect 登录状态加载。",
  "Your cloud sign-in changed. Sign in again to authorize the environment.":
    "你的云端登录状态已变更，请重新登录以授权此环境。",
  "This device is still loading its T3 Connect sign-in": "此设备仍在加载 T3 Connect 登录状态",
  "Wait a moment. T3 Code retries on its own.": "请稍候，T3 Code 会自动重试。",
  "If it keeps waiting, reload or restart T3 Code on this device.":
    "如果一直处于等待状态，请在此设备上重新加载或重启 T3 Code。",
  "Working…": "处理中…",
  "Reconnect to merge": "重新连接后才能合并",
  "Reconnect to merge.": "重新连接后才能合并。",
  "Merge unavailable": "无法合并",
  "Enable auto-merge": "启用自动合并",
  "Enable auto-merge?": "要启用自动合并吗？",
  "Disable auto-merge": "停用自动合并",
  "Disable auto-merge?": "要停用自动合并吗？",
  "Checking stack membership…": "正在检查堆栈归属…",
  "Refresh the stack before merging.": "请先刷新堆栈再合并。",
  "This environment can display stacks but cannot merge them.":
    "此环境可以显示堆栈，但无法合并堆栈。",
  "Couldn't check stack membership. Refresh before merging.": "无法检查堆栈归属，请刷新后再合并。",
  "Couldn't complete the merge action": "无法完成合并操作",
  "Voice input prefers the first connected microphone in this list. Wired and Bluetooth devices are added by name after you use voice input with them connected; until then, the Other row ranks them. Swipe a device left to forget it.":
    "语音输入会优先使用此列表中第一个已连接的麦克风。有线和蓝牙设备在连接状态下使用过语音输入后会按名称加入列表；在此之前由“其他”行决定其优先级。向左滑动设备可将其忽略。",
  Voice: "语音",
  "Transcribe on": "转写设备",
  "Audio stays on this device and is transcribed here.": "音频保留在此设备上并在本地完成转写。",
  "Previously selected environment": "之前选择的环境",
  "No longer paired": "已取消配对",
  "Transcription unavailable": "转写不可用",
  "No transcription model installed": "未安装转写模型",
  "Send finished recordings to this environment.": "将完成的录音发送到此环境进行转写。",
  "Use environment": "使用此环境",
  "Could not save transcription choice": "无法保存转写设置",
  "Dictation on an environment is off for this session. Save again before closing the app, or your previous choice may return when it restarts.":
    "本次会话已关闭环境端语音听写。请在关闭应用前重新保存，否则重启后可能会恢复为您之前的选择。",
  "Headsets and USB microphones not listed here": "未在此列出的耳麦和 USB 麦克风",
  "Earbuds, headsets, and cars, including Android Auto, not listed here":
    "未在此列出的耳机、耳麦及车载设备（含 Android Auto）",
  "AirPods, headsets, and cars not listed here": "未在此列出的 AirPods、耳麦及车载设备",
  "Dictation on this device needs Android 12 or later and Google speech services that support your language. Your keyboard’s voice typing is separate.":
    "在此设备上进行语音听写需要 Android 12 或更高版本，以及支持您所用语言的 Google 语音服务。系统键盘自带的语音输入相互独立。",
  "Dictation on this device needs iOS 26 or later, a supported device, and a supported language. Your keyboard’s dictation is separate.":
    "在此设备上进行语音听写需要 iOS 26 或更高版本、受支持的设备及语言。系统键盘自带的听写功能相互独立。",
  "Allow microphone access to record and to see your microphones.":
    "允许访问麦克风以进行录音并查看可用麦克风列表。",
  "Turn on microphone access for T3 Code in Settings to use voice input.":
    "请在系统“设置”中为 T3 Code 开启麦克风权限以使用语音输入。",
  "Voice input uses the first connected microphone in this list. A wired or Bluetooth microphone is added by name the first time you dictate with it connected; until then it falls under Other. Swipe left on a named microphone to forget it.":
    "语音输入会优先使用此列表中第一个已连接的麦克风。有线或蓝牙麦克风在连接状态下首次使用语音听写后会按名称加入列表；在此之前归入“其他”。向左滑动已命名的麦克风可将其忽略。",
  "Voice input uses the first connected microphone in this list. A wired or Bluetooth microphone is added by name the first time you dictate with it connected; until then it falls under Other. Swipe left on a named microphone to forget it. Android may still use a different microphone if the preferred one can’t be routed.":
    "语音输入会优先使用此列表中第一个已连接的麦克风。有线或蓝牙麦克风在连接状态下首次使用语音听写后会按名称加入列表；在此之前归入“其他”。向左滑动已命名的麦克风可将其忽略。当首选麦克风无法路由时，Android 仍可能改用其他麦克风。",
  "Could not download the model": "无法下载模型",
  "Could not select the model": "无法选择模型",
  "Could not cancel the download": "无法取消下载",
  "Verifying download…": "正在校验下载文件…",
  "No model selected": "未选择模型",
  "Choose a transcription model to dictate on this environment.":
    "请选择一个转写模型以在此环境上使用语音听写。",
  "Voice transcription requires a supported device with iOS 26 or later.":
    "语音转写需要搭载 iOS 26 或更高版本的受支持设备。",
  "Voice transcription does not support any of your languages.": "语音转写不支持您当前的任何语言。",
  "Checking for updates timed out. Try again.": "检查更新超时，请重试。",
  "Your transcription choice changed.": "您的转写设备选择已变更。",
  "Install a transcription model for this environment in Settings → Voice, then try again.":
    "请先在“设置 → 语音”中为此环境安装转写模型，然后重试。",
  "Update T3 Code to transcribe on an environment.": "请更新 T3 Code 以在远程环境上进行语音转写。",
  "This recording couldn’t be read. Try recording again.": "无法读取此段录音，请重新录制。",
  "Beta: Tool calls in chat": "测试版：对话中的工具调用",
  "Show all": "全部显示",
  "Hide successful": "隐藏成功项",
  "Hide all": "全部隐藏",
  Zen: "禅定模式",
  "Hide the commands, edits, and searches agents run. Hide successful keeps failures. Zen shows only final answers. Approvals, questions, and errors always show.":
    "隐藏智能体执行的命令、编辑和搜索操作。“隐藏成功项”仅保留失败记录，“禅定模式”仅显示最终回答。审批、提问和错误始终显示。",
  "Mention a user": "提及用户",
  "Searching users...": "正在搜索用户...",
  "Couldn't search users on the host": "无法在代码托管平台上搜索用户",
  "No matching users": "无匹配用户",
  "Reference an issue or change request": "引用议题或变更请求",
  "Searching...": "正在搜索...",
  "Couldn't search the host": "无法搜索代码托管平台",
  "No matching issues or change requests": "无匹配的议题或变更请求",
  "Ask a side question in a new side chat": "在新的旁路对话中提问",
  "Same as /side": "同 /side",
  "Start a fresh session": "开启全新会话",
  "Side chat": "旁路对话",
  "Side chat not started": "未能开启旁路对话",
  "Could not start a side chat.": "无法开启旁路对话。",
  "The side chat was created, but it did not reach this device.":
    "旁路对话已创建，但尚未同步到此设备。",
  "The side chat is no longer available.": "该旁路对话已不可用。",
  "Could not send the side chat message.": "无法发送旁路对话消息。",
  "This app cannot call that tool.": "此应用无法调用该工具。",
  "Declined by the user.": "用户已拒绝。",
  "The link could not be opened.": "无法打开该链接。",
  "Sharing is not available on this device.": "此设备不支持分享功能。",
  "Could not sign DPoP proof.": "无法签名 DPoP 凭证。",
  "Clone into host folders": "按代码托管域名目录结构克隆",
  "Runs go to": "运行结果发送至",
  "Add Claude account": "添加 Claude 账号",
  "Use a Claude config folder that is already signed in on this server.":
    "使用此服务器上已登录的 Claude 配置目录。",
  "Could not save the Claude account.": "无法保存 Claude 账号。",
  "Turned off": "已关闭",
  "Default config folder": "默认配置目录",
  "Account name": "账号名称",
  "Name, e.g. Work": "名称，例如：工作",
  "Claude config folder": "Claude 配置目录",
  "Config folder, e.g. ~/.claude-work": "配置目录，例如：~/.claude-work",
  "Transcription models": "转写模型",
  "Search models or languages": "搜索模型或语言",
  "Close transcription models": "关闭转写模型",
  "No models match": "无匹配的模型",
  "No transcription models": "无转写模型",
  "Try another name or language.": "请尝试其他名称或语言。",
  "T3 Code, Threads": "T3 Code，任务列表",
  "T3 Code, Pull requests": "T3 Code，拉取请求",
  "Hide sidebar": "隐藏侧边栏",
  "This folder does not exist yet. Cloning creates it.": "此文件夹尚不存在，克隆时将自动创建。",
  "New session": "新会话",
  "Close thread": "关闭任务",
  "Your next message starts a fresh session. The agent won't see earlier messages in this thread.":
    "下一条消息将开启全新会话，智能体将不会看到此任务中的早期消息。",
  "Close inspector": "关闭检查器",
} as const satisfies Readonly<Record<string, string>>;

const CONNECTION_DIAGNOSIS_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/^(.+) runs an older T3 Code$/, "$1 正在运行旧版 T3 Code"],
  [/^(.+) is not linked to your T3 Connect account$/, "$1 尚未关联到你的 T3 Connect 账户"],
  [/^(.+)'s tunnel is still being set up$/, "正在为 $1 设置隧道"],
  [/^T3 Connect is not turned on for (.+)$/, "$1 尚未启用 T3 Connect"],
  [/^(.+)'s tunnel is offline$/, "$1 的隧道已离线"],
  [/^Tunnel works, but T3 Code on (.+) did not answer$/, "隧道正常，但 $1 上的 T3 Code 未响应"],
  [/^T3 Code on (.+) sent an unexpected answer$/, "$1 上的 T3 Code 返回了异常响应"],
  [/^(.+)'s tunnel address did not resolve$/, "无法解析 $1 的隧道地址"],
  [/^Secure connection to (.+)'s tunnel failed$/, "无法与 $1 的隧道建立安全连接"],
  [/^(.+)'s tunnel refused the connection$/, "$1 的隧道拒绝了连接"],
  [/^(.+) did not answer in time$/, "$1 未及时响应"],
  [/^This device can't reach (.+)'s tunnel$/, "此设备无法连接 $1 的隧道"],
  [/^T3 Connect could not reach (.+)'s tunnel$/, "T3 Connect 无法连接 $1 的隧道"],
  [/^T3 Code on (.+) did not accept this device$/, "$1 上的 T3 Code 未允许此设备连接"],
  [/^T3 Code on (.+) did not answer$/, "$1 上的 T3 Code 未响应"],
  [
    /^On (.+), check Settings > Sharing & access or run `t3 connect status`\.$/,
    "在 $1 上查看“设置 > 共享与访问”，或运行 `t3 connect status`。",
  ],
  [/^Update T3 Code on (.+)\.$/, "请更新 $1 上的 T3 Code。"],
  [
    /^Turn on automatic date and time on this device and on (.+), then retry\.$/,
    "请在此设备和 $1 上启用自动设置日期和时间，然后重试。",
  ],
  [
    /^On (.+), open Settings > Sharing & access and turn T3 Connect on\.$/,
    "在 $1 上打开“设置 > 共享与访问”，并启用 T3 Connect。",
  ],
  [
    /^Make sure (.+) is awake and T3 Code is running on it\.$/,
    "请确保 $1 处于唤醒状态，且 T3 Code 正在运行。",
  ],
  [
    /^A VPN or Tailscale exit node on (.+) can block the tunnel \(port 7844\)\. Turn it off or allow the tunnel\.$/,
    "$1 上的 VPN 或 Tailscale 出口节点可能会阻止隧道连接（端口 7844）。请关闭它，或放行隧道连接。",
  ],
  [/^Open or restart T3 Code on (.+)\.$/, "请打开或重启 $1 上的 T3 Code。"],
  [/^Make sure (.+) is awake and online\.$/, "请确保 $1 处于唤醒状态且已联网。"],
  [
    /^If it keeps failing, remove (.+) from this device and add it again\.$/,
    "如果持续失败，请从此设备中移除 $1，然后重新添加。",
  ],
  [/^Make sure T3 Code is running on (.+)\.$/, "请确保 T3 Code 正在 $1 上运行。"],
  [/^(.+) tunnel$/, "$1 隧道"],
  [/^T3 Code on (.+)$/, "$1 上的 T3 Code"],
];

function translateDynamicMessage(value: string): string | null {
  for (const [pattern, translation] of CONNECTION_DIAGNOSIS_PATTERNS) {
    if (pattern.test(value)) return value.replace(pattern, translation);
  }
  const createPrivateRepository = /^Create private repository on (.+)$/.exec(value);
  if (createPrivateRepository) return `在 ${createPrivateRepository[1]} 上创建私有仓库`;
  const createRepositoryFailure = /^Could not create the (.+) repository$/.exec(value);
  if (createRepositoryFailure) return `无法创建 ${createRepositoryFailure[1]} 仓库`;

  const updatingProviders = /^Updating (\d+) providers…$/.exec(value);
  if (updatingProviders) return `正在更新 ${updatingProviders[1]} 个提供商…`;
  const updatingEnvironments = /^Updating (\d+) environments…$/.exec(value);
  if (updatingEnvironments) return `正在更新 ${updatingEnvironments[1]} 个环境…`;
  const updatingSource = /^Updating (.+)…$/.exec(value);
  if (updatingSource) return `正在更新 ${updatingSource[1]}…`;
  const savedUsageTotals = /^(.+) Showing saved totals\.$/.exec(value);
  if (savedUsageTotals)
    return `${localizeMobileString(savedUsageTotals[1]!, "zh-CN")} 正在显示已保存的总计。`;

  const environmentLabel = /^Environment: (.+)$/.exec(value);
  if (environmentLabel) return `环境：${environmentLabel[1]}`;
  const onMachine = /^on (.+)$/.exec(value);
  if (onMachine) return `在 ${onMachine[1]} 上`;

  const enableCursor = /^Enable Cursor usage from (.+)$/.exec(value);
  if (enableCursor) return `启用 ${enableCursor[1]} 的 Cursor 用量统计`;
  const enableOn = /^Enable on (.+)$/.exec(value);
  if (enableOn) return `在 ${enableOn[1]} 上启用`;
  const chatGptAccount = /^(.+)\. Open ChatGPT with the account you connected\.$/.exec(value);
  if (chatGptAccount) return `${chatGptAccount[1]}。请使用已连接的账户打开 ChatGPT。`;
  const unknownRates = /^no known rates · (.+) tokens$/.exec(value);
  if (unknownRates) return `暂无已知费率 · ${unknownRates[1]} 个令牌`;

  const percentUsed = /^(\d+)% used$/.exec(value);
  if (percentUsed) return `已使用 ${percentUsed[1]}%`;

  const percentLeft = /^(\d+)% left$/.exec(value);
  if (percentLeft) return `剩余 ${percentLeft[1]}%`;

  const sessions = /^Across (.+) sessions$/.exec(value);
  if (sessions) return `共 ${sessions[1]} 个会话`;

  const share = /^(.+) of (cost|tokens) · (.+?)(?: tokens)?$/.exec(value);
  if (share)
    return `${share[1]} 的${share[2] === "cost" ? "成本" : "Token"}占比 · ${share[3]} Token`;

  const periodAverage = /^(.+) per active (hour|day)$/.exec(value);
  if (periodAverage)
    return `每个活跃${periodAverage[2] === "hour" ? "小时" : "日期"} ${periodAverage[1]}`;

  const rawCost = /^(.+)x the raw cost$/.exec(value);
  if (rawCost) return `为原始成本的 ${rawCost[1]} 倍`;

  const observedInput = /^(.+) of observed input$/.exec(value);
  if (observedInput) return `占观测输入的 ${observedInput[1]}`;

  const cacheWrites = /^(.+) cache writes$/.exec(value);
  if (cacheWrites) return `${cacheWrites[1]} 个缓存写入 Token`;

  const reasoning = /^incl\. (.+) reasoning$/.exec(value);
  if (reasoning) return `其中推理 Token 为 ${reasoning[1]}`;

  const restoresPool = /^Restores (\d+)% of the pool$/.exec(value);
  if (restoresPool) return `恢复池额度的 ${restoresPool[1]}%`;

  const resetAt = /^Resets (.+)$/.exec(value);
  if (resetAt) return `重置时间：${resetAt[1]}`;

  const refreshLimits = /^(.+) could not refresh limits\. Showing the last known values\.$/.exec(
    value,
  );
  if (refreshLimits) return `${refreshLimits[1]} 无法刷新限额，正在显示上次已知值。`;

  const segment = /^Segment (\d+), (.+), (\d+)% left(.*)$/.exec(value);
  if (segment) {
    const timeLeft = /^, ([\d.]+)% of the window left$/.exec(segment[4] ?? "");
    const suffix = timeLeft ? `，额度周期剩余 ${timeLeft[1]}%` : segment[4];
    return `区段 ${segment[1]}，${segment[2]}，剩余 ${segment[3]}%${suffix}`;
  }

  const duplicateUsage =
    /^Counted once across environments sharing a transcript directory: (.+)$/.exec(value);
  if (duplicateUsage) return `共享同一记录目录的环境仅计一次：${duplicateUsage[1]}`;

  const playMedia = /^Play (.+)$/.exec(value);
  if (playMedia) return `播放 ${playMedia[1]}`;

  const providerSetup = /^(Set up|Manage) (.+)$/.exec(value);
  if (providerSetup) {
    return providerSetup[1] === "Set up" ? `设置 ${providerSetup[2]}` : `管理 ${providerSetup[2]}`;
  }

  const localizeDuration = (duration: string) =>
    duration
      .replace(/(\d+)d/g, "$1 天")
      .replace(/(\d+)h/g, "$1 小时")
      .replace(/(\d+)m/g, "$1 分钟");

  if (value === "resets now") return "即将重置";
  const inDuration = /^in (.+)$/.exec(value);
  if (inDuration) return `${localizeDuration(inDuration[1]!)}后`;
  const resetsIn = /^resets in (.+)$/.exec(value);
  if (resetsIn) return `${localizeDuration(resetsIn[1]!)}后重置`;

  const pace = /^(ahead of pace|on pace|under pace)(?: · (resets now|resets in .+))?$/.exec(value);
  if (pace) {
    const paceLabel =
      pace[1] === "ahead of pace" ? "用量偏快" : pace[1] === "under pace" ? "用量偏慢" : "用量正常";
    const resetLabel = pace[2] ? translateDynamicMessage(pace[2]) : null;
    return resetLabel ? `${paceLabel} · ${resetLabel}` : paceLabel;
  }

  const resetCredits = /^(\d+) reset credits? banked(?: · next expires in (.+))?$/.exec(value);
  if (resetCredits) {
    const expiry = resetCredits[2]
      ? ` · 下一额度将在 ${localizeDuration(resetCredits[2])}后过期`
      : "";
    return `有 ${resetCredits[1]} 个重置额度${expiry}`;
  }

  const limitsEnvironment = /^Limits · (.+)$/.exec(value);
  if (limitsEnvironment) return `额度 · ${limitsEnvironment[1]}`;

  const branchSelection = /^(Base branch|Branch): (.+)$/.exec(value);
  if (branchSelection)
    return `${branchSelection[1] === "Base branch" ? "基础分支" : "分支"}：${branchSelection[2]}`;

  const switchesWorkspace = /^Switches to (a new worktree|the current checkout)$/.exec(value);
  if (switchesWorkspace)
    return switchesWorkspace[1] === "a new worktree" ? "切换到新工作树" : "切换到当前检出目录";

  const newThreadOnBranch = /^New thread on (.+)$/.exec(value);
  if (newThreadOnBranch) return `基于 ${newThreadOnBranch[1]} 新建任务`;

  const installState = /^(Enabled|Disabled)\. (Installed)(?: (.+))?$/.exec(value);
  if (installState) {
    const enabled = installState[1] === "Enabled" ? "已启用" : "已停用";
    return `${enabled} · 已安装${installState[3] ? ` ${installState[3]}` : ""}`;
  }
  const notInstalledState = /^(Enabled|Disabled)\. Not installed$/.exec(value);
  if (notInstalledState) {
    return `${notInstalledState[1] === "Enabled" ? "已启用" : "已停用"} · 未安装`;
  }

  const downloading = /^Downloading (\d+)(?: of (\d+))? MB$/.exec(value);
  if (downloading) {
    return downloading[2]
      ? `正在下载 ${downloading[1]} / ${downloading[2]} MB`
      : `正在下载 ${downloading[1]} MB`;
  }

  const signInExpiry = /^Sign-in expires at (.+)\.$/.exec(value);
  if (signInExpiry) return `登录将在 ${signInExpiry[1]} 过期。`;

  const disableProvider =
    /^This stops Antigravity sessions on (.+)\. Google credentials stay saved\.$/.exec(value);
  if (disableProvider)
    return `这会停止 ${disableProvider[1]} 上的 Antigravity 会话，并保留 Google 凭据。`;

  const removeManagedInstall =
    /^This removes T3's managed install from (.+)\. Providers that use it will need it installed again\. Google credentials and threads stay\.$/.exec(
      value,
    );
  if (removeManagedInstall) {
    return `这会从 ${removeManagedInstall[1]} 移除 T3 托管的安装。使用它的提供商需要重新安装；Google 凭据和任务会保留。`;
  }

  const disconnectProvider =
    /^This stops Antigravity sessions for (.+) on (.+)\. Threads and files stay\.$/.exec(value);
  if (disconnectProvider) {
    return `这会停止 ${disconnectProvider[2]} 上 ${disconnectProvider[1]} 的 Antigravity 会话，并保留任务和文件。`;
  }

  const recording = /^Recording (\d+:\d{2})$/.exec(value);
  if (recording) return `正在录音 ${recording[1]}`;

  const working = /^Working for (.+)$/.exec(value);
  if (working) return `已运行 ${working[1]}`;

  const useTemplate = /^Use (.+) template$/.exec(value);
  if (useTemplate) return `使用“${useTemplate[1]}”模板`;

  const interactionMode = /^Interaction mode: (Plan|Build)$/.exec(value);
  if (interactionMode) return `交互模式：${interactionMode[1] === "Plan" ? "方案" : "执行"}`;

  const switchMode = /^Switches to (Plan|Build) mode$/.exec(value);
  if (switchMode) return `切换到${switchMode[1] === "Plan" ? "方案" : "执行"}模式`;

  const claudeResumeQuestion =
    /^This session is (?:(\d+)h (\d+)m|(\d+)m) old and uses (\d{1,3}(?:,\d{3})*) tokens\. Compact it before continuing\?$/.exec(
      value,
    );
  if (claudeResumeQuestion) {
    const age = claudeResumeQuestion[3]
      ? `${claudeResumeQuestion[3]} 分钟`
      : `${claudeResumeQuestion[1]} 小时 ${claudeResumeQuestion[2]} 分钟`;
    return `此会话已有 ${age}，当前使用 ${claudeResumeQuestion[4]} 个令牌。是否先压缩再继续？`;
  }

  const noThreads = /^No threads matching "(.+)"\.$/.exec(value);
  if (noThreads) return `没有与“${noThreads[1]}”匹配的任务。`;

  const showMore = /^Show more \((\d+) settled hidden\)$/.exec(value);
  if (showMore) return `显示更多（已隐藏 ${showMore[1]} 个已收起任务）`;

  const queuedMessages = /^(\d+) queued messages? will send automatically\.$/.exec(value);
  if (queuedMessages) return `${queuedMessages[1]} 条排队消息将在恢复连接后自动发送。`;

  const questionCount = /^(\d+) questions?$/.exec(value);
  if (questionCount) return `${questionCount[1]} 个问题`;

  const selectedCommitFiles = /^(\d+) of (\d+) selected · \+([\d.,kKmMbB]+) −([\d.,kKmMbB]+)$/.exec(
    value,
  );
  if (selectedCommitFiles)
    return `已选择 ${selectedCommitFiles[1]} / ${selectedCommitFiles[2]} 个文件 · +${selectedCommitFiles[3]} −${selectedCommitFiles[4]}`;

  const selectedFiles = /^(\d+) selected · \+(\d+) −(\d+)$/.exec(value);
  if (selectedFiles)
    return `已选择 ${selectedFiles[1]} 个 · +${selectedFiles[2]} −${selectedFiles[3]}`;

  const feedbackThreadId = /^Thread ID: (.+)$/.exec(value);
  if (feedbackThreadId) return `任务 ID：${feedbackThreadId[1]}`;

  const feedbackSent = /^Feedback sent to OpenAI\.\n\nThread ID: `(.+)`$/.exec(value);
  if (feedbackSent) return `反馈已发送给 OpenAI。\n\n任务 ID：\`${feedbackSent[1]}\``;

  const feedbackFailed = /^Could not send feedback to OpenAI\.\n\n([\s\S]+)$/.exec(value);
  if (feedbackFailed) return `无法向 OpenAI 发送反馈。\n\n${feedbackFailed[1]}`;

  const daysCount = /^(\d+) days?$/.exec(value);
  if (daysCount) return `${daysCount[1]} 天`;

  const filesCount = /^(\d+) files?$/.exec(value);
  if (filesCount) return `${filesCount[1]} 个文件`;

  const settingsScope = /^Settings scope: (.+)$/.exec(value);
  if (settingsScope) return `设置范围：${localizeMobileString(settingsScope[1]!, "zh-CN")}`;

  const openOnProviderDiff = /^Open this (.+) on its provider to view the changes\.$/.exec(value);
  if (openOnProviderDiff) return `在提供商上打开此${openOnProviderDiff[1]}以查看更改。`;

  const chooseSharedSingle = /^Choose a project for the (image|file) you shared$/.exec(value);
  if (chooseSharedSingle)
    return `为你分享的${chooseSharedSingle[1] === "image" ? "图片" : "文件"}选择一个项目`;
  const chooseSharedMultiple = /^Choose a project for the (\d+) (images|files) you shared$/.exec(
    value,
  );
  if (chooseSharedMultiple)
    return `为你分享的 ${chooseSharedMultiple[1]} 个${chooseSharedMultiple[2] === "images" ? "图片" : "文件"}选择一个项目`;

  const workspacesCount = /^(\d+) workspaces$/.exec(value);
  if (workspacesCount) return `${workspacesCount[1]} 个工作区`;

  const runsOnRemote = /^Runs on (.+)\. Connect to it to open its thread\.$/.exec(value);
  if (runsOnRemote) return `在 ${runsOnRemote[1]} 上运行。连接该环境后即可打开其任务。`;

  const shelfCount = /^(Working|Snoozed|Settled) \((\d+)\)$/.exec(value);
  if (shelfCount)
    return `${shelfCount[1] === "Working" ? "进行中" : shelfCount[1] === "Snoozed" ? "已延后" : "已收起"} (${shelfCount[2]})`;

  const shelfA11yCount = /^(\d+) (working|snoozed|settled) threads?$/.exec(value);
  if (shelfA11yCount)
    return `${shelfA11yCount[1]} 个${shelfA11yCount[2] === "working" ? "进行中" : shelfA11yCount[2] === "snoozed" ? "已延后" : "已收起"}任务`;

  const shelfA11yHint = /^(Collapses|Expands) the (working|snoozed|settled) threads\.$/.exec(value);
  if (shelfA11yHint)
    return `${shelfA11yHint[1] === "Collapses" ? "收起" : "展开"}${shelfA11yHint[2] === "working" ? "进行中" : shelfA11yHint[2] === "snoozed" ? "已延后" : "已收起"}任务。`;

  const showMoreSettled = /^Show (\d+) more settled threads$/.exec(value);
  if (showMoreSettled) return `再显示 ${showMoreSettled[1]} 个已收起任务`;

  const filterIndex = /^Filter (\d+)$/.exec(value);
  if (filterIndex) return `筛选条件 ${filterIndex[1]}`;
  const removeFilterIndex = /^Remove filter (\d+)$/.exec(value);
  if (removeFilterIndex) return `移除筛选条件 ${removeFilterIndex[1]}`;

  const onceAt = /^Once, (.+) at (.+)$/.exec(value);
  if (onceAt) return `单次，${onceAt[1]} ${onceAt[2]}`;
  const everyDayAt = /^Every day at (.+)$/.exec(value);
  if (everyDayAt) return `每天 ${everyDayAt[1]}`;
  const weekdaysAt = /^Weekdays at (.+)$/.exec(value);
  if (weekdaysAt) return `工作日 ${weekdaysAt[1]}`;

  const wholeMinutes = /^Enter whole minutes from 1 to (\d+), or leave it blank\.$/.exec(value);
  if (wholeMinutes) return `请输入 1 到 ${wholeMinutes[1]} 之间的整数分钟，或留空。`;

  const switchToTimer = /^(.+) Switch the task to a timer, or turn it off, to save it\.$/.exec(
    value,
  );
  if (switchToTimer)
    return `${localizeMobileString(switchToTimer[1]!, "zh-CN")} 请将任务切换为定时运行或将其关闭后再保存。`;

  const couldNotTaskAction = /^Could not (update|run|delete) task$/.exec(value);
  if (couldNotTaskAction)
    return `无法${couldNotTaskAction[1] === "update" ? "更新" : couldNotTaskAction[1] === "run" ? "运行" : "删除"}任务`;

  const lastRunFailed = /^Last run failed: (.+)$/.exec(value);
  if (lastRunFailed) return `上次运行失败：${lastRunFailed[1]}`;

  const actionsFor = /^Actions for (.+)$/.exec(value);
  if (actionsFor) return `${actionsFor[1]} 的操作`;

  const micRowA11y = /^(.+), (Wired|Bluetooth|Built-in|CarPlay), (\d+) of (\d+)$/.exec(value);
  if (micRowA11y)
    return `${localizeMobileString(micRowA11y[1]!, "zh-CN")}，${localizeMobileString(micRowA11y[2]!, "zh-CN")}，第 ${micRowA11y[3]} / ${micRowA11y[4]} 项`;

  const forgetDevice = /^Forget (.+)$/.exec(value);
  if (forgetDevice) return `忘记 ${forgetDevice[1]}`;

  const environmentsCount = /^(\d+) environments?$/.exec(value);
  if (environmentsCount) return `${environmentsCount[1]} 个环境`;

  const environmentBullet = /^Environment · (.+)$/.exec(value);
  if (environmentBullet) return `环境 · ${environmentBullet[1]}`;
  const projectBullet = /^Project · (.+)$/.exec(value);
  if (projectBullet) return `项目 · ${localizeMobileString(projectBullet[1]!, "zh-CN")}`;
  const archivedSuffix = /^(.+) · Archived$/.exec(value);
  if (archivedSuffix) return `${archivedSuffix[1]} · 已归档`;

  const openSideChat = /^Open side chat (.+?)(?:, needs (approval|input))?$/.exec(value);
  if (openSideChat)
    return `打开旁路对话 ${openSideChat[1]}${openSideChat[2] === "approval" ? "，需要批准" : openSideChat[2] === "input" ? "，需要输入" : ""}`;

  const doubleTapToggle = /^Double tap to (hide|show) the (message|prompt)\.$/.exec(value);
  if (doubleTapToggle)
    return `双击以${doubleTapToggle[1] === "hide" ? "隐藏" : "显示"}${doubleTapToggle[2] === "message" ? "消息" : "提示词"}。`;

  const filesChanged = /^(\d+) files? changed$/.exec(value);
  if (filesChanged) return `${filesChanged[1]} 个文件已更改`;

  const workflowStatus = /^(.+) workflow, (.+)$/.exec(value);
  if (workflowStatus)
    return `${workflowStatus[1]} 工作流，${localizeMobileString(workflowStatus[2]!, "zh-CN")}`;

  const workflowPhase =
    /^(.+) phase, (working|completed|failed|stopped|queued)(?:, (\d+\/\d+) completed)?$/.exec(
      value,
    );
  if (workflowPhase)
    return `${workflowPhase[1]} 阶段，${localizeMobileString(workflowPhase[2]!, "zh-CN")}${workflowPhase[3] ? `，已完成 ${workflowPhase[3]}` : ""}`;

  const backgroundSetupRunning =
    /^Background setup is still running: (.+)\. Show setup progress\.$/.exec(value);
  if (backgroundSetupRunning)
    return `后台初始化仍在运行：${backgroundSetupRunning[1]}。显示初始化进度。`;

  const linkToEnv = /^Link (.+) to this environment$/.exec(value);
  if (linkToEnv) return `将 ${linkToEnv[1]} 关联到此环境`;

  const noAddressForMachine =
    /^This app has no address for (.+) that another machine can reach\. Enter its https or Tailscale address\.$/.exec(
      value,
    );
  if (noAddressForMachine)
    return `此应用没有可供其他机器访问 ${noAddressForMachine[1]} 的地址。请输入其 HTTPS 或 Tailscale 地址。`;

  const alreadyLinkedTo =
    /^This environment is already linked to (.+)\. The agent can use that link as it is; change its access in Settings → Connections\.$/.exec(
      value,
    );
  if (alreadyLinkedTo)
    return `此环境已与 ${alreadyLinkedTo[1]} 关联。智能体可直接使用该关联；如需更改权限，请前往“设置 → 连接”。`;

  const createLinkOn =
    /^Create a link on (.+): Settings → Connections → Create link, then paste its code here\.$/.exec(
      value,
    );
  if (createLinkOn)
    return `请在 ${createLinkOn[1]} 上创建关联：前往“设置 → 连接 → 创建关联”，然后将配对码粘贴到此处。`;

  const requestingReviewsRequires =
    /^Requesting reviews requires write access and an open (.+)\.$/.exec(value);
  if (requestingReviewsRequires)
    return `请求评审需要写入权限，且该${localizeMobileString(requestingReviewsRequires[1]!, "zh-CN")}处于打开状态。`;

  const reviewRequestTarget =
    /^(Remove review request from|Request review from) (.+?)( team)?$/.exec(value);
  if (reviewRequestTarget)
    return `${reviewRequestTarget[1] === "Remove review request from" ? "移除对" : "向"} ${reviewRequestTarget[2]}${reviewRequestTarget[3] ? " 团队" : ""}${reviewRequestTarget[1] === "Remove review request from" ? " 的评审请求" : " 请求评审"}`;

  const couldntLoadChangeRequest = /^Couldn't load this (.+)\.$/.exec(value);
  if (couldntLoadChangeRequest)
    return `无法加载此${localizeMobileString(couldntLoadChangeRequest[1]!, "zh-CN")}。`;

  const conflictsWith = /^Conflicts with (.+)$/.exec(value);
  if (conflictsWith) return `与 ${conflictsWith[1]} 存在冲突`;
  const noConflictsWith = /^No conflicts with (.+)$/.exec(value);
  if (noConflictsWith) return `与 ${noConflictsWith[1]} 无冲突`;

  const checksFilterTitle = /^(Passing|Failing|All checks) checks$/.exec(value);
  if (checksFilterTitle)
    return `${checksFilterTitle[1] === "Passing" ? "已通过" : checksFilterTitle[1] === "Failing" ? "未通过" : "所有"}检查`;

  const filtersActive = /^Filters, (\d+) active$/.exec(value);
  if (filtersActive) return `筛选，已启用 ${filtersActive[1]} 项`;

  const labelsCount = /^Labels (\d+)$/.exec(value);
  if (labelsCount) return `标签 ${labelsCount[1]}`;

  const downloadFile = /^Download (.+)$/.exec(value);
  if (downloadFile) return `下载 ${downloadFile[1]}`;

  const removeItem = /^Remove (.+)$/.exec(value);
  if (removeItem) return `移除 ${removeItem[1]}`;

  const editItem = /^Edit (.+)$/.exec(value);
  if (editItem) return `编辑 ${editItem[1]}`;

  const linkTarget = /^Link (.+)$/.exec(value);
  if (linkTarget) return `关联 ${linkTarget[1]}`;

  const linkedDate = /^Linked (.+)$/.exec(value);
  if (linkedDate) return `已关联于 ${linkedDate[1]}`;

  const sendAudioTo = /^Send microphone audio to (.+)\?$/.exec(value);
  if (sendAudioTo) return `要将麦克风音频发送到 ${sendAudioTo[1]} 吗？`;

  const finishedRecordingsSent =
    /^Finished recordings will be sent to (.+) for transcription\. You can switch back to This device at any time\.$/.exec(
      value,
    );
  if (finishedRecordingsSent)
    return `录制完成的音频将发送到 ${finishedRecordingsSent[1]} 进行转写。你可以随时切回“此设备”。`;

  const transcriptionModelOn = /^Transcription model on (.+)$/.exec(value);
  if (transcriptionModelOn) return `${transcriptionModelOn[1]} 上的转写模型`;

  const cannotChangeVoiceSettings =
    /^This connection can’t change settings on (.+)\. Add a transcription model using T3 Code on that machine\.$/.exec(
      value,
    );
  if (cannotChangeVoiceSettings)
    return `此连接无权更改 ${cannotChangeVoiceSettings[1]} 上的设置。请在该设备上的 T3 Code 中添加转写模型。`;

  const verifyingModel = /^Verifying (.+)…$/.exec(value);
  if (verifyingModel) return `正在校验 ${verifyingModel[1]}…`;

  const downloadingModel = /^Downloading (.+) · (\d+)%$/.exec(value);
  if (downloadingModel) return `正在下载 ${downloadingModel[1]} · ${downloadingModel[2]}%`;

  const downloadedTapToCancel = /^(\d+)% downloaded · Tap to cancel$/.exec(value);
  if (downloadedTapToCancel) return `已下载 ${downloadedTapToCancel[1]}% · 轻触取消`;

  return null;
}

export function localizeMobileString(value: string, locale: MobileLocale = MOBILE_LOCALE): string {
  if (locale !== "zh-CN") return value;

  const leadingWhitespace = value.match(/^\s*/)?.[0] ?? "";
  const trailingWhitespace = value.match(/\s*$/)?.[0] ?? "";
  const source = value.trim();
  if (!source) return value;

  const translated =
    (ZH_CN_MESSAGES as Readonly<Record<string, string>>)[source] ?? translateDynamicMessage(source);
  return translated === undefined || translated === null
    ? value
    : `${leadingWhitespace}${translated}${trailingWhitespace}`;
}

export function localizeAlertArguments(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  locale: MobileLocale = MOBILE_LOCALE,
): {
  readonly title: string;
  readonly message?: string;
  readonly buttons?: AlertButton[];
} {
  return {
    title: localizeMobileString(title, locale),
    message: message === undefined ? undefined : localizeMobileString(message, locale),
    buttons: buttons?.map((button) => ({
      ...button,
      text: button.text === undefined ? undefined : localizeMobileString(button.text, locale),
    })),
  };
}

export type LocalizedAlertApi = {
  prompt: typeof import("react-native").Alert.prompt;
  alert(title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions): void;
};
