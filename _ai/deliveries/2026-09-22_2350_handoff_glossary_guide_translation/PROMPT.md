# 交给开发的提示词

把下面这一整段交给负责写代码的那个 AI。`2026-09-22_1936` 那份提示词作废。`2026-09-22_2320` 的混合翻译终稿不接受。

---

你在 `D:\Projects\Suno_Copilot` 里继续做 Suno 音乐通。先读完再改代码：

- `_ai/deliveries/2026-09-22_2025_glossary_tutorial_plan/DELIVERY.md`
- `_ai/deliveries/2026-09-22_2345_review_hybrid_translation/DELIVERY.md`
- `_ai/deliveries/2026-09-22_1924_tutorial_form_and_draft/GUIDE_DRAFT.md`
- `src/data/glossary.json`
- `src/core/injector.js`
- `dist/chrome-extension/manifest.json`
- `dist/chrome-extension/background.js`

这一轮同时做三件事：按真实 Pro 创作页改词库、把「做第一首歌」装进插件、按审查意见改掉现在的汉化。三处中文必须同一套说法。导航短句、问号卡片、教程，不能一个写「自定义模式」、一个写「高级模式」。

## 读者和文风

读者没学过音乐。中文要长、要具体，宁可重复。先用日常听感把事情说完，再出现副歌、桥段、拍号、律动这类词。长是为了讲明白，不是为了堆术语。

可复制的内容只允许短英文或方括号标签。中文解释不能贴进歌词格或风格格。界面动作的 `prompt_tag` 留空。不写歌手名、艺术家名。`[Belting]` 继续用「真声高唱」，不要写回「怒音」。

界面上的中文行再遵守这几条：

- 上面留英文原文，下面一整句中文。
- 中文行不要 `(`、`)`、`（`、`）`，不要 `[中文]` 或 `【中文】`。
- 中文行里不要再夹英文单词。译不出的词只留在上面的英文里。中文只写有把握的部分。整行中文可以先空着。
- 不要给原文添意思。`electric guitar` 就是电吉他，不要写成清音、扫弦。`hip hop` 不要加「硬核」。`heavy metal` 不要加「咆哮」。`choir` 不要加「神圣」。`house` 不要加「四四拍」。
- `four-on-the-floor` 先写成「鼓声一下一下跟着手拍打，每一拍都有一声」。需要时再补「这也叫四四拍正拍」。
- `fingerstyle` 写成「用手指拨弦，不是拿片扫」。不要留着英文。

## 先拆掉谷歌翻译

用户没有要求把句子发到网上。删掉这些：

- `fetchDynamicTranslation`，以及「中文里还剩英文字母就把整句换成网络译文」的逻辑。
- `background.js` 里对 `translate.googleapis.com` 的请求。manifest 里的 `host_permissions` 和这条后台翻译。若 `background.js` 删完已经没有别的职责，就不要再把它打进扩展。
- `localStorage` 键 `sc_trans_` 不得再存网络结果。缓存若还留着，只准存本地词典已经译完的句子。

没译完的灰字：英文原句不动，中文行不把剩下的英文拼进去。`soft intimate vocal, acoustic guitar, slow` 这种教程要用的句子，必须在本地词典里译成完整的一句人话。

下面这些已经做对，保留：灰字不再加 `【中文】`；英文节点不被改写；歌词编辑区不要被当成歌曲简介再插一行；问号旁的短中文去掉 `zh_name` 里的括号。

## 界面短句按这个改

`UI_SENTENCES` 只负责按钮和占位符下面的短中文。问号卡片的长解释以 `glossary.json` 为准。短中文必须是长解释的第一句缩写，不能另起一套名字。

