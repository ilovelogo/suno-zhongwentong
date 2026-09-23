# 审查：0036 这份 v1.3.0 交付

- **Task**: 看 `_ai/deliveries/2026-09-23_0036_modification_after_edge_check/DELIVERY.md`。这个目录里原来的修改意见已被这份交付替换。
- **Result**: **不作为 Edge 问题已经修好。** 版本号、不要挤掉 `+ Inspo`、上英下中，按你的指示保留。灰字仍会走整句旧缓存，连词仍会拆开词典整词。
- **Delivery Path**: `_ai/deliveries/2026-09-23_0040_review_0036_package/`
- **验证**: 用该目录 `src/core/injector.js` 调用 `translateMusicDescription`。没有在重新加载扩展后再看 Edge。

## 按你的指示保留

- 专业术语和谷歌兜底留下。
- `+ Audio`、`+ Voice`、`+ Inspo` 在按钮内部上英下中。
- 不要删掉页面上的 `+ Inspo`，也不要往这排按钮外面插节点把格子挤掉。
- 版本号 `1.3.0` 可以留。

我把窗口拉宽之后，三个按钮都在，中文在英文下面。说明里写的「第三个位置只剩一个问号、Inspo 不见了」，和那一屏不一致。禁止在这三个加号按钮外再插问号，这条可以留。

## 本地函数和页面不是同一句中文

不读缓存时，`tight four-on-the-floor groove, punchy kick` 的同步结果是 `紧凑利落的四四拍正拍律动 · 结实有力的底鼓`。`driving four-on-the-floor groove` 是 `强劲推进的四四拍正拍律动`。

Edge 上同一类灰字显示的是「紧凑的四层节奏」和「驱动四地板凹槽」。代码开头仍是：只要 `localStorage` 里有这句的纯中文，就直接返回，不再走锁定。谷歌返回后仍会把整行换成新句子。这两处都没改，所以重新加载之后，旧缓存还在的话，页面仍会是四地板那一句。

## 还没按修改意见改的

- `drum and bass` 的同步结果仍是 `低音贝斯`，不是「碎拍鼓打贝斯」。`light and breezy` 仍是 `惬意微风`。拆分仍在查词典之前。
- `MISTRANSLATION_FIXES` 仍把所有「掉落」改成「高潮爆发点」。
- 歌词中文只写在 `textarea` 的 placeholder 上。Edge 里看得见的那行仍是英文原文。
- 叠放条件仍包括父元素文字里出现 `Audio` 或 `Inspo`。
- 卡片正文仍有 `NOT_YET_VERIFIED` 和「不要写回怒音」。`[Chorus]` 长解释第一词仍是「副歌」。
- 文件头仍写没有网络请求。

下一轮先处理缓存和回填：这句歌里有词典整词时，最终中文必须含「四四拍正拍律动」，不能沿用整句旧缓存。然后再让 `drum and bass`、`light and breezy` 走整词。改完用 Edge 里现在的 `/create` 看那两首灰字。不要写已经验收。
