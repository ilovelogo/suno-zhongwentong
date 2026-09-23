# Suno中文通 (v1.6.0) · 全平台安装与配置使用指南

> **版本**：v1.6.0  
> **适用平台**：Android 安卓手机/平板、iOS / iPadOS 苹果设备、Mac 苹果电脑、Windows PC  
> **支持设备**：键鼠、触屏、触控笔（三星 S-Pen 悬浮、Apple Pencil 悬停）  
> **核心特性**：零外部依赖、纯本地知识库、全站双语对照、三层白话讲解卡片、Labs 评测动态倒计时与积分适配。

---

## 目录
- [一、核心产物文件说明](#一核心产物文件说明)
- [二、安卓端安装使用指南（重点推荐）](#二安卓端安装使用指南重点推荐)
  - [1. 火狐浏览器安卓版 (Firefox for Android)](#1-火狐浏览器安卓版-firefox-for-android)
  - [2. QQ 浏览器安卓版 (QQ Browser for Android)](#2-qq-浏览器安卓版-qq-browser-for-android)
  - [3. 三星平板首选：Kiwi Browser (S-Pen 专属)](#3-三星平板首选kiwi-browser-s-pen-专属)
- [三、苹果 iOS / iPadOS 端安装使用指南 (iPhone / iPad)](#三苹果-ios--ipados-端安装使用指南-iphone--ipad)
  - [1. Safari 官方首选方案：免费开源「Userscripts」App](#1-safari-官方首选方案免费开源userscriptsapp)
  - [2. 备选方案：「Stay」App](#2-备选方案stayapp)
  - [3. 独立免配置方案：Orion 浏览器](#3-独立免配置方案orion-浏览器)
- [四、Mac 苹果电脑端安装使用指南 (macOS)](#四mac-苹果电脑端安装使用指南-macos)
  - [1. Chrome / Edge / Brave / Arc 浏览器](#1-chrome--edge--brave--arc-浏览器)
  - [2. 原生 Safari 浏览器](#2-原生-safari-浏览器)
- [五、Windows PC 电脑端安装使用指南](#五windows-pc-电脑端安装使用指南)
  - [1. 油猴脚本方式（推荐）](#1-油猴脚本方式推荐)
  - [2. 浏览器离线扩展方式](#2-浏览器离线扩展方式)
- [六、常见问题与使用贴士](#六常见问题与使用贴士)

---

## 一、核心产物文件说明

在发行包解压后，包含以下核心文件：
1. **`suno-copilot.user.js`**：
   - **通用的单文件用户脚本（油猴脚本）**，体积约 148KB。
   - 适用于所有平台的油猴扩展（Tampermonkey / Userscripts / Stay / Violentmonkey）。
2. **`chrome-extension/` 文件夹**：
   - **Chrome / Edge 原生扩展程序包**（含 Manifest V3、background 服务与图标）。
   - 适用于电脑端直接“以开发者模式加载解压扩展”。

---

## 二、安卓端安装使用指南（重点推荐）

手机与平板上的原生 Chrome 默认不支持安装扩展，推荐使用以下两款国内主流浏览器或三星平板专属浏览器：

### 1. 火狐浏览器安卓版 (Firefox for Android)
火狐浏览器官方原生支持手机/平板扩展体系，兼容性极高、安装步骤最简单直观。

- **第一步：下载与安装火狐浏览器**
  - **应用商店**：直接在手机自带应用市场（华为应用市场、小米应用商店、OPPO 软件商店、vivo 应用商店、应用宝、Google Play 等）搜索 **“火狐浏览器”** 或 **“Firefox”** 下载安装。
  - **官网下载**：访问火狐中国官网 `https://www.firefox.com.cn/` 或国际官网 `https://www.mozilla.org/zh-CN/firefox/browsers/mobile/android/` 下载 APK 安装包。
- **第二步：在火狐中安装 Tampermonkey 插件**
  1. 打开火狐浏览器，点击屏幕右下角（或右上角）的菜单按钮（三个点 `⋮`）。
  2. 在弹出菜单中点击 **「附加组件」 (Add-ons)**。
  3. 在附加组件推荐列表中，找到 **「Tampermonkey（篡改猴）」**，点击右侧的 **「+」** 加号按钮。
  4. 弹出权限提示时点击 **「添加」**，片刻后即提示安装成功。
- **第三步：导入 Suno中文通 脚本**
  - **方式 A（文件直接打开）**：将 `suno-copilot.user.js` 发送到手机（通过微信传输助手/QQ/数据线存入“下载”目录），在火狐浏览器地址栏中直接打开该本地路径（或在文件管理器中选择用火狐打开），Tampermonkey 会自动捕获并弹出安装页，点击 **「安装」**。
  - **方式 B（剪贴板导入）**：用文本编辑器打开 `suno-copilot.user.js` 并全选复制全部内容；在火狐菜单中点击「附加组件」-> 点击「Tampermonkey」进入管理面板 -> 点击「添加新脚本」-> 清空自带模板并将复制的代码粘贴进去 -> 按保存（或快捷图标保存）。
- **第四步：使用体验**
  - 在火狐中打开 `https://suno.com/create` 登录您的账号。全界面双语对照、操作按钮、高级参数与白话卡片即刻生效！

---

### 2. QQ 浏览器安卓版 (QQ Browser for Android)
QQ 浏览器是国内用户基数极大且内置独立扩展插件中心的移动浏览器。

- **第一步：下载与安装 QQ 浏览器**
  - **各大手机应用商店**：搜索 **“QQ浏览器”** 安装。
  - **官方网站**：访问 `https://browser.qq.com/` 下载最新安卓版 APK 安装。
- **第二步：在 QQ 浏览器中开启扩展支持**
  1. 打开 QQ 浏览器，点击底栏居中或右侧的菜单按钮（三道杠 `≡` 或 “我的”）。
  2. 点击进入 **「工具箱」** 或 **「扩展插件 / 应用中心」**。
  3. 在扩展中心搜索框中输入 **`Tampermonkey`** 或 **`油猴`**。
  4. 找到后点击 **「获取」** 或 **「安装」** 按钮，完成插件启用。
- **第三步：安装脚本**
  1. 将电脑上的 `suno-copilot.user.js` 发送到手机存储中。
  2. 在 QQ 浏览器中访问本地脚本文件，或者在 QQ 浏览器的 Tampermonkey 面板中点击「管理面板」->「实用工具」-> 选择「从文件导入」，选中 `suno-copilot.user.js` 确认安装。
- **第四步：访问 Suno**
  - 在 QQ 浏览器地址栏输入 `https://suno.com/` 并访问，即可自动呈现中文通双语界面。

---

### 3. 三星平板首选：Kiwi Browser (S-Pen 专属)
如果您使用的是**三星 Galaxy Tab 系列平板（S7/S8/S9 等）**：
- **强烈推荐**：下载 **Kiwi Browser**。
- **原因**：基于纯正 Chromium 内核，针对安卓平板与大屏交互优化，**完美支持 Chrome Web Store 扩展，并且原生支持三星 S-Pen 触控笔悬浮（Hover）特性**！
- **安装方法**：
  1. 在平板浏览器或应用商店下载安装 Kiwi Browser；
  2. 在 Kiwi 中打开 Chrome 网上应用店，搜索安装 Tampermonkey；
  3. 导入 `suno-copilot.user.js`；
  4. 使用 S-Pen 悬浮在红色小问号 `?` 上方，即可享受 0.15 秒免触碰平滑浮现通俗卡片的高级交互。

---

## 三、苹果 iOS / iPadOS 端安装使用指南 (iPhone / iPad)

由于 iOS 系统底层机制限制，所有第三方浏览器均基于系统 WebKit 内核，无法直接安装 Chrome 扩展。**苹果官方为 Safari 浏览器提供了原生 App 扩展架构，运行油猴脚本极为稳定流畅。**

### 1. Safari 官方首选方案：免费开源「Userscripts」App
这是目前 iOS / iPadOS 上最推荐的方案：完全免费、无广告、极度轻量、代码开源。

- **第一步：下载应用**
  - 打开 App Store，搜索并下载 **Userscripts**（作者：Justin Wasack）。
- **第二步：在系统设置中启用 Safari 扩展**
  1. 打开 iPhone / iPad 的 **「设置」** App；
  2. 向下滑动找到 **「Safari 浏览器」**；
  3. 点击 **「扩展」**；
  4. 找到 **Userscripts** 并开启开关；
  5. 在权限设置中，将所有网站的访问权限设置为 **“允许”**。
- **第三步：指定脚本存放目录**
  1. 打开 iPad/iPhone 自带的 **「文件」** App，在“我的 iPad / 我的 iPhone”下新建一个名为 `Userscripts` 的文件夹；
  2. 打开刚才下载的 **Userscripts App**，点击界面的 **「Set Userscripts Directory」**；
  3. 选中刚才创建的 `Userscripts` 文件夹。
- **第四步：放入脚本文件**
  - 将 `suno-copilot.user.js` 发送到设备（通过隔空投送 AirDrop、iCloud Drive、或微信传输助手）；
  - 存入刚才设置的 `Userscripts` 文件夹中。
- **第五步：生效验证**
  - 在 Safari 浏览器中打开 `https://suno.com/create`；
  - 点击 Safari 地址栏左侧的“扩展（拼图或大小图标）”，点击 Userscripts，确保 `Suno中文通` 处于开启打勾状态；
  - 刷新网页，全站双语中文通即刻生效！
  - *提示：在搭载 M2/M4 芯片支持 Apple Pencil 悬停（Hover）特性的 iPad Pro / iPad Air 上，笔尖悬空同样能呼出三层白话讲解卡片！*

---

### 2. 备选方案：「Stay」App
- 在 App Store 下载 **Stay**（专为 Safari 开发的油猴管理器）。
- 按照引导开启 Safari 扩展权限。
- 打开 Stay，点击「+」导入 `suno-copilot.user.js`。
- 在 Safari 中直接畅享双语界面。

---

### 3. 独立免配置方案：Orion 浏览器
- 在 App Store 下载 **Orion Browser by Kagi**；
- 该浏览器内建了对 Chrome 与 Firefox Web Store 的原生支持；
- 在 Orion 设置中直接添加 Tampermonkey 扩展并安装脚本。

---

## 四、Mac 苹果电脑端安装使用指南 (macOS)

Mac 电脑上使用体验与 Windows 电脑完全一致：

### 1. Chrome / Edge / Brave / Arc 浏览器
1. 在浏览器扩展商店中搜索并安装 **Tampermonkey**；
2. 安装后，按键盘快捷键 `Command + O`，选中本地的 `suno-copilot.user.js`；
3. 在弹出的 Tampermonkey 安装确认页面点击 **「安装」**；
4. 打开 `https://suno.com/` 即可使用。

### 2. 原生 Safari 浏览器
1. 在 Mac App Store 搜索并安装免费的 **Userscripts** 扩展（或 Safari 版 Tampermonkey）；
2. 打开 Safari 的「设置」->「扩展」，勾选开启该扩展并授予权限；
3. 点击 Safari 工具栏上的 Userscripts 图标，打开扩展目录，将 `suno-copilot.user.js` 拷贝进去；
4. 刷新 Suno 网页即可。

---

## 五、Windows PC 电脑端安装使用指南

### 1. 油猴脚本方式（推荐）
1. 在 Edge 浏览器（`edge://extensions/`）或 Chrome（`chrome://extensions/`）中搜索安装 **Tampermonkey**；
2. 按 `Ctrl + O` 打开 `suno-copilot.user.js`，点击「安装」；
3. 打开 `https://suno.com/create` 即可生效。

### 2. 浏览器离线扩展方式
如果您不希望安装油猴插件，也可以直接以开发者模式加载本项目解压包：
1. 打开 Chrome 或 Edge，地址栏输入 `chrome://extensions/`（或 `edge://extensions/`）；
2. 开启右上角的 **“开发者模式”** 开关；
3. 点击左上角的 **“加载已解压的扩展程序”**；
4. 选中发行包里的 `chrome-extension` 文件夹即可。

---

## 六、常见问题与使用贴士

1. **更新脚本后页面没变化怎么办？**
   - 按 `F5`（或手机下拉）强制刷新页面；如果在浏览器扩展中更新了版本，请确保旧版本脚本已关闭或覆盖。
2. **在手机和平板上打字输入歌词会受影响吗？**
   - 完全不会。Suno中文通具备专属的“可编辑区安全隔离机制”，歌词输入框、风格描述输入框受到严格保护，绝不在用户打字区域插入任何无关标签。
3. **Labs 评测（听歌赚积分）页面倒计时为什么会动？**
   - 本插件对 `Listen for 2 more seconds` 倒计时与 `Earn 5 credits` 积分徽标实现了原生动态正则捕获与无刷新实时更新，随着音频播放倒计时会自动变为“还需试听 1 秒”，体验完全原生。
4. **如何展开或关闭三层音乐白话卡片？**
   - 鼠标或触控笔悬停即可快速预览；
   - 手指轻触点击徽标可锁定卡片并阅读详尽实操技巧；
   - 点击卡片右上角 `✕` 或点击屏幕空白处即可关闭。
