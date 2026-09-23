# Suno 音乐通 · 词库重构、插件内置教程与纯本地整句汉化交付文档

- **Task**: 依据真实 Pro 账户创作页核实情况，彻底拆除网络翻译与谷歌通道、重构词库及界面匹配规则、在插件抽屉内置「做第一首歌」六步向导、补全 + Audio / + Voice / + Inspo 全形态汉化。
- **Result**: 100% 达成。自动化测试套件 13 项行为断言 100% 通过，构建、评审表导出零差错完成。
- **Delivery Path**: `_ai/deliveries/2026-09-22_2355_glossary_guide_and_local_translation/`

---

## 1. 词库改动清单（改动及新增 id 汇总）

词条总数扩充至 **73 个**，全词库中文文本 **0 括号**、**0 英文夹带**、**0 [中文] 前缀**，完全基于零基础通俗听感重构。

### 1.1 核心重构与修正的 4 条旧词
| id | term (旧 ➔ 新) | 中文名称 (去括号) | 重构说明 |
| :--- | :--- | :--- | :--- |
| `custom_mode` | Custom ➔ **Advanced** | 自己写歌词和风格 | 修正模式定位：Simple 为丢一句给它写；Advanced 才能自己写词和风格；Sounds 为做一段声音。彻底解除 Custom 混淆。 |
| `instrumental` | Instrumental | 纯音乐 | 修正实操逻辑：真实创作页无独立纯音乐开关，在 Advanced 模式下将歌词框完全留空即可生成纯乐器伴奏。 |
| `model_version` | Model v3.5 / v4 ➔ **v6** | 现在常用的模型 | 修正版本定位：创作菜单现用主力为 v6、v6-wild、v6-mini，旧歌上的 V4.5+ 仅为历史标记。 |
| `get_stems` | Get Stems | 分轨提取 | 修正权限事实：Pro 具备 Auto（自动拆分）与 Split from mix（指定提取），Advanced split 归属 Premier 需升级，教程不引导。 |

### 1.2 第一批新增界面核心控制项（挂徽标，category: `ui_core`）
- `simple` (`Simple`): 丢一句给它写
- `sounds` (`Sounds`): 做一段声音
- `create_song` (`Create song`): 做歌，一次两首
- `v6_wild` (`v6-wild`): 更敢试、更怪
- `v6_mini` (`v6-mini`): 免费档，更省
- `remove_section` (`Remove Section`): 删掉指定片段
- `fade_in` (`Fade In`): 开头声音渐渐变大
- `fade_out_action` (`Fade Out`): 结尾声音渐渐变小
- `adjust_speed` (`Adjust Speed`): 调整整首歌快慢
- `remaster` (`Remaster`): 重新润色音质

### 1.3 第二批高级选项与参数词条（category: `ui_core`，第一首教程不讲）
- `vocal_gender` (`Vocal Gender`): 选男声或女声
- `style_influence` (`Style Influence`): 风格词影响程度
- `variety` (`Variety`): 结果差异程度
- `my_taste` (`My Taste`): 按我的听歌偏好
- `max_mode` (`Max Mode`): 开启深度生成
- `song_title` (`Song Title`): 歌曲标题
- `duration_custom` (`Duration Custom`): 自己定长短（严格标注为时长设置，非模式开关）
- `duration_auto` (`Duration Auto`): 系统自动决定歌曲长短
- `mashup` (`Mashup`): 两首歌揉合
- `sample_this_song` (`Sample this song`): 截取一段当新歌素材
- `use_as_inspiration` (`Use as Inspiration`): 拿这首歌的气氛当灵感
- `reverse` (`Reverse`): 声音倒放
- `add_vocal` (`Add Vocal`): 给伴奏加人声（标注 `NOT_YET_VERIFIED`）
- `persona` (`Voice`): 专属音色（标注 `NOT_YET_VERIFIED`）

---

## 2. 匹配规则清理与修正记录

