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

// 全界面导航、模式与功能汉化映射表
const UI_MENUS = {
  // 左侧主导航
  'Home': '首页',
  'Explore': '发现探索',
  'Create': '创作音乐',
  'Studio': '录音室',
  'Library': '我的音乐库',
  'Earn Credits': '获取积分',
  'Labs': '实验工坊',
  'Notifications': '消息通知',
  'More': '更多',
  '... More': '更多',
  'Upgrade to Premier': '升级 Premier',
  'Upgrade': '升级会员',

  // 顶部创作模式与功能按钮
  'Simple': '简易模式',
  'Advanced': '高级模式',
  'Sounds': '声音采样',
  '+ Audio': '+ 音频',
  '+ Voice': '+ 专属人声',
  '+ Inspo': '+ 创作灵感',
  '+ Image': '+ 参考图',

  // 创作工作区控制项
  'Lyrics': '歌词',
  'Style of Music': '风格描述',
  'Title': '歌曲标题',
  'Instrumental': '纯音乐',
  'Custom': '自定义模式',

  // 右侧工作区导航与日期分割
  'Workspaces': '工作区',
  'My Workspace': '我的工作区',
  'Search': '搜索',
  'Filters': '筛选',
  'Today': '今天',
  'Yesterday': '昨天',
  'Sunday': '星期日',
  'Monday': '星期一',
  'Tuesday': '星期二',
  'Wednesday': '星期三',
  'Thursday': '星期四',
  'Friday': '星期五',
  'Saturday': '星期六'
};

