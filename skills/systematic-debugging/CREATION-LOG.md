# Creation Log: Systematic Debugging Skill

## Historical Context

The upstream guide organized debugging into four phases: investigation, pattern analysis, hypothesis testing, and implementation. Its original creation notes described pressure-oriented enforcement language and reported successful evaluations on 2025-10-03. Those historical claims are not evidence that this advisory revision has been evaluated.

## Advisory Revision

This fork keeps the practical techniques:

- Read errors and reproduce the relevant behavior.
- Compare working examples and trace values to their source.
- Test a specific hypothesis rather than stacking speculative fixes.
- Protect meaningful validation and security boundaries.
- Verify the original symptom and report the limits of the evidence.

It replaces unconditional workflow gates with proportionate choices. A small known bug can use a short investigation. A production incident may need authorized reversible mitigation while diagnosis continues. TDD, supporting references, instrumentation, and formal tracking are options rather than required chains.

Routine opt-outs are not treated as rationalization. The safety distinction is between an informed shortcut and an unsupported claim or unsafe action, not whether every phase was performed in order.

## Optional Evaluation Materials

The adjacent academic and pressure scenarios exercise method selection, uncertain evidence, incident safety, and respectful technical disagreement. They are simulated prompts, not instructions to operate real systems or automatically dispatch evaluators. Run them when evaluation is requested or useful, and report only results actually observed.

## Source of Current Guidance

[SKILL.md](SKILL.md) is the current recipe. This file records its origins and philosophy, not additional invocation rules, a mandatory authoring process, or a claim that the advisory revision has passed behavioral validation.
