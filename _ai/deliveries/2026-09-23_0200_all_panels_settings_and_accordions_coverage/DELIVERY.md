# 交付报告 (DELIVERY.md)

## 任务目标与执行原则
- **用户指出问题**：“创作高级参数栏与折叠面板全量汉化，其他面板的高级参数栏和折叠的东西也得汉化呀！你不能只告诉你一个，你就汉化一个，哪有这么干活的呀”
- **执行原则**：全面反思并彻底改变“针对单一页面修修补补”的局限，对 Suno 全站的**所有其他面板、折叠栏、弹窗模态框、操作菜单及高级参数配置**展开地毯式全量覆盖，并升级通用 DOM 挂载引擎以实现所有动态弹窗与折叠层的无死角实时汉化。

---

## 全量覆盖的面板与功能模块详单

### 1. Sounds 声音生成模式专属高级面板
- `Loop`（循环播放）、`Looping`（循环播放中）、`One-shot`（单次触发）
- `Pitch`（音调高低）、`Key`（调性）、`Root Note`（根音）
- `BPM`（节拍速度 BPM）、`Tempo`（节拍速度）、`Length`（声音时长）、`Sample Rate`（采样率）

### 2. Upload Audio 参考音频与录音面板
- `Upload Audio`（上传参考音频）、`Upload an Audio File`（上传音频文件）
- `Record Audio`（录制音频）、`Record / Start Recording`（开始录音）、`Stop Recording`（停止录音）
- `Choose File / Select File`（选择文件）、`Upload`（上传）
- `Start Time`（起始时间）、`End Time`（结束时间）、`Trim Audio`（裁剪截取音频）
- `Extend from Upload`（从上传音频续写）、`Generate Song`（用此音频做歌）、`Separate Stems`（提取人声伴奏分轨）

### 3. Extend 顺畅续写高级面板
- `Extend`（顺畅续写下一段）、`Extend from`（从指定时间续写）、`Extend from this song`（从这首歌续写）
- `Extend at / Extend At`（续写起始点）、`Clear time`（清空时间）
- `Part`（片段）、`Part 1 ~ Part 5`（第 1 段 ~ 第 5 段）
- `Full Song`（完整整首）、`Get Whole Song`（合并整首歌）、`Add Part`（增加下一段）

### 4. Audio Editor 音频编辑、裁剪与微调面板
- `Crop Audio / Crop`（裁剪音频时长）、`Trim`（裁剪修剪）
- `Replace Section`（局部重做指定片段）、`Remove Section`（删掉指定片段）
- `Fade In`（开头声音渐渐变大）、`Fade Out`（结尾声音渐渐变小）
- `Adjust Speed`（调整整首歌快慢）、`Playback Speed`（播放速度）、`Pitch Shift`（微调升降调）
- `Remaster`（重新润色音质）、`Reverse`（声音倒放）、`Add Vocal`（给伴奏加人声）
- `Apply Changes`（应用更改）、`Discard Changes`（放弃更改）、`Preview / Preview Section`（试听预览/试听该片段）

### 5. Stems 分轨提取面板
- `Get Stems`（分轨提取）、`Separate Vocals and Instrumental`（分离人声与伴奏）
- `Vocal Stem`（人声分轨）、`Instrumental Stem`（伴奏分轨）、`Drums Stem`（鼓组分轨）、`Bass Stem`（贝斯分轨）、`Stems`（分轨文件）

### 6. 歌曲上下文操作菜单 (Context Menu / 三个点菜单)
- `Reuse Prompt`（一键复用提示词与参数）、`Reuse Style`（复用曲风提示词）、`Reuse Lyrics`（复用歌词）
- `Cover Song / Cover`（根据旋律翻唱新风格）、`Remix`（重新混音制作）、`Mashup`（两首歌揉合）
- `Sample this song / Sample`（截取一段当新歌素材/采样片段）、`Use as Inspiration`（拿这首歌的气氛当灵感）
- `Create Persona / Persona / Save Persona`（固定并保存专属歌手音色）
- `Download Audio (MP3)`、`Download Video (MP4)`、`Download Stems`（下载音频/视频/分轨打包）
- `Share`（分享歌曲）、`Copy Link`（复制歌曲链接）、`Embed`（嵌入播放器代码）
- `Add to Playlist`（添加到歌单）、`Remove from Playlist`（从歌单移除）
- `Publish`（发布到公开社区）、`Unpublish`（设为私密/取消公开）、`Make Public / Make Private`（设为公开/设为私密）
- `Move to Trash`（移入回收站）、`Delete`（删除）

