# Claude Code v2.1.88 架构深度解析

> 基于 Source Map 逆向还原的 Claude Code 全栈架构文档 — 源码级技术手册

## 📖 简介

这是一套对 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) v2.1.88 进行 **Source Map 逆向还原 + 源码级架构分析** 的技术文档站。

通过解析 60MB 的 `cli.js.map` 源映射文件，我们还原了 1,884 个 TypeScript 源文件，并对 **19 个架构域** 进行了 H4 级深度分析，覆盖了从启动初始化到 Query Loop、从工具安全沙箱到多 Agent 协调的完整技术栈。

## 🌐 在线预览

**GitHub Pages**: 部署后可通过 `https://<username>.github.io/<repo>/` 访问

## 📊 文档概览

| 指标 | 数值 |
|------|------|
| 文档页面 | 19 + 1 (首页) |
| 架构域覆盖 | 100% Deep |
| H4 细节节点 | 134 |
| 源码级表格 | 151 |
| Mermaid 流程图 | 34 |
| 总文档量 | ~900KB |

## 📑 文档结构

```
├── index.html           # 首页 — 项目概览 + 架构分层
├── core-engine.html     # 核心引擎 — 启动/Query Loop/QueryEngine
├── subsystems.html      # 子系统 — 命令/权限/状态/API
├── advanced.html        # 高级特性 — 多Agent/MCP/后台任务
├── context.html         # 上下文管理 — 6层记忆/Grep vs RAG
├── ui-components.html   # UI 渲染 — React Compiler/消息管线
├── hooks-system.html    # React Hooks — 输入管线/虚拟滚动/语音
├── ink-engine.html      # Ink 渲染引擎 — 自定义DOM/屏幕缓冲区
├── tools-deep.html      # 工具系统 — BashTool/38工具全景/权限引擎
├── services-deep.html   # 核心服务层 — API通信/重试/MCP客户端
├── plugins-deep.html    # 插件系统 — 6种安装源/Schema安全
├── bridge.html          # Bridge 通信 — REPL Bridge/3层重连
├── entrypoints.html     # 入口引导 — CLI Fast-Path/MCP Server
├── agent-coord.html     # Agent 协调 — 生命周期/多智能体模式
├── config-cmd.html      # 常量与命令 — 86+斜杠命令
├── analytics-ff.html    # 分析与特性开关 — GrowthBook/1P事件
├── model-shell.html     # 模型与 Shell — 模型选择/安全验证
├── cli-transport.html   # CLI 与传输层
├── types-tasks.html     # 类型系统与任务迁移
├── utils-infra.html     # 基础设施 — 会话持久化/Hook引擎
├── css/                 # 样式文件
└── js/                  # 脚本文件
```

## 🔬 核心技术洞察

- **Query Loop 6 层压缩策略**: Tool Result Budget → Snip → Micro → Context Collapse → Auto → Reactive
- **StreamingToolExecutor**: 工具在 API streaming 过程中并行执行
- **feature() 死码消除**: Bun 编译时宏，外部构建中 `feature()` 返回 false 的分支被完全删除
- **Bridge 3 层重连**: 原地重连 → 新会话 → 放弃，BoundedUUIDSet 环形缓冲去重
- **插件 4 层名称安全**: 白名单 → 仿冒正则 → 同形文字检测 → 来源组织验证
- **readOnlyCommandValidation**: Fail-Closed 安全原则 — 只读白名单 + 标志类型解析

## 🛠 技术栈

- **纯静态 HTML** — 无框架依赖，零构建步骤
- **Mermaid** — 架构流程图
- **Prism.js** — 代码高亮
- **Google Fonts** — Inter + JetBrains Mono

## 🚀 本地运行

```bash
# 直接用浏览器打开
open index.html

# 或用任意 HTTP 服务器
npx serve .
python3 -m http.server 8080
```

## 📜 免责声明

本文档仅用于技术学习和架构研究目的。所有分析基于公开可获取的 npm 包 Source Map 文件。Claude Code 是 Anthropic 的产品，相关商标和版权归 Anthropic 所有。

## 📄 License

MIT