1. **彻底删除 `Custom` 匹配到 `Advanced` 的别名**：`cleanTerm === 'Custom' && rawText === 'Advanced'` 完全移除。
2. **严格隔离 `Custom` 按钮文字**：页面按钮文字为 `Custom` 时，仅且只能匹配时长选项 `duration_custom`（「自己定长短」），绝不误挂 Advanced 或「自定义模式」。
3. **彻底删除 `Lyrics` 输入区匹配**：歌词编辑框作为大文本输入控件，不再被注入问号徽标。
4. **模型版本严格整词匹配**：移除 `Model v\d+` 通配正则，仅整词精确匹配 `v6`、`v6-wild`、`v6-mini`。
5. **`[Hook]` 严格方括号匹配**：底栏及非结构标签中的 `Hooks`（短视频）不再误触发歌词记忆钩子讲解。
6. **彻底解决 `+ Audio`、`+ Voice`、`+ Inspo` 汉化缺失问题**：
   - 增加 `getCleanText` 去除子标签干扰。
   - `UI_SENTENCES` 增加 `Voice`、`+ Voice`、`Inspo`、`+ Inspo`、`Audio`、`+ Audio` 双向全词映射。
   - 容错检测前缀 `+`，无论页面渲染为文本 `+ Voice` 还是 SVG 图标后接 `Voice`，均能 100% 准确注入短中文（`+ Voice` ➔ `加入一段声音`，`+ Inspo` ➔ `从歌单里找感觉`，`+ Audio` ➔ `添加音频`）。
7. **防止工具栏换行错位**：`.suno-copilot-companion` 强制声明 `white-space: nowrap !important`；且当目标元素已存在 `suno-copilot-nav-zh` 汉化标签时，伴随容器不再重复生成中文小字，仅显示 `?` 徽标，彻底消灭文字竖排 bug。

---

## 3. 谷歌翻译与网络通道彻底拆除情况

- **代码与脚本清查**：全项目 `src/core/injector.js`、`scripts/build.js`、`scripts/test_dom_behavior.js` 中 `translate.googleapis.com` 出现次数为 **0**。
- **后台服务拆除**：`background.js` 文件已从 `dist/chrome-extension/` 中安全删除；`manifest.json` 中已完全移除 `host_permissions` 与 `background.service_worker` 声明。
- **本地词典兜底逻辑**：彻底移除 `fetchDynamicTranslation` 及其网络请求兜底。所有灰字描述全部走 `VIBE_DICTIONARY` 本地词库。遇到无法翻译的词句，原英文完整保留在英文行，中文行坚决不拼接英文字母碎片，确保中文行 100% 为纯正人话。

---

## 4. 抽屉内置「做第一首歌」六步向导核实

向导数据持久化于 `src/data/guide.json`，在点击右下角浮球打开抽屉后展示在最上方独立卡片中：
- 步骤切换正常（支持第 1~6 步前进步进与返回上一步）。
- 「想知道为什么，可跳过」默认折叠，点击展开对应白话原理解释。
- 复制按钮严格受控：第 1、2、5、6 步**无任何复制按钮**；第 3 步包含且仅包含 1 个「复制歌词骨架模板」按钮；第 4 步包含且仅包含 1 个「复制推荐风格短英文」按钮。

### 抽屉第 1 步与第 2 步完整文字引用

#### 【第 1 步】
- **标题**：`第 1 步 · 先用一句中文写下想要的感觉`
- **实操指引**：
  > 先别打开那些英文。用一句平时说话的方式写下来，例如：  
  > 夜里一个人说话，很安静  
  > 想让人跟着唱，副歌大声一点  
  > 有点难过，但是很温柔  
  >   
  > 这句话留在你自己的备忘录里。后面每一步都用它来判断：做出来的歌像不像这句话。
- **想知道为什么，可跳过**：
  > 一首歌先有气氛，再有句子。你这句中文就是整首歌的目标。后面的英文标签都是为了靠近它，不是为了把术语填满。
- **复制按钮**：无

#### 【第 2 步】
- **标题**：`第 2 步 · 打开创作，点 Advanced，模型留在 v6`
- **实操指引**：
  > 在 Suno 页面左侧点 Create 创作，在上方三个模式里点 Advanced。  
  > Simple 是只丢一句给它自己写，Sounds 是做一段声音，不是一整首歌。  
  > 模型留在 v6，这是现在常用的模型。  
  > 如果想做纯音乐，留在 Advanced，歌词框一个字都不填。
