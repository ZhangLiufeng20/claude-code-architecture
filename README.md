[中文文档](./README_CN.md)

# Claude Code v2.1.88 — Architecture Deep Dive

> Source-level architectural documentation of Claude Code, reverse-engineered from its Source Map.

## 📖 Overview

This is a comprehensive, **source-level** architecture documentation site for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) v2.1.88 — Anthropic's terminal-based AI coding agent.

By extracting and analyzing the 60MB `cli.js.map` source map, we recovered **1,884 TypeScript source files** and performed an exhaustive architectural analysis across **19 subsystems**, covering everything from the startup initialization chain to the Query Loop, from tool security sandboxing to multi-agent coordination.

## 🌐 Live Demo

**GitHub Pages**: [https://zhangliufeng20.github.io/claude-code-architecture/](https://zhangliufeng20.github.io/claude-code-architecture/)

## 📊 Documentation Stats

| Metric | Value |
|--------|-------|
| Documentation Pages | 19 + 1 (homepage) |
| Architecture Coverage | 100% Deep |
| H4-level Detail Nodes | 134 |
| Source-level Tables | 151 |
| Mermaid Diagrams | 34 |
| Total Documentation | ~900KB |

## 🔬 Key Architectural Insights

### Query Loop — 6-Layer Context Compaction
The core agentic loop employs a progressive compaction pipeline:
`Tool Result Budget → Snip → Micro → Context Collapse → Auto → Reactive`

### StreamingToolExecutor — Parallel Tool Execution
Tools execute **in parallel during API streaming**, not after response completion. On fallback, orphaned results are discarded via `discard()`.

### `feature()` Macro — Dead Code Elimination
Bun's compile-time macro enables feature-flag-driven DCE. In external builds, branches where `feature()` returns `false` are **completely eliminated** from the bundle.

### Bridge — 3-Layer Reconnection Strategy
The CLI ↔ claude.ai real-time communication uses:
1. **In-place reconnect** (same environment, URL preserved)
2. **Fresh session fallback** (archive old, create new)
3. **Give up** (after 3 environment recreations)

### Plugin Security — 4-Layer Name Protection
- Allowlist of official marketplace names
- Spoofing pattern regex detection
- Non-ASCII / Cyrillic homoglyph blocking
- Source organization verification (must come from `anthropics/` GitHub org)

### Read-Only Command Validation — Fail-Closed Security
Shell commands are validated against a **whitelist** with flag-type parsing and positional argument blocking. Unknown commands are **denied by default**.

## 📑 Documentation Structure

```
├── index.html           # Homepage — Project overview & architecture layers
├── core-engine.html     # Core Engine — Startup / Query Loop / QueryEngine
├── subsystems.html      # Subsystems — Commands / Permissions / State / API
├── advanced.html        # Advanced — Multi-Agent / MCP / Background Tasks
├── context.html         # Context Management — 6-layer memory / Grep vs RAG
├── ui-components.html   # UI Rendering — React Compiler / Message pipeline
├── hooks-system.html    # React Hooks — Input pipeline / Virtual scroll / Voice
├── ink-engine.html      # Ink Render Engine — Custom DOM / Screen buffer
├── tools-deep.html      # Tool System — BashTool / 38 tools panorama / Permissions
├── services-deep.html   # Core Services — API communication / Retry / MCP client
├── plugins-deep.html    # Plugin System — 6 install sources / Schema security
├── bridge.html          # Bridge Communication — REPL Bridge / 3-layer reconnect
├── entrypoints.html     # Entry Points — CLI Fast-Path / MCP Server / Agent SDK
├── agent-coord.html     # Agent Coordination — Lifecycle / Multi-agent modes
├── config-cmd.html      # Constants & Commands — 86+ slash commands
├── analytics-ff.html    # Analytics & Feature Flags — GrowthBook / 1P events
├── model-shell.html     # Model & Shell — Model selection / Security validation
├── cli-transport.html   # CLI & Transport Layer
├── types-tasks.html     # Type System & Task Migration
├── utils-infra.html     # Infrastructure — Session persistence / Hook engine
├── css/                 # Stylesheets
└── js/                  # Scripts
```

## 🛠 Tech Stack

- **Pure static HTML** — No framework dependencies, zero build steps
- **Mermaid** — Architecture flow diagrams
- **Prism.js** — Syntax highlighting
- **Google Fonts** — Inter + JetBrains Mono
- **Dark theme** — Glassmorphism design with purple accent

## 🚀 Run Locally

```bash
# Simply open in browser
open index.html

# Or use any HTTP server
npx serve .
python3 -m http.server 8080
```

## ⚠️ Disclaimer

This documentation is for **educational and architectural research purposes only**. All analysis is based on the publicly available npm package and its Source Map file. Claude Code is a product of Anthropic, and all related trademarks and copyrights belong to Anthropic.

## 📄 License

MIT
