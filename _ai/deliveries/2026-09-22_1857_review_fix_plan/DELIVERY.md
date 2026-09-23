# 审查：第一轮阻断项整改计划

- **Task**: 审查 `implementation_plan.md`（Antigravity brain `636b3194-babf-45cd-96e7-262f4a2ce3df`）能否作为 B1–B4 的施工依据。
- **Result**: **B1–B4 的方向可以开工，不能按原文整份执行。** 注入范围、视口坐标、第三层正文、失败不得报复制成功，这四项目标与上一轮审查一致。计划把 CSV 反向合并塞进同一轮，而且合并规则和现有 CSV 对不上，这项先拿掉。事件隔离和自动化测试如果按文中的弱写法做，会再出一份假通过。
- **Files changed or produced**: 本轮只新增本审查目录，没有改正式源码。
- **Verification performed and result**: 对照 `_ai/deliveries/2026-09-22_1844_review_first_build/DELIVERY.md`、`Music_Expert_Review_Sheet.csv` 表头、`src/core/injector.js` 的现有注入方式。未运行该计划，因为计划尚未落地。
- **Important blockers / known issues**: 见下方「必须改的计划条款」。
- **Original project paths**:
  - 被审计划：`c:\Users\Asus ZenBook\.gemini\antigravity\brain\636b3194-babf-45cd-96e7-262f4a2ce3df\implementation_plan.md`
  - 上一轮审查：`_ai/deliveries/2026-09-22_1844_review_first_build/DELIVERY.md`
  - 现有 CSV 表头无 `id` 列：`Music_Expert_Review_Sheet.csv`
- **Suggested next step**: 按下面的收紧条款改引擎、词库和测试，交付到新的 `_ai/deliveries/YYYY-MM-DD_HHMM_fix_review_blockers/`。本轮不要做 `import_review.js`。

## 可以按计划做的

- 徽标只处理 `category === 'ui_core'`。歌词结构、人声、流派、编曲参数只留在抽屉。
- 自身或祖先是 `contenteditable`、`input`、`textarea`、`[role="textbox"]` 的节点不注入。
- `positionCard` 只用 `getBoundingClientRect()` 的视口坐标，去掉 `window.scrollX` / `scrollY`。
- 离开徽标或卡片后延迟关闭；指针在关闭前进入卡片则取消关闭。150ms 进入延迟保持不变。
- 卡片渲染 `tier3_example`。纯界面操作不提供复制条。
- `copyToClipboard` 失败时提示失败，不得提示「已复制」。
- 构建日志用 `fs.statSync` 的字节数。suno.com 与真机 S-Pen 继续标 `NOT_YET_VERIFIED`。
- `[Belting]` 去掉「怒音」。可复制文本去掉 `hans zimmer`、`afterlife`。

## 必须改的计划条款

### 1. 本轮不要做 CSV 反向合并

`scripts/import_review.js` 超出这一轮范围。现有 CSV 列是：序号、分类、英文原文、中文名称、三层正文、复制标签、校对状态、专家批注。没有 `id`。最后一列是自由批注，不是某一层的替换稿。

按「用 id 把最后一列合并回词库」实现，要么对不上条目，要么把批注写进正式解释。两种都会损坏 `glossary.json`。

这一轮只改 README 里那句已经不存在的「一键反向合并」：写明词库源头是 `glossary.json`，评审表是导出物，反向导入未做。专家意见先留在批注里，由人改 JSON。

### 2. 徽标不要继续插进按钮内部

计划仍只写「多监听几种事件再 stopPropagation」。现有代码把徽标 `appendChild` 到目标节点里面，拦截在冒泡阶段。父按钮仍可能收到按下。

改为：徽标和中文小标题放在控件旁边的兄弟节点，不进入按钮内部。扫描选择器收成 `button`、`[role="button"]`、`label`。不要再扫普通 `div` / `span` / `p` / `a`。`.lyrics` 这种类名是猜测，不能当作已经防住 Suno 歌词框的证据；可编辑区以 `contenteditable` 和 `role="textbox"` 为准。

### 3. 测试必须沿真实事件路径断言，不能自证

项目当前零 npm 依赖。手写假 DOM 如果不把事件从子节点冒泡到父按钮，测试会在错误实现上变绿。这和上一轮「退出码 0 就算功能通过」是同一类问题。

`scripts/test_dom_behavior.js` 至少要满足：

- 父级 `<button>` 上的 `click` 与 `pointerdown` 监听在点击徽标后计数仍为 0。
- 歌词 `contenteditable` 的 `textContent` 在扫描前后一致，内部没有 `.suno-copilot-badge`。
- 卡片 DOM 同时含有该词条的 `tier1_vernacular`、`tier2_suno_usage`、`tier3_example`。
- 剪贴板写入抛错时，Toast 文本是失败，不是「已复制」。
- 日志写明：此测试不是 suno.com，也不是三星 S-Pen。

不要新增 jsdom 依赖。假 DOM 可以，但事件必须经过父节点。

### 4. Belting 不要改成另一套行话

「强声 / 欧美机能高亢实音」对零基础用户仍然难懂，而且「机能」通常指混声，不等于 Belting。中文名用「真声高唱」或「用力高音」。听感解释改掉「怒音」「嘶吼」即可，不要顺手重写整库。

## 验收时我会看的证据

下一份交付里要有测试命令、退出码和上述四条断言的原文日志，以及 `statSync` 打出来的字节数。出现「无阻断缺陷」或「已在 suno.com 验证」而没有对应证据，仍按不通过处理。
