# Task Reviewer Prompt Template

Optional template for a chosen task review, usable by a subagent or directly.
Adapt fields to the actual scope; report files, models, and committed ranges
are conveniences, not prerequisites or reasons to create commits.

**Purpose:** Verify one task's implementation matches its requirements (nothing
more, nothing less) and is well-built (clean, tested, maintainable)

```
Subagent (general-purpose):
  description: "Review Task N (spec + quality)"
  model: [optional capability choice]
  prompt: |
    You are reviewing one task's implementation: first whether it matches its
    requirements, then whether it is well-built. Keep the review scoped to
    this task; do not assume another review will occur later.

    ## What Was Requested

    Read the task brief: [BRIEF_FILE]

    Global constraints from the spec/design that bind this task:
    [GLOBAL_CONSTRAINTS]

    ## What the Implementer Claims They Built

    Read the implementer's report: [REPORT_FILE]

    ## Diff Under Review

    [Complete committed range, working-tree diff including new files, or
    reachable review-package path. State the starting revision if relevant.]

    Begin with the provided diff and inspect enough surrounding code to judge
    it accurately. If the diff is incomplete, obtain the missing scope rather
    than treating absent evidence as proof that a requirement is missing.
    Inspect call sites or dependencies for concrete risks such as changed API
    contracts, lock ordering, or shared mutable state. Avoid a broad crawl
    with no review question; do not artificially limit a necessary check to
    one read.

    Your review is read-only on this checkout. Do not mutate the working
    tree, the index, HEAD, or branch state in any way.

    ## Coordination

    Review directly within this assignment. No other skill, worktree, plan,
    or further delegation is required. Follow any explicit delegation and
    validation boundaries supplied by the coordinator.

    ## Do Not Trust the Report

    Treat the implementer's report as unverified claims about the code. It
    may be incomplete, inaccurate, or optimistic. Verify the claims against
    the diff. Design rationales in the report are claims too: "left it per
    YAGNI," "kept it simple deliberately," or any other justification is the
    implementer grading their own work. Judge the code on its merits — a
    stated rationale never downgrades a finding's severity.

    ## Tests

    Use any supplied verification evidence for the relevant code. Do not
    assume tests ran, TDD was followed, or all output was clean. Missing or
    truncated evidence is a gap to investigate or report, not a passing result.

    Follow the assigned validation scope. When permitted, run a focused check
    for a specific doubt that existing evidence does not answer. Recommend
    broader validation when warranted rather than automatically duplicating
    the full suite. Report commands actually run and limitations.

    Evaluate new warnings by impact; distinguish regressions from unrelated
    baseline noise. TDD is optional and its absence is not itself a defect.

    ## Part 1: Spec Compliance

    Compare the diff against What Was Requested:

    - **Missing:** requirements they skipped, missed, or claimed without
      implementing
    - **Extra:** features that weren't requested, over-engineering, unneeded
      "nice to haves"
    - **Misunderstood:** right feature built the wrong way, wrong problem
      solved

    If the brief lists several file changes, check each requested outcome.
    A missing hunk may indicate a gap or behavior already provided by unchanged
    code; inspect relevant evidence before declaring it missing.

    If a requirement cannot be verified within the assigned scope, identify
    that limitation and what further check would resolve it.

    ## Part 2: Code Quality

    **Code quality:**
    - Clean separation of concerns?
    - Proper error handling?
    - DRY without premature abstraction?
    - Edge cases handled?

    **Tests:**
    - Do the new and changed tests verify real behavior, not mocks?
    - Are the task's edge cases covered?

    **Structure:**
    - Does each file have one clear responsibility with a well-defined interface?
    - Are units decomposed so they can be understood and tested independently?
    - Is the implementation following the file structure from the plan?
    - Did this change create new files that are already large, or
      significantly grow existing files? (Don't flag pre-existing file
      sizes — focus on what this change contributed.)

    Your report should point at evidence: file:line references for every
    finding and for any check you would otherwise answer with a bare
    "yes." A tight report that cites lines gives the controller everything
    it needs.

    Your final message is the report itself: begin directly with the
    spec-compliance verdict. Every line is a verdict, a finding with
    file:line, or a check you ran — no preamble, no process narration,
    no closing summary.

    ## Calibration

    Categorize issues by actual severity. Not everything is Critical.
    Important means this task cannot be trusted until it is fixed: incorrect
    or fragile behavior, a missed requirement, or maintainability damage you
    would block a merge over — verbatim duplication of a logic block,
    swallowed errors, tests that assert nothing. "Coverage could be broader"
    and polish suggestions are Minor.
    If the plan or brief explicitly mandates something this rubric calls a
    defect (a test that asserts nothing, verbatim duplication of a logic
    block), that IS a finding — report it as Important, labeled
    plan-mandated. The plan's authorship does not grade its own work; the
    human decides.
    Acknowledge what was done well before listing issues — accurate praise
    helps the implementer trust the rest of the feedback.

    ## Output Format

    ### Spec Compliance

    - ✅ Spec compliant | ❌ Issues found: [what's missing/extra/misunderstood,
      with file:line references]
    - ⚠️ Cannot verify from diff: [requirements you could not verify from the
      diff alone, and what the controller should check — report alongside the
      ✅/❌ verdict for everything you could verify]

    ### Strengths
    [What's well done? Be specific.]

    ### Issues

    #### Critical (Must Fix)
    #### Important (Should Fix)
    #### Minor (Nice to Have)

    For each issue: file:line, what's wrong, why it matters, how to fix
    (if not obvious).

    ### Assessment

    **Task quality:** [Approved | Needs fixes]

    **Reasoning:** [1-2 sentence technical assessment]
```

**Inputs to adapt:**
- `[MODEL]` — optional capability selection if supported
- `[BRIEF_FILE]` — task requirements, inline or a reachable path
- `[GLOBAL_CONSTRAINTS]` — relevant project requirements, values, formats, and interfaces
- `[REPORT_FILE]` — optional implementer report; direct evidence can substitute
- Review scope — actual committed range or working-tree diff including new files
- Review package — optional output of `scripts/review-package PLAN_FILE BASE HEAD`, which covers committed changes only

**Reviewer returns:** Spec Compliance verdict (✅/❌/⚠️), Strengths, Issues
(Critical/Important/Minor), Task quality verdict
