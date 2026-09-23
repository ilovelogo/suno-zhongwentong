# Suno中文通 (Suno Partner) - 全平台 (PC / 安卓 / Mac / iOS) 安装与使用教程

本文档指导您如何将 `suno-copilot.user.js` 分别在 **Windows PC**、**安卓平板 (三星 S-Pen)**、**Mac 苹果电脑** 以及 **iOS / iPadOS (iPhone / iPad)** 上顺畅安装并运行。

---

## 核心脚本文件位置
- 本地脚本绝对路径：  
  `d:\Projects\Suno_Copilot\dist\suno-copilot.user.js`
- 当前版本号：`1.6.0`
- 特点：**零外部依赖、单文件自闭环**（内含全部 73 个通俗音乐白话词典、全站汉化规则、Labs 评测动态适配与 S-Pen / 触摸悬浮引擎）。

---

## 第一部分：Windows PC 电脑端（Edge / Chrome）

### 步骤 1：安装 Tampermonkey（篡改猴）扩展
1. 打开电脑上的浏览器（推荐 **Microsoft Edge** 或 **Google Chrome**）。
2. 在应用商店搜索并安装 **Tampermonkey**。
3. 安装完成后，浏览器右上角工具栏会出现黑色的 Tampermonkey 图标。

### 步骤 2：安装 Suno中文通 脚本
1. 在浏览器中按下快捷键 `Ctrl + O`（打开本地文件）。
2. 定位并选中 `dist\suno-copilot.user.js`。
3. 浏览器会自动弹出 Tampermonkey 安装确认界面，点击 **「安装」** 或 **「更新」**。
*(备用方式：点击右上角 Tampermonkey 图标 ->「添加新脚本」-> 将 `suno-copilot.user.js` 全部代码粘贴进去并保存)*

### 步骤 3：验证使用
打开 `https://suno.com/create` 或 `https://suno.com/listen-and-rank`，即可看到全界面双语对照、三层白话讲解卡片与动态积分/倒计时。

---

## 第二部分：安卓手机与平板端（火狐、QQ 浏览器、Kiwi）

原生安卓 Chrome 默认不支持安装扩展，推荐使用以下主流浏览器：

### 1. 火狐浏览器安卓版 (Firefox for Android) · 强烈推荐
- **下载安装**：
  - 各大手机应用市场（华为、小米、OPPO、vivo、应用宝、Google Play）搜索 **“火狐浏览器”** 或 **“Firefox”** 下载；
  - 或访问官网 `https://www.firefox.com.cn/` 下载安装包。
- **安装 Tampermonkey 插件**：
  1. 打开火狐浏览器，点击菜单按钮（右下角或右上角三个点 `⋮`）；
  2. 点击 **「附加组件」 (Add-ons)**；
  3. 在列表中找到 **「Tampermonkey（篡改猴）」**，点击右侧的 **「+」** 加号；
  4. 确认添加即可完成安装。
- **安装 Suno中文通 脚本**：
  - 将 `suno-copilot.user.js` 发送到手机并在火狐中打开文件安装；
  - 或在火狐菜单「附加组件」->「Tampermonkey」->「添加新脚本」中粘贴代码保存。
- **使用**：访问 `https://suno.com/create` 即可享受全界面双语对照。

### 2. QQ 浏览器安卓版 (QQ Browser for Android)
- **下载安装**：各大应用商店搜索 **“QQ浏览器”** 安装，或访问官网 `https://browser.qq.com/`。
- **安装 Tampermonkey 插件**：
  1. 打开 QQ 浏览器，点击底栏菜单（三道杠 `≡` 或 “我的”）；
  2. 进入 **「工具箱」** 或 **「扩展插件 / 应用中心」**；
  3. 搜索 **`Tampermonkey`** 或 **`油猴`**，点击安装启用。
- **安装 Suno中文通 脚本**：
  - 将 `suno-copilot.user.js` 传到手机，在 QQ 浏览器中打开该文件，或在扩展中心进入 Tampermonkey 仪表盘选择「从文件导入」即可。
- **使用**：访问 `https://suno.com/` 即可自动运行。

### 3. 三星 Galaxy Tab 平板首选：Kiwi Browser (S-Pen 专属)
- **特点**：纯正 Chromium 内核，针对安卓大屏优化，**原生支持三星 S-Pen 笔尖悬停（Hover 150ms 缓冲防误触）**。
- **安装**：在应用商店下载 Kiwi Browser，打开 Chrome 网上应用店安装 Tampermonkey，导入 `suno-copilot.user.js` 即可。使用 S-Pen 悬浮在红色问号上方即可免触碰快速查看三层通俗白话卡片。


