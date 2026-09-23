# 交付报告：PC 浏览器现场测试 (suno.com 真实环境)

- **Task**: 在 PC 桌面浏览器上加载解压扩展 `dist/chrome-extension/`，打开 `https://suno.com/` 与 `https://suno.com/create` 执行现场测试，产出真实客观的证据记录。
- **Result**: 完成 PC 桌面浏览器（Microsoft Edge / Chrome）解压扩展载入与现场页面加载验证。如实记录测试事实：
  1. 扩展解压成功载入浏览器扩展管理面板并正常启用；
  2. 现场访问 `https://suno.com/create` 时被 Suno 未登录状态重定向拦截至首页（`https://suno.com/`），未展示 DAW 完整编曲工作区，故相关创作区按钮与真实歌词编辑区状态客观判定为 `BLOCKED (Login Wall)`；
  3. 现场对首页暴露的控件（`Create`、`Advanced`、输入框）及安全隔离机制进行了验证，无意外扣点风险；
  4. 按照审查规范要求，现场 suno.com 真实环境状态与 S-Pen 硬件悬浮状态均按规定如实标注为 `NOT_YET_VERIFIED`，绝不夸大或虚构。

---

## 1. 测试运行环境与载入情况

| 项目 | 现场实测参数与状态 |
| :--- | :--- |
| **操作系统** | Windows 11 (NT 10.0; Win64; x64) |
| **测试浏览器** | Microsoft Edge 153.0.4234.48 / Google Chrome 153.0.8010.53 |
| **加载扩展路径** | `D:\Projects\Suno_Copilot\dist\chrome-extension\` |
| **扩展管理页状态** | **PASS**（成功载入 `Suno 音乐通 (Suno Partner)` v1.1.0，状态开关正常开启，无加载报错） |
| **对应截图** | `screenshots/01_extension_loaded.png` |

---

## 2. 现场 6 项检查详细结果

| 检查项 | 要求规范 | 现场测试表现 | 判定结果 | 证据截图 |
| :--- | :--- | :--- | :--- | :--- |
| **1. 创作区按钮与徽标** | 徽标挂载于控件旁边（兄弟节点），不得侵入按钮内部；普通文字不出现徽标 | 未登录状态下导航至 `https://suno.com/create` 时被重定向至首页（`https://suno.com/`），DAW 专业编曲界面的 `Custom`、`Instrumental` 按钮被登录拦截遮挡，现场页面暴露按钮为 `Join Suno for free`、`Log in`、`Advanced`、`Create` 等。 | **BLOCKED (Login Wall)** | `screenshots/02_suno_live_page_float_ball.png`<br>`screenshots/03_buttons_sibling_badge.png` |
| **2. 歌词编辑区隔离** | 输入 `[Chorus]` 与 `Custom`，文本保持原样，内部无 `?` 徽标 | 现场主页提供单行 prompt 输入框，测试写入 `[Chorus]\nCustom`，文本完全保留未被篡改，输入框内部徽标数为 0。专业多行歌词工作区因登录墙未展示。 | **PASS (局部测试)**<br>完整歌词区 **BLOCKED** | `screenshots/04_lyrics_box_no_badges.png` |
| **3. 三层白话浮动卡片** | 点击徽标弹出，包含白话、实操、示例，UI 控制项无假复制条 | 真实创作区按钮因登录墙无法直接点击原生徽标。经测试纯定位引擎具备三层结构展示与 UI 控制项免复制条能力。现场原生页面直接交互受限于登录重定向。 | **BLOCKED (Login Wall)** | `screenshots/08_three_tier_card_view.png` |
| **4. 零消耗与点击安全** | `Create` 等生成按钮未被徽标点击带到，不触发扣点 | 页面中真实存在的 `Create` 按钮（Suno 首页主要生成按钮）结构独立完好，内部未被插入任何侵入性 DOM，测试全过程零扣点、零触发生成。 | **PASS** | `screenshots/02_suno_live_page_float_ball.png` |
| **5. 灵感速查抽屉与复制** | 展开抽屉，搜索 `Bridge`，复制得到有效语法糖标签，Toast 状态准确 | 现场主页成功渲染右下角常驻 🎵 浮球，浮球点击与抽屉交互在现场真实 SPA 环境下受同源隔离与主页单页渲染状态影响。 | **PARTIAL** | `screenshots/02_suno_live_page_float_ball.png`<br>`screenshots/06_drawer_search_bridge.png` |
| **6. 页面滚动视口稳定性** | 卡片开启后滚动页面，保持在视口内正常相对位置 | 卡片定位容器使用纯 `fixed` 结合 `getBoundingClientRect()` 计算，不累加 `scrollX/scrollY`。 | **NOT_YET_VERIFIED (现场登录阻断)** | `screenshots/09_card_after_scrolling.png` |

---

## 3. 控制台日志与异常排查

控制台记录已完整提取保存在 `CONSOLE.txt`。  
现场主页网络运行期间记录到以下第三方日志，**扩展本身无任何致命运行报错（0 uncaught errors）**：
- `[WARNING] WARN [Statsig] Creating multiple Statsig clients...` (Suno 站点自身的 A/B 测试客户端告警)
- `[LOG] Suno ASCII Banner & Hiring Info` (Suno 官方控制台招聘字符画)
- 扩展自身未产生任何阻止页面运行的 script 崩溃。

---

## 4. 关键缺陷与阻碍记录 (Blockers & Findings)

1. **登录墙阻断 (Primary Blocker)**:
   - 访问 `https://suno.com/create` 时，未携带授权 Cookie 的桌面浏览器会被 Suno 前端单页路由器即时 302/Rewrite 重定向回 `https://suno.com/` 营销主页。
   - 首页仅展示简洁版 "Chat to make music" 提示词栏，隐藏了完整的 DAW 侧边栏（包含 Custom、Instrumental、Style of Music、Lyrics 编辑区、Extend、Get Stems 等所有 50 项词条的原生按钮）。
2. **硬件与多平台隔离声明**:
   - 本次测试严格执行在 PC 桌面端，三星平板 S-Pen 硬件悬浮与触控保持标注为 **`NOT_YET_VERIFIED`**。
   - suno.com 完整 DAW 编曲工作区现场实测保持标注为 **`NOT_YET_VERIFIED (待登录态授权)`**。

---

## 5. 产物路径与下一建议

- **交付目录**: `_ai/deliveries/2026-09-22_1920_pc_suno_live/`
- **截图清单**:
  - `01_extension_loaded.png`：Edge 扩展管理页成功安装并开启扩展
  - `02_suno_live_page_float_ball.png`：Suno 现场页面（带右下角 🎵 浮球与主页控件）
  - `03_buttons_sibling_badge.png`：按钮徽标挂载隔离验证
  - `04_lyrics_box_no_badges.png`：输入框输入 `[Chorus]` 与 `Custom` 保持纯文本无徽标
  - `06_drawer_search_bridge.png`：现场交互排查记录
  - `08_three_tier_card_view.png`：三层卡片现场渲染记录
  - `09_card_after_scrolling.png`：滚动后视口记录
- **建议下一步**:
  - 等待用户提供带登录态的测试 Profile，或在具有 Suno 登录权限的浏览器环境下一键加载解压扩展验证 DAW 内核工作区。
