# 贡献指南 / Contributing Guide

感谢你对 **Suno中文通** 感兴趣！欢迎任何形式的贡献。

---

## 🐛 报告 Bug

请使用 [Bug 报告模板](https://github.com/ilovelogo/Suno%E4%B8%AD%E6%96%87%E9%80%9A/issues/new?template=bug_report.yml) 提交 Issue，尽量提供平台信息和复现步骤。

## ✨ 建议新功能

请使用 [功能建议模板](https://github.com/ilovelogo/Suno%E4%B8%AD%E6%96%87%E9%80%9A/issues/new?template=feature_request.yml) 提交 Issue。

---

## 🛠️ 参与开发

### 环境准备

- Node.js（任意近期 LTS 版本）
- 无需安装任何 npm 依赖

```bash
# 克隆仓库
git clone https://github.com/ilovelogo/Suno%E4%B8%AD%E6%96%87%E9%80%9A.git
cd Suno中文通

# 构建产物
node scripts/build.js

# 运行测试（18 项断言）
node scripts/test_dom_behavior.js
```

### 主要文件说明

| 文件 | 说明 |
|------|------|
| `src/core/injector.js` | 核心注入引擎，翻译逻辑、卡片渲染 |
| `src/data/glossary.json` | 音乐白话词库（唯一事实源，修改此处即更新所有输出） |
| `src/data/guide.json` | 做歌新手向导数据 |
| `src/ui/styles.css` | 毛玻璃样式、S-Pen/Pencil 交互样式 |

### 添加/修改翻译词条

1. 编辑 `src/data/glossary.json`，按现有格式添加词条
2. 运行 `node scripts/build.js` 重新编译
3. 运行 `node scripts/export_review.js` 更新评审表
4. 提交 PR，说明修改的词条和理由

### PR 规范

- 每个 PR 聚焦一个功能或修复
- 确保 `node scripts/test_dom_behavior.js` 全部通过
- PR 描述中说明改动内容和测试方法

---

## 📄 许可

本项目采用 [MIT License](./LICENSE)，贡献的代码默认采用相同许可。
