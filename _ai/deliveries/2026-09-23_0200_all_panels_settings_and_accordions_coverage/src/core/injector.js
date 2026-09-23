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
  // ==========================================
  // 1. 全局导航、侧边栏与头部操作
  // ==========================================
  'Home': '首页',
  'Explore': '发现探索',
  'Create': '创作音乐',
  'Studio': 'Suno Studio，要 Premier',
  'Library': '我的音乐库',
  'Earn Credits': '获取积分额度',
  'Credits': '积分额度',
  'Labs': '实验工坊',
  'Notifications': '消息通知',
  'More': '更多选项',
  '... More': '更多选项',
  'Upgrade to Premier': '升级到 Premier',
  'Upgrade to Pro': '升级到 Pro',
  'Upgrade': '升级会员',
  'Sign Out': '退出登录',
  'Settings': '账户设置',
  'Profile': '个人主页',
  'Feedback': '意见反馈',
  'Help': '帮助支持',
  'Help & Support': '帮助与支持',
  'Help Center': '帮助中心',
  'Keyboard Shortcuts': '键盘快捷键',
  'Terms of Service': '服务条款',
  'Privacy Policy': '隐私政策',

  // ==========================================
  // 2. 创作页模式切换与顶部快捷动作
  // ==========================================
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

  // ==========================================
  // 3. 核心生成与模型版本
  // ==========================================
  'Create song': '做歌，一次两首',
  'Create Song': '做歌，一次两首',
  'Generate': '生成',
  'Regenerate': '重新生成',
  'v6': '现在常用的模型',
  'v6-wild': '更敢试、更怪',
  'v6-mini': '免费档，更省',
  'v5': '历史模型 v5',
  'v4.5': '历史模型 v4.5',
  'v4': '历史模型 v4',
  'Model': '模型版本',
  'Model Version': '模型版本',

  // ==========================================
  // 4. 创作页高级参数与折叠控制 (More Options / Accordions)
  // ==========================================
  'Lyrics': '歌词',
  'Styles': '音乐风格',
  'Style': '音乐风格',
  'Style of Music': '音乐风格',
  'More Options': '更多高级设置',
  'Fewer Options': '收起高级设置',
  'Advanced Settings': '高级参数设置',
  'General Settings': '通用设置',
  'Exclude styles': '排除不想要的风格',
  'Exclude Styles': '排除不想要的风格',
  'Duration': '歌曲长短',
  'Custom': '自己定长短',
  'Auto': '系统自动决定',
  'Max Mode': '开启深度生成',
  'Weirdness': '创意发散程度',
  'Style Influence': '风格词影响程度',
  'Variety': '结果差异程度',
  'Personalize': '个性化推荐',
  'My Taste': '按我的听歌偏好',
  'Vocal Gender': '选男声或女声',
  'Male': '男声',
  'Female': '女声',
  'Off': '关',
  'On': '开',
  'Normal': '适中',
  'Balanced': '均衡',
  'Low': '低',
  'High': '高',
  'Default': '默认',
  'Reset': '重置',
  'Expected results': '符合预期',
  'Moderate': '中度影响',
  'Instrumental': '纯音乐（无人声）',
  'Song Title': '歌曲标题',
  'Song Title (Optional)': '歌曲标题，可不填',
  'Title': '歌曲标题',

  // ==========================================
  // 5. Sounds 声音生成模式专属高级面板
  // ==========================================
  'Loop': '循环播放',
  'Looping': '循环播放中',
  'One-shot': '单次触发',
  'Pitch': '音调高低',
  'Key': '调性',
  'Root Note': '根音',
  'BPM': '节拍速度 (BPM)',
  'Tempo': '节拍速度',
  'Length': '声音时长',
  'Sample Rate': '采样率',

  // ==========================================
  // 6. Upload Audio 上传音频与录音面板
  // ==========================================
  'Upload Audio': '上传参考音频',
  'Upload an Audio File': '上传音频文件',
  'Record Audio': '录制音频',
  'Record': '开始录音',
  'Start Recording': '开始录音',
  'Stop Recording': '停止录音',
  'Choose File': '选择文件',
  'Select File': '选择文件',
  'Upload': '上传',
  'Start Time': '起始时间',
  'End Time': '结束时间',
  'Trim Audio': '裁剪截取音频',
  'Extend from Upload': '从上传音频续写',
  'Generate Song': '用此音频做歌',
  'Separate Stems': '提取人声伴奏分轨',

  // ==========================================
  // 7. Extend 顺畅续写面板与参数
  // ==========================================
  'Extend': '顺畅续写下一段',
  'Extend from': '从指定时间续写',
  'Extend from this song': '从这首歌续写',
  'Extend at': '续写起始点',
  'Extend At': '续写起始点',
  'Clear time': '清空时间',
  'Part': '片段',
  'Part 1': '第 1 段',
  'Part 2': '第 2 段',
  'Part 3': '第 3 段',
  'Part 4': '第 4 段',
  'Part 5': '第 5 段',
  'Full Song': '完整整首',
  'Get Whole Song': '合并整首歌',
  'Add Part': '增加下一段',

  // ==========================================
  // 8. Edit / Audio Editor 音频编辑、裁剪与微调面板
  // ==========================================
  'Crop Audio': '裁剪音频时长',
  'Crop': '裁剪音频时长',
  'Trim': '裁剪修剪',
  'Replace Section': '局部重做指定片段',
  'Remove Section': '删掉指定片段',
  'Fade In': '开头声音渐渐变大',
  'Fade Out': '结尾声音渐渐变小',
  'Adjust Speed': '调整整首歌快慢',
  'Playback Speed': '播放速度',
  'Pitch Shift': '微调升降调',
  'Remaster': '重新润色音质',
  'Reverse': '声音倒放',
  'Add Vocal': '给伴奏加人声',
  'Apply Changes': '应用更改',
  'Discard Changes': '放弃更改',
  'Preview': '试听预览',
  'Preview Section': '试听该片段',

  // ==========================================
  // 9. Stems 分轨提取面板
  // ==========================================
  'Get Stems': '分轨提取',
  'Separate Vocals and Instrumental': '分离人声与伴奏',
  'Vocal Stem': '人声分轨',
  'Instrumental Stem': '伴奏分轨',
  'Drums Stem': '鼓组分轨',
  'Bass Stem': '贝斯分轨',
  'Stems': '分轨文件',

  // ==========================================
  // 10. 歌曲上下文操作菜单 (Context Menu / 三个点选项)
  // ==========================================
  'Reuse Prompt': '一键复用提示词与参数',
  'Reuse Style': '复用曲风提示词',
  'Reuse Lyrics': '复用歌词',
  'Cover Song': '根据旋律翻唱新风格',
  'Cover': '翻唱新风格',
  'Remix': '重新混音制作',
  'Mashup': '两首歌揉合',
  'Sample this song': '截取一段当新歌素材',
  'Sample': '采样片段',
  'Use as Inspiration': '拿这首歌的气氛当灵感',
  'Create Persona': '固定并保存专属歌手音色',
  'Persona': '专属歌手音色',
  'Save Persona': '保存歌手音色',
  'Download': '下载',
  'Download Audio': '下载音频 (MP3)',
  'Download Video': '下载视频 (MP4)',
  'Download Stems': '下载分轨打包',
  'Share': '分享歌曲',
  'Copy Link': '复制歌曲链接',
  'Embed': '嵌入播放器代码',
  'Add to Playlist': '添加到歌单',
  'Remove from Playlist': '从歌单移除',
  'Publish': '发布到公开社区',
  'Unpublish': '设为私密（取消公开）',
  'Make Public': '设为公开',
  'Make Private': '设为私密',
  'Move to Trash': '移入回收站',
  'Delete': '删除',

  // ==========================================
  // 11. Library 音乐库、歌单与批量管理
  // ==========================================
  'Workspaces': '工作区',
  'My Workspace': '我的工作区',
  'All': '全部',
  'All Songs': '全部歌曲',
  'Songs': '歌曲',
  'Playlists': '歌单列表',
  'Trash': '回收站',
  'Liked': '我喜欢的歌',
  'Shared': '分享给我的',
  'New Playlist': '新建歌单',
  'Create Playlist': '创建歌单',
  'Playlist Title': '歌单名称',
  'Playlist Description': '歌单介绍',
  'Edit Playlist': '编辑歌单',
  'Delete Playlist': '删除歌单',
  'Sort by': '排序方式',
  'Date Created': '创建时间',
  'Date Added': '添加时间',
  'Recently Played': '最近播放',
  'Most Played': '播放最多',
  'Most Liked': '点赞最多',
  'Newest First': '最新在前',
  'Oldest First': '最早在前',
  'Alphabetical': '按字母排序',
  'Select All': '全选',
  'Deselect All': '取消全选',
  'Batch Actions': '批量操作',
  'Restore': '恢复',
  'Restore All': '全部恢复',
  'Delete Forever': '彻底粉碎删除',
  'Empty Trash': '清空回收站',

  // ==========================================
  // 12. Explore 发现与社群榜单
  // ==========================================
  'Trending': '热门趋势榜',
  'Top': '热门高分榜',
  'New': '最新发布',
  'Featured': '官方精选',
  'Showcase': '创作者展台',
  'Community': '社群作品',
  'Genres': '全部曲风流派',
  'Top Creators': '人气创作者',
  'Play All': '全部播放',
  'Shuffle': '随机乱序播放',
  'Follow': '关注',
  'Following': '已关注',
  'Followers': '粉丝',
  'Play': '播放',
  'Pause': '暂停',
  'Queue': '当前播放列表',
  'Clear Queue': '清空播放列表',

  // ==========================================
  // 13. Settings 账户设置与套餐面板
  // ==========================================
  'Account': '账户信息',
  'Username': '用户名',
  'Display Name': '显示昵称',
  'Bio': '个人简介',
  'Avatar': '头像设置',
  'Subscription': '会员订阅',
  'Current Plan': '当前套餐',
  'Free Plan': '免费套餐',
  'Pro Plan': 'Pro 专业版',
  'Premier Plan': 'Premier 旗舰版',
  'Credits Remaining': '剩余积分额度',
  'Manage Subscription': '管理订阅套餐',
  'Cancel Subscription': '取消订阅',
  'Billing History': '历史账单明细',
  'Payment Method': '支付管理',
  'Audio Quality': '导出音质',
  'Theme': '外观主题',
  'Dark': '深色模式',
  'Light': '浅色模式',
  'System': '跟随系统',
  'Language': '语言偏好',

  // ==========================================
  // 14. 通用弹窗与交互按钮
  // ==========================================
  'Confirm': '确认',
  'Cancel': '取消',
  'Save': '保存',
  'Save Changes': '保存更改',
  'Discard': '放弃',
  'Apply': '应用',
  'Done': '完成',
  'Close': '关闭',
  'Back': '返回',
  'Next': '下一步',
  'Submit': '提交',
  'Copy': '复制',
  'Copied': '已复制',
  'Remove': '移除',
  'Edit': '编辑',
  'View Details': '查看详情',
  'Details': '详细信息',
  'Info': '说明信息',
  'Less': '收起',
  'Show More': '显示更多',
  'Show Less': '显示更少',
  'Expand': '展开折叠',
  'Collapse': '收起折叠',
  'Filters': '筛选过滤',
  'Search': '搜索',
  'Clear': '清空',
  'Clear All': '清空全部',
  'Retry': '重试',
  'Refresh': '刷新',
  'Make Random Lyrics': '随机生成一段歌词',
  'Clear Lyrics': '清空当前歌词',
  'Start writing lyrics, or leave this empty for instrumental': '开始写歌词。什么都不填，做出来就没有人唱',
  'Describe the style of music you want...': '写下你想听到的气氛、快慢和乐器',
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
  { en: 'percussion instruments', zh: '打击乐器编制' },
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
  { en: 'ambient metal', zh: '氛围金属' },
  { en: 'hip hop', zh: '硬核律动嘻哈说唱' },
  { en: 'hip-hop', zh: '硬核律动嘻哈说唱' },
  { en: 'boom bap', zh: '经典老学校说唱' },
  { en: 'drum and bass', zh: '碎拍鼓打贝斯' },
  { en: 'future bass', zh: '未来低音' },
  { en: 'deep house', zh: '深邃内敛的浩室舞曲' },
  { en: 'smooth jazz', zh: '顺滑都市爵士' },
  { en: 'swing jazz', zh: '摇摆爵士' },
  { en: 'bossa nova', zh: '海滨波萨诺瓦' },
  { en: 'female vocals', zh: '女声演唱' },
  { en: 'female vocal', zh: '女声' },
  { en: 'male vocals', zh: '男声演唱' },
  { en: 'male vocal', zh: '男声' },
  { en: 'old man vocals', zh: '沧桑老者人声' },
  { en: 'old man voice', zh: '沧桑老者嗓音' },
  { en: 'old man vocal', zh: '沧桑男声' },
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
  { en: 'accordion', zh: '手风琴' },
  { en: 'sanfona', zh: '巴西手风琴' },
  { en: 'flute', zh: '长笛' },
  { en: 'saxophone', zh: '萨克斯风' },
  { en: 'trumpet', zh: '小号' },
  { en: 'choir', zh: '唱诗班合唱' },
  { en: 'harmonies', zh: '多声部和声' },
  { en: 'vocal', zh: '人声演唱' },
  { en: 'vocals', zh: '人声演唱' },
  { en: 'acoustic', zh: '原声不插电' },
  { en: 'groove', zh: '身体律动感' },
  { en: 'swing', zh: '摇摆律动' },
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
    const childNodes = el.childNodes || el.children;
    if (!childNodes || childNodes.length === 0) {
      const text = el.textContent || '';
      return text.replace(/^[∨∧^<>▾▸▼▲•·:\s]+/, '').replace(/[∨∧^<>▾▸▼▲•·:\s]+$/, '').trim().replace(/\s+/g, ' ');
    }

    let text = '';
    const isIgnoredNode = (node) => {
      if (!node) return true;
      if (node.tagName === '#TEXT' || node.nodeType === 3) return false;
      if (node.classList && (node.classList.contains('suno-copilot-nav-zh') || node.classList.contains('suno-copilot-subtext') || node.classList.contains('suno-copilot-badge'))) {
        return true;
      }
      if (node.tagName === 'SVG' || node.tagName === 'BUTTON') return true;
      if (node.getAttribute && (node.getAttribute('aria-hidden') === 'true' || node.getAttribute('role') === 'button' || node.getAttribute('role') === 'img')) {
        return true;
      }
      return false;
    };

    const extract = (node) => {
      const list = node.childNodes || node.children;
      if (!list || list.length === 0) {
        if (!isIgnoredNode(node)) {
          text += (node.textContent || '') + ' ';
        }
        return;
      }
      for (const child of list) {
        if (child.tagName === '#TEXT' || child.nodeType === 3) {
          text += (child.textContent || '') + ' ';
        } else if (!isIgnoredNode(child)) {
          extract(child);
        }
      }
    };

    extract(el);
    return text.replace(/^[∨∧^<>▾▸▼▲•·:\s]+/, '').replace(/[∨∧^<>▾▸▼▲•·:\s]+$/, '').trim().replace(/\s+/g, ' ');
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
    if (el.closest && el.closest('form, textarea, [contenteditable="true"], [role="textbox"], [data-section="creator"], [class*="creator"], [class*="editor"], [class*="prompt"], [class*="lyrics"], [data-testid*="lyrics"], [class*="setting"], [class*="param"], [class*="option"], [class*="control"]')) {
      return true;
    }
    return false;
  }

  scanNavigationAndMenus() {
    const candidates = document.querySelectorAll(
      'a, button, [role="button"], [role="menuitem"], [role="tab"], [role="switch"], [role="option"], ' +
      'nav span, aside span, header span, div[role="tab"], summary, ' +
      '[class*="trigger"], [class*="accordion"], [class*="collapse"], [class*="collapsible"], ' +
      'h1, h2, h3, h4, h5, h6, label, span, [class*="label"], [class*="title"], [class*="setting"], ' +
      '[class*="param"], [class*="control"], [class*="option"], [class*="item"]'
    );

    for (const el of candidates) {
      if (this.isEditableOrIgnored(el)) continue;
      if (el.dataset && el.dataset.scNavProcessed) continue;

      const wrapper = el.parentElement ? el.parentElement.closest('a, button, [role="button"], [role="menuitem"], label, summary, [class*="trigger"], [class*="setting"], [class*="param"]') : null;
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

        // 若元素内包含 info 提示图标或按钮，中文标签插入在图标之前，保持自然阅读顺序
        const infoBtn = el.querySelector && el.querySelector('button, [role="button"], svg, [aria-label*="info"], [class*="info"]');
        if (infoBtn && infoBtn.parentElement === el) {
          el.insertBefore(navSpan, infoBtn);
        } else {
          el.appendChild(navSpan);
        }
      }
    }
  }

  scanPlaceholders() {
    const inputs = document.querySelectorAll('input, textarea');
    for (const el of inputs) {
      if (el.closest && el.closest('#suno-copilot-drawer, #suno-copilot-card')) continue;

      const ph = el.placeholder || (el.getAttribute && el.getAttribute('placeholder'));
      if (!ph) continue;

      const trimmedPh = ph.trim();
      if (trimmedPh.includes('Start writing lyrics') && !trimmedPh.includes('开始写歌词')) {
        el.placeholder = 'Start writing lyrics, or leave this empty for instrumental\n开始写歌词。什么都不填，做出来就没有人唱';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
        continue;
      }
      if (trimmedPh.includes('Search for songs') && !trimmedPh.includes('搜歌曲')) {
        el.placeholder = 'Search for songs, playlists, creators, or genres\n搜歌曲、歌单、人或风格';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
        continue;
      }
      if (trimmedPh.includes('Describe the style') && !trimmedPh.includes('写下你想听到的气氛')) {
        el.placeholder = 'Describe the style of music you want...\n写下你想听到的气氛、快慢和乐器';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
        continue;
      }
      if (/^Search$/i.test(trimmedPh)) {
        el.placeholder = 'Search · 搜歌曲、歌单、人或风格';
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
        continue;
      }
      if (UI_SENTENCES[trimmedPh]) {
        el.placeholder = `${trimmedPh} · ${UI_SENTENCES[trimmedPh]}`;
        if (el.setAttribute) el.setAttribute('placeholder', el.placeholder);
        if (el.dataset) el.dataset.scPhProcessed = 'true';
        continue;
      }

      // 动态随机风格提示词 (如 swing jazz, ambient metal, percussion instruments, old man voice, sanfona)
      const rawPrompt = (trimmedPh.includes('\n') ? trimmedPh.split('\n')[0] : (trimmedPh.includes(' · ') ? trimmedPh.split(' · ')[0] : trimmedPh)).trim();

      if (this.looksLikeMusicDescription(rawPrompt) || (rawPrompt.includes(',') && /[a-zA-Z]/.test(rawPrompt))) {
        if (el.dataset && el.dataset.scPhRaw === rawPrompt && ph.includes('\n')) {
          continue;
        }

        if (el.dataset) el.dataset.scPhRaw = rawPrompt;

        const zh = this.translateMusicDescription(rawPrompt, (dynamicZh) => {
          if (dynamicZh && el) {
            const updated = `${rawPrompt}\n${dynamicZh}`;
            el.placeholder = updated;
            if (el.setAttribute) el.setAttribute('placeholder', updated);
          }
        });

        if (zh) {
          const newPh = `${rawPrompt}\n${zh}`;
          el.placeholder = newPh;
          if (el.setAttribute) el.setAttribute('placeholder', newPh);
        }
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
    const trimmed = text.trim();
    if (/^\d+:\d+$/.test(trimmed)) return false;
    if (trimmed.includes('Start writing lyrics') || trimmed.includes('Describe the style')) return false;
    if (/^(Today|Yesterday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Search|Filters)$/i.test(trimmed)) return false;
    if (UI_SENTENCES[trimmed]) return false;
    if (/^(Vocal Gender|Style Influence|Max Mode|Duration|Variety|Weirdness|Personalize)$/i.test(trimmed)) return false;

    const musicKeywords = [
      'acoustic', 'guitar', 'folk', 'pop', 'dance', 'electronic', 'rock', 'synth',
      'ambient', 'meditation', 'minimalist', 'classical', 'piano', 'bass', 'groove',
      'rhythmic', 'drums', 'sub-bass', 'breezy', 'cheerful', 'upbeat', 'slow',
      'fast', 'tempo', 'vocal', 'vocals', 'instrumental', 'hip hop', 'trap', 'jazz',
      'blues', 'soul', 'funk', 'metal', 'lo-fi', 'lofi', 'house', 'techno', 'edm',
      'string', 'violin', 'lead', 'sequen', 'beat', 'drop', 'melancholic', 'chill',
      'emotional', 'epic', 'dark', 'warm', 'brass', 'saxophone', 'fingerpicking',
      'punchy', 'percussion', 'kick', 'clap', 'strummed', 'steel-string', 'organic',
      'swing', 'sanfona', 'accordion', 'voice'
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

// 导出或浏览器环境自动挂载
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SunoCopilotEngine;
} else if (typeof window !== 'undefined') {
  window.SunoCopilotEngine = SunoCopilotEngine;
}
