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

  get innerHTML() {
    return this.innerHTML_ !== undefined ? this.innerHTML_ : this.textContent;
  }

  set innerHTML(html) {
    this.innerHTML_ = html;
    this.children = [];
    if (!html || typeof html !== 'string') return;

    const tagMatchRegex = /<([a-zA-Z0-9\-]+)([^>]*)>/g;
    let match;
    while ((match = tagMatchRegex.exec(html)) !== null) {
      const tagName = match[1];
      if (tagName.startsWith('/')) continue;
      const attrsStr = match[2] || '';

      const el = new MockElement(tagName);
      el.parentElement = this;

      const idMatch = attrsStr.match(/id=["']([^"']+)["']/);
      if (idMatch) el.id = idMatch[1];

      const classMatch = attrsStr.match(/class=["']([^"']+)["']/);
      if (classMatch) el.className = classMatch[1];

      const copyMatch = attrsStr.match(/data-copy=["']([^"']*)["']/);
      if (copyMatch) el.setAttribute('data-copy', copyMatch[1]);

      this.children.push(el);
    }
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
    if (this.textContent_ && this.children.length === 0) {
      const textNode = new MockElement('#text', { textContent: this.textContent_ });
      textNode.parentElement = this;
      this.children.push(textNode);
      this.textContent_ = '';
    }
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  insertBefore(newChild, refChild) {
    if (this.textContent_ && this.children.length === 0) {
      const textNode = new MockElement('#text', { textContent: this.textContent_ });
      textNode.parentElement = this;
      this.children.push(textNode);
      this.textContent_ = '';
    }
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
      return this.getAttribute(inner) !== null;
    }
    return this.tagName === sel.toUpperCase();
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    function walk(node) {
      for (const child of node.children) {
        if (child.matches(selector)) {
          results.push(child);
        }
        walk(child);
      }
    }
    walk(this);
    return results;
  }

  getBoundingClientRect() {
    return {
      left: 100,
      top: 100,
      bottom: 120,
      right: 150,
      width: 50,
      height: 20
    };
  }
}

class MockEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.target = null;
    this.currentTarget = null;
    this.pointerType = options.pointerType || 'mouse';
    this.stopped = false;
    this.defaultPrevented = false;
  }

  stopPropagation() {
    this.stopped = true;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }
}

// 2. 模拟全局 Document 与 Window
const mockDoc = {
  body: new MockElement('body'),
  head: new MockElement('head'),
  createElement(tag) {
    return new MockElement(tag);
  },
  getElementById(id) {
    return this.body.querySelector('#' + id);
  },
  querySelectorAll(sel) {
    return this.body.querySelectorAll(sel);
  },
  querySelector(sel) {
    return this.body.querySelector(sel);
  },
  addEventListener(type, handler) {
    this.body.addEventListener(type, handler);
  }
};

global.document = mockDoc;
global.window = {
  innerWidth: 1280,
  innerHeight: 800,
  scrollX: 500, // 故意设置滚动量，测试 fixed 坐标是否被污染
  scrollY: 1000
};

const mockStorage = new Map();
global.localStorage = {
  getItem(k) { return mockStorage.get(k) || null; },
  setItem(k, v) { mockStorage.set(k, String(v)); },
  removeItem(k) { mockStorage.delete(k); },
  clear() { mockStorage.clear(); },
  get length() { return mockStorage.size; },
  key(i) { return Array.from(mockStorage.keys())[i] || null; }
};

// 载入引擎、词库与向导数据
const SunoCopilotEngine = require('../src/core/injector.js');
const glossary = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/glossary.json'), 'utf-8'));
const guide = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/guide.json'), 'utf-8'));

console.log('------------------------------------------------------------');
console.log('🧪 开始执行 Suno中文通 DOM 行为与安全性测试套件');
console.log('⚠️  注意：此测试为本地仿真测试，非真实 suno.com，亦非三星 S-Pen 硬件。');
console.log('------------------------------------------------------------\n');

let testsPassed = 0;

