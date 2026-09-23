# 已登录创作页观察（2026-09-22）

- **Task**: 在用户已登录的浏览器里打开 `https://suno.com/create`，看真实界面，不点生成。
- **Result**: 登录有效，人在创作页。这个浏览器里没有加载音乐通扩展，所以徽标、浮球、三层卡片都还没出现。词库里若干界面词已经对不上现在的 Suno。
- **Verification**: 页面地址含 `/create`，能看到自己的曲库和创作栏。用页面结构核对了按钮名字。没有点击 Create。
- **Suggested next step**: 词库和教程按下面的真实用词改。扩展要在这个已登录的浏览器里加载之后，才能做徽标现场测试。

## 现在创作页上实际有的

- 模式是 `Simple`、`Advanced`、`Sounds`。没有旧版那种单独的 Custom 总开关。
- 模型按钮写的是 `v6`，不是 v3.5 / v4。
- Advanced 里有歌词区，无障碍名称是 `Lyrics editor`，占位句是：留空就是纯音乐（instrumental）。纯音乐不是旁边一个 Instrumental 开关。
- 同一屏还有 `Styles`、`Exclude styles`、`Weirdness`、`Style Influence`、`Variety`、`Song Title (Optional)`。
- 另外有 `+ Audio`、`+ Voice`、`Male`、`Female`、`Custom`、`Auto`。这里的 `Custom` 和 `Auto` 挨在一起，不是「打开自定义模式」。
- 生成按钮叫 `Create song`。当时是禁用的，没有点。

## 对现有词库的直接影响

- 若现在把扩展注入这个页面，词条 `Custom` 会挂到错误的 `Custom` 按钮上，解释还是旧的「自定义模式」。
- `Instrumental`、`Model v3.5 / v4` 在这页找不到同名按钮，徽标不会出现，教程第 2 步也不能再写「打开 Custom」。
- `Exclude styles` 和 `Weirdness` 的英文还在，这两条可以沿用，但位置要改成 Advanced 里能看见的那两项。
- 歌词结构标签（`[Verse]`、`[Chorus]` 等）不依赖这些按钮，仍然只放在抽屉和教程里。
