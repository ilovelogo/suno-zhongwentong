# 交付报告 (DELIVERY.md)

## 1. 任务背景与执行原则
- **用户指令**：“labs下面的页面都没有翻译，包括设置个人信息的页面，赶紧改”
- **核心执行原则**：
  1. 彻底解决 Suno Labs 实验工坊所有子页面（以 `https://suno.com/listen-and-rank` “听歌评测赚积分”为首要基准）以及 Profile / Account 设置页面的全界面深度汉化。
  2. 解除 `scanNavigationAndMenus` 原有的 50 字符长度限制（提升至 300 字符），让评测长题干、说明性段落（`<p>`）能够完整识别并呈现优雅的中文双语注解。
  3. 支持动态内容与交互：动态监听并实时刷新 `Listen for (\d+) more seconds?` 试听倒计时以及 `Earn (\d+) credits` 积分徽标。
  4. 升级文本输入框与占位符（Placeholder），全面覆盖打分理由、个人简介、个性标识等表单。
  5. 严格遵守用户规则：项目名称严格维持“Suno中文通”，版本号递增至 `1.6.0`。

---

## 2. 全量覆盖的 Labs 与个人信息/账户设置清单

### A. Labs · Listen and Rank (听歌评分赚积分 / 评测实验)
- **核心题干与说明**：
  - `Which clip better matches the prompt?` -> `哪一个片段更符合提示词要求？`
  - `Two clips, A and B. Listen to both, then pick the one that better answers the prompt. If you're not sure, pick either one. Every response helps Suno improve!` -> `片段 A 与 B。请试听两者，并选出更能体现提示词的片段。如果不确定，任选其一即可。每一次回答都能帮助 Suno 进化！`（已附加 `.block` 样式自动折行呈现，保持版面清爽）
  - `Listen to songs, share your preferences, and earn credits for your feedback.` -> `听取两段音乐，选出你更喜欢的一首，即可获得积分奖励。`
- **动态状态徽标与倒计时**：
  - `Earn 5 credits` / `Earn (\d+) credits` -> 动态正则提取 `赚取 $1 积分`
  - `Listen for 2 more seconds` / `Listen for (\d+) more seconds?` -> 动态正则提取 `还需试听 $1 秒`（随音频播放动态更新倒计时，无需刷新）
- **片段对比与打分控件**：
  - `Clip A` -> `片段 A`
  - `Clip B` -> `片段 B`
  - `prompt_following` -> `提示词贴合度评分`
  - `Neither` -> `都不符合`
  - `Tags:` / `Tags` -> `风格标签`
- **输入占位符 (Placeholder)**：
  - `Optional: explain your selection(s)` -> `选填：写下你选择该片段的理由`
- **操作按钮与快捷键栏**：
  - `Submit` -> `提交`
  - `Skip` -> `跳过`
  - `Report a problem` -> `反馈问题`
  - `Skip project` -> `跳过此任务`
  - `Shortcuts` -> `快捷键指南`
  - `1: Clip A` -> `1: 片段 A`
  - `2: Clip B` -> `2: 片段 B`
  - `3: Neither` -> `3: 都不符合`
  - `Enter: Submit` -> `Enter: 提交`
  - `Space: Play/Pause` -> `空格: 播放/暂停`
  - `Tab: Focus next` -> `Tab: 下一个`
- **Labs 大转盘与实验功能**：
  - `Genre Wheel`（曲风大转盘）、`Spin the wheel`（转动转盘）、`Spin again`（再转一次）、`Spin`（转动转盘）、`Explore Genres`（探索曲风流派）、`Pick a genre`（挑选曲风）、`Experiments`（实验特性）、`Coming Soon`（即将推出）、`Try it out`（立即体验）

### B. Profile · 个人主页与个人信息设置
- `Edit Profile` -> `编辑个人资料`
- `Public Profile` -> `公开个人主页`
- `Account Information` -> `账户基本信息`
- `Handle` -> `个性标识 (@)`
- `Avatar` / `Upload Avatar` / `Change Avatar` / `Remove Avatar` -> `个人头像` / `上传头像` / `更换头像` / `移除头像`
- `Banner` / `Upload Banner` / `Change Banner` / `Remove Banner` -> `主页背景横幅` / `上传横幅背景` / `更换横幅` / `移除横幅`
- `Tell the world about yourself` -> `用一句话介绍你自己`
- `Your handle and profile URL` -> `你的个性标识与主页地址`
- `Bio` -> `个人简介`
- `About` -> `关于我`
- `Website` -> `个人网站`
- `Social Links` -> `社交媒体链接`
- `Save Profile` -> `保存个人资料`
- `First Name` / `Last Name` / `Full Name` -> `名` / `姓` / `全名`
- `Location` -> `所在地区`

