/**
 * Suno Copilot - Build & Distribution Bundler
 * Compiles src/ files into:
 * 1. dist/suno-copilot.user.js (Zero-dependency Tampermonkey UserScript)
 * 2. dist/chrome-extension/ (Manifest V3 extension with icons, content.js, styles.css)
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const EXT_DIR = path.join(DIST_DIR, 'chrome-extension');

// 1. 读取源码文件
const glossaryPath = path.join(SRC_DIR, 'data', 'glossary.json');
const guidePath = path.join(SRC_DIR, 'data', 'guide.json');
const stylesPath = path.join(SRC_DIR, 'ui', 'styles.css');
const injectorPath = path.join(SRC_DIR, 'core', 'injector.js');

if (!fs.existsSync(glossaryPath) || !fs.existsSync(stylesPath) || !fs.existsSync(injectorPath)) {
  console.error('[Error] 缺少 src 源文件，构建中止！');
  process.exit(1);
}

const glossaryData = JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'));
const guideData = fs.existsSync(guidePath) ? JSON.parse(fs.readFileSync(guidePath, 'utf-8')) : null;
const stylesContent = fs.readFileSync(stylesPath, 'utf-8');
const injectorContent = fs.readFileSync(injectorPath, 'utf-8');

// 提取 Engine 类源码 (去掉尾部的 module.exports / window 导出)
const engineClassSource = injectorContent
  .replace(/\/\/ 导出或浏览器环境自动挂载[\s\S]*$/, '')
  .trim();

// 2. 创建输出目录
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
if (!fs.existsSync(EXT_DIR)) fs.mkdirSync(EXT_DIR, { recursive: true });

// 3. 构建单文件油猴脚本 (dist/suno-copilot.user.js)
const userScriptContent = `// ==UserScript==
// @name         Suno中文通 (Suno Partner / Copilot) - 汉化与三层音乐白话讲解
// @namespace    https://github.com/suno-partner
// @version      1.3.0
// @description  专为零基础打造的 Suno.com 伴侣：界面汉化、三层通俗音乐术语讲解、做第一首歌教程向导、适配三星平板 S-Pen 悬浮与触控、歌词语法糖一键复制。
// @author       Suno Partner Team
// @match        https://suno.com/*
// @icon         https://suno.com/favicon.ico
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // 1. 独家五维三层通俗白话核心词库 (${glossaryData.length} 词条)
  const SUNO_GLOSSARY = ${JSON.stringify(glossaryData, null, 2)};
  const SUNO_GUIDE = ${JSON.stringify(guideData, null, 2)};

  // 2. 注入毛玻璃与平板触控专属样式
  const SUNO_STYLES = ${JSON.stringify(stylesContent)};

  // 3. 核心注入与状态引擎
  ${engineClassSource}

  // 4. 自动实例化启动
  if (typeof window !== 'undefined') {
    window.sunoCopilotInstance = new SunoCopilotEngine(SUNO_GLOSSARY, SUNO_STYLES, SUNO_GUIDE);
  }
})();
`;

fs.writeFileSync(path.join(DIST_DIR, 'suno-copilot.user.js'), userScriptContent, 'utf-8');
console.log('✅ 油猴脚本生成成功: dist/suno-copilot.user.js');

// 4. 构建 Chrome 扩展 (dist/chrome-extension/)
// 4.1 content.js
const extensionContentJs = `/**
 * Suno Partner - Chrome Extension Content Script
 */

