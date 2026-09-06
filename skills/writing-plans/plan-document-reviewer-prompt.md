# Plan Document Reviewer Prompt Template

Optional template for self-review or an independent plan review when it would help. Using it does not require a subagent or create an approval gate.

**Purpose:** Verify the plan is complete, matches the spec, and has proper task decomposition.

**When useful:** A substantial plan is ready for a second look.

```
Subagent (general-purpose):
  description: "Review plan document"
  prompt: |
    You are a plan document reviewer. Verify this plan is complete and ready for implementation.

    **Plan to review:** [PLAN_FILE_PATH]
    **Requirements for reference:** [SPEC_FILE_PATH or supplied user requirements]

    ## What to Check

    | Category | What to Look For |
    |----------|------------------|
    | Completeness | TODOs, placeholders, incomplete tasks, missing steps |
    | Spec Alignment | Plan covers spec requirements, no major scope creep |
    | Task Decomposition | Tasks have clear boundaries, steps are actionable |
    | Buildability | Could an engineer follow this plan without getting stuck? |

    ## Calibration

    **Only flag issues that would cause real problems during implementation.**
    An implementer building the wrong thing or getting stuck is an issue.
    Minor wording, stylistic preferences, and "nice to have" suggestions are not.

    Report serious gaps — missing requirements, contradictory steps, unexplained
    placeholders, or tasks so vague they cannot be acted on.

    ## Output Format

    ## Plan Review

    **Status:** No Blocking Issues Found | Issues Found

    **Issues (if any):**
    - [Task X, Step Y]: [specific issue] - [why it matters for implementation]

    **Recommendations (advisory):**
    - [suggestions for improvement]
```

**Reviewer returns:** Status, Issues (if any), Recommendations
