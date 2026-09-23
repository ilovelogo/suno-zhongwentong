# 任务需求记录 (User Prompt)

## 用户指令
> 创作高级参数栏与折叠面板全量汉化，其他面板的高级参数栏和折叠的东西也得汉化呀！你不能只告诉你一个，你就汉化一个，哪有这么干活的呀

## 核心诉求
1. **全面系统性覆盖**：严禁按图索骥“指出一个才改一个”，必须对 Suno 全站的所有其他面板、折叠栏、弹窗、高级参数配置做地毯式全量汉化与架构加固。
2. **涵盖范围**：
   - **Sounds 声音生成模式**：Loop（循环播放）、One-shot（单次触发）、Pitch（音调高低）、Key（调性）、BPM（节拍速度）、Tempo、Root Note、Sample Rate。
   - **Upload Audio 模态框**：Record Audio（录制音频）、Choose File（选择文件）、Start Time（起始时间）、End Time（结束时间）、Trim Audio、Supported formats。
   - **Extend 顺畅续写面板**：Extend from、Extend at、Part 1/2/3/4/5、Full Song、Get Whole Song。
   - **Audio Editor / Edit 编辑面板**：Crop Audio、Trim、Replace Section、Remove Section、Fade In、Fade Out、Adjust Speed、Playback Speed、Pitch Shift、Remaster、Reverse。
   - **Stems 分轨提取面板**：Get Stems、Separate Vocals and Instrumental、Vocal Stem、Instrumental Stem、Drums Stem、Bass Stem。
   - **歌曲上下文操作菜单 (Context Menu)**：Reuse Prompt、Reuse Style、Reuse Lyrics、Cover Song、Remix、Mashup、Sample this song、Create Persona、Download Audio/Video/Stems、Share、Add to Playlist、Publish/Unpublish、Move to Trash。
   - **Library 音乐库与批量管理**：Playlists、Trash、Liked、Shared、Sort by、Recently Played、Most Played、Select All、Deselect All、Batch Actions、Restore All、Delete Forever、Empty Trash。
   - **Settings 账户中心**：Account、Profile、Subscription、Credits、Billing History、Audio Quality、Theme (Dark/Light/System)、Language。
   - **全局通用对话框与按钮动作**：Confirm、Cancel、Save、Discard、Apply、Done、Close、Back、Next、Submit、Copy、Remove、Edit、Details、Info、Expand、Collapse、Filter、Retry、Refresh。
3. **版本号递增至 `1.5.0`**（严格遵守用户原则）。
4. **自动化回归与行为安全测试**：新增断言 16，实现 17 项断言 100% 通过。
