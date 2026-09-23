// ==UserScript==
// @name         Suno 音乐通 (Suno Partner / Copilot) - 汉化与三层音乐白话讲解
// @namespace    https://github.com/suno-partner
// @version      1.1.0
// @description  专为零基础打造的 Suno.com 伴侣：界面汉化、三层通俗音乐术语讲解、适配三星平板 S-Pen 悬浮与触控、歌词语法糖一键复制。
// @author       Suno Partner Team
// @match        https://suno.com/*
// @icon         https://suno.com/favicon.ico
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // 1. 独家五维三层通俗白话核心词库 (50 词条)
  const SUNO_GLOSSARY = [
  {
    "id": "custom_mode",
    "term": "Custom",
    "category": "ui_core",
    "zh_name": "自定义模式 (制作人开关)",
    "tier1_vernacular": "关闭时，你只能输入一句话（如“写首下雨天的歌”），由 AI 全权瞎猜并自动生成歌词；打开后，你变成专业制作人，可以自己填词、选流派、定歌名、控制结构。",
    "tier2_suno_usage": "【强烈推荐默认常开】在页面上方找到 Custom 开关打开。打开后会展开 Lyrics（歌词框）、Style of Music（风格框）和 Title（标题框）。",
    "tier3_example": "关闭状态：只生成随缘口水歌；\n打开状态：可以用 [Verse]、[Chorus] 配合各种专业风格进行精准编曲控制。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "instrumental",
    "term": "Instrumental",
    "category": "ui_core",
    "zh_name": "纯音乐 / 无人声伴奏",
    "tier1_vernacular": "开启后整首歌只有乐器演奏，不会出现任何人类唱歌或说话的声音。相当于常说的伴奏带、背景音乐（BGM）。",
    "tier2_suno_usage": "点击打开 Instrumental 开关后，歌词输入框（Lyrics）会自动消失或被禁用，只保留 Style of Music（风格框）。",
    "tier3_example": "适用场景：做视频背景音乐、咖啡厅轻音乐、助眠白噪音、播客片头垫乐。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "extend",
    "term": "Extend",
    "category": "ui_core",
    "zh_name": "续写 / 延长歌曲",
    "tier1_vernacular": "Suno 一次通常只生成 2~4 分钟。如果这首歌没唱完，或者你觉得意犹未尽想再加一段尾奏，可以用这个功能从指定时间点接着往后创作。",
    "tier2_suno_usage": "在喜欢的歌曲右侧点击“三点菜单”选择 Extend。设置“Extend from”（从几分几秒接着唱），然后在输入框里写新段落的歌词（如结尾 [Outro]）。生成后点击 Get Whole Song 即可拼合成完整长歌。",
    "tier3_example": "原曲 01:50 突然戛然而止 -> 设置 Extend from 01:45 -> 歌词框写 [Chorus] 再接 [Outro] -> 完美收尾。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "get_stems",
    "term": "Get Stems",
    "category": "ui_core",
    "zh_name": "分轨提取 (人声与伴奏分离)",
    "tier1_vernacular": "把一首合成好的完整歌曲像变魔术一样“拆解”，剥离成独立的两条音轨：一条是干净纯净的人声（Vocal），另一条是没有人声的纯乐器伴奏（Instrumental）。",
    "tier2_suno_usage": "点击歌曲右侧的菜单，选择 Get Stems。Suno 会消耗少量点数生成两个单独的音频条目供你试听和分别下载。",
    "tier3_example": "实战用途：\n1. 提取伴奏去唱 KTV；\n2. 提取干声放到剪映、Logic、FL Studio 里重新混音对齐。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "reuse_prompt",
    "term": "Reuse Prompt",
    "category": "ui_core",
    "zh_name": "复用提示词与参数",
    "tier1_vernacular": "“一键抄作业”。把你或别人某首特别成功的歌所用的全部配方（歌词、风格词、使用的模型版本）原封不动拷贝回左侧编辑区，方便微调。",
    "tier2_suno_usage": "在任意一首歌的菜单中点击 Reuse Prompt。左侧的 Style 和 Lyrics 会瞬间被填满，你只需改动其中几个词即可重掷骰子。",
    "tier3_example": "看到别人做出的蒸汽波非常带感，点击 Reuse Prompt，把歌词换成你自己的情书，即可生成同款质感的新歌。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "replace_section",
    "term": "Replace Section",
    "category": "ui_core",
    "zh_name": "局部重绘 / 局部替换修歌",
    "tier1_vernacular": "整首歌旋律 90% 都很绝，偏偏某句歌词发音跑调、或者中间有段杂音？这个功能就是“橡皮擦”，只把选定时间范围内的那几秒重新生成，其余完美部分保持不变。",
    "tier2_suno_usage": "在歌曲菜单选 Edit Song -> Replace Section。拖动波形上的起始滑块选定问题区间（比如 00:45 - 00:52），修改该区间的歌词或微调风格后重新生成。",
    "tier3_example": "00:30 秒处的中文多音字念错了 -> 框选 00:28 到 00:33 -> 修正同音字重新生成。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "crop",
    "term": "Crop Audio",
    "category": "ui_core",
    "zh_name": "裁剪音频",
    "tier1_vernacular": "类似手机相册里的裁切照片。直接把歌曲开头多余的冗长空白、或者结尾拖沓难听的杂音直接切掉。",
    "tier2_suno_usage": "在菜单选择 Crop Audio，拖动左端或右端时间指针，保存为一个新的干净音频片段。",
    "tier3_example": "歌曲前 15 秒没有任何声音在干等 -> 拖动左端滑块至 00:15 -> 保存为干净利落的开头。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "persona",
    "term": "Create Persona",
    "category": "ui_core",
    "zh_name": "固定歌手音色 (虚拟歌手人设)",
    "tier1_vernacular": "Suno 每次生成的歌手声音都是随机的。如果你很喜欢某首歌里那个女声/男声的独特磁性音色，用这个功能可以把这个“虚拟歌手”永久保存下来，以后写新歌还能让她/他继续当主唱。",
    "tier2_suno_usage": "在满意歌曲的菜单点击 Create Persona，输入歌手名字（如“赛博甜心”）。在后续写新歌时勾选该 Persona 即可锁定音色。",
    "tier3_example": "为你的虚拟偶像或音乐频道打造始终如一的专属声音辨识度。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "exclude_styles",
    "term": "Exclude Styles",
    "category": "ui_core",
    "zh_name": "排除风格 (负向提示词)",
    "tier1_vernacular": "告诉 AI“绝对不要出现什么”。比如你想要宁静的吉他曲，但 AI 老是给你加上轰隆隆的架子鼓或吵闹的电子噪音，你就可以把它们拉进黑名单。",
    "tier2_suno_usage": "在高级选项（Advanced Options）中展开 Exclude Styles 输入框，用英文逗号隔开你讨厌的元素。",
    "tier3_example": "想要清澈民谣时在排除框填入：drums, heavy bass, electronic synths, autotune, screaming",
    "prompt_tag": "drums, autotune, heavy distortion",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "weirdness_vibe",
    "term": "Weirdness",
    "category": "ui_core",
    "zh_name": "离谱度 / 创新冒险系数",
    "tier1_vernacular": "控制 AI 的“天马行空程度”。拉到最低时，AI 会严格按最经典的流行套路出牌，安全但平庸；拉高时，AI 会尝试大胆怪异的和弦、奇特的变调或意外乐器，惊喜与翻车并存。",
    "tier2_suno_usage": "在高级设置中调节滑块。日常做流行歌建议保持在默认中低档（0.2-0.5）；做先锋实验音乐或想要脑洞大开时拉到 0.8 以上。",
    "tier3_example": "低档：标准商业电台情歌；高档：充满迷幻音效与超现实转调的实验乐章。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "cover_song",
    "term": "Cover Song",
    "category": "ui_core",
    "zh_name": "翻唱 / 重混风格 (曲风重构)",
    "tier1_vernacular": "保留原歌的歌词和核心旋律走向，但彻底换一种完全不同的乐器和曲风去演奏（例如把一首重金属摇滚爆改变成柔情似水的爵士乐，或把抒情民谣改造成动感 EDM）。",
    "tier2_suno_usage": "在已有音频旁点击 Create Cover，然后输入全新的 Style of Music 风格词，点击生成即可获得全新风味的改编版本。",
    "tier3_example": "原曲是深情流行慢歌 -> Cover 输入 'bossa nova, acoustic nylon guitar, cafe vibes' -> 瞬间变身午后咖啡厅波萨诺瓦。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "upload_audio",
    "term": "Upload Audio",
    "category": "ui_core",
    "zh_name": "上传参考音频 (用自己的哼唱起手)",
    "tier1_vernacular": "把你用手机录下的 6-60 秒自己清唱、口哨哼唱或吉他弹奏的语音片段上传给 Suno，让 AI 顺着你原创的调子继续往下编曲编整首歌。",
    "tier2_suno_usage": "在左侧侧边栏点击 Upload Audio，上传你的录音。上传完成后，对该片段点击 Extend，输入风格词与后续歌词即可扩写成完整大作。",
    "tier3_example": "洗澡时哼了一句灵感旋律录下来 -> 上传 -> Suno 自动配上架子鼓、和声和贝斯展开成 3 分钟大歌。",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "model_version",
    "term": "Model v3.5 / v4",
    "category": "ui_core",
    "zh_name": "生成引擎版本 (v3.5 与 v4 区别)",
    "tier1_vernacular": "• v3.5：生成速度快、曲风包容度极广、旋律洗脑流畅，但音质偶尔有轻微数字压缩感；\n• v4：旗舰发烧引擎，人声咬字极其清晰、母带级声场与乐器细节爆炸，编曲更具层次。",
    "tier2_suno_usage": "在输入区顶部切换模型版本。新手起稿测旋律可用 v3.5 快速试错；正式定稿作品强烈建议选用 v4。",
    "tier3_example": "草稿构思：v3.5\n高质量母带发布：v4",
    "prompt_tag": "",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "intro",
    "term": "[Intro]",
    "category": "song_structure",
    "zh_name": "前奏 / 引子",
    "tier1_vernacular": "歌曲刚开始时的引子，歌手还没开口前的纯音乐铺垫。用来定基调、抓人耳朵，告诉听众这是一首欢快的歌还是一首悲伤的歌。",
    "tier2_suno_usage": "写在歌词文本框的最第一行。在方括号后可加上听感描述指令引导编曲气氛。",
    "tier3_example": "[Intro: Soft acoustic guitar picking, gentle rain sounds]\n（空两行后再进入正文歌词）",
    "prompt_tag": "[Intro]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "verse",
    "term": "[Verse]",
    "category": "song_structure",
    "zh_name": "主歌 (叙事铺垫段落)",
    "tier1_vernacular": "歌曲讲故事的部分。旋律通常平稳、娓娓道来，歌词字数相对较多，负责交代时间、地点、心情，像小说里的开场白。",
    "tier2_suno_usage": "通常标记为 [Verse 1]、[Verse 2]。第一遍主歌通常在 Intro 之后，第二遍通常在第一次副歌结束之后。",
    "tier3_example": "[Verse 1]\n街角的咖啡店已经打烊，\n路灯拉长了倒影摇晃。\n手中的温热渐渐变凉，\n你在哪个远方？",
    "prompt_tag": "[Verse 1]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "pre_chorus",
    "term": "[Pre-Chorus]",
    "category": "song_structure",
    "zh_name": "导歌 / 预副歌 (副歌前的情绪爬坡)",
    "tier1_vernacular": "连接主歌和副歌的“斜坡”。旋律开始逐渐高亢，鼓点开始密集，听众一听就明白：“马上就要到高潮大合唱了！”",
    "tier2_suno_usage": "紧跟在 [Verse] 后面，放 2 句情绪递进的歌词，字数尽量简短有力。",
    "tier3_example": "[Pre-Chorus: Building energy, rising strings]\n心跳在加速，\n呼吸在屏住——",
    "prompt_tag": "[Pre-Chorus]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "chorus",
    "term": "[Chorus]",
    "category": "song_structure",
    "zh_name": "副歌 / 高潮 (最抓耳的核心乐段)",
    "tier1_vernacular": "整首歌的灵魂与高潮！所有人都会跟着大合唱的那几句，旋律最洗脑、情感最饱满、乐器编曲最丰富（鼓点最响、贝斯最重）。",
    "tier2_suno_usage": "一首歌通常出现 2~3 次。歌词要押韵、朗朗上口，Suno 遇到 [Chorus] 会自动爆发更强烈的乐器动态。",
    "tier3_example": "[Chorus: Powerful emotional vocals, full band drop]\n只要你还在我身旁，\n黑夜就能点亮星光！\n哪怕风暴撕裂过往，\n我们依然在破浪飞翔！",
    "prompt_tag": "[Chorus]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "bridge",
    "term": "[Bridge]",
    "category": "song_structure",
    "zh_name": "桥段 / 过渡转折段",
    "tier1_vernacular": "像歌曲高潮快结束时，突然换了个调子或节奏，让听众耳朵一亮的新鲜段落，专门为最后一次大高潮蓄力。避免整首歌千篇一律的疲劳感。",
    "tier2_suno_usage": "通常放在第二遍副歌（Chorus 2）之后。适合填入 2~4 句反思性、升华主题的歌词，或者写乐器独奏。",
    "tier3_example": "[Bridge: Tempo slows down, intimate voice]\n当所有的喧嚣都已散去，\n才懂得最沉默的期许，\n都是关于你。",
    "prompt_tag": "[Bridge]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "drop",
    "term": "[Drop]",
    "category": "song_structure",
    "zh_name": "高潮爆发点 (电音/舞曲灵魂)",
    "tier1_vernacular": "在电子音乐、舞曲中，前奏把气氛憋得极紧、鼓点像倒计时一样越来越急促之后，猛然爆发出的最震撼、最想让人蹦迪的节奏高潮！",
    "tier2_suno_usage": "做 EDM、House、Dubstep 等舞曲时必用。通常前一节写 [Build-Up]，下一节紧跟 [Drop]。",
    "tier3_example": "[Build-Up: Rising synth, fast snare roll]\n3... 2... 1...\n[Drop: Heavy bassline, festival lead, high energy beat]",
    "prompt_tag": "[Drop]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "hook",
    "term": "[Hook]",
    "category": "song_structure",
    "zh_name": "记忆钩子 / 毒性洗脑句",
    "tier1_vernacular": "像鱼钩一样死死勾住听众耳朵的极简短句或拟声词（比如“Nobody nobody but you”）。听一遍就忘不掉。",
    "tier2_suno_usage": "写在副歌之后或贯穿全曲，通常是 1~2 句极其押韵、高度重复的核心金句。",
    "tier3_example": "[Hook]\nCatch me if you can, yeah!\nCatch me if you can!",
    "prompt_tag": "[Hook]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "guitar_solo",
    "term": "[Guitar Solo]",
    "category": "song_structure",
    "zh_name": "吉他独奏段",
    "tier1_vernacular": "主唱退到一边喝水，由电吉他或木吉他手站在聚光灯下飙技秀一段极其华丽、狂野或深情的独奏旋律。",
    "tier2_suno_usage": "常放在 [Bridge] 或第二次副歌之后。标签后可描述风格（如 passionate, melodic, shredding），其下方不需要写任何歌词。",
    "tier3_example": "[Bridge]\n让回忆燃烧殆尽……\n[Guitar Solo: Passionate electric guitar, soaring melodic lead]\n[Chorus: Final Explosion]",
    "prompt_tag": "[Guitar Solo: Melodic and passionate]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "piano_solo",
    "term": "[Piano Solo]",
    "category": "song_structure",
    "zh_name": "钢琴独奏段",
    "tier1_vernacular": "没有人声歌唱，钢琴像溪水流淌或雨滴敲打窗台一样轻盈弹奏，营造出极度静谧、优雅与感伤的情绪空间。",
    "tier2_suno_usage": "适合抒情民谣、慢情歌（Ballad）或新古典音乐。放在主歌与副歌之间，或作为高潮后的沉淀。",
    "tier3_example": "[Piano Solo: Intimate upright piano, melancholy arpeggios]\n[Outro: Soft whisper]",
    "prompt_tag": "[Piano Solo: Melancholy and gentle]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "build_up",
    "term": "[Build-Up]",
    "category": "song_structure",
    "zh_name": "情绪爬坡 / 能量蓄力段",
    "tier1_vernacular": "像坐过山车缓缓爬向最高顶点的那个阶段！鼓点越来越密集，合成器音调不断升高，心跳加速，专门为即将引爆的副歌或 Drop 做铺垫。",
    "tier2_suno_usage": "放在 [Verse] 或 [Pre-Chorus] 之后，[Drop] 或 [Chorus] 之前。可搭配军鼓滚奏（Snare Roll）或白色噪音上升音效（Riser）。",
    "tier3_example": "[Build-Up: Accelerating drum rolls, rising pitch synth riser]\n准备好了吗？\n[Drop]",
    "prompt_tag": "[Build-Up: Rising energy]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "breakdown",
    "term": "[Breakdown]",
    "category": "song_structure",
    "zh_name": "间隙拆解 / 乐器骤减段",
    "tier1_vernacular": "在高潮之后突然把所有喧闹的架子鼓和厚重的乐器全部“抽走”，只留下最简单的节拍或单把吉他，让听众瞬间从狂热中冷静下来喘口气。",
    "tier2_suno_usage": "用于制造强烈的动静态对比。通常放在第二段副歌后，给下一波最终高潮积蓄更大的冲击力。",
    "tier3_example": "[Chorus]\n全场疯狂起舞！\n[Breakdown: Drums cut out, only minimal bass synth and subtle click]\n心跳声，呼吸声……",
    "prompt_tag": "[Breakdown: Minimal instruments]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "outro",
    "term": "[Outro]",
    "category": "song_structure",
    "zh_name": "尾奏 / 尾声",
    "tier1_vernacular": "歌曲快要唱完时的收尾。乐器逐渐变轻、歌手哼唱或轻轻叹息，让歌曲自然平稳地落幕，避免突然被掐断。",
    "tier2_suno_usage": "放在歌词的最末尾。可以搭配 [Fade Out]（渐渐淡出）指示 Suno 音量渐小结束。",
    "tier3_example": "[Outro: Piano fading out, gentle whisper]\n晚安，世界。\n[Fade Out]\n[End]",
    "prompt_tag": "[Outro]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "fade_out",
    "term": "[Fade Out]",
    "category": "song_structure",
    "zh_name": "音量渐弱淡出",
    "tier1_vernacular": "声音越来越小、越来越轻，仿佛歌手走进了远方的雾气中，直到完全听不见。",
    "tier2_suno_usage": "写在 [Outro] 下方最后一行。帮助 Suno 平滑收音，避免在最后一秒产生未唱完的截断破音。",
    "tier3_example": "[Outro]\nLa la la...\n[Fade Out]\n[End]",
    "prompt_tag": "[Fade Out]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "whisper",
    "term": "[Whisper]",
    "category": "vocals_performance",
    "zh_name": "耳语 / 贴耳气声呢喃",
    "tier1_vernacular": "就像歌手贴在你耳朵边轻轻叹息、悄悄倾诉，完全不用声带死力唱，充满极强的私密感、脆弱感与氛围感（类似 ASMR 或 Billie Eilish 的唱腔）。",
    "tier2_suno_usage": "写在需要极度安静抒情的歌词前面（通常用于深夜独白、主歌开头或歌曲最后的 Outro 告白）。",
    "tier3_example": "[Whisper: Soft intimate voice, ASMR style]\n如果你还听得见……\n这就是我最后的秘密。",
    "prompt_tag": "[Whisper: Soft, intimate]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "belting",
    "term": "[Belting]",
    "category": "vocals_performance",
    "zh_name": "真声高唱 (不用假声的实音高音)",
    "tier1_vernacular": "绝非破音怒吼！而是歌手用充满力量感的真声直冲高音（类似 Adele 唱高潮大嗓门时那种浑厚、饱满的实声），完全不用虚飘的假声，力量感极强。",
    "tier2_suno_usage": "写在高潮大歌副歌最有力的歌词前，指示 Suno 调用力量型真声歌手唱高音，避免 AI 软绵绵地唱成假声或气声。",
    "tier3_example": "[Chorus]\n[Belting: Powerful resonant high notes]\n哪怕风暴席卷世界，我也绝不低头！",
    "prompt_tag": "[Belting: Powerful resonant high notes]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "falsetto",
    "term": "[Falsetto]",
    "category": "vocals_performance",
    "zh_name": "假音 / 空灵气音高音",
    "tier1_vernacular": "不像真声那样用力吼，而是像浮在云端一样飘逸、空灵、梦幻的高音（类似 Radiohead 或很多独立音乐里的轻盈假声，像羽毛在空中漂浮）。",
    "tier2_suno_usage": "写在唯美、忧伤或飘渺的乐句前，常与 Dream Pop、R&B 搭配。",
    "tier3_example": "[Pre-Chorus]\n[Falsetto: Airy, soaring high voice]\nOoh... Fly away with me...",
    "prompt_tag": "[Falsetto: Airy and ethereal]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "spoken_word",
    "term": "[Spoken Word]",
    "category": "vocals_performance",
    "zh_name": "念白 / 电影感旁白叙述",
    "tier1_vernacular": "不唱任何音调，纯粹像电影演员在背景音乐中念独白、念台词一样，极具故事沉浸感和文艺气息。",
    "tier2_suno_usage": "写在歌曲 Intro、Bridge 或结尾。歌词尽量口语化，像讲故事一样写几句独白。",
    "tier3_example": "[Intro: Rain sounds]\n[Spoken Word: Low nostalgic male voice]\n那年夏天的列车开走以后，我再也没见过那片海。",
    "prompt_tag": "[Spoken Word: Cinematic monologue]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "vocal_harmonies",
    "term": "[Harmonies]",
    "category": "vocals_performance",
    "zh_name": "多声部和声 / 伴唱",
    "tier1_vernacular": "不再是一个人单薄地唱，而是在主唱背后有多个不同音高的声音同时烘托，瞬间让歌声像教堂唱诗班或多重唱一样立体宽广、气势恢宏。",
    "tier2_suno_usage": "写在副歌大合唱或结尾升华处，能极大增强整首歌的华丽感和层次感。",
    "tier3_example": "[Chorus]\n[Vocal Harmonies: Lush backing choir, layered voices]\n拥抱所有的光！",
    "prompt_tag": "[Lush Vocal Harmonies]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "vibrato",
    "term": "[Vibrato]",
    "category": "vocals_performance",
    "zh_name": "颤音 / 尾音波浪震颤",
    "tier1_vernacular": "拉长音结尾时声音有规律地微微波动（像歌剧名伶或深情歌王在长音结束时的波浪感），让歌声极其饱满、深情且富有大师风范。",
    "tier2_suno_usage": "写在慢歌长音或情绪升华句末尾，指示 AI 展现更高超的人声控制力。",
    "tier3_example": "[Chorus]\n[Vibrato: Deep resonant vibrato on long held notes]\n永不褪色——",
    "prompt_tag": "[Expressive Vibrato]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "ad_lib",
    "term": "[Ad-lib]",
    "category": "vocals_performance",
    "zh_name": "即兴垫音 / 自由哼唱装饰音",
    "tier1_vernacular": "在主歌词唱完的空隙里，歌手随性发挥的哼哼唱唱（比如“Yeah yeah~”、“Oh no~”、“Baby~”），让歌曲听起来灵动活泼不呆板。",
    "tier2_suno_usage": "多用于 R&B、Soul、流行流行副歌与尾声。可以用圆括号写在歌词行尾。",
    "tier3_example": "说好再见 (Yeah, never let you go)\n背叛了承诺 (Oh no...)",
    "prompt_tag": "[Ad-libs: Soulful runs and riffs]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "call_and_response",
    "term": "[Call and Response]",
    "category": "vocals_performance",
    "zh_name": "呼应对唱 / 领唱与伴唱接力",
    "tier1_vernacular": "主唱先喊一句（Call），后面的伴唱或合唱团立马接上一句（Response），像山歌对唱或福音教会有来有回，现场气氛极度活跃互动感极强。",
    "tier2_suno_usage": "写在舞曲、放克、福音音乐（Gospel）或活力流行歌中。",
    "tier3_example": "[Call: Lead Singer] 你们准备好了吗？\n[Response: Crowd] 随时可以出发！",
    "prompt_tag": "[Call and Response vocals]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "chant",
    "term": "[Chant]",
    "category": "vocals_performance",
    "zh_name": "万人呐喊口号 / 齐声呼号",
    "tier1_vernacular": "不是标准的优美唱歌，而是像足球场几万球迷一起整齐划一地齐声怒吼口号（如“Hey! Ho! Let's Go!”），血脉贲张，气势冲天！",
    "tier2_suno_usage": "适合热血摇滚、战歌、运动励志主题、Stadium Pop。",
    "tier3_example": "[Chant: Stadium crowd shouting in unison, stomping feet]\n战！战！战！\n直到世界终结！",
    "prompt_tag": "[Chant: Stadium crowd anthem]",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "lofi",
    "term": "Lo-fi",
    "category": "genres_and_styles",
    "zh_name": "低保真慢调 (慵懒治愈学习风)",
    "tier1_vernacular": "听起来像老旧录音带或黑胶唱片，带有轻微的沙沙杂音、慵懒慢速的爵士钢琴和柔和的鼓点。就是油管上非常流行的“陪你深夜自习/咖啡馆发呆”的舒缓音乐。",
    "tier2_suno_usage": "在 Style of Music 输入框中填入。常与 chillhop、jazz hop、rain sounds、dusty piano 搭配。",
    "tier3_example": "lo-fi chillhop, dusty vinyl crackle, mellow piano, warm bass, relaxing bpm 75",
    "prompt_tag": "lo-fi chillhop, mellow piano",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "city_pop",
    "term": "City Pop",
    "category": "genres_and_styles",
    "zh_name": "城市流行 (80年代日落都市摩登风)",
    "tier1_vernacular": "让人联想到 80 年代东京霓虹闪烁的夜晚，开着敞篷跑车吹着微凉海风的浪漫感。充满轻快的放克吉他扫弦、跳跃的贝斯和浪漫怀旧的萨克斯风。",
    "tier2_suno_usage": "适合做复古、阳光、浪漫都会感的情歌。常搭配 1980s japanese, funky bass, brass, nostalgic。",
    "tier3_example": "1980s japanese city pop, funky bass groove, bright brass, sparkling synth, breezy summer night",
    "prompt_tag": "1980s japanese city pop, funky bass",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "synthwave",
    "term": "Synthwave",
    "category": "genres_and_styles",
    "zh_name": "合成器波 / 赛博朋克复古电音",
    "tier1_vernacular": "强烈的科幻未来感与 80 年代复古电影质感结合，仿佛开着车疾驰在粉紫色落日与霓虹网格的数码高速公路上。鼓点坚实饱满，合成器音效如同电流穿梭。",
    "tier2_suno_usage": "适合动感、热血、科幻主题。常与 retrowave, 1980s synth, arpeggiated bass, driving drums 混搭。",
    "tier3_example": "synthwave, retrowave, driving 80s drums, neon atmosphere, analog synths, cyberpunk",
    "prompt_tag": "synthwave, retrowave, analog synths",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "melodic_techno",
    "term": "Melodic Techno",
    "category": "genres_and_styles",
    "zh_name": "旋律铁克诺 (深邃空灵迷幻电音)",
    "tier1_vernacular": "不像一般夜店蹦迪那么吵闹，而是充满深邃的空间感和唯美感伤的旋律线条。低音像心跳一样稳重推移，听了让人像漂浮在宇宙星空中。",
    "tier2_suno_usage": "适合高级感、深邃沉浸的 BGM。搭配 atmospheric, ethereal, driving bassline, hypnotic rhythm。",
    "tier3_example": "melodic techno, dark atmospheric synths, hypnotic bass, cinematic buildup, ethereal reverb pads, 124 bpm",
    "prompt_tag": "melodic techno, atmospheric",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "shoegaze",
    "term": "Shoegaze",
    "category": "genres_and_styles",
    "zh_name": "自赏摇滚 / 梦幻音墙",
    "tier1_vernacular": "因为乐手演出时一直低头踩吉他效果器像在“看鞋”而得名。特点是人声非常空灵朦胧，被淹没在像巨大海浪一样铺天盖地的吉他回音与梦幻噪音之中。",
    "tier2_suno_usage": "适合青春迷惘、梦幻悲伤、电影情绪流。搭配 ethereal vocals, wall of sound, distorted reverb guitars。",
    "tier3_example": "shoegaze, dream pop, ethereal female vocals, loud distorted guitars, heavy reverb, wall of sound",
    "prompt_tag": "shoegaze, dream pop, wall of sound",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "math_rock",
    "term": "Math Rock",
    "category": "genres_and_styles",
    "zh_name": "数学摇滚 / 奇数拍精妙点弦",
    "tier1_vernacular": "节奏就像做精密的数学题！完全不安常理出牌，一会是 7 拍一会是 5 拍，清脆的吉他点弦声像下雨敲打玻璃一样眼花缭乱又极其好听悦耳。",
    "tier2_suno_usage": "在 Style 输入框写 math rock, intricate guitar tapping, complex time signatures, energetic drums。",
    "tier3_example": "math rock, clean midwest emo tapping guitar, odd meters, bouncy dynamic drums",
    "prompt_tag": "math rock, clean tapping guitar",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "trap",
    "term": "Trap",
    "category": "genres_and_styles",
    "zh_name": "陷阱说唱 / 轰鸣808与滚奏擦片",
    "tier1_vernacular": "当代嘻哈说唱最标志性的声音！特点是轰隆隆震得人胸口发麻的 808 超重低音，加上像机关枪扫射一样飞速连击的金属擦片节奏（Hi-hat）。",
    "tier2_suno_usage": "做说唱或酷炫潮流街头感必选。搭配 heavy 808 sub bass, fast rolling hi-hats, dark trap melodies。",
    "tier3_example": "dark trap beat, thunderous 808 bass, rapid hi-hat rolls, confident male rap vocals",
    "prompt_tag": "dark trap, 808 sub bass",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "rb_ballad",
    "term": "R&B Ballad",
    "category": "genres_and_styles",
    "zh_name": "节奏布鲁斯慢情歌",
    "tier1_vernacular": "如同丝绸巧克力般顺滑柔软的情歌。深情的电钢琴配合柔缓的律动，歌手带着性感的气声与转音，深情倾诉内心的爱与痛。",
    "tier2_suno_usage": "适合抒情浪漫、深夜走心歌。搭配 smooth rhodes piano, soulful vocals, warm sub bass, emotional vibrato。",
    "tier3_example": "contemporary r&b ballad, smooth electric piano, intimate emotional vocals, slow groove 72 bpm",
    "prompt_tag": "smooth contemporary r&b ballad",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "indie_folk",
    "term": "Indie Folk",
    "category": "genres_and_styles",
    "zh_name": "独立民谣 / 森林木吉他清泉",
    "tier1_vernacular": "朴素而清澈，像坐在北欧森林小木屋篝火旁听一把木吉他弹唱，没有任何花哨吵闹的电子乐，只有纯净温暖的心灵对话。",
    "tier2_suno_usage": "适合治愈、旅行、乡愁、自然。搭配 acoustic guitar fingerpicking, gentle foot stomp, warm cello, airy vocals。",
    "tier3_example": "indie acoustic folk, intimate fingerpicked guitar, rustic warm cello, campfire nostalgia",
    "prompt_tag": "indie acoustic folk, fingerpicking",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "future_bass",
    "term": "Future Bass",
    "category": "genres_and_styles",
    "zh_name": "未来低音 (梦幻弹簧摇摆电音)",
    "tier1_vernacular": "高潮爆发时像踩在巨大的梦幻果冻或弹簧床上！厚重的合成器像波浪一样剧烈颤抖摇晃，充满阳光、年轻与元气活力。",
    "tier2_suno_usage": "适合动漫、青春、二次元活力电音。搭配 supersaw chords, pitch wobble, uplifting melody, heavy drop。",
    "tier3_example": "uplifting future bass, lush supersaw chords, kawaii vocal chops, bouncy trap beat, vibrant drop",
    "prompt_tag": "uplifting future bass, lush supersaw",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "orchestral_cinematic",
    "term": "Cinematic Orchestral",
    "category": "genres_and_styles",
    "zh_name": "史诗电影管弦乐",
    "tier1_vernacular": "仿佛置身于好莱坞大片巅峰时刻！几百人的交响乐团齐奏，铜管轰鸣，定音鼓与战鼓如雷贯耳，气吞山河、震撼宇宙。",
    "tier2_suno_usage": "适合游戏大招、预告片、热血决战。搭配 massive brass, epic taiko drums, soaring string section, choral chant。",
    "tier3_example": "epic cinematic orchestral, soaring brass section, thunderous war drums, heroic strings climax, intense choir",
    "prompt_tag": "epic cinematic orchestral, soaring brass",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "bpm",
    "term": "BPM (Beats Per Minute)",
    "category": "production_params",
    "zh_name": "每分钟节拍数 (歌曲速度心率)",
    "tier1_vernacular": "歌曲的“心率速度”。数值越小歌越慢越抒情，数值越大歌越快越嗨。\n• 60-80：慢歌、催眠抒情歌、悲伤民谣\n• 90-110：中速、流行歌、R&B、律动走步\n• 120-130：标准舞曲、电音、House（最容易跟着点头摇晃的黄金速度）\n• 140+：热血摇滚、快说唱、激烈快节奏",
    "tier2_suno_usage": "可以在 Style 输入框直接注明（如 120 bpm），或在高级设置里的 Tempo 控制项设置。",
    "tier3_example": "想要一首轻快的慢摇：acoustic pop, warm guitar, 95 bpm",
    "prompt_tag": "120 bpm",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "key_signature",
    "term": "Key",
    "category": "production_params",
    "zh_name": "调式与调性 (歌曲明暗色彩)",
    "tier1_vernacular": "歌曲的情绪色调底色：\n• 大调（Major）：听起来明亮、欢快、充满希望、正能量；\n• 小调（Minor）：听起来忧郁、悲伤、深沉、神秘或阴暗。",
    "tier2_suno_usage": "在 Style 输入框写具体调号，例如 C Major（C大调）、A Minor（A小调）、E-flat Major（降E大调）。",
    "tier3_example": "悲伤情歌：melancholic piano ballad, A minor\n阳光开朗：upbeat acoustic pop, C major",
    "prompt_tag": "in C Major / in A Minor",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "reverb",
    "term": "Reverb",
    "category": "production_params",
    "zh_name": "空间混响 (声音的旷野与浴室感)",
    "tier1_vernacular": "就像在空旷的大教堂或大浴室里唱歌时听到的回荡余音。混响越大，声音听起来越宏大、空灵、梦幻；混响越小（干声），声音越贴近耳朵、越清晰真实。",
    "tier2_suno_usage": "在 Style of Music 中写 heavy reverb（大回音空灵感）或 dry vocals（干声贴耳真实感）。",
    "tier3_example": "想要大教堂空灵声效：ethereal ambient pop, massive hall reverb, expansive soundstage",
    "prompt_tag": "heavy reverb / dry vocals",
    "expert_status": "draft",
    "expert_notes": ""
  },
  {
    "id": "acoustic_vs_electronic",
    "term": "Acoustic vs Electronic",
    "category": "production_params",
    "zh_name": "原声乐器 vs 电子合成器",
    "tier1_vernacular": "• 原声（Acoustic）：真实世界由人手弹奏出来的真实木头乐器（真实木吉他、真钢琴、大提琴）；\n• 电子（Electronic）：由电脑芯片合成出的数码波形音效（合成器、电子合成鼓）。",
    "tier2_suno_usage": "在 Style 框明确指出倾向，避免 AI 给你乱加电子音。原声填 pure acoustic organic instruments；电音填 electronic synthesizer-driven。",
    "tier3_example": "pure acoustic live instruments, unpolished organic warm recording",
    "prompt_tag": "acoustic live instruments",
    "expert_status": "draft",
    "expert_notes": ""
  }
];

  // 2. 注入毛玻璃与平板触控专属样式
  const SUNO_STYLES = "/* ============================================================\n   Suno Copilot (Suno 音乐通) - UI Stylesheet\n   Optimized for Samsung Tablet (S-Pen Hover + Touch) & Desktop\n   ============================================================ */\n\n/* 徽章样式：挂在英文按钮与标签旁边的小问号 */\n.suno-copilot-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.35rem;\n  height: 1.35rem;\n  min-width: 1.35rem;\n  margin-left: 0.35rem;\n  border-radius: 9999px;\n  background: linear-gradient(135deg, #fe3c7d 0%, #ffb003 100%);\n  color: #ffffff !important;\n  font-size: 0.78rem !important;\n  font-weight: 800 !important;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif !important;\n  line-height: 1 !important;\n  cursor: pointer;\n  user-select: none;\n  box-shadow: 0 0 10px rgba(254, 60, 125, 0.45);\n  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;\n  vertical-align: middle;\n  z-index: 100;\n  touch-action: manipulation;\n}\n\n.suno-copilot-badge:hover,\n.suno-copilot-badge:active {\n  transform: scale(1.22);\n  box-shadow: 0 0 14px rgba(255, 176, 3, 0.85);\n}\n\n/* 汉化副标题提示（直接显示在原英文按钮旁） */\n.suno-copilot-subtext {\n  display: inline-block;\n  font-size: 0.75rem !important;\n  color: #ffb003 !important;\n  font-weight: 600 !important;\n  margin-left: 0.35rem;\n  opacity: 0.95;\n  letter-spacing: 0.02em;\n  user-select: none;\n  vertical-align: middle;\n}\n\n/* 导航与菜单汉化副标题 */\n.suno-copilot-nav-zh {\n  display: inline-block;\n  font-size: 0.72rem !important;\n  color: #ffb003 !important;\n  font-weight: 600 !important;\n  margin-left: 0.35rem;\n  opacity: 0.95;\n  letter-spacing: 0.02em;\n  user-select: none;\n  vertical-align: middle;\n  pointer-events: none;\n}\n\n/* 歌曲列表灰字描述中文汉化条（支持 hover 展开与复制） */\n.suno-copilot-song-desc-zh {\n  display: block;\n  font-size: 0.72rem !important;\n  color: #ffb003 !important;\n  font-weight: 500 !important;\n  opacity: 0.95;\n  margin-top: 0.2rem;\n  line-height: 1.35;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  letter-spacing: 0.01em;\n  user-select: text;\n  pointer-events: auto;\n  transition: all 0.2s ease;\n}\n\n.suno-copilot-song-desc-zh:hover {\n  white-space: normal;\n  word-break: break-word;\n  background: rgba(255, 176, 3, 0.12);\n  border-radius: 4px;\n  padding: 2px 5px;\n}\n\n\n/* 浮动卡片容器（毛玻璃现代质感，纯 fixed 视口定位） */\n#suno-copilot-card {\n  position: fixed;\n  z-index: 999999;\n  width: 23rem;\n  max-width: calc(100vw - 2rem);\n  max-height: 82vh;\n  overflow-y: auto;\n  background: rgba(18, 18, 22, 0.95);\n  backdrop-filter: blur(24px);\n  -webkit-backdrop-filter: blur(24px);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  border-radius: 1.1rem;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.75), 0 0 30px rgba(254, 60, 125, 0.2);\n  padding: 1.1rem;\n  color: #ffffff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"PingFang SC\", \"Microsoft YaHei\", sans-serif;\n  opacity: 0;\n  pointer-events: none;\n  transform: translateY(8px) scale(0.97);\n  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n#suno-copilot-card.active {\n  opacity: 1;\n  pointer-events: auto;\n  transform: translateY(0) scale(1);\n}\n\n#suno-copilot-card::-webkit-scrollbar {\n  width: 4px;\n}\n#suno-copilot-card::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n}\n\n/* 卡片固定图钉标记 */\n.sc-pinned-badge {\n  font-size: 0.7rem;\n  background: rgba(255, 176, 3, 0.2);\n  color: #ffb003;\n  border: 1px solid rgba(255, 176, 3, 0.35);\n  border-radius: 9999px;\n  padding: 0.1rem 0.45rem;\n  margin-left: 0.4rem;\n  font-weight: 500;\n}\n\n/* 卡片头部 */\n.sc-card-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.09);\n  padding-bottom: 0.7rem;\n  margin-bottom: 0.8rem;\n}\n\n.sc-title-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.sc-term-title {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.sc-term-category {\n  font-size: 0.68rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  padding: 0.15rem 0.45rem;\n  border-radius: 9999px;\n  background: rgba(254, 60, 125, 0.2);\n  color: #fe3c7d;\n  border: 1px solid rgba(254, 60, 125, 0.35);\n}\n\n.sc-term-zh {\n  font-size: 0.92rem;\n  font-weight: 600;\n  color: #ffb003;\n}\n\n.sc-close-btn {\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: rgba(255, 255, 255, 0.65);\n  font-size: 1.1rem;\n  line-height: 1;\n  padding: 0.35rem 0.55rem;\n  cursor: pointer;\n  border-radius: 0.5rem;\n  transition: all 0.15s ease;\n}\n\n.sc-close-btn:hover {\n  color: #ffffff;\n  background: rgba(254, 60, 125, 0.4);\n}\n\n/* 三层内容区 */\n.sc-section {\n  margin-bottom: 0.85rem;\n}\n\n.sc-badge-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  margin-bottom: 0.35rem;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.35rem;\n}\n\n.sc-badge-label.tier1 {\n  background: rgba(16, 185, 129, 0.18);\n  color: #34d399;\n}\n\n.sc-badge-label.tier2 {\n  background: rgba(59, 130, 246, 0.18);\n  color: #60a5fa;\n}\n\n.sc-badge-label.tier3 {\n  background: rgba(168, 85, 247, 0.18);\n  color: #c084fc;\n}\n\n.sc-content-text {\n  font-size: 0.84rem;\n  line-height: 1.5;\n  color: rgba(255, 255, 255, 0.88);\n  margin: 0;\n  white-space: pre-wrap;\n}\n\n/* 第三层完整示例块 */\n.sc-tier3-example {\n  background: rgba(0, 0, 0, 0.45);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 0.5rem;\n  padding: 0.6rem 0.75rem;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n  font-size: 0.8rem;\n  line-height: 1.45;\n  color: #bae6fd;\n  white-space: pre-wrap;\n  word-break: break-word;\n  margin: 0.35rem 0 0.5rem 0;\n}\n\n/* 界面操作项专属说明条 */\n.sc-ui-tip {\n  font-size: 0.76rem;\n  color: rgba(255, 255, 255, 0.65);\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 0.45rem;\n  padding: 0.4rem 0.65rem;\n  margin-top: 0.35rem;\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n/* 提示词标签复制块（平板点按极爽） */\n.sc-copy-block {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: rgba(0, 0, 0, 0.4);\n  border: 1px dashed rgba(255, 255, 255, 0.25);\n  border-radius: 0.55rem;\n  padding: 0.45rem 0.7rem;\n  margin-top: 0.35rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.sc-copy-block:hover,\n.sc-copy-block:active {\n  background: rgba(254, 60, 125, 0.15);\n  border-color: rgba(254, 60, 125, 0.6);\n  transform: translateY(-1px);\n}\n\n.sc-code-snippet {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n  font-size: 0.82rem;\n  color: #38bdf8;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.sc-copy-icon {\n  font-size: 0.75rem;\n  color: #ffffff;\n  background: linear-gradient(135deg, rgba(254, 60, 125, 0.6), rgba(255, 176, 3, 0.6));\n  padding: 0.2rem 0.5rem;\n  border-radius: 0.35rem;\n  margin-left: 0.6rem;\n  white-space: nowrap;\n}\n\n/* 复制反馈气泡 (成功 / 失败双态) */\n.sc-toast {\n  position: fixed;\n  bottom: 2.5rem;\n  left: 50%;\n  transform: translateX(-50%) translateY(20px);\n  background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n  color: #ffffff;\n  padding: 0.6rem 1.4rem;\n  border-radius: 9999px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  box-shadow: 0 10px 28px rgba(16, 185, 129, 0.45);\n  opacity: 0;\n  pointer-events: none;\n  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);\n  z-index: 1000000;\n}\n\n.sc-toast.show {\n  opacity: 1;\n  transform: translateX(-50%) translateY(0);\n}\n\n.sc-toast.error {\n  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n  box-shadow: 0 10px 28px rgba(239, 68, 68, 0.45);\n}\n\n/* 屏幕右下角常驻 🎵 浮动速查小球 */\n#suno-copilot-float-ball {\n  position: fixed;\n  right: 1.25rem;\n  bottom: 5.5rem;\n  z-index: 99999;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 9999px;\n  background: linear-gradient(135deg, #fe3c7d 0%, #ffb003 100%);\n  box-shadow: 0 6px 20px rgba(254, 60, 125, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;\n  color: #fff;\n  font-size: 1.4rem;\n  user-select: none;\n  touch-action: manipulation;\n}\n\n#suno-copilot-float-ball:hover,\n#suno-copilot-float-ball:active {\n  transform: scale(1.12);\n  box-shadow: 0 8px 26px rgba(255, 176, 3, 0.7);\n}\n\n/* 浮动速查抽屉 */\n#suno-copilot-drawer {\n  position: fixed;\n  right: 1.25rem;\n  bottom: 9.5rem;\n  width: 22rem;\n  max-width: calc(100vw - 2.5rem);\n  max-height: 72vh;\n  background: rgba(18, 18, 24, 0.96);\n  backdrop-filter: blur(24px);\n  -webkit-backdrop-filter: blur(24px);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  border-radius: 1.2rem;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.8), 0 0 30px rgba(254, 60, 125, 0.2);\n  z-index: 999999;\n  display: flex;\n  flex-direction: column;\n  padding: 1.1rem;\n  color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  overflow: hidden;\n}\n\n.sc-drawer-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n\n.sc-drawer-title {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #ffb003;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n\n.sc-drawer-search {\n  width: 100%;\n  box-sizing: border-box;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 0.6rem;\n  padding: 0.5rem 0.75rem;\n  color: #ffffff;\n  font-size: 0.82rem;\n  margin-bottom: 0.75rem;\n  outline: none;\n  transition: border-color 0.2s;\n}\n\n.sc-drawer-search:focus {\n  border-color: #fe3c7d;\n  background: rgba(255, 255, 255, 0.12);\n}\n\n.sc-drawer-tabs {\n  display: flex;\n  gap: 0.35rem;\n  overflow-x: auto;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0.75rem;\n  scrollbar-width: none;\n}\n\n.sc-drawer-tabs::-webkit-scrollbar {\n  display: none;\n}\n\n.sc-tab-btn {\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: rgba(255, 255, 255, 0.7);\n  padding: 0.3rem 0.65rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s ease;\n}\n\n.sc-tab-btn.active,\n.sc-tab-btn:hover {\n  background: linear-gradient(135deg, rgba(254, 60, 125, 0.8), rgba(255, 176, 3, 0.8));\n  color: #ffffff;\n  border-color: transparent;\n}\n\n.sc-drawer-body {\n  overflow-y: auto;\n  flex: 1;\n  padding-right: 0.25rem;\n}\n\n.sc-drawer-body::-webkit-scrollbar {\n  width: 4px;\n}\n\n.sc-drawer-body::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 4px;\n}\n\n.sc-category-title {\n  font-size: 0.82rem;\n  font-weight: 700;\n  margin: 0.6rem 0 0.35rem 0;\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n}\n\n.sc-category-title.song_structure { color: #fe3c7d; }\n.sc-category-title.vocals_performance { color: #10b981; }\n.sc-category-title.genres_and_styles { color: #38bdf8; }\n.sc-category-title.production_params { color: #f59e0b; }\n.sc-category-title.ui_core { color: #a855f7; }\n\n.sc-tags-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-bottom: 0.6rem;\n}\n\n.sc-quick-tag {\n  cursor: pointer;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  padding: 0.3rem 0.6rem;\n  border-radius: 0.45rem;\n  font-size: 0.78rem;\n  color: rgba(255, 255, 255, 0.9);\n  transition: all 0.15s ease;\n  user-select: none;\n  touch-action: manipulation;\n}\n\n.sc-quick-tag:hover,\n.sc-quick-tag:active {\n  background: rgba(254, 60, 125, 0.25);\n  border-color: rgba(254, 60, 125, 0.6);\n  color: #ffffff;\n  transform: translateY(-1px);\n}\n\n/* 响应式适配 */\n@media (max-width: 640px) {\n  #suno-copilot-card,\n  #suno-copilot-drawer {\n    right: 0.75rem;\n    left: 0.75rem;\n    width: auto;\n    max-width: none;\n  }\n}\n";

  // 3. 核心注入与状态引擎
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

