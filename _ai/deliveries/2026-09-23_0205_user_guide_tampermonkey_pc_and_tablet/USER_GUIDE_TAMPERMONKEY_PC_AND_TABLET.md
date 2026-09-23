# Suno中文通 (Suno Partner) - 油猴脚本极简安装与使用教程

本文档指导您如何将 `suno-copilot.user.js` 分别在 **PC 电脑端** 与 **三星安卓平板端（支持 S-Pen 悬浮）** 上安装并运行。

---

## 核心脚本文件位置
- 本地脚本绝对路径：  
  `d:\Projects\Suno_Copilot\dist\suno-copilot.user.js`
- 版本号：`1.5.0`
- 特点：**零外部依赖、单文件自闭环**（内含全部 73 个通俗音乐白话词典、全站汉化规则与 S-Pen 悬浮交互引擎）。

---

## 第一部分：PC 电脑端测试（以 Edge / Chrome 为例）

### 步骤 1：安装 Tampermonkey（篡改猴）扩展
1. 打开电脑上的浏览器（推荐 **Microsoft Edge** 或 **Google Chrome**）。
2. 安装 Tampermonkey 扩展插件：
   - **Edge 浏览器**：在地址栏输入 `edge://extensions/` 打开扩展管理，点击左侧“获取 Microsoft Edge 扩展”，搜索并安装 **Tampermonkey**（或直接访问 Edge 应用商店）。
   - **Chrome 浏览器**：打开 Chrome 网上应用店，搜索并安装 **Tampermonkey**。
3. 安装完成后，浏览器右上角工具栏会出现黑色的 Tampermonkey 图标。

### 步骤 2：安装 Suno中文通 脚本
**推荐最快方式（直接拖入或打开文件）**：
1. 在 Edge/Chrome 浏览器中按下快捷键 `Ctrl + O`（打开本地文件）。
2. 在弹出的文件选择器中，定位并选中：  
   `d:\Projects\Suno_Copilot\dist\suno-copilot.user.js`
3. 浏览器会自动被 Tampermonkey 拦截并弹出安装确认界面，上面会显示：
   - 脚本名称：`Suno中文通 (Suno Partner / Copilot) - 汉化与三层音乐白话讲解`
   - 版本号：`1.5.0`
4. 点击界面上的 **「安装」** 或 **「更新」** 按钮即可完成安装。

*(备用方式：如果快捷键未弹出，可点击浏览器右上角 Tampermonkey 图标 -> 点击「添加新脚本」-> 清空自带的模板代码 -> 打开 `dist/suno-copilot.user.js` 复制全部内容粘贴进去 -> 按 `Ctrl + S` 保存)*

### 步骤 3：验证使用
1. 在浏览器中打开 Suno 创作页：`https://suno.com/create`（若已打开请按 `F5` 刷新一次）。
2. 观察界面：
   - 左侧主导航、顶部创作模式栏（`丢一句给它写 / 自己写歌词和风格 / 做一段声音`）已完成汉化；
   - 展开 `More Options`（更多高级设置），参数栏（歌曲长短、创意发散程度、选男声或女声、男女声切换钮）全部完整双语对照；
   - 风格输入框的灰色提示词呈现“上英下中”两行对照；
   - 鼠标悬停在带有红色小问号 `?` 的功能旁边，会弹出三层音乐人通俗白话讲解卡片。

---

## 第二部分：三星安卓平板端测试（针对 S-Pen 触控笔特别优化）

手机和平板端原生 Chrome 默认不支持安装扩展插件，因此安卓平板需要配合**支持安装 Chrome 扩展的安卓浏览器**使用。

### 步骤 1：在平板上安装推荐浏览器
请在三星平板的应用商店或官网下载安装以下任意一款浏览器：
1. **首选推荐：Kiwi Browser（猕猴桃浏览器）**
   - 特点：基于纯正 Chromium 内核开发，针对安卓平板和平板横屏界面做了深度优化，**完美支持 Chrome Web Store 扩展，对三星 S-Pen 笔尖悬停（Hover / Pointerenter）支持极佳**。
2. **备选推荐：Firefox for Android（火狐安卓版）**
   - 特点：支持官方扩展列表，直接内置 Tampermonkey 扩展插件。

### 步骤 2：在平板浏览器中安装 Tampermonkey
*以使用体验最佳的 **Kiwi Browser** 为例*：
1. 在平板上打开 Kiwi Browser；
2. 点击右上角菜单按钮（三个点 `⋮`）-> 选择 **「Extensions（扩展程序）」**；
3. 点击打开 **Chrome 网上应用店**（Chrome Web Store）；
4. 搜索 `Tampermonkey`，点击 **「添加至 Chrome」** 完成安装。

### 步骤 3：将脚本传输并导入到平板
1. 将 PC 上的脚本文件 `suno-copilot.user.js` 发送到平板上（可通过微信传输助手、QQ、网盘、或通过数据线拷贝到平板的“下载 (Download)”文件夹）。
2. **导入安装**：
   - **方式 A（浏览器直接打开）**：在 Kiwi 浏览器地址栏中直接打开该下载的文件（或在平板“我的文件”中选择用 Kiwi Browser 打开 `suno-copilot.user.js`），Tampermonkey 会自动识别并弹出安装页，点击 **「安装」**。
   - **方式 B（扩展管理面板导入）**：在 Kiwi 浏览器右上角菜单点击 `Tampermonkey` -> 点击「管理面板」-> 切换到顶部「实用工具」标签页 -> 在「从文件导入」中选择平板上的 `suno-copilot.user.js` 文件确认即可。

### 步骤 4：三星平板 S-Pen 独家体验
1. 在平板的 Kiwi 浏览器中访问 `https://suno.com/create`，建议横屏使用。
2. **S-Pen 笔尖悬浮体验**：
   - 将 S-Pen 笔尖悬空停留在任何红色问号徽标上方（无需按压屏幕），约 150 毫秒后即会流畅浮现专属的三层白话音乐讲解卡片；
   - 笔尖移开时自动平滑淡出，操作手感丝滑。
3. **手指触控与防误触体验**：
   - 手指轻点问号徽标即可“锁定卡片”（点击外部区域解锁）；
   - 在歌词编辑框内手写或键盘输入时，插件完全隔离，绝不影响 S-Pen 书写与编辑。
