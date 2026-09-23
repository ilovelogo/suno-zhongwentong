# AI Development Protocol

版本：v1  
日期：2026-09-12  
用途：适用于各类软件开发项目以及 Codex、Claude Code、Gemini CLI、Antigravity、其他 AI/Agent 工具。

---

## 1. 基本原则

- Chat 是控制面，不是长期文件仓库。
- Project 是正式工作区，是项目事实与正式文件的主要来源。
- Delivery Folder 是每次 AI 正式任务的可携带交付包。
- 已经存在于项目文件中的完整内容，不应再次大段复制到 Chat。
- 可复用、需保存、需审查、需转交的内容优先写入文件。
- 不依赖 AI 的聊天记忆保存重要项目事实。

原则：

> Chat 用于指挥和简短汇报；Project 用于正式工作；Delivery 用于查看、保存、审计和转交。

---

## 2. Chat 保持轻量

Chat 主要用于：

- 任务指令；
- 简短讨论；
- 判断与决策；
- 重大风险或阻塞提示；
- 结果摘要；
- 文件和 Delivery Folder 路径；
- 必要的下一步。

除非用户明确要求，不应在 Chat 中完整粘贴：

- 完整代码文件；
- 长 Prompt；
- 长报告；
- 大段日志；
- 大型 Diff；
- 长列表；
- 已经生成到文件中的正文。

原则：

> 已经进入文件的内容，不再重复占用 Chat 上下文。

---

## 3. 文件优先规则

如果内容主要用于以下目的，应优先写入文件而不是 Chat：

- 保存；
- 复用；
- 执行；
- 审查；
- 转交其他 AI；
- 版本比较；
- 长期项目记录。

推荐格式：

- 文档、Prompt、报告、说明：`.md`
- 结构化机器数据：`.json`
- 补丁：`.diff` / `.patch`
- 多文件交付：目录或 `.zip`

不以固定字符数作为唯一判断标准；以内容用途为主要判断依据。

---

## 4. 不直播普通工作过程

AI 应执行任务，而不是持续在 Chat 中直播普通操作过程。

正常情况下，无需逐步汇报：

- 浏览目录；
- 搜索代码；
- 打开文件；
- 普通修改；
- 编译；
- 常规测试；
- 重试。

只有出现以下情况时才应主动中断并汇报：

- 需要用户作出关键决策；
- 权限或环境导致无法继续；
- 发现可能造成数据损失或重大破坏的风险；
- 当前任务的前提明显错误；
- 继续执行会明显超出既定 Scope。

原则：

> Do not narrate routine work. Perform the work and report decision-relevant information.

---

## 5. 单一任务与 Scope

一次正式执行应有一个明确的主要任务。

- 不擅自扩大 Scope；
- 不顺便处理无关问题；
- 新发现但不属于本任务的问题，记录后留给后续任务；
- 不因“顺手”而修改无关代码或配置；
- 当前任务完成后再进入下一项。

原则：

> Discussion can diverge; execution must converge.

---

## 6. 读取上下文的原则

- 先读取项目入口和当前任务直接相关的文件；
- 不默认遍历整个项目文档树；
- 不默认重新阅读全部历史 Chat；
- 不重复读取明显无关的大文件；
- 已有明确项目事实时，不要求用户重新输入同一信息；
- 不确定的项目专有事实不得根据一般常识自动补全。

不确定时使用：

- `UNKNOWN`
- `SOURCE_PENDING`
- `NOT_YET_VERIFIED`

---

## 7. 验证与结果真实性

AI 不得仅以“已完成”“PASS”“SUCCESS”作为充分证明。

应根据任务性质尽可能提供：

- 实际测试结果；
- 构建结果；
- Exit code；
- 关键日志；
- 生成文件；
- 实际运行证据；
- 必要截图或机器可验证结果。

验证失败时，不得报告为成功。

---

## 8. Delivery Folder：每次正式任务必须有独立交付目录

这是通用强制规则，适用于所有能够访问项目文件系统的 AI / Agent，而不限于某一具体工具。

每次正式任务结束时，AI 必须将本轮需要用户：

- 查看；
- 保存；
- 审计；
- 验证；
- 转交给其他 AI；
- 留档；

的成果集中到一个独立的 Delivery Folder。

用户不得被要求在整个项目目录中自行寻找本轮输出。

推荐位置：

```text
_ai/
  deliveries/
    YYYY-MM-DD_HHMM_<task-slug>/
```

示例：

```text
_ai/deliveries/2026-09-12_1015_fix_android_build/
_ai/deliveries/2026-09-12_1430_review_database/
_ai/deliveries/2026-09-12_1810_add_login_ui/
```

命名要求：

