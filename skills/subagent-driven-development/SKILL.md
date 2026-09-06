---
name: subagent-driven-development
description: Use when delegating substantial, well-scoped implementation tasks would help execute work in the current session
---

# Subagent-Driven Development

## Overview

Subagents can isolate context and provide independent implementation or review. They are an option, not the default consequence of having a plan or available tools. Work directly when that is simpler, particularly for questions, small changes, or tightly coupled tasks.

This guide does not require another skill, announcements, plan files, worktrees, ledgers, review rounds, or commits. Choose only the parts that help the task. Follow the actual request and applicable system, developer, and repository instructions; a plan or skill does not override them.

## Choose Useful Boundaries

Before dispatching, understand the work well enough to assign:

- A concrete goal and observable acceptance criteria
- Exact ownership of files, symbols, or independent subsystems
- Dependencies and shared interfaces
- Relevant project constraints and decisions
- A verification scope and reporting contract

Batch tiny same-shape edits instead of allocating an agent to each one. Independent substantial slices can run concurrently. Serialize shared mutation boundaries, or use isolated workspaces when appropriate. If the harness has no delegation capability, execute locally rather than inventing tools or blocking the task.

## Setup and Recovery

Read the relevant requirements and, if one exists, the plan. Check material conflicts and dependencies before relying on its steps. Resolve ordinary implementation details from context; ask only when a material ambiguity cannot be resolved safely. A formal preflight table or approval checkpoint is optional.

Use the current workspace unless isolation is requested or materially helpful. Optional reference: superpowers:using-git-worktrees.

For long-running work, a small ledger helps avoid repeating completed tasks after context loss. Record task identity, actual state, decisions, file or commit references, verification, and unresolved concerns. Reconcile a resumed ledger with the real artifacts rather than trusting a completion marker blindly.

### Optional artifact helpers

These existing scripts support a plan-file workflow; none is required:

- `scripts/sdd-workspace PLAN_FILE` creates or locates a git-ignored artifact directory at `.superpowers/sdd/<plan-basename>/`.
- `scripts/task-brief PLAN_FILE N` extracts one numbered task to `task-N-brief.md` (or an explicit output path); supply shared constraints separately. Re-running it overwrites that task's brief.
- `scripts/review-package PLAN_FILE BASE HEAD` writes the commit list, stat, and contextual diff for that committed range.

Use distinct plan basenames or separate artifact locations for different plans; check identity before reusing a ledger. Do not read, overwrite, or delete another task's artifacts. The review-package helper covers commits only: uncommitted changes and new files need an explicit working-tree review scope instead. Do not create commits solely to use a helper.

## Model Selection

Where the harness permits model selection, choose capability according to the task's judgment needs, not just token price:

- Mechanical, fully specified edits can fit a fast model.
- Multi-file integration and debugging usually need stronger reasoning.
- Subtle concurrency, security, or architectural review may warrant the most capable available model.

The default model is fine when suitable. If a worker gets stuck, improve the context, reduce the scope, use a different model, or take over locally rather than repeating the same unsuccessful dispatch.

## Dispatch an Implementer

Optionally adapt [implementer-prompt.md](implementer-prompt.md). Supply the task inline or as a brief, not an unnecessary dump of session history. Include enough surrounding context for sound decisions.

For committed work, record the actual starting revision before the task so review does not silently omit early commits by assuming `HEAD~1`. For uncommitted work, identify the owned files and starting state; preserve unrelated changes.

Agree on whether validation belongs to workers or the integration owner. Concurrent writers should not each run a full suite over one another's half-finished edits. Focused checks can be useful when isolated; a coordinator can run shared integration checks after changes land.

Specify whether commits or further delegation are authorized. Neither is implied. A worker's self-review does not automatically trigger another subagent or another skill.

## Handle Results

A useful result includes changed paths, what was implemented, actual checks and output, concerns, and any missing prerequisite. For large reports, a file plus concise summary can reduce duplicated context; small tasks can report directly.

Optional status vocabulary:

- **DONE:** Assigned deliverable is complete with the stated evidence.
- **DONE_WITH_CONCERNS:** Deliverable exists, with clearly identified limitations or concerns.
- **NEEDS_CONTEXT:** A specific unanswered question blocks progress.
- **BLOCKED:** A concrete dependency or capability prevents completion.

Do not treat a status label as proof. Inspect the deliverable and evidence before relying on it. Clarify missing context, investigate blockers, and continue independent reachable work. Do not label known missing requirements complete merely to move on.

## Review and Fixes

Review proportionately. Self-review can be enough for a small change; independent review is useful when risk or uncertainty warrants it. The task rubric separates two questions:

1. **Requirements:** Was the requested behavior implemented without omissions or unrelated extras?
2. **Quality:** Is it correct, secure, maintainable, and supported by appropriate evidence?

Optional templates: [task-reviewer-prompt.md](task-reviewer-prompt.md) and [re-review-prompt.md](re-review-prompt.md). Optional broader reference: superpowers:requesting-code-review.

Give a reviewer the complete actual diff, relevant requirements, and verification evidence. Encourage investigation of concrete cross-cutting risks such as API callers or lock ordering, without a context-wide crawl. Keep reviews read-only and avoid duplicate full-suite runs that provide no new evidence.

Evaluate findings on their merits. Correct invalid assumptions immediately; there is no minimum number of review rounds before disagreeing. Fix validated correctness and security defects before presenting affected work as ready. Either the coordinator or a worker can make the fix; verify the amended path and request re-review when it adds confidence.

Repeated unsuccessful rounds are a signal to change approach, not to dispatch indefinitely. Narrow the hypothesis, improve context, or get different expertise. A round limit does not turn an unresolved requirement or security defect into completed work. Record genuinely deferred optional improvements separately from blockers, and report outstanding risks honestly.

## Coordinate Without Ceremony

While workers run, do useful independent work. Use the harness's completion notifications instead of frequent polling. If genuinely blocked, wait using supported tools and investigate workers that fail to report. Communication should convey material progress or blockers, not scripted skill announcements.

Resolve safe local details from the task and repository. Do not use autonomy as permission for destructive operations, security-sensitive side effects, publication, or shared-branch changes beyond the user's authorization.

## Finish

Check the combined behavior and deliverable against the request. A whole-change review or broader suite may be useful for integration risks, but neither is automatically required after every task. Report what changed, what was verified, material decisions, and remaining limitations.

Keep working files, branches, and evidence unless cleanup is requested or they are known disposable artifacts created for this task. Preserve unique reports and uncommitted work; never recursively delete a workspace just because review ended.

No automatic commit, push, merge, or skill handoff follows. If integration is requested, superpowers:finishing-a-development-branch is an optional reference.
