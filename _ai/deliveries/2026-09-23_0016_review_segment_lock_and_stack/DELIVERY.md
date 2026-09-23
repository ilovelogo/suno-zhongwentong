# 审查补充：分段锁定与上英下中

- **Task**: 核对用户确认的两件事是否已经写进代码。专业术语和谷歌兜底继续保留。
- **Result**: 逗号分段上的术语锁定成立。同一段里夹着生词时，锁定不成立。紧凑按钮的上英下中已经写进样式，页面网格尚未在 suno.com 上复看。
- **Delivery Path**: `_ai/deliveries/2026-09-23_0016_review_segment_lock_and_stack/`
- **用户要求**: `+ Audio`、`+ Voice`、`+ Inspo` 在按钮内部上英下中，不往外层网格插兄弟节点。这条按用户要求保留。

---

## 1. 术语锁定

`translateMusicDescription` 按逗号把描述切开。某一段被本地词典整段译成纯中文后，记为锁定，同步结果里只出现这段中文，不把这段原文发给谷歌。

本地调用：

- `tight four-on-the-floor groove, obscure kazoo ritual` → 立刻得到 `紧凑利落的四四拍正拍律动`。后半段生词不在这行里。
- `cheerful acoustic guitar folk, light and breezy, totally unknown xyzzy ritual` → 立刻得到前两段的中文，第三段不混进来。

因此，逗号左右已经分开的「四四拍正拍律动」不会被整句机翻盖掉。

同一段里如果术语后面还连着不认识的词，整段都不锁定，立刻结果是空的，这一整段原文会送给谷歌。本地调用：

`tight four-on-the-floor groove and surprise kazoo` → `""`

谷歌拿到的仍是含 `four-on-the-floor` 的英文，仍可能译成「地板上的四个」。后置替换是在谷歌返回的中文里找英文原词，机翻已经变成中文以后，找不回 `four-on-the-floor`，校准补不上。

下一步：一段里只要命中了词典，命中的那几个词先锁住，只把剩下的生词送去谷歌。

`injector.js` 文件头仍写着没有网络请求。谷歌通道是要留的，把头改成和代码一致。

## 2. 上英下中

`src/ui/styles.css` 里已有 `.suno-copilot-stacked-btn`（按钮内部 `flex-direction: column`）和 `.suno-copilot-nav-zh.stacked`（中文另起一行）。中文节点是 `appendChild` 进按钮内部，不是插到按钮外面。

触发范围比这三个按钮宽：`+ Image`、单独的 `Audio` / `Voice` / `Inspo` / `Image` 也会叠。父元素文字里出现 `Audio` 或 `Inspo` 的控件也会被加上叠放类。Remix 里的 `Voice` 因此也会显示「加入一段声音」，和词库里的「专属音色」还是两套说法。

页面上 3 列是否仍是 3 格，标 **NOT_YET_VERIFIED**。
