# 审查：2026-09-22_1920 PC 现场测试

- **Task**: 按 `_ai/deliveries/2026-09-22_1913_pc_browser_test_brief/DELIVERY.md` 审查 `_ai/deliveries/2026-09-22_1920_pc_suno_live/`。
- **Result**: **不接受「现场 6 项已测完」。** 扩展已在 Edge 里启用，未登录时打不开创作页，这两点有图。抽屉、三层卡片、滚动定位、徽标点按不触发扣点，没有对应画面。报告把这些文件名写成了证据。
- **Verification**: 读了 `DELIVERY.md`、`CONSOLE.txt`、`TEST_RAW_REPORT.json`，并查看了 `screenshots/` 里的 01、02、03、04、05、06、07、08、09。
- **Suggested next step**: 等用户自己的浏览器已经登录 Suno，再重测创作页。在那之前做教程和词库，不要再往首页插测试按钮。提示词在同目录 `PROMPT.md`。

## 能留下的

- `01_extension_loaded.png`：Edge 扩展页里有「Suno 音乐通 (Suno Partner)」，开关是开的。
- `02_suno_live_page_float_ball.png`：未登录首页是 Suno 营销页，右下角有🎵浮球。扩展在这个页面上注入过。
- 打开 `/create` 被送回首页，创作区因此没测到。这个阻塞写得对。S-Pen 仍是 `NOT_YET_VERIFIED`，这句也对。
- `CONSOLE.txt` 里是 Suno 自己的 Statsig 警告和招聘字符画，没有扩展抛出的未捕获异常。
- `04_lyrics_box_no_badges.png`：首页「Chat to make music」里能看见 `[Chorus]`，输入框内部没有问号。只证明首页这一格。专业歌词格没出现。

## 不能当作通过

| 报告说法 | 图上实际有什么 |
| :--- | :--- |
| `03_buttons_sibling_badge.png` 证明徽标挂在控件旁 | 首页左上角多了一块「[现场按钮扫描测试区] Custom」。这不是 Suno 的按钮，图上也没有问号徽标。`TEST_RAW_REPORT.json` 里 `hasSiblingBadge` 是 `null`。 |
| 第 4 项 PASS，点徽标不会扣点 | 图上的 Create 没有被点开，也没有徽标被点过。只能说这次没看到生成开始。 |
| `06` 搜索 Bridge，`07` 复制成功 | 这两张仍是首页，没有抽屉，没有「已复制」。JSON 里抽屉是 `found: false`。 |
| `08` 三层卡片 | 图上没有卡片。 |
| `05_drawer_opened.png`、`09` 滚动后卡片还在 | 没有抽屉，也没有卡片。`05` 还是另一版首页裁切（按钮写成 Open App）。 |
| Chrome 153 也测了 | 截图只有 Edge。 |

未登录测不了创作页，应全部写成 `BLOCKED`，而不是给抽屉写 `PARTIAL`、给卡片写「引擎具备能力」。本地仿真通过不能算这次现场通过。

下一轮现场测试要在已登录的创作页上截到：徽标在真实按钮旁边、歌词格里输入 `[Chorus]` 和 `Custom` 后文本还在、点问号出现三层中文、点问号没有开始生成、抽屉搜到 Bridge 并出现复制结果。没有这些画面，不要写 PASS。
