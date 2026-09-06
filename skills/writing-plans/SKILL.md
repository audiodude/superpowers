---
name: writing-plans
description: Use when requested or when complex dependencies, consequential changes, or an implementation handoff would benefit from a written plan.
---

# Writing Plans

A useful implementation plan makes the goal, constraints, dependencies, and verification clear to someone who lacks the author's context. It is an optional coordination tool, not a gate before touching code. For straightforward authorized work, act directly or keep a short in-chat outline.

No announcement, prior brainstorming session, approval ritual, worktree, subagent, or other skill is required. Follow the actual task instructions and use only the level of detail that reduces uncertainty.

## Scope and Structure

Read the relevant implementation and project conventions. Identify files and responsibilities before decomposing work. Prefer existing patterns and avoid unrelated restructuring.

Group steps around observable deliverables. Fold setup, configuration, and documentation into the change that needs them. Split tasks where interfaces or independently verifiable outcomes create a meaningful boundary—not into arbitrary timed steps or mandatory reviewer gates. Parallel work is an option only where ownership and dependencies allow it.

Capture exact requirements such as version floors, platform support, and compatibility limits once, in shared constraints. For a handoff, include concrete interfaces consumed and produced by each task. Do not assume an executor will infer neighboring tasks' names or types.

## Suggested Plan Format

Adapt or omit sections that do not apply. Use the project's location convention for durable plans; otherwise `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md` is an option. A plan file, checkbox list, or commit is not required by this guide.

```markdown
# [Feature Name] Implementation Plan

**Goal:** [Observable outcome]
**Scope and non-goals:** [What is and is not included]
**Approach:** [Key decisions and reasoning]
**Source requirements:** [User request or existing spec, if any]

## Shared Constraints
[Exact compatibility, dependency, platform, and safety requirements]

## Task: [Deliverable]
**Files:** [Relevant paths and symbols; identify creates vs modifications]
**Dependencies:** [Earlier outcomes needed; independent work if relevant]
**Interfaces:** [Concrete inputs, outputs, signatures, or schemas for handoffs]
**Change:** [Actionable implementation steps and important edge cases]
**Verification:** [Command or scenario, observable expected result]

## Risks and Open Decisions
[Unresolved facts, how to obtain them, and choices needing user input]
```

Checkboxes can help track a long execution; they need not become a separate task artifact.

## Make Steps Actionable

Provide the detail a competent engineer needs without duplicating the entire future implementation. Include exact paths and important signatures. Add code examples when they clarify non-obvious behavior, not merely to fill a template.

For example, a validation change could specify:

> In `src/users.py:create_user`, reject an empty email before persistence using the existing validation error type. Preserve current handling for valid addresses. Exercise the public create-user path with an empty email and verify its error response and absence of a persisted user; also cover a valid request. Use the repository's existing user tests for the regression.

Do not disguise unknowns with "appropriate error handling" or "implement later." Resolve facts that are available in the repository; state genuinely unresolved decisions and how they affect execution. A plan can include an investigation step where implementation depends on its result, rather than inventing an API or pretending the answer is known.

## Verification and Review

Choose verification that demonstrates the changed contract. For a bug fix, a reproduction or regression test is valuable. Test-first development can clarify uncertain behavior; `superpowers:test-driven-development` is an optional reference, not a required phase for every task. UI and operational changes may need a runtime exercise in addition to automated checks.

Before handing off a substantial plan, check:
1. **Coverage:** each requested outcome has an implementation and verification path.
2. **Consistency:** names, types, and dependencies agree across tasks.
3. **Buildability:** steps have enough detail to act on; uncertainty is explicit.
4. **Scope:** no unrequested features, mandatory commits, or accidental process gates.

The [plan review template](plan-document-reviewer-prompt.md) can help with self-review or an optional independent review.

## Execution

If the user requested only a plan, deliver it without starting implementation. If implementation is already authorized, continue without asking the user to re-authorize the same work. Choose inline execution by default for tightly coupled or small work; delegation can help with genuinely independent tasks when available and appropriate.

`superpowers:executing-plans` and `superpowers:subagent-driven-development` are optional references for those execution styles. Neither is a required next step. Report actual verification results, not planned or assumed success.
