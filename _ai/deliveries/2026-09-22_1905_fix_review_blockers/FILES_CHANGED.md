# 本轮修复文件与产物清单 (Files Changed & Produced)

## 1. 核心代码修复 (`src/`)
- `src/core/injector.js`:
  - 注入范围严密收敛：仅匹配 `category === 'ui_core'`，选择器限制为 `button, [role="button"], label`；
  - 增加可编辑黑名单：排除 `[contenteditable="true"]`, `input`, `textarea`, `[role="textbox"]`；
  - 挂载结构变更：从原先的 `appendChild` 到按钮内部，改为创建 `.suno-copilot-companion` 作为兄弟节点并列挂载；
  - 卡片定位修复：纯视口 fixed 定位，移除 `window.scrollX` / `window.scrollY` 累加；
  - 悬停防闪平滑：进入 150ms 缓冲，移出 200ms 延迟关闭，光标移入卡片时清除定时器保持展开；
  - 第三层完整呈现：渲染 `tier3_example` 正文与代码块；纯界面项渲染 `.sc-ui-tip` 操作提示而非虚假复制条；
  - 复制真实反馈：`async copyToClipboard`，失败抛错捕获后弹出 `.error` 警告 Toast。
- `src/ui/styles.css`:
  - 添加 `.sc-tier3-example`（深色代码块，换行与等宽字体）；
  - 添加 `.sc-ui-tip`（界面操作项说明栏）；
  - 添加 `.sc-toast.error`（红色警告样式）；
  - `#suno-copilot-card` 滚动条与最大高度适配。
- `src/data/glossary.json`:
  - `belting` 术语名称由“怒音”纠正为“真声高唱 (不用假声的实音高音)”，听感与实操解释同步订正；
  - UI 核心功能项清空无效 `prompt_tag`（`Custom Mode: ON`、`Inpainting` 等被清空）；
  - 移除提示词中的真实艺术家姓名 `hans zimmer`、`afterlife`。

## 2. 自动化脚本与测试 (`scripts/`)
- `scripts/test_dom_behavior.js`: 纯 Node.js 的标准 W3C 冒泡行为仿真测试套件，断言父按钮防触、歌词区防改、三层正文、复制失败与定位。
- `scripts/build.js`: 打包完成后使用 `fs.statSync` 读取实际磁盘文件字节数。
- `scripts/export_review.js`: 从最新词库导出 Markdown 与带 UTF-8 BOM 的 Excel CSV 评审表。

## 3. 分发产物 (`dist/`)
- `dist/suno-copilot.user.js`: 重新编译打包的单文件油猴脚本。
- `dist/chrome-extension/content.js`: 重新编译打包的内容脚本。
- `dist/chrome-extension/styles.css`: 同步更新的扩展样式表。
- `dist/chrome-extension/manifest.json`: Manifest V3 配置文件。
- `dist/chrome-extension/icon16.png`, `icon48.png`, `icon128.png`, `icon.png`: 图标资产。

## 4. 文档与配置
- `package.json`: 移除 `import-review`，配置 `test`、`build`、`export-review`、`all`。
- `README.md`: 明确知识库单一数据源规则与只读导出机制，标记现场环境未验证状态。
- `TECHNICAL_ARCHITECTURE.md`: 修正脚本引用名称并补充测试脚本说明。
- `Music_Expert_Review_Sheet.md`: 最新 50 词条校对评审表。
- `Music_Expert_Review_Sheet.csv`: 最新 50 词条 Excel 兼容评审表格。
