/**
 * Suno Copilot - Core DOM Injection & Interaction Engine
 * Features:
 * 1. Safe MutationObserver scanning (strictly scoped to button, [role="button"], label; companion sibling placement)
 * 2. Samsung Tablet S-Pen Hover (pointerenter) + Finger Tap (click/pin) dual support
 * 3. Bi-directional hover smoothing (150ms enter buffer, 200ms grace period between badge and card)
 * 4. 3-Tier Plain Language Card display with accurate viewport-relative fixed positioning
 * 5. Full rendering of Tier 3 examples + reliable async copy with success/error toasts
 * 6. Floating Music Cheat Sheet Drawer for song structures, vocals, and genres
 * 7. Comprehensive event isolation on companion badges
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
    this.showTimer = null;
    this.hideTimer = null;
    this.toastTimer = null;
    this.init();
  }

  init() {
    this.injectStyles();
    this.createGlobalElements();
    this.scanAndInject();
    this.startObserver();
  }

  injectStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('suno-copilot-style')) return;
    const styleTag = document.createElement('style');
    styleTag.id = 'suno-copilot-style';
    styleTag.textContent = this.styles;
    document.head.appendChild(styleTag);
  }

  createGlobalElements() {
    if (typeof document === 'undefined') return;

    // 1. 创建三层白话浮动卡片 (纯 fixed 视口定位)
    let card = document.getElementById('suno-copilot-card');
    if (!card) {
      card = document.createElement('div');
      card.id = 'suno-copilot-card';
      document.body.appendChild(card);

      this.isolateEvents(card);

      // 双向悬停平滑过渡：鼠标或笔尖移入卡片时保持显示
      card.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
          clearTimeout(this.hideTimer);
        }
      });

      card.addEventListener('pointerleave', (e) => {
        if (!this.isPinned && (e.pointerType === 'mouse' || e.pointerType === 'pen')) {
          this.hideTimer = setTimeout(() => {
            if (!this.isPinned) this.hideCard();
          }, 200);
        }
      });
    }
    this.cardEl = card;

    // 2. 创建复制提示 Toast (成功/失败双态)
    let toast = document.getElementById('suno-copilot-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'suno-copilot-toast';
      toast.className = 'sc-toast';
      document.body.appendChild(toast);
    }
    this.toastEl = toast;

    // 3. 点击页面外部空白处关闭固定的卡片
    document.addEventListener('click', (e) => {
      if (this.isPinned && this.cardEl && !this.cardEl.contains(e.target)) {
        if (!this.currentActiveBadge || !this.currentActiveBadge.contains(e.target)) {
          this.hideCard();
        }
      }
    });

    // 4. 创建右下角灵感速查浮球
    this.createFloatBall();
  }

  isolateEvents(element) {
    const events = ['click', 'pointerdown', 'pointerup', 'touchstart', 'touchend', 'mousedown', 'mouseup'];
    events.forEach(evt => {
      element.addEventListener(evt, (e) => e.stopPropagation());
    });
  }

  createFloatBall() {
    if (document.getElementById('suno-copilot-float-ball')) return;
    const ball = document.createElement('div');
    ball.id = 'suno-copilot-float-ball';
    ball.title = 'Suno 音乐创作速查手册';
    ball.textContent = '🎵';

    this.isolateEvents(ball);

    ball.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleCheatSheetDrawer();
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

    this.isolateEvents(drawer);
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

    if (this.activeDrawerTab !== 'all') {
      filtered = filtered.filter(item => item.category === this.activeDrawerTab);
    }

    if (this.drawerSearchQuery) {
      filtered = filtered.filter(item => {
        const text = `${item.term} ${item.zh_name} ${item.tier1_vernacular} ${item.prompt_tag || ''}`.toLowerCase();
        return text.includes(this.drawerSearchQuery);
      });
    }

    if (filtered.length === 0) {
      bodyEl.innerHTML = `<div style="text-align:center; padding:2rem 1rem; color:rgba(255,255,255,0.5); font-size:0.85rem;">未找到相关标签，换个词试试~</div>`;
      return;
    }

    const categoryLabels = {
      song_structure: '歌曲结构骨干 (Song Structure)',
      vocals_performance: '演唱风格与人声情绪 (Vocals)',
      genres_and_styles: '主流曲风与流派 (Genres)',
      production_params: '编曲与声学参数 (Parameters)',
      ui_core: '制作人核心功能 (UI Controls)'
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
        const hasCopyTag = Boolean(item.prompt_tag);
        bodyHtml += `
          <div class="sc-quick-tag" data-copy="${this.escapeHtml(copyText)}" data-has-tag="${hasCopyTag}" title="${this.escapeHtml(item.tier1_vernacular)}">
            <strong>${this.escapeHtml(item.term)}</strong>
            <span style="opacity:0.75; font-size:0.75rem; margin-left:0.25rem;">${this.escapeHtml(shortZh)}</span>
          </div>
        `;
      });
      bodyHtml += `</div>`;
    }

    bodyEl.innerHTML = bodyHtml;

    bodyEl.querySelectorAll('.sc-quick-tag').forEach(tagEl => {
      tagEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const copyText = e.currentTarget.getAttribute('data-copy');
        const hasTag = e.currentTarget.getAttribute('data-has-tag') === 'true';
        if (hasTag || copyText.startsWith('[') || copyText.includes(',')) {
          this.copyToClipboard(copyText);
        } else {
          this.showToast(`提示: 这是操作项，按指引在页面点击即可`, 'success');
        }
      });
    });
  }

  isEditableOrIgnored(el) {
    if (!el) return true;

    // 1. 严格检查是否处于可编辑区域（contenteditable 或 role="textbox"）
    if (el.isContentEditable) return true;
    if (el.closest && el.closest('[contenteditable="true"], input, textarea, [role="textbox"]')) {
      return true;
    }

    // 2. 避免处理我们自己的插件元素
    if (el.closest && el.closest('#suno-copilot-card, #suno-copilot-drawer, #suno-copilot-float-ball, .suno-copilot-companion, .suno-copilot-badge, .suno-copilot-subtext')) {
      return true;
    }

    return false;
  }

  scanAndInject() {
    if (typeof document === 'undefined') return;

    // 【严格按审查项 1 & 2 执行】：
    // 1. 徽标仅针对 category === 'ui_core' 的控制项
    // 2. 仅扫描真实的交互控件：button, [role="button"], label
    const uiTerms = this.glossary.filter(item => item.category === 'ui_core');
    if (uiTerms.length === 0) return;

    const elements = document.querySelectorAll('button, [role="button"], label');

    for (const el of elements) {
      if (el.dataset && el.dataset.scProcessed) continue;
      if (this.isEditableOrIgnored(el)) continue;

      const rawText = el.textContent ? el.textContent.trim().replace(/\s+/g, ' ') : '';
      if (!rawText || rawText.length > 30) continue;

      for (const item of uiTerms) {
        const cleanTerm = item.term.replace(/^\[|\]$/g, '').trim();
        const regexExact = new RegExp(`^${this.escapeRegExp(cleanTerm)}$`, 'i');

        let matched = regexExact.test(rawText);
        if (!matched && cleanTerm === 'Crop Audio' && /^Crop$/i.test(rawText)) matched = true;
        if (!matched && cleanTerm === 'Create Persona' && /^Persona$/i.test(rawText)) matched = true;

        if (matched) {
          this.injectBadge(el, item);
          break;
        }
      }
    }
  }

  injectBadge(targetEl, item) {
    if (targetEl.dataset) {
      targetEl.dataset.scProcessed = 'true';
    }

    // 【严格按审查项 2 执行】：徽标与中文小标题放在控件旁边的独立兄弟节点，绝不进入按钮内部！
    const companion = document.createElement('span');
    companion.className = 'suno-copilot-companion';
    companion.style.display = 'inline-flex';
    companion.style.alignItems = 'center';
    companion.style.verticalAlign = 'middle';
    companion.style.marginLeft = '0.35rem';

    // 1. 添加中文辅助小标题
    const subtext = document.createElement('span');
    subtext.className = 'suno-copilot-subtext';
    const shortZh = item.zh_name.split('/')[0].split('(')[0].trim();
    subtext.textContent = `(${shortZh})`;
    companion.appendChild(subtext);

    // 2. 添加问号徽标
    const badge = document.createElement('span');
    badge.className = 'suno-copilot-badge';
    badge.textContent = '?';
    badge.title = `点击查看 ${item.term} 通俗白话讲解`;

    // 彻底隔离徽标自身的指针/点击事件
    this.isolateEvents(badge);

    // 3. 【核心双模交互】：适配三星平板 S-Pen 悬浮与手指触控
    badge.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        clearTimeout(this.hideTimer);
        this.showTimer = setTimeout(() => {
          if (!this.isPinned) {
            this.showCard(item, badge, false);
          }
        }, 150);
      }
    });

    badge.addEventListener('pointerleave', (e) => {
      clearTimeout(this.showTimer);
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        if (!this.isPinned) {
          this.hideTimer = setTimeout(() => {
            if (!this.isPinned) this.hideCard();
          }, 200);
        }
      }
    });

    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);

      if (this.isPinned && this.currentActiveBadge === badge) {
        this.hideCard();
      } else {
        this.isPinned = true;
        this.showCard(item, badge, true);
      }
    });

    companion.appendChild(badge);

    // 作为兄弟节点插入在控件后面
    const parent = targetEl.parentElement || targetEl.parentNode;
    if (parent) {
      const next = targetEl.nextElementSibling || targetEl.nextSibling;
      if (next) {
        parent.insertBefore(companion, next);
      } else {
        parent.appendChild(companion);
      }
    } else if (targetEl.insertAdjacentElement) {
      targetEl.insertAdjacentElement('afterend', companion);
    }
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

    // 【解决 B3】：完整展示第三层正文 (tier3_example)，区分可复制标签与功能项
    let tier3ContentHtml = `
      <div class="sc-badge-label tier3">🚀 第三层：提示词与效果示例</div>
      <pre class="sc-tier3-example">${this.escapeHtml(item.tier3_example)}</pre>
    `;

    if (item.prompt_tag && item.prompt_tag.trim()) {
      tier3ContentHtml += `
        <div class="sc-copy-block" id="sc-prompt-copy-trigger" title="点击复制此提示词标签">
          <span class="sc-code-snippet">${this.escapeHtml(item.prompt_tag)}</span>
          <span class="sc-copy-icon">点击复制</span>
        </div>
      `;
    } else {
      tier3ContentHtml += `
        <div class="sc-ui-tip">💡 界面控制项：无需复制标签，按第二层指引在页面操作即可。</div>
      `;
    }

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

      <!-- 第三层：完整示例与真实复制 -->
      <div class="sc-section" style="margin-bottom: 0;">
        ${tier3ContentHtml}
      </div>
    `;

    // 绑定关闭按钮事件
    const closeBtn = this.cardEl.querySelector('#sc-card-close-trigger');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideCard();
      });
    }

    // 绑定一键复制事件
    const copyTrigger = this.cardEl.querySelector('#sc-prompt-copy-trigger');
    if (copyTrigger) {
      copyTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.copyToClipboard(item.prompt_tag);
      });
    }

    // 视口定位
    this.positionCard(targetBadge);
    this.cardEl.classList.add('active');
  }

  positionCard(targetBadge) {
    if (!targetBadge || !this.cardEl) return;

    // 【解决 B2】：纯基于 getBoundingClientRect() 计算 viewport-relative fixed 坐标，绝不加 scrollX / scrollY
    const badgeRect = targetBadge.getBoundingClientRect();
    const cardWidth = 368;
    const cardHeight = Math.min(this.cardEl.offsetHeight || 380, window.innerHeight * 0.82);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = badgeRect.left;
    let top = badgeRect.bottom + 8;

    if (left + cardWidth > viewportWidth - 16) {
      left = viewportWidth - cardWidth - 16;
    }
    if (left < 16) left = 16;

    if (top + cardHeight > viewportHeight - 16) {
      if (badgeRect.top - cardHeight - 8 >= 16) {
        top = badgeRect.top - cardHeight - 8;
      } else {
        top = Math.max(16, viewportHeight - cardHeight - 16);
      }
    }

    this.cardEl.style.left = `${Math.round(left)}px`;
    this.cardEl.style.top = `${Math.round(top)}px`;
  }

  hideCard() {
    this.isPinned = false;
    this.currentActiveBadge = null;
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
    if (this.cardEl) {
      this.cardEl.classList.remove('active');
    }
  }

  async copyToClipboard(text) {
    if (!text) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!successful) throw new Error('execCommand copy returned false');
      } else {
        throw new Error('No clipboard API available');
      }
      this.showToast(`已复制: ${text}`, 'success');
    } catch (err) {
      console.warn('[Suno Copilot] 复制失败:', err);
      this.showToast('复制未成功，请长按手动复制', 'error');
    }
  }

  showToast(msg, type = 'success') {
    if (!this.toastEl) return;
    this.toastEl.textContent = msg;
    this.toastEl.className = `sc-toast show ${type}`;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      if (this.toastEl) {
        this.toastEl.classList.remove('show');
      }
    }, 2000);
  }

  startObserver() {
    if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;

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
