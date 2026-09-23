# Suno 登录后整站点选记录（2026-09-22）

- **Task**: 在已登录的 Suno 上把能打开的菜单点开，记下英文，供词库和教程使用。用户允许制作音乐。
- **Result**: 点过顶栏、工作区、曲库筛选和排序、歌曲 `…` 的各层、创作栏三个模式，并在 Simple 里实际生成了一对歌。没有退出登录，没有确认删歌、举报、发布、提取分轨，也没有花 100 Credits 建自定义模型。
- **账号界面语言**: `More from Suno` → `Language` 当前是 `English`。列表里没有简体中文。主题当前是 `Dark`，另有 `Light`、`System`。

## 这次实际生成的歌

Simple 里输入：`A short cheerful acoustic guitar song about making tea on a quiet morning`，点 `Create song`。

曲库 `Today` 下出现两首，都标 `V6`：

- `My Favorite Cup of Tea`（约 1:55）
- `Tea for Two`（约 1:46）

一次生成出两首。教程里「生成两首、留更接近的那首」和这页一致。

歌曲页（`My Favorite Cup of Tea`）上，Suno 自己写出的歌词标记是：`[Verse 1]`、`[Chorus]`、`[Verse 2]`、`[Outro]`、`[Ending]`。风格先显示成小条 `folk`、`acoustic`，旁边是 `+ Show full styles`；点开后变成完整一句，按钮改成 `– Show Summary`。页上还有 `Edit`、`Download cover image`、`Edit song details`、`Copy styles to clipboard`、`Add a Caption`、`Lyrics`、`Comments`、`Copy lyrics to clipboard`、`Edit displayed lyrics`。生成过程中出现过 `Song rendering`。

## 顶栏 `More from Suno`

`Close`、`My Taste`、`Invite friends`、`Account`、`Restrictions`、`Subscription`、`Language`、`Theme`、`Hooks`、`Labs`、`Help`、`About`、`Blog`、`Feedback`、`Careers`、`Terms of Service`、`Privacy Policy`、`Your Privacy Choices`、`Sign Out`。

底下外链：`X`、`Instagram`、`YouTube`、`TikTok`、`Discord`。

侧栏（窄窗口里常收起，页面里仍在）：`Collapse sidebar`、`Home`、`Explore`、`Create`、`Studio`、`Library`、`Hooks`、用户名、`Earn Credits`、`Labs`、`More`、`Upgrade to Premier`。

`Studio` 的说明是 `Your complete creative workspace. Available with Premier.` 这个账号点进去没有进到工作室，回到了创作页。

## 工作区

`Workspaces` 里：`Search`、`View Archived`、`Create new workspace`。

当前 `My Workspace`，显示 `55 songs`（生成那两首之前）。另一个是 `好朋友们的创作`。归档列表是空的，按钮会改成 `View Workspaces`。新建框文案是 `Enter a name for your new workspace`，占位 `Untitled Workspace`，按钮 `Create Workspace`。别人工作区旁的菜单只有 `Move to Trash`，没有点。

## 曲库

`Filters (3)`：`Liked`、`Public`、`Uploads`、`Full Songs`、`Covers`、`Extensions`、`Voices`（旁注 `Filter to show only Voices`）、`Remasters`、`Downloads`、`Hide Disliked`、`Hide Stems`、`Hide Clips from Edit Mode`。

排序按钮显示 `New`，菜单是 `Newest`、`Oldest`、`Most liked`、`Least liked`。没有改当前筛选和排序。

## 歌曲一行上的 `…`

第一层：`Remix`、`Edit`、`Publish`、`Share`、`Download`、`Manage`、`Add to Queue`、`Add to Playlist`、`Song Radio`、`Report`、`Move to Trash`。

`Remix`：`Cover`、`Reuse Prompt`、`Mashup`、`Sample this song`、`Use as Inspiration`、`Voice`。

`Edit`：`Extend`、`Crop`、`Remove Section`、`Reverse`、`Adjust Speed`、`Get Human Help`、`Fade In`、`Fade Out`、`Add Vocal`、`Replace Section`、`Get Stems`、`Remaster`。

