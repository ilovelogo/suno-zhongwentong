# 下一步计划：按 Pro 真实界面改词库，并重写「做第一首歌」

- **Task**: 订阅页和创作页已经点开。这一份只定下一步怎么改词库、怎么做教程。本轮不改 `glossary.json`，不改教程代码。
- **Result**: 计划可执行。事实来自 2026-09-22 已登录的 Pro 年付账号（创作页实点 + `https://suno.com/account?source=profileMenu`）。
- **Delivery Path**: `_ai/deliveries/2026-09-22_2025_glossary_tutorial_plan/`

旧地图不要覆盖：`2026-09-22_1947_suno_ui_map`、`2026-09-22_2004_suno_ui_walkthrough`。教程旧稿 `2026-09-22_1924_tutorial_form_and_draft` 的第 2 步作废，形式仍然有效。

---

## 1. 这个 Pro 账号实际能用什么

账号页标题是 **Current Plan / Pro Plan**。Billing Period **Annual**。Next Billing Date **Aug 5, 2027**。当时 **Credits Remaining 2400**，**Downloads Remaining 27**。按钮：Manage、Buy credits、Buy downloads、Auto-reload。本轮没有点购买、没有点 Upgrade。

官方对比表（Compare Suno plans，三列 Free / Pro / Premier）里，Pro 列是勾、Free 列是叉的项目：

| 英文 | Pro |
| :--- | :--- |
| Available models | Advanced models (v6 and v6-wild) |
| Commercial rights | 有 |
| Concurrent generations | 10 in a Priority queue |
| Add-on credits | Available to purchase |
| Upload Audio | Up to 30 minutes |
| Voices | 有 |
| Add vocals | 有 |
| Add instrumental | 有 |
| Inspire | 有 |
| Magic Song Descriptions | 有 |
| Custom Models | 有 |
| Basic editing (crop, fade) | 有 |
| Advanced editing (replace or add section) | 有 |
| Extract Stems | 有 |
| Early access to new features | 有 |

三列都勾：Remix songs (extend, cover, adjust speed)、Co-write with Suno。

只有 Premier 勾、Pro 是叉：**Suno Studio**。

Free 的模型文案是 **Best free model (v6-mini)**。Free 上传是 **Up to 8 minutes**。Free 并发是 **4 in a Shared queue**。

FAQ 原文：

- Standard and Pro features：Standard 是基础模型、remix、co-writing、短音频上传。Pro 打开 advanced models、commercial rights、priority queues、deeper editing、new generation modes、vocal personas、stem downloads。
- Model versions：v6 和 v6-wild 是 Pro / Premier 的顶级模型。v6-mini 是给免费用户的更快模型。
- Commercial use：Pro 或 Premier 可以商用，仍要遵守分享平台的规则，并尊重第三方服务条款。
- 月度点数用完：可以另买点数；在账单周期续费前，每天自动给 **50 bonus credits**。
- 升降级：升级立刻生效，降级到当前账单周期结束才生效。

Pro 卡片上的额度：2,500 credits / month，20 song downloads / month，2 种分轨（Auto；Split from mix），Priority queue、最多同时 10 首，可以用自己的声音录和传，可以 Create custom models。年付标价 $8/month。

Premier 才有、本教程不教：Studio（MIDI、effects、automation、design-your-own-plugins）、第 3 种分轨 Advanced split、10,000 credits、60 downloads。Premier 卡片还单列了 “Add new vocals or instrumentals to existing songs” 和 “Upload up to 30 min”。对比表里 Add vocals、Add instrumental、Upload Audio 30 分钟已经标在 Pro 列。两处文案不一致，教程以对比表为准：这三项按 Pro 可用来写。真正点进 Add Vocal 并生成，本轮没做，标 **NOT_YET_VERIFIED**。

点数 2400 对 2500、下载剩余 27 对 “每月 20 次”，差额原因 **UNKNOWN**。不要在词库里写死“你还剩多少”。

---

## 2. 先改词库，再谈教程

`glossary.json` 仍是唯一词库来源。中文保持长、具体、给完全没学过音乐的人。可复制内容仍是短英文或方括号标签。界面动作的 `prompt_tag` 留空。不写歌手名。Belting 继续用「真声高唱」。

