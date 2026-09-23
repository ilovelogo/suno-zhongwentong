/**
 * Suno Copilot - DOM Behavior, Safety & Event Isolation Automated Test Suite
 * 
 * 注意与免责声明:
 * 本测试为本地 Node.js 环境下的 DOM 行为与事件冒泡链路仿真测试，
 * 【非真实 https://suno.com/ 现场，亦非三星真实真机 S-Pen 硬件】。
 * 仅用于验证本插件自身在面对标准 W3C DOM、可编辑区域隔离、事件冒泡阻断、三层正文渲染及剪贴板异常时的机器行为逻辑。
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 1. 模拟严格符合 W3C 事件传播模型的 DOM 仿真层
class MockElement {
  constructor(tagName, options = {}) {
    this.tagName = tagName.toUpperCase();
    this.id = options.id || '';
    this.className = options.className || '';
    this.dataset = options.dataset || {};
    this.children = [];
    this.parentElement = null;
    this.textContent_ = options.textContent || '';
    this.isContentEditable = Boolean(options.isContentEditable);
    this.listeners = { bubble: [] };
    this.attributes = options.attributes || {};
    this.style = {};
  }

  get textContent() {
    if (this.children.length === 0) return this.textContent_;
    return this.children.map(c => c.textContent).join('');
  }

  set textContent(val) {
    this.textContent_ = val;
    this.children = [];
  }

  get classList() {
    const self = this;
    return {
      add(cls) {
        const set = new Set(self.className.split(/\s+/).filter(Boolean));
        set.add(cls);
        self.className = Array.from(set).join(' ');
      },
      remove(cls) {
        const set = new Set(self.className.split(/\s+/).filter(Boolean));
        set.delete(cls);
        self.className = Array.from(set).join(' ');
      },
      contains(cls) {
        const set = new Set(self.className.split(/\s+/).filter(Boolean));
        return set.has(cls);
      }
    };
  }

  get parentNode() { return this.parentElement; }
  get nextSibling() {
    if (!this.parentElement) return null;
    const idx = this.parentElement.children.indexOf(this);
    if (idx !== -1 && idx + 1 < this.parentElement.children.length) {
      return this.parentElement.children[idx + 1];
    }
    return null;
  }
  get nextElementSibling() { return this.nextSibling; }

  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k] !== undefined ? this.attributes[k] : null; }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  insertBefore(newChild, refChild) {
    newChild.parentElement = this;
    const idx = this.children.indexOf(refChild);
    if (idx !== -1) {
      this.children.splice(idx, 0, newChild);
    } else {
      this.children.push(newChild);
    }
    return newChild;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentElement = null;
    }
    return child;
  }

  addEventListener(type, handler) {
    this.listeners.bubble.push({ type, handler });
  }

  // 严格仿真 W3C 事件冒泡：从当前节点逐级向 parentElement 冒泡，直至 stopPropagation 拦截
  dispatchEvent(event) {
    event.target = this;
    const chain = [];
    let cur = this;
    while (cur) {
      chain.push(cur);
      cur = cur.parentElement;
    }

    for (let i = 0; i < chain.length; i++) {
      const node = chain[i];
      event.currentTarget = node;
      const matched = node.listeners.bubble.filter(l => l.type === event.type);
      for (const entry of matched) {
        entry.handler(event);
      }
      if (event.stopped) {
        break; // 停止向更高层父节点冒泡
      }
    }
    return !event.defaultPrevented;
  }

  closest(selector) {
    let cur = this;
    while (cur) {
      if (cur.matches(selector)) return cur;
      cur = cur.parentElement;
    }
    return null;
  }

  matches(selector) {
    const sel = selector.trim();
    if (sel.includes(',')) {
      return sel.split(',').some(s => this.matches(s.trim()));
    }
    if (sel.startsWith('#')) return this.id === sel.slice(1);
    if (sel.startsWith('.')) return this.classList.contains(sel.slice(1));
    if (sel.startsWith('[') && sel.endsWith(']')) {
      const inner = sel.slice(1, -1);
      if (inner.includes('=')) {
        const [k, v] = inner.split('=').map(s => s.replace(/["']/g, '').trim());
        const attrVal = this.getAttribute(k);
        return attrVal === v;
      }
      return this.getAttribute(inner) !== null || (inner === 'contenteditable' && this.isContentEditable);
    }
    return this.tagName === sel.toUpperCase();
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    function search(node) {
      for (const child of node.children) {
        if (child.matches(selector)) results.push(child);
        search(child);
      }
    }
    search(this);
    return results;
  }

  contains(other) {
    let cur = other;
    while (cur) {
      if (cur === this) return true;
      cur = cur.parentElement;
    }
    return false;
  }

  getBoundingClientRect() {
    return { left: 100, top: 200, right: 120, bottom: 220, width: 20, height: 20 };
  }

  set innerHTML(html) {
    this.children = [];
    this.textContent_ = '';
    // 保存原始 HTML 用于包含断言
    this.rawHtml_ = html;

    if (html.includes('sc-badge-label tier1')) {
      this.appendChild(new MockElement('div', { className: 'sc-badge-label tier1', textContent: '💡 第一层' }));
    }
    if (html.includes('sc-badge-label tier2')) {
      this.appendChild(new MockElement('div', { className: 'sc-badge-label tier2', textContent: '🎹 第二层' }));
    }
    if (html.includes('sc-badge-label tier3')) {
      this.appendChild(new MockElement('div', { className: 'sc-badge-label tier3', textContent: '🚀 第三层' }));
    }
    if (html.includes('sc-tier3-example')) {
      const match = html.match(/<pre class="sc-tier3-example">([\s\S]*?)<\/pre>/);
      const text = match ? match[1] : '';
      this.appendChild(new MockElement('pre', { className: 'sc-tier3-example', textContent: text }));
    }
    if (html.includes('sc-content-text')) {
      const matches = html.match(/<p class="sc-content-text">([\s\S]*?)<\/p>/g) || [];
      matches.forEach(m => {
        const text = m.replace(/<\/?p[^>]*>/g, '');
        this.appendChild(new MockElement('p', { className: 'sc-content-text', textContent: text }));
      });
    }
    if (html.includes('sc-close-btn')) {
      this.appendChild(new MockElement('button', { className: 'sc-close-btn', id: 'sc-card-close-trigger' }));
    }
    if (html.includes('sc-copy-block')) {
      this.appendChild(new MockElement('div', { className: 'sc-copy-block', id: 'sc-prompt-copy-trigger' }));
    }
  }

  get innerHTML() {
    return this.rawHtml_ || '';
  }
}

class MockEvent {
  constructor(type) {
    this.type = type;
    this.target = null;
    this.currentTarget = null;
    this.stopped = false;
    this.defaultPrevented = false;
    this.pointerType = 'mouse';
  }
  stopPropagation() { this.stopped = true; }
  preventDefault() { this.defaultPrevented = true; }
}

// 模拟全局环境
const mockDoc = new MockElement('document');
mockDoc.body = new MockElement('body');
mockDoc.head = new MockElement('head');
mockDoc.appendChild(mockDoc.head);
mockDoc.appendChild(mockDoc.body);
mockDoc.createElement = (tag) => new MockElement(tag);
mockDoc.getElementById = (id) => mockDoc.querySelector('#' + id);

global.document = mockDoc;
global.window = {
  innerWidth: 1280,
  innerHeight: 800,
  scrollX: 500, // 故意设置滚动量，测试 fixed 坐标是否被污染
  scrollY: 1000
};

// 载入引擎与词库
const SunoCopilotEngine = require('../src/core/injector.js');
const glossary = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/glossary.json'), 'utf-8'));

console.log('------------------------------------------------------------');
console.log('🧪 开始执行 Suno 音乐通 DOM 行为与安全性测试套件');
console.log('⚠️  注意：此测试为本地仿真测试，非真实 suno.com，亦非三星 S-Pen 硬件。');
console.log('------------------------------------------------------------\n');

let testsPassed = 0;

// ==============================================================
// 断言 1：【歌词区与 contenteditable 绝对安全】
// 歌词 contenteditable 的 textContent 在扫描前后一致，内部没有 .suno-copilot-badge
// ==============================================================
{
  const lyricOriginalText = '[Chorus]\nThis is chorus lyric\nCustom\n[Bridge]\nNever change me';

  // 1. contenteditable 容器
  const richEditor = new MockElement('div', {
    isContentEditable: true,
    attributes: { contenteditable: 'true' },
    textContent: lyricOriginalText
  });
  mockDoc.body.appendChild(richEditor);

  // 2. textarea 歌词框
  const lyricTextarea = new MockElement('textarea', {
    textContent: lyricOriginalText
  });
  mockDoc.body.appendChild(lyricTextarea);

  // 3. role="textbox" 容器
  const roleTextbox = new MockElement('div', {
    attributes: { role: 'textbox' },
    textContent: lyricOriginalText
  });
  mockDoc.body.appendChild(roleTextbox);

  const engine = new SunoCopilotEngine(glossary, '');
  engine.scanAndInject();

  assert.strictEqual(richEditor.textContent, lyricOriginalText, 'FAIL: contenteditable 歌词正文在扫描后被篡改！');
  assert.strictEqual(richEditor.querySelectorAll('.suno-copilot-badge').length, 0, 'FAIL: contenteditable 内部被注入了徽标！');
  assert.strictEqual(lyricTextarea.querySelectorAll('.suno-copilot-badge').length, 0, 'FAIL: textarea 内部被注入了徽标！');
  assert.strictEqual(roleTextbox.querySelectorAll('.suno-copilot-badge').length, 0, 'FAIL: role="textbox" 内部被注入了徽标！');

  console.log('✅ 断言 1 通过: 歌词 contenteditable 的 textContent 扫描前后 100% 一致，内部 0 徽标注入。');
  testsPassed++;
}

// ==============================================================
// 断言 2：【按钮事件隔离与兄弟节点机制】
// 父级 <button> 上的 click 与 pointerdown 监听在点击徽标后计数仍为 0
// 且徽标没有进入 <button> 内部，而是作为独立兄弟节点存在
// ==============================================================
{
  let nativeButtonClicked = 0;
  let nativeButtonPointerDown = 0;

  // 容器包含父级原生按钮
  const buttonWrapper = new MockElement('div', { className: 'button-container' });
  const sunoNativeBtn = new MockElement('button', { id: 'suno-generate-button', textContent: 'Custom' });
  buttonWrapper.appendChild(sunoNativeBtn);
  mockDoc.body.appendChild(buttonWrapper);

  sunoNativeBtn.addEventListener('click', () => { nativeButtonClicked++; });
  sunoNativeBtn.addEventListener('pointerdown', () => { nativeButtonPointerDown++; });

  const engine = new SunoCopilotEngine(glossary, '');
  engine.scanAndInject();

  // 验证徽标不在 button 内部，而在 button 外部兄弟节点
  const badgeInsideBtn = sunoNativeBtn.querySelector('.suno-copilot-badge');
  assert.strictEqual(badgeInsideBtn, null, 'FAIL: 徽标不应被 appendChild 到 button 内部！');

  // 在父容器中查找插入的兄弟节点
  const companion = buttonWrapper.querySelector('.suno-copilot-companion');
  assert(companion, 'FAIL: 徽标应作为兄弟节点 companion 插入到控件旁');

  const badge = companion.querySelector('.suno-copilot-badge');
  assert(badge, 'FAIL: companion 内部应包含 .suno-copilot-badge 徽标');

  // 模拟对徽标触发 pointerdown 和 click
  const pdownEvt = new MockEvent('pointerdown');
  badge.dispatchEvent(pdownEvt);

  const clickEvt = new MockEvent('click');
  badge.dispatchEvent(clickEvt);

  assert.strictEqual(nativeButtonClicked, 0, 'FAIL: 点击徽标导致父级 button 触发了 click！计数不为0！');
  assert.strictEqual(nativeButtonPointerDown, 0, 'FAIL: 按下徽标导致父级 button 触发了 pointerdown！计数不为0！');
  assert.strictEqual(engine.isPinned, true, 'FAIL: 点击徽标后引擎应进入 pinned 状态');

  console.log('✅ 断言 2 通过: 徽标作为独立兄弟节点呈现，点击徽标后父级 <button> 的 click 与 pointerdown 计数严格为 0。');
  testsPassed++;
}

// ==============================================================
// 断言 3：【卡片 DOM 同时含有三层正文】
// 卡片 DOM 同时含有该词条的 tier1_vernacular、tier2_suno_usage、tier3_example
// ==============================================================
{
  const engine = new SunoCopilotEngine(glossary, '');
  const customItem = glossary.find(g => g.term === 'Custom');
  assert(customItem, '词库中应存在 Custom 词条');

  const dummyBadge = new MockElement('span');
  engine.showCard(customItem, dummyBadge, false);

  const card = mockDoc.getElementById('suno-copilot-card');
  assert(card, 'DOM 中应生成 #suno-copilot-card');

  const rawHtml = card.innerHTML;
  const hasTier1 = rawHtml.includes(customItem.tier1_vernacular);
  const hasTier2 = rawHtml.includes(customItem.tier2_suno_usage);
  const hasTier3 = rawHtml.includes(customItem.tier3_example);

  assert(hasTier1, `FAIL: 卡片 DOM 未包含第一层听感正文 tier1_vernacular`);
  assert(hasTier2, `FAIL: 卡片 DOM 未包含第二层实操正文 tier2_suno_usage`);
  assert(hasTier3, `FAIL: 卡片 DOM 未包含第三层示例文本 tier3_example`);

  console.log('✅ 断言 3 通过: 卡片 DOM 同时完整包含该词条的 tier1_vernacular、tier2_suno_usage 与 tier3_example。');
  testsPassed++;
}

// ==============================================================
// 断言 4：【剪贴板写入抛错时，Toast 是失败，绝非“已复制”】
// ==============================================================
(async () => {
  const engine = new SunoCopilotEngine(glossary, '');

  // 模拟剪贴板异常抛错
  global.navigator = {
    clipboard: {
      writeText: () => Promise.reject(new Error('Simulated Permission Denied Error'))
    }
  };

  await engine.copyToClipboard('[Chorus]');
  const toast = mockDoc.getElementById('suno-copilot-toast');

  assert(toast.classList.contains('error'), 'FAIL: 复制失败时 Toast 必须包含 error 类样式');
  assert(toast.textContent.includes('复制未成功'), 'FAIL: 复制失败时文本必须提示失败，绝不可提示成功！');
  assert(!toast.textContent.includes('已复制'), 'FAIL: 复制失败时绝对不能包含“已复制”！');

  console.log('✅ 断言 4 通过: 剪贴板抛错时 Toast 真实反映失败警告，杜绝虚假“已复制”。');
  testsPassed++;

  // ==============================================================
  // 断言 5：【Fixed 视口定位无 scrollX / scrollY 污染】
  // ==============================================================
  {
    const dummyBadge = new MockElement('span');
    dummyBadge.getBoundingClientRect = () => ({
      left: 200,
      top: 150,
      bottom: 170,
      right: 220,
      width: 20,
      height: 20
    });

    engine.positionCard(dummyBadge);
    const card = mockDoc.getElementById('suno-copilot-card');

    assert.strictEqual(card.style.left, '200px', 'FAIL: fixed left 不应累加 window.scrollX');
    assert.strictEqual(card.style.top, '178px', 'FAIL: fixed top 不应累加 window.scrollY (170 + 8 = 178)');

    console.log('✅ 断言 5 通过: position: fixed 采用纯视口坐标，不掺杂 window.scrollX / scrollY。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 6：【全界面菜单与导航汉化覆盖】
  // 左侧导航与顶部模式按钮能够正确注入汉化副标题且不干扰点击
  // ==============================================================
  {
    const navContainer = new MockElement('nav');
    const homeLink = new MockElement('a', { textContent: 'Home' });
    const exploreLink = new MockElement('a', { textContent: 'Explore' });
    const libraryLink = new MockElement('a', { textContent: 'Library' });
    const filterBtn = new MockElement('button', { textContent: 'Filters (3)' });

    navContainer.appendChild(homeLink);
    navContainer.appendChild(exploreLink);
    navContainer.appendChild(libraryLink);
    navContainer.appendChild(filterBtn);
    mockDoc.body.appendChild(navContainer);

    engine.scanAndInject();

    const homeZh = homeLink.querySelector('.suno-copilot-nav-zh');
    assert(homeZh, 'FAIL: Home 导航项未成功注入 .suno-copilot-nav-zh');
    assert.strictEqual(homeZh.textContent, '首页', 'FAIL: Home 汉化文本不匹配');

    const filterZh = filterBtn.querySelector('.suno-copilot-nav-zh');
    assert(filterZh, 'FAIL: Filters (3) 未成功注入 .suno-copilot-nav-zh');
    assert.strictEqual(filterZh.textContent, '筛选过滤 3', 'FAIL: Filters (3) 动态汉化不匹配');

    console.log('✅ 断言 6 通过: 左侧导航与筛选按钮成功呈现双语汉化副标题（无括号）。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 7：【歌曲列表灰色描述路线 B 专业整句翻译】
  // 右侧歌曲灰色标签如 "cheerful acoustic guitar folk, light and breezy" 翻译为流畅整句
  // ==============================================================
  {
    const songCard = new MockElement('div', { className: 'song-card' });
    const songTitle = new MockElement('div', { textContent: 'My Favorite Cup of Tea' });
    const songDesc = new MockElement('p', { textContent: 'cheerful acoustic guitar folk, light and breezy' });

    songCard.appendChild(songTitle);
    songCard.appendChild(songDesc);
    mockDoc.body.appendChild(songCard);

    engine.scanAndInject();

    const zhDescEl = songCard.querySelector('.suno-copilot-song-desc-zh');
    assert(zhDescEl, 'FAIL: 未找到歌曲描述中文翻译节点 .suno-copilot-song-desc-zh');
    assert.strictEqual(zhDescEl.textContent, '轻松愉悦的原声吉他民谣 · 微风拂面般的惬意听感', 'FAIL: 歌曲风格翻译结果不符合路线 B 专业整句');
    assert.strictEqual(songDesc.textContent, 'cheerful acoustic guitar folk, light and breezy', 'FAIL: 原始英文字符被篡改！');

    console.log('✅ 断言 7 通过: 歌曲列表灰色描述实现路线 B 专业整句优雅排版，原英文 100% 保留。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 8：【输入框与搜索占位符安全汉化】
  // ==============================================================
  {
    const searchInput = new MockElement('input', { attributes: { placeholder: 'Search' } });
    searchInput.placeholder = 'Search';
    mockDoc.body.appendChild(searchInput);

    engine.scanAndInject();

    assert(searchInput.placeholder.includes('搜索歌曲'), 'FAIL: Search 搜索输入框 placeholder 未被汉化');
    console.log('✅ 断言 8 通过: 输入框 placeholder 成功补充完整中文整句且无副作用。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 9：【歌词编辑区与创作区域绝对不被误识别为歌曲列表】
  // 杜绝“【中文】 Start writing lyrics, or leave this empty for 纯音乐”此类夹生饭误注入
  // ==============================================================
  {
    const lyricsEditorContainer = new MockElement('div', { className: 'lyrics-container editor' });
    const lyricsPlaceholder = new MockElement('div', {
      className: 'placeholder-overlay',
      textContent: 'Start writing lyrics, or leave this empty for instrumental'
    });
    lyricsEditorContainer.appendChild(lyricsPlaceholder);
    mockDoc.body.appendChild(lyricsEditorContainer);

    engine.scanAndInject();

    const badDescZh = lyricsEditorContainer.querySelector('.suno-copilot-song-desc-zh');
    assert.strictEqual(badDescZh, null, 'FAIL: 歌词编辑器区域内绝不可被误注入 .suno-copilot-song-desc-zh 歌曲简介！');

    const rawAll = lyricsEditorContainer.textContent;
    assert(!rawAll.includes('【中文】'), 'FAIL: 歌词编辑区绝不可出现【中文】字样！');
    assert(!rawAll.includes('纯音乐'), 'FAIL: 歌词容器文本不应被局部篡改成夹生饭！');

    console.log('✅ 断言 9 通过: 创作区与歌词编辑区受到严格隔离保护，100% 杜绝误注入与中英夹生饭。');
    testsPassed++;
  }

  console.log('------------------------------------------------------------');
  console.log(`🎉 全部 ${testsPassed} 项行为与安全断言 100% 验证通过！`);
  console.log('------------------------------------------------------------\n');
})();

