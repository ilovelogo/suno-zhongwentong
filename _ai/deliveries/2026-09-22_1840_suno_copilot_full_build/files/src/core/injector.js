/**
 * Suno Copilot - Core DOM Injection & Interaction Engine
 * Features:
 * 1. MutationObserver with debounce for React/Next.js dynamic single-page rendering
 * 2. Samsung Tablet S-Pen Hover (pointerenter) + Finger Tap (click/pin) dual support
 * 3. 3-Tier Plain Language Card display, smart viewport positioning & pinning
 * 4. 1-Tap Copy for lyric tags and style prompts with glowing toast feedback
 * 5. Floating Music Cheat Sheet Drawer with search & multi-category tabs
 * 6. Strict event isolation (stopPropagation) to ensure zero interference with Suno native actions
 */

class SunoCopilotEngine {
  constructor(glossary, styles) {
    this.glossary = Array.isArray(glossary) ? glossary : [];
    this.styles = styles || '';
    this.cardEl = null;
    this.toastEl = null;
    this.drawerEl = null;
    this.isPinned = false;
    this.currentActiveBadge = null;
    this.activeDrawerTab = 'all';
    this.drawerSearchQuery = '';
    this.init();
  }

  init() {
    this.injectStyles();
    this.createGlobalElements();
    this.scanAndInject();
    this.startObserver();
    console.log('[Suno Copilot] 音乐通已就绪：三层通俗音乐库已载入，适配三星 S-Pen 悬浮与触控！');
  }

  injectStyles() {
    if (document.getElementById('suno-copilot-style')) return;
    const styleTag = document.createElement('style');
    styleTag.id = 'suno-copilot-style';
    styleTag.textContent = this.styles;
    document.head.appendChild(styleTag);
  }

  createGlobalElements() {
    // 1. 创建三层白话浮动卡片
    if (!document.getElementById('suno-copilot-card')) {
      this.cardEl = document.createElement('div');
      this.cardEl.id = 'suno-copilot-card';
      document.body.appendChild(this.cardEl);

      // 阻止卡片内部点击与触摸事件穿透
      ['click', 'pointerdown', 'touchstart'].forEach(evt => {
        this.cardEl.addEventListener(evt, (e) => e.stopPropagation());
      });
    }

    // 2. 创建复制提示 Toast
    if (!document.getElementById('suno-copilot-toast')) {
      this.toastEl = document.createElement('div');
      this.toastEl.id = 'suno-copilot-toast';
      this.toastEl.className = 'sc-toast';
      this.toastEl.textContent = '已复制标签到剪贴板！';
      document.body.appendChild(this.toastEl);
    }

    // 3. 点击页面空白处关闭固定的卡片
    document.addEventListener('click', () => {
      if (this.isPinned) {
        this.hideCard();
      }
    });

    // 4. 创建右下角灵感速查浮球
    this.createFloatBall();
  }

  createFloatBall() {
    if (document.getElementById('suno-copilot-float-ball')) return;
    const ball = document.createElement('div');
    ball.id = 'suno-copilot-float-ball';
    ball.title = 'Suno 音乐创作速查手册';
    ball.textContent = '🎵';

    ['click', 'pointerdown', 'touchstart'].forEach(evt => {
      ball.addEventListener(evt, (e) => {
        e.stopPropagation();
        if (evt === 'click') this.toggleCheatSheetDrawer();
      });
    });

    document.body.appendChild(ball);
  }

  toggleCheatSheetDrawer() {
    let drawer = document.getElementById('suno-copilot-drawer');
    if (!drawer) {
      this.createCheatSheetDrawer();
    } else {
      drawer.style.display = drawer.style.display === 'none' ? 'flex' : 'none';
      if (drawer.style.display === 'flex') {
        const input = drawer.querySelector('.sc-drawer-search');
        if (input) input.focus();
      }
    }
  }