### 2.1 四条旧词会教错，先改文案，再改匹配

| id | 现在的 term | 下一步 |
| :--- | :--- | :--- |
| `custom_mode` | Custom | term 改为 `Advanced`。中文改成：创作页三个模式里，选 Advanced 才能自己写歌词、写风格。Simple 是只丢一句给它写。Sounds 是做一段音效，不是一整首歌。 |
| `instrumental` | Instrumental | 创作页没有这个开关。改成：想要纯音乐，就用 Advanced，歌词框留空。不要再写「打开 Instrumental，歌词框会消失」。 |
| `model_version` | Model v3.5 / v4 | 创作菜单里是 v6、v6-wild、v6-mini。v6 写成日常用的那一档。v6-wild 写成更实验。v6-mini 写成免费档、更省。个人页旧歌上的 V4.5+ 只是历史标记，创作菜单里没有 v4 按钮。 |
| `get_stems` | Get Stems | Pro 有两种：Auto（从 12 类乐器里自动拆）、Split from mix（自己选一种乐器拆出来）。Advanced split 是 Premier，词条里写明点开会遇到升级，第一首教程不走那里。 |

`2026-09-22_2008_ui_advanced_compatibility` 已经在 `injector.js` 里把按钮文字 `Advanced` 配到 term `Custom`，又用 `/^(?:Model\s*)?v\d+/` 去配 v6。词库正文还是「打开 Custom」「请用 v4」。用户若按那份报告重新加载扩展，问号会把过时中文挂到 Advanced 和 v6 上。

下一步同时做两件事：

1. 改完上表四条的 `term` 和三段中文。
2. 删掉 `cleanTerm === 'Custom' && rawText === Advanced` 这条别名。`Custom` 这个词还会出现在时长 **Duration → Custom** 上，精确匹配 `^Custom$` 会把「制作人开关」挂到时长上。模型匹配改成只认 `v6`、`v6-wild`、`v6-mini` 这三个整词，不要用「任意 v 加数字」。

`Lyrics` 那条匹配目前没有对应词条，先不要靠它解释歌词框。歌词框是输入区，本来就不挂问号。

### 2.2 第一批要新增的界面词（会挂问号）

只加创作第一首歌时真的点得到、而且是 `button` / `[role="button"]` / `label` 的英文：

- `Simple`：一句话交给它写歌。
- `Sounds`：描述一段声音。旁边还有 One-Shot、Loop、调性（C 到 B，Major / Minor）。教程正文先不展开调性。
- `Create song`：点一次出两首。空表单时按钮是灰的。
- `v6-wild`、`v6-mini`：若 `model_version` 只保留 v6 的解释，这两条单独成词，避免一句里塞三个引擎。
- 歌曲 `…` → Edit 里第一批就够用的：`Extend`、`Crop`、`Replace Section` 已有，补 `Remove Section`、`Fade In`、`Fade Out`、`Adjust Speed`、`Remaster`。
- `Get Stems` 沿用旧 id，只改正文。

Remix 里已有 Cover、Reuse Prompt。`Voice` 用现有 `persona` 改 term：菜单上看到的英文是 Remix → Voice。FAQ 把 vocal personas 算进 Pro。按钮文字 “Create Persona” 在这次 Edit 菜单里没出现，标 **NOT_YET_VERIFIED**，不要继续拿它当匹配词。

### 2.3 第二批界面词（词库要有，第一首教程不讲）

Advanced 的 More Options，用户打开高级模式就会看见，适合问号，不适合塞进六步：

- Exclude styles、Weirdness：旧词还在，只核对滑块文案（Weirdness 约 50% 时是 Expected results）。
- Vocal Gender（Male / Female）、Style Influence、Variety、My Taste、Max Mode、Song Title。
- Duration 的 Custom / Auto：单独一条，中文第一句就写「这是歌曲长短，不是模式开关」。term 不要用单独的 `Custom`。
- Remix 其余项：Mashup、Sample this song、Use as Inspiration。
- Edit 里的 Reverse、Add Vocal。Add Vocal 对比表标了 Pro，生成路径未走完。

