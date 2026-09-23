# 交给开发的合并提示词

- **Task**: 把词库与教程计划、汉化审查意见合成一份提示词。
- **Result**: 提示词在同目录 `PROMPT.md`。把该文件从第一条分隔线以下整段交给写代码的 AI。
- **Delivery Path**: `_ai/deliveries/2026-09-22_2350_handoff_glossary_guide_translation/`
- **取代**: `_ai/deliveries/2026-09-22_1936_review_pc_live_and_prompt/PROMPT.md` 不再使用。
- **依据**: `_ai/deliveries/2026-09-22_2025_glossary_tutorial_plan/DELIVERY.md`、`_ai/deliveries/2026-09-22_2345_review_hybrid_translation/DELIVERY.md`。

这一轮要他同时改三处，并且三处中文一致：`glossary.json` 的问号长解释、`UI_SENTENCES` 的按钮短中文、插件里的「做第一首歌」。谷歌翻译通道删掉。`2320` 里已经做对的四条保留：无 `【中文】` 前缀、英文原文不动、歌词区不插歌曲简介、问号短标题去掉括号。

本文件不改产品代码。
