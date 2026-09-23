# 审查：2026-09-22_2358 合并交付包

- **Task**: 审查 `_ai/deliveries/2026-09-22_2358_unified_review_package/`。专业术语和谷歌兜底按用户后来的决定保留，不作为问题。
- **Result**: **还不能当终稿。** 词库主结构、六步教程、专业术语、谷歌兜底可以留下。下面第 2 节是还要改的地方。
- **Delivery Path**: `_ai/deliveries/2026-09-23_0006_review_unified_package/`
- **作废**: 本文件先前把「四四拍正拍律动 / 细腻指弹」和谷歌通道判为不合要求。用户已确认这两条就是要保留的。`2026-09-22_2350` 提示词里「删掉谷歌」「four-on-the-floor 先写成每一拍都有一声鼓」这两句同样作废。
- **验证**: 本地调用 `translateMusicDescription`。没有在 suno.com 上复看。页面效果标 **NOT_YET_VERIFIED**。

用户要保留的译文包括：`four-on-the-floor` → `四四拍正拍律动`，`fingerstyle` → `细腻指弹`，以及未收录描述走谷歌兜底。本地词库优先，避免机翻把这些术语翻乱。

---

## 1. 可以留下的

问号词库已经对准创作页：

- `custom_mode` 的 term 是 `Advanced`，中文是「自己写歌词和风格」。Simple、Sounds 分开写了。
- 纯音乐写成歌词框留空，没有「打开 Instrumental」。
- 模型是 v6、v6-wild、v6-mini。匹配是这三个整词，没有「任意 v 加数字」。
- 按钮文字正好是 `Custom` 时，只挂 `duration_custom`「自己定长短」。没有再把 Custom 配到 Advanced。
- `Get Stems` 写了 Pro 的 Auto 和 Split from mix，并写了 Advanced split 要 Premier。
- `[Hook]` 不会去配底栏 Hooks。Lyrics 不挂问号。
- `[Belting]` 的名字仍是「真声高唱」。

`guide.json` 的六步和已定教程一致：第 2 步是点 Advanced、模型留 v6、纯音乐留空歌词；第 3、4 步各一个复制按钮；第 5 步是 Create song、一次两首；第 6 步只教 Crop、Replace Section、Extend，分轨只提 Auto。

歌词占位符是英文一行、中文一行。搜索占位符认的是 `Search for songs...`。`Sounds`、`Studio`、`Advanced` 的短中文可用。扩展包里有 16、48、128 图标。

`soft intimate vocal, acoustic guitar, slow` 的本地结果是完整中文。

## 2. 还要改的

### 交付说明和文件头

`2358/DELIVERY.md` 把六步写成「第 1 步怎么写歌词、第 2 步段落怎么排」。`guide.json` 不是这个顺序。以 json 为准。

`injector.js` 文件头写着「Zero network calls, Zero Google Translate」。代码里的谷歌通道是要留的。把头上这句改成和代码一致。

### 半截英文仍会进中文行

本地调用：

`Moody bachata song about my grandmother stories` → `情绪化氛围 巴恰塔双人舞曲 song about my grandmother stories`

词典对上的词先译了，对不上的英文还拼在同一行里。断言 9 只用了一句完全对不上的英文，测不到这种半截拼接。

谷歌是整句替换：一句里只要有没译完的词，就把整句原文发给谷歌，再用返回结果盖掉整行。这样已经用本地词库译好的 `四四拍正拍律动` 也会被整句机翻换掉。兜底只补没译完的那一段，已经译好的术语留在本地结果里。

### 读者会看到不该看到的话

- `persona` 的第一段正文里有「标 NOT_YET_VERIFIED」。状态留在 `expert_status`，不要出现在卡片上。
- `[Belting]` 的正文末尾有「不要写回怒音」。这句是给写代码的人看的。
- `[Chorus]` 的 `zh_name` 是「最想被人记住的那几句」，但 `tier1_vernacular` 第一词仍是「副歌」。教程第 1 步的例子里也先写了「副歌大声一点」，同句没有解释副歌是什么。
- 按钮短中文把 `Voice` 和 `+ Voice` 都写成「加入一段声音」。词库里 Remix 的 `Voice` 叫「专属音色」。两个按钮各用各的句子。

`expert_status` 被大量写成 `reviewed`。上面这些还没改完，不要把这个字段当成已经审过。

## 3. 下一步

1. 半截英文不要出现在中文行。谷歌只补没译完的片段，不覆盖本地已经译好的术语。
2. 卡片正文删掉 `NOT_YET_VERIFIED` 和「不要写回怒音」。`[Chorus]` 和教程第 1 步先说「最想被人记住的那几句」。
3. `+ Voice` 用「加入一段声音」。Remix 里的 `Voice` 用「专属音色」。
4. 文件头改成与谷歌兜底一致。交付里的六步说明改成和 `guide.json` 一样。
5. 另开交付。不要覆盖 2358。不要写 suno.com 已验收。
