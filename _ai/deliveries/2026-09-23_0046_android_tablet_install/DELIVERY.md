# 安卓平板可能的安装方式

- **Task**: 说明 v1.3.0 在安卓平板上能怎么装。
- **Result**: 平板走油猴脚本 `dist/suno-copilot.user.js`。现在说得通的是 Firefox，或 Edge 里的油猴。电脑上的「加载已解压扩展」在安卓 Chrome 和三星浏览器里没有对应入口。
- **平板实机**: `NOT_YET_VERIFIED`。下面是安装路径，不是已经在三星平板上跑通的记录。

## 要拷到平板上的文件

`dist/suno-copilot.user.js`

词库和教程已经打进这个文件。装好后用这个浏览器打开 `https://suno.com/`。

## 路径 1：Firefox

1. 平板安装 Firefox。
2. 菜单 → 附加组件，安装 Tampermonkey。Violentmonkey 也在 Firefox 安卓的附加组件里，二选一。
3. 打开油猴，新建脚本，把 `suno-copilot.user.js` 全文贴进去保存。
4. 用 Firefox 打开 `https://suno.com/`。

依据：Mozilla 附加组件页标明 Tampermonkey 可用于 Firefox Android，版本 5.5.0，更新于 2026-05-08。本次没有在平板上安装。

## 路径 2：Microsoft Edge

1. 平板安装 Edge。
2. 菜单 → 扩展，安装 Tampermonkey。2025-03 的 Edge 安卓扩展名单里有 Tampermonkey 和 Violentmonkey。
3. 按油猴自己的说明打开「允许用户脚本」或开发者模式，否则脚本不会注入。
4. 同样把 `suno-copilot.user.js` 贴进新建脚本并保存。
5. 用 Edge 打开 `https://suno.com/`。

Edge Canary 可以用扩展 ID 安装商店里的扩展。本项目的 `dist/chrome-extension/` 没有上架，没有扩展 ID，这条不能用来装音乐通本身。

## 不要再按 README 的 Kiwi 来写

`README.md` 方案 A 仍写「三星平板 + Kiwi Browser」。Kiwi 官方仓库写明 2025 年 1 月后不再维护，并建议改用 Edge 或 Firefox。旧的 Kiwi 安装可能还能打开，不作为现在的安装说明。

## 装不上扩展包的浏览器

安卓版 Chrome 不能加载 `dist/chrome-extension/`。三星浏览器也没有「加载已解压的扩展程序」。那一夹给电脑上的 Chrome / Edge。

## 装上以后和网络、笔的关系

油猴脚本没有扩展后台。按钮、词库、教程的中文在文件里。歌曲介绍里词库盖不住的英文，会由网页自己去请求 `translate.googleapis.com`。大陆若连不上谷歌，已有中文仍在，没词库的那一段不会被机器补上。

S-Pen 悬停是否能在 Firefox 或 Edge 里打开问号卡片，本次没有在平板上验证。
