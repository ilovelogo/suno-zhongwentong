# Suno 创作页英文界面地图（2026-09-22 已登录）

- **Task**: 在已登录的 `https://suno.com/create` 上记下菜单位置和按钮英文，供后面写教程。
- **Result**: 看完创作栏的 Simple / Advanced / Sounds、模型菜单、曲库每一行，以及歌曲「…」里的 Remix 子菜单。没有点生成，没有改模型，没有删歌。
- **窗口**: 这次浏览器偏窄，创作栏会盖住曲库；关掉创作栏后，底部是一条导航。宽屏时曲库在左、创作栏在右，底部那条可能收起。下面按「人在哪」来写。
- **还没点开**: 歌曲菜单里的 Edit、Publish、Download、Manage 各自的下一级。Extend、Get Stems、Crop、Replace Section、Persona 这几个旧词，这一屏没有直接出现。标成 `UNKNOWN`，教程先不要写死它们的位置。

## 1. 整页怎么分

底部一条，从左到右的无障碍名称是：

`Hooks` · `Home` · `Create` · `Library` · `Profile`

当前停在 Create。曲库和创作栏在同一页，地址仍是 `/create`。

顶上：

- `Search`
- `Notifications`
- `More from Suno`（三个点）

曲库顶上：

- `Workspaces`，当前是 `My Workspace`
- `Open search`
- `Filters (3)`
- 排序 `New`
- 翻页 `Previous page` / `Current page number` / `Next page`

Filters 里见过这些英文：`Liked`、`Public`、`Uploads`、`Full Songs`、`Covers`、`Extensions`、`Voices`、`Remasters`、`Downloads`、`Hide Disliked`、`Hide Stems`、`Hide Clips from Edit Mode`。

## 2. 创作栏顶部

三个模式：`Simple` · `Advanced` · `Sounds`

右上角模型按钮现在显示 `v6`。点开后是：

| 英文 | 旁边的说明 |
| :--- | :--- |
| `Create Custom Model` | `Beta`。`Create a model based on your uploads (100 Credits)`。会花点数，教程不要让人随便点。 |
| `v6` `Pro` | `Powerful. Versatile. Refined. Our best model yet.` 当前勾着这个。 |
| `v6-wild` `Pro` | `Best for experimental ideas.` |
| `v6-mini` | `A free, more efficient version of premium v6 models.` |

没有 v3.5，也没有单独一个叫 v4 的按钮。

最底下始终是垃圾桶 `Clear all form inputs`，以及 `Create song`。空表单时 `Create song` 是灰的。

## 3. Simple

给人一句话用的。

- `+ Audio`：`Add audio - Browse, upload, or record audio`
- `+ Voice`：`Add Voice`
- `+ Image`：`Add an image to your creation`
- 中间一个大输入框
- `Add`

这里没有歌词格，也没有 Styles。教程如果要教「自己写词、自己贴风格」，应把人带到 Advanced，不要停在 Simple。

## 4. Advanced

从上到下：

1. `+ Audio`、`+ Voice`、`+ Inspo`（`Add inspiration from a playlist`）
2. **Lyrics**  
   占位句：`Start writing lyrics, or leave this empty for instrumental`  
   字数：`0 of 5000 characters used`  
   工具：`Undo`、`Redo`、`New draft`、`Saved lyrics`、`Open full screen lyrics editor`  
   写词助手标题是 `Lyricist`。里面有 `Help me write lyrics`、`Cowriter prompt`，以及 `Write a rap verse`、`Write an emo song`、`Write a reggae song`、`Write an R&B ballad`、`Write a power ballad`。助手自己的按钮叫 `Generate`，和整首的 `Create song` 不是同一个。
3. **Styles**  
   输入框占位是一串风格举例：`balada romántica, chill hop, classical pop, bongo drum, r&b trap`  
   `View saved style prompts`  
   `Personalize style prompt to match your taste`  
   `Refresh recommended styles`  
   下面是可点的 `Add style: …` 小条。
4. **More Options**（这一组在表单里，不是歌曲上的「…」）  
   - `Exclude styles`  
   - `Vocal Gender`：`Male` / `Female`  
   - `Duration`：`Custom` / `Auto`。这里的 Custom 是时长，不是「自定义模式」。  
   - `Max Mode`：`Off` / `On`  
   - 滑块 `Weirdness`，旁边写着 `Expected results`，当前约 `50%`  
   - 滑块 `Style Influence`，旁边写着 `Moderate`，当前约 `50%`  
   - 滑块 `Variety`，旁边写着 `Balanced variety` / `Normal`  
   - `My Taste`，旁边还有一组 `Off` / `On`  
   - `Song Title (Optional)`  
   - `My Workspace`

纯音乐：歌词留空，不是去找一个叫 Instrumental 的开关。

## 5. Sounds

做一段声音，不是一整首歌的主路径。

- `Sound`
- 输入框 `Describe the sound you want`
- `Advanced Options`
- `One-Shot` / `Loop`
- 数字框占位 `Auto`
- `Any`

第一首完整歌的教程可以不进这个标签。

## 6. 曲库里每一首歌

封面、播放、歌名、`Edit title`、红色的 `v6`、一行风格描述。

一排小按钮的无障碍名称：

`Like clip` · `Dislike clip` · `Share clip` · `Remix` · `More options`（圆点 …）

有的歌上还有人名链接，例如声音来源。点 `…` 之后第一层是：

`Remix` · `Edit` · `Publish` · `Share` · `Download` · `Manage` · `Add to Queue` · `Add to Playlist` · `Song Radio` · `Report` · `Move to Trash`

`Remix` 展开后是：

`Cover` · `Reuse Prompt` · `Mashup` · `Sample this song` · `Use as Inspiration` · `Voice`

`Edit` 的下一级这次没打开，里面有没有 Extend、Crop、Stems，标 `UNKNOWN`。

## 7. 写教程时直接换掉的旧说法

| 旧稿里的说法 | 这页上实际该怎么指 |
| :--- | :--- |
| 打开 Custom | 点底部 `Create`，再点 `Advanced` |
| Instrumental 开关 | Lyrics 留空 |
| Style of Music | `Styles` |
| 模型 v3.5 / v4 | 右上角 `v6` / `v6-wild` / `v6-mini` |
| 按钮上的 Custom = 自定义模式 | `Duration` 里的 `Custom` 是时长 |
| Extend、Get Stems、Crop、Replace Section、Persona | 这页没见到这些英文，先不要写进前六步 |
| Reuse Prompt、Cover | 在歌曲 `…` → `Remix` 里 |
| Exclude styles、Weirdness | 在 Advanced → `More Options` 里 |
