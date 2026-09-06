# Implementer Subagent Prompt Template

Optional template for chosen delegation. Adapt the fields to the actual task and harness; a task brief, report file, specific model, and commit are not prerequisites.

```text
Subagent (appropriate available role):
  description: "Implement [task name]"
  model: [optional capability choice]
  prompt: |
    You are implementing [task name].

    ## Requirements

    [Task text or reachable brief path, with observable acceptance criteria]

    ## Context and Ownership

    [Where this fits; relevant interfaces, dependencies, and project conventions]
    [Owned files/symbols and boundaries shared with other workers]
    Work from: [directory]

    ## Coordination

    [Who owns shared validation and integration]
    [Whether commits or further delegation are authorized; default neither]
    [Any relevant concurrent edits to avoid]

    ## Your Job

    1. Understand the requirements and relevant existing code.
    2. Implement the requested behavior without unrelated changes.
    3. Verify proportionately using the scope below.
    4. Self-review for completeness, correctness, safety, and maintainability.
    5. Report the actual result and remaining limitations.

    Work directly within this assignment; do not automatically load other
    skills, create worktrees or plans, delegate again, or commit. TDD is an
    option when requested or useful, not a requirement for all changes.
    Keep useful existing code even if it was not written test-first.

    Resolve routine details from repository context. If a material ambiguity
    remains, ask a focused question and continue independent reachable work.
    Do not guess through destructive or security-sensitive actions.

    ## Verification Scope

    [Focused tests, smoke scenario, inspection, or checks owned by coordinator]

    Run the agreed checks, not a full suite after every edit. Do not run shared
    validation while concurrent writers are still changing its inputs unless
    the coordinator has arranged isolation. Report checks not run and why;
    never manufacture success output or suppress failures.

    If using TDD, observe the test failing for the intended reason, implement
    the behavior, then observe it passing. Other verification methods are
    valid; describe what was actually done.

    ## Self-Review

    - Does the implementation satisfy the requested behavior and boundaries?
    - Are meaningful edge cases and errors handled?
    - Does it preserve security and existing user work?
    - Are names and interfaces clear, using existing patterns where possible?
    - Does verification exercise real behavior rather than echo mocks?
    - Are unrelated changes or unnecessary abstractions avoided?

    Fix issues found within scope. For a blocker, report the exact missing
    prerequisite, what you tried, and which work remains reachable. Do not
    claim completion for a partial implementation.

    ## If Review Findings Arrive

    Evaluate them against requirements and code. Fix valid findings or explain
    disagreement with evidence. Recheck the amended behavior and report the
    result; no automatic commit or additional reviewer is required.

    ## Report

    [Direct reply, or report-file path if a detailed artifact is useful]
    - Result: complete, complete with concerns, needs context, or blocked
    - What changed and which paths were affected
    - Checks run, actual results, and checks not run
    - RED/GREEN evidence only if a TDD cycle was actually exercised
    - Material decisions, unresolved issues, or concerns
    - Commits only if creation was authorized and actually performed
```
