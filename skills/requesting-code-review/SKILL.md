---
name: requesting-code-review
description: Use when an independent review is requested or would materially improve confidence in a change
---

# Requesting Code Review

Review can catch correctness, security, and maintainability issues before they spread. Choose self-review, a human reviewer, or an available subagent according to the change's risk and the user's request.

This is an optional recipe. A simple edit need not trigger delegation, a plan, a worktree, commits, or another skill. A substantial feature, risky refactor, or difficult bug fix often benefits from independent review.

## When Review Helps

- A change crosses component or security boundaries
- A fresh perspective could resolve a specific uncertainty
- A repository requires review before merging
- The user explicitly requests review

## How to Request

**1. Identify the actual review scope:** Use a commit range if changes are committed, or a working-tree diff and new files when they are not. Do not create commits solely to fit this template.
```bash
BASE_SHA=<recorded-starting-commit>  # Use the actual scope, not an assumed HEAD~1
HEAD_SHA=$(git rev-parse HEAD)
```

**2. Provide review context:**

For a subagent or human reviewer, optionally adapt [code-reviewer.md](code-reviewer.md). A direct review can use the same rubric. Supply requirements, the actual changed files/diff, relevant constraints, and available verification evidence; no session-history dump is needed.

**Placeholders:**
- `{DESCRIPTION}` - Brief summary of what you built
- `{PLAN_OR_REQUIREMENTS}` - What it should do
- `{BASE_SHA}` - Starting commit
- `{HEAD_SHA}` - Ending commit

**3. Act on feedback:**
- Fix Critical issues immediately
- Resolve validated Important issues before presenting the affected work as ready
- Distinguish optional improvements from defects; defer Minor items explicitly when appropriate
- Push back if reviewer is wrong (with reasoning)

## Example

```
[Just completed Task 2: Add verification function]

You: Let me request code review before proceeding.

BASE_SHA=<recorded-starting-commit>
HEAD_SHA=$(git rev-parse HEAD)

[Dispatch code reviewer subagent]
  DESCRIPTION: Added verifyIndex() and repairIndex() with 4 issue types
  PLAN_OR_REQUIREMENTS: Task 2 from docs/superpowers/plans/deployment-plan.md
  BASE_SHA: a7981ec
  HEAD_SHA: 3df7661

[Subagent returns]:
  Strengths: Clean architecture, real tests
  Issues:
    Important: Missing progress indicators
    Minor: Magic number (100) for reporting interval
  Assessment: Ready to proceed

You: [Fix progress indicators]
[Continue to Task 3]
```

## Common Mistakes

- Delegating a trivial review when inspecting the change directly would suffice.
- Giving a reviewer an incomplete diff or omitting uncommitted/new files.
- Treating reviewer findings as unquestionable: check technical claims against the code and requirements.
- Ignoring validated security, data-loss, or correctness defects.
- Treating a review verdict as authorization to commit, push, or merge.

**If reviewer wrong:**
- Push back with technical reasoning
- Show code/tests that prove it works
- Request clarification

See template at: [code-reviewer.md](code-reviewer.md)