| 英文 | 短中文 |
| :--- | :--- |
| Simple | 丢一句给它写 |
| Advanced | 自己写歌词和风格 |
| Sounds | 做一段声音 |
| Studio | Suno Studio，要 Premier |
| + Audio | 添加音频 |
| + Voice | 加入一段声音 |
| + Inspo | 从歌单里找感觉 |
| Upgrade to Premier | 升级到 Premier |
| v6 | 现在常用的模型 |
| v6-wild | 更敢试、更怪 |
| v6-mini | 免费档，更省 |
| Create song | 做歌，一次两首 |

删掉把 `Custom` 译成「自定义模式」的条目。时长里的 Custom 是歌曲长短，短中文写成「自己定长短」。不要让它和 Advanced 用同一个解释。

`Sounds` 不是采样库。`Studio` 不是录音工作室。这个账号已经是 Pro，Premier 不是「专业版」的别名。对比表里只有 Premier 有 Studio，也只有 Premier 有第三种分轨 Advanced split。

占位符用真实句子，不要只认单词 `Search`：

- 歌词：`Start writing lyrics, or leave this empty for instrumental` 下面写「开始写歌词。什么都不填，做出来就没有人唱」。
- 搜索：`Search for songs, playlists, creators, or genres` 下面写「搜歌曲、歌单、人或风格」。
- 风格框按页面上的真实占位符整句对照，中文写「写下你想听到的气氛、快慢和乐器」。

歌词占位符走双行：上面英文，下面中文。不要把中文拼进英文句子中间。

## 词库

`glossary.json` 仍是问号卡片的唯一来源。不要做 `import_review.js`，不要从 CSV 导回。旧 `id` 尽量留着。

先改这四条，并同时改匹配：

| id | 怎么改 |
| :--- | :--- |
| `custom_mode` | `term` 改为 `Advanced`。创作页三个模式：Simple 是丢一句给它写；Advanced 才能自己写歌词和风格；Sounds 是做一段声音，不是一整首歌。 |
| `instrumental` | 创作页没有这个开关。纯音乐：留在 Advanced，歌词框一个字都不填。删掉「打开 Instrumental，歌词框会消失」。 |
| `model_version` | 创作菜单是 v6、v6-wild、v6-mini。v6 是日常用的。v6-wild 更实验。v6-mini 是免费档。个人页旧歌上的 V4.5+ 只是以前生成的标记。 |
| `get_stems` | Pro 有两种：Auto 从一批乐器里自动拆；Split from mix 自己选一种拆。Advanced split 点开是 Premier 升级，第一首教程不走。 |

匹配必须一起改：

- 删掉 `Custom` 配到按钮文字 `Advanced` 的别名。
- 模型只整词匹配 `v6`、`v6-wild`、`v6-mini`。不要用「任意 v 加数字」。
- 按钮文字正好是 `Custom` 时，只允许挂「歌曲长短」那一条，不能挂 Advanced。
- `Lyrics` 是输入区，不挂问号。
- `[Hook]` 必须带方括号才匹配。底栏 Hooks 是短视频，不能冒出「最想被人记住的那句」。

第一批新的界面词，会挂问号，而且是 `button`、`[role="button"]` 或 `label`：Simple、Sounds、Create song、v6-wild、v6-mini、Remove Section、Fade In、Fade Out、Adjust Speed、Remaster。Extend、Crop、Replace Section、Get Stems 用旧 id，只改正文。

`persona` 的 `term` 改成菜单上的 `Voice`（Remix 里那一项）。「Create Persona」这次没在 Edit 菜单里看到，标 `NOT_YET_VERIFIED`，不要再拿它当匹配词。

第二批要有词条，但第一首教程不讲：Exclude styles、Weirdness、Vocal Gender、Style Influence、Variety、My Taste、Max Mode、Song Title、Duration 的 Custom 和 Auto、Mashup、Sample this song、Use as Inspiration、Reverse、Add Vocal。`prompt_tag` 全部留空。Exclude styles 继续留那条短英文例子。Weirdness 大约一半时，页面写的是 Expected results。Add Vocal 在套餐对比表里算 Pro 有，但没点到生成完成，正文里标 `NOT_YET_VERIFIED`。

