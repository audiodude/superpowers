# Codex Tool Reference

Optional reference for actions you choose to take. Subagents, worktrees, task tracking, and branch publication are not prerequisites. The active tool catalog and governing instructions take precedence over these version-specific examples.

## Subagent dispatch requires multi-agent support

If you want multi-agent support and your Codex version uses this setting, add to your config (`~/.codex/config.toml`):

```toml
[features]
multi_agent = true
```

This enables the multi-agent tools that skills like
`dispatching-parallel-agents` and `subagent-driven-development` use.
Which tools you get depends on the multi-agent version your model
preset selects (current presets run V2; older ones run V1). Trust your
actual tool list over any table — including this one — when they
disagree.

- **Spawning:** give children a clean context with
  `spawn_agent {fork_turns: "none"}`; the default `"all"` copies your
  entire transcript into the child. On Codex 0.145+, role files under
  `~/.codex/agents/` attach to isolated forks via `agent_type`.
  Full-history forks accept `model` and `reasoning_effort` overrides
  (only `agent_type` is refused there) — isolated forks are the SDD
  default for context hygiene, not because overrides require them.
- **Fix rounds:** resume the implementer with `followup_task` — it
  delivers your message, triggers a turn, and transparently reloads a
  child the harness evicted. Never dispatch a fresh implementer on the
  theory that a spawned agent cannot be messaged again; on V2 it
  always can.
- **Lifecycle:** V2 has no `close_agent`. Finished children are
  evicted automatically when slots are needed; leaving them unclosed
  costs nothing. Only V1 sessions have `close_agent` — there, close
  reviewers when their review returns, and close each implementer
  after its task's review passes.
- **Model names:** never copy a model name from a skill, table, or old
  session into `spawn_agent` without checking it against your current
  spawn allowlist — V2 accepts only V2-capable presets and hard-errors
  on the rest.

## Waiting on children

`wait_agent` is an event subscription, not a poll: a long wait wakes
the moment a child produces mailbox activity, with the same latency as
a short one. Short-timeout polling buys nothing and costs a tool call —
and a context rebill — per poll. In measured sessions, roughly
two-thirds of all wait calls were short polls that timed out.

- While you still have local work, do not wait at all. A completed
  child's final answer is pushed into your mailbox and arrives with
  your next turn.
- When genuinely idle with children outstanding, use `wait_agent` with a
  timeout supported by your tool schema. Prefer event-driven waits over
  repeated short polls. Reconcile missing results when needed; routine
  status announcements and roster checks are not required.
- Completion mail cannot wake an idle controller (it is delivered
  without triggering a turn); covering that idle window is
  `wait_agent`'s only job. A stretch that times out with no activity
  is your cue to reconcile, not to shorten the next stretch.

## Model routing on spawns

When choosing model routing for a spawn, inspect the current allowlist
and tool schema. Setting `model` alone can reset the child's reasoning
effort to that model's default rather than inheriting yours; set both
when you need deliberate routing.

If you want a machine-level default and your version supports these
keys, the following `~/.codex/config.toml` settings are an option, not
a prerequisite for delegation:

```toml
[agents]
default_subagent_model = "<a mid-tier model from your spawn allowlist>"
default_subagent_reasoning_effort = "medium"
```

## Environment Detection

When worktree or branch operations are needed, read-only git commands can identify the environment:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

- `GIT_DIR != GIT_COMMON` → already in a linked worktree (skip creation)
- `BRANCH` empty → detached HEAD (branch or publication support depends on the sandbox)

`using-git-worktrees` and `finishing-a-development-branch` offer optional guidance for these operations.

## Codex App Finishing

When the sandbox blocks branch or push operations, report the limitation
and leave the work intact. If integration is requested, the App's native
controls may offer:

- **"Create branch"** — names the branch, then commit/push/PR via App UI
- **"Hand off to local"** — transfers work to the user's local checkout

Verification may still be possible in the sandbox. Stage, commit, push,
or publish only when authorized; never commit all work automatically.
Suggested branch names, commit messages, or PR descriptions can be
provided when useful.
