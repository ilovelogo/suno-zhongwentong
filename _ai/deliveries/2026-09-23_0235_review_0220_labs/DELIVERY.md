# 审查：0220 Labs 与个人资料汉化

- **Task**: 看 `_ai/deliveries/2026-09-23_0220_labs_and_profile_coverage/`。用户要求 Labs 和个人资料页有中文，这一条保留。
- **Result**: **不作为这两个区域已经汉化完成。** 词库里加进了一批句子，自造页面的测试能对上这些句子。没有打开 `https://suno.com/listen-and-rank`，也没有打开个人资料页核对英文是否就是这些句子。
- **版本**: 交付写 `1.6.0`，工程里的 `package.json` 也是 `1.6.0`。名称「Suno中文通」保留。

## 词库里确实写了的

听歌评测题干、两段说明、`Clip A` / `Clip B`、`Neither`、`Listen for 数字 more seconds`、`Earn 数字 credits`、若干快捷键，以及一批个人资料和账单句子，都在 `src/core/injector.js` 的 `UI_SENTENCES` 里。导航扫描上限从 50 字改到 300 字，`<p>` 也会扫。长中文会加上 `block`，换到英文下面。

说明段落在词库里有两句英文，不是一句。测试只用了带 “Every response helps Suno improve!” 的那句。另一句以 “or 'Neither' if they tie” 结尾，测试没覆盖。页面上若是第三种写法，两句都不会命中。

`Listen to songs, share your preferences, and earn credits for your feedback.` 的中文写成了「听取两段音乐，选出你更喜欢的一首」。这句英文没有「两段」，也没有「更喜欢」。评测题干问的是哪一段更符合提示词。

## 测试证明不了页面

断言 17 先造出 `Which clip better matches the prompt?`、`Earn 5 credits`、`prompt_following`、`Edit Profile` 这些节点，再检查中文。句子就是词库里的键。18 项通过只说明假页面和词库一致。

个人资料、账单、隐私里的 `First Name`、`Upload Avatar`、`Make my songs public by default`、`Volume normalization`、`High Quality Audio` 等，这次没有在已登录的设置页上对过原文。对不上的键不会显示中文，页面仍是英文。

`prompt_following` 像内部字段名。页面上若没有这串字符，这条翻译不会出现。

## 扫描变宽之后会碰到的词

整段文字只要和键完全一致就会在元素内部追加中文。现在的短键包括 `Skip`、`Submit`、`About`、`Email`、`Connect`、`Disconnect`、`Spin`、`country`、`Bio`。这些词若在别的页面单独成段，也会被译成「跳过」「关于我」「乡村音乐」等。本次没有在创作页上再看一遍。

下一轮先打开现在的 `/listen-and-rank` 和个人资料页，把屏幕上的英文逐句对上词库，缺的补，多出来的猜词删掉或改到和页面一致。不要把 18 项测试写成已经覆盖 Labs 和设置页。