`Share`：`Copy Link`、`Share to...`。

`Download`：`MP3`、`WAV`、`MP4 video asset`、`Unlock & Download`。没有真正下载。

`Manage`：`Song Details`、`Create Cover Art`、`Allow Remixes`、`Allow Comments`、`Pin to Profile`、`Move to Workspace`。

`Publish` 打开的面板：`Delete`、`Upload`、`Create`、`Animate`、`Allow comments`、`Allow remix`、`Show Remix Origin`、`Pin song to profile`、`Edit caption, lyrics and styles`，以及 `Publish`。没有点发布。

`Get Stems` 打开的面板标题是 `Extract Stems and MIDI`。

- `Auto split`：`Auto extract from a list of 12 instruments.`
- `Split from mix`：出现 `Choose stem to split out`
- `Advanced split` 带 `New`，点开会升级框：`Choose exactly which instruments to extract. Available on Premier only.`

`Split from mix` 里见过的分轨名：`Drums`、`Bass`、`Backing Vocals`、`Piano`、`Electric Guitar`、`Percussion`、`Strings`、`Synth`、`Acoustic Guitar`、`Other`、`Synth Pad`、`Synth Bass`、`Guitar`、`Brass`、`Organ`、`Lead Guitar`、`Synth Keys`、`Rhythm Electric Guitar`、`Electric Piano`、`Upright Bass`、`Keyboards`。后面一大串标了 `Beta`，例如 `Kick`、`Snare`、`Vocoder`、`Violin`、`Choir`、`808`。没有点 `Extract`。

## 创作栏

三个标签：`Simple`、`Advanced`、`Sounds`。右上角模型仍是 `v6`。最底下按钮在三个标签里都叫 `Create song`。另有 `Clear all form inputs`。

`Simple` 的 `Add` 菜单：`Lyrics`、`Styles`、`Playlist`、`Image`、`Video`、`Audio`、`Voice`。`Audio` 下是 `Browse`、`Upload`、`Record`。空表单附近见过 `Drop here to remix`。

`Sounds`：`Dismiss`、`Sound`、输入框 `Describe the sound you want`、`Advanced Options`、`One-Shot`、`Loop`、数字框占位 `Auto`、`Any`。`Any` 是调性：音名 `C` `C#` `D` `D#` `E` `F` `F#` `G` `G#` `A` `A#` `B` 和 `Any`，标签 `Major` / `Minor`，按钮 `Apply`。没有点 Apply，也没有在 Sounds 里生成。

Advanced 的字段和上一份地图相同：Lyrics 留空等于纯音乐；`Duration` 的 `Custom` 是时长。

## 其它页面

- `Notifications`：`Settings`，空态 `No notifications here yet`。设置项：`Notifications`、`Interactions`、`Announcements`（`New features, remix contests and more`）、`Likes and plays on your posts`、`New posts from people you follow`、`New followers`、`Comments on your posts`、`Mentions`。没有改开关。
- 搜索框占位：`Search for songs, playlists, creators, or genres`。探索页区块：`Jump Back In`、`Liked Songs`、`Recently Played`、`Best of v6`、`Staff Picks`、`See all`。
- Hooks 是一条条短视频式作品，按钮是 `Follow`、`SAVE`、`REMIX`、`SHARE`。
- 个人页 `/@yaoyi_lawyer`：`Edit`、歌曲数、`followers`、`following`、`View all Songs`、`About`、`No bio added yet`。公开歌上仍能看到 `V4.5+`。创作页模型菜单里没有 v4.5 按钮。

## 给教程的用法

第一首歌按这页写：底部 `Create` → `Simple` 写一句英文，或 `Advanced` 自己填 Lyrics 和 Styles → `Create song`。生成后曲库出现两首。要改某一段，进歌曲 `…` → `Edit`，里面才有 `Extend`、`Crop`、`Replace Section`、`Remove Section`。`Get Stems` 是分轨，不在第一课。`Studio` 和 `Advanced split` 要 Premier。