歌词标签、唱法、风格英文继续放抽屉，不挂在按钮上。50 条旧词的中文都按上面的文风重写。教程第 3 步用到的说法必须和对应卡片一致：在讲事情、最想被人记住的那几句。方括号是给 Suno 看的路标，中文句子写在下一行，不是唱出来的词。

不要写进词库或教程的数字：当时剩余 2400 点、27 次下载。原因不明，标过 `UNKNOWN` 就不要猜。

## 教程

做在插件里，不做网站。

- 右下角浮球打开的抽屉，最上面单独放「做第一首歌」。不要和词条混成一个平铺列表。
- 一次只显示一步。底部按钮写「我贴好了，下一步」。
- 「想知道为什么」默认收起。
- 每步最多一个复制按钮。复制的只能是要贴进格子的歌词骨架或一行英文风格。
- 第 1、2、5、6 步没有要贴的标签，就不要复制按钮。
- 问号只解释眼前那个控件，不在问号里展开整篇教程。
- 文案放 `src/data/guide.json`。

六步以 `GUIDE_DRAFT.md` 的语气为样本，按现在的页面改：

1. 先用一句中文写下想要的感觉。留在备忘录里。没有要复制的英文。
2. 打开创作，点 Advanced，模型留在 v6。Simple 是让它自己写。Sounds 是做一段声音。纯音乐就留在 Advanced，歌词框留空。这一步禁止出现「打开 Custom」或「打开 Instrumental」。
3. 歌词先只写两种：讲事情的一段，和最想被人记住、稍后要再出现一次的一段。复制块仍用 `[Verse]` / `[Chorus]`。纯音乐跳过复制。
4. 风格只贴一行短英文。人声例子和「只要乐器」分开。最后那条 `acoustic instrumental, no vocals` 改成配合「歌词留空」，不要再写纯音乐开关。中文说明不要贴进风格框。
5. 点 Create song。会出来两首，先都听完，留更像第 1 步那句中文的一首。点数会减少。不要求下载。
6. 只改最别扭的一处：歌曲 `…` → Edit 里的 Crop、Replace Section、Extend。若提到分轨，只写 Get Stems 的 Auto。不教 Studio、Advanced split、Create Custom Model、Publish、Move to Trash。

## 测试和交付

跑 `node scripts/test_dom_behavior.js` 和 `node scripts/build.js`，再 `node scripts/export_review.js`。测试仍是本地假 DOM。通过不等于 suno.com 已经挂对。不要写「创作页已验收」。不要往页面上插假按钮。不要做 S-Pen 测试。

测试至少锁住这些，旧的「歌词区文字不被改」和「点徽标不点到按钮」继续留着：

- `Sounds`、`Advanced`、`Studio` 的短中文就是上面那张表。
- 按钮文字 `Custom` 不会出现「自定义模式」。
- `soft intimate vocal, acoustic guitar, slow` 的中文行是完整中文，没有 `soft`、`slow`、`intimate`。
- 译不完的句子不会把英文碎片拼进中文行。
- 代码里不再出现 `translate.googleapis.com`。
- 歌词占位符不会变成「英文句子中间插一个中文词」。

新建 `_ai/deliveries/YYYY-MM-DD_HHMM_glossary_guide_and_local_translation/`。不要覆盖 2025、2320、2345 或更早的目录。交付里的扩展包要带上现有的 `icon16.png`、`icon48.png`、`icon128.png`。

`DELIVERY.md` 写清：改了哪些 id、删了哪条匹配、谷歌通道是否已删除、教程六步是否能在抽屉里点开、哪些按钮英文你没在这次代码里核实（标 `UNKNOWN` 或 `NOT_YET_VERIFIED`）。附上抽屉第 1 步和第 2 步的文字。没有这些，不要写完成。
