# 审查：2026-09-22_1905 阻断项整改

- **Task**: 按 `_ai/deliveries/2026-09-22_1857_review_fix_plan/DELIVERY.md` 的收紧条款，审查 `_ai/deliveries/2026-09-22_1905_fix_review_blockers/`。
- **Result**: **接受这一轮对 B1–B4 的修复。** 正式源码与交付副本一致。本机重跑 `node scripts/test_dom_behavior.js` 退出码为 0。构建报告中的字节数与当前 `dist/` 一致。suno.com 与真机 S-Pen 仍是 `NOT_YET_VERIFIED`，不能写成已经可以当成品上线。
- **Files changed or produced**: 本轮只新增本审查目录，没有改正式源码。
- **Verification performed and result**:
  - 阅读该交付的 `DELIVERY.md`、`TEST_RESULTS.md`、`BUILD_RESULTS.md`、`FILES_CHANGED.md`。
  - 对照正式源码 `src/core/injector.js`、`src/data/glossary.json`、`README.md`。交付副本中的 `injector.js` 与正式文件 SHA256 前 12 位同为 `82D0C3BB1D2B`。
  - 本机执行 `node scripts/test_dom_behavior.js`，退出码 0，5 条断言均打印通过。
  - `Test-Path scripts/import_review.js` 为 False。
  - `dist/` 字节数：`suno-copilot.user.js` 69086，`content.js` 56824，`styles.css` 11225，`manifest.json` 540，`icon16.png` 217，`icon48.png` 652，`icon128.png` 1660。与 `BUILD_RESULTS.md` 一致。
- **Important blockers / known issues**: 无新的阻断项。残留说明见下方，不推翻这一轮。
- **Original project paths**:
  - 被审交付：`_ai/deliveries/2026-09-22_1905_fix_review_blockers/`
  - 引擎：`src/core/injector.js`
  - 测试：`scripts/test_dom_behavior.js`
- **Suggested next step**: 在真实 `https://suno.com/` 上看徽标是否挂到创作区按钮旁边、点徽标时生成是否完全不触发、卡片三层是否可见。现场结果单独写一份交付，不要提前写成通过。

## 对照收紧条款

| 条款 | 结论 |
| :--- | :--- |
| 徽标只处理 `ui_core`，选择器仅为 `button`、`[role="button"]`、`label` | 源码如此 |
| 徽标在控件旁的 `.suno-copilot-companion`，不 `appendChild` 进按钮 | 源码如此；断言 2 检查了按钮内部没有徽标，且点击后按钮计数为 0、卡片进入钉住 |
| `contenteditable`、`input`、`textarea`、`[role="textbox"]` 不注入 | 源码有 `isEditableOrIgnored()` |
| 定位不加 `scrollX` / `scrollY` | 断言 5 在 `scrollX=500`、`scrollY=1000` 时期望 `left=200px`、`top=178px`，本机通过 |
| 离开后 200ms 关闭，进入卡片取消关闭 | `hideTimer` 与卡片 `pointerenter` 已接上 |
| 渲染 `tier3_example`；界面项不给假复制条 | 断言 3 通过。`Custom` 等界面项 `prompt_tag` 为空。`exclude_styles` 保留 `drums, autotune, heavy distortion` |
| `[Belting]` 不再使用「怒音」；去掉 `hans zimmer`、`afterlife` | 词库中已无这三处。中文名为「真声高唱 (不用假声的实音高音)」 |
| 复制失败不提示「已复制」 | `copyToClipboard` 在 `try/catch` 里失败走「复制未成功」 |
| 不用 `import_review.js`；README 改口 | 脚本不存在。README 写明 `glossary.json` 是唯一源头，批注由人改回 JSON |
| 字节数用 `statSync`，现场标未验证 | 字节数已复核。交付自己写了 `NOT_YET_VERIFIED` |

## 不构成否决的残留

- 断言 1 的歌词节点是 `div` / `textarea`，不是编辑区里面的 `button`。当前扫描器本来就不会选中它们。黑名单对「编辑区内部的按钮」有代码，测试没有覆盖这条。
- 断言 4 的实际异常是 `textarea.select is not a function`（第 544 行），不是日志说明里的 `Promise.reject`。失败 Toast 仍然成立，但「已经测到剪贴板 API 拒绝」这句话没有被这次日志证明。
- 页面如果整段重绘按钮，旧的兄弟徽标可能残留，或按钮被标成已处理后再也补不回徽标。这要等 suno.com 现场看，这一轮不另开阻断。