### 7. Library 音乐库、歌单与批量管理面板
- `All / All Songs`（全部/全部歌曲）、`Songs`（歌曲）、`Playlists`（歌单列表）
- `Trash`（回收站）、`Liked`（我喜欢的歌）、`Shared`（分享给我的）
- `New Playlist / Create Playlist`（新建歌单/创建歌单）、`Playlist Title`（歌单名称）、`Playlist Description`（歌单介绍）
- `Sort by`（排序方式）、`Date Created / Date Added`（创建时间/添加时间）
- `Recently Played / Most Played / Most Liked`（最近播放/播放最多/点赞最多）
- `Newest First / Oldest First / Alphabetical`（最新在前/最早在前/按字母排序）
- `Select All / Deselect All`（全选/取消全选）、`Batch Actions`（批量操作）
- `Restore / Restore All`（恢复/全部恢复）、`Delete Forever`（彻底粉碎删除）、`Empty Trash`（清空回收站）

### 8. Explore 发现与社群榜单
- `Trending`（热门趋势榜）、`Top`（热门高分榜）、`New`（最新发布）、`Featured`（官方精选）、`Showcase`（创作者展台）
- `Community`（社群作品）、`Genres`（全部曲风流派）、`Top Creators`（人气创作者）
- `Play All`（全部播放）、`Shuffle`（随机乱序播放）、`Follow / Following / Followers`（关注/已关注/粉丝）
- `Queue / Clear Queue`（当前播放列表/清空播放列表）

### 9. Settings 账户设置与套餐面板
- `Account`（账户信息）、`Username`（用户名）、`Display Name`（显示昵称）、`Bio`（个人简介）、`Avatar`（头像设置）
- `Subscription`（会员订阅）、`Current Plan`（当前套餐）、`Free Plan / Pro Plan / Premier Plan`（免费/Pro/Premier套餐）
- `Credits Remaining`（剩余积分额度）、`Manage Subscription`（管理订阅套餐）、`Cancel Subscription`（取消订阅）
- `Billing History`（历史账单明细）、`Payment Method`（支付管理）、`Audio Quality`（导出音质）
- `Theme / Dark / Light / System`（外观主题/深色/浅色/跟随系统）、`Language`（语言偏好）

### 10. 全局通用对话框与按钮动作
- `Confirm`（确认）、`Cancel`（取消）、`Save / Save Changes`（保存/保存更改）、`Discard`（放弃）
- `Apply`（应用）、`Done`（完成）、`Close`（关闭）、`Back`（返回）、`Next`（下一步）、`Submit`（提交）
- `Copy / Copied`（复制/已复制）、`Remove`（移除）、`Edit`（编辑）、`View Details / Details / Info`（查看详情/详细信息/说明信息）
- `Expand / Collapse`（展开折叠/收起折叠）、`Show More / Show Less`（显示更多/显示更少）、`More / Less`（更多/收起）
- `Filters / Filter`（筛选过滤）、`Search`（搜索）、`Clear / Clear All`（清空/清空全部）、`Retry`（重试）、`Refresh`（刷新）

---

## 架构加固与技术改造
1. **DOM 扫描器全面泛化升级**：
   - 选择器扩展为全面覆盖：`a, button, [role="button"], [role="menuitem"], [role="tab"], [role="switch"], [role="option"], nav span, aside span, header span, div[role="tab"], summary, [class*="trigger"], [class*="accordion"], [class*="collapse"], [class*="collapsible"], h1, h2, h3, h4, h5, h6, label, span, [class*="label"], [class*="title"], [class*="setting"], [class*="param"], [class*="control"], [class*="option"], [class*="item"]`。
   - 保证任何动态弹窗（Modal）、侧滑栏（Drawer）、手风琴折叠（Accordion）、气泡菜单（Popover）中的标题、参数标签与按钮均被实时捕获。
2. **冒号与符号容错**：
   - 表单中常见的 `Pitch:`、`Key:`、`BPM:`、`Start Time:`、`Sort by:` 等末尾冒号在 `getCleanText` 中自动剥离，实现 100% 精准命中词典。
3. **版本号递增至 `1.5.0`**：
   - 同步升级 `package.json`、`scripts/build.js`、`dist/suno-copilot.user.js`、`dist/chrome-extension/manifest.json`。

---

## 验证与测试结果
- 自动化测试套件：`node scripts/test_dom_behavior.js`
- 覆盖全部 17 项断言（新增断言 16：包含全部 8 个专属面板的高级参数与操作测试）。
- 测试结果：**全部 17 项测试 100% 验证通过**。
- 打包构建：`node scripts/build.js`，全部产物更新成功。

---

## 交付文件清单
1. `src/core/injector.js`（全站 200+ 词条全量词典与泛化 DOM 扫描引擎）
2. `package.json`（版本递增至 1.5.0）
3. `scripts/build.js`（1.5.0 构建脚本）
4. `scripts/test_dom_behavior.js`（新增断言 16 全面板综合测试）
5. `dist/suno-copilot.user.js`（1.5.0 油猴脚本）
6. `dist/chrome-extension/`（1.5.0 Chrome 扩展完整包）
