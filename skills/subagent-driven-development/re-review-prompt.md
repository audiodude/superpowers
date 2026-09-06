# Scoped Re-Review Prompt Template

Optional template for checking a fix after review. Use directly or delegate
when an independent pass would help. Adapt file and commit fields to the
actual scope; no report artifact or commit is required.

**Purpose:** Verify each finding from the previous review was addressed, and
that the fix itself broke nothing.

```
Subagent (general-purpose):
  description: "Re-review Task N fix round R"
  model: [optional capability choice]
  prompt: |
    You are re-reviewing one task's fix round. A previous review produced
    findings; an implementer has attempted to fix them. Your job is to
    verdict each finding and inspect the fix diff — nothing else.

    ## The Task

    Read the task brief: [BRIEF_FILE]

    ## The Findings Under Verification

    [FINDINGS]

    ## The Fix

    Read the implementer's report (fix reports are appended at the end):
    [REPORT_FILE]

    [Fix diff or reachable package, including uncommitted and new files when
    applicable; identify the revision/state the previous review covered.]

    Inspect the actual fix and enough context to judge it. If a package is
    incomplete, obtain the missing scope. Do not create commits to fit the
    template.

    Your review is read-only on this checkout. Do not mutate the working
    tree, the index, HEAD, or branch state in any way.

    ## Coordination

    Review directly within this assignment; no further delegation, other
    skill, worktree, or plan is required. Honor the coordinator's explicit
    ownership and validation boundaries.

    ## Scope

    Your scope is the findings list and the fix diff. Verdict every finding.
    Inspect the fix diff for new problems the fix itself introduced. Do NOT
    expand into an unrelated review. Record out-of-scope observations
    separately, with honest severity; an unrelated security defect should
    still be surfaced, not automatically downgraded. Do not assume another
    whole-branch review will happen.

    ## Tests

    Read available evidence for the amended code without assuming a test run
    exists. Follow the assigned validation scope. When permitted, use a
    focused check for a concrete doubt not answered by current evidence.
    Recommend broader checks when warranted; do not automatically rerun suites.
    Report actual results and missing evidence. TDD is not a prerequisite.

    ## Output Format

    Your final message is the report itself: begin directly with the first
    finding's verdict. Every line is a verdict, a finding with file:line,
    or a check you ran — no preamble, no process narration.

    ### Finding Verdicts

    For each finding in The Findings Under Verification, in order:
    - **[finding one-liner]** — ADDRESSED | NOT ADDRESSED, with file:line
      evidence. "Attempted" is not addressed: the specific defect must no
      longer exist.

    ### New Breakage in the Fix Diff

    Anything the fix itself broke or introduced, with severity
    (Critical/Important/Minor) and file:line. "None" if clean.

    ### Out-of-Scope Observations

    Issues noticed outside the fix diff, with their actual severity and
    recommended owner or follow-up. "None" if none.

    ### Verdict

    **Fix round:** [All findings addressed, no new Critical/Important
    breakage | Findings remain open] — list the open ones.
```

**Placeholders:**
- `[MODEL]` — optional reviewer capability selection
- `[BRIEF_FILE]` — requirements inline or a reachable task brief
- `[FINDINGS]` — findings and spec gaps from the previous review
- `[REPORT_FILE]` — optional implementer report or direct fix evidence
- Fix scope — actual changes since the previous review, including uncommitted/new files
- Review package — optional helper output for committed changes only

**Re-reviewer returns:** per-finding verdicts (ADDRESSED / NOT ADDRESSED),
new breakage in the fix diff, out-of-scope observations, and a round verdict.
