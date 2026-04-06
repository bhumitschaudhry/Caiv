# get-caiv

A mode toggle that strips Claude's responses down to bare-minimum, token-efficient caveman speech. Pure signal, no fluff.

## Installation

Install CAIV to your favorite AI coding tools:

```bash
npx get-caiv
```

This will open a beautiful TUI to select which tools you want to install CAIV to.

### Supported Tools:
- **Pi**
- **Claude Code**
- **Cursor**
- **Windsurf**
- **Opencode**
- **Codex**
- **Gemini CLI**
- **Antigravity**

## Usage

Once installed, use the following commands in your tool's chat:

- `/caiv activate`: Turns on caveman mode.
- `/caiv deactivate`: Returns to normal behavior.

## How it works

When active, Claude follows these rules:
- **Drops** articles (a, an, the), filler, transition phrases, and hedging.
- **Keeps** technical terms, code blocks, and factual content.
- **Style**: Brutal brevity. One idea per sentence. Active verbs.

## Examples

**Normal:**
> "Great question! To set up a React project, you'll first want to make sure you have Node.js installed. Then you can run `npx create-react-app my-app` to scaffold the project."

**Caveman:**
> "need Node first. then run:
> ```
> npx create-react-app my-app
> ```
> done."

---
