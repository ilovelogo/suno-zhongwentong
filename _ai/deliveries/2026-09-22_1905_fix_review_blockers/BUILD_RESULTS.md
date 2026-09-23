# 实际构建结果报告 (Build Results)

## 1. 构建执行记录
- **命令**: `node scripts/build.js`
- **执行时间**: 2026-09-22 19:00
- **Node.js**: v22.23.2
- **打包词条数量**: 50 个核心词条
- **Exit Code**: 0

## 2. 磁盘实际产物精确物理字节 (基于 fs.statSync 测量)
| 文件相对路径 | 磁盘实际字节数 (Bytes) | 说明 |
| :--- | ---: | :--- |
| `dist/suno-copilot.user.js` | 69,086 | 单文件完整油猴脚本（内联 50 词条与样式） |
| `dist/chrome-extension/content.js` | 56,824 | Chrome 扩展内容脚本 |
| `dist/chrome-extension/styles.css` | 11,225 | Chrome 扩展样式表 |
| `dist/chrome-extension/manifest.json` | 540 | Manifest V3 扩展配置文件 |
| `dist/chrome-extension/icon16.png` | 217 | 16x16 扩展图标 |
| `dist/chrome-extension/icon48.png` | 652 | 48x48 扩展图标 |
| `dist/chrome-extension/icon128.png` | 1,660 | 128x128 扩展图标 |

*注：以上字节数均由脚本通过 Node.js 原生 `fs.statSync(file).size` 实时读取所得，无任何预估或舍入。*
