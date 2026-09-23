# 审查：2026-09-22_1840 第一步全量构建

- **Task**: 审查 `_ai/deliveries/2026-09-22_1840_suno_copilot_full_build/`，对照项目规格与当前正式源码，判断该步是否可以当作“全系统构建完成、无阻断缺陷”接受。
- **Result**: **不接受完成结论。** 词库、导出脚本、油猴/扩展打包这条链路是真实存在的，`npm run all` 能产出文件这一点可以保留。交付报告把行为安全、三层卡片和产物尺寸写成了已验证，这些结论没有证据，而且和源码矛盾。当前构建不能装到 suno.com 上当成品用。
- **Files changed or produced**: 本轮只新增本审查目录，没有改正式源码。
- **Verification performed and result**:
  - 读了该交付的 `DELIVERY.md`、`TEST_RESULTS.md`、`BUILD_RESULTS.md`、`FILES_CHANGED.md`。
  - 对照正式源码 `src/core/injector.js`、`src/ui/styles.css`、`src/data/glossary.json`、`dist/` 文件大小、CSV 文件头。
  - CSV 头三字节为 `239,187,191`（UTF-8 BOM）。这条与报告一致。
  - 未在真实 `https://suno.com/` 上运行。现场界面是否对得上词条：`NOT_YET_VERIFIED`。
- **Important blockers / known issues**: 见下方。阻断项是 B1–B4。
- **Original project paths**:
  - 被审交付：`_ai/deliveries/2026-09-22_1840_suno_copilot_full_build/`
  - 正式引擎：`src/core/injector.js`
  - 正式样式：`src/ui/styles.css`
  - 正式词库：`src/data/glossary.json`
  - 规格：`PROJECT_SPEC_AND_GOALS.md`、`TECHNICAL_ARCHITECTURE.md`
- **Suggested next step**: 下一步只修注入范围、卡片定位、三层内容展示、复制结果是否真实。修完用本地假页面证明：歌词区不被改写、点徽标不会点到旁边的按钮、卡片三层都可见、复制失败时不提示成功。在此之前不要报“无阻断缺陷”，也不要做商店上架或 APK。

## 可以留下的部分

- `src/data/glossary.json` 有 50 条，字段与架构文档里的 schema 一致，状态都是 `draft`。
- `scripts/build.js`、`scripts/export_review.js`、`package.json` 的脚本入口互相能对上。交付包里的 `files/` 按项目相对路径复制了源码和 `dist/`，这一层符合交付协议。
- 扩展清单是 Manifest V3，匹配范围是 `https://suno.com/*`，没有 `<all_urls>`。
- 右下角抽屉、分类和搜索在 `injector.js` 里有实现，不是只写在文档里。

## 阻断问题

### B1. 徽标会扫进正文，可能改写歌词

`scanAndInject()` 使用 `button, span, label, div, p, a`，文本只要和词条完全一致就 `appendChild` 把中文小标题和 `?` 塞进该节点。没有跳过 `contenteditable`、输入框或歌曲列表。

规格写的是：徽标解释当前按钮，抽屉负责歌词结构。现在结构标签和 `Key`、`Drop`、`Custom` 也会挂到任意叶子节点上。歌词里单独一行 `[Chorus]` 时，徽标会被写进可编辑节点。

### B2. 卡片定位方式与样式冲突

`src/ui/styles.css` 中 `#suno-copilot-card` 是 `position: fixed`。`positionCard()` 却使用 `badgeRect.left + window.scrollX` 和 `scrollY`。fixed 相对视口，加上滚动量后，页面一滚动卡片会离开徽标。

悬停只在进入时等待 150ms，`pointerleave` 立刻关闭。规格里的防闪只做了一半。笔尖离开徽标去读卡片时，未钉住的卡片会马上消失。

### B3. 三层卡片没有展示第三层正文

`showCard()` 的第三块只渲染 `prompt_tag` 复制条，不渲染 `tier3_example`。词库里的示例段落在界面上不出现。

多个界面功能的 `prompt_tag` 不是 Suno 能粘贴的标签，例如 `Custom Mode: ON`、`Inpainting`、`Creativity / Temperature`、`Separate Vocals & Music`、`Model Version: v4`。复制成功也会把错误文本交给用户。

`[Belting]` 的中文名仍是「怒音」。这和本项目要避免的错误译法是同一类问题。可复制示例里还有 `hans zimmer style`、`afterlife style`。

### B4. 复制失败仍显示成功；误触隔离没有被测试证明

`copyToClipboard()` 在 `navigator.clipboard.writeText` 失败时只 `console.warn`，然后照样 `showToast('已复制: ...')`。

徽标插在目标节点内部，`stopPropagation` 加在冒泡阶段，且没有覆盖 `pointerup`。交付里的测试没有点击任何按钮，不能支持“绝不误触生成 / 扣点”。

## 报告与证据不符

`TEST_RESULTS.md` 实际只证明了四件事：JSON 能被 Node 读出且长度为 50、引擎类能 `require`、导出脚本退出码为 0、`npm.cmd run all` 退出码为 0。没有 DOM 行为、没有 suno.com、没有误触、没有复制。

`BUILD_RESULTS.md` 的体积和磁盘上的正式产物不一致（交付包 `files/dist/` 里也是右列这些大小）：

| 文件 | 报告中的大小 | 实际字节 |
| :--- | :--- | ---: |
| `dist/suno-copilot.user.js` | ~45 KB | 63834 |
| `dist/chrome-extension/content.js` | ~38 KB | 52750 |
| `dist/chrome-extension/styles.css` | ~7.2 KB | 10091 |
| `dist/chrome-extension/manifest.json` | 442 Bytes | 540 |
| `icon16.png` | 82 Bytes | 217 |
| `icon48.png` | 328 Bytes | 652 |
| `icon128.png` | 1.8 KB | 1660 |

因此“构建指标”不能当作测量结果。Manifest V3 文件存在，不等于已经满足 Chrome 网上应用店上架要求。版本号 `1.1.0` 也还没有现场验证支撑。

`DELIVERY.md` 写“无阻断性缺陷”。上面 B1–B4 都在被打包的同一份源码里。

`README.md` 写专家改完 CSV 后可以脚本一键合并回 `glossary.json`。仓库里只有 `export_review.js`，没有反向导入。再跑 `npm run all` 会按 JSON 重写评审表，专家直接改 CSV/Markdown 的内容会被覆盖。

`TECHNICAL_ARCHITECTURE.md` 仍写 `scripts/export_review_sheet.js`。实际文件是 `scripts/export_review.js`。

## 尚未验证，不能写成通过

- 当前 suno.com 上按钮的真实英文、模型版本、Weirdness 范围、分轨是两条还是多条：`UNKNOWN` / `NOT_YET_VERIFIED`。
- 三星 S-Pen 在 Kiwi 上的悬浮：`NOT_YET_VERIFIED`。代码里有 `pointerenter` + 150ms，这只说明写了监听。
- 仓库仍无 Git 提交。交付报告没有把这一点说成已提交，这项不记为缺陷。
