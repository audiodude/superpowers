# Hermes Agent Tool Mapping

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). On Hermes Agent these resolve to the tools below.

Optional reference only: mappings do not require skill invocation, delegation, or task tracking. Follow the active tool catalog and governing instructions.

## Tools

| Action skills request | Hermes tool |
|---|---|
| Read a file | `read_file` |
| Create a new file | `write_file` |
| Edit a file (targeted patch) | `patch` |
| Run a shell command | `terminal` |
| Search file contents | `search_files` |
| Find files by name | `terminal` with `find` |
| Fetch a URL / read a webpage | `web_extract(urls=[...])` |
| Search the web | `web_search(query=...)` |
| Dispatch a subagent | `delegate_task(goal=..., context=..., toolsets=[...], role="leaf")` |
| Task tracking | `todo` tool |
| Invoke a skill | `skill_view("skill-name")` |

## Instructions file

When a skill mentions "your instructions file," on Hermes Agent this is **`AGENTS.md`** in the project directory, or **`SOUL.md`** globally at `~/.hermes/SOUL.md`.

## Invoking a skill

Hermes Agent has a `skills` toolset with `skill_view` and `skills_list` tools.
To consult a requested or useful Superpowers skill, choose the relevant name, for example:

```text
skill_view("brainstorming")
```

If `skill_view` cannot find a superpowers skill (it may not appear in the catalog
until the plugin fully registers it), fall back to reading the SKILL.md directly:

```
read_file(path="~/.hermes/plugins/superpowers/skills/<skill-name>/SKILL.md")
```

This fallback is the same mechanism used by other harnesses without native skill loading.

## Subagent dispatch

If delegation would help, `delegate_task` can spawn isolated subagents:

```
delegate_task(goal="...", context="...", toolsets=[...], role="leaf")
```

If `delegate_task` is unavailable, do the work inline rather than inventing tool calls.

## Task tracking

If tracking would help, use `todo` within a session or `hermes kanban` for a shared task board when available. An existing outline may be enough. Older `TodoWrite` references describe this optional task-tracking action.
