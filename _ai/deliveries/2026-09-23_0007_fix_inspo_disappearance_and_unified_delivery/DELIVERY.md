# 交付文档：Suno 音乐通（修复 + Inspo 被挤出问题与近两次修改全量合并交付）

> **【特别指令与问题排查说明】**：
> 1. **关于 + Inspo 消失原因排查**：
>    - **结论：代码中绝未删除任何网页节点**（全项目没有任何对原有按钮的 `removeChild` 或 `remove()`）。
>    - **真实原因（CSS 网格溢出挤压）**：Suno 顶部的 `+ Audio`、`+ Voice`、`+ Inspo` 原生采用了**严格的三列网格布局（`grid-cols-3`）且容器设置了高度裁剪（`overflow: hidden`）**。先前版本中，由于 `Voice` 错误匹配到了词库中的“专属音色 (Persona)”，在 `+ Voice` 后面插入了一个兄弟节点徽标（`?` 徽标）。
>    - **致命挤压**：在 3 列网格中插入一个兄弟节点后，`?` 徽标强占了第 3 列的位置，导致原本第 3 个按钮 `+ Inspo` 被推挤到了第 2 行（第 4 个格位），从而被父级容器隐藏截断，造成“+ Inspo 凭空消失，只留下一个问号”的视觉假象。
>    - **彻底修复**：针对 `+ Audio`、`+ Voice`、`+ Inspo` 这组快捷输入源动作栏，**严禁注入任何外部兄弟徽标**，仅在其内部进行无破坏性的行内中文标注（`添加音频`、`加入一段声音`、`从歌单里找感觉`）。三列结构 100% 恢复，`+ Inspo` 稳固留驻。
> 2. **用户明确指令落实**：
>    - 恢复“四四拍正拍律动”、“细腻指弹”等专业音乐术语表达。
>    - 重新启用 Manifest V3 `background.js` 后台服务与动态翻译通道。

---

## 1. 交付成果合并全景

### 模块一：+ Inspo 与顶部操作栏保护（本轮排查与修复）
- **文件**：`src/core/injector.js`
- **规则**：
  - `scanProducerBadges()` 增加对 `+ Audio` / `+ Voice` / `+ Inspo` / `+ Image` 等加号动作栏的排他保护。
  - 杜绝在网格容器内注入任何多余兄弟节点，确保 3 个按钮各自安坐原位。
  - 自动化回归断言：新增 `断言 6.1`，严格校验 3 按钮工具栏子节点数量始终为 3，`+ Inspo` 必须存在且不可被推挤。

### 模块二：核心词库与做歌向导（第一次修改汇总）
- **文件**：`src/data/glossary.json`（73 核心词条，0 括号，0 歌手名，通俗听感）
- **文件**：`src/data/guide.json`（抽屉置顶 6 步做歌指引，仅第 3、4 步各 1 个复制按钮）
- **文件**：`Music_Expert_Review_Sheet.md` 与 `Music_Expert_Review_Sheet.csv`（带 UTF-8 BOM 专家评审表）

### 模块三：音乐味道与动态翻译通道（第二次修改汇总，用户直接指令）
- **文件**：`src/core/injector.js`、`scripts/build.js`、`dist/chrome-extension/background.js`
- **规范**：
  - `four-on-the-floor` ➔ `四四拍正拍律动`
  - `fingerstyle` ➔ `细腻指弹`
  - `electric guitar` ➔ `电吉他清音与扫弦`
  - 本地词典绝对优先拦截，未收录新歌通过后台 `translate.googleapis.com` 动态兜底并持久化缓存。

---

## 2. 自动化验证测试
- **构建测试（`node scripts/build.js`）**：
  - 油猴脚本：`dist/suno-copilot.user.js`（119.6 KB）
  - Chrome 扩展：`dist/chrome-extension/`（含 content.js、background.js、styles.css、manifest.json、图标）
- **DOM 行为与安全性测试（`node scripts/test_dom_behavior.js`）**：
  - **全部 14 项行为与安全断言 100% 通过**（包括新增的 `断言 6.1：三列工具栏网格结构完整性保护`）。

---

## 3. 交付目录路径
- 交付目录：`_ai/deliveries/2026-09-23_0007_fix_inspo_disappearance_and_unified_delivery/`