- **想知道为什么，可跳过**：
  > 选 Advanced 才能看到歌词框和风格描述框。没有这两格，AI 只能全凭瞎猜。纯音乐不需要找单独开关，只要歌词框什么都不写，做出来就没有人唱。
- **复制按钮**：无

---

## 5. 本轮未在代码/真实点击中闭环核实的项

以下项已在词库正文或批注中如实标记，避免虚假承诺：
- `add_vocal`: 标注 **NOT_YET_VERIFIED**。虽然官方套餐对比表将 Add vocals 列在 Pro 中，但尚未通过真实音频点至最终生成闭环。
- `persona` (`Voice`): 标注 **NOT_YET_VERIFIED**。Remix 菜单中有 Voice 选项，但历史词条中的“Create Persona”在当前 Edit 菜单未直接出现。
- 历史剩余点数 2400 与 27 次下载之差额原因标注 **UNKNOWN**，词库与教程已严格剔除任何硬编码额度数字。

---

## 6. 自动化测试与验证证据

执行 `node scripts/test_dom_behavior.js`，全部 13 项自动化断言 100% 通过：
1. `断言 1`: 歌词 contenteditable 扫描前后 textContent 严格一致，内部 0 徽标注入。
2. `断言 2`: 按钮事件彻底隔离，点击徽标后父级 button 的 click 与 pointerdown 计数严格为 0。
3. `断言 3`: 卡片 DOM 完整包含三层通俗正文。
4. `断言 4`: 剪贴板异常时 Toast 准确提示失败，杜绝虚假“已复制”。
5. `断言 5`: position: fixed 采用视口纯坐标，不掺杂 window.scrollX / scrollY。
6. `断言 6`: 导航与操作短中文严格匹配规划表，+ Audio/+ Voice/+ Inspo 及纯单词形态均完美覆盖。
7. `断言 7`: Custom 正确映射时长“自己定长短”，彻底消灭“自定义模式”。
8. `断言 8`: `soft intimate vocal, acoustic guitar, slow` 翻译为纯中文 `温柔贴耳人声 · 原声木吉他 · 慢速`，零英文字母残留。
9. `断言 9`: 无法翻译的未知英文描述绝对不产生中英夹生饭，中文行保持空字符串。
10. `断言 10`: 歌词占位符严格呈现双行优雅对照，绝无英文中间插中文现象。
11. `断言 11`: 创作区与歌词编辑区严格受保，杜绝误注入。
12. `断言 12`: 谷歌翻译通道、网络请求、host_permissions 与 background.js 100% 拆除。
13. `断言 13`: 抽屉内 6 步向导独立置顶展示，复制按钮严格限定在第 3 与第 4 步。

---

## 7. 交付文件清单与原始工程路径对照

| 交付文件相对路径 | 原始工程源码路径 | 说明 |
| :--- | :--- | :--- |
| `dist/chrome-extension/` | `dist/chrome-extension/` | 纯本地解压扩展包（含 manifest、content.js、styles.css 及 16/48/128 图标，无 background.js） |
| `dist/suno-copilot.user.js` | `dist/suno-copilot.user.js` | 单文件零依赖油猴脚本（已打包 73 词条及向导数据） |
| `src/data/glossary.json` | `src/data/glossary.json` | 73 条无括号白话词库源文件 |
| `src/data/guide.json` | `src/data/guide.json` | 6 步「做第一首歌」向导配置数据 |
| `src/core/injector.js` | `src/core/injector.js` | 核心注入引擎（拆除网络、强化纯本地翻译、抽屉内置向导） |
| `src/ui/styles.css` | `src/ui/styles.css` | 现代毛玻璃样式表（含向导卡片、防文字竖排规则） |
| `scripts/build.js` | `scripts/build.js` | 扩展与脚本打包构建工具 |
| `scripts/test_dom_behavior.js` | `scripts/test_dom_behavior.js` | 13 项自动化行为与安全性测试套件 |
| `scripts/export_review.js` | `scripts/export_review.js` | 评审表自动导出工具 |
| `Music_Expert_Review_Sheet.md` | `Music_Expert_Review_Sheet.md` | 73 词条专家审校 Markdown 文档 |
| `Music_Expert_Review_Sheet.csv` | `Music_Expert_Review_Sheet.csv` | 带 UTF-8 BOM 的 Excel/WPS 审校表格 |
