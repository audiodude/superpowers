# Advisory Superpowers — contributor guidance

This fork treats skills as optional references. Preserve useful techniques while keeping selection, chaining, and process proportional to the task. Upstream historical design documents describe the original mandatory methodology, not this fork's policy.

## Changes

- Read the affected skill or adapter before editing; reuse its useful examples and supported APIs.
- Scope descriptions to situations where the guidance helps. Keep routine questions and straightforward authorized edits direct.
- Make related skills suggestions, not mandatory dependencies. Plans, worktrees, subagents, TDD, and extra approval rounds are choices unless the user or host requires them.
- Keep safety boundaries, root-cause reasoning, and evidence-based verification. Report untested behavior honestly.
- Retain names and paths where practical to keep existing explicit invocations working.

## Verification

Exercise the changed behavior. For skill changes, compare responses to representative prompts: a direct question, a small authorized edit, an explicitly requested workflow, and a completion claim without evidence. Report observed limitations rather than claiming universal compliance from a few samples.

For adapters, verify native skills remain discoverable and no automatic bootstrap is injected. Check affected runtime paths, not just source wording. Instructions from the host remain authoritative; a skill cannot override them.

## Contributions and upstream updates

Target this fork's `main` branch. Explain the problem, changed behavior, and verification in the PR. Keep unrelated changes separate. The upstream project has a different philosophy; do not submit this fork's policy cutover upstream as an unsolicited synchronization PR.

Review upstream changes before merging. Pay particular attention to descriptions, cross-skill references, generated plan templates, and session-start adapters that could restore mandatory behavior. Preserve upstream attribution and licensing.