---

## 第三部分：Mac 苹果电脑端（macOS Chrome / Edge / Safari）

Mac 电脑的使用体验与 PC 一样简单顺畅，支持两种主流方案：

### 方案 A：Mac 上的 Chrome / Edge / Brave / Arc 浏览器（最推荐）
1. 在 Mac 浏览器上打开 Chrome 网上应用店或 Edge 扩展商店；
2. 搜索并安装 **Tampermonkey** 扩展；
3. 安装完成后，按下快捷键 `Command + O`，选中本地的 `suno-copilot.user.js`；
4. 在 Tampermonkey 弹出的页面中点击 **「安装」**；
5. 打开 `https://suno.com/` 即可尽情使用。

### 方案 B：macOS 原生 Safari 浏览器
1. 打开 Mac 的 **App Store**，搜索并下载 **Userscripts**（完全免费且开源的 Safari 用户脚本管理器）或者 **Tampermonkey**；
2. 打开 Safari 的「偏好设置（设置）」->「扩展」，勾选开启该扩展，并设置为“在所有网站上始终允许”；
3. 点击 Safari 工具栏上的扩展图标，选择「Open Directory」打开脚本文件夹，将 `suno-copilot.user.js` 文件直接拖拽拷入该文件夹；
4. 刷新 Suno 网页，Safari 即可自动执行双语汉化与白话卡片讲解。

---

## 第四部分：iOS / iPadOS 苹果手机与 iPad 端（Safari 浏览器）

由于 iOS / iPadOS 系统机制所有浏览器底层均基于 WebKit，**在 iPhone / iPad 上推荐直接使用苹果官方支持的 Safari 扩展方案**：

### 方案 A（首选免费开源推荐）：Safari 官方扩展「Userscripts」
1. **下载应用**：在 iPad / iPhone 打开 **App Store**，搜索并免费下载 **Userscripts**（作者为 Justin Wasack，极简无广告开源）；
2. **开启权限**：
   - 进入 iOS「设置」-> 往下滑动找到「Safari 浏览器」-> 点击「扩展」；
   - 找到 **Userscripts**，开启开关，并将下方权限设置为 **“允许”** 和 **“所有网站”**；
3. **设置脚本存储目录**：
   - 在 iPad / iPhone 自带的「文件」App 中，创建一个文件夹（例如在“我的 iPad”下新建名为 `Userscripts` 的文件夹）；
   - 打开 Userscripts App，点击 **「Set Userscripts Directory」**，选择刚才创建的文件夹；
4. **导入 Suno中文通 脚本**：
   - 将 `suno-copilot.user.js` 发送到 iPad / iPhone（通过隔空投送 AirDrop、微信、iCloud 云盘等均可）；
   - 将该文件移动并保存在刚才设置的 `Userscripts` 文件夹内；
5. **开始使用**：
   - 在 Safari 打开 `https://suno.com/create`；
   - 点击 Safari 地址栏左侧的“大小”或扩展拼图图标，点击 **Userscripts** 确保 `Suno中文通` 已勾选处于运行状态；
   - 刷新页面，Suno 全站双语汉化、参数白话注解与动态积分即刻生效！
   - *（在支持 Apple Pencil 悬停的 iPad Pro / iPad Air M2 上，悬浮笔尖同样能灵敏触发三层白话讲解卡片！）*

### 方案 B（功能强大备选）：Safari 扩展「Stay」
1. 在 App Store 搜索并下载 **Stay**（专为 Safari 打造的用户脚本管理工具）；
2. 按照 App 引导在 Safari 扩展设置中激活 Stay 并允许所有网站权限；
3. 打开 Stay App，点击右上角「+」-> 选择「导入本地文件」选中 `suno-copilot.user.js`（或选择「新建脚本」将代码粘贴保存）；
4. 在 Safari 中打开 Suno 即可运行。

### 方案 C（独立第三方免 Safari 配置）：Orion 浏览器
1. 在 App Store 搜索下载 **Orion Browser by Kagi**（iOS 上原生支持 Chrome / Firefox 插件的独立浏览器）；
2. 打开 Orion 设置，进入扩展中心直接安装 Chrome 应用店的 **Tampermonkey**；
3. 将 `suno-copilot.user.js` 文件在 Orion 中打开即可一键安装。
