# Porting Advisory Superpowers to a New Harness

This personal fork, [audiodude/superpowers](https://github.com/audiodude/superpowers), provides optional development references. A port makes skills discoverable and loadable on demand. It does not inject a bootstrap, rewrite conversation messages, or require a workflow at session start.

Skills may be used when explicitly requested or clearly useful. Ordinary questions and simple edits can proceed directly. The entry guide, `using-superpowers`, is an optional reference, not a prerequisite. System and developer instructions, user intent, and the harness's permission model remain authoritative.

## Understand the host

Read the harness's current extension and skill documentation and a working plugin before choosing an adapter. Confirm the actual installed behavior: forks of another harness do not necessarily support the same manifest fields or discovery conventions.

Determine:

- How the installer locates and retains `skills/*/SKILL.md` and supporting files.
- How the user lists or explicitly invokes skills.
- Whether the model has a native skill tool or loads a selected `SKILL.md` with its file-read tool.
- Which file, shell, question, task-tracking, and subagent tools are actually available.
- Whether plugin configuration is merged with existing user settings.
- Whether the host automatically loads context files or hook directories by convention.

Use native installation and discovery mechanisms where possible. An optional, documented skills-directory link is also useful when the harness supports it. Preserve existing personal skills and config; do not overwrite global instruction files or relax trust and permission settings.

## Choose the smallest discovery adapter

| Host mechanism | Reference | What to preserve |
|---|---|---|
| Native plugin skills directory | `.claude-plugin/`, `.cursor-plugin/`, `.codex-plugin/`, `.devin-plugin/` | Discover the shared `skills/` tree without session hooks |
| Extension-bundled skills | `gemini-extension.json` | Native skill discovery; no bundled always-loaded context file |
| Manifest skill path | `.kimi-plugin/plugin.json` | `skills` path and optional tool mapping; no `sessionStart` |
| OpenCode plugin API | `.opencode/plugins/superpowers.js` | Idempotently append the skills path, preserving user configuration |
| Pi package and discovery API | `package.json`, `.pi/extensions/superpowers.ts` | Native skills metadata and `resources_discover`; no context or lifecycle injection |
| Hermes plugin API | `.hermes-plugin/__init__.py` | Register skill files as `pathlib.Path` values; support clone and flattened layouts |

Some harnesses reuse an existing plugin manifest and need only installation documentation. Avoid adding an adapter that does nothing. Keep integration code dependency-free when the host already supplies everything needed.

Native discovery may advertise names and descriptions in the host's skill index. That is different from automatically loading a skill's full instructions. Do not use descriptions, hooks, context files, or generated indexes to demand that the entry guide be read before every response.

## Tool mapping

Keep shared skill bodies portable. Put harness-specific action mappings in `skills/using-superpowers/references/<harness>-tools.md` and link them as optional references where useful. Confirm tool names against the live harness or official API; do not invent calls from another platform.

Cover the relevant operations: load a skill; read, write, edit, and search files; run shell commands; fetch or search the web; ask a structured question; and, when available and chosen, track tasks or dispatch subagents. If no native skill tool exists, reading the selected `SKILL.md` is appropriate. If a subagent or task tool is absent, work inline rather than inventing a substitute or requiring a plan file.

## Installation and packaging

Document commands pointing to `audiodude/superpowers`, not the upstream marketplace or an upstream release tag. Tags inherited from upstream can still contain the always-on behavior; pin an advisory-fork commit when reproducibility matters.

Keep skill names and paths stable. Ensure supporting scripts, templates, and references survive installation. A successful installer exit is not proof that the skills were retained: inspect the installed tree and exercise discovery. For a new versioned manifest, register its version field in `.version-bump.json`. Keep unrelated harness adapters out of specialized distribution archives.

On Windows, verify paths with spaces and the host's real install behavior. This fork has no session-start shell wrapper. Shell-based skill utilities may still require Bash; document that requirement for the utility rather than adding a startup dependency.

When migrating an existing installation, remove the previous plugin registration through the host's manager and install the fork. Check for older independently installed bootstrap extensions or personal instruction snippets. Remove only identified Superpowers bootstrap entries; preserve unrelated configuration. Start a fresh session so previously injected conversation content does not affect the check.

## Verify the user-visible behavior

Use a scratch project and a local installation of the changed adapter. Do not mistake published upstream behavior for the local fork. Clear legitimate onboarding and permission prompts normally; do not disable security checks for convenience.

1. List available skills and explicitly load a substantive skill, such as `systematic-debugging`. Confirm its full content and supporting references can be read.
2. Start a fresh session and ask a plain factual question. Confirm there is no injected entry guide, forced announcement, approval, planning, worktree creation, or delegation.
3. Explicitly request a skill for a suitable task and confirm it is available. Its advice should help perform the task without mandatory cross-skill chaining.
4. Restart or compact a session and confirm no bootstrap is inserted.
5. Exercise update and removal through the host's normal package mechanism; personal skills and unrelated configuration should remain intact.

Use a noninteractive command if the harness supports one, otherwise drive its actual TUI and retain the transcript. Record which model and host version were exercised and distinguish a real session from a mocked API check.

Keep automated tests for meaningful adapter contracts: discovery without duplication, preservation of user settings, correct installed paths, missing-install errors, and absence of message mutation. Avoid assertions that pin skill wording or demand automatic workflow invocation. Useful starting points are `tests/opencode/test-plugin-loading.sh`, `tests/pi/test-pi-extension.mjs`, and `tests/hermes/test_plugin.py`.

Report any unavailable runtime verification explicitly. A passing manifest parser proves the manifest parses, not that the target harness has loaded the skills.
