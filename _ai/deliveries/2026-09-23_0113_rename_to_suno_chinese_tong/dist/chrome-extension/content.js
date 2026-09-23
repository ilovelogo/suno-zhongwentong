/**
 * Suno Partner - Chrome Extension Content Script
 */

(function () {
  'use strict';

  // 1. 独家五维三层通俗白话核心词库 (73 词条)
  const SUNO_GLOSSARY = [
  {
    "id": "custom_mode",
    "term": "Advanced",
    "category": "ui_core",
    "zh_name": "自己写歌词和风格",
    "tier1_vernacular": "点这里才能自己填词、自己写风格。创作页有三个模式：Simple 是只丢一句给它自己猜；Advanced 才能自己写歌词和风格；Sounds 是做一段声音，不是一整首歌。",
    "tier2_suno_usage": "做歌推荐用这个模式。点开 Advanced 后，页面会出现歌词框和风格描述框。",
    "tier3_example": "想要自己写歌词，或者想指定用哪种乐器、哪种气氛，都在 Advanced 里面做。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "旧词 id custom_mode 保留，term 已由 Custom 修正为 Advanced"
  },
  {
    "id": "instrumental",
    "term": "Instrumental",
    "category": "ui_core",
    "zh_name": "纯音乐",
    "tier1_vernacular": "整首歌只有乐器演奏，没有人声唱歌或说话。页面上没有单独的纯音乐开关，想要纯音乐，就在 Advanced 模式下把歌词框完全留空。",
    "tier2_suno_usage": "在 Advanced 模式下，歌词框一个字都不要填。风格框里写上想要的乐器和气氛，做出来的就是纯乐器演奏。",
    "tier3_example": "歌词框留空，风格框写 acoustic guitar, slow，生成的就是纯木吉他慢曲。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "已按真实创作页更正：无独立开关，纯音乐通过歌词框留空实现"
  },
  {
    "id": "simple",
    "term": "Simple",
    "category": "ui_core",
    "zh_name": "丢一句给它写",
    "tier1_vernacular": "最简单的傻瓜模式。你只要输入一句话，比如写一首关于夏天的歌，AI 就会全权替你写歌词、配乐曲。",
    "tier2_suno_usage": "适合没有灵感只想随手试试的时候。如果想自己控制歌词和具体乐器，请切换到旁边的 Advanced 模式。",
    "tier3_example": "适合一键开盲盒体验，日常创作建议使用 Advanced。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 UI 核心按钮词条"
  },
  {
    "id": "sounds",
    "term": "Sounds",
    "category": "ui_core",
    "zh_name": "做一段声音",
    "tier1_vernacular": "用来生成一段简短的音效、鼓点循环或环境声，不是做一整首有头有尾的歌曲。",
    "tier2_suno_usage": "旁边配有单次发声、循环播放以及音调选择。做第一首完整歌曲时不要选这个模式。",
    "tier3_example": "适合为视频剪辑做雨声、心跳、单次转场特效声或鼓点循环素材。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 UI 核心按钮词条"
  },
  {
    "id": "model_version",
    "term": "v6",
    "category": "ui_core",
    "zh_name": "现在常用的模型",
    "tier1_vernacular": "Suno 创作菜单里主要有 v6、v6-wild、v6-mini。v6 是日常最常用的模型，唱得最稳，声音最清晰自然。个人页旧歌上的 V4.5 只是历史生成的标记。",
    "tier2_suno_usage": "写歌默认选 v6 即可。如果想更天马行空可以选 v6-wild，如果想省点数可以用 v6-mini。",
    "tier3_example": "第一首歌建议直接留在 v6，生成效果最稳妥。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "旧词 id 保留，term 修正为 v6"
  },
  {
    "id": "v6_wild",
    "term": "v6-wild",
    "category": "ui_core",
    "zh_name": "更敢试、更怪",
    "tier1_vernacular": "比常规 v6 更具实验性的模型版本。它的旋律变化更大、编曲想法更怪、更敢打破常规套路。",
    "tier2_suno_usage": "当你觉得普通模型生成的曲子听起来太千篇一律时，可以切到 v6-wild 碰碰奇特创意。",
    "tier3_example": "适合先锋前卫风格或想找不寻常灵感时使用。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增模型子版本词条"
  },
  {
    "id": "v6_mini",
    "term": "v6-mini",
    "category": "ui_core",
    "zh_name": "免费档，更省",
    "tier1_vernacular": "免费用户常用的轻量模型版本。生成速度很快，消耗额度更省，但在声音细节和真实度上比不上完整版 v6。",
    "tier2_suno_usage": "想要快速测试旋律草稿或节省点数时可以选用。",
    "tier3_example": "适合快速试听摸索结构，定稿推荐切回常规 v6。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增模型子版本词条"
  },
  {
    "id": "create_song",
    "term": "Create song",
    "category": "ui_core",
    "zh_name": "做歌，一次两首",
    "tier1_vernacular": "核心生成按钮。点一次会消耗点数，并在右侧同时生成两首不同感觉的歌曲供你挑选。",
    "tier2_suno_usage": "歌词与风格都填好后点击。如果输入框全空，这个按钮会保持灰色不可点击。",
    "tier3_example": "两首生成完成后全部听一遍，挑出更符合你心中预期的那一首保留。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增核心生成按钮"
  },
  {
    "id": "extend",
    "term": "Extend",
    "category": "ui_core",
    "zh_name": "顺畅续写下一段",
    "tier1_vernacular": "Suno 一次通常只做两到四分钟。如果歌还没唱完，或者想再加一段尾奏，可以用这个功能从指定的那一秒接着往后唱。",
    "tier2_suno_usage": "在喜欢的歌曲三点菜单选 Extend，设置从几分几秒接着唱，然后填入新段落的词。",
    "tier3_example": "原曲在一分五十秒突然戛然而止，设置 Extend from 01:45，输入新歌词继续写完。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文按通俗听感重写，去括号"
  },
  {
    "id": "get_stems",
    "term": "Get Stems",
    "category": "ui_core",
    "zh_name": "分轨提取",
    "tier1_vernacular": "把已经做好的歌拆开，人声归人声，乐器归乐器。Pro 账号有两种分轨方式：Auto 是从一批乐器里自动拆，Split from mix 是自己选一种乐器拆。",
    "tier2_suno_usage": "在歌曲菜单里点 Get Stems。做第一首歌先不用分轨。第三种 Advanced split 点开需要 Premier 会员，教程不走那里。",
    "tier3_example": "想把做好的歌拿掉人声当伴奏，或者只要单独的人声干声，用 Auto 分轨即可。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文按 Pro 会员权限校对更正"
  },
  {
    "id": "reuse_prompt",
    "term": "Reuse Prompt",
    "category": "ui_core",
    "zh_name": "复用提示词与参数",
    "tier1_vernacular": "一键抄作业。把你或别人某首好听的歌所用的歌词、风格词、参数原样拷贝回左侧编辑区，方便微调。",
    "tier2_suno_usage": "在歌曲菜单点击 Reuse Prompt，左侧输入框会立刻填好原配方，改动几个词就能重试。",
    "tier3_example": "看到别人做出的曲子质感很好，点击复用，把歌词换成你自己的，就能做出同款风格。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文重写，去括号"
  },
  {
    "id": "replace_section",
    "term": "Replace Section",
    "category": "ui_core",
    "zh_name": "局部重做指定片段",
    "tier1_vernacular": "局部橡皮擦。整首歌旋律很好，偏偏某一句发音怪或者中间有杂音，用这个功能只把那几秒重新做一遍，其余好听部分不动。",
    "tier2_suno_usage": "在歌曲菜单选 Edit 里的 Replace Section，拖动波形选择有问题的几秒区间，改好对应歌词后重新生成。",
    "tier3_example": "三十秒处某个字念错了，框选二十八秒到三十三秒，修正歌词后局部重新生成。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文重写，去括号"
  },
  {
    "id": "crop",
    "term": "Crop Audio",
    "category": "ui_core",
    "zh_name": "裁剪音频时长",
    "tier1_vernacular": "类似手机相册剪裁照片。直接把歌曲开头多余的空白、或者结尾拖沓的杂音裁掉。",
    "tier2_suno_usage": "在歌曲菜单选 Crop Audio，拖动左右两端的时间指针，保存为一个干净的新片段。",
    "tier3_example": "歌曲前十五秒没有任何声音，拖动左端滑块到第十五秒，切出一个利落的开头。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文重写，去括号"
  },
  {
    "id": "remove_section",
    "term": "Remove Section",
    "category": "ui_core",
    "zh_name": "删掉指定片段",
    "tier1_vernacular": "直接把歌曲中间多余难听的一小截完全切除，让前后两段直接接在一起。",
    "tier2_suno_usage": "在歌曲 Edit 菜单里选择 Remove Section，选定想要拿掉的起止时间点确认删除。",
    "tier3_example": "歌词中间有一段重复冗长的过门，直接选定该区间删除，前后平滑拼接。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 UI 核心功能"
  },
  {
    "id": "fade_in",
    "term": "Fade In",
    "category": "ui_core",
    "zh_name": "开头声音渐渐变大",
    "tier1_vernacular": "声音从完全静音开始，慢慢增大到正常音量，听起来非常温柔，不会一上来就很突兀。",
    "tier2_suno_usage": "在歌曲 Edit 菜单里设置 Fade In，给开头几秒加上平滑渐入效果。",
    "tier3_example": "适合安静抒情歌曲的开头，让声音像缓缓走来一样自然出现。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 UI 核心功能"
  },
  {
    "id": "fade_out_action",
    "term": "Fade Out",
    "category": "ui_core",
    "zh_name": "结尾声音渐渐变小",
    "tier1_vernacular": "声音在歌曲结尾慢慢变轻变弱，最后消失在安静中，适合收尾没有做好的歌曲。",
    "tier2_suno_usage": "在歌曲 Edit 菜单里设置 Fade Out，为尾声加上自然淡出。",
    "tier3_example": "结尾突然掐断很不舒服时，用 Fade Out 渐弱收尾最为自然。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 UI 编辑动作词条"
  },
  {
    "id": "adjust_speed",
    "term": "Adjust Speed",
    "category": "ui_core",
    "zh_name": "调整整首歌快慢",
    "tier1_vernacular": "在不改变音调高低的前提下，把整首歌变快一些或者变慢一些。",
    "tier2_suno_usage": "在歌曲菜单里点击 Adjust Speed，拖动速度滑块试听并保存新版本。",
    "tier3_example": "慢情歌想要更加欢快跳跃，可以把速度微调加快百分之十。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 UI 核心功能"
  },
  {
    "id": "remaster",
    "term": "Remaster",
    "category": "ui_core",
    "zh_name": "重新润色音质",
    "tier1_vernacular": "用更新的声音处理算法，把原来发闷、发杂的歌曲重新过一遍，让声音更通透清晰、声场更宽阔。",
    "tier2_suno_usage": "在歌曲菜单里点击 Remaster，系统会生成一份更高音质的新版本。",
    "tier3_example": "早期版本做的老歌声音略显浑浊，点击 Remaster 即可提升现代清晰度。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 UI 核心功能"
  },
  {
    "id": "persona",
    "term": "Voice",
    "category": "ui_core",
    "zh_name": "专属音色",
    "tier1_vernacular": "固定喜欢的歌手音色。如果哪首歌里的人声音色特别好听，可以保存下来用于后面的新歌。",
    "tier2_suno_usage": "在 Remix 菜单中可见 Voice 选项。后续写新歌时关联该音色即可延续同款嗓音。",
    "tier3_example": "打造专属虚拟歌手时使用，保持每次作品人声辨识度统一。",
    "prompt_tag": "",
    "expert_status": "NOT_YET_VERIFIED",
    "expert_notes": "term 改为 Voice，Create Persona 标注 NOT_YET_VERIFIED"
  },
  {
    "id": "cover_song",
    "term": "Cover Song",
    "category": "ui_core",
    "zh_name": "根据旋律翻唱新风格",
    "tier1_vernacular": "保留原本的歌词和大概旋律骨架，完全换一套编曲流派和伴奏风格，类似歌手去翻唱别人的经典老歌。",
    "tier2_suno_usage": "在歌曲菜单里点 Cover Song，填入全新的风格词重新生成。",
    "tier3_example": "把原本轻柔的木吉他民谣，一键翻唱成节奏强劲的摇滚或电子舞曲。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文重写，去括号"
  },
  {
    "id": "upload_audio",
    "term": "Upload Audio",
    "category": "ui_core",
    "zh_name": "上传参考音频",
    "tier1_vernacular": "用自己手机录制的一段清唱、吹口哨或者乐器弹奏，作为这首歌的创作起点。",
    "tier2_suno_usage": "点击上传本地音频文件，Suno 会识别你的旋律走向并以此为基础做完整的专业编曲。",
    "tier3_example": "自己哼唱了半分钟的一句旋律，上传上去让 AI 扩写成一首配器齐全的完整歌曲。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文重写，去括号"
  },
  {
    "id": "exclude_styles",
    "term": "Exclude styles",
    "category": "ui_core",
    "zh_name": "排除不想要的风格",
    "tier1_vernacular": "负向提示词。明确告诉 AI 这首歌里绝对不要出现什么元素，比如不要刺耳失真、不要重低音、不要嘈杂喊叫。",
    "tier2_suno_usage": "在 Advanced 模式下展开 More Options，在 Exclude styles 输入框里填写你不想要的英文标签。",
    "tier3_example": "heavy metal, shouting",
    "prompt_tag": "heavy metal, shouting",
    "expert_status": "reviewed",
    "expert_notes": "保留简短英文示例，正文去括号"
  },
  {
    "id": "weirdness_vibe",
    "term": "Weirdness",
    "category": "ui_core",
    "zh_name": "创意发散程度",
    "tier1_vernacular": "控制 AI 构思旋律时有多大胆。拉得较低时走稳妥好听的流行路线；拉高时会尝试怪诞、前卫或意想不到的走向。滑块约百分之五十时页面显示为 Expected results。",
    "tier2_suno_usage": "在 Advanced 模式展开的 More Options 中拖动。普通写歌保持在中间位置即可。",
    "tier3_example": "想要一首顺耳的流行情歌就调低，想要搞先锋实验音乐就调高。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "正文注明中间值为 Expected results"
  },
  {
    "id": "vocal_gender",
    "term": "Vocal Gender",
    "category": "ui_core",
    "zh_name": "选男声或女声",
    "tier1_vernacular": "直接指定主唱的性别。可以选男声 Male，也可以选女声 Female。",
    "tier2_suno_usage": "在 Advanced 模式展开的 More Options 中勾选对应选项。",
    "tier3_example": "写闺蜜心事选 Female，写深沉叙事选 Male。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 More Options 参数词条"
  },
  {
    "id": "style_influence",
    "term": "Style Influence",
    "category": "ui_core",
    "zh_name": "风格词影响程度",
    "tier1_vernacular": "控制你在风格框里写的那些形容词有多大分量。调高会严格贴合你的文字，调低则让模型自由发挥更多。",
    "tier2_suno_usage": "在 More Options 里拖动滑块，默认居中通常为 Moderate 中度影响。",
    "tier3_example": "填了很具体的乐器希望百分百体现时，可以稍微拉高此项。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 More Options 参数词条"
  },
  {
    "id": "variety",
    "term": "Variety",
    "category": "ui_core",
    "zh_name": "结果差异程度",
    "tier1_vernacular": "控制每次同时生成的两首歌曲之间差别有多大。拉高会让两首非常不一样，拉低会让两首比较接近。",
    "tier2_suno_usage": "在 More Options 里调节，默认通常是 Balanced variety 均衡差异。",
    "tier3_example": "想一次探索截然不同的旋律走向可以调高此项。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 More Options 参数词条"
  },
  {
    "id": "my_taste",
    "term": "My Taste",
    "category": "ui_core",
    "zh_name": "按我的听歌偏好",
    "tier1_vernacular": "根据你以往常听、常点赞和常生成的风格偏好，为新歌自动注入符合你个人口味的微调。",
    "tier2_suno_usage": "在 More Options 里开关此项，有 Off 和 On 两个档位。",
    "tier3_example": "打开后生成的作品会更容易贴合你平时的听歌习惯。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 More Options 参数词条"
  },
  {
    "id": "max_mode",
    "term": "Max Mode",
    "category": "ui_core",
    "zh_name": "开启深度生成",
    "tier1_vernacular": "投入更多算力对整首歌的编曲细节、声学空间和发音进行更深入的精细打磨。",
    "tier2_suno_usage": "在 More Options 里开启，适合正式发布级别的重要歌曲。",
    "tier3_example": "写重要作品或追求极致听感时打开。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 More Options 参数词条"
  },
  {
    "id": "song_title",
    "term": "Song Title",
    "category": "ui_core",
    "zh_name": "歌曲标题",
    "tier1_vernacular": "为你的歌曲起一个名字。如果不填，系统会根据歌词内容自动替你拟一个标题。",
    "tier2_suno_usage": "在 More Options 里的输入框填写自己想要的歌名，可以随时修改。",
    "tier3_example": "如填写 雨夜街角 或者留空由 AI 自动命名。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 More Options 词条"
  },
  {
    "id": "duration_custom",
    "term": "Duration Custom",
    "category": "ui_core",
    "zh_name": "自己定长短",
    "tier1_vernacular": "这是歌曲时长的长短设置，不是模式开关。在这里可以手动指定想要生成的歌曲具体几分几秒。",
    "tier2_suno_usage": "在 Duration 选项中选择 Custom，即可自行拖动或输入期望的音频时间长度。",
    "tier3_example": "如果只需要三十秒短视频配乐，选 Custom 设置为三十秒即可。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "严格区分于制作人模式，注明为时长设置"
  },
  {
    "id": "duration_auto",
    "term": "Duration Auto",
    "category": "ui_core",
    "zh_name": "系统自动决定长短",
    "tier1_vernacular": "时长交给 AI 自动把控。它会根据你歌词的长短和曲风自然收尾，不需要你手动限制时间。",
    "tier2_suno_usage": "在 Duration 选项中选择 Auto，这是日常做歌的默认推荐设置。",
    "tier3_example": "写完一段歌词直接选 Auto，系统会唱到歌词自然结束。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增时长选项词条"
  },
  {
    "id": "mashup",
    "term": "Mashup",
    "category": "ui_core",
    "zh_name": "两首歌揉合",
    "tier1_vernacular": "把两首不同歌曲的特色巧妙融合在一起，比如把一首歌的旋律套进另一首歌的节奏和编曲里。",
    "tier2_suno_usage": "在歌曲 Remix 菜单里选择 Mashup，挑选另一首作为对照样本进行混搭。",
    "tier3_example": "把国风民乐的曲调与现代电子舞曲的鼓点揉合生成新潮曲风。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 Remix 选项词条"
  },
  {
    "id": "sample_this_song",
    "term": "Sample this song",
    "category": "ui_core",
    "zh_name": "截取一段当新歌素材",
    "tier1_vernacular": "音乐采样。从这首歌里截取一段非常好听的鼓点、吉他声或一小句哼唱，拿来当作下一首新歌的种子素材。",
    "tier2_suno_usage": "在歌曲菜单里点击 Sample this song，选定想要采样的范围后基于它开启新创作。",
    "tier3_example": "听到一段带感的萨克斯过门，采样后作为新歌的开头动机。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 Remix 选项词条"
  },
  {
    "id": "use_as_inspiration",
    "term": "Use as Inspiration",
    "category": "ui_core",
    "zh_name": "拿这首歌的气氛当灵感",
    "tier1_vernacular": "参考这首歌的情绪、乐器编排和快慢节奏，以此为参考基调去做一首全新的歌曲。",
    "tier2_suno_usage": "在歌曲菜单里点击 Use as Inspiration，系统会自动吸取其风格骨架投喂给新表单。",
    "tier3_example": "喜欢某首歌的慵懒晚风氛围，用作灵感参考做一首同样感觉但歌词不同的新歌。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增功能选项词条"
  },
  {
    "id": "reverse",
    "term": "Reverse",
    "category": "ui_core",
    "zh_name": "声音倒放",
    "tier1_vernacular": "把整段声音从尾到头倒着播放，产生一种奇幻、悬疑、像时间倒流一样的特殊音响效果。",
    "tier2_suno_usage": "在歌曲 Edit 菜单里选择 Reverse 进行倒放渲染。",
    "tier3_example": "用来制作梦境、神秘回忆或前卫迷幻音乐里的特殊转场声效。",
    "prompt_tag": "",
    "expert_status": "reviewed",
    "expert_notes": "新增 Edit 选项词条"
  },
  {
    "id": "add_vocal",
    "term": "Add Vocal",
    "category": "ui_core",
    "zh_name": "给伴奏加人声",
    "tier1_vernacular": "为一段已经做好的纯乐器伴奏补充填入人声演唱。",
    "tier2_suno_usage": "在现有伴奏曲目的菜单中触发，填入想唱的歌词与人声类型后提交生成。",
    "tier3_example": "之前做好的纯音乐很好听，后续想加一段人声歌词时使用。",
    "prompt_tag": "",
    "expert_status": "NOT_YET_VERIFIED",
    "expert_notes": "标注 NOT_YET_VERIFIED，套餐对比表列为 Pro 功能但生成未实测闭环"
  },
  {
    "id": "intro",
    "term": "[Intro]",
    "category": "song_structure",
    "zh_name": "前奏",
    "tier1_vernacular": "歌曲刚开始还没开口唱歌的那几秒乐器演奏，用来把听众带入歌曲的气氛中。",
    "tier2_suno_usage": "放在歌词最开头。方括号是给 Suno 看的路标，中文写在下一行，不是唱出来的词。",
    "tier3_example": "[Intro]\n吉他轻轻弹奏，没有歌声",
    "prompt_tag": "[Intro]",
    "expert_status": "reviewed",
    "expert_notes": "去括号，规范路标说明"
  },
  {
    "id": "verse",
    "term": "[Verse]",
    "category": "song_structure",
    "zh_name": "在讲事情的一段",
    "tier1_vernacular": "交代故事经过的段落。像平时平淡说话一样娓娓道来，唱得比较平，用来把事情交代清楚。",
    "tier2_suno_usage": "通常用三四句把事情说完。第一首做歌建议只写一段讲事情、一段最想被记住的段落。",
    "tier3_example": "[Verse]\n路灯亮了，店门已经拉下\n我还站在昨天告别的地方\n风把话吹得很轻",
    "prompt_tag": "[Verse]",
    "expert_status": "reviewed",
    "expert_notes": "文案与教程第 3 步完全同义对齐"
  },
  {
    "id": "pre_chorus",
    "term": "[Pre-Chorus]",
    "category": "song_structure",
    "zh_name": "导歌，情绪爬坡",
    "tier1_vernacular": "在讲完事情之后、高潮到来之前的过渡几句。乐器开始变多，节奏变密，情绪一步一步向上推。",
    "tier2_suno_usage": "放在讲事情段落之后、核心高潮段落之前，起到蓄力推动的作用。",
    "tier3_example": "[Pre-Chorus]\n心跳越来越快\n脚步不再徘徊",
    "prompt_tag": "[Pre-Chorus]",
    "expert_status": "reviewed",
    "expert_notes": "去括号，强化日常听感"
  },
  {
    "id": "chorus",
    "term": "[Chorus]",
    "category": "song_structure",
    "zh_name": "最想被人记住的那几句",
    "tier1_vernacular": "整首歌最抓耳、最响亮、唱完让人忍不住跟着哼的高潮段落。通常在一首歌里重复出现两到三次。",
    "tier2_suno_usage": "只写最想被人记住的两三句。在第二段和第四段使用同样的词，人能记住的就是这种重复。",
    "tier3_example": "[Chorus]\n你要是回头看一眼\n我就把灯再亮久一点",
    "prompt_tag": "[Chorus]",
    "expert_status": "reviewed",
    "expert_notes": "文案与教程第 3 步完全同义对齐"
  },
  {
    "id": "bridge",
    "term": "[Bridge]",
    "category": "song_structure",
    "zh_name": "过渡转折段",
    "tier1_vernacular": "整首歌唱了大半后，突然换一种旋律走向或完全换一种语气，给人耳目一新的感觉，避免听腻。",
    "tier2_suno_usage": "通常放在第二次高潮之后，唱完后再接最后一次最高潮收尾。",
    "tier3_example": "[Bridge]\n如果时光能倒流\n谁会在下一个路口守候",
    "prompt_tag": "[Bridge]",
    "expert_status": "reviewed",
    "expert_notes": "去括号，通俗化重写"
  },
  {
    "id": "drop",
    "term": "[Drop]",
    "category": "song_structure",
    "zh_name": "高潮爆发点",
    "tier1_vernacular": "电子舞曲里的招牌瞬间。前面节奏一直憋着、垫着，突然一声巨响，强烈的重低音和鼓点全部放开喷涌而出。",
    "tier2_suno_usage": "写在蓄力铺垫段落之后，提示词可写重低音爆发。",
    "tier3_example": "[Drop]\n重低音与鼓点全力爆发",
    "prompt_tag": "[Drop]",
    "expert_status": "reviewed",
    "expert_notes": "去括号，日常听感描绘"
  },
  {
    "id": "hook",
    "term": "[Hook]",
    "category": "song_structure",
    "zh_name": "最想被人记住的那句",
    "tier1_vernacular": "像钩子一样死死勾住耳朵的一小句旋律或词，整首歌里听一遍就忘不掉。注意必须带方括号才表示歌词路标，底栏 Hooks 是短视频功能，不要混淆。",
    "tier2_suno_usage": "放在歌词里标记最核心的那一句毒性旋律。",
    "tier3_example": "[Hook]\n夜太美，哪怕再黑也无所谓",
    "prompt_tag": "[Hook]",
    "expert_status": "reviewed",
    "expert_notes": "去括号，严格强调带方括号与底栏短视频区分"
  },
  {
    "id": "guitar_solo",
    "term": "[Guitar Solo]",
    "category": "song_structure",
    "zh_name": "吉他独奏段",
    "tier1_vernacular": "唱歌停下来，专门留出十秒到二十秒让吉他单独展现华丽旋律的乐段。",
    "tier2_suno_usage": "放在高潮之后或桥段之中，提示 AI 此处不要有人唱歌，只展示吉他弹奏。",
    "tier3_example": "[Guitar Solo]\n电吉他独奏激昂高音",
    "prompt_tag": "[Guitar Solo]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "piano_solo",
    "term": "[Piano Solo]",
    "category": "song_structure",
    "zh_name": "钢琴独奏段",
    "tier1_vernacular": "人声停歇，黑白琴键清澈跳动，单独用钢琴声诉说情感的优美段落。",
    "tier2_suno_usage": "适合抒情慢歌的间奏部分，营造安静深情的氛围。",
    "tier3_example": "[Piano Solo]\n清澈钢琴独奏慢慢流淌",
    "prompt_tag": "[Piano Solo]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "build_up",
    "term": "[Build-Up]",
    "category": "song_structure",
    "zh_name": "蓄力爬坡段",
    "tier1_vernacular": "鼓点从慢变快，声音由轻渐响，音调越来越高，把所有人的情绪不断往上推，等待最后一瞬间爆发。",
    "tier2_suno_usage": "通常放在副歌或高潮爆发点之前，用于积攒巨大的听觉张力。",
    "tier3_example": "[Build-Up]\n密集鼓点加快，音量不断攀升",
    "prompt_tag": "[Build-Up]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "breakdown",
    "term": "[Breakdown]",
    "category": "song_structure",
    "zh_name": "间隙拆解，乐器突然变少",
    "tier1_vernacular": "原本热闹嘈杂的伴奏突然一下子冷下来，鼓停了、重音乐器收起，只剩下人声或者极微弱的乐器在回荡。",
    "tier2_suno_usage": "用来打破长时间高能量的疲劳感，形成一张一弛的对比呼吸感。",
    "tier3_example": "[Breakdown]\n鼓点完全停下，只剩轻柔气声",
    "prompt_tag": "[Breakdown]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "outro",
    "term": "[Outro]",
    "category": "song_structure",
    "zh_name": "尾奏收尾",
    "tier1_vernacular": "歌曲最后一节交代结束的段落。歌词已经唱完，乐器慢慢完成收场交代。",
    "tier2_suno_usage": "写在歌词末尾，告诉 AI 这首歌要在这里体面平稳地收场。",
    "tier3_example": "[Outro]\n音乐渐行渐远，安静停下",
    "prompt_tag": "[Outro]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "fade_out",
    "term": "[Fade Out]",
    "category": "song_structure",
    "zh_name": "渐弱淡出",
    "tier1_vernacular": "歌词里的路标写法，提示 AI 在最后的演奏中让声音越来越轻，直到完全听不见。",
    "tier2_suno_usage": "标注在 [Outro] 的最后一行，用来做出慢慢走远的电影感收尾。",
    "tier3_example": "[Fade Out]\n旋律重复并渐渐弱化消失",
    "prompt_tag": "[Fade Out]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "whisper",
    "term": "[Whisper]",
    "category": "vocals_performance",
    "zh_name": "耳边轻声细语",
    "tier1_vernacular": "像贴着耳朵在说悄悄话一样，声音充满呼吸感，轻柔、私密、安静。",
    "tier2_suno_usage": "放在想要营造私密感、告白感或夜里独白的那一句歌词上方。",
    "tier3_example": "[Whisper]\n这句只说给你一个人听",
    "prompt_tag": "[Whisper]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "belting",
    "term": "[Belting]",
    "category": "vocals_performance",
    "zh_name": "真声高唱，不用假音的实音高唱",
    "tier1_vernacular": "不用假音偷懒，而是用饱满扎实的真声直接飚上高音，充满力量和情绪震撼力。",
    "tier2_suno_usage": "标注在最高潮的核心句，让主唱全力以赴真声释放情感。",
    "tier3_example": "[Belting]\n就算全世界都下起大雨",
    "prompt_tag": "[Belting]",
    "expert_status": "reviewed",
    "expert_notes": "严格遵循指示保持真声高唱，不写回怒音"
  },
  {
    "id": "falsetto",
    "term": "[Falsetto]",
    "category": "vocals_performance",
    "zh_name": "假音高音",
    "tier1_vernacular": "喉咙放松，换成轻飘飘、空灵通透的假声唱高音，听起来像羽毛拂过一样温柔漂浮。",
    "tier2_suno_usage": "用于抒情歌的情感脆弱处，制造令人怜惜的柔美听感。",
    "tier3_example": "[Falsetto]\n飞向云层最柔软的地方",
    "prompt_tag": "[Falsetto]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "spoken_word",
    "term": "[Spoken Word]",
    "category": "vocals_performance",
    "zh_name": "念白说话",
    "tier1_vernacular": "不按旋律唱，而是像电影画外音一样认真念台词、讲故事。",
    "tier2_suno_usage": "放在歌曲开头交代背景，或者放在桥段里进行一段深情自白。",
    "tier3_example": "[Spoken Word]\n那是我们最后一次在站台相遇",
    "prompt_tag": "[Spoken Word]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "vocal_harmonies",
    "term": "[Harmonies]",
    "category": "vocals_performance",
    "zh_name": "多声部和声",
    "tier1_vernacular": "不只一个人在唱，旁边有几个不同高低音的声音同时衬托陪衬，听起来非常宽广厚实、有层次感。",
    "tier2_suno_usage": "标记在副歌最抓耳的句子上，瞬间给声音镀上一层饱满的层次厚度。",
    "tier3_example": "[Harmonies]\n让歌声在整个夜空回荡",
    "prompt_tag": "[Harmonies]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "vibrato",
    "term": "[Vibrato]",
    "category": "vocals_performance",
    "zh_name": "颤音尾音",
    "tier1_vernacular": "尾音拉长时像水波纹一样微微上下抖动颤动，听起来功底扎实、情感充沛深情。",
    "tier2_suno_usage": "用于慢歌长音结尾，增加老练歌唱家的叙事沧桑感或深情感。",
    "tier3_example": "[Vibrato]\n时光带不走深深的思念",
    "prompt_tag": "[Vibrato]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "ad_lib",
    "term": "[Ad-lib]",
    "category": "vocals_performance",
    "zh_name": "即兴垫音哼唱",
    "tier1_vernacular": "歌手跟着感觉随意哼出的即兴音符，比如自由的转音、伴唱的感叹词，用来给主旋律锦上添花。",
    "tier2_suno_usage": "放在主歌词的缝隙或末尾，增加现场即兴演出的鲜活性与高级感。",
    "tier3_example": "[Ad-lib]\n自由的高音哼唱转音",
    "prompt_tag": "[Ad-lib]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "call_and_response",
    "term": "[Call and Response]",
    "category": "vocals_performance",
    "zh_name": "呼应对唱",
    "tier1_vernacular": "你唱一句、我接一句的对答互动。像领唱喊一声，后面大家齐声接一句，非常热闹有互动感。",
    "tier2_suno_usage": "用于欢快歌曲或舞台感强烈的曲目中，营造全场互动的热闹气氛。",
    "tier3_example": "[Call and Response]\n主唱：准备好了吗？伴唱：准备好了！",
    "prompt_tag": "[Call and Response]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "chant",
    "term": "[Chant]",
    "category": "vocals_performance",
    "zh_name": "齐声呼号喊口号",
    "tier1_vernacular": "像球场观众席所有人一起整齐大喊口号一样，声音极具冲击力和号召力。",
    "tier2_suno_usage": "放在热血高能歌曲的间隙，能瞬间点燃全场气势。",
    "tier3_example": "[Chant]\n一起往前冲，绝不回头",
    "prompt_tag": "[Chant]",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "lofi",
    "term": "Lo-fi",
    "category": "genres_and_styles",
    "zh_name": "低保真慢调",
    "tier1_vernacular": "带着黑胶唱片沙沙声、慵懒慢节奏的背景音乐，听起来特别适合深夜看书、写代码或放松发呆。",
    "tier2_suno_usage": "填在风格描述框里，适合做不吵人的背景轻音乐。",
    "tier3_example": "lo-fi hip hop, warm mellow piano, vinyl crackle, chill",
    "prompt_tag": "lo-fi hip hop, warm mellow piano, vinyl crackle, chill",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "city_pop",
    "term": "City Pop",
    "category": "genres_and_styles",
    "zh_name": "城市流行",
    "tier1_vernacular": "像八十年代开着敞篷车在海滨霓虹公路兜风一样的复古都市感，旋律轻快摩登、充满浪漫惬意。",
    "tier2_suno_usage": "填在风格描述框里，做复古都市摩登感音乐的首选。",
    "tier3_example": "city pop, sparkling synth, upbeat funk bass, nostalgic 80s",
    "prompt_tag": "city pop, sparkling synth, upbeat funk bass, nostalgic 80s",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "synthwave",
    "term": "Synthwave",
    "category": "genres_and_styles",
    "zh_name": "复古未来合成器",
    "tier1_vernacular": "浓浓的复古科幻质感，充满跳跃闪烁的电子合成器声响和坚实鼓点，像穿越进老科幻片一样。",
    "tier2_suno_usage": "适合电音迷幻、夜间疾驰或游戏主题曲。",
    "tier3_example": "synthwave, 80s retro synth, driving electro beat, neon night",
    "prompt_tag": "synthwave, 80s retro synth, driving electro beat, neon night",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "melodic_techno",
    "term": "Melodic Techno",
    "category": "genres_and_styles",
    "zh_name": "旋律铁克诺",
    "tier1_vernacular": "低沉持续的鼓点一下接一下打在心口上，伴随深邃空灵的旋律不断盘旋推进，非常让人沉浸入迷。",
    "tier2_suno_usage": "适合深夜深度专注或沉浸式电音俱乐部氛围。",
    "tier3_example": "melodic techno, deep hypnotic pulse, atmospheric synth",
    "prompt_tag": "melodic techno, deep hypnotic pulse, atmospheric synth",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "shoegaze",
    "term": "Shoegaze",
    "category": "genres_and_styles",
    "zh_name": "自赏摇滚",
    "tier1_vernacular": "吉他声音巨大且层层叠叠包裹成一面声音的海洋墙壁，人声像浮在云雾里一样飘渺梦幻。",
    "tier2_suno_usage": "想要宏大模糊、沉浸梦幻的摇滚听感时填入此词。",
    "tier3_example": "shoegaze, dreamy guitar wall of sound, ethereal floating vocal",
    "prompt_tag": "shoegaze, dreamy guitar wall of sound, ethereal floating vocal",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "math_rock",
    "term": "Math Rock",
    "category": "genres_and_styles",
    "zh_name": "数学摇滚",
    "tier1_vernacular": "吉他弹得非常精巧跳跃，节拍常常出其不意地变动变换，听起来像精密的钟表齿轮在灵动起舞。",
    "tier2_suno_usage": "想要新奇灵动、器乐技巧感极强的摇滚乐时使用。",
    "tier3_example": "math rock, clean tapping guitar, intricate rhythm, brisk",
    "prompt_tag": "math rock, clean tapping guitar, intricate rhythm, brisk",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "trap",
    "term": "Trap",
    "category": "genres_and_styles",
    "zh_name": "陷阱说唱",
    "tier1_vernacular": "标志性的轰鸣重低音震感，搭配像机枪一样快速滚动的金属打击碎拍，说唱界最流行的暗黑帅气节拍。",
    "tier2_suno_usage": "做现代帅气说唱、街头潮流音乐的核心风格词。",
    "tier3_example": "trap, deep booming sub-bass, fast rolling hi-hats, dark flow",
    "prompt_tag": "trap, deep booming sub-bass, fast rolling hi-hats, dark flow",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "rb_ballad",
    "term": "R&B Ballad",
    "category": "genres_and_styles",
    "zh_name": "节奏布鲁斯慢情歌",
    "tier1_vernacular": "温暖柔和的电钢琴伴奏，歌手嗓音细腻缠绵、转音顺滑，唱出非常真挚动人的深情爱意。",
    "tier2_suno_usage": "做深情对唱、浪漫抒情情歌的首选题材。",
    "tier3_example": "r&b ballad, smooth electric piano, soulful vocal runs, gentle beat",
    "prompt_tag": "r&b ballad, smooth electric piano, soulful vocal runs, gentle beat",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "indie_folk",
    "term": "Indie Folk",
    "category": "genres_and_styles",
    "zh_name": "独立民谣",
    "tier1_vernacular": "一把原声木吉他清脆弹奏，伴随朴实真诚的人声缓缓唱歌，像坐在山间清晨的阳光下吹着微风。",
    "tier2_suno_usage": "纯净治愈系、文艺走心歌曲的最佳选择。",
    "tier3_example": "indie folk, acoustic guitar, warm intimate vocal, peaceful breeze",
    "prompt_tag": "indie folk, acoustic guitar, warm intimate vocal, peaceful breeze",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "future_bass",
    "term": "Future Bass",
    "category": "genres_and_styles",
    "zh_name": "未来低音",
    "tier1_vernacular": "像弹簧一样有弹性跳跃的明亮合成器音色，高潮爆发时充满欢快跳动的青春能量与梦幻色彩。",
    "tier2_suno_usage": "做动漫感、青春元气、电竞高能音乐的绝佳标签。",
    "tier3_example": "future bass, bouncy supersaw synth, upbeat playful drop",
    "prompt_tag": "future bass, bouncy supersaw synth, upbeat playful drop",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "orchestral_cinematic",
    "term": "Cinematic Orchestral",
    "category": "genres_and_styles",
    "zh_name": "史诗电影管弦乐",
    "tier1_vernacular": "整支大型交响乐团齐奏，恢弘的小提琴群配上震撼的大鼓轰鸣，像坐在电影院看好莱坞大片一样震撼。",
    "tier2_suno_usage": "适合做宏大预告片、游戏大决战背景配乐。",
    "tier3_example": "cinematic orchestral, sweeping strings, thunderous brass, epic",
    "prompt_tag": "cinematic orchestral, sweeping strings, thunderous brass, epic",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "bpm",
    "term": "BPM",
    "category": "production_params",
    "zh_name": "每分钟节拍数，决定快慢",
    "tier1_vernacular": "歌曲的心跳频率。数字越小越慢，像慢步闲聊；数字越大越快，像跑步或狂欢跳舞。",
    "tier2_suno_usage": "可以把具体速度写进风格框，比如 85 bpm 代表抒情慢歌，128 bpm 代表动感舞曲。",
    "tier3_example": "85 bpm 适合慢情歌，120 bpm 适合常规流行，128 bpm 适合欢快跳舞。",
    "prompt_tag": "120 bpm",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "key_signature",
    "term": "Key",
    "category": "production_params",
    "zh_name": "调式与调性，决定明暗色彩",
    "tier1_vernacular": "歌曲的底色明暗。大调通常听起来明媚、开朗、阳光；小调通常听起来忧伤、深沉、难过。",
    "tier2_suno_usage": "可在风格框指定调性，例如 C major 阳光开朗，A minor 忧郁伤感。",
    "tier3_example": "C major, bright and cheerful 或 A minor, melancholic and sad",
    "prompt_tag": "C major",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "reverb",
    "term": "Reverb",
    "category": "production_params",
    "zh_name": "空间混响，像在房间还是大礼堂",
    "tier1_vernacular": "声音反射带来的空间感。没有混响像贴在耳朵边说话；混响大就像站在空旷大教堂或浴室里唱歌一样余音缭绕。",
    "tier2_suno_usage": "想让人声贴耳写 dry intimate vocal；想要梦幻辽阔写 massive ethereal reverb。",
    "tier3_example": "dry vocal, close-mic 或 spacious hall reverb",
    "prompt_tag": "spacious hall reverb",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  },
  {
    "id": "acoustic_vs_electronic",
    "term": "Acoustic vs Electronic",
    "category": "production_params",
    "zh_name": "原声乐器与电子合成器",
    "tier1_vernacular": "原声是指木吉他、真钢琴这种真实物理乐器发出的质朴声音；电子是指用电脑芯片模拟出的现代合成音色。",
    "tier2_suno_usage": "想要自然质朴选 acoustic；想要现代电音感选 electronic 或 synth。",
    "tier3_example": "acoustic: 原声木吉他与温暖钢琴；electronic: 现代律动电音与合成器",
    "prompt_tag": "acoustic guitar, warm piano",
    "expert_status": "reviewed",
    "expert_notes": "去括号"
  }
];
  const SUNO_GUIDE = {
  "title": "做第一首歌",
  "subtitle": "给没有学过音乐的人 · 6 步做出属于你的第一首歌",
  "steps": [
    {
      "step": 1,
      "title": "第 1 步 · 先用一句中文写下想要的感觉",
      "instruction": "先别打开那些英文。用一句平时说话的方式写下来，例如：\n夜里一个人说话，很安静\n想让人跟着唱，副歌大声一点\n有点难过，但是很温柔\n\n这句话留在你自己的备忘录里。后面每一步都用它来判断：做出来的歌像不像这句话。",
      "why_title": "想知道为什么，可跳过",
      "why_content": "一首歌先有气氛，再有句子。你这句中文就是整首歌的目标。后面的英文标签都是为了靠近它，不是为了把术语填满。",
      "copy_label": null,
      "copy_text": null,
      "next_button_text": "我写好了，下一步"
    },
    {
      "step": 2,
      "title": "第 2 步 · 打开创作，点 Advanced，模型留在 v6",
      "instruction": "在 Suno 页面左侧点 Create 创作，在上方三个模式里点 Advanced。\nSimple 是只丢一句给它自己写，Sounds 是做一段声音，不是一整首歌。\n模型留在 v6，这是现在常用的模型。\n如果想做纯音乐，留在 Advanced，歌词框一个字都不填。",
      "why_title": "想知道为什么，可跳过",
      "why_content": "选 Advanced 才能看到歌词框和风格描述框。没有这两格，AI 只能全凭瞎猜。纯音乐不需要找单独开关，只要歌词框什么都不写，做出来就没有人唱。",
      "copy_label": null,
      "copy_text": null,
      "next_button_text": "我选好了，下一步"
    },
    {
      "step": 3,
      "title": "第 3 步 · 歌词先只写两种段落",
      "instruction": "不要一次写很多段。先做两种：\n在讲事情的一段：把经过用三四句说完，唱得比较平；\n最想被人记住的一段：只写两句，这首歌里让它再出现一次。\n\n点下方按钮复制模板贴进歌词框，把中文换成你自己的词，方括号那些行留着。纯音乐跳过复制，歌词框保持空白。",
      "why_title": "想知道为什么，可跳过",
      "why_content": "人能记住的是重复。讲事情的地方负责交代，最响亮的那几句负责被记住。方括号是给 Suno 看的路标，中文句子写在下一行，不是唱出来的词。这就是副歌要唱两遍的原因。",
      "copy_label": "复制歌词骨架模板",
      "copy_text": "[Verse]\n用三四句把事情说完\n\n[Chorus]\n写最想被人记住的两句\n\n[Verse]\n再讲后面发生的一点事\n\n[Chorus]\n把上面那两句再写一遍",
      "next_button_text": "我贴好了，下一步"
    },
    {
      "step": 4,
      "title": "第 4 步 · 风格只贴一行短英文",
      "instruction": "按你在第 1 步写的那句中文，在下面四条里选一条整行贴进风格框。只贴一行短英文，不要把中文说明贴进风格框：\n\n安静、像在耳边说话：\nsoft intimate vocal, acoustic guitar, slow\n\n想让人跟着唱、副歌更有劲：\ncatchy pop, emotional chorus, full band\n\n夜里、有点孤独：\nlate night, mellow piano, warm bass\n\n只要乐器、不要人声：配合歌词框留空：\nacoustic instrumental, no vocals",
      "why_title": "想知道为什么，可跳过",
      "why_content": "这里只先分辨三件事：快慢（慢像说话，快像想跟着点头）、亮还是暗（开朗选流行，孤独选夜里钢琴）、声音离耳朵近还是远。贴一行就够了，不要堆太多互相冲突的词。",
      "copy_label": "复制推荐风格短英文",
      "copy_text": "soft intimate vocal, acoustic guitar, slow",
      "next_button_text": "我贴好了，下一步"
    },
    {
      "step": 5,
      "title": "第 5 步 · 点 Create song 做歌",
      "instruction": "点页面上的 Create song 按钮。\nSuno 一次会做两首，点数会减少。\n把两首都听完，先不要看任何评价，只问自己一句：哪一首更像我在第 1 步写的那句中文？\n留更像的那一首，另一首放着不管。这一步不要求下载。",
      "why_title": "想知道为什么，可跳过",
      "why_content": "AI 每次生成的旋律和唱腔都不一样。一次给两首是给你挑选的机会。第一次做歌只要挑出感觉对的一首，不用急着导出。",
      "copy_label": null,
      "copy_text": null,
      "next_button_text": "我听完了，下一步"
    },
    {
      "step": 6,
      "title": "第 6 步 · 只改最别扭的一处",
      "instruction": "听的时候只抓一个最明显的问题，不要整首重做：\n唱错发音怪：在歌曲三点菜单选 Edit 里的 Replace Section 重做那几秒；\n歌还没唱完：选 Extend 从某一秒往后接；\n开头结尾有空白杂音：选 Crop 把多余部分切掉。\n若要分轨，只用 Get Stems 里的 Auto。改完再听一遍，接近第 1 步那句中文就可以先停。",
      "why_title": "想知道为什么，可跳过",
      "why_content": "整首歌重新生成会完全换一个调子。用局部修改功能，可以在保留好听部分的同时，只把别扭的几秒修好。更多花样可以随时在下方词库查看。",
      "copy_label": null,
      "copy_text": null,
      "next_button_text": "完成第一首教程"
    }
  ]
};

  // 2. 核心注入与状态引擎
  /**
 * Suno Copilot - Core DOM Injection & Interaction Engine
 * Features:
 * 1. Safe MutationObserver scanning (strictly scoped to button, [role="button"], label; companion sibling placement)
 * 2. Samsung Tablet S-Pen Hover (pointerenter) + Finger Tap (click/pin) dual support
 * 3. Bi-directional hover smoothing (150ms enter buffer, 200ms grace period between badge and card)
 * 4. 3-Tier Plain Language Card display with accurate viewport-relative fixed positioning
 * 5. Full rendering of Tier 3 examples + reliable async copy with success/error toasts
 * 6. Floating Music Cheat Sheet Drawer with "做第一首歌" 6-step guided wizard + glossary
 * 7. Comprehensive event isolation on companion badges
 * 8. Local professional musical dictionary priority + optional Google Translate dynamic fallback for unknown terms
 */

// 路线 B：全界面整句精确汉化字典（无中英夹杂，地道中文表述）
const UI_SENTENCES = {
  // 左侧主导航与全局操作
  'Home': '首页',
  'Explore': '发现探索',
  'Create': '创作音乐',
  'Studio': 'Suno Studio，要 Premier',
  'Library': '我的音乐库',
  'Earn Credits': '获取积分额度',
  'Labs': '实验工坊',
  'Notifications': '消息通知',
  'More': '更多选项',
  '... More': '更多选项',
  'Upgrade to Premier': '升级到 Premier',
  'Upgrade': '升级会员',
  'Sign Out': '退出登录',
  'Settings': '账户设置',

  // 顶部创作模式与功能切换（严格对齐真实界面，覆盖带加号与纯单词形式）
  'Simple': '丢一句给它写',
  'Advanced': '自己写歌词和风格',
  'Sounds': '做一段声音',
  '+ Audio': '添加音频',
  'Audio': '添加音频',
  '+ Voice': '加入一段声音',
  'Voice': '加入一段声音',
  '+ Inspo': '从歌单里找感觉',
  'Inspo': '从歌单里找感觉',
  '+ Image': '添加图片',
  'Image': '添加图片',

  // 核心生成与模型
  'Create song': '做歌，一次两首',
  'Create Song': '做歌，一次两首',
  'v6': '现在常用的模型',
  'v6-wild': '更敢试、更怪',
  'v6-mini': '免费档，更省',

  // 时长设置（严禁译为“自定义模式”，时长 Custom 是歌曲长短）
  'Duration': '歌曲长短',
  'Custom': '自己定长短',
  'Auto': '系统自动决定',

  // 编辑功能
  'Extend': '顺畅续写下一段',
  'Get Stems': '分轨提取',
  'Reuse Prompt': '一键复用提示词与参数',
  'Replace Section': '局部重做指定片段',
  'Crop Audio': '裁剪音频时长',
  'Crop': '裁剪音频时长',
  'Remove Section': '删掉指定片段',
  'Fade In': '开头声音渐渐变大',
  'Fade Out': '结尾声音渐渐变小',
  'Adjust Speed': '调整整首歌快慢',
  'Remaster': '重新润色音质',
  'Reverse': '声音倒放',
  'Add Vocal': '给伴奏加人声',

  // 高级参数与选项
  'Exclude styles': '排除不想要的风格',
  'Exclude Styles': '排除不想要的风格',
  'Weirdness': '创意发散程度',
  'Vocal Gender': '选男声或女声',
  'Style Influence': '风格词影响程度',
  'Variety': '结果差异程度',
  'My Taste': '按我的听歌偏好',
  'Max Mode': '开启深度生成',
  'Song Title': '歌曲标题',
  'Song Title (Optional)': '歌曲标题，可不填',
  'Title': '歌曲标题',
  'Mashup': '两首歌揉合',
  'Sample this song': '截取一段当新歌素材',
  'Use as Inspiration': '拿这首歌的气氛当灵感',

  // 歌词辅助与输入提示
  'Make Random Lyrics': '随机生成一段歌词',
  'Clear Lyrics': '清空当前歌词',
  'Start writing lyrics, or leave this empty for instrumental': '开始写歌词。什么都不填，做出来就没有人唱',
  'Describe the style of music you want...': '写下你想听到的气氛、快慢和乐器',

  // 工作区与日期分隔符
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

// 路线 B：右侧歌曲列表动态风格整句翻译词典 (按匹配长度倒序排列，纯本地白话听感，无中英夹杂)
const VIBE_DICTIONARY = [
  // 教程专用整句与长短语
  { en: 'soft intimate vocal, acoustic guitar, slow', zh: '温柔贴耳人声，原声木吉他，慢速' },
  { en: 'catchy pop, emotional chorus, full band', zh: '悦耳流行，富有感染力的高潮，完整乐队编制' },
  { en: 'late night, mellow piano, warm bass', zh: '深夜氛围，醇厚柔和钢琴，温暖贝斯' },
  { en: 'acoustic instrumental, no vocals', zh: '原声器乐演奏，无人声' },

  // 复合长短语
  { en: 'cheerful acoustic guitar folk', zh: '轻松愉悦的原声吉他民谣' },
  { en: 'cheerful acoustic folk-pop', zh: '欢快轻柔的原声民谣流行' },
  { en: 'brisk gentle fingerpicking', zh: '轻快温和的细腻指弹' },
  { en: 'minimalist neoclassical', zh: '极简新古典主义风格' },
  { en: 'ambient meditation', zh: '沉浸式冥想氛围音乐' },
  { en: 'electronic dance with saturated sub-bass', zh: '律动电子舞曲，融合饱满浑厚的超重低音' },
  { en: 'electronic dance', zh: '律动强劲的电子舞曲' },
  { en: 'driving rhythmic groove', zh: '强劲推进的节奏律动' },
  { en: 'pulsing synthesizer lead and sequen...', zh: '脉冲合成器主奏与音序编排' },
  { en: 'pulsing synthesizer lead and sequencer', zh: '脉冲合成器主奏与音序器' },
  { en: 'pulsing synthesizer lead', zh: '脉冲合成器主奏' },
  { en: 'saturated sub-bass', zh: '饱满浑厚的超重低音' },
  { en: 'light and breezy', zh: '微风拂面般的惬意听感' },
  { en: 'upbeat and cheerful', zh: '欢快明朗的气氛' },
  { en: 'warm and cozy', zh: '温暖治愈的柔和声响' },
  { en: 'rhythmic synthesizer instrumental', zh: '节奏合成器纯音乐编曲' },
  { en: 'rhythmic synthesizer', zh: '节奏感合成器' },
  { en: 'acoustic guitar folk', zh: '原声木吉他民谣' },
  { en: 'acoustic guitar', zh: '原声木吉他' },
  { en: 'electric guitar', zh: '电吉他清音与扫弦' },
  { en: 'acoustic folk-pop', zh: '原声民谣流行' },
  { en: 'acoustic folk', zh: '原声质朴民谣' },

  // 演奏技法与律动模式
  { en: 'tight four-on-the-floor groove', zh: '紧凑利落的四四拍正拍律动' },
  { en: 'driving four-on-the-floor groove', zh: '强劲推进的四四拍正拍律动' },
  { en: 'four-on-the-floor groove', zh: '四四拍正拍律动' },
  { en: 'four-on-the-floor', zh: '四四拍正拍律动' },
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
  { en: 'warm fingerpicking', zh: '温暖质感的指弹' },
  { en: 'organic percussion', zh: '原声质感打击乐' },
  { en: 'sweet male vocals', zh: '甜美深情的男声演唱' },
  { en: 'sweet male vocal', zh: '甜美男声' },
  { en: 'sweet female vocals', zh: '甜美动听的女声演唱' },
  { en: 'sweet female vocal', zh: '甜美女声' },
  { en: 'sweet vocals', zh: '甜美人声演唱' },
  { en: 'sweet vocal', zh: '甜美人声' },
  { en: 'warm vocals', zh: '温暖人声演唱' },
  { en: 'warm vocal', zh: '温暖人声' },
  { en: 'soft intimate vocal', zh: '温柔贴耳人声' },
  { en: 'soft intimate vocals', zh: '温柔贴耳人声' },
  { en: 'intimate vocal', zh: '贴耳人声' },
  { en: 'intimate vocals', zh: '贴耳人声' },
  { en: 'soft vocal', zh: '轻柔人声' },
  { en: 'soft vocals', zh: '轻柔人声' },
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
  { en: 'fingerpicking', zh: '细腻指弹' },
  { en: 'fingerstyle', zh: '细腻指弹' },
  { en: 'grand piano', zh: '大三角钢琴独奏' },
  { en: 'upright piano', zh: '立式钢琴' },
  { en: 'electric piano', zh: '温暖电钢琴' },
  { en: 'mellow piano', zh: '醇厚柔和钢琴' },
  { en: 'warm bass', zh: '温暖贝斯' },
  { en: 'synth lead', zh: '合成器主奏' },
  { en: 'synth pad', zh: '氛围合成器柔和铺底' },
  { en: 'synth-pop', zh: '八十年代复古合成器流行' },
  { en: 'synthwave', zh: '复古未来合成器' },
  { en: 'city pop', zh: '都市复古流行' },
  { en: 'indie pop', zh: '清新独立流行' },
  { en: 'indie rock', zh: '独立摇滚' },
  { en: 'pop rock', zh: '流行摇滚' },
  { en: 'hard rock', zh: '硬摇滚' },
  { en: 'punk rock', zh: '朋克摇滚' },
  { en: 'heavy metal', zh: '重金属失真咆哮' },
  { en: 'hip hop', zh: '硬核律动嘻哈说唱' },
  { en: 'hip-hop', zh: '硬核律动嘻哈说唱' },
  { en: 'boom bap', zh: '经典老学校说唱' },
  { en: 'drum and bass', zh: '碎拍鼓打贝斯' },
  { en: 'future bass', zh: '未来低音' },
  { en: 'deep house', zh: '深邃内敛的浩室舞曲' },
  { en: 'smooth jazz', zh: '顺滑都市爵士' },
  { en: 'bossa nova', zh: '海滨波萨诺瓦' },
  { en: 'female vocals', zh: '女声演唱' },
  { en: 'female vocal', zh: '女声' },
  { en: 'male vocals', zh: '男声演唱' },
  { en: 'male vocal', zh: '男声' },
  { en: 'backing vocals', zh: '伴唱和声' },
  { en: 'airy vocals', zh: '呼吸感人声' },
  { en: 'raspy vocals', zh: '沙哑烟熏嗓' },
  { en: 'string quartet', zh: '室内乐弦乐四重奏' },

  // 基础单项与风格词
  { en: 'cheerful', zh: '轻松欢快' },
  { en: 'breezy', zh: '惬意微风' },
  { en: 'brisk', zh: '轻快灵动' },
  { en: 'gentle', zh: '柔和温润' },
  { en: 'driving', zh: '动力推进感' },
  { en: 'ambient', zh: '空灵氛围' },
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
  { en: 'blues', zh: '蓝调' },
  { en: 'classical', zh: '古典交响' },
  { en: 'orchestral', zh: '管弦交响' },
  { en: 'cinematic', zh: '电影原声大片质感' },
  { en: 'reggae', zh: '雷鬼律动' },
  { en: 'reggaeton', zh: '拉丁雷鬼动舞曲' },
  { en: 'funk', zh: '放克律动' },
  { en: 'disco', zh: '迪斯科复古律动' },
  { en: 'house', zh: '四四拍浩室舞曲' },
  { en: 'techno', zh: '铁克诺舞曲' },
  { en: 'trance', zh: '迷幻推进舞曲' },
  { en: 'trap', zh: '低音陷阱说唱' },
  { en: 'rap', zh: '说唱' },
  { en: 'rnb', zh: '节奏布鲁斯' },
  { en: 'soul', zh: '深情灵魂乐' },
  { en: 'lo-fi', zh: '低保真慢调' },
  { en: 'lofi', zh: '低保真慢调' },
  { en: 'country', zh: '乡村音乐' },
  { en: 'latin', zh: '拉丁风情' },
  { en: 'bachata', zh: '巴恰塔双人舞曲' },
  { en: 'instrumental', zh: '纯音乐' },
  { en: 'synthesizer', zh: '合成器' },
  { en: 'piano', zh: '钢琴' },
  { en: 'guitar', zh: '吉他' },
  { en: 'bass', zh: '低音贝斯' },
  { en: 'strings', zh: '弦乐群' },
  { en: 'violin', zh: '小提琴' },
  { en: 'cello', zh: '大提琴' },
  { en: 'drums', zh: '鼓点' },
  { en: 'percussion', zh: '打击乐' },
  { en: 'flute', zh: '长笛' },
  { en: 'saxophone', zh: '萨克斯风' },
  { en: 'trumpet', zh: '小号' },
  { en: 'choir', zh: '唱诗班合唱' },
  { en: 'harmonies', zh: '多声部和声' },
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
  { en: 'moody', zh: '情绪化氛围' },
  { en: 'slow', zh: '慢速' },
  { en: 'fast', zh: '快速' },
  { en: 'soft', zh: '轻柔温和' },
  { en: 'intimate', zh: '贴耳亲切' },
  { en: 'late night', zh: '深夜氛围' },
  { en: 'full band', zh: '完整乐队编制' },
  { en: 'no vocals', zh: '无人声' },
  { en: 'the drop', zh: '高潮爆发点' },
  { en: 'beat drop', zh: '节拍突进高潮' },
  { en: 'bass drop', zh: '低音下潜高潮' },
  { en: 'drop', zh: '高潮爆发点' }
];
VIBE_DICTIONARY.sort((a, b) => b.en.length - a.en.length);

// 常见机器翻译硬伤逆向纠偏（第三重兜底校准）
const MISTRANSLATION_FIXES = [
  { bad: /地板上的四个|四在地板上|四个在地板上/g, good: '四四拍正拍律动' },
  { bad: /用手指拨弦，不是拿片扫|手指弹奏风格/g, good: '细腻指弹' }
];

class SunoCopilotEngine {
  constructor(glossary, styles, guide) {
    this.glossary = Array.isArray(glossary) ? glossary : [];
    this.styles = styles || '';
    this.guide = guide || null;
    this.cardEl = null;
    this.toastEl = null;
    this.drawerEl = null;
    this.isPinned = false;
    this.currentActiveBadge = null;
    this.activeDrawerTab = 'all';
    this.drawerSearchQuery = '';
    this.tutorialStep = 1;
    this.whyExpanded = false;
    this.showTimer = null;
    this.hideTimer = null;
    this.toastTimer = null;
    this.init();
  }

  init() {
    this.cleanStaleCaches();
    this.injectStyles();
    this.createGlobalElements();
    this.scanAndInject();
    this.startObserver();
  }

  cleanStaleCaches() {
    try {
      if (typeof localStorage !== 'undefined') {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('sc_trans_') || key.startsWith('sc_vibe_'))) {
            const val = localStorage.getItem(key);
            if (val && /四层节奏|四地板|四个在地板上|地板上的四个/i.test(val)) {
              keysToRemove.push(key);
            }
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      }
    } catch (_) {}
  }

  isForbiddenOrStaleTranslation(text, cached) {
    if (!cached || typeof cached !== 'string') return true;
    if (/四层节奏|四地板|四个在地板上|地板上的四个|用手指拨弦，不是拿片扫/i.test(cached)) {
      return true;
    }
    const lower = text.toLowerCase();
    if (lower.includes('four-on-the-floor') && !cached.includes('四四拍正拍律动')) {
      return true;
    }
    if (lower.includes('drum and bass') && !cached.includes('碎拍鼓打贝斯') && !cached.includes('鼓打贝斯')) {
      return true;
    }
    if (lower.includes('light and breezy') && !cached.includes('微风') && !cached.includes('惬意')) {
      return true;
    }
    return false;
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

    // 2. 创建复制提示 Toast
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

    // 4. 创建右下角速查浮球
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
    ball.title = 'Suno 音乐创作速查手册与做第一首歌向导';
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

    const tutorialHtml = this.renderTutorialCard();

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
      tabsHtml += '<button class="sc-tab-btn ' + activeClass + '" data-tab="' + cat.id + '">' + cat.name + '</button>';
    });

    this.drawerEl.innerHTML = `
      <div class="sc-drawer-header">
        <div class="sc-drawer-title">
          <span>🎵</span>
          <span>Suno中文通速查手册</span>
        </div>
        <button class="sc-close-btn" id="sc-drawer-close" title="关闭速查手册">✕</button>
      </div>

      ${tutorialHtml}

      <input type="text" class="sc-drawer-search" placeholder="🔍 搜索词条、流派、结构标签..." value="${this.escapeHtml(this.drawerSearchQuery)}">

      <div class="sc-drawer-tabs">
        ${tabsHtml}
      </div>

      <div class="sc-drawer-body"></div>
    `;

    this.bindDrawerEvents();
    this.renderDrawerBody();
  }

  renderTutorialCard() {
    if (!this.guide || !Array.isArray(this.guide.steps) || this.guide.steps.length === 0) {
      return '';
    }

    const currentStepObj = this.guide.steps.find(s => s.step === this.tutorialStep) || this.guide.steps[0];
    const totalSteps = this.guide.steps.length;

    let dotsHtml = '';
    for (let i = 1; i <= totalSteps; i++) {
      dotsHtml += `<span class="sc-tutorial-dot ${i === this.tutorialStep ? 'active' : ''}"></span>`;
    }

    let copyBtnHtml = '';
    if (currentStepObj.copy_text) {
      copyBtnHtml = `
        <button class="sc-tutorial-copy-btn" id="sc-tutorial-copy-trigger" data-copy="${this.escapeHtml(currentStepObj.copy_text)}">
          <span>📋</span>
          <span>${this.escapeHtml(currentStepObj.copy_label || '一键复制')}</span>
        </button>
      `;
    }

    let whyHtml = '';
    if (currentStepObj.why_content) {
      const isExpanded = this.whyExpanded;
      whyHtml = `
        <div class="sc-tutorial-why-toggle" id="sc-why-toggle">
          <span>${isExpanded ? '▾' : '▸'}</span>
          <span>${this.escapeHtml(currentStepObj.why_title || '想知道为什么，可跳过')}</span>
        </div>
        <div class="sc-tutorial-why-content" id="sc-why-content" style="display: ${isExpanded ? 'block' : 'none'};">
          ${this.escapeHtml(currentStepObj.why_content)}
        </div>
      `;
    }

    const prevBtnHtml = this.tutorialStep > 1
      ? `<button class="sc-tutorial-prev-btn" id="sc-tutorial-prev">上一步</button>`
      : '';

    const nextBtnText = currentStepObj.next_button_text || (this.tutorialStep === totalSteps ? '完成教程' : '我贴好了，下一步');

    return `
      <div class="sc-tutorial-card">
        <div class="sc-tutorial-header">
          <span class="sc-tutorial-step-tag">做第一首歌 · 第 ${this.tutorialStep} / ${totalSteps} 步</span>
          <div class="sc-tutorial-step-dots">${dotsHtml}</div>
        </div>
        <div class="sc-tutorial-title">${this.escapeHtml(currentStepObj.title)}</div>
        <div class="sc-tutorial-instruction">${this.escapeHtml(currentStepObj.instruction)}</div>
        ${whyHtml}
        <div class="sc-tutorial-actions">
          ${copyBtnHtml}
          <div class="sc-tutorial-nav-row">
            ${prevBtnHtml}
            <button class="sc-tutorial-next-btn" id="sc-tutorial-next">
              <span>${this.escapeHtml(nextBtnText)}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindDrawerEvents() {
    const closeBtn = this.drawerEl.querySelector('#sc-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.drawerEl.style.display = 'none';
      });
    }

    const searchInput = this.drawerEl.querySelector('.sc-drawer-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.drawerSearchQuery = e.target.value.trim().toLowerCase();
        this.renderDrawerBody();
      });
    }

    this.drawerEl.querySelectorAll('.sc-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeDrawerTab = e.currentTarget.getAttribute('data-tab');
        this.drawerEl.querySelectorAll('.sc-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderDrawerBody();
      });
    });

    const whyToggle = this.drawerEl.querySelector('#sc-why-toggle');
    if (whyToggle) {
      whyToggle.addEventListener('click', () => {
        this.whyExpanded = !this.whyExpanded;
        const whyContent = this.drawerEl.querySelector('#sc-why-content');
        if (whyContent) {
          whyContent.style.display = this.whyExpanded ? 'block' : 'none';
        }
        whyToggle.querySelector('span:first-child').textContent = this.whyExpanded ? '▾' : '▸';
      });
    }

    const copyBtn = this.drawerEl.querySelector('#sc-tutorial-copy-trigger');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const copyText = copyBtn.getAttribute('data-copy');
        if (copyText) {
          this.copyToClipboard(copyText);
        }
      });
    }

    const prevBtn = this.drawerEl.querySelector('#sc-tutorial-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.tutorialStep > 1) {
          this.tutorialStep--;
          this.whyExpanded = false;
          this.renderDrawerContent();
        }
      });
    }

    const nextBtn = this.drawerEl.querySelector('#sc-tutorial-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalSteps = this.guide && this.guide.steps ? this.guide.steps.length : 6;
        if (this.tutorialStep < totalSteps) {
          this.tutorialStep++;
          this.whyExpanded = false;
          this.renderDrawerContent();
        } else {
          this.showToast('🎉 太棒了，你已经掌握了 Suno 做第一首歌的核心步骤！', 'success');
          this.tutorialStep = 1;
          this.whyExpanded = false;
          this.renderDrawerContent();
        }
      });
    }
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
        const shortZh = item.zh_name.split('/')[0].split('(')[0].split('，')[0].trim();
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

    if (el.isContentEditable) return true;
    if (el.closest && el.closest('[contenteditable="true"], input, textarea, [role="textbox"]')) {
      return true;
    }

    if (el.closest && el.closest('#suno-copilot-card, #suno-copilot-drawer, #suno-copilot-float-ball, .suno-copilot-companion, .suno-copilot-badge, .suno-copilot-subtext, .suno-copilot-nav-zh, .suno-copilot-song-desc-zh')) {
      return true;
    }

    return false;
  }

  scanAndInject() {
    if (typeof document === 'undefined') return;

    // 1. 全界面导航与功能菜单汉化
    this.scanNavigationAndMenus();

    // 2. 核心制作人控件（问号徽标 + 三层通俗白话卡片）
    this.scanProducerBadges();

    // 3. 输入框与占位提示语汉化
    this.scanPlaceholders();

    // 4. 右侧歌曲列表灰字描述 100% 本地专业翻译
    this.scanSongDescriptions();
  }

  getCleanText(el) {
    if (!el) return '';
    let text = el.textContent || '';
    if (el.querySelectorAll) {
      const injected = el.querySelectorAll('.suno-copilot-nav-zh, .suno-copilot-subtext, .suno-copilot-badge');
      for (const node of injected) {
        if (node.textContent) {
          text = text.replace(node.textContent, '');
        }
      }
    }
    return text.trim().replace(/\s+/g, ' ');
  }

  scanProducerBadges() {
    const uiTerms = this.glossary.filter(item => item.category === 'ui_core');
    if (uiTerms.length === 0) return;

    const elements = document.querySelectorAll('button, [role="button"], label');

    for (const el of elements) {
      if (el.dataset && el.dataset.scProcessed) continue;
      if (this.isEditableOrIgnored(el)) continue;

      const rawText = this.getCleanText(el);
      if (!rawText || rawText.length > 40) continue;

      // 规则：若按钮文字正好是 Custom，只能挂时长那一项，绝不匹配 Advanced
      if (/^Custom$/i.test(rawText)) {
        const durItem = uiTerms.find(item => item.id === 'duration_custom');
        if (durItem) {
          this.injectBadge(el, durItem);
        }
        continue;
      }

      // 规则：Lyrics 是输入区，不挂问号
      if (/^Lyrics$/i.test(rawText)) {
        continue;
      }

      // 规则：Hooks 底栏是短视频产品，若不带方括号绝不匹配 [Hook]
      if (/^Hooks?$/i.test(rawText) && !rawText.startsWith('[')) {
        continue;
      }

      // 规则：加号动作按钮 (+ Audio, + Voice, + Inspo, + Image 等) 属于顶部快速操作栏，仅汉化文字，严禁注入兄弟徽标挤占网格
      if (/^\+/i.test(rawText) || el.textContent.trim().startsWith('+') || /^\+\s*(Audio|Voice|Inspo|Image)/i.test(el.textContent.trim())) {
        continue;
      }
      if (/^(Audio|Voice|Inspo|Image)$/i.test(rawText) && (el.textContent.includes('+') || (el.parentElement && (el.parentElement.textContent.includes('Audio') || el.parentElement.textContent.includes('Voice') || el.parentElement.textContent.includes('Inspo'))))) {
        continue;
      }

      for (const item of uiTerms) {
        if (item.id === 'duration_custom' || item.id === 'duration_auto') continue;

        const cleanTerm = item.term.replace(/^[\[\]]/g, '').trim();

        // 模型版本：只允许整词精确匹配 v6, v6-wild, v6-mini
        if (item.term === 'v6' || item.id === 'model_version') {
          if (/^v6$/i.test(rawText)) {
            this.injectBadge(el, item);
            break;
          }
          continue;
        }
        if (item.term === 'v6-wild' || item.id === 'v6_wild') {
          if (/^v6-wild$/i.test(rawText)) {
            this.injectBadge(el, item);
            break;
          }
          continue;
        }
        if (item.term === 'v6-mini' || item.id === 'v6_mini') {
          if (/^v6-mini$/i.test(rawText)) {
            this.injectBadge(el, item);
            break;
          }
          continue;
        }

        if (cleanTerm === 'Voice') {
          if (rawText !== 'Voice' || el.textContent.includes('+') || (el.parentElement && (el.parentElement.textContent.includes('Audio') || el.parentElement.textContent.includes('Inspo')))) {
            continue;
          }
        }

        const regexExact = new RegExp(`^${this.escapeRegExp(cleanTerm)}$`, 'i');
        let matched = regexExact.test(rawText);

        if (!matched && cleanTerm === 'Crop Audio' && /^Crop$/i.test(rawText)) matched = true;
        if (!matched && cleanTerm === 'Advanced' && /^Advanced$/i.test(rawText)) matched = true;
        if (!matched && cleanTerm === 'Create song' && /^Create(?:\s+song)?$/i.test(rawText)) matched = true;

        if (matched) {
          this.injectBadge(el, item);
          break;
        }
      }
    }
  }

  isInsideCreatorEditor(el) {
    if (!el) return false;
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

      const wrapper = el.closest && el.closest('a, button, [role="button"]');
      if (wrapper && wrapper !== el && wrapper.querySelector && (wrapper.querySelector('.suno-copilot-nav-zh') || wrapper.querySelector('.suno-copilot-subtext'))) {
        continue;
      }
      if (el.querySelector && (el.querySelector('.suno-copilot-nav-zh') || el.querySelector('.suno-copilot-subtext'))) {
        continue;
      }

      const rawText = this.getCleanText(el);
      if (!rawText || rawText.length > 50) continue;

      // 匹配静态整句字典
      let zh = UI_SENTENCES[rawText];

      // 容错剥离前导 '+' 或非破坏匹配（彻底解决 + Audio, + Voice, + Inspo 漏翻）
      if (!zh) {
        const stripped = rawText.replace(/^\+\s*/, '').trim();
        zh = UI_SENTENCES[stripped] || UI_SENTENCES['+ ' + stripped];
      }

      // 匹配动态 Filters (3)
      if (!zh) {
        const filterMatch = rawText.match(/^Filters(?:\s*\((\d+)\))?$/i);
        if (filterMatch) {
          zh = filterMatch[1] ? `筛选过滤 ${filterMatch[1]}` : '筛选过滤';
        }
      }

      // 模型版本整词匹配
      if (!zh && /^v6$/i.test(rawText)) {
        zh = '现在常用的模型';
      } else if (!zh && /^v6-wild$/i.test(rawText)) {
        zh = '更敢试、更怪';
      } else if (!zh && /^v6-mini$/i.test(rawText)) {
        zh = '免费档，更省';
      }

      if (zh) {
        if (el.dataset) el.dataset.scNavProcessed = 'true';
        el.title = `${rawText} · ${zh}`;

        const navSpan = document.createElement('span');
        navSpan.className = 'suno-copilot-nav-zh';

        // 按用户明确要求：对紧凑快捷动作栏 (+ Audio, + Voice, + Inspo 等) 采用“上英下中”垂直双行策略
        if (/^\+\s*(Audio|Voice|Inspo|Image)/i.test(rawText) || /^(Audio|Voice|Inspo|Image)$/i.test(rawText)) {
          if (el.classList && el.classList.add) {
            el.classList.add('suno-copilot-stacked-btn');
          }
          navSpan.classList.add('stacked');
        }

        navSpan.textContent = `${zh}`;

        el.appendChild(navSpan);
      }
    }
  }

  scanPlaceholders() {
    const inputs = document.querySelectorAll('input, textarea');
    for (const el of inputs) {
      if (el.closest && el.closest('#suno-copilot-drawer, #suno-copilot-card')) continue;

      const ph = el.placeholder || (el.getAttribute && el.getAttribute('placeholder'));
      if (!ph || (el.dataset && el.dataset.scPhProcessed)) continue;

      const trimmedPh = ph.trim();
      if (trimmedPh.includes('Start writing lyrics') && !trimmedPh.includes('开始写歌词')) {
        el.placeholder = 'Start writing lyrics, or leave this empty for instrumental\n开始写歌词。什么都不填，做出来就没有人唱';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (trimmedPh.includes('Search for songs')) {
        el.placeholder = 'Search for songs, playlists, creators, or genres\n搜歌曲、歌单、人或风格';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (trimmedPh.includes('Describe the style') && !trimmedPh.includes('写下你想听到的气氛')) {
        el.placeholder = 'Describe the style of music you want... · 写下你想听到的气氛、快慢和乐器';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (/^Search$/i.test(trimmedPh)) {
        el.placeholder = 'Search · 搜歌曲、歌单、人或风格';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      } else if (UI_SENTENCES[trimmedPh]) {
        el.placeholder = `${trimmedPh} · ${UI_SENTENCES[trimmedPh]}`;
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
      }
    }

    // 扫描可能存在的可见占位符元素 (如 React 覆盖层或 label)
    const overlayCandidates = document.querySelectorAll('[class*="placeholder"], [data-placeholder], label');
    for (const el of overlayCandidates) {
      if (el.closest && el.closest('#suno-copilot-drawer, #suno-copilot-card')) continue;
      if (el.dataset && el.dataset.scPhProcessed) continue;
      const text = el.textContent ? el.textContent.trim() : '';
      if (text.includes('Start writing lyrics') && !text.includes('开始写歌词')) {
        if (!el.children || el.children.length === 0) {
          el.textContent = 'Start writing lyrics, or leave this empty for instrumental\n开始写歌词。什么都不填，做出来就没有人唱';
          if (el.dataset) el.dataset.scPhProcessed = 'true';
        }
      }
    }
  }

  scanSongDescriptions() {
    const candidates = document.querySelectorAll('p, span, div');
    for (const el of candidates) {
      if (this.isEditableOrIgnored(el)) continue;
      if (this.isInsideCreatorEditor(el)) continue;
      if (el.dataset && el.dataset.scDescProcessed) continue;

      if (el.children && el.children.length > 0) {
        const hasBlockChildren = Array.from(el.children).some(c => !['SPAN', 'EM', 'STRONG', 'B', 'I'].includes(c.tagName));
        if (hasBlockChildren) continue;
      }

      const rawText = el.textContent ? el.textContent.trim() : '';
      if (!rawText || rawText.length < 5 || rawText.length > 300) continue;

      if (!this.looksLikeMusicDescription(rawText)) continue;

      // 执行路线 B 专业整句翻译 (优先本地专业词库，未知词异步后台动态整句翻译兜底)
      let zhDiv = null;
      const translation = this.translateMusicDescription(rawText, (dynamicTranslation) => {
        if (dynamicTranslation && zhDiv) {
          zhDiv.textContent = dynamicTranslation;
          zhDiv.title = `完整译文: ${dynamicTranslation}`;
          if (el) el.title = dynamicTranslation;
        }
      });
      if (!translation || translation === rawText) continue;

      if (el.dataset) el.dataset.scDescProcessed = 'true';
      el.title = `${translation}`;

      const next = el.nextElementSibling || el.nextSibling;
      if (next && next.classList && next.classList.contains('suno-copilot-song-desc-zh')) {
        continue;
      }

      zhDiv = document.createElement('div');
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
    if (/^\d+:\d+$/.test(text.trim())) return false;
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

    const cacheKey = 'sc_trans_v2_' + cleanText.toLowerCase();
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached && !/[a-zA-Z]/.test(cached) && !this.isForbiddenOrStaleTranslation(cleanText, cached)) {
          return cached;
        }
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

    // 1. 本地持久缓存校验（纯中文且排查已知机翻硬伤与术语缺失）
    const cacheKey = 'sc_trans_v2_' + trimmed.toLowerCase();
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem(cacheKey);
        if (cached && !/[a-zA-Z]/.test(cached) && !this.isForbiddenOrStaleTranslation(trimmed, cached)) {
          return cached;
        }
      }
    } catch (_) {}

    // 2. 主子句切分：仅按主从标点（逗号、分号、换行）切分子句，绝不在查词典前粗暴按 and/with 切分！
    // 这样 'drum and bass' 或 'light and breezy' 就能作为完整词条被优先识别！
    const clauses = trimmed.split(/[,;\n\r]+/).map(s => s.trim()).filter(Boolean);
    const resolvedChunks = [];
    const untranslatedTasks = [];

    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i];
      const lower = clause.toLowerCase();
      let matchedZh = null;

      // 2.1 精确匹配整段词条（长短语与完整复合词优先，如 'drum and bass' -> '碎拍鼓打贝斯'）
      for (const entry of VIBE_DICTIONARY) {
        if (lower === entry.en.toLowerCase()) {
          matchedZh = entry.zh;
          break;
        }
      }

      if (matchedZh) {
        // 完全精准命中：绝对锁定，绝不送谷歌
        resolvedChunks.push({ index: i, text: matchedZh, isLocked: true, tokenMap: null });
        continue;
      }

      // 2.2 段内混合短语：采用长词优先 Token Masking（占位符保护）
      // VIBE_DICTIONARY 已经按英文长度倒序排列
      // 例如：tight four-on-the-floor groove and surprise kazoo
      // tight four-on-the-floor groove 优先匹配并戴上面具 SCTERM0X
      const tokenMap = new Map();
      let masked = clause;
      let tokenIdx = 0;

      for (const entry of VIBE_DICTIONARY) {
        const escaped = entry.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const reg = new RegExp('\\b' + escaped + '\\b', 'gi');
        if (reg.test(masked)) {
          const token = `SCTERM${tokenIdx++}X`;
          tokenMap.set(token, entry.zh);
          masked = masked.replace(reg, token);
        }
      }

      // 判断该段是否全部被已知词典词条覆盖（仅允许遗留连接词 and, with, &, feat 等及标点空格）
      const remainingLetters = masked
        .replace(/SCTERM\d+X/gi, '')
        .replace(/\b(?:and|with|feat\.?|featuring)\b/gi, '')
        .replace(/[^a-zA-Z]/g, '');

      if (tokenMap.size > 0 && remainingLetters.length === 0) {
        // 全词典覆盖：将占位符还原为中文，连接词平滑转为中式顿号分隔
        let fullZh = masked;
        for (const [token, zh] of tokenMap.entries()) {
          fullZh = fullZh.replace(new RegExp(token, 'g'), zh);
        }
        fullZh = fullZh
          .replace(/\s*(?:and|with|feat\.?|featuring|&)\s*/gi, ' · ')
          .replace(/\s*[·,\s]+\s*/g, ' · ')
          .replace(/^[\s·]+|[\s·]+$/g, '')
          .trim();
        resolvedChunks.push({ index: i, text: fullZh, isLocked: true, tokenMap: null });
      } else if (tokenMap.size > 0) {
        // 段落内既有已知专业词（如 tight four-on-the-floor groove）又有未知生词（如 surprise kazoo）
        // 1. 提取已知词作为即时同步呈现（绝不空白！）
        const immediateTerms = Array.from(tokenMap.values());
        resolvedChunks.push({
          index: i,
          text: immediateTerms.join(' · '),
          isLocked: false,
          maskedText: masked,
          tokenMap: tokenMap
        });
        // 2. 仅将戴上占位符面具的文本发送给谷歌（如 "SCTERM0X and surprise kazoo"）
        untranslatedTasks.push({ index: i, text: masked, tokenMap: tokenMap });
      } else {
        // 完全未知生词段
        resolvedChunks.push({ index: i, text: clause, isLocked: false, maskedText: clause, tokenMap: null });
        untranslatedTasks.push({ index: i, text: clause, tokenMap: null });
      }
    }

    // 3. 动态翻译与无损回填：谷歌翻译只处理未知词，占位符在返回后无损还原为专业术语
    if (untranslatedTasks.length > 0 && typeof this.fetchDynamicTranslation === 'function') {
      const tasks = untranslatedTasks.map(async (task) => {
        try {
          let trans = await this.fetchDynamicTranslation(task.text);
          if (trans && !/[a-zA-Z]{5,}/.test(trans.replace(/SCTERM\d+X/gi, ''))) {
            // 3.1 占位符精准反解：将 SCTERM0X 还原为真实专业词（如“四四拍正拍律动”）
            if (task.tokenMap) {
              for (const [token, zh] of task.tokenMap.entries()) {
                const tokenRegex = new RegExp(token.split('').join('\\s*'), 'gi');
                if (tokenRegex.test(trans)) {
                  trans = trans.replace(tokenRegex, zh);
                } else if (!trans.includes(zh)) {
                  // 强制兜底：谷歌翻译意外吞掉 token 时，将专业词置入
                  trans = `${zh} · ${trans}`;
                }
              }
            }

            // 3.2 逆向机翻硬伤纠偏（防止漏网之鱼）
            for (const fix of MISTRANSLATION_FIXES) {
              trans = trans.replace(fix.bad, fix.good);
            }

            return { index: task.index, text: trans };
          }
        } catch (_) {}
        return null;
      });

      Promise.all(tasks).then((results) => {
        let hasUpdate = false;
        for (const r of results) {
          if (r && r.text) {
            resolvedChunks[r.index].text = r.text;
            resolvedChunks[r.index].isLocked = true;
            hasUpdate = true;
          }
        }

        if (hasUpdate) {
          let finalValid = resolvedChunks
            .filter(s => s.isLocked || /[\u4e00-\u9fa5]/.test(s.text))
            .map(s => s.text)
            .join(' · ');

          // 强制防线：若原文含有 four-on-the-floor，最终结果必须包含“四四拍正拍律动”
          if (trimmed.toLowerCase().includes('four-on-the-floor') && !finalValid.includes('四四拍正拍律动')) {
            finalValid = `四四拍正拍律动 · ${finalValid}`;
          }

          if (finalValid && !/[a-zA-Z]/.test(finalValid)) {
            try {
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem(cacheKey, finalValid);
              }
            } catch (_) {}
          }

          if (typeof onDynamicComplete === 'function') {
            onDynamicComplete(finalValid);
          }
        }
      }).catch(() => {});
    }

    // 4. 同步即时返回已锁定的段落或部分命中的专业词（立刻见效，绝不出现空白）
    const immediateValid = resolvedChunks
      .filter(s => /[\u4e00-\u9fa5]/.test(s.text))
      .map(s => s.text);

    if (immediateValid.length === 0) return '';

    let localResult = immediateValid.join(' · ');
    if (trimmed.toLowerCase().includes('four-on-the-floor') && !localResult.includes('四四拍正拍律动')) {
      localResult = `四四拍正拍律动 · ${localResult}`;
    }

    if (localResult && !/[a-zA-Z]/.test(localResult)) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(cacheKey, localResult);
        }
      } catch (_) {}
    }

    return localResult;
  }

  injectBadge(targetEl, item) {
    if (targetEl.dataset) {
      targetEl.dataset.scProcessed = 'true';
    }

    const companion = document.createElement('span');
    companion.className = 'suno-copilot-companion';

    // 若 targetEl 已经有 nav-zh 汉化，则不插入重复中文小字，避免工具栏挤压换行
    const hasNavZh = targetEl.querySelector && targetEl.querySelector('.suno-copilot-nav-zh');
    if (!hasNavZh) {
      const subtext = document.createElement('span');
      subtext.className = 'suno-copilot-subtext';
      const shortZh = item.zh_name.split('/')[0].split('(')[0].split('，')[0].replace(/[()（）]/g, '').trim();
      subtext.textContent = `${shortZh}`;
      companion.appendChild(subtext);
    }

    // 添加问号徽标
    const badge = document.createElement('span');
    badge.className = 'suno-copilot-badge';
    badge.textContent = '?';
    badge.title = `点击查看 ${item.term} 通俗白话讲解`;

    this.isolateEvents(badge);

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

    const categoryName = categoryNames[item.category] || '中文通';
    const pinBadgeHtml = this.isPinned ? `<span class="sc-pinned-badge">📌 已固定</span>` : '';

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

    const closeBtn = this.cardEl.querySelector('#sc-card-close-trigger');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideCard();
      });
    }

    const copyTrigger = this.cardEl.querySelector('#sc-prompt-copy-trigger');
    if (copyTrigger) {
      copyTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.copyToClipboard(item.prompt_tag);
      });
    }

    this.positionCard(targetBadge);
    this.cardEl.classList.add('active');
  }

  positionCard(targetBadge) {
    if (!targetBadge || !this.cardEl) return;

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

  // 3. 自动实例化启动 (样式已由 manifest.json 注入)
  if (typeof window !== 'undefined') {
    window.sunoCopilotInstance = new SunoCopilotEngine(SUNO_GLOSSARY, '', SUNO_GUIDE);
  }
})();
