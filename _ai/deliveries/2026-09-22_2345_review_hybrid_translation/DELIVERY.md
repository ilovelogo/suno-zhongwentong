# 审查：2026-09-22_2320 统一汉化与混合翻译

- **Task**: 审查 `_ai/deliveries/2026-09-22_2320_unified_translation_and_hybrid_engine/`。对照用户三次指示，并抽查 `src/core/injector.js` 的实际译文。
- **Result**: **不接受为终稿。** 去前缀、保留英文原文、歌词占位层不再被当成歌曲简介，这三件跟指示一致。整句质量、界面用词、以及未经要求的谷歌翻译，不能过。
- **Delivery Path**: `_ai/deliveries/2026-09-22_2345_review_hybrid_translation/`
- **被审目录**: `_ai/deliveries/2026-09-22_2320_unified_translation_and_hybrid_engine/`
- **对照源码**: `src/core/injector.js`、`scripts/test_dom_behavior.js`、`dist/chrome-extension/background.js`、`dist/chrome-extension/manifest.json`
- **验证**: 用当前引擎对 8 句风格描述调用 `translateMusicDescription`。没有在 suno.com 上复看。页面效果标 **NOT_YET_VERIFIED**。

用户指示来自被合并的三份说明，原文是：

1. 菜单、右侧歌曲、歌曲后的灰字都要译，不能只译一两个词。
2. 去掉翻译里的 `(`、`)`、`[中文]`。
3. 路线 B：上面留英文原句，下面一整句中文。消灭「Start writing lyrics … 纯音乐」这种夹生，创作区不要被当成歌曲简介。

「方案 3：把没见过的句子发到 Google 翻译」不在这三条里。

---

## 1. 跟指示对齐的部分

- 灰字译文不再带 `【中文】`。`Filters (3)` 的中文是 `筛选过滤 3`，括号没进中文。
- 歌曲灰字的英文节点没有被改写。断言 7 用的那一句，译文是 `轻松愉悦的原声吉他民谣 · 微风拂面般的惬意听感`，英文原句还在。
- 类名里带 `lyrics` / `editor` 的容器，不会再被插上歌曲简介行。这能挡住上次截图里的错位。
- 问号旁边的短中文会去掉 `zh_name` 里的括号。

这四条可以保留。

## 2. 译文风格没有按「没学过音乐的人」来写

先前词库约定是：中文要长、要具体，先说日常听感，再出现拍号、律动这类词。这份词典把方向写成了「专业行话」。

抽查结果（本地调用，未走网络）：

| 英文 | 引擎输出 | 问题 |
| :--- | :--- | :--- |
| `cheerful acoustic guitar folk, light and breezy` | `轻松愉悦的原声吉他民谣 · 微风拂面般的惬意听感` | 这句是词典里整段写死的，合格 |
| `tight four-on-the-floor groove` | `紧凑利落的四四拍正拍律动` | 读者不知道四四拍、正拍是什么 |
| `cheerful acoustic folk-pop, brisk gentle fingerpicked and lightly strummed steel-string guitar, warm vocals` | `欢快轻柔的原声民谣流行 · 轻快灵动 柔和温润 细腻指弹与轻柔扫弦的钢弦吉他 · 温暖人声演唱` | 形容词被拆成一串词，不是一句人话。交付文稿里的更顺版本，引擎并没有稳定打出来 |
| `folk-pop, warm male vocal, fingerstyle` | `质朴民谣-流行曲风 · 温暖柔和 沉稳男声 · fingerstyle` | `fingerstyle` 原样留下 |
| `Moody bachata song about my grandmother stories` | `情绪化氛围 浪漫巴恰塔双人舞曲 song about my grandmother stories` | 后半句全是英文 |
| `soft intimate vocal, acoustic guitar, slow` | `soft intimate 人声演唱 · 原声木吉他 · slow` | 教程里准备贴的那行风格，译不完整 |
| `A short cheerful acoustic guitar song about making tea on a quiet morning` | `A short 轻松欢快 原声木吉他 song about making tea on a quiet morning` | 创作提示句被当成风格标签拆碎 |

另外这些中文多写了原文没有的意思：`electric guitar` → `电吉他清音与扫弦`，`hip hop` → `硬核律动嘻哈说唱`，`heavy metal` → `重金属失真咆哮`，`choir` → `唱诗班神圣合唱`，`house` → `四四拍浩室舞曲`。`upbeat and cheerful` 的词条是 `欢快明朗的明朗氛围`，同一个意思说了两遍。

