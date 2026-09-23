/**
 * Suno Copilot - Music Expert Review Sheet Generator
 * Exports src/data/glossary.json to:
 * 1. Music_Expert_Review_Sheet.md (Readable Markdown document for GitHub / Notion / Typora)
 * 2. Music_Expert_Review_Sheet.csv (Excel/WPS compatible CSV with UTF-8 BOM)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const GLOSSARY_PATH = path.join(ROOT_DIR, 'src', 'data', 'glossary.json');
const MD_OUTPUT_PATH = path.join(ROOT_DIR, 'Music_Expert_Review_Sheet.md');
const CSV_OUTPUT_PATH = path.join(ROOT_DIR, 'Music_Expert_Review_Sheet.csv');

if (!fs.existsSync(GLOSSARY_PATH)) {
  console.error('[Error] glossary.json 不存在！');
  process.exit(1);
}

const glossary = JSON.parse(fs.readFileSync(GLOSSARY_PATH, 'utf-8'));

const categoryTitles = {
  ui_core: '一、制作人核心功能与界面按钮 (UI Core Buttons)',
  song_structure: '二、歌曲结构骨干语法 (Song Structure Tags)',
  vocals_performance: '三、演唱风格与人声情绪 (Vocals & Performance)',
  genres_and_styles: '四、主流曲风与流派氛围 (Genres & Moods)',
  production_params: '五、编曲与声学制作参数 (Production Parameters)'
};

// 1. 生成 Markdown 评审文档
let mdContent = `# Suno中文通 · 音乐专业人士校对与评审表

> **项目定位**：
> 本词典专为**零音乐基础的创作者**与**安卓平板（S-Pen 触控）**量身打造，旨在将 Suno 界面上的全英文专业术语解构为“听得懂的生活白话”，并给出立竿见影的写歌实操指引与一键复制标签。
> 
> **校对说明与评审建议**：
> 请音乐老师 / 制作人重点审阅：
> 1. **【第一层：人话通俗解释】**：比喻是否足够通俗接地气，且不违背基础音乐常识？
> 2. **【第二层：Suno 实操指引】**：在 AI 写歌中的填法指引是否准确有效？
> 3. **【第三层：提示词与语法示例】**：给出的标签语法是否合理？
> 4. 您可直接在每条词目下方的 **“✍️ 专家校对批注”** 栏填写修改建议或补充更生动的例子。

---

## 📊 词库全景统计
- **词条总计**：${glossary.length} 条
- **涵盖分类**：5 大维度（制作人功能、歌曲结构、演唱风格、曲风流派、声学参数）
- **交付状态**：已按统一规范完成草稿编撰，待专家复核审定。

---
`;

// 按分类排序输出
const categories = ['ui_core', 'song_structure', 'vocals_performance', 'genres_and_styles', 'production_params'];

categories.forEach(cat => {
  const items = glossary.filter(g => g.category === cat);
  if (items.length === 0) return;

  mdContent += `\n## ${categoryTitles[cat] || cat}\n\n`;

  items.forEach((item, idx) => {
    mdContent += `### ${idx + 1}. 🎵 术语：\`${item.term}\` —— ${item.zh_name}\n\n`;
    mdContent += `- **词条编号**：\`${item.id}\`\n`;
    mdContent += `- **当前校对状态**：\`${item.expert_status || 'draft'}\`\n`;
    mdContent += `- **层级一【人话通俗解释】**：\n  ${item.tier1_vernacular.replace(/\n/g, '\n  ')}\n\n`;
    mdContent += `- **层级二【Suno 实操指引】**：\n  ${item.tier2_suno_usage.replace(/\n/g, '\n  ')}\n\n`;
    mdContent += `- **层级三【提示词与效果示例】**：\n\`\`\`text\n${item.tier3_example}\n\`\`\`\n\n`;
    mdContent += `- **一键复制标签代码**：\`${item.prompt_tag || item.term}\`\n\n`;
    mdContent += `> ✍️ **专家校对批注**：\n> ${item.expert_notes || '[在此处填写您的修改意见、更通俗的比喻或推荐风格词...]'}\n\n---\n\n`;
  });
});

fs.writeFileSync(MD_OUTPUT_PATH, mdContent, 'utf-8');
console.log(`✅ Markdown 评审表导出完成: Music_Expert_Review_Sheet.md (共 ${glossary.length} 个词条)`);

// 2. 生成带 UTF-8 BOM 的 Excel/WPS 兼容 CSV
function escapeCsv(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field);
  return `"${str.replace(/"/g, '""')}"`;
}

const csvHeader = [
  '序号',
  '分类',
  '英文原文(Term)',
  '中文名称(Zh Name)',
  '第一层：人话通俗听感解释(Tier 1)',
  '第二层：Suno实战怎么用(Tier 2)',
  '第三层：提示词与效果示例(Tier 3)',
  '一键复制标签代码(Prompt Tag)',
  '当前校对状态',
  '专家校对与修改意见(批注填写区)'
];

const csvRows = [csvHeader.map(escapeCsv).join(',')];

glossary.forEach((item, index) => {
  const row = [
    index + 1,
    categoryTitles[item.category] ? categoryTitles[item.category].split(' ')[0] : item.category,
    item.term,
    item.zh_name,
    item.tier1_vernacular,
    item.tier2_suno_usage,
    item.tier3_example,
    item.prompt_tag || item.term,
    item.expert_status || 'draft',
    item.expert_notes || ''
  ];
  csvRows.push(row.map(escapeCsv).join(','));
});

// UTF-8 BOM: \uFEFF
const csvContent = '\uFEFF' + csvRows.join('\r\n');
fs.writeFileSync(CSV_OUTPUT_PATH, csvContent, 'utf-8');
console.log(`✅ Excel/WPS 兼容 CSV 评审表导出完成: Music_Expert_Review_Sheet.csv (含 UTF-8 BOM，打开不乱码)`);
