# Suno中文通 (Suno Copilot) · 技术架构与实现手册

---

## 一、 系统架构总览

本项目的核心技术原则是**“高内聚、低耦合、零外部重量级框架、极致轻量与高安全性”**。

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          Suno.com (宿主环境)                            │
│                  Next.js / React 异步渲染单页 Web 应用                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ 监听与穿透注入
┌───────────────────────────────────▼────────────────────────────────────┐
│ 核心引擎层 (Core Engine: injector.js)                                  │
│ 1. MutationObserver (带 250ms 防抖机制)                                 │
│ 2. 智能文本定位器 (正则匹配叶子节点，基于 data-sc-processed 防重复标记)   │
│ 3. 事件隔离器 (全量 e.stopPropagation，彻底杜绝穿透触发 Suno 原生事件) │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │ 读取数据                        │ 状态驱动
┌──────────────────▼─────────────┐   ┌───────────────▼───────────────────┐
│ 独立数据资产 (Data Layer)       │   │ 平板触控展示层 (UI Component)     │
│ 1. glossary.json (5大类五维库)  │   │ 1. suno-copilot-badge (?号徽标)   │
│ 2. export_review.js            │   │ 2. suno-copilot-card (三层毛玻璃) │
│ 3. Music_Expert_Review_Sheet.md│   │ 3. 🎵 浮动速查抽屉 (Drawer)       │
│    (支持外部音乐家随时校对)     │   │ 4. S-Pen 悬浮 (150ms 缓冲防闪)    │
└────────────────────────────────┘   └───────────────────────────────────┘
```

---

## 二、 核心机制技术规格

### 1. 动态 DOM 监听与防雪崩
- **背景**：Suno 采用 React/Next.js 架构，页面路由切换（如从 Discover 切换到 Create）、打开抽屉、生成新歌曲时，DOM 会局部剧烈重绘。
- **实现方案**：
  - 使用 `MutationObserver` 监听 `document.body` 的 `childList` 与 `subtree`；
  - 配合 **250ms 防抖函数（Debounce）**，避免在列表滚动加载或快速打字时频繁触发 DOM 遍历；
  - 每个处理过的节点标记 `el.dataset.scProcessed = "true"`，保证时间复杂度恒定，不产生内存泄漏。

### 2. 三星平板 S-Pen 悬浮与手指触控双模状态机
- **W3C Pointer Events 适配**：
  ```javascript
  // 识别笔尖悬浮
  badge.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'pen' || e.pointerType === 'mouse') {
      hoverTimer = setTimeout(() => {
        showCard(item, badge);
      }, 150); // 150ms 缓冲防闪烁
    }
  });

  badge.addEventListener('pointerleave', (e) => {
    clearTimeout(hoverTimer);
    if (!isPinned) hideCard();
  });
  ```
- **轻触钉住机制（Pinning）**：
  - 手指轻触或笔尖点击徽标，卡片进入 `isPinned = true` 状态；
  - 钉住后，卡片不会因光标/笔尖移开而消失；
  - 点击卡片右上角 `✕`、点击遮罩或页面空白处恢复关闭。

### 3. 事件隔离安全规范
- **防误触保证**：
  所有与扩展相关的点击（点击徽标、点击卡片内部、点击复制按钮），必须显式调用：
  ```javascript
  e.stopPropagation();
  ```
  避免点击 `[?]` 时意外触碰其底层父元素（例如触发 Suno 的提交生成、暂停播放等原生行为）。

---

## 三、 知识库数据规范 (Schema)

所有术语必须遵循以下严格的 JSON Schema 格式存储于 `glossary.json`：

```json
{
  "id": "唯一标识 (全英文小写下划线，如 bridge)",
  "term": "界面英文原文 (如 [Bridge])",
  "category": "分类: ui_core | song_structure | vocals_performance | genres_and_styles | production_params",
  "zh_name": "中文直译或业界公认译名 (如 桥段 / 过渡转折段)",
  "tier1_vernacular": "【第一层】大白话生活通俗比喻与听感解释",
  "tier2_suno_usage": "【第二层】在 Suno 网页中的实战填法与操作技巧",
  "tier3_example": "【第三层】示例代码或代表性效果展示",
  "prompt_tag": "点击可直接复制的纯净标签 (如 [Bridge])",
  "expert_status": "校对状态: draft (草稿) | reviewed (已校对) | approved (已定稿)",
  "expert_notes": "音乐老师/制作人的校对意见"
}
```

---

## 四、 跨电脑迁移与开发指引

### 1. 项目完整文件结构
```text
suno-copilot/
├── PROJECT_SPEC_AND_GOALS.md        # 项目目标与决策全纪录
├── TECHNICAL_ARCHITECTURE.md        # 本技术手册
├── Music_Expert_Review_Sheet.md     # 音乐专业人士校对评审表
├── Music_Expert_Review_Sheet.csv    # 音乐专业人士校对表格 (Excel版)
├── scripts/
│   ├── build.js                     # 自动化打包与图标生成脚本
│   ├── export_review.js             # 词库导出与表格生成脚本
│   └── test_dom_behavior.js         # 自动化 DOM 行为与隔离测试
├── src/
│   ├── data/
│   │   └── glossary.json            # 独立核心知识库资产
│   ├── core/
│   │   └── injector.js              # DOM 注入与事件引擎
│   └── ui/
│       └── styles.css               # 毛玻璃与平板适配样式表
└── dist/
    ├── suno-copilot.user.js         # 单文件油猴脚本 (平板即装即用)
    └── chrome-extension/            # 标准 Chrome 扩展目录
        ├── manifest.json
        ├── content.js
        └── styles.css
```

### 2. 如何在新电脑上继续开发
1. 将 `suno-copilot` 文件夹拷贝至新电脑的任意本地目录；
2. **免依赖开发**：本项目纯原生 JS/CSS 开发，不需要安装庞大的 node_modules，随拷随用；
3. **测试方法**：
   - 方式 A（最方便）：将 `dist/suno-copilot.user.js` 的内容直接复制进浏览器 Tampermonkey（油猴）插件中，打开 `suno.com` 即可实时调试；
   - 方式 B：在 Chrome 浏览器打开 `chrome://extensions/`，打开“开发者模式”，点击“加载已解压的扩展程序”，选中 `dist/chrome-extension/` 文件夹即可。
