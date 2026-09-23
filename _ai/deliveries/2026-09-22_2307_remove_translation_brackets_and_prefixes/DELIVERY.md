# Delivery: 2026-09-22_2307_remove_translation_brackets_and_prefixes

## 1. 任务概述 (Task)
响应用户最新指令：
> “去掉所有翻译中的"(",")","[中文]"”

全面清除界面中所有汉化注记的括号 `(`、`)` 以及前缀 `[中文]` / `【中文】`，让视觉呈现更加纯净、自然与扁平化。

## 2. 交付结果 (Result)
1. **清除制作人控件辅助副标题的括号**：
   - 原 `(自定义模式)` ➔ 现纯净呈现 `自定义模式`。
   - 正则自动清洗 `item.zh_name` 中的中英文括号。
2. **清除左侧主导航与顶部模式按钮的括号**：
   - 原 `(首页)`、`(发现探索)`、`(创作音乐)`、`(筛选 (3))` ➔ 现纯净呈现 `首页`、`发现探索`、`创作音乐`、`筛选 3`。
3. **清除输入框占位符的括号**：
   - 原 `Search (搜索歌曲/风格...)` ➔ 现扁平点号连接 `Search · 搜索歌曲/风格...`。
   - 歌词与风格输入框占位符同步转为纯净中英文分隔。
4. **清除歌曲列表灰色描述的 `[中文]` / `【中文】` 前缀与括号**：
   - 原 `【中文】欢快原声木吉他民谣，轻松惬意` ➔ 现纯净呈现 `欢快原声木吉他民谣，轻松惬意`。
   - 原词库中的 `电子舞曲 (EDM)` ➔ `电子舞曲 EDM`，`都市流行 (City Pop)` ➔ `都市流行 City Pop`。
5. **构建与测试同步更新**：
   - 重新编译打包生成 `dist/chrome-extension/content.js` 与 `dist/suno-copilot.user.js`。
   - `scripts/test_dom_behavior.js` 全 8 项自动化断言 100% 验证通过。

## 3. 验证执行与结果 (Verification Performed & Result)
执行测试：
```bash
node scripts/test_dom_behavior.js
```
测试结果：
- ✅ 断言 1 通过: 歌词 contenteditable 的 textContent 扫描前后 100% 一致，内部 0 徽标注入。
- ✅ 断言 2 通过: 徽标作为独立兄弟节点呈现，点击徽标后父级 <button> 的 click 与 pointerdown 计数严格为 0。
- ✅ 断言 3 通过: 卡片 DOM 同时完整包含该词条的 tier1_vernacular、tier2_suno_usage 与 tier3_example。
- ✅ 断言 4 通过: 剪贴板抛错时 Toast 真实反映失败警告，杜绝虚假“已复制”。
- ✅ 断言 5 通过: position: fixed 采用纯视口坐标，不掺杂 window.scrollX / scrollY。
- ✅ 断言 6 通过: 左侧导航与筛选按钮成功呈现双语汉化副标题（无括号）。
- ✅ 断言 7 通过: 歌曲列表灰色描述准确翻译为纯净中文（无 [中文] 前缀），原英文描述 100% 完整保留。
- ✅ 断言 8 通过: 输入框 placeholder 成功补充中文指引且无副作用。
**全部 8 项断言 100% 通过**。

## 4. 相关文件原始路径 (File Paths)
- 核心逻辑: `d:/Projects/Suno_Copilot/src/core/injector.js`
- 样式定义: `d:/Projects/Suno_Copilot/src/ui/styles.css`
- 测试套件: `d:/Projects/Suno_Copilot/scripts/test_dom_behavior.js`
- 扩展产物目录: `d:/Projects/Suno_Copilot/dist/chrome-extension/`
- 油猴脚本产物: `d:/Projects/Suno_Copilot/dist/suno-copilot.user.js`

## 5. 建议后续操作 (Suggested Next Step)
1. 在 Edge 扩展页面（`edge://extensions/`）找到 **Suno 音乐通**，点击 **“重新加载 (Reload)”** 图标。
2. 切回 Suno 标签页（`https://suno.com/create`），按 **F5** 刷新页面即可查看完全去除括号与 [中文] 前缀后的纯净双语界面。
