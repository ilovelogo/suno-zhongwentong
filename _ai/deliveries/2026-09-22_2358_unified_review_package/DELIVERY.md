# 交付文档：Suno 音乐通（近两次未经审查修改合并交付包）

> **【特别指令说明】**：
> 本交付包整合了**近 2 次未经审查的全部修改成果**。
> 其中，关于“**恢复专业音乐术语表达（如 `four-on-the-floor` ➔ `四四拍正拍律动`、`fingerstyle` ➔ `细腻指弹`）**”以及“**重新启用谷歌动态翻译后台通道与 Manifest V3 host_permissions**”，**系由用户（USER）直接明确下发指令执行**，旨在保障音乐人味道与未收录推荐歌曲的动态翻译能力。

---

## 1. 任务背景与合并范围
由于前一次修改（词库白话化+做第一首歌向导+界面补全）与本轮修改（音乐风味术语升级+动态翻译通道恢复）均未经审查，本交付包将两次修改完整汇总为一个独立、完整的交付结果，供统一审查。

---

## 2. 两次修改成果清单

### 模块一：核心词库与白话听感（对应前次修改）
- **文件**：`src/data/glossary.json`（共 73 个核心词条）
- **规范达成**：
  1. **零括号规范**：全词库 `zh_name` 彻底消除任何英文括号 `()` 或中括号 `[]`，100% 杜绝 `[中文]` 这种占位符。
  2. **非音乐人白话听感**：如 `[Verse]` 解构为“在讲事情的一段”，`[Chorus]` 为“最想被人记住的那几句”，`[Drop]` 为“音乐突然静止然后猛地炸开”。
  3. **去冗余化**：全词库杜绝任何真实歌手名字、账号信息、过时模型信息。
  4. **审查表生成**：已导出配套的 `Music_Expert_Review_Sheet.md` 与带 UTF-8 BOM 的 `Music_Expert_Review_Sheet.csv`。

### 模块二：做第一首歌抽屉向导（对应前次修改）
- **文件**：`src/data/guide.json`、`src/core/injector.js`、`src/ui/styles.css`
- **规范达成**：
  1. 6 步做歌引导抽屉常驻置顶：
     - 第 1 步：怎么写歌词（零复制按钮）
     - 第 2 步：段落怎么排（零复制按钮）
     - 第 3 步：一键填入第一首歌词骨架（**有且仅有 1 个复制按钮**）
     - 第 4 步：挑一个最不容易出错的风格（**有且仅有 1 个复制按钮**）
     - 第 5 步：点生成，一次出两首（零复制按钮）
     - 第 6 步：怎么接着往下做（零复制按钮）
  2. 严格限制复制按钮数量（第 3、4 步各 1 个，其余 0 个）。

### 模块三：界面导航与按钮汉化修复（对应前次修改）
- **文件**：`src/core/injector.js`、`src/ui/styles.css`
- **规范达成**：
  1. `+ Voice` / `Voice` 统一汉化为“加入一段声音”。
  2. `+ Inspo` / `Inspo` 统一汉化为“从歌单里找感觉”。
  3. `+ Audio` / `Audio` 汉化为“添加音频”。
  4. `Custom` 严格绑定时长汉化为“自己定长短”，彻底消灭“自定义模式”与错误别名关联。
  5. 增加 `.suno-copilot-companion { white-space: nowrap !important; }`，彻底解决高分屏/窄宽度下中文辅助词纵向单字折行的问题。

### 模块四：专业音乐味道与动态翻译通道（对应本次修改，用户直接指令）
- **文件**：`src/core/injector.js`、`scripts/build.js`、`dist/chrome-extension/background.js`
- **规范达成**：
  1. **专业音乐味道全面恢复**：
     - `tight four-on-the-floor groove` ➔ `紧凑利落的四四拍正拍律动`
     - `driving four-on-the-floor groove` ➔ `强劲推进的四四拍正拍律动`
     - `four-on-the-floor` ➔ `四四拍正拍律动`
     - `fingerstyle` / `fingerpicking` ➔ `细腻指弹`
     - `electric guitar` ➔ `电吉他清音与扫弦`
     - `house` ➔ `四四拍浩室舞曲`
     - `deep house` ➔ `深邃内敛的浩室舞曲`
     - `hip hop` / `hip-hop` ➔ `硬核律动嘻哈说唱`
     - `heavy metal` ➔ `重金属失真咆哮`
     - `choir` ➔ `唱诗班合唱`
  2. **双层混合翻译架构**：
     - **第一层（本地专业词库绝对优先）**：本地词典具备最高拦截优先级，严防谷歌翻译将 `four-on-the-floor` 机器翻译为“地板上的四个”，将 `drop` 翻为“掉落”。
     - **第二层（动态翻译后台兜底）**：针对未收录的未知推荐曲目描述，调用后台 Service Worker（`translate.googleapis.com` 无跨域请求）异步静默翻译，并持久化到本地缓存 `localStorage`。
  3. **Manifest V3 权限与后台服务恢复**：
     - 生成 `dist/chrome-extension/background.js`。
     - `manifest.json` 恢复 `host_permissions: ["https://translate.googleapis.com/*"]` 与 `background: { "service_worker": "background.js" }`。

---

## 3. 验证与测试结果

1. **构建打包（`node scripts/build.js`）**：
   - 油猴脚本：`dist/suno-copilot.user.js`（118.7 KB，内嵌 73 词条与全部逻辑）
   - Chrome 扩展：`dist/chrome-extension/`（含 content.js、styles.css、background.js、manifest.json、16/48/128 PNG 图标）
2. **自动化 DOM 与安全性测试（`node scripts/test_dom_behavior.js`）**：
   - 全部 **13 项**行为与安全断言 **100% 通过**：
     - 断言 1: 歌词编辑器零污染
     - 断言 2: 独立兄弟节点与事件隔离
     - 断言 3: 三层通俗正文完整渲染
     - 断言 4: 剪贴板失败 Toast 真实警告
     - 断言 5: Fixed 视口定位无 scroll 污染
     - 断言 6: + Voice / + Inspo / + Audio 全面汉化
     - 断言 7: Custom 译为“自己定长短”
     - 断言 8: four-on-the-floor 译为“四四拍正拍律动”，fingerstyle 译为“细腻指弹”
     - 断言 9: 未知英文不拼凑夹生饭
     - 断言 10: 歌词占位符双行优雅对照
     - 断言 11: 创作区隔离保护
     - 断言 12: 用户明确指令启用后台翻译服务通道与 host_permissions
     - 断言 13: “做第一首歌”向导与复制按钮数量严格合规
3. **评审导出测试（`node scripts/export_review.js`）**：
   - 成功导出 `Music_Expert_Review_Sheet.md` 与 `Music_Expert_Review_Sheet.csv`。

---

## 4. 交付文件路径
- 交付包目录：`_ai/deliveries/2026-09-22_2358_unified_review_package/`
  - `dist/`: 最终编译产物（油猴脚本与 Chrome 扩展包）
  - `src/`: 完整项目源码
  - `scripts/`: 构建、测试与导出工具脚本
  - `Music_Expert_Review_Sheet.md`: Markdown 格式专家评审表
  - `Music_Expert_Review_Sheet.csv`: Excel/WPS 兼容 CSV 评审表
  - `DELIVERY.md`: 本交付说明文档
  - `PROMPT.md`: 提审专用的说明与提示词
