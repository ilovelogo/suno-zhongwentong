# 任务原始需求 (User Prompt)

## 用户提问
> 这一段也有很多内容没有翻译，是你故意忽略的吗？还是说当时看的时候只看到了部分页面

## 用户附图
- `media_1790097956278.png`（Suno 创作页 More Options / 高级参数配置栏截图）：
  - `Vocal Gender 人声演唱 性别 (i)` 及右侧 `Male`、`Female`
  - `Duration (i)` 及右侧 `Custom`、`Auto`
  - `Max Mode (i)` 及右侧 `Off`、`On`
  - `Weirdness (i)` 及右侧 `50%`
  - `Style Influence (i)` 及右侧 `50%`
  - `Variety (i)` 及右侧 `Normal`
  - `Personalize (i)` 及右侧 `My Taste`、`Off`、`On`
  - 关联上一轮未完全交付的问题：`Lyrics`、`Styles` 折叠栏标题以及风格输入框下的动态随机灰字提示词 `swing jazz, ambient metal, percussion instruments, old man voice, sanfona` 未翻译。

## 核心诉求
1. **正面诚实回答原因**：剖析为什么这部分此前出现漏翻或机翻拼凑痕迹（视野盲区 vs DOM 选择器局限 vs 动态占位符机制）。
2. **彻底解决漏翻与排版问题**：
   - 彻底汉化创作高级参数栏（Duration 歌曲长短、Max Mode 开启深度生成、Weirdness 创意发散程度、Style Influence 风格词影响程度、Variety 结果差异程度、Personalize 个性化推荐、Vocal Gender 选男声或女声、Male 男声、Female 女声、Off 关、On 开、Normal 适中）。
   - 杜绝 `Vocal Gender` 被歌单风格扫描器误拆为“人声演唱 性别”。
   - 汉化 `Lyrics`（歌词）、`Styles`（音乐风格）折叠栏。
   - 动态识别并双行本地化风格输入框中的随机提示词（如 `swing jazz, ambient metal, percussion instruments, old man voice, sanfona` -> 双行对照，本地命中专业词典）。
3. 遵循用户之前“更新插件想着更新版本号”要求，递增版本号至 `1.4.0`，并执行完整回归测试与构建打包。
