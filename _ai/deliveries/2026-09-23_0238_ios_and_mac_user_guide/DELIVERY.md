# 交付报告 (DELIVERY.md)

## 1. 任务背景
- **用户指令**：“pc和安卓平板没问题了。ios或者mac上怎么用？”
- **执行目标**：为用户系统梳理并编写针对 **Mac 苹果电脑（macOS）** 与 **iOS / iPadOS（iPhone / iPad）** 环境下油猴脚本（UserScript）的极简、权威、实测可行的安装与使用操作指南。

---

## 2. 核心结论与主流方案

### A. Mac 苹果电脑（macOS）
1. **Chrome / Edge / Brave / Arc 等主流浏览器**：
   - 方式与 Windows 完全一致。在扩展商店直接安装 **Tampermonkey**，快捷键 `Command + O` 打开 `dist/suno-copilot.user.js` 点击安装即可。
2. **原生 Safari 浏览器**：
   - 在 Mac App Store 免费安装 **Userscripts** 扩展（或 Safari 版 Tampermonkey），在 Safari 设置 -> 扩展中开启并允许所有网站权限，将 `suno-copilot.user.js` 放入其指定的脚本目录即可。

### B. iOS / iPadOS 苹果手机与 iPad（iPhone / iPad）
由于 iOS 系统底层浏览器引擎必须使用 WebKit，手机/平板版 Chrome 无法安装扩展。但**官方 Safari 原生支持通过 App 扩展运行油猴脚本**：
1. **首选推荐方案（免费、开源、无广告）：Safari +「Userscripts」App**
   - App Store 搜索下载 **Userscripts**（作者 Justin Wasack）。
   - iOS 设置 -> Safari 浏览器 -> 扩展 -> 开启 Userscripts 并授予“所有网站”权限。
   - 打开 Userscripts App 设置一个本地文件夹（如“文件”App 下的 Userscripts 目录），将 `suno-copilot.user.js` 放入该文件夹。
   - 在 Safari 打开 Suno 网页即可直接运行。支持 Apple Pencil 悬停唤出讲解卡片！
2. **备选方案（功能丰富）：Safari +「Stay」App**
   - App Store 下载 Stay，开启 Safari 扩展权限后一键导入脚本。
3. **独立第三方免配置浏览器：Orion Browser**
   - App Store 下载 Orion，其原生支持 Chrome 网上应用店，直接安装 Tampermonkey 与脚本即可。

---

## 3. 文件修改与交付产物
- 文档文件：
  - `docs/USER_GUIDE_TAMPERMONKEY.md`（更新为 PC / 安卓 / Mac / iOS 四合一全平台使用教程）
- 脚本产物：
  - `dist/suno-copilot.user.js`（1.6.0 版本）
