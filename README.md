# Suno中文通 (Suno Partner / Copilot)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.6.0-blue.svg)](./dist/suno-copilot.user.js)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Android%20%7C%20Mac%20%7C%20iOS-brightgreen.svg)](./docs/INSTALL_GUIDE.md)

> 专为**零音乐基础创作者**与**多端跨平台（Windows PC / 安卓手机与平板 / Mac / iOS 与 iPad）**打造的 Suno.com 伴侣工具。  
> 彻底解决三大痛点：全英文界面看不懂、通用机翻生硬甚至错翻、专业音乐与编曲术语门槛过高。  
> 核心武器：**五大维度三层通俗白话卡片**（大白话听感 + Suno 实操指引 + 提示词标签代码）、**全站 200+ 菜单与高级参数全量汉化**、**Labs 评测动态倒计时与积分识别**、**做第一首歌新手向导**，纯净查看、一触复制。

📖 English version: [README_EN.md](./README_EN.md)

---

## 📖 全平台安装与使用指南

详细跨平台步骤请直达专属手册：  
👉 **[docs/INSTALL_GUIDE.md](./docs/INSTALL_GUIDE.md) · 全平台安装与配置使用指南**

- **安卓手机/平板 (Android)**：
  - **火狐浏览器安卓版 (Firefox for Android)**：各大应用市场/官网下载，在菜单「附加组件」中一键添加 Tampermonkey。
  - **QQ 浏览器安卓版 (QQ Browser)**：各大应用商店下载，在「工具箱/扩展插件」中安装 Tampermonkey 即可。
  - **三星平板 Galaxy Tab**：首选推荐 **Kiwi Browser**，纯正 Chromium 内核，完美支持三星 S-Pen 笔尖悬停（Hover 150ms 缓冲防误触）。
- **苹果 iOS / iPadOS (iPhone / iPad)**：
  - 官方首选方案：Safari 浏览器配合免费开源的 **Userscripts** App（App Store 搜索下载，并在系统设置中启用 Safari 扩展）；
  - 支持 iPad Pro / Air 上的 Apple Pencil 笔尖悬停交互！
- **苹果 Mac 电脑 (macOS)**：
  - Chrome / Edge / Brave / Arc：安装 Tampermonkey，按 `Command + O` 选择 `dist/suno-copilot.user.js` 一键安装；
  - 原生 Safari：App Store 安装 Userscripts 扩展运行。
- **Windows PC 电脑端**：
  - Edge / Chrome 浏览器安装 Tampermonkey，按 `Ctrl + O` 打开 `dist/suno-copilot.user.js` 点击安装即可。

---

## 📂 核心资产与代码清单

1. **`dist/suno-copilot.user.js`**  
   *单文件油猴脚本 (v1.6.0)*：零外部依赖，约 148KB，内嵌 73 个核心通俗白话术语、全站 200+ 菜单与高级参数汉化表、右侧歌曲列表风格翻译引擎与动态 Labs 评测支持。适用于全平台所有支持用户脚本的浏览器。

2. **`dist/chrome-extension/`**  
   *标准 Chrome / Edge 扩展包 (Manifest V3)*：含 16/48/128 像素图标、后台服务脚本与样式，电脑端可直接在 `chrome://extensions/` 开发者模式下一键加载。

3. **`docs/INSTALL_GUIDE.md`**  
   *跨平台安装操作宝典*：针对 PC、Mac、iOS、安卓火狐与 QQ 浏览器详尽编写的图文级操作说明。

4. **`src/data/glossary.json`**  
   *核心白话知识库唯一事实源*：五大维度、73 个通俗音乐白话词目。

5. **`Music_Expert_Review_Sheet.md` & `.csv`**  
   *音乐专业人士校对评审表*：Markdown 版与带 UTF-8 BOM 的 Excel/WPS 版，支持音乐制作人复核批注。

6. **`scripts/` 自动化工具链**：
   - `build.js`：一键编译打包油猴脚本与 Chrome 扩展包；
   - `test_dom_behavior.js`：全套 18 项自动化 DOM 行为仿真、防篡改隔离与全功能测试；
   - `export_review.js`：从 `glossary.json` 自动导出专家校对表。

---

## 🛠️ 自动化构建与测试

本项目完全纯原生、零外部 npm 依赖，仅需本地 Node.js 环境：

```bash
# 1. 运行自动化 DOM 行为仿真与安全性测试（18 项断言 100% 验证）
node scripts/test_dom_behavior.js

# 2. 一键编译打包 dist 产物
node scripts/build.js

# 3. 一键导出最新的 Markdown 与 Excel 专家评审表
node scripts/export_review.js

# 或者一键执行全部流程
npm run all
```

---

## 🎵 核心特性与架构加固

1. **界面全覆盖**：
   - 顶部创作模式（丢一句给它写、自己写歌词、做声音）；
   - 全部高级参数（歌曲长短、创意发散程度、男女声切换钮、参考音频上传与录制、音频裁剪编辑、分轨提取、社群榜单、音乐库批量管理）；
   - **Labs 实验工坊**：`https://suno.com/listen-and-rank`（听歌评测赚积分）题干、长规则段落、动态倒计时（`Listen for (\d+) more seconds`）与积分实时追踪；
   - **个人资料与账户中心**：个人主页背景图、头像、个性标识、社交链接、发票收据与第三方账号绑定。
2. **三层通俗白话卡片**：
   - 第一层：大白话听感解释（零基础一秒看懂）；
   - 第二层：Suno 实操填法与玩法避坑；
   - 第三层：完整提示词与效果示例（支持一键纯净复制）。
3. **安全隔离机制**：
   - 歌词编辑区、提示词输入区完全隔离，100% 杜绝误注入或干扰用户打字。
4. **平板防误触与悬浮设计**：
   - 针对三星 S-Pen 与 Apple Pencil 触控笔提供 150ms 缓冲悬浮机制；支持手指点击“锁定图钉”阅读。
