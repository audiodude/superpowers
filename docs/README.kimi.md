# Superpowers for Kimi Code

Complete guide for using Superpowers with [Kimi Code](https://github.com/MoonshotAI/kimi-code).

## Installation

Install the advisory fork directly rather than the upstream marketplace entry:

```text
/plugins install https://github.com/audiodude/superpowers/tree/main
```

The explicit branch avoids inherited upstream releases, which retain the always-on behavior.

Kimi Code applies plugin changes to new sessions. After installing, updating, enabling, disabling, or reloading a plugin, start a fresh session with `/new`.

## How It Works

The Kimi plugin manifest lives at `.kimi-plugin/plugin.json`.

The manifest exposes the existing `skills/` directory and provides optional Kimi-specific tool mapping through `skillInstructions`. It does not load `using-superpowers` at session start.

Kimi Code reads Superpowers skills from this repository. There are no copied skills, symlinks, hooks, or extra runtime dependencies. Use skills when explicitly requested or clearly useful; questions and simple edits can be handled directly.

## Tool Mapping

Skills describe actions instead of hard-coding one runtime's tool names. On Kimi Code these resolve to:

- "Ask the user" / "ask clarifying questions" -> `AskUserQuestion`
- "Create a todo" / "mark complete in todo list" -> `TodoList`
- "Dispatch a subagent" -> `Agent`
- "Invoke a skill" -> Kimi Code's native `Skill` tool
- "Read a file" / "write a file" / "edit a file" -> `Read`, `Write`, `Edit`
- "Run a shell command" -> `Bash`
- "Search file contents" -> `Grep`
- "Find files by path or pattern" -> `Glob`
- "Fetch a URL" -> `FetchURL`
- "Search the web" -> `WebSearch`

## Updating

Use Kimi Code's plugin manager:

```text
/plugins
```

Select Superpowers and update it from there. Start a fresh session with `/new` after updating.

## Troubleshooting

### Plugin not loading

1. Run `/plugins info superpowers` and check diagnostics.
2. Make sure the plugin is enabled.
3. Start a fresh session with `/new` after install or update.

### Direct GitHub install used an old release

Kimi Code can select an inherited upstream release for a bare repository URL. Install the advisory branch explicitly:

```text
/plugins install https://github.com/audiodude/superpowers/tree/main
```

### Skills not found

1. Confirm `/plugins info superpowers` shows the advisory fork enabled.
2. Start a fresh session with `/new`, especially after replacing an upstream installation.
3. Ask Kimi to load `systematic-debugging` with its native `Skill` tool. Automatic brainstorming before every code change is not an acceptance requirement.