  createCheatSheetDrawer() {
    const drawer = document.createElement('div');
    drawer.id = 'suno-copilot-drawer';
    this.drawerEl = drawer;

    ['click', 'pointerdown', 'touchstart'].forEach(evt => {
      drawer.addEventListener(evt, (e) => e.stopPropagation());
    });

    this.renderDrawerContent();
    document.body.appendChild(drawer);
  }

  renderDrawerContent() {
    if (!this.drawerEl) return;

    const categories = [
      { id: 'all', name: '全部标签' },
      { id: 'song_structure', name: '歌曲结构' },
      { id: 'vocals_performance', name: '演唱人声' },
      { id: 'genres_and_styles', name: '热门流派' },
      { id: 'production_params', name: '编曲参数' },
      { id: 'ui_core', name: '制作人功能' }
    ];

    let tabsHtml = '';
    categories.forEach(cat => {
      const activeClass = this.activeDrawerTab === cat.id ? 'active' : '';
      tabsHtml += `<button class="sc-tab-btn ${activeClass}" data-tab="${cat.id}">${cat.name}</button>`;
    });

    this.drawerEl.innerHTML = `
      <div class="sc-drawer-header">
        <div class="sc-drawer-title">
          <span>🎵</span>
          <span>Suno 音乐通速查卡</span>
        </div>
        <button class="sc-close-btn" id="sc-drawer-close" title="关闭速查卡">✕</button>
      </div>

      <input type="text" class="sc-drawer-search" placeholder="🔍 搜索词条、流派、结构标签..." value="${this.escapeHtml(this.drawerSearchQuery)}">

      <div class="sc-drawer-tabs">
        ${tabsHtml}
      </div>

      <div class="sc-drawer-body"></div>
    `;

    // 绑定事件
    this.drawerEl.querySelector('#sc-drawer-close').addEventListener('click', () => {
      this.drawerEl.style.display = 'none';
    });

    const searchInput = this.drawerEl.querySelector('.sc-drawer-search');
    searchInput.addEventListener('input', (e) => {
      this.drawerSearchQuery = e.target.value.trim().toLowerCase();
      this.renderDrawerBody();
    });

    this.drawerEl.querySelectorAll('.sc-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeDrawerTab = e.currentTarget.getAttribute('data-tab');
        this.drawerEl.querySelectorAll('.sc-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderDrawerBody();
      });
    });

    this.renderDrawerBody();
  }

  renderDrawerBody() {
    const bodyEl = this.drawerEl.querySelector('.sc-drawer-body');
    if (!bodyEl) return;

    let filtered = this.glossary;

    // 分类筛选
    if (this.activeDrawerTab !== 'all') {
      filtered = filtered.filter(item => item.category === this.activeDrawerTab);
    }

    // 搜索词筛选
    if (this.drawerSearchQuery) {
      filtered = filtered.filter(item => {
        const text = `${item.term} ${item.zh_name} ${item.tier1_vernacular} ${item.prompt_tag}`.toLowerCase();
        return text.includes(this.drawerSearchQuery);
      });
    }

    if (filtered.length === 0) {
      bodyEl.innerHTML = `<div style="text-align:center; padding:2rem 1rem; color:rgba(255,255,255,0.5); font-size:0.85rem;">未找到相关标签，换个词试试~</div>`;
      return;
    }

    // 按分类组织显示
    const categoryLabels = {
      song_structure: '歌曲结构骨干 (Song Structure)',
      vocals_performance: '演唱风格与人声情绪 (Vocals)',
      genres_and_styles: '主流曲风与情绪 (Genres)',
      production_params: '编曲与声学参数 (Parameters)',
      ui_core: '制作人核心功能 (UI Buttons)'
    };

    let bodyHtml = '';
    const grouped = {};
    filtered.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    for (const [cat, items] of Object.entries(grouped)) {
      bodyHtml += `<div class="sc-category-title ${cat}">${categoryLabels[cat] || cat}</div>`;
      bodyHtml += `<div class="sc-tags-grid">`;
      items.forEach(item => {
        const shortZh = item.zh_name.split('/')[0].split('(')[0].trim();
        const copyText = item.prompt_tag || item.term;
        bodyHtml += `
          <div class="sc-quick-tag" data-copy="${this.escapeHtml(copyText)}" title="${this.escapeHtml(item.tier1_vernacular)}">
            <strong>${this.escapeHtml(item.term)}</strong>
            <span style="opacity:0.75; font-size:0.75rem; margin-left:0.25rem;">${this.escapeHtml(shortZh)}</span>
          </div>
        `;
      });
      bodyHtml += `</div>`;
    }

    bodyEl.innerHTML = bodyHtml;

    // 绑定标签点击复制事件
    bodyEl.querySelectorAll('.sc-quick-tag').forEach(tagEl => {
      tagEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const copyText = e.currentTarget.getAttribute('data-copy');
        this.copyToClipboard(copyText);
      });
    });
  }

  scanAndInject() {
    // 扫描页面中所有的文本节点或按钮
    const elements = document.querySelectorAll('button, span, label, div, p, a');
    for (const el of elements) {
      if (el.dataset.scProcessed) continue;

      // 避免处理我们自己的插件内部元素
      if (el.closest('#suno-copilot-card') || el.closest('#suno-copilot-drawer') || el.closest('#suno-copilot-float-ball')) {
        continue;
      }

      // 仅对叶子文本或包含极少子元素的节点匹配
      if (el.children.length > 2) continue;

      const rawText = el.textContent.trim();
      if (!rawText || rawText.length > 40) continue;

      for (const item of this.glossary) {
        // 匹配标准：支持带括号或不带括号匹配
        const cleanTerm = item.term.replace(/^\[|\]$/g, '').trim();
        const regexExact = new RegExp(`^(\\[?${this.escapeRegExp(cleanTerm)}\\]?)$`, 'i');

        if (regexExact.test(rawText)) {
          this.injectBadge(el, item);
          break;
        }
      }
    }
  }

  injectBadge(targetEl, item) {
    targetEl.dataset.scProcessed = 'true';

    // 1. 添加中文辅助小标题
    const subtext = document.createElement('span');
    subtext.className = 'suno-copilot-subtext';
    const shortZh = item.zh_name.split('/')[0].split('(')[0].trim();
    subtext.textContent = `(${shortZh})`;
    targetEl.appendChild(subtext);

    // 2. 添加问号徽标
    const badge = document.createElement('span');
    badge.className = 'suno-copilot-badge';
    badge.textContent = '?';
    badge.title = `点击查看 ${item.term} 通俗白话讲解`;

    // 阻止徽标自身的原生事件穿透
    ['pointerdown', 'touchstart', 'mousedown'].forEach(evt => {
      badge.addEventListener(evt, (e) => e.stopPropagation());
    });

    // 3. 【核心双模交互】：适配三星平板 S-Pen 悬浮与手指触控
    let hoverTimer = null;

    // (1) S-Pen 悬浮或鼠标悬停 (Pointer Events 带 150ms 缓冲防闪烁)
    badge.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        hoverTimer = setTimeout(() => {
          if (!this.isPinned) {
            this.showCard(item, badge, false);
          }
        }, 150);
      }
    });

    badge.addEventListener('pointerleave', (e) => {
      clearTimeout(hoverTimer);
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        if (!this.isPinned) {
          this.hideCard();
        }
      }
    });

    // (2) 手指轻触或 S-Pen 点击 (固定/钉住卡片长读)
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.isPinned && this.currentActiveBadge === badge) {
        this.hideCard();
      } else {
        this.isPinned = true;
        this.showCard(item, badge, true);
      }
    });

    targetEl.appendChild(badge);
  }

  showCard(item, targetBadge, isPinnedMode = false) {
    this.currentActiveBadge = targetBadge;
    this.isPinned = isPinnedMode;

    const categoryNames = {
      ui_core: '制作人功能',
      song_structure: '歌曲结构语法',
      vocals_performance: '演唱人声情绪',
      genres_and_styles: '曲风与氛围',
      production_params: '编曲参数'
    };

    const categoryName = categoryNames[item.category] || '音乐通';
    const pinBadgeHtml = this.isPinned ? `<span class="sc-pinned-badge">📌 已固定</span>` : '';

    this.cardEl.innerHTML = `
      <div class="sc-card-header">
        <div class="sc-title-group">
          <div class="sc-term-title">
            <span>${this.escapeHtml(item.term)}</span>
            <span class="sc-term-category">${categoryName}</span>
            ${pinBadgeHtml}
          </div>
          <div class="sc-term-zh">${this.escapeHtml(item.zh_name)}</div>
        </div>
        <button class="sc-close-btn" id="sc-card-close-trigger" title="关闭">✕</button>
      </div>

      <!-- 第一层：人话通俗解释 -->
      <div class="sc-section">
        <div class="sc-badge-label tier1">💡 第一层：大白话听感解释</div>
        <p class="sc-content-text">${this.escapeHtml(item.tier1_vernacular)}</p>
      </div>

      <!-- 第二层：Suno 实操指引 -->
      <div class="sc-section">
        <div class="sc-badge-label tier2">🎹 第二层：Suno 实战怎么用</div>
        <p class="sc-content-text">${this.escapeHtml(item.tier2_suno_usage)}</p>
      </div>

      <!-- 第三层：效果示例与快捷复制 -->
      <div class="sc-section" style="margin-bottom: 0;">
        <div class="sc-badge-label tier3">🚀 第三层：提示词与效果示例</div>
        <div class="sc-copy-block" id="sc-prompt-copy-trigger" title="点击复制此提示词标签">
          <span class="sc-code-snippet">${this.escapeHtml(item.prompt_tag || item.term)}</span>
          <span class="sc-copy-icon">点击复制</span>
        </div>
      </div>
    `;

    // 绑定关闭按钮事件
    this.cardEl.querySelector('#sc-card-close-trigger').addEventListener('click', (e) => {
      e.stopPropagation();
      this.hideCard();
    });

    // 绑定一键复制事件
    this.cardEl.querySelector('#sc-prompt-copy-trigger').addEventListener('click', (e) => {
      e.stopPropagation();
      this.copyToClipboard(item.prompt_tag || item.term);
    });

    // 计算弹窗绝对位置（适配平板防溢出）
    this.positionCard(targetBadge);
    this.cardEl.classList.add('active');
  }

  positionCard(targetBadge) {
    const badgeRect = targetBadge.getBoundingClientRect();
    const cardWidth = 368;
    const cardHeight = 360;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = badgeRect.left + window.scrollX;
    let top = badgeRect.bottom + 8 + window.scrollY;

    // 防止右侧超出屏幕边缘
    if (badgeRect.left + cardWidth > viewportWidth - 16) {
      left = viewportWidth - cardWidth - 16;
    }
    if (left < 16) left = 16;

    // 如果底部空间不够，则显示在徽标上方
    if (badgeRect.bottom + cardHeight > viewportHeight && badgeRect.top > cardHeight) {
      top = badgeRect.top - cardHeight - 8 + window.scrollY;
    }
    if (top < 16) top = 16;

    this.cardEl.style.left = `${left}px`;
    this.cardEl.style.top = `${top}px`;
  }

  hideCard() {
    this.isPinned = false;
    this.currentActiveBadge = null;
    if (this.cardEl) {
      this.cardEl.classList.remove('active');
    }
  }

  copyToClipboard(text) {
    if (!navigator.clipboard) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } else {
      navigator.clipboard.writeText(text).catch(err => {
        console.warn('Clipboard writeText failed, fallback used', err);
      });
    }
    this.showToast(`已复制: ${text}`);
  }

  showToast(msg) {
    if (!this.toastEl) return;
    this.toastEl.textContent = msg;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2000);
  }

  startObserver() {
    let debounceTimer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.scanAndInject();
      }, 250);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// 导出或浏览器环境自动挂载
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SunoCopilotEngine;
} else if (typeof window !== 'undefined') {
  window.SunoCopilotEngine = SunoCopilotEngine;
}
