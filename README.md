# Superpowers — advisory fork

A policy-focused fork of [obra/superpowers](https://github.com/obra/superpowers), maintained at [audiodude/superpowers](https://github.com/audiodude/superpowers).

The skills are a toolbox, not a mandatory development process. Consult one when explicitly requested or clearly useful. Answer questions and perform straightforward authorized edits directly. Scale design, planning, tests, review, isolation, and delegation to the work's risk and complexity.

## What changes

- No mandatory startup bootstrap or skill check before every response.
- No blanket brainstorming or TDD requirement for every change.
- No forced chain from one skill into plans, worktrees, subagents, or branch integration.
- No deletion of working code merely because it was not written test-first.
- Practical design, debugging, TDD, review, and verification techniques remain available.
- Verification is still evidence-based: report what was exercised and what remains unverified. Advisory process does not authorize fabricated success or unsafe actions.

Skill names stay compatible with upstream. Selecting a skill selects useful guidance, not every related workflow. Host system/developer instructions and explicit user requirements still apply.

## Installation

Install this repository directly. Official Superpowers marketplace entries generally install **upstream**, not this fork. Remove or replace your existing upstream installation first to avoid duplicate skill names and stale startup hooks.

### Oh My Pi

```bash
omp plugin install https://github.com/audiodude/superpowers
```

OMP has its own built-in instruction requiring matching skills. This fork includes `.omp/advisory-superpowers.ts`, a local OMP extension that narrows that requirement for this fork's workflow skills only. Copy it into `~/.omp/agent/extensions/advisory-superpowers.ts` and start a fresh session. It preserves domain-skill requirements and unrelated safety/verification instructions. See the extension's comments for the prompt forms it recognizes; a changed OMP prompt may need an updated adapter.

### Pi

```bash
pi install git:github.com/audiodude/superpowers
```

The package exposes native skills without an automatic bootstrap extension.

### Claude Code

Register this fork's marketplace, then install its plugin:

```text
/plugin marketplace add audiodude/superpowers
/plugin install superpowers@superpowers-dev
```

Check `.claude-plugin/marketplace.json` for the marketplace name if upgrading across upstream packaging changes. Do not keep the official upstream plugin enabled alongside this one.

### Other harnesses

Use this fork URL wherever your harness accepts a repository:

```text
https://github.com/audiodude/superpowers
```

- OpenCode: [.opencode/INSTALL.md](.opencode/INSTALL.md)
- Kimi Code: [docs/README.kimi.md](docs/README.kimi.md)
- Codex and other harnesses with native skill directories: clone this repository and register or symlink its `skills/` directory using your harness's native discovery mechanism.

The platform metadata remains in the repository. This fork removes automatic workflow injection; skill discovery is retained. A host-level mandate to use skills must be changed in that host's configuration separately. Existing conversations may retain old instructions; start a new session after switching.

## Using the toolbox

Examples:

- “Use systematic-debugging to investigate this intermittent failure.”
- “Help me brainstorm the API before implementation.”
- “Use TDD for this parser change.”
- “Fix this label.” — direct edit, no workflow ceremony.

Available skills cover brainstorming, planning, plan execution, parallel agents, debugging, TDD, review, worktrees, branch integration, verification, and skill authoring. Supporting examples and scripts remain alongside the skills.

## Contributing and updating

Keep changes focused on optional process and useful engineering guidance. Provide behavioral evidence for prompt changes and relevant runtime checks for integration changes. See [CLAUDE.md](CLAUDE.md).

Review upstream changes before merging, especially skill descriptions, templates, cross-skill references, and startup adapters: those can restore mandatory behavior. Historical release notes and design documents describe upstream behavior at the time, not current fork policy.

## Attribution and license

Original Superpowers by Jesse Vincent and contributors. This fork is not an official upstream release and does not imply upstream endorsement or support. MIT; see [LICENSE](LICENSE).

## Visual companion telemetry

The inherited optional brainstorming visual companion can load a remote Prime Radiant logo with the Superpowers version. Set `SUPERPOWERS_DISABLE_TELEMETRY=1` to disable it. The upstream `DISABLE_TELEMETRY` and `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` switches are also supported.