- 使用任务完成时的本地时间；
- 任务名使用简短、稳定、可读的 ASCII slug；
- 同一任务重新执行时新建新的时间目录；
- 不使用 `final_final2` 等含糊名称；
- 不覆盖旧 Delivery。

原则：

> One task, one portable delivery folder.

---

## 9. Delivery Folder 必须具有可携带性

Delivery Folder 应做到：

> 用户拿走这个目录后，能够基本理解这一轮 AI 做了什么，并可直接交给另一个 AI 继续审查或处理。

因此 Delivery 中应根据需要包含：

- 本轮任务与结果说明；
- 关键修改文件的副本；
- 原文件路径或相对路径；
- 测试 / 构建结果；
- 未解决问题；
- 必要日志；
- 必要 Diff / Patch；
- 必要截图；
- 其他复审所需材料。

如果复制关键文件到 Delivery，应尽量保留其项目相对目录结构，避免所有文件平铺后失去来源关系。

---

## 10. Delivery 复杂度必须与任务复杂度匹配

不要为了“标准化”而让简单任务产生大量无意义文件。

### Small Task

默认只需：

```text
DELIVERY.md
```

其中简要记录：

- Task
- Result
- Files changed
- Validation
- Issues
- Original paths

### Normal Task

按需包含：

```text
DELIVERY.md
FILES_CHANGED.md
TEST_RESULTS.md
BUILD_RESULTS.md
ISSUES.md
files/
```

只生成实际需要的文件。

### Large / Review Task

可按需增加：

```text
TASK.md
PATCH.diff
logs/
screenshots/
MANIFEST.json
HASHES.sha256
REVIEW_LITE.zip
```

原则：

> Delivery should be sufficient, not ceremonial.

---

## 11. Delivery 不替代正式工程

Delivery Folder 是交付副本和审查包，不是正式源码目录。

- 正式源码仍保留在项目正常目录；
- 正式配置仍保留在项目正常目录；
- 正式状态文件仍保留在正式位置；
- Delivery 中只复制本轮需要查看、审计或转交的材料；
- 不为了制作 Delivery 而移动或破坏正式项目文件；
- 不允许后续开发仅修改 Delivery 中的副本而遗漏正式项目文件。

---

## 12. AI 最终回复格式

正式任务完成后，Chat 默认保持简短。

推荐格式：

```text
Completed: <一句话结果>
Delivery: <完整 Delivery Folder 路径>
Validation: <PASS / FAIL / PARTIAL + 极简说明>
Blocker: <如无则省略>
Next: <如确有必要，一句话>
```

不得在最终回复中再次完整复制 Delivery 中已经存在的大段内容。

Delivery Folder 路径应放在最终回复最显眼的位置，便于用户直接打开、压缩或转交其他 AI。

---

## 13. AI 之间的转交

当一个 AI 的成果需要交给另一个 AI 时，优先转交 Delivery Folder，而不是复制整个 Chat 历史。

接收方应优先从：

```text
DELIVERY.md
```

开始读取，再根据任务需要选择性读取其他文件。

不要要求接收方默认加载 Delivery 中全部文件。

---

## 14. 长期信息与 Chat 分离

如果某项信息未来仍会反复使用，应写入项目文件，而不是仅留在当前 Chat。

典型内容包括：

- 项目目标；
- 固定约束；
- 架构决定；
- 当前状态；
- Decision Log；
- 已知问题；
- 构建方式；
- 环境约束；
- 项目级工作规则。

历史 Chat 可以作为证据和讨论记录，但不应成为项目日常运行的主要事实来源。

---

## 15. 多 Agent 写入安全

复杂项目中，同一时刻原则上只允许一个 AI / Agent 对同一正式项目资产拥有主写权限。

其他 AI 可以进行：

- Review；
- Audit；
- Read-only analysis；
- Candidate generation；
- isolated copy work。

避免多个 Agent 同时无协调地修改同一正式文件。

---

## 16. 默认行为

除非用户明确要求不同做法：

- Chat 保持轻量；
- 已进文件的内容不在 Chat 中重复；
- 长内容优先写文件；
- 一次只执行一个明确任务；
- 不擅自扩展 Scope；
- 不直播普通执行过程；
- 不确定的项目事实不猜测；
- 完成任务后进行实际验证；
- 每个正式任务建立独立 Delivery Folder；
- Delivery 以时间和任务内容命名；
- 本轮需要查看、保存、审计或转交的文件集中到 Delivery；
- 用户不需要在项目目录中四处寻找本轮成果；
- Delivery 复杂度与任务复杂度匹配；
- Delivery 不替代正式工程；
- 最终 Chat 回复只给结果、Delivery 路径、验证状态和必要下一步。