`city pop`、`boom bap`、`lo-fi` 的中文行里仍留着 City Pop、Boom Bap、Lo-Fi。这和「中文行不要再夹英文」不一致。

## 3. 界面短句有事实错误，括号也没清完

对照 2026-09-22 已登录创作页：

| 按钮 | 现在的中文 | 应改成 |
| :--- | :--- | :--- |
| `Sounds` | 声音采样库 | 做一段声音，不是一整首歌 |
| `Studio` | 录音工作室 | Suno Studio。这个账号的对比表里它属于 Premier |
| `Advanced` | 高级自定义模式 | 自己写歌词和风格。不要再教「自定义模式」 |
| `Custom` | 自定义模式 | 删掉这条。时长里的 Custom 是歌曲长短 |
| `+ Audio` | 上传音频 | 添加音频。里面还有浏览和录音 |
| `Upgrade to Premier` | 升级 Premier 专业版 | 升级到 Premier。这个账号已经是 Pro，Premier 不是「专业版」的别名 |

`纯音乐（无歌词）` 和 `描述你想要的音乐风格（例如：原声流行民谣）` 仍带括号，没完成第 2 条指示。

歌词占位符在词典里有整句键时，代码走的是同一行中间点 `英文 · 中文`，不是交付文稿写的换行双行。搜索框在真实页面上的占位符是 `Search for songs, playlists, creators, or genres`。测试只做了占位符恰好等于 `Search` 的假输入框。

`v6` 会被译成 `第6代模型`。`v6-wild`、`v6-mini` 对不上这条规则。问号卡片仍走旧词库：`Custom` 继续配到 `Advanced`，模型说明仍是 v3.5 / v4。`glossary.json` 这次没改。

## 4. 谷歌兜底不能留

`fetchDynamicTranslation` 把整句发到 `https://translate.googleapis.com/translate_a/single?client=gtx`。扩展增加了 `host_permissions` 和 `background.js`。只要本地结果里还剩 3 个以上连续英文字母，回来的机器译文会整段换掉已经译好的部分，并写入 `localStorage` 键 `sc_trans_`。下一次同一句不再走本地词典。

这和交付里的三句说法对不上：

- 「杜绝机翻」：未知句的最终展示就是机翻。
- 「100% 不留英文」：请求失败时英文还在。测试没有覆盖这条网络路径。
- 「0 毫秒、零多余网络请求」只在缓存命中后成立。第一眼看到的新歌描述会出网。

歌曲风格和创作提示会离开本机。用户没有要求这个通道。下一步拿掉 `background.js` 里的翻译请求、manifest 里的 `translate.googleapis.com` 权限，以及「有英文就整句换掉」的逻辑。本地没译完的词留在英文原句上即可，灰字中文只显示已经有把握的片段，并允许整行先空着。

## 5. 测试证明不了交付里的范围

`node scripts/test_dom_behavior.js` 的 9 条断言，测的是手写假 DOM。断言 7 只锁了词典里预先写好的那一对整句。断言 8 只锁了 `Search`。断言 9 的容器类名就是隔离选择器要找的 `lyrics` 和 `editor`。9 条通过，不能推出「所有灰字都是整句」或「创作区在 suno.com 上已经隔离」。

交付包里的 `dist/chrome-extension/` 没有带上 `icon16.png`、`icon48.png`、`icon128.png`。项目自己的 `dist/chrome-extension/` 里有这些图标。审查包和「完整 PNG 图标」这句话不一致。

## 6. 下一步只改翻译，先不要加网络

1. 删掉谷歌翻译、后台转发和对应权限。缓存只准存本地词典结果。
2. 灰字中文改成日常听感。`four-on-the-floor` 先写成「每一拍都有一声鼓」，需要再补「这也叫四四拍正拍」。译不出的英文留在上面那一行，不要拼进中文行。
3. 按第 3 节改短句，并去掉中文里的括号。`Sounds`、`Studio`、`Advanced`、时长 `Custom` 以创作页为准。
4. 问号卡片仍等词库计划 `_ai/deliveries/2026-09-22_2025_glossary_tutorial_plan/`。这次不要用导航短句代替那份词库。
5. 改完后在已登录的 `/create` 上看三处：歌词框占位符、右侧灰字、`Sounds` / `Advanced` / `Studio`。看完再写新交付。不要覆盖 2320。
