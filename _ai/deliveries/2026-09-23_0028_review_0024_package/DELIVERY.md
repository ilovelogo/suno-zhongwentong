# 审查：0024 这份总交付

- **Task**: 审查 `_ai/deliveries/2026-09-23_0024_consolidated_review_opinion/DELIVERY.md` 以及同目录源码。这个目录里原来的审查意见已被这份总交付替换。
- **Result**: **不作为终稿。** 文首两条用户指示按你的确认保留。其余「彻底消除」「100%」还没有做到。
- **Delivery Path**: `_ai/deliveries/2026-09-23_0028_review_0024_package/`
- **验证**: 用该目录 `src/core/injector.js` 调用 `translateMusicDescription`。没有请求谷歌，没有在 suno.com 上复看。

## 按你的指示保留

交付里写明、并且你已经确认的两条，保持不动：

- 专业术语留下，谷歌兜底留下。`four-on-the-floor` 用「四四拍正拍律动」，`fingerstyle` 用「细腻指弹」，`electric guitar` 用「电吉他清音与扫弦」。
- `+ Audio`、`+ Voice`、`+ Inspo` 在按钮内部上英下中，中文不插到按钮外面。

## 这一包里已经成立的

`tight four-on-the-floor groove and surprise kazoo` 的同步结果是 `紧凑利落的四四拍正拍律动`，生词没有拼进这行。问号词库的 Advanced、歌词留空、v6 三个整词、时长 Custom，以及 `guide.json` 的六步，和先前看过的结构一致。`guide.json` 第 1 步是写下感觉，第 2 步是点 Advanced。

## 还要改，并且不能动上面两条指示

连词拆分仍在查词典之前。整词里含有 `and` 的条目对不上：

| 英文 | 同步结果 | 词典整词 |
| :--- | :--- | :--- |
| `drum and bass` | `低音贝斯` | `碎拍鼓打贝斯` |
| `light and breezy` | `惬意微风` | `微风拂面般的惬意听感` |
| `punchy kick and clap` | `结实有力的底鼓 · 击掌拍手声` | `结实有力的底鼓与击掌` |
| `pulsing synthesizer lead and sequencer` | `脉冲合成器主奏` | `脉冲合成器主奏与音序器` |

先命中词典整词，再切剩下的 `and` / `with`。

占位符回填还没打到谷歌。断言 8 只看同步结果。返回后会把整行换成新句子；占位符若没原样回来，已经显示的术语会被换掉。回填用本地锁定的中文拼回去。`MISTRANSLATION_FIXES` 里把所有「掉落」改成「高潮爆发点」，收窄到四四拍那一类错译。

说明里写了按 `&` 分段。代码的拆分是逗号、分号、`and`、`with`、`feat`，没有 `&`。

说明里的六步写成「第 1 步怎么写歌词、第 2 步段落怎么排」。`guide.json` 不是这个顺序。

叠放类还会加到 `+ Image`、单独的 `Voice`，以及父元素文字里出现 `Audio` 或 `Inspo` 的控件。Remix 的 `Voice` 会显示「加入一段声音」，卡片写的是「专属音色」。`+ Voice` 保持「加入一段声音」。

卡片正文仍有「标 NOT_YET_VERIFIED」和「不要写回怒音」。`[Chorus]` 长解释第一词仍是「副歌」。`injector.js` 文件头仍写没有网络请求，谷歌通道是要留的。

真实创作页那一排是不是仍是 3 格，标 **NOT_YET_VERIFIED**。