这些 `prompt_tag` 全部留空。Exclude styles 继续保留那条短英文例子。

### 2.4 歌词标签不动结构，只把中文写长

`[Intro]` 到 `[Outro]`、人声唱法、风格英文，继续放抽屉和教程，不挂在按钮上。Hooks 底栏是短视频产品，词条 `[Hook]` 是「最想被人记住的那句」。匹配必须带方括号，不能让底栏 Hooks 冒出副歌解释。

中文改写时，同一句里先用日常说法，再出现副歌、桥段、能量这类词。茶那首歌的歌词是 Suno 自己写的，用了 `[Verse 1]`、`[Chorus]`、`[Verse 2]`、`[Outro]`、`[Ending]`。教程可以告诉用户：这些方括号是给 Suno 看的路标，中文句子写在下一行。

---

## 3. 教程仍做在插件里

形式不变：插件内一步一步的「做第一首歌」。一次只显示一步。每步最多一个复制按钮。「想知道为什么」默认收起。问号只解释眼前这个控件。同一套文字以后可以再变成静态页，v1 不做网站。

六步改成和现在的页面一致：

1. **先用一句中文写下感觉。** 这句留在备忘录里，用来听成品像不像。这一步没有要复制的英文。
2. **打开创作，点 Advanced，模型留在 v6。** 说明 Simple 是让它自己写，Sounds 是做音效。纯音乐：留在 Advanced，歌词框一个字都不填。不要再写「打开 Custom」或「打开 Instrumental」。
3. **歌词先只写两种段落。** 讲事情的一段，和最想被人记住、稍后要再出现一次的一段。复制块仍用 `[Verse]` / `[Chorus]`，括号里的中文让用户自己换。纯音乐跳过复制，歌词保持空白。
4. **风格只贴一行短英文。** 按第 1 步那句中文，在三四条里选一条。人声例子和「只要乐器」的例子分开。不要把中文说明贴进风格框。
5. **点 Create song。** 预先说明会出来两首，先都听完。点数会减少。这一步不要求下载。
6. **想改哪里，再打开那首歌的 … → Edit。** 只教三件：Crop 切掉头尾空白，Replace Section 重做唱错的几秒，Extend 从某一秒往后接。分轨若要提，只写 Get Stems 里的 Auto。不教 Studio、Advanced split、Create Custom Model（100 Credits）、Publish、Move to Trash。

`guide.json` 按这六步新建。`1924` 的旧稿只当语气样本：第 2 步整段替换，后面的歌词例子和「想知道为什么」可以留。

---

## 4. 交给开发时的顺序

1. 改 `src/data/glossary.json` 的四条旧词和第 2.2 节第一批新词。`id` 尽量保留，避免导出表对不上。
2. 改 `src/core/injector.js` 的匹配：去掉 Custom→Advanced 别名；模型只匹配三个现用名字；Duration 的 Custom 不挂任何「模式」词条。
3. 跑 `node scripts/test_dom_behavior.js`。断言仍是本地假 DOM，通过不等于 suno.com 上已经挂对。
4. `node scripts/build.js`，再 `node scripts/export_review.js`。词库仍以 json 为准，不从 CSV 导回。
5. 新增 `src/data/guide.json` 和插件内六步面板。面板还没设计交互时，先只提交文案 json，不要另做网站。
6. 另开一份交付，写明改了哪些 id、哪条匹配删了。不要覆盖本文件夹。

本轮不实现上述代码。`2008` 那份「重新加载后 Advanced 会显示制作人开关」先不要当正确结果。等词库正文改完再重新加载。

---

## 5. 仍然没点完、先不要写进教程的东西

- Create Custom Model 的确认框（会花 100 Credits）。
- Buy credits、Buy downloads、Auto-reload、Upgrade。
- Add Vocal 点下去之后的表单，以及它是否真的扣点数成功。
- 下载 MP3 / WAV 是否计入 Downloads Remaining。
- 歌曲页 `…` 菜单有一次没弹开，和资料库里那层菜单是否完全同一套，标 **NOT_YET_VERIFIED**。
- 扩展问号在已登录创作页上的真实挂载。内置浏览器加载不了解压扩展。Edge 上的那次重载还没有对着新词库复测。
