---
name: executing-plans
description: Use when a written implementation plan would help guide execution across several tasks
---

# Executing Plans

## Overview

Read the plan critically, carry out the requested work, and report the result with appropriate evidence. This is an optional recipe: it does not require announcements, task files, worktrees, subagents, commits, or a finishing ceremony.

## Review the Plan

- Read the plan and relevant requirements before relying on its steps.
- Check dependencies, conflicting instructions, and assumptions that affect correctness or scope.
- Use the current workspace unless isolation is requested or clearly useful. The optional superpowers:using-git-worktrees guide describes that choice.
- Resolve ordinary implementation details from repository context. Ask a focused question only when a material ambiguity cannot be resolved safely.
- Track progress in the existing task mechanism or a brief note if the plan is long enough to need it; do not create tracking files for their own sake.

## Execute Tasks

1. Work in dependency order, using the plan as guidance rather than following stale steps blindly.
2. Reuse repository conventions and keep changes within the requested scope.
3. Choose checks that exercise the affected behavior. Follow explicit verification requirements; report checks that could not be run.
4. Record significant deviations and why they were necessary.

Direct execution is fine even when subagents are available. For genuinely independent, substantial tasks, optional superpowers:subagent-driven-development or superpowers:dispatching-parallel-agents can help; neither is a prerequisite.

## Handle Blockers

Investigate missing dependencies, failing checks, and unexpected behavior before guessing. Continue independent reachable work when a blocker affects only one part. Ask for missing information when it cannot be obtained from the tools or context, and explain what is blocked and what you tried.

Revisit the plan when requirements change or new evidence invalidates the approach. Preserve security and correctness requirements rather than treating the plan as permission to bypass them.

## Finish

Summarize the actual changes, relevant verification, and remaining gaps. Do not automatically commit, push, create a PR, or merge. If integration is requested, follow that request; superpowers:finishing-a-development-branch is an optional reference, not a mandatory next step.