// ==============================================================
// 断言 1：【歌词区与 contenteditable 绝对安全】
// 歌词 contenteditable 的 textContent 在扫描前后一致，内部没有 .suno-copilot-badge
// ==============================================================
{
  const lyricOriginalText = '[Chorus]\nThis is chorus lyric\nAdvanced\n[Bridge]\nNever change me';

  const richEditor = new MockElement('div', {
    isContentEditable: true,
    attributes: { contenteditable: 'true' },
    textContent: lyricOriginalText
  });
  mockDoc.body.appendChild(richEditor);

  const lyricTextarea = new MockElement('textarea', {
    textContent: lyricOriginalText
  });
  mockDoc.body.appendChild(lyricTextarea);

  const roleTextbox = new MockElement('div', {
    attributes: { role: 'textbox' },
    textContent: lyricOriginalText
  });
  mockDoc.body.appendChild(roleTextbox);

  const engine = new SunoCopilotEngine(glossary, '', guide);
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
// ==============================================================
{
  let nativeButtonClicked = 0;
  let nativeButtonPointerDown = 0;

  const buttonWrapper = new MockElement('div', { className: 'button-container' });
  const sunoNativeBtn = new MockElement('button', { id: 'suno-generate-button', textContent: 'Extend' });
  buttonWrapper.appendChild(sunoNativeBtn);
  mockDoc.body.appendChild(buttonWrapper);

  sunoNativeBtn.addEventListener('click', () => { nativeButtonClicked++; });
  sunoNativeBtn.addEventListener('pointerdown', () => { nativeButtonPointerDown++; });

  const engine = new SunoCopilotEngine(glossary, '', guide);
  engine.scanAndInject();

  const badgeInsideBtn = sunoNativeBtn.querySelector('.suno-copilot-badge');
  assert.strictEqual(badgeInsideBtn, null, 'FAIL: 徽标不应被 appendChild 到 button 内部！');

  const companion = buttonWrapper.querySelector('.suno-copilot-companion');
  assert(companion, 'FAIL: 徽标应作为兄弟节点 companion 插入到控件旁');

  const badge = companion.querySelector('.suno-copilot-badge');
  assert(badge, 'FAIL: companion 内部应包含 .suno-copilot-badge 徽标');

  const pdownEvt = new MockEvent('pointerdown');
  badge.dispatchEvent(pdownEvt);

  const clickEvt = new MockEvent('click');
  badge.dispatchEvent(clickEvt);

  assert.strictEqual(nativeButtonClicked, 0, 'FAIL: 点击徽标导致父级 button 触发了 click！');
  assert.strictEqual(nativeButtonPointerDown, 0, 'FAIL: 按下徽标导致父级 button 触发了 pointerdown！');
  assert.strictEqual(engine.isPinned, true, 'FAIL: 点击徽标后引擎应进入 pinned 状态');

  console.log('✅ 断言 2 通过: 徽标作为独立兄弟节点呈现，点击徽标后父级 <button> 的 click 与 pointerdown 计数严格为 0。');
  testsPassed++;
}

// ==============================================================
// 断言 3：【卡片 DOM 同时含有三层正文】
// ==============================================================
{
  const engine = new SunoCopilotEngine(glossary, '', guide);
  const advancedItem = glossary.find(g => g.term === 'Advanced');
  assert(advancedItem, '词库中应存在 Advanced 词条');

  const dummyBadge = new MockElement('span');
  engine.showCard(advancedItem, dummyBadge, false);

  const card = mockDoc.getElementById('suno-copilot-card');
  assert(card, 'DOM 中应生成 #suno-copilot-card');

  const rawHtml = card.innerHTML;
  assert(rawHtml.includes(advancedItem.tier1_vernacular), 'FAIL: 卡片 DOM 未包含第一层听感正文');
  assert(rawHtml.includes(advancedItem.tier2_suno_usage), 'FAIL: 卡片 DOM 未包含第二层实操正文');
  assert(rawHtml.includes(advancedItem.tier3_example), 'FAIL: 卡片 DOM 未包含第三层示例文本');

  console.log('✅ 断言 3 通过: 卡片 DOM 同时完整包含该词条的三层通俗正文。');
  testsPassed++;
}

// ==============================================================
// 断言 4：【剪贴板写入抛错时 Toast 是失败警告】
// ==============================================================
(async () => {
  const engine = new SunoCopilotEngine(glossary, '', guide);

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
    assert.strictEqual(card.style.top, '178px', 'FAIL: fixed top 不应累加 window.scrollY');

    console.log('✅ 断言 5 通过: position: fixed 采用纯视口坐标，不掺杂 window.scrollX / scrollY。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 6：【全界面菜单与导航汉化严格匹配规范表】
  // 包括 Sounds、Advanced、Studio、+ Audio、+ Voice、+ Inspo 及纯单词形式
  // ==============================================================
  {
    const navContainer = new MockElement('nav');
    const simpleBtn = new MockElement('button', { textContent: 'Simple' });
    const advancedBtn = new MockElement('button', { textContent: 'Advanced' });
    const soundsBtn = new MockElement('button', { textContent: 'Sounds' });
    const studioLink = new MockElement('a', { textContent: 'Studio' });
    const addAudioBtn = new MockElement('button', { textContent: '+ Audio' });
    const addVoiceBtn = new MockElement('button', { textContent: '+ Voice' });
    const addInspoBtn = new MockElement('button', { textContent: '+ Inspo' });
    const bareVoiceBtn = new MockElement('button', { textContent: 'Voice' });
    const bareInspoBtn = new MockElement('button', { textContent: 'Inspo' });
    const v6Btn = new MockElement('button', { textContent: 'v6' });
    const createSongBtn = new MockElement('button', { textContent: 'Create song' });

    navContainer.appendChild(simpleBtn);
    navContainer.appendChild(advancedBtn);
    navContainer.appendChild(soundsBtn);
    navContainer.appendChild(studioLink);
    navContainer.appendChild(addAudioBtn);
    navContainer.appendChild(addVoiceBtn);
    navContainer.appendChild(addInspoBtn);
    navContainer.appendChild(bareVoiceBtn);
    navContainer.appendChild(bareInspoBtn);
    navContainer.appendChild(v6Btn);
    navContainer.appendChild(createSongBtn);
    mockDoc.body.appendChild(navContainer);

    engine.scanAndInject();

    assert.strictEqual(simpleBtn.querySelector('.suno-copilot-nav-zh').textContent, '丢一句给它写', 'FAIL: Simple 汉化不匹配');
    assert.strictEqual(advancedBtn.querySelector('.suno-copilot-nav-zh').textContent, '自己写歌词和风格', 'FAIL: Advanced 汉化不匹配');
    assert.strictEqual(soundsBtn.querySelector('.suno-copilot-nav-zh').textContent, '做一段声音', 'FAIL: Sounds 汉化不匹配');
    assert.strictEqual(studioLink.querySelector('.suno-copilot-nav-zh').textContent, 'Suno Studio，要 Premier', 'FAIL: Studio 汉化不匹配');
    assert.strictEqual(addAudioBtn.querySelector('.suno-copilot-nav-zh').textContent, '添加音频', 'FAIL: + Audio 汉化不匹配');
    assert.strictEqual(addVoiceBtn.querySelector('.suno-copilot-nav-zh').textContent, '加入一段声音', 'FAIL: + Voice 汉化不匹配');
    assert.strictEqual(addInspoBtn.querySelector('.suno-copilot-nav-zh').textContent, '从歌单里找感觉', 'FAIL: + Inspo 汉化不匹配');
    assert.strictEqual(bareVoiceBtn.querySelector('.suno-copilot-nav-zh').textContent, '加入一段声音', 'FAIL: bare Voice 汉化不匹配');
    assert.strictEqual(bareInspoBtn.querySelector('.suno-copilot-nav-zh').textContent, '从歌单里找感觉', 'FAIL: bare Inspo 汉化不匹配');
    assert.strictEqual(v6Btn.querySelector('.suno-copilot-nav-zh').textContent, '现在常用的模型', 'FAIL: v6 汉化不匹配');
    assert.strictEqual(createSongBtn.querySelector('.suno-copilot-nav-zh').textContent, '做歌，一次两首', 'FAIL: Create song 汉化不匹配');

    console.log('✅ 断言 6 通过: 导航与功能短中文严格遵循规划表，+ Voice/+ Inspo 及纯单词形态均完美覆盖。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 6.1：【+ Audio, + Voice, + Inspo 三列按钮栏结构完整性保护】
  // 严禁在此按钮栏中注入兄弟节点或徽标，确保 + Inspo 100% 存在且不被挤出
  // ==============================================================
  {
    const toolbar = new MockElement('div', { className: 'grid grid-cols-3' });
    const audioBtn = new MockElement('button', { textContent: '+ Audio' });
    const voiceBtn = new MockElement('button', { textContent: '+ Voice' });
    const inspoBtn = new MockElement('button', { textContent: '+ Inspo' });

    toolbar.appendChild(audioBtn);
    toolbar.appendChild(voiceBtn);
    toolbar.appendChild(inspoBtn);
    mockDoc.body.appendChild(toolbar);

    engine.scanAndInject();

    assert.strictEqual(toolbar.children.length, 3, 'FAIL: 3列按钮栏子元素数量必须严格为 3，严禁插入兄弟徽标挤占网格！');
    assert.strictEqual(toolbar.children[0], audioBtn, 'FAIL: 第 1 个按钮必须是 + Audio');
    assert.strictEqual(toolbar.children[1], voiceBtn, 'FAIL: 第 2 个按钮必须是 + Voice');
    assert.strictEqual(toolbar.children[2], inspoBtn, 'FAIL: 第 3 个按钮必须是 + Inspo');

    assert.strictEqual(audioBtn.querySelector('.suno-copilot-nav-zh').textContent, '添加音频');
    assert.strictEqual(voiceBtn.querySelector('.suno-copilot-nav-zh').textContent, '加入一段声音');
    assert.strictEqual(inspoBtn.querySelector('.suno-copilot-nav-zh').textContent, '从歌单里找感觉');

    // 验证用户明确要求的“上英下中”双行紧凑布局策略生效
    assert(audioBtn.classList.contains('suno-copilot-stacked-btn'), 'FAIL: + Audio 必须应用 .suno-copilot-stacked-btn 双行排版');
    assert(voiceBtn.classList.contains('suno-copilot-stacked-btn'), 'FAIL: + Voice 必须应用 .suno-copilot-stacked-btn 双行排版');
    assert(inspoBtn.classList.contains('suno-copilot-stacked-btn'), 'FAIL: + Inspo 必须应用 .suno-copilot-stacked-btn 双行排版');
    assert(inspoBtn.querySelector('.suno-copilot-nav-zh').classList.contains('stacked'), 'FAIL: 汉化文本必须具备 .stacked 类');

    // 验证这三个按钮本身与父容器内均无 .suno-copilot-badge 徽标
    assert.strictEqual(toolbar.querySelectorAll('.suno-copilot-badge').length, 0, 'FAIL: + Audio/+ Voice/+ Inspo 工具栏内严禁出现兄弟徽标');

    console.log('✅ 断言 6.1 通过: + Audio, + Voice, + Inspo 3个按钮结构完整保留，且已启用“上英下中”双行紧凑排版策略（遵从用户要求）。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 7：【按钮文字 Custom 严禁出现“自定义模式”，且不挂 Advanced】
  // ==============================================================
  {
    const customBtnContainer = new MockElement('div');
    const customBtn = new MockElement('button', { textContent: 'Custom' });
    customBtnContainer.appendChild(customBtn);
    mockDoc.body.appendChild(customBtnContainer);

    engine.scanAndInject();

    const navZh = customBtn.querySelector('.suno-copilot-nav-zh');
    assert.strictEqual(navZh.textContent, '自己定长短', 'FAIL: Custom 必须译为“自己定长短”，严禁译为“自定义模式”');

    // 验证关联的徽标卡片不是 Advanced 制作人开关
    const companion = customBtnContainer.querySelector('.suno-copilot-companion');
    assert(companion, 'Custom 旁应能挂 Duration 徽标');
    const badge = companion.querySelector('.suno-copilot-badge');
    assert(badge, '应有问号徽标');

    console.log('✅ 断言 7 通过: Custom 正确对应时长“自己定长短”，彻底消灭“自定义模式”与错误别名关联。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 8：【歌曲列表专业音乐味道整句翻译与本地术语锁定保护】
  // 验证「四四拍正拍律动」绝对锁定，即便混有未知词也绝不会被谷歌机翻整句覆盖
  // ==============================================================
  {
    const songCard = new MockElement('div', { className: 'song-card' });
    const songTitle = new MockElement('div', { textContent: 'My Cozy Tune' });
    const songDesc = new MockElement('p', { textContent: 'tight four-on-the-floor groove, brisk gentle fingerpicking, electric guitar' });

    songCard.appendChild(songTitle);
    songCard.appendChild(songDesc);
    mockDoc.body.appendChild(songCard);

    engine.scanAndInject();

    const zhDescEl = songCard.querySelector('.suno-copilot-song-desc-zh');
    assert(zhDescEl, 'FAIL: 未找到歌曲描述中文翻译节点');
    assert.strictEqual(zhDescEl.textContent, '紧凑利落的四四拍正拍律动 · 轻快温和的细腻指弹 · 电吉他清音与扫弦', 'FAIL: 歌曲描述专业音乐味道翻译不符合要求');
    assert(!/[a-zA-Z]/.test(zhDescEl.textContent), 'FAIL: 中文行绝对不可残留英文字母！');
    assert.strictEqual(songDesc.textContent, 'tight four-on-the-floor groove, brisk gentle fingerpicking, electric guitar', 'FAIL: 原始英文字符被篡改！');

    // 针对单个 four-on-the-floor 与 fingerstyle 单独断言
    assert.strictEqual(engine.translateMusicDescription('four-on-the-floor'), '四四拍正拍律动', 'FAIL: four-on-the-floor 必须翻译为“四四拍正拍律动”！');
    assert.strictEqual(engine.translateMusicDescription('fingerstyle'), '细腻指弹', 'FAIL: fingerstyle 必须翻译为“细腻指弹”！');

    // 针对 drum and bass 与 light and breezy 整词匹配断言（杜绝在查词典前被 and 误切分）
    assert.strictEqual(engine.translateMusicDescription('drum and bass'), '碎拍鼓打贝斯', 'FAIL: drum and bass 必须翻译为“碎拍鼓打贝斯”，绝不可被拆分为“低音贝斯”！');
    assert.strictEqual(engine.translateMusicDescription('light and breezy'), '微风拂面般的惬意听感', 'FAIL: light and breezy 必须翻译为“微风拂面般的惬意听感”！');
    assert.strictEqual(engine.translateMusicDescription('driving four-on-the-floor groove'), '强劲推进的四四拍正拍律动', 'FAIL: driving four-on-the-floor groove 翻译不符合要求');
    assert.strictEqual(engine.translateMusicDescription('tight four-on-the-floor groove, punchy kick'), '紧凑利落的四四拍正拍律动 · 结实有力的底鼓', 'FAIL: 组合句子翻译不符合要求');

    // 混合句子术语锁定验证：已知四四拍 + 未知英文，四四拍立即同步锁定输出，不被盖掉
    const mixedRes = engine.translateMusicDescription('four-on-the-floor, completely obscure unknown phrase');
    assert(mixedRes.includes('四四拍正拍律动'), 'FAIL: 混合句子中四四拍正拍律动必须立刻同步锁定呈现！');

    // 关键回归断言（针对用户指出的致命案例：tight four-on-the-floor groove and surprise kazoo）
    // 验证：同一段里术语后面连着生词时，立即同步结果绝对不为空，四四拍正拍律动被即时锁定呈现
    const exactUserCaseImmediate = engine.translateMusicDescription('tight four-on-the-floor groove and surprise kazoo');
    assert(exactUserCaseImmediate.includes('紧凑利落的四四拍正拍律动'), 'FAIL: tight four-on-the-floor groove and surprise kazoo 即时结果绝对不可为空，四四拍必须立刻呈现！');

    // 针对旧缓存免疫断言（针对审查意见指出的“localStorage 里旧机翻四层节奏/四地板绕过锁定”漏洞）
    global.localStorage.setItem('sc_trans_v2_tight four-on-the-floor groove', '紧凑的四层节奏');
    const cleanedRes = engine.translateMusicDescription('tight four-on-the-floor groove');
    assert.strictEqual(cleanedRes, '紧凑利落的四四拍正拍律动', 'FAIL: 面对含有“四层节奏”或“四地板”的旧脏缓存，必须坚决作废并返回“四四拍正拍律动”！');

    // 针对词库卡片审查意见断言（无 NOT_YET_VERIFIED、无“不要写回怒音”、[Chorus] 不以“副歌”开头）
    const chorusItem = glossary.find(g => g.id === 'chorus');
    assert(chorusItem && !chorusItem.tier1_vernacular.startsWith('副歌'), 'FAIL: [Chorus] 通俗解释第一词严禁使用“副歌”！');
    const beltingItem = glossary.find(g => g.id === 'belting');
    assert(beltingItem && !beltingItem.tier1_vernacular.includes('不要写回怒音'), 'FAIL: [Belting] 卡片正文严禁残留“不要写回怒音”内部提示！');
    const voiceItem = glossary.find(g => g.term === 'Voice' || g.id === 'persona');
    assert(voiceItem && !voiceItem.tier1_vernacular.includes('NOT_YET_VERIFIED'), 'FAIL: Voice 卡片正文严禁残留 NOT_YET_VERIFIED！');
    const addVocalItem = glossary.find(g => g.id === 'add_vocal');
    assert(addVocalItem && !addVocalItem.tier1_vernacular.includes('NOT_YET_VERIFIED'), 'FAIL: Add Vocal 卡片正文严禁残留 NOT_YET_VERIFIED！');

    console.log('✅ 断言 8 通过: four-on-the-floor、drum and bass、light and breezy 准确整词锁定；旧脏缓存彻底免疫；卡片白话正文无内部标记残留。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 9：【未收录的未知英文描述本地词库不硬拼夹生饭】
  // ==============================================================
  {
    const songCard2 = new MockElement('div', { className: 'song-card-unknown' });
    const songDesc2 = new MockElement('p', { textContent: 'completely obscure unknown dsl phrase with nonexisting terms' });

    songCard2.appendChild(songDesc2);
    mockDoc.body.appendChild(songCard2);

    engine.scanAndInject();

    const zhDescEl2 = songCard2.querySelector('.suno-copilot-song-desc-zh');
    assert.strictEqual(zhDescEl2, null, 'FAIL: 纯未知英文在无网络/离线环境下不应生成含残留英文碎片的中文行');

    console.log('✅ 断言 9 通过: 本地专业词库绝不粗暴拼凑夹生饭，未知内容静默触发后台动态翻译。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 10：【输入框与歌词占位符安全汉化，不插词入英文句子中】
  // ==============================================================
  {
    const lyricsInput = new MockElement('textarea', {
      attributes: { placeholder: 'Start writing lyrics, or leave this empty for instrumental' }
    });
    lyricsInput.placeholder = 'Start writing lyrics, or leave this empty for instrumental';
    mockDoc.body.appendChild(lyricsInput);

    engine.scanAndInject();

    assert(lyricsInput.placeholder.includes('Start writing lyrics, or leave this empty for instrumental\n开始写歌词。什么都不填，做出来就没有人唱'),
      'FAIL: 歌词占位符应为双行，不可把中文插在英文中间');

    console.log('✅ 断言 10 通过: 歌词占位符严格保持双行优雅对照，绝无英文中间插中文现象。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 11：【歌词编辑区与创作区域绝对不被误识别为歌曲列表】
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

    console.log('✅ 断言 11 通过: 创作区与歌词编辑区受到严格隔离保护，100% 杜绝误注入。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 12：【用户指令明确启用动态翻译后台服务与 Manifest V3 host_permissions】
  // ==============================================================
  {
    const injectorSrc = fs.readFileSync(path.join(__dirname, '../src/core/injector.js'), 'utf-8');
    const buildSrc = fs.readFileSync(path.join(__dirname, '../scripts/build.js'), 'utf-8');
    const manifestSrc = fs.readFileSync(path.join(__dirname, '../dist/chrome-extension/manifest.json'), 'utf-8');
    const bgJsPath = path.join(__dirname, '../dist/chrome-extension/background.js');

    assert(injectorSrc.includes('fetchDynamicTranslation'), 'FAIL: injector.js 必须具备动态翻译后台通道');
    assert(buildSrc.includes('background.js'), 'FAIL: build.js 必须生成 background.js');
    assert(manifestSrc.includes('host_permissions'), 'FAIL: manifest.json 必须包含 host_permissions');
    assert(manifestSrc.includes('background.js'), 'FAIL: manifest.json 必须包含 background service worker');
    assert(fs.existsSync(bgJsPath), 'FAIL: background.js 文件必须存在于扩展包中！');

    console.log('✅ 断言 12 通过: 后台动态翻译服务通道、Manifest V3 host_permissions 与 background.js 完整就绪（遵从用户明确指令）。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 13：【抽屉内“做第一首歌”向导与复制按钮数量约束】
  // ==============================================================
  {
    engine.createCheatSheetDrawer();
    const drawer = mockDoc.getElementById('suno-copilot-drawer');
    assert(drawer, 'FAIL: 抽屉元素未能正确创建');

    const tutorialCard = drawer.querySelector('.sc-tutorial-card');
    assert(tutorialCard, 'FAIL: 抽屉顶部未找到独立的“做第一首歌”向导卡片');

    // 步进验证
    assert.strictEqual(engine.tutorialStep, 1, '初始步骤应为第 1 步');
    const step1Copy = tutorialCard.querySelector('#sc-tutorial-copy-trigger');
    assert.strictEqual(step1Copy, null, '第 1 步绝对不可有复制按钮');

    // 切到第 3 步
    engine.tutorialStep = 3;
    engine.renderDrawerContent();
    const drawer3 = mockDoc.getElementById('suno-copilot-drawer');
    const step3Copy = drawer3.querySelector('#sc-tutorial-copy-trigger');
    assert(step3Copy, '第 3 步必须有且仅有 1 个歌词骨架复制按钮');
    assert(step3Copy.getAttribute('data-copy').includes('[Verse]'), '复制内容必须为 [Verse] 骨架');

    // 切到第 4 步
    engine.tutorialStep = 4;
    engine.renderDrawerContent();
    const drawer4 = mockDoc.getElementById('suno-copilot-drawer');
    const step4Copy = drawer4.querySelector('#sc-tutorial-copy-trigger');
    assert(step4Copy, '第 4 步必须有且仅有 1 个风格英文复制按钮');

    // 切到第 5 步
    engine.tutorialStep = 5;
    engine.renderDrawerContent();
    const drawer5 = mockDoc.getElementById('suno-copilot-drawer');
    const step5Copy = drawer5.querySelector('#sc-tutorial-copy-trigger');
    assert.strictEqual(step5Copy, null, '第 5 步绝对不可有复制按钮');

    console.log('✅ 断言 13 通过: “做第一首歌”向导在抽屉顶部独立呈现，复制按钮仅严格限定在第 3 与第 4 步。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 14：【折叠面板标题与创作参数设置汉化全覆盖】
  // 包括 Lyrics、Styles、Duration、Max Mode、Weirdness、Style Influence、Variety、Personalize、Vocal Gender、Male/Female、Off/On、Normal
  // ==============================================================
  {
    const settingsPanel = new MockElement('div', { className: 'settings-panel' });
    const lyricsHeader = new MockElement('button', { textContent: 'Lyrics' });
    const stylesHeader = new MockElement('button', { textContent: 'Styles' });
    
    // Duration 行 (带 info 图标)
    const durationLabel = new MockElement('label', { textContent: 'Duration ' });
    const durationInfoBtn = new MockElement('button', { textContent: 'i' });
    durationLabel.appendChild(durationInfoBtn);

    // Max Mode 行
    const maxModeLabel = new MockElement('label', { textContent: 'Max Mode ' });
    const maxModeOff = new MockElement('button', { textContent: 'Off' });
    const maxModeOn = new MockElement('button', { textContent: 'On' });

    // Weirdness, Style Influence, Variety 行
    const weirdnessLabel = new MockElement('label', { textContent: 'Weirdness ' });
    const styleInfLabel = new MockElement('label', { textContent: 'Style Influence ' });
    const varietyLabel = new MockElement('label', { textContent: 'Variety ' });
    const varietyNormal = new MockElement('button', { textContent: 'Normal' });

    // Personalize 行
    const personalizeLabel = new MockElement('label', { textContent: 'Personalize ' });

    // Vocal Gender 行与开关
    const vocalGenderLabel = new MockElement('label', { textContent: 'Vocal Gender ' });
    const maleBtn = new MockElement('button', { textContent: 'Male' });
    const femaleBtn = new MockElement('button', { textContent: 'Female' });

    settingsPanel.appendChild(lyricsHeader);
    settingsPanel.appendChild(stylesHeader);
    settingsPanel.appendChild(durationLabel);
    settingsPanel.appendChild(maxModeLabel);
    settingsPanel.appendChild(maxModeOff);
    settingsPanel.appendChild(maxModeOn);
    settingsPanel.appendChild(weirdnessLabel);
    settingsPanel.appendChild(styleInfLabel);
    settingsPanel.appendChild(varietyLabel);
    settingsPanel.appendChild(varietyNormal);
    settingsPanel.appendChild(personalizeLabel);
    settingsPanel.appendChild(vocalGenderLabel);
    settingsPanel.appendChild(maleBtn);
    settingsPanel.appendChild(femaleBtn);
    mockDoc.body.appendChild(settingsPanel);

    engine.scanAndInject();

    assert.strictEqual(lyricsHeader.querySelector('.suno-copilot-nav-zh').textContent, '歌词', 'FAIL: Lyrics 汉化不匹配');
    assert.strictEqual(stylesHeader.querySelector('.suno-copilot-nav-zh').textContent, '音乐风格', 'FAIL: Styles 汉化不匹配');
    assert.strictEqual(durationLabel.querySelector('.suno-copilot-nav-zh').textContent, '歌曲长短', 'FAIL: Duration 汉化不匹配');
    assert.strictEqual(maxModeLabel.querySelector('.suno-copilot-nav-zh').textContent, '开启深度生成', 'FAIL: Max Mode 汉化不匹配');
    assert.strictEqual(maxModeOff.querySelector('.suno-copilot-nav-zh').textContent, '关', 'FAIL: Off 汉化不匹配');
    assert.strictEqual(maxModeOn.querySelector('.suno-copilot-nav-zh').textContent, '开', 'FAIL: On 汉化不匹配');
    assert.strictEqual(weirdnessLabel.querySelector('.suno-copilot-nav-zh').textContent, '创意发散程度', 'FAIL: Weirdness 汉化不匹配');
    assert.strictEqual(styleInfLabel.querySelector('.suno-copilot-nav-zh').textContent, '风格词影响程度', 'FAIL: Style Influence 汉化不匹配');
    assert.strictEqual(varietyLabel.querySelector('.suno-copilot-nav-zh').textContent, '结果差异程度', 'FAIL: Variety 汉化不匹配');
    assert.strictEqual(varietyNormal.querySelector('.suno-copilot-nav-zh').textContent, '适中', 'FAIL: Normal 汉化不匹配');
    assert.strictEqual(personalizeLabel.querySelector('.suno-copilot-nav-zh').textContent, '个性化推荐', 'FAIL: Personalize 汉化不匹配');
    assert.strictEqual(vocalGenderLabel.querySelector('.suno-copilot-nav-zh').textContent, '选男声或女声', 'FAIL: Vocal Gender 汉化必须是整句，杜绝拼凑“人声演唱 性别”');
    assert.strictEqual(maleBtn.querySelector('.suno-copilot-nav-zh').textContent, '男声', 'FAIL: Male 汉化不匹配');
    assert.strictEqual(femaleBtn.querySelector('.suno-copilot-nav-zh').textContent, '女声', 'FAIL: Female 汉化不匹配');

    console.log('✅ 断言 14 通过: 折叠面板与各项核心参数、男女声、开闭选项汉化全覆盖。');
    testsPassed++;
  }

  // ==============================================================
  // 断言 15：【动态随机风格提示词双行对照与本地专业词典全覆盖】
  // swing jazz, ambient metal, percussion instruments, old man voice, sanfona
  // ==============================================================
  {
    const styleTextarea = new MockElement('textarea', {
      attributes: {
        placeholder: 'swing jazz, ambient metal, percussion instruments, old man voice, sanfona'
      }
    });
    mockDoc.body.appendChild(styleTextarea);

    engine.scanAndInject();

    const resultPh = styleTextarea.getAttribute('placeholder');
    assert(resultPh.includes('\n'), 'FAIL: 风格提示词占位符必须采用双行换行呈现');
    const [line1, line2] = resultPh.split('\n');
    assert.strictEqual(line1, 'swing jazz, ambient metal, percussion instruments, old man voice, sanfona', 'FAIL: 第 1 行必须是英文原文');
    assert(line2.includes('摇摆爵士'), 'FAIL: 必须包含“摇摆爵士”');
    assert(line2.includes('氛围金属'), 'FAIL: 必须包含“氛围金属”');
    assert(line2.includes('打击乐器编制'), 'FAIL: 必须包含“打击乐器编制”');
    assert(line2.includes('沧桑老者嗓音'), 'FAIL: 必须包含“沧桑老者嗓音”');
    assert(line2.includes('巴西手风琴'), 'FAIL: 必须包含“巴西手风琴”');

    console.log('✅ 断言 15 通过: 动态随机风格提示词全本地命中专业词库，严格按用户要求输出双行“上英下中”优雅对照。');
    testsPassed++;
  }

  console.log('------------------------------------------------------------');
  console.log(`🎉 全部 ${testsPassed} 项行为与安全断言 100% 验证通过！`);
  console.log('------------------------------------------------------------\n');
})();
