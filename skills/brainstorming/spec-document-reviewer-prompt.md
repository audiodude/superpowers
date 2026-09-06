# Spec Document Reviewer Prompt Template

Optional template for self-review or an independent spec review when it would help. Using it does not require a subagent or create an approval gate.

**Purpose:** Verify the spec is complete, consistent, and ready for implementation planning.

**When useful:** A substantial spec is ready for a second look, wherever the project stores it.

```
Subagent (general-purpose):
  description: "Review spec document"
  prompt: |
    You are a spec document reviewer. Verify this spec is complete and ready for planning.

    **Spec to review:** [SPEC_FILE_PATH]

    ## What to Check

    | Category | What to Look For |
    |----------|------------------|
    | Completeness | TODOs, placeholders, "TBD", incomplete sections |
    | Consistency | Internal contradictions, conflicting requirements |
    | Clarity | Requirements ambiguous enough to cause someone to build the wrong thing |
    | Scope | Focused enough for a single plan — not covering multiple independent subsystems |
    | YAGNI | Unrequested features, over-engineering |

    ## Calibration

    **Only flag issues that would cause real problems during implementation planning.**
    A missing section, a contradiction, or a requirement so ambiguous it could be
    interpreted two different ways — those are issues. Minor wording improvements,
    stylistic preferences, and "sections less detailed than others" are not.

    Report serious gaps that would lead to a flawed implementation or plan.

    ## Output Format

    ## Spec Review

    **Status:** No Blocking Issues Found | Issues Found

    **Issues (if any):**
    - [Section X]: [specific issue] - [why it matters for planning]

    **Recommendations (advisory):**
    - [suggestions for improvement]
```

**Reviewer returns:** Status, Issues (if any), Recommendations
