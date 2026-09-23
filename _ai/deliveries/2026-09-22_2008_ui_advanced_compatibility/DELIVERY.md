# 交付报告：新版 Suno UI (Advanced / Lyrics / v6) 兼容性补全

- **Task**: 解决新版 Suno 界面中 `Custom` 改名为 `Advanced`、模型引擎升级为 `v6` 等导致按钮未命中扫描规则的问题，恢复页面控件的问号徽标与中文副标题挂载。
- **Result**: PASS。已更新 DOM 扫描器匹配策略并重新打包 `dist/chrome-extension/` 与 `dist/suno-copilot.user.js`。5 项自动化安全断言全部通过。
- **Delivery Path**: `_ai/deliveries/2026-09-22_2008_ui_advanced_compatibility/`

---

## 1. 变更清单

| 文件路径 | 变更说明 |
| :--- | :--- |
| `src/core/injector.js` | 在 `scanAndInject()` 匹配分支中加入新版 Suno UI 映射规则：<br>1. `Custom` 映射兼容 `Advanced` 模式按钮；<br>2. 新增 `Lyrics` 折叠面板标题识别；<br>3. `Model v3.5 / v4` 映射正则更新为 `/^(?:Model\s*)?v\d+(?:\.\d+)?$/i`，兼容 Suno 最新推出的 `v6` / `v5` 引擎切换按钮。 |
| `dist/chrome-extension/content.js` | 重新打包，同步最新扫描逻辑（文件大小 57,135 bytes）。 |
| `dist/suno-copilot.user.js` | 重新打包，同步最新逻辑（文件大小 69,397 bytes）。 |

---

## 2. 自动化验证结果

执行命令：`node scripts/test_dom_behavior.js`
- ✅ 断言 1: 歌词可编辑区域隔离，扫描前后内容完全一致，内部 0 徽标注入。
- ✅ 断言 2: 徽标挂载于独立兄弟节点，点击徽标不冒泡、不触发父级按钮（0 点击事件）。
- ✅ 断言 3: 三层白话卡片完整输出通俗解释、实操指引、第三层示例。
- ✅ 断言 4: 复制受阻时真实展示警告 Toast，杜绝假提示。
- ✅ 断言 5: 视口固定定位不累加 scrollX/scrollY。
- 结果：**5/5 通过，退出码 0**。

---

## 3. 用户下一步操作指南（仅需 5 秒）

1. 在 Edge 打开扩展页面：`edge://extensions/`
2. 找到 **「Suno 音乐通 (Suno Partner)」**，点击卡片上的 **「重新加载」**（Reload 🔄 图标）；
3. 切回 Suno 标签页（`https://suno.com/create`），按 **F5** 刷新页面；
4. 此时顶部的 **`Advanced`** 按钮旁边将立即挂上 **`(?)(制作人开关)`** 徽标！点击徽标即可展开三层白话通俗讲解。