// 路线 B：全界面整句精确汉化字典（无中英夹杂，地道中文表述）
const UI_SENTENCES = {
  // 左侧主导航与全局操作
  'Home': '首页',
  'Explore': '发现探索',
  'Create': '创作音乐',
  'Studio': '录音工作室',
  'Library': '我的音乐库',
  'Earn Credits': '获取积分额度',
  'Labs': '实验工坊',
  'Notifications': '消息通知',
  'More': '更多选项',
  '... More': '更多选项',
  'Upgrade to Premier': '升级 Premier 专业版',
  'Upgrade': '升级会员',
  'Sign Out': '退出登录',
  'Settings': '账户设置',

  // 顶部创作模式与功能切换
  'Simple': '简易模式',
  'Advanced': '高级自定义模式',
  'Sounds': '声音采样库',
  '+ Audio': '上传音频',
  '+ Voice': '专属音色',
  '+ Inspo': '灵感参考',
  '+ Image': '封面参考',

  // 创作核心模块标题与功能
  'Lyrics': '歌词编辑',
  'Style of Music': '音乐风格描述',
  'Title': '歌曲标题',
  'Instrumental': '纯音乐（无歌词）',
  'Custom': '自定义模式',
  'Exclude Styles': '排除不想要的风格',
  'Weirdness': '创意发散离谱度',
  'Audio Weight': '参考音频影响权重',
  'Extend': '顺畅续写下一段',
  'Get Stems': '伴奏与人声分轨提取',
  'Reuse Prompt': '一键复用提示词与参数',
  'Replace Section': '局部重绘指定音频片段',
  'Crop Audio': '裁剪音频时长与起止点',
  'Create Persona': '锁定并保存当前歌手音色',
  'Cover Song': '根据旋律翻唱新曲风',
  'Upload Audio': '上传本地参考音频',
  'Make Random Lyrics': '随机生成一段歌词',
  'Clear Lyrics': '清空当前歌词',

  // 输入占位符与操作指引整句
  'Start writing lyrics, or leave this empty for instrumental': '开始编写歌词，若要生成纯音乐请直接留空',
  'Describe the style of music you want (e.g. acoustic pop)': '描述你想要的音乐风格（例如：原声流行民谣）',
  'Describe the style you want...': '描述你想要的音乐风格、情绪或乐器编排...',
  'Enter a title for your song': '为你的歌曲输入一个标题',
  'Search': '搜索歌曲、风格标签或歌词',

  // 右侧工作区与日期分隔符
  'Workspaces': '工作区',
  'My Workspace': '我的工作区',
  'Filters': '筛选过滤',
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

// 路线 B：右侧歌曲列表动态风格整句翻译词典 (按匹配长度倒序排列)
const VIBE_DICTIONARY = [
  // 复合长短语 (长句优先，确保语意连贯流畅)
  { en: 'cheerful acoustic guitar folk', zh: '轻松愉悦的原声吉他民谣' },
  { en: 'cheerful acoustic folk-pop', zh: '欢快轻柔的原声民谣流行' },
  { en: 'brisk gentle fingerpicking', zh: '伴随轻快温和的指弹吉他' },
  { en: 'minimalist neoclassical', zh: '极简新古典主义风格' },
  { en: 'ambient meditation', zh: '沉浸式冥想氛围音乐' },
  { en: 'electronic dance with saturated sub-bass', zh: '律动电子舞曲，融合饱满浑厚的超重低音' },
  { en: 'electronic dance', zh: '律动强劲的电子舞曲' },
  { en: 'driving rhythmic groove', zh: '强劲推进的节奏律动' },
  { en: 'pulsing synthesizer lead and sequen...', zh: '脉冲合成器领奏与音序编排' },
  { en: 'pulsing synthesizer lead and sequencer', zh: '脉冲合成器领奏与音序器' },
  { en: 'pulsing synthesizer lead', zh: '脉冲合成器主奏' },
  { en: 'saturated sub-bass', zh: '饱满浑厚的超重低音' },
  { en: 'light and breezy', zh: '微风拂面般的惬意听感' },
  { en: 'upbeat and cheerful', zh: '欢快明朗的明朗氛围' },
  { en: 'warm and cozy', zh: '温暖治愈的柔和声响' },
  { en: 'rhythmic synthesizer instrumental', zh: '节奏合成器纯音乐编曲' },
  { en: 'rhythmic synthesizer', zh: '节奏感合成器' },
  { en: 'acoustic guitar folk', zh: '原声木吉他民谣' },
  { en: 'acoustic guitar', zh: '原声木吉他' },
  { en: 'electric guitar', zh: '电吉他清音与扫弦' },
  { en: 'acoustic folk-pop', zh: '原声民谣流行' },
  { en: 'acoustic folk', zh: '原声质朴民谣' },

  // 演奏技法、乐器细分与现代律动模式
  { en: 'tight four-on-the-floor groove', zh: '紧凑利落的四四拍正拍律动' },
  { en: 'driving four-on-the-floor groove', zh: '强劲推进的四四拍正拍律动' },
  { en: 'four-on-the-floor groove', zh: '四四拍正拍律动' },
  { en: 'four-on-the-floor', zh: '四四拍正拍' },
  { en: 'tight groove', zh: '紧凑利落的律动' },
  { en: 'punchy kick and clap', zh: '结实有力的底鼓与击掌' },
  { en: 'punchy kick and snare', zh: '结实有力的底鼓与军鼓' },
  { en: 'punchy kick', zh: '结实有力的底鼓' },
  { en: 'punchy drums', zh: '结实有力的鼓组' },
  { en: 'fingerpicked and lightly strummed steel-string guitar', zh: '细腻指弹与轻柔扫弦的钢弦吉他' },
  { en: 'lightly strummed steel-string guitar', zh: '轻柔扫弦的钢弦吉他' },
  { en: 'steel-string guitar', zh: '钢弦民谣吉他' },
  { en: 'strummed steel-string guitar', zh: '扫弦钢弦吉他' },
  { en: 'strummed guitar', zh: '扫弦吉他' },
  { en: 'lightly strummed', zh: '轻柔扫弦' },
  { en: 'warm fingerpicking', zh: '温暖质感的吉他指弹' },
  { en: 'organic percussion', zh: '原声有机打击乐' },
  { en: 'sweet male vocals', zh: '甜美深情的男声演唱' },
  { en: 'sweet male vocal', zh: '甜美男声' },
  { en: 'sweet female vocals', zh: '甜美动听的女声演唱' },
  { en: 'sweet female vocal', zh: '甜美女声' },
  { en: 'sweet vocals', zh: '甜美人声演唱' },
  { en: 'sweet vocal', zh: '甜美人声' },
  { en: 'warm vocals', zh: '温暖人声演唱' },
  { en: 'warm vocal', zh: '温暖人声' },
  { en: 'steel-string', zh: '钢弦' },
  { en: 'fingerpicked', zh: '细腻指弹' },
  { en: 'strummed', zh: '扫弦' },
  { en: 'punchy', zh: '结实有力' },
  { en: 'organic', zh: '原声质感' },
  { en: 'sweet', zh: '甜美动人' },
  { en: 'warm', zh: '温暖柔和' },
  { en: 'tight', zh: '紧凑利落' },
  { en: 'kick', zh: '底鼓' },
  { en: 'clap', zh: '击掌拍手声' },
  { en: 'snap', zh: '清脆响指' },
  { en: 'fingerpicking guitar', zh: '细腻指弹吉他' },
  { en: 'fingerpicking', zh: '细腻指弹吉他' },
  { en: 'grand piano', zh: '三角钢琴独奏与铺底' },
  { en: 'upright piano', zh: '立式复古钢琴' },
  { en: 'electric piano', zh: '温暖电钢琴' },
  { en: 'synth lead', zh: '合成器高光领奏' },
  { en: 'synth pad', zh: '氛围合成器柔和铺底' },
  { en: 'synth-pop', zh: '80年代复古合成器流行' },
  { en: 'synthwave', zh: '复古未来合成器浪潮' },
  { en: 'city pop', zh: '都市复古流行 City Pop' },
  { en: 'indie pop', zh: '清新独立流行' },
  { en: 'indie rock', zh: '独立摇滚乐队编曲' },
  { en: 'pop rock', zh: '充满力量的流行摇滚' },
  { en: 'hard rock', zh: '硬摇滚重失真' },
  { en: 'punk rock', zh: '高能朋克摇滚' },
  { en: 'heavy metal', zh: '重金属失真咆哮' },
  { en: 'hip hop', zh: '硬核律动嘻哈说唱' },
  { en: 'hip-hop', zh: '硬核律动嘻哈说唱' },
  { en: 'boom bap', zh: '经典老学校说唱 Boom Bap' },
  { en: 'drum and bass', zh: '高频碎拍鼓打贝斯 DnB' },
  { en: 'future bass', zh: '未来贝斯情感电音' },
  { en: 'deep house', zh: '深邃内敛的浩室舞曲' },
  { en: 'smooth jazz', zh: '顺滑治愈的都市爵士' },
  { en: 'bossa nova', zh: '浪漫海滨波萨诺瓦' },
  { en: 'female vocals', zh: '唯美动听的女声演唱' },
  { en: 'female vocal', zh: '清澈女声' },
  { en: 'male vocals', zh: '深情浑厚的男声演唱' },
  { en: 'male vocal', zh: '沉稳男声' },
  { en: 'backing vocals', zh: '层次丰富的背景伴唱' },
  { en: 'airy vocals', zh: '空灵飘渺的呼吸感人声' },
  { en: 'raspy vocals', zh: '富有感染力的烟熏沙哑嗓' },
  { en: 'string quartet', zh: '优雅室内乐弦乐四重奏' },

  // 基础单项与风格词
  { en: 'cheerful', zh: '轻松欢快' },
  { en: 'breezy', zh: '惬意微风' },
  { en: 'brisk', zh: '轻快灵动' },
  { en: 'gentle', zh: '柔和温润' },
  { en: 'driving', zh: '动力十足的推进感' },
  { en: 'ambient', zh: '空灵氛围音乐' },
  { en: 'meditation', zh: '冥想放松' },
  { en: 'minimalist', zh: '极简主义' },
  { en: 'neoclassical', zh: '新古典主义' },
  { en: 'electronic', zh: '现代电子乐' },
  { en: 'dance', zh: '动感舞曲' },
  { en: 'folk', zh: '质朴民谣' },
  { en: 'pop', zh: '流行曲风' },
  { en: 'rock', zh: '摇滚' },
  { en: 'metal', zh: '金属乐' },
  { en: 'jazz', zh: '爵士乐' },
  { en: 'blues', zh: '蓝调布鲁斯' },
  { en: 'classical', zh: '古典交响' },
  { en: 'orchestral', zh: '恢弘管弦交响' },
  { en: 'cinematic', zh: '电影原声大片质感' },
  { en: 'reggae', zh: '雷鬼摇摆律动' },
  { en: 'reggaeton', zh: '拉丁雷鬼动舞曲' },
  { en: 'funk', zh: '放克复古律动' },
  { en: 'disco', zh: '迪斯科复古跳舞律动' },
  { en: 'house', zh: '四四拍浩室舞曲' },
  { en: 'techno', zh: '地下铁克诺舞曲' },
  { en: 'trance', zh: '迷幻推进舞曲' },
  { en: 'trap', zh: '808低音陷阱说唱' },
  { en: 'rap', zh: '说唱押韵' },
  { en: 'rnb', zh: '节奏布鲁斯' },
  { en: 'soul', zh: '深情灵魂乐' },
  { en: 'lo-fi', zh: '复古低保真 Lo-Fi' },
  { en: 'lofi', zh: '复古低保真 Lo-Fi' },
  { en: 'country', zh: '美式乡村音乐' },
  { en: 'latin', zh: '热情拉丁风情' },
  { en: 'bachata', zh: '浪漫巴恰塔双人舞曲' },
  { en: 'instrumental', zh: '纯音乐编排' },
  { en: 'synthesizer', zh: '模拟合成器' },
  { en: 'piano', zh: '钢琴' },
  { en: 'guitar', zh: '吉他' },
  { en: 'bass', zh: '低音贝斯' },
  { en: 'strings', zh: '宏大弦乐群' },
  { en: 'violin', zh: '小提琴悠扬独奏' },
  { en: 'cello', zh: '大提琴低沉叙事' },
  { en: 'drums', zh: '饱满击打鼓点' },
  { en: 'percussion', zh: '节奏打击乐' },
  { en: 'flute', zh: '长笛' },
  { en: 'saxophone', zh: '萨克斯风' },
  { en: 'trumpet', zh: '小号高音' },
  { en: 'choir', zh: '唱诗班神圣合唱' },
  { en: 'harmonies', zh: '和谐多声部和声' },
  { en: 'vocal', zh: '人声演唱' },
  { en: 'vocals', zh: '人声演唱' },
  { en: 'acoustic', zh: '原声不插电' },
  { en: 'groove', zh: '身体律动感' },
  { en: 'rhythm', zh: '鲜明节奏' },
  { en: 'rhythmic', zh: '节奏感十足' },
  { en: 'tempo', zh: '节拍速度' },
  { en: 'beat', zh: '重节拍' },
  { en: 'melodic', zh: '优美旋律' },
  { en: 'dreamy', zh: '梦幻空灵' },
  { en: 'chill', zh: '轻松惬意' },
  { en: 'relaxing', zh: '放松舒缓' },
  { en: 'peaceful', zh: '宁静祥和' },
  { en: 'dark', zh: '阴郁幽暗' },
  { en: 'melancholic', zh: '伤感忧郁' },
  { en: 'sad', zh: '哀伤抒情' },
  { en: 'emotional', zh: '饱含深情' },
  { en: 'energetic', zh: '高能爆发力' },
  { en: 'epic', zh: '恢弘史诗感' },
  { en: 'uplifting', zh: '昂扬振奋' },
  { en: 'romantic', zh: '浪漫甜蜜' },
  { en: 'nostalgic', zh: '怀旧复古' },
  { en: 'intense', zh: '紧张激烈' },
  { en: 'hypnotic', zh: '催眠沉浸' },
  { en: 'quirky', zh: '古灵精怪' },
  { en: 'moody', zh: '情绪化氛围' }
];
VIBE_DICTIONARY.sort((a, b) => b.en.length - a.en.length);

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

  isInsideCreatorEditor(el) {
    if (!el) return false;
    // 严格隔离中间创作区（歌词编辑器、提示词输入、音频设置与表单），防止被误识别为歌曲简介
    if (el.closest && el.closest('form, textarea, [contenteditable="true"], [role="textbox"], [data-section="creator"], [class*="creator"], [class*="editor"], [class*="prompt"], [class*="lyrics"], [data-testid*="lyrics"]')) {
      return true;
    }
    return false;
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

      // 匹配静态整句字典
      let zh = UI_SENTENCES[rawText];

      // 匹配动态 Filters (3)
      if (!zh) {
        const filterMatch = rawText.match(/^Filters(?:\s*\((\d+)\))?$/i);
        if (filterMatch) {
          zh = filterMatch[1] ? `筛选过滤 ${filterMatch[1]}` : '筛选过滤';
        }
      }

      // 匹配模型版本如 v6
      if (!zh && /^v\d+(?:\.\d+)?$/i.test(rawText)) {
        zh = `第${rawText.slice(1)}代模型`;
      }

      if (zh) {
        if (el.dataset) el.dataset.scNavProcessed = 'true';
        el.title = `${rawText} · ${zh}`;

        const navSpan = document.createElement('span');
        navSpan.className = 'suno-copilot-nav-zh';
        navSpan.textContent = `${zh}`;

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

      const trimmedPh = ph.trim();
      if (UI_SENTENCES[trimmedPh]) {
        el.placeholder = `${trimmedPh} · ${UI_SENTENCES[trimmedPh]}`;
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (/^Search$/i.test(trimmedPh)) {
        el.placeholder = 'Search · 搜索歌曲、风格标签或歌词';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (trimmedPh.includes('Start writing lyrics') && !trimmedPh.includes('开始编写歌词')) {
        el.placeholder = 'Start writing lyrics, or leave this empty for instrumental\n开始编写歌词，若要生成纯音乐请直接留空';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (trimmedPh.includes('Describe the style') && !trimmedPh.includes('描述你想要')) {
        el.placeholder = 'Describe the style of music you want... · 描述你想要的音乐风格、情绪或乐器编排...';
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
      // 严格检查：绝不扫描创作区/歌词输入区域
      if (this.isInsideCreatorEditor(el)) continue;
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

      // 执行路线 B 专业整句翻译 (优先本地专业词库，未知词异步后台动态整句翻译兜底)
      const translation = this.translateMusicDescription(rawText, (dynamicTranslation) => {
        if (dynamicTranslation && zhDiv) {
          zhDiv.textContent = dynamicTranslation;
          zhDiv.title = `完整译文: ${dynamicTranslation}`;
        }
      });
      if (!translation || translation === rawText) continue;

      if (el.dataset) el.dataset.scDescProcessed = 'true';
      el.title = `${translation}`;

      // 避免重复插入
      const next = el.nextElementSibling || el.nextSibling;
      if (next && next.classList && next.classList.contains('suno-copilot-song-desc-zh')) {
        continue;
      }

      // 创建独立的歌曲描述翻译栏（优雅双行副标题）
      const zhDiv = document.createElement('div');
      zhDiv.className = 'suno-copilot-song-desc-zh';
      zhDiv.textContent = `${translation}`;
      zhDiv.title = `完整译文: ${translation}`;
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
    // 排除歌词提示句与纯系统菜单词条
    if (text.includes('Start writing lyrics') || text.includes('Describe the style')) return false;
    if (/^(Today|Yesterday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Search|Filters)$/i.test(text.trim())) return false;

    const musicKeywords = [
      'acoustic', 'guitar', 'folk', 'pop', 'dance', 'electronic', 'rock', 'synth',
      'ambient', 'meditation', 'minimalist', 'classical', 'piano', 'bass', 'groove',
      'rhythmic', 'drums', 'sub-bass', 'breezy', 'cheerful', 'upbeat', 'slow',
      'fast', 'tempo', 'vocal', 'vocals', 'instrumental', 'hip hop', 'trap', 'jazz',
      'blues', 'soul', 'funk', 'metal', 'lo-fi', 'lofi', 'house', 'techno', 'edm',
      'string', 'violin', 'lead', 'sequen', 'beat', 'drop', 'melancholic', 'chill',
      'emotional', 'epic', 'dark', 'warm', 'brass', 'saxophone', 'fingerpicking',
      'punchy', 'percussion', 'kick', 'clap', 'strummed', 'steel-string', 'organic'
    ];

    const lower = text.toLowerCase();
    return musicKeywords.some(kw => lower.includes(kw));
  }

  async fetchDynamicTranslation(text) {
    if (!text || typeof text !== 'string') return null;
    const cleanText = text.trim();
    if (!cleanText) return null;

    const cacheKey = 'sc_trans_' + cleanText.toLowerCase();
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached) return cached;
      }
    } catch (_) {}

    let result = null;

    // 优先通过 Chrome Extension Background Service Worker 发送消息（无跨域限制）
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        const res = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'translate', text: cleanText }, resolve);
        });
        if (res && res.success && res.translation) {
          result = res.translation;
        }
      }
    } catch (_) {}

    // 兜底直接 fetch (Node 测试环境或开放前端环境)
    if (!result) {
      try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=' + encodeURIComponent(cleanText);
        if (typeof fetch !== 'undefined') {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            result = data[0].map(item => item[0]).join('');
          }
        }
      } catch (_) {}
    }

    if (result) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(cacheKey, result);
        }
      } catch (_) {}
    }

    return result;
  }

  translateMusicDescription(text, onDynamicComplete = null) {
    if (!text || typeof text !== 'string') return '';
    const trimmed = text.trim();
    if (!trimmed) return '';

    // 1. 优先检查持久化缓存
    const cacheKey = 'sc_trans_' + trimmed.toLowerCase();
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached) return cached;
      }
    } catch (_) {}

    // 2. 第一层：专业音乐 DSL 词根与语法解析
    const segments = trimmed.split(/[,;]+/).map(s => s.trim()).filter(Boolean);
    let hasUntranslatedEnglish = false;

    const translatedSegments = segments.map(seg => {
      const lower = seg.toLowerCase();

      // 1. 完全精确匹配
      for (const entry of VIBE_DICTIONARY) {
        if (lower === entry.en.toLowerCase()) {
          return entry.zh;
        }
      }

      // 2. 词段内部短语替换
      let res = seg;
      for (const entry of VIBE_DICTIONARY) {
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

      // 检查是否仍残留 3 个以上的连续英文字母（未翻译完全）
      if (/[a-zA-Z]{3,}/.test(res)) {
        hasUntranslatedEnglish = true;
      }

      return res;
    });

    const localResult = translatedSegments.join(' · ');

    // 3. 第二层：如果存在未完全翻译的英文，且提供了异步回调，静默启动后台动态整句兜底
    if (hasUntranslatedEnglish && typeof this.fetchDynamicTranslation === 'function') {
      this.fetchDynamicTranslation(trimmed).then(dynResult => {
        if (dynResult && typeof onDynamicComplete === 'function') {
          onDynamicComplete(dynResult);
        }
      }).catch(() => {});
    }

    return localResult;
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
    const shortZh = item.zh_name.split('/')[0].split('(')[0].replace(/[()（）]/g, '').trim();
    subtext.textContent = `${shortZh}`;
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

  // 4. 自动实例化启动
  if (typeof window !== 'undefined') {
    window.sunoCopilotInstance = new SunoCopilotEngine(SUNO_GLOSSARY, SUNO_STYLES);
  }
})();
