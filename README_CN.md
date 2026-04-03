[English Documentation](./README.md)

# Claude Code v2.1.88 — 架构深度解析

> 通过 Source Map 逆向工程，对 Claude Code 进行源码级架构文档化。

## 📖 概述

这是一个全面的、**源码级**架构文档站点，针对 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) v2.1.88 — Anthropic 的终端 AI 编码智能体。

通过提取和分析 60MB 的 `cli.js.map` Source Map 文件，我们恢复了 **1,884 个 TypeScript 源文件**，并对 **19 个子系统**进行了详尽的架构分析，涵盖从启动初始化链到查询循环（Query Loop）、从工具安全沙箱到多智能体协调的方方面面。

## 🌐 在线演示

**GitHub Pages**: [https://zhangliufeng20.github.io/claude-code-architecture/](https://zhangliufeng20.github.io/claude-code-architecture/)

## 📊 文档统计

| 指标 | 数值 |
|------|------|
| 文档页面数 | 19 + 1（首页） |
| 架构覆盖率 | 100% 深度分析 |
| H4 级细节节点 | 134 |
| 源码级表格 | 151 |
| Mermaid 流程图 | 34 |
| 总文档量 | ~900KB |

## 🔬 关键架构洞察

### Query Loop — 6 层上下文压缩

核心智能体循环采用渐进式压缩管线：
`工具结果预算 → 截断 → 微压缩 → 上下文折叠 → 自动压缩 → 响应式压缩`

### StreamingToolExecutor — 并行工具执行

工具在 **API 流式传输期间并行执行**，而非等待响应完成后再执行。回退时，孤儿结果通过 `discard()` 丢弃。

### `feature()` 宏 — 死代码消除

Bun 的编译时宏支持基于特性标志的 DCE（死代码消除）。在外部构建中，`feature()` 返回 `false` 的分支会被**完全从打包产物中移除**。

### Bridge — 3 层重连策略

CLI ↔ claude.ai 的实时通信使用：
1. **原地重连**（相同环境，URL 保持不变）
2. **全新会话回退**（归档旧会话，创建新会话）
3. **放弃重连**（3 次环境重建后）

### 插件安全 — 4 层名称保护

- 官方市场名称白名单
- 伪装模式正则检测
- 非 ASCII / 西里尔文同形异义字符拦截
- 来源组织验证（必须来自 `anthropics/` GitHub 组织）

### 只读命令验证 — 失败即关闭安全策略

Shell 命令基于**白名单**进行验证，使用标志类型解析和位置参数拦截。未知命令**默认拒绝**。

## 📑 文档结构

```
├── index.html           # 首页 — 项目概览与架构分层
├── core-engine.html     # 核心引擎 — 启动 / 查询循环 / QueryEngine
├── subsystems.html      # 子系统 — 命令 / 权限 / 状态 / API
├── advanced.html        # 高级特性 — 多智能体 / MCP / 后台任务
├── context.html         # 上下文管理 — 6 层记忆 / Grep vs RAG
├── ui-components.html   # UI 渲染 — React Compiler / 消息管线
├── hooks-system.html    # React Hooks — 输入管线 / 虚拟滚动 / 语音
├── ink-engine.html      # Ink 渲染引擎 — 自定义 DOM / 屏幕缓冲区
├── tools-deep.html      # 工具系统 — BashTool / 38 工具全景 / 权限
├── services-deep.html   # 核心服务 — API 通信 / 重试 / MCP 客户端
├── plugins-deep.html    # 插件系统 — 6 种安装源 / Schema 安全
├── bridge.html          # Bridge 通信 — REPL Bridge / 3 层重连
├── entrypoints.html     # 入口点 — CLI 快速路径 / MCP Server / Agent SDK
├── agent-coord.html     # 智能体协调 — 生命周期 / 多智能体模式
├── config-cmd.html      # 常量与命令 — 86+ 斜杠命令
├── analytics-ff.html    # 分析与特性标志 — GrowthBook / 1P 事件
├── model-shell.html     # 模型与 Shell — 模型选择 / 安全验证
├── cli-transport.html   # CLI 与传输层
├── types-tasks.html     # 类型系统与任务迁移
├── utils-infra.html     # 基础设施 — 会话持久化 / Hook 引擎
├── css/                 # 样式表
└── js/                  # 脚本
```

## 🛠 技术栈

- **纯静态 HTML** — 无框架依赖，零构建步骤
- **Mermaid** — 架构流程图
- **Prism.js** — 语法高亮
- **Google Fonts** — Inter + JetBrains Mono
- **暗色主题** — 毛玻璃设计 + 紫色主题色

## 🚀 本地运行

```bash
# 直接用浏览器打开
open index.html

# 或使用任意 HTTP 服务器
npx serve .
python3 -m http.server 8080
```

## ⚠️ 免责声明

本文档仅用于**教育与架构研究目的**。所有分析均基于公开可用的 npm 包及其 Source Map 文件。Claude Code 是 Anthropic 的产品，所有相关商标和版权归 Anthropic 所有。

## 📄 许可证

MIT
