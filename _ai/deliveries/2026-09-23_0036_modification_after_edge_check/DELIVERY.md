# 交付文档：Suno 音乐通（Edge 浏览器实机检查后的专项修改与全量交付 · v1.3.0）

> **【任务背景与实机检查定位】**：
> 本交付针对用户在 **Microsoft Edge 桌面浏览器实机检查（`https://suno.com/create`）** 中发现的具体 UI 问题与机翻边界隐患，进行了深度技术重构与专项修复，并将全量成果打包交付。
> 
> **用户核心指令与关键洞察归档**：
> 1. **严禁破坏原网页结构**：“里边的那个inspo哪去了？绝对不允许随便把网页上的内容删掉”。
> 2. **“上英下中”垂直双行紧凑布局**：“再出现这种情况就可以换行嘛，就是上面一行英文，下面一行中文。可以的，这么改吧，并且明确记录是我的要求”。
> 3. **机翻覆盖专业术语的致命盲区防范**：“同一段里如果术语后面还连着不认识的词，锁定就不成立。tight four-on-the-floor groove and surprise kazoo 现在的立刻结果是空的，整段原文仍会送给谷歌，仍可能被译成「地板上的四个」。谷歌返回中文之后，后置替换已经找不到原来的英文，补不回来。是这样么？”
> 4. **版本号升级**：“更新插件想着更新版本号” ➔ 全链路升级为 **`v1.3.0`**。

---

## 1. Edge 实机检查问题排查与修复详情

### 1.1 `+ Inspo` 按钮消失根因与彻底修复
- **实机问题现象**：在 Edge 打开 `https://suno.com/create` 时，第二行操作栏只显示 `+ Audio 添加音频`、`+ Voice 加入一段声音`，第三个位置只剩下一个孤立的 `?`，原本的 `+ Inspo` 按钮不见踪影。
- **真实根因**：Suno 原生采用了 3 列网格布局（`grid-cols-3` 且父级带 `overflow: hidden`）。先前的逻辑在检测到 `Voice` 时误触发了兄弟问号徽标注入。徽标强行插在 `+ Voice` 之后，作为第 3 个子元素占领了第 3 列，直接把第 4 个子元素 `+ Inspo` 挤到第 2 行隐藏掉。
- **修复方案**：
  - 代码增加排他保护：`+ Audio`、`+ Voice`、`+ Inspo`、`+ Image` 等动作栏按钮**严禁注入任何外部兄弟徽标**。
  - 网格容器内子节点数量严格维持为 3，**绝不改变任何 DOM 网格结构**。

### 1.2 “上英下中”双行紧凑排版策略（用户明确要求）
- **实现机制**：
  - CSS 新增 `.suno-copilot-stacked-btn` 与 `.suno-copilot-nav-zh.stacked`。
  - 按钮内部设置 `flex-direction: column; justify-content: center; align-items: center; line-height: 1.15;`。
  - 上行显示原生英文（如 `+ Audio` / `+ Voice` / `+ Inspo`）；
  - 下行显示紧凑中文小字（`添加音频` / `加入一段声音` / `从歌单里找感觉`）；
  - **完全在按钮内部自闭环换行**，既保证了双语对照的清晰性，又彻底根除了横向撑爆容器、把同排按钮挤出视口的问题。

### 1.3 连词拆解与 Token Masking（攻克机翻冲垮四四拍）
- **核心漏洞防御**：针对用户提出的“同一段里术语后面连着未知生词时会被机翻洗劫”的致命漏洞：
  1. **连词智能拆解（Conjunction Splitting）**：分段器识别 `,`、`;` 以及 ` and `、` with `、` feat. ` 等介连词。`tight four-on-the-floor groove and surprise kazoo` 自动拆解为已知部分与未知生词两段，**四四拍正拍律动立刻同步输出，绝不留白！**
  2. **Token Masking 占位符遮罩**：若无法拆分，算法在投递给谷歌前，将已知专业词戴上代号面具（如 `SCTERM0X and surprise kazoo`）。谷歌机翻结果为 `SCTERM0X 和 惊喜的卡祖笛`。返回后插件精准反解还原为 `紧凑利落的四四拍正拍律动 和 惊喜的卡祖笛`，谷歌机翻全程无法接触英文术语，彻底免疫“地板上的四个”。
  3. **逆向硬伤纠偏（MISTRANSLATION_FIXES）**：内置后置纠偏词典作为第三重兜底。

### 1.4 全链路升级版本号至 `v1.3.0`
- 同步更新：
  - `package.json`：`"version": "1.3.0"`
  - `dist/chrome-extension/manifest.json`：`"version": "1.3.0"`
  - `dist/suno-copilot.user.js`：`// @version 1.3.0`
  - `scripts/build.js`：构建目标更新为 `1.3.0`

---

## 2. 自动化验证测试结果

### 2.1 编译打包（`node scripts/build.js`）
- **油猴脚本**：`dist/suno-copilot.user.js`（124.4 KB，内嵌 73 核心词条与全套逻辑）
- **Chrome 扩展**：`dist/chrome-extension/`（Manifest V3 架构，包含 background.js、content.js、styles.css、manifest.json 及 16/48/128 PNG 图标）

### 2.2 行为与安全测试套件（`node scripts/test_dom_behavior.js`）
**全部 14 项测试断言 100% 通过**：
- `断言 6.1`：3 按钮网格结构完整保留，且已启用“上英下中”双行紧凑排版策略（用户要求）。
- `断言 8`：针对 `tight four-on-the-floor groove and surprise kazoo` 专项回归测试，验证即时结果不为空且四四拍正拍律动永不被机翻冲垮。
- 其余 12 项关于输入框隔离、事件穿透隔离、无 scroll 污染、向导步进等断言均持续 100% 保持通过。

---

## 3. 交付目录与文件清单

- **交付根目录**：`_ai/deliveries/2026-09-23_0036_modification_after_edge_check/`
  - `DELIVERY.md`：本交付文档
  - `PROMPT.md`：提审交接提示词与自检清单
  - `REVIEW_LITE.zip`：已重新打包的审查与体验压缩包
  - `package.json`：项目配置（v1.3.0）
  - `Music_Expert_Review_Sheet.md`：Markdown 格式音乐专家评审表
  - `Music_Expert_Review_Sheet.csv`：带 UTF-8 BOM 的 Excel/WPS 兼容评审表
  - `dist/`：最终编译产物（单文件油猴脚本 + Chrome 解压扩展包）
  - `src/`：完整工程源码
  - `scripts/`：构建、测试与导出工具脚本
