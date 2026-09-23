# DELIVERY: 修复审查阻断项 (B1–B4) 与 DOM 行为验证交付

- **Task**: 落实审查目录 `2026-09-22_1844_review_first_build` 与 `2026-09-22_1857_review_fix_plan` 提出的硬性约束，彻底修复 B1–B4 问题：
  1. 徽标注入范围收敛至仅 `ui_core`，仅匹配 `button`、`[role="button"]`、`label`，且以独立兄弟节点方式挂载在控件旁，绝不插进按钮内部改写 DOM；
  2. 保护 `[contenteditable]`、`input`、`textarea`、`[role="textbox"]`，确保歌词区 0 篡改；
  3. 卡片坐标改用纯视口 fixed 定位（移除 `window.scrollX` / `scrollY` 累加），增加双向悬停 200ms 防抖过渡；
  4. 卡片完整渲染第三层 `tier3_example` 正文，纯界面项不渲染无效复制条；
  5. `[Belting]` 修正为通俗公认的“真声高唱”，词库提示词剔除 `hans zimmer`、`afterlife` 等艺术家违规词；
  6. 复制失败抛错时 Toast 真实警告，杜绝虚报“已复制”；
  7. 产物大小使用实际磁盘 `fs.statSync` 测量，去除假想指标；
  8. 去除不成熟的 `import_review.js` 反向导入，明确 `glossary.json` 为唯一事实源，审查表为单向导出；
  9. 新增纯 Node.js 的 `scripts/test_dom_behavior.js` 自动化行为仿真测试并全部跑通。
- **Result**: **全部目标整改完毕，自动化测试 5/5 项断言 100% 通过。**
- **Files Changed or Produced**:
  - `src/core/injector.js`: 重构注入算法（兄弟节点挂载、纯视口定位、双向悬停防抖、第三层完整呈现、异步真实复制异常捕获）。
  - `src/ui/styles.css`: 补充第三层代码块样式 `.sc-tier3-example`、界面操作提示条 `.sc-ui-tip`、错误 Toast 警告样式 `.sc-toast.error`。
  - `src/data/glossary.json`: 纠正 `belting` 译名与解释，清理 UI 功能项无效复制标签，移除艺术家姓名。
  - `scripts/build.js`: 引入 `fs.statSync` 打印真实磁盘文件字节，重新全量编译 `dist/`。
  - `scripts/test_dom_behavior.js`: 模拟 W3C 真实事件传播链路，断言父按钮防触、歌词编辑区防改、三层正文渲染、复制异常与定位。
  - `package.json`: 移除 `import-review`，集成 `test` 脚本。
  - `README.md`: 明确知识库维护流转规则，标注现场未验证项。
  - `TECHNICAL_ARCHITECTURE.md`: 修正脚本名称为 `export_review.js` 并补齐测试脚本。
  - `Music_Expert_Review_Sheet.md` & `Music_Expert_Review_Sheet.csv`: 重新从最新词库全量导出。
- **Verification Performed and Result**:
  - `node scripts/test_dom_behavior.js`: **PASS (5/5)**
    - 断言 1 (歌词区保护): `contenteditable` 文本前后 100% 一致，徽标 0 注入；
    - 断言 2 (事件隔离): 徽标作为独立兄弟节点呈现，点击徽标后父级 `<button>` 的 `click` 与 `pointerdown` 严格为 0；
    - 断言 3 (三层完整性): 卡片 DOM 节点同时包含 `tier1_vernacular`、`tier2_suno_usage` 与 `tier3_example` 正文；
    - 断言 4 (真实复制): 剪贴板抛错时 Toast 带有 `.error` 类，内容为“复制未成功”，绝无“已复制”；
    - 断言 5 (Fixed 定位): `style.left` 与 `style.top` 不含 `window.scrollX` / `scrollY` 滚动量。
  - `node scripts/build.js`: **PASS (Exit code: 0)**
  - `node scripts/export_review.js`: **PASS (Exit code: 0)**
- **Important Blockers / Known Issues**:
  - 本地仿真测试通过，但真实生产环境 `https://suno.com/` 的现场 DOM 结构与真实三星 S-Pen 硬件交互：`NOT_YET_VERIFIED`。
- **Original Project Paths for Relevant Files**:
  - `src/core/injector.js`
  - `src/ui/styles.css`
  - `src/data/glossary.json`
  - `dist/suno-copilot.user.js`
  - `dist/chrome-extension/`
  - `scripts/test_dom_behavior.js`
  - `scripts/build.js`
  - `scripts/export_review.js`
  - `package.json`
  - `README.md`
  - `TECHNICAL_ARCHITECTURE.md`
- **Suggested Next Step**:
  - 待后续在真实具备三星 S-Pen 的平板设备（如运行 Kiwi Browser）或 Chrome 开发者模式下访问 `suno.com` 做真实网络环境联调验证。
