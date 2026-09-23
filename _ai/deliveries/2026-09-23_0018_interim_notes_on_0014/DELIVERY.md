# 中间记录：0014 这一版先看到的范围

- **Task**: 看 `_ai/deliveries/2026-09-23_0014_stacked_buttons_and_term_lock_protection/`。用户还没把上一份审查交给开发，只让他改了翻译细节。下一版局部修改还没到。
- **Result**: **暂不结论。** 下面只记这一版代码和测试实际覆盖到的范围。不作为整包通过或不通过。
- **Delivery Path**: `_ai/deliveries/2026-09-23_0018_interim_notes_on_0014/`
- **验证**: 读了该目录里的 `injector.js`、`styles.css`、`test_dom_behavior.js`。用当前项目里同一套 `translateMusicDescription` 抽了三句。没有在 suno.com 上复看。

专业术语和谷歌兜底按用户要求保留。上英下中按用户要求保留。

---

## 这一版已经写进代码的

逗号切开之后，整段被词典译成纯中文的那一段会立刻显示，并且不会把这一段原文发给谷歌。

断言 8 锁的就是这种句子：`four-on-the-floor, completely obscure unknown phrase` 的同步结果里有「四四拍正拍律动」。`tight four-on-the-floor groove, brisk gentle fingerpicking, electric guitar` 三小段都能在本地译完，中文行没有英文字母，英文原句没有被改。

`+ Audio`、`+ Voice`、`+ Inspo` 的中文是写进按钮内部的 `.suno-copilot-nav-zh`，并带上 `.suno-copilot-stacked-btn`。断言 6.1 的假网格在扫描后仍是 3 个子节点，中文分别是「添加音频」「加入一段声音」「从歌单里找感觉」。样式是按钮内部 `flex-direction: column`。

## 这一版的测试还没覆盖到的

断言 8 只看同步返回值。它没有模拟谷歌返回后的那一次整行回填。

同一逗号段里，术语后面还连着生词时，这一段不会锁定。`tight four-on-the-floor groove and surprise kazoo` 的同步结果是空字符串，这一整段原文仍会进异步翻译。断言 8 没有这句。

叠放类的触发比三个按钮宽：`+ Image`、单独的 `Audio` / `Voice` / `Inspo` / `Image`，以及父元素文字里出现 `Audio` 或 `Inspo` 的控件，也会被加上叠放类。断言 6.1 的父层只有那三个按钮，看不出这条会不会波及旁边的格子。

假网格没有宽度，也不能说明真实创作页那一排是否仍是 3 格。页面效果标 **NOT_YET_VERIFIED**。

`injector.js` 文件头仍写着没有网络请求。这一版的谷歌通道是留着的。

## 先不动的

卡片里的 `NOT_YET_VERIFIED`、「不要写回怒音」、`[Chorus]` 先写「副歌」、Remix 的 `Voice` 和 `+ Voice` 是否同一句中文，都留到下一版局部修改到了再一起看。这一份不要求现在返工。