(function () {
  'use strict';

  // 1. 独家五维三层通俗白话核心词库 (${glossaryData.length} 词条)
  const SUNO_GLOSSARY = ${JSON.stringify(glossaryData, null, 2)};
  const SUNO_GUIDE = ${JSON.stringify(guideData, null, 2)};

  // 2. 核心注入与状态引擎
  ${engineClassSource}

  // 3. 自动实例化启动 (样式已由 manifest.json 注入)
  if (typeof window !== 'undefined') {
    window.sunoCopilotInstance = new SunoCopilotEngine(SUNO_GLOSSARY, '', SUNO_GUIDE);
  }
})();
`;

fs.writeFileSync(path.join(EXT_DIR, 'content.js'), extensionContentJs, 'utf-8');
fs.writeFileSync(path.join(EXT_DIR, 'styles.css'), stylesContent, 'utf-8');

// 4.2 background.js (按用户明确指令恢复：提供无跨域限制的后台翻译通道，保障未收录歌词风格的音乐味道)
const extensionBackgroundJs = `/**
 * Suno Copilot - Background Service Worker (Manifest V3)
 * Provides CORS-free background translation pipeline for dynamic song descriptions
 * (Restored per explicit User Directive to preserve musical flavor for uncataloged songs)
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate' && request.text) {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=' + encodeURIComponent(request.text);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const translated = data[0].map(item => item[0]).join('');
        sendResponse({ success: true, translation: translated });
      })
      .catch(err => {
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep message channel open for async response
  }
});
`;

fs.writeFileSync(path.join(EXT_DIR, 'background.js'), extensionBackgroundJs, 'utf-8');
console.log('✅ 后台服务已恢复: dist/chrome-extension/background.js');

// 4.3 manifest.json
const manifestData = {
  manifest_version: 3,
  name: "Suno中文通 (Suno Partner)",
  version: "1.3.0",
  description: "专为零基础音乐小白与创作者打造的 Suno 全界面双语汉化与本地音乐知识库，支持三星平板 S-Pen 悬浮交互与做第一首歌向导。",
  permissions: ["storage"],
  host_permissions: ["https://translate.googleapis.com/*"],
  background: {
    service_worker: "background.js"
  },
  icons: {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  content_scripts: [
    {
      matches: ["https://suno.com/*"],
      js: ["content.js"],
      css: ["styles.css"],
      run_at: "document_idle"
    }
  ]
};

fs.writeFileSync(path.join(EXT_DIR, 'manifest.json'), JSON.stringify(manifestData, null, 2), 'utf-8');

// 4.3 自动生成各尺寸图标 PNG
function generateIconPng(size) {
  const rowSize = size * 4 + 1;
  const rawData = Buffer.alloc(rowSize * size);

  const radius = size / 2;
  const center = size / 2;

  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: none
    for (let x = 0; x < size; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // 距离中心距离 (画圆角矩形/圆形)
      const dx = x - center + 0.5;
      const dy = y - center + 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        // 渐变色：从左上 #FE3C7D 到右下 #FFB003
        const factor = (x + y) / (size * 2);
        const r = Math.round(254 + (255 - 254) * factor);
        const g = Math.round(60 + (176 - 60) * factor);
        const b = Math.round(125 + (3 - 125) * factor);

        // 简易音乐音符形状（白色像素在中心区域）
        const nx = (x - center) / radius;
        const ny = (y - center) / radius;
        let isNote = false;
        if (nx > -0.35 && nx < -0.15 && ny > -0.4 && ny < 0.25) isNote = true; // 符杆1
        if (nx > 0.15 && nx < 0.35 && ny > -0.4 && ny < 0.15) isNote = true; // 符杆2
        if (nx > -0.35 && nx < 0.35 && ny > -0.45 && ny < -0.25) isNote = true; // 符梁
        if (nx > -0.55 && nx < -0.15 && ny > 0.05 && ny < 0.45) isNote = true; // 符头1
        if (nx > -0.05 && nx < 0.35 && ny > -0.05 && ny < 0.35) isNote = true; // 符头2

        if (isNote && size >= 32) {
          rawData[pxOffset] = 255;
          rawData[pxOffset + 1] = 255;
          rawData[pxOffset + 2] = 255;
          rawData[pxOffset + 3] = 255;
        } else {
          rawData[pxOffset] = r;
          rawData[pxOffset + 1] = g;
          rawData[pxOffset + 2] = b;
          rawData[pxOffset + 3] = 255;
        }
      } else {
        // 透明背景
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
  }

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const body = Buffer.concat([typeBuf, data]);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([lenBuf, body, crcBuf]);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

[16, 48, 128].forEach(size => {
  const iconBuf = generateIconPng(size);
  fs.writeFileSync(path.join(EXT_DIR, `icon${size}.png`), iconBuf);
});
// 兼容旧命名的 icon.png
fs.copyFileSync(path.join(EXT_DIR, 'icon128.png'), path.join(EXT_DIR, 'icon.png'));

console.log('✅ Chrome 扩展包构建完成: dist/chrome-extension/ (含 16/48/128 图标、manifest.json、content.js、styles.css)');
console.log(`🎉 全部构建完成！已打包 ${glossaryData.length} 个核心词条。\n`);

console.log('📊 磁盘实际产物精确指标:');
const artifacts = [
  'dist/suno-copilot.user.js',
  'dist/chrome-extension/content.js',
  'dist/chrome-extension/styles.css',
  'dist/chrome-extension/manifest.json',
  'dist/chrome-extension/icon16.png',
  'dist/chrome-extension/icon48.png',
  'dist/chrome-extension/icon128.png'
];
artifacts.forEach(relPath => {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);
    console.log(` - ${relPath}: ${stat.size} bytes`);
  }
});
