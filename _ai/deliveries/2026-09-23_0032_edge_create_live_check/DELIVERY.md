# Edge 创作页实测

- **Task**: 在用户已经打开的 Edge 里看 `https://suno.com/create`。扩展已注入。
- **Result**: 三个紧凑按钮的上英下中，在这一屏上是成立的。歌曲灰字上的「四四拍正拍律动」没有留在页面上，显示的是整句机翻。
- **Delivery Path**: `_ai/deliveries/2026-09-23_0032_edge_create_live_check/`
- **页面**: Edge 个人配置，地址栏 `https://suno.com/create`。为看全三个按钮，把该窗口拉到了大约 1500×980。截图在 `_ai/deliveries/2026-09-23_0028_review_0024_package/edge-create-wide.png`。页面文字摘录在同目录 `edge-a11y.txt`。

专业术语和谷歌兜底仍按你的指示保留。这一次要改的是：页面上最后留下来的中文，没有保住本地已经译好的术语。

## 这一屏上成立的

模式行是横排，中文跟在英文后面：

- Simple → 丢一句给它写
- Advanced → 自己写歌词和风格
- Sounds → 做一段声音

三个按钮仍是三格，中文在英文下面：

- + Audio → 添加音频
- + Voice → 加入一段声音
- + Inspo → 从歌单里找感觉

旁边能看到问号。v6 下面是「现在常用的模型」。Filters (3) 是「筛选过滤 3」。

## 灰字没有保住四四拍

页面上的中文用的是逗号和顿号，不是本地拼接用的间隔号 ` · `。含 `four-on-the-floor` 的两首，中文是：

- `tight four-on-the-floor groove` → `紧凑的四层节奏`
- `driving four-on-the-floor groove` → `驱动四地板凹槽`

词典里的「紧凑利落的四四拍正拍律动」「强劲推进的四四拍正拍律动」没有出现在这页文字里。

同一列里，`light and breezy` 显示成「轻快微风」，不是词典整词「微风拂面般的惬意听感」。`Electronic dance with saturated sub-bass` 显示成「带有饱和低音的电子舞曲」，不是「律动强劲的电子舞曲 · 饱满浑厚的超重低音」。

两首更长的 Atmospheric soul 描述，摘录时下面还没有中文行。

歌词区看得见的那行仍是英文：`Start writing lyrics, or leave this empty for instrumental`。摘录里没有「开始写歌词。什么都不填，做出来就没有人唱」。

## 和代码对得上的原因

本地函数会先按段译出术语，再把没译完的片段发给谷歌，返回后用新的一整行换掉已经显示的中文。页面上的标点和「四地板凹槽」是整句机翻的样子。若 `localStorage` 里已经存过这句歌的整句机翻，下次会直接用那份缓存，分段锁定不会再跑。

下一步仍按你的指示留谷歌、留专业术语。已经锁定的「四四拍正拍律动」要留在最终显示的那一行里，不能被整句机翻或旧缓存换掉。这次没有点生成、没有点升级。