// 歌曲列表灰色音乐标签专业翻译词典 (按长度倒序匹配)
const MUSIC_DICTIONARY = [
  // 复合词条 (长短语优先)
  { en: 'cheerful acoustic guitar folk', zh: '欢快原声木吉他民谣' },
  { en: 'cheerful acoustic folk-pop', zh: '欢快原声民谣流行' },
  { en: 'brisk gentle fingerpicking', zh: '轻快柔和指弹吉他' },
  { en: 'minimalist neoclassical', zh: '极简新古典' },
  { en: 'ambient meditation', zh: '氛围冥想' },
  { en: 'electronic dance with saturated sub-bass', zh: '电子舞曲，融合饱满超重低音' },
  { en: 'driving rhythmic groove', zh: '强劲律动节奏' },
  { en: 'pulsing synthesizer lead and sequen...', zh: '脉冲合成器主奏及音序' },
  { en: 'pulsing synthesizer lead and sequencer', zh: '脉冲合成器主奏及音序器' },
  { en: 'pulsing synthesizer lead', zh: '脉冲合成器主奏' },
  { en: 'saturated sub-bass', zh: '饱满超重低音' },
  { en: 'light and breezy', zh: '轻松惬意' },
  { en: 'upbeat and cheerful', zh: '欢快明亮' },
  { en: 'warm and cozy', zh: '温暖治愈' },
  { en: 'rhythmic synthesizer instrumental', zh: '节奏合成器纯音乐' },
  { en: 'rhythmic synthesizer', zh: '节奏合成器' },
  { en: 'electronic dance', zh: '电子舞曲 (EDM)' },
  { en: 'acoustic guitar folk', zh: '原声木吉他民谣' },
  { en: 'acoustic guitar', zh: '原声木吉他' },
  { en: 'electric guitar', zh: '电吉他' },
  { en: 'acoustic folk-pop', zh: '原声民谣流行' },
  { en: 'acoustic folk', zh: '原声民谣' },
  { en: 'fingerpicking guitar', zh: '指弹吉他' },
  { en: 'fingerpicking', zh: '指弹吉他' },
  { en: 'grand piano', zh: '大三角钢琴' },
  { en: 'upright piano', zh: '立式钢琴' },
  { en: 'electric piano', zh: '电钢琴' },
  { en: 'synth lead', zh: '合成器领奏' },
  { en: 'synth pad', zh: '合成器铺底' },
  { en: 'synth-pop', zh: '合成器流行' },
  { en: 'synthwave', zh: '复古合成器浪潮' },
  { en: 'city pop', zh: '都市流行 (City Pop)' },
  { en: 'indie pop', zh: '独立流行' },
  { en: 'indie rock', zh: '独立摇滚' },
  { en: 'pop rock', zh: '流行摇滚' },
  { en: 'hard rock', zh: '硬摇滚' },
  { en: 'punk rock', zh: '朋克摇滚' },
  { en: 'heavy metal', zh: '重金属' },
  { en: 'hip hop', zh: '嘻哈说唱' },
  { en: 'hip-hop', zh: '嘻哈说唱' },
  { en: 'boom bap', zh: '经典硬核说唱 (Boom Bap)' },
  { en: 'drum and bass', zh: '鼓打贝斯 (DnB)' },
  { en: 'future bass', zh: '未来贝斯' },
  { en: 'deep house', zh: '深邃浩室' },
  { en: 'smooth jazz', zh: '顺滑爵士' },
  { en: 'bossa nova', zh: '波萨诺瓦' },
  { en: 'female vocals', zh: '女声演唱' },
  { en: 'female vocal', zh: '女声' },
  { en: 'male vocals', zh: '男声演唱' },
  { en: 'male vocal', zh: '男声' },
  { en: 'backing vocals', zh: '背景伴唱' },
  { en: 'airy vocals', zh: '空灵人声' },
  { en: 'raspy vocals', zh: '烟熏沙哑嗓' },
  { en: 'string quartet', zh: '弦乐四重奏' },

  // 基础单项与风格词
  { en: 'cheerful', zh: '欢快' },
  { en: 'breezy', zh: '微风惬意' },
  { en: 'brisk', zh: '轻快' },
  { en: 'gentle', zh: '温柔' },
  { en: 'driving', zh: '强劲驱动' },
  { en: 'ambient', zh: '氛围' },
  { en: 'meditation', zh: '冥想' },
  { en: 'minimalist', zh: '极简' },
  { en: 'neoclassical', zh: '新古典' },
  { en: 'electronic', zh: '电子' },
  { en: 'dance', zh: '舞曲' },
  { en: 'folk', zh: '民谣' },
  { en: 'pop', zh: '流行' },
  { en: 'rock', zh: '摇滚' },
  { en: 'metal', zh: '金属' },
  { en: 'jazz', zh: '爵士' },
  { en: 'blues', zh: '蓝调' },
  { en: 'classical', zh: '古典' },
  { en: 'orchestral', zh: '管弦交响' },
  { en: 'cinematic', zh: '电影原声' },
  { en: 'reggae', zh: '雷鬼' },
  { en: 'reggaeton', zh: '雷鬼动' },
  { en: 'funk', zh: '放克' },
  { en: 'disco', zh: '迪斯科' },
  { en: 'house', zh: '浩室' },
  { en: 'techno', zh: '铁克诺' },
  { en: 'trance', zh: '迷幻' },
  { en: 'trap', zh: '陷阱说唱' },
  { en: 'rap', zh: '说唱' },
  { en: 'rnb', zh: '节奏布鲁斯' },
  { en: 'soul', zh: '灵魂乐' },
  { en: 'lo-fi', zh: '低保真' },
  { en: 'lofi', zh: '低保真' },
  { en: 'country', zh: '乡村' },
  { en: 'latin', zh: '拉丁' },
  { en: 'bachata', zh: '巴恰塔' },
  { en: 'instrumental', zh: '纯音乐' },
  { en: 'synthesizer', zh: '合成器' },
  { en: 'piano', zh: '钢琴' },
  { en: 'guitar', zh: '吉他' },
  { en: 'bass', zh: '贝斯' },
  { en: 'strings', zh: '弦乐' },
  { en: 'violin', zh: '小提琴' },
  { en: 'cello', zh: '大提琴' },
  { en: 'drums', zh: '鼓点' },
  { en: 'percussion', zh: '打击乐' },
  { en: 'flute', zh: '长笛' },
  { en: 'saxophone', zh: '萨克斯' },
  { en: 'trumpet', zh: '小号' },
  { en: 'choir', zh: '合唱' },
  { en: 'harmonies', zh: '和声' },
  { en: 'vocal', zh: '人声' },
  { en: 'vocals', zh: '人声' },
  { en: 'acoustic', zh: '原声' },
  { en: 'groove', zh: '律动' },
  { en: 'rhythm', zh: '节奏' },
  { en: 'rhythmic', zh: '节奏感' },
  { en: 'tempo', zh: '速度' },
  { en: 'beat', zh: '节拍' },
  { en: 'melodic', zh: '旋律感' },
  { en: 'dreamy', zh: '梦幻' },
  { en: 'chill', zh: '惬意放松' },
  { en: 'relaxing', zh: '放松' },
  { en: 'peaceful', zh: '平静' },
  { en: 'dark', zh: '暗黑' },
  { en: 'melancholic', zh: '忧郁' },
  { en: 'sad', zh: '伤感' },
  { en: 'emotional', zh: '深情' },
  { en: 'energetic', zh: '高能活力' },
  { en: 'epic', zh: '史诗' },
  { en: 'uplifting', zh: '昂扬振奋' },
  { en: 'romantic', zh: '浪漫' },
  { en: 'nostalgic', zh: '怀旧' },
  { en: 'intense', zh: '激烈' },
  { en: 'hypnotic', zh: '催眠迷幻' },
  { en: 'quirky', zh: '搞怪' },
  { en: 'moody', zh: '氛围情绪' },
  { en: 'with', zh: '融合' },
  { en: 'and', zh: '与' }
];
MUSIC_DICTIONARY.sort((a, b) => b.en.length - a.en.length);

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
    if (el.closest && el.closest('#suno-copilot-card, #suno-copilot-drawer, #suno-copilot-float-ball, .suno-copilot-companion, .suno-copilot-badge, .suno-copilot-subtext, .suno-copilot-nav-zh, .suno-copilot-song-desc-zh')) {
      return true;
    }

    return false;
  }

  scanAndInject() {
    if (typeof document === 'undefined') return;

    // 1. 核心制作人控件（问号徽标 + 三层通俗白话卡片）
    this.scanProducerBadges();

    // 2. 全界面导航与功能菜单汉化（左侧导航、顶部模式、工作区表头）
    this.scanNavigationAndMenus();

    // 3. 输入框与占位提示语汉化 (Search / Lyrics placeholder)
    this.scanPlaceholders();

    // 4. 右侧歌曲列表灰字风格/乐器/情绪描述专业翻译 (全曲风汉化)
    this.scanSongDescriptions();
  }

  scanProducerBadges() {
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
        if (!matched && cleanTerm === 'Custom' && /^Advanced$/i.test(rawText)) matched = true;
        if (!matched && cleanTerm === 'Lyrics' && /^Lyrics$/i.test(rawText)) matched = true;
        if (!matched && cleanTerm === 'Model v3.5 / v4' && /^(?:Model\s*)?v\d+(?:\.\d+)?$/i.test(rawText)) matched = true;

        if (matched) {
          this.injectBadge(el, item);
          break;
        }
      }
    }
  }

  scanNavigationAndMenus() {
    const candidates = document.querySelectorAll('a, button, [role="button"], nav span, aside span, header span, div[role="tab"]');

    for (const el of candidates) {
      if (this.isEditableOrIgnored(el)) continue;
      if (el.dataset && el.dataset.scNavProcessed) continue;

      // 避免同一按钮或链接内部层级重复追加
      const wrapper = el.closest && el.closest('a, button, [role="button"]');
      if (wrapper && wrapper !== el && wrapper.querySelector && (wrapper.querySelector('.suno-copilot-nav-zh') || wrapper.querySelector('.suno-copilot-subtext'))) {
        continue;
      }
      if (el.querySelector && (el.querySelector('.suno-copilot-nav-zh') || el.querySelector('.suno-copilot-subtext'))) {
        continue;
      }

      const rawText = el.textContent ? el.textContent.trim().replace(/\s+/g, ' ') : '';
      if (!rawText || rawText.length > 40) continue;

      // 匹配静态字典
      let zh = UI_MENUS[rawText];

      // 匹配动态 Filters (3)
      if (!zh) {
        const filterMatch = rawText.match(/^Filters(?:\s*\((\d+)\))?$/i);
        if (filterMatch) {
          zh = filterMatch[1] ? `筛选 (${filterMatch[1]})` : '筛选';
        }
      }

      // 匹配模型版本如 v6
      if (!zh && /^v\d+(?:\.\d+)?$/i.test(rawText)) {
        zh = `第${rawText.slice(1)}代模型`;
      }

      if (zh) {
        if (el.dataset) el.dataset.scNavProcessed = 'true';
        el.title = `${rawText} (${zh})`;

        const navSpan = document.createElement('span');
        navSpan.className = 'suno-copilot-nav-zh';
        navSpan.textContent = `(${zh})`;

        // 将汉化副标签以只读、穿透形式优雅附着在文本后方
        el.appendChild(navSpan);
      }
    }
  }

  scanPlaceholders() {
    const inputs = document.querySelectorAll('input, textarea');
    for (const el of inputs) {
      // 避免处理我们插件自身的输入框（如速查卡抽屉搜索框）
      if (el.closest && el.closest('#suno-copilot-drawer, #suno-copilot-card')) continue;

      const ph = el.placeholder || (el.getAttribute && el.getAttribute('placeholder'));
      if (!ph || (el.dataset && el.dataset.scPhProcessed)) continue;

      if (/^Search$/i.test(ph.trim())) {
        el.placeholder = 'Search (搜索歌曲/风格...)';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (ph.includes('Start writing lyrics') && !ph.includes('输入歌词')) {
        el.placeholder = 'Start writing lyrics, or leave this empty for instrumental (输入歌词，或留空生成纯音乐)';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (ph.includes('Describe the style') && !ph.includes('描述风格')) {
        el.placeholder = 'Describe the style of music you want... (描述想要的音乐风格/流派/乐器...)';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      }
    }
  }

  scanSongDescriptions() {
    // 扫描可能包含歌曲风格描述的文本节点 (p, span, div)
    const candidates = document.querySelectorAll('p, span, div');
    for (const el of candidates) {
      if (this.isEditableOrIgnored(el)) continue;
      if (el.dataset && el.dataset.scDescProcessed) continue;

      // 排除具有复杂块级子节点的容器
      if (el.children && el.children.length > 0) {
        const hasBlockChildren = Array.from(el.children).some(c => !['SPAN', 'EM', 'STRONG', 'B', 'I'].includes(c.tagName));
        if (hasBlockChildren) continue;
      }

      const rawText = el.textContent ? el.textContent.trim() : '';
      if (!rawText || rawText.length < 5 || rawText.length > 300) continue;

      // 快速特征校验：是否呈现音乐风格、情绪、乐器特征
      if (!this.looksLikeMusicDescription(rawText)) continue;

      // 执行专业翻译
      const translation = this.translateMusicDescription(rawText);
      if (!translation || translation === rawText) continue;

      if (el.dataset) el.dataset.scDescProcessed = 'true';
      el.title = `【中文译意】${translation}`;

      // 避免重复插入
      const next = el.nextElementSibling || el.nextSibling;
      if (next && next.classList && next.classList.contains('suno-copilot-song-desc-zh')) {
        continue;
      }

      // 创建独立的歌曲描述翻译栏
      const zhDiv = document.createElement('div');
      zhDiv.className = 'suno-copilot-song-desc-zh';
      zhDiv.textContent = `【中文】${translation}`;
      zhDiv.title = `完整译意: ${translation}`;
      this.isolateEvents(zhDiv);

      const parent = el.parentElement || el.parentNode;
      if (parent) {
        if (next) {
          parent.insertBefore(zhDiv, next);
        } else {
          parent.appendChild(zhDiv);
        }
      }
    }
  }

  looksLikeMusicDescription(text) {
    if (!text || typeof text !== 'string') return false;
    // 排除纯数字、时间戳如 2:02
    if (/^\d+:\d+$/.test(text.trim())) return false;
    // 排除纯系统菜单词条
    if (/^(Today|Yesterday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Search|Filters)$/i.test(text.trim())) return false;

    const musicKeywords = [
      'acoustic', 'guitar', 'folk', 'pop', 'dance', 'electronic', 'rock', 'synth',
      'ambient', 'meditation', 'minimalist', 'classical', 'piano', 'bass', 'groove',
      'rhythmic', 'drums', 'sub-bass', 'breezy', 'cheerful', 'upbeat', 'slow',
      'fast', 'tempo', 'vocal', 'vocals', 'instrumental', 'hip hop', 'trap', 'jazz',
      'blues', 'soul', 'funk', 'metal', 'lo-fi', 'lofi', 'house', 'techno', 'edm',
      'string', 'violin', 'lead', 'sequen', 'beat', 'drop', 'melancholic', 'chill',
      'emotional', 'epic', 'dark', 'warm', 'brass', 'saxophone', 'fingerpicking'
    ];

    const lower = text.toLowerCase();
    return musicKeywords.some(kw => lower.includes(kw));
  }

  translateMusicDescription(text) {
    if (!text || typeof text !== 'string') return '';
    const trimmed = text.trim();
    if (!trimmed) return '';

    // 按逗号或分号拆分段落
    const segments = trimmed.split(/[,;]+/).map(s => s.trim()).filter(Boolean);
    if (segments.length === 0) return '';

    const translatedSegments = segments.map(seg => {
      const lower = seg.toLowerCase();

      // 1. 完全精确匹配
      for (const entry of MUSIC_DICTIONARY) {
        if (lower === entry.en.toLowerCase()) {
          return entry.zh;
        }
      }

      // 2. 词段内部短语替换
      let res = seg;
      for (const entry of MUSIC_DICTIONARY) {
        const reg = new RegExp('\\b' + entry.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
        if (reg.test(res)) {
          res = res.replace(reg, entry.zh);
        }
      }

      // 3. 处理保留的连接词
      res = res.replace(/\bwith\b/gi, '融合')
               .replace(/\band\b/gi, '与')
               .replace(/\s+/g, ' ')
               .trim();

      return res;
    });

    return translatedSegments.join('，');
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
