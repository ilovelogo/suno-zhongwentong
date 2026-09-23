# Suno 音乐通 (Suno Partner / Copilot)

> 专为**零音乐基础创作者**与**安卓大屏平板（三星 S-Pen 悬浮与触控）**打造的 Suno.com 伴侣工具。  
> 彻底解决三大痛点：全英文看不懂、普通机翻错误百出、音乐专业术语理解门槛高。  
> 核心武器：**五大维度三层通俗白话卡片**（人话听感 + Suno 实操 + 提示词代码），纯净查看、一触复制。

---

## 📂 目录导航与核心资产

1. **[PROJECT_SPEC_AND_GOALS.md](./PROJECT_SPEC_AND_GOALS.md)**  
   *项目目标与决策全纪录*：详细记录为什么网页端强于 App 端、为什么采用纯净复制、S-Pen 150ms 悬浮缓冲防误触等关键决策。

2. **[TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md)**  
   *系统技术架构与实现手册*：解析 MutationObserver 监听引擎、双模状态机、事件隔离安全规范及跨电脑迁移指引。

3. **[Music_Expert_Review_Sheet.md](./Music_Expert_Review_Sheet.md)**  
   *音乐专业人士专属校对评审表 (Markdown 版)*：包含排版好的 50 个核心词条，带有专属批注框，可直接发给音乐老师/制作人校对。

4. **[Music_Expert_Review_Sheet.csv](./Music_Expert_Review_Sheet.csv)**  
   *音乐专业人士专属校对评审表 (Excel/WPS 版)*：带 UTF-8 BOM 编码，双击即可在 Excel / WPS 打开，绝不乱码。

5. **`src/data/glossary.json`**  
   *核心知识库唯一数据源*：与业务代码完全解耦的 50 个全维结构化词目，所有修改均以此文件为准。

6. **`dist/suno-copilot.user.js`**  
   *单文件油猴脚本*：零依赖，可在安卓平板的 Kiwi 浏览器或电脑端 Tampermonkey 中即装即用。

7. **`dist/chrome-extension/`**  
   *标准 Chrome / Edge 扩展包*：带 Manifest V3 与 16/48/128 图标，可在电脑浏览器以开发者模式直接加载。

8. **`scripts/` 工具链**  
   - `build.js`：一键编译打包油猴脚本与 Chrome 扩展包，测量实际磁盘文件字节；
   - `export_review.js`：从 `glossary.json` 一键导出最新的 Markdown 与 Excel CSV 评审表；
   - `test_dom_behavior.js`：自动化 DOM 行为仿真、可编辑区防篡改及事件冒泡隔离验证套件。

---

## 🛠️ 一键自动化构建与更新指令

本项目纯原生零外部依赖，使用 Node.js 即可完成构建、测试与导出：

```bash
# 1. 运行自动化 DOM 行为仿真与安全隔离测试
node scripts/test_dom_behavior.js

# 2. 一键编译并同步 dist 产物
node scripts/build.js

# 3. 一键导出最新的 Markdown 与 Excel CSV 专家校对表
node scripts/export_review.js

# 或者使用复合命令
npm.cmd run all
```

---

## 🚀 快速上手与真机体验

### 方案 A：在安卓平板上使用（推荐三星平板 + Kiwi Browser）
1. 在平板的应用商店或官网下载安装 **Kiwi Browser**（基于 Chromium 内核，原生支持 Chrome 扩展与油猴）；
2. 在 Kiwi 浏览器中打开 Chrome 网上应用店，安装 **Tampermonkey（油猴）** 插件；
3. 打开 Tampermonkey 管理面板，点击“添加新脚本”，将本项目中的 `dist/suno-copilot.user.js` 代码全选复制粘贴进去并保存；
4. 在 Kiwi 浏览器中访问 `https://suno.com/`：
   - 制作人按钮旁会出现独立的中文小标题与高亮 `[?]` 徽标（作为兄弟节点排列，绝不进入按钮内部改写 DOM）；
   - 使用 **S-Pen 笔尖悬停**在徽标上方 0.15 秒，即可预览三层白话卡片；移入卡片阅读时自动保持展开；
   - 用手指轻触或笔尖点击徽标，卡片即锁定钉住，轻点提示词标签即可一键复制；
   - 屏幕右下角常驻 🎵 小浮标，轻触可展开常用歌词结构、人声技巧与流派速查抽屉（支持实时关键词搜索）。

### 方案 B：在电脑端 Chrome / Edge 上使用
1. 打开浏览器，地址栏输入 `chrome://extensions/`（Edge 输入 `edge://extensions/`）并回车；
2. 开启右上角的 **“开发者模式 (Developer mode)”**；
3. 点击左上角的 **“加载已解压的扩展程序 (Load unpacked)”**；
4. 选择本项目中的 `dist/chrome-extension/` 文件夹；
5. 打开 `https://suno.com/` 即可立即体验。

---

## 🎵 知识库五大分类架构 (50 核心词条)

- **一、制作人核心功能 (UI Core)**：`Custom`、`Instrumental`、`Extend`、`Get Stems`、`Reuse Prompt`、`Replace Section`、`Crop Audio`、`Create Persona`、`Exclude Styles`、`Weirdness`、`Cover Song`、`Upload Audio`、`Model v3.5/v4` 等。
- **二、歌曲结构骨干 (Song Structure)**：`[Intro]`、`[Verse]`、`[Pre-Chorus]`、`[Chorus]`、`[Bridge]`、`[Drop]`、`[Hook]`、`[Guitar Solo]`、`[Piano Solo]`、`[Build-Up]`、`[Breakdown]`、`[Outro]`、`[Fade Out]` 等。
- **三、演唱风格与人声情绪 (Vocals & Performance)**：`[Whisper]`（耳语气声）、`[Belting]`（真声高唱）、`[Falsetto]`（空灵假音）、`[Spoken Word]`（念白独白）、`[Harmonies]`（多声部和声）、`[Vibrato]`（情感颤音）、`[Ad-lib]`（即兴垫音）、`[Call and Response]`（呼应对唱）、`[Chant]`（万人呐喊）等。
- **四、主流曲风与流派氛围 (Genres & Moods)**：`Lo-fi`、`City Pop`、`Synthwave`、`Melodic Techno`、`Shoegaze`、`Math Rock`、`Trap`、`R&B Ballad`、`Indie Folk`、`Future Bass`、`Cinematic Orchestral` 等。
- **五、编曲与声学制作参数 (Production Parameters)**：`BPM`（节拍心率）、`Key`（大调明亮/小调忧伤）、`Reverb`（空间混响）、`Acoustic vs Electronic`（原声与电子偏好）等。

---

## 🤝 协作与校对流转规则

1. **唯一事实源**：`src/data/glossary.json` 是词库的唯一权威源头；
2. **导出材料**：`Music_Expert_Review_Sheet.md` 与 `Music_Expert_Review_Sheet.csv`（带 UTF-8 BOM，Excel 双击不乱码）为只读审阅导出物；
3. **校对维护**：外部专家在表格最后一列填写的批注建议，由维护团队人工核对后录入 `glossary.json`，再执行 `node scripts/export_review.js` 重新导出；本版本**不设**自动化反向覆盖脚本，防止专家自由文本误冲掉词库结构；
4. **验证状态声明**：目前代码通过本地 Node 自动化 DOM 仿真验证，`https://suno.com/` 现场实际 DOM 与真实平板三星 S-Pen 硬件交互标记为 `NOT_YET_VERIFIED`。