### C. Account & Billing · 账户安全与账单偏好
- `Account Settings` -> `账户设置`
- `Connected Accounts` -> `关联第三方账号`
- `Google Account` / `Apple Account` / `Discord Account` / `Microsoft Account` -> 各第三方登录绑定
- `Connect` / `Disconnect` -> `绑定` / `解绑`
- `Invoices` -> `发票与收据`
- `Download Invoice` -> `下载发票`
- `Subscription & Credits` -> `会员订阅与积分明细`
- `Billing Cycle` -> `计费周期`
- `Monthly` / `Yearly` / `Annual` -> `按月扣费` / `按年订阅` / `按年计费`
- `Next billing date` -> `下次扣费日期`
- `Privacy Settings` -> `隐私偏好`
- `Make my songs public by default` -> `默认将我生成的歌曲设为公开`
- `Show my likes on profile` -> `在个人主页展示我喜欢的歌`
- `Show my playlists on profile` -> `在个人主页展示我的歌单`
- `Audio Preferences` -> `音频播放偏好`
- `Auto-play` -> `自动连续播放`
- `Volume normalization` -> `音量均衡标准化`
- `High Quality Audio` -> `高清音质输出`
- `Save Settings` -> `保存设置`

---

## 3. 架构与引擎加固技术细节
1. **DOM 扫描器范围与选择器升级**：
   - 增加 `<p>`、`[class*="desc"]`、`[class*="instruction"]`、`[class*="subtitle"]`、`[class*="badge"]`、`[class*="header"]` 等元素。
   - 字符扫描长度阈值从 50 提升至 300，彻底支持长句子、引导文案与规则说明。
2. **多行与段落布局优化**：
   - 在 `styles.css` 中引入 `.suno-copilot-nav-zh.block` 样式（`display: block !important; margin-left: 0; margin-top: 0.35rem; line-height: 1.45;`）。针对 `<p>` 标签及超过 30 字符的长提示自动换行并显示在下方，避免长文本横向溢出或排版变形。
3. **动态倒计时与积分数值匹配**：
   - `Listen for (\d+) more seconds?` -> `还需试听 $1 秒`
   - `(?:Earn|\+)?\s*(\d+)\s*Credits?` -> `赚取 $1 积分`
   - 引入 `el.dataset.scDynamicNav` 标记，当页面倒计时秒数递减时，实时更新已挂载的中文文本，无须重新注入。
4. **版本号全面递增至 `1.6.0`**：
   - 同步更新 `package.json`、`scripts/build.js`（UserScript 版本与 Manifest V3 扩展版本）、`dist/suno-copilot.user.js`、`dist/chrome-extension/manifest.json`。

---

## 4. 验证与测试结果
- **自动化测试套件**：`node scripts/test_dom_behavior.js`
- **新增断言 17**：
  - 测试题干、超长说明段落（`<p>`）、Clip A/B、动态倒计时初始状态及后续动态更新（2秒 -> 1秒）、动态积分徽标、快捷键栏、占位符。
  - 测试个人资料设置、背景图、头像、用户名、账号绑定、发票按钮。
- **测试结果**：**全部 18 项行为与安全断言 100% 验证通过**。
- **构建结果**：`node scripts/build.js` 顺利打包 `1.6.0` 产物。

---

## 5. 交付文件清单与路径
- 交付目录：`_ai/deliveries/2026-09-23_0220_labs_and_profile_coverage/`
- 核心修改源文件：
  - `src/core/injector.js`（Section 15-19 词库与动态正则/DOM选择器强化）
  - `src/ui/styles.css`（新增 `.suno-copilot-nav-zh.block` 段落换行样式）
  - `package.json`（版本递增至 1.6.0）
  - `scripts/build.js`（1.6.0 构建打包脚本）
  - `scripts/test_dom_behavior.js`（新增断言 17）
- 编译分发产物：
  - `dist/suno-copilot.user.js`（1.6.0 单文件油猴脚本）
  - `dist/chrome-extension/`（1.6.0 扩展完整目录包）
