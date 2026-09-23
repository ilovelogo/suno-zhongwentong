# 中间记录：0018 连词拆分和占位符

- **Task**: 看 `_ai/deliveries/2026-09-23_0018_token_masking_and_conjunction_protection/`。接在 `2026-09-23_0018_interim_notes_on_0014` 后面。整包仍不在这里下结论。
- **Result**: **暂不结论。** 上一份记下的那句空结果，这一版的同步输出已经有「紧凑利落的四四拍正拍律动」。连词拆分同时拆开了词典里本来含有 and / with 的整词。
- **Delivery Path**: `_ai/deliveries/2026-09-23_0022_interim_notes_on_token_mask/`
- **验证**: 用该目录里的 `injector.js` 调用 `translateMusicDescription`。没有请求谷歌，没有在 suno.com 上复看。

专业术语和谷歌兜底仍按用户要求保留。

---

## 上一份空结果已经补上

`tight four-on-the-floor groove and surprise kazoo` 的同步结果是 `紧凑利落的四四拍正拍律动`。中间没有逗号的 `tight four-on-the-floor groove surprise kazoo` 也是这一句。生词没有拼进这行中文。

做法是先按逗号、分号，以及 `and` / `with` / `feat` 切开，再查词典。切开之后，前半段整段命中，立刻显示。断言 8 只检查同步结果里有没有这句中文，没有模拟谷歌返回后的回填。

## 切开连词时，词典里的整词也被切开了

这些词条本身含有 `and` 或 `with`。拆分发生在查词典之前，整词对不上：

| 英文 | 这一版同步结果 | 词典里的整词 |
| :--- | :--- | :--- |
| `drum and bass` | `低音贝斯` | `碎拍鼓打贝斯` |
| `light and breezy` | `惬意微风` | `微风拂面般的惬意听感` |
| `punchy kick and clap` | `结实有力的底鼓 · 击掌拍手声` | `结实有力的底鼓与击掌` |
| `pulsing synthesizer lead and sequencer` | `脉冲合成器主奏` | `脉冲合成器主奏与音序器` |
| `fingerpicked and lightly strummed steel-string guitar` | `细腻指弹 · 轻柔扫弦的钢弦吉他` | `细腻指弹与轻柔扫弦的钢弦吉他` |

`electronic dance with saturated sub-bass` 两边各自还能对上词典，所以还在。

占位符 `SCTERM0X` 是否能从谷歌原文里原样回来，这次没有打到网络，标 **NOT_YET_VERIFIED**。回填函数在拼好整行之后就会换成新句子。若占位符没被原样带回，已经显示的术语会被这行新句子换掉。`MISTRANSLATION_FIXES` 只认「地板上的四个」这一类写法，并且会把返回文本里的「掉落」都改成「高潮爆发点」。

`injector.js` 文件头仍写着没有网络请求。这一版的谷歌通道还在。

## 先不动的

上英下中、3 列网格、卡片里的审查用词、`[Chorus]` 的第一句、Remix 的 `Voice`，仍留到后面一起看。这一份不要求现在返工整包。
