---
name: writing-skills
description: Use when requested or when reusable agent guidance needs help with scope, discoverability, structure, or behavioral evaluation.
---

# Writing Skills

A skill is a reusable reference for techniques, patterns, or tools—not a record of one session and not a source of authority over system, developer, or user instructions. This guide is optional. A bounded documentation edit does not require a test campaign, design approval, announcement, or another skill.

## Decide What Belongs in a Skill

Create reusable guidance for a technique that is difficult to discover, frequently needed, and useful across tasks. Keep project-specific conventions in the project's existing instructions. Prefer automation for mechanical constraints and existing documentation for standard practices already explained well elsewhere.

Common forms:
- **Technique:** concrete steps, such as tracing a failure to its origin.
- **Pattern:** a mental model, such as separating policy from mechanism.
- **Reference:** API syntax, tool capabilities, or domain facts.

Scope descriptions to when the guidance is useful or requested. Avoid universal invocation triggers, invented authority, mandatory skill chains, and process whose only purpose is compliance with itself.

## Organize for Discovery

A skill directory contains `SKILL.md` and, when useful, supporting references or tools. Keep the core idea and short examples inline. Move large reference material and reusable scripts into separate files, linked by the situation in which they help.

```text
skills/
  skill-name/
    SKILL.md
    reference.md        # Optional detailed reference
    example.ts          # Optional reusable example or tool
```

Personal installation paths depend on the runtime. `~/.claude/skills/` is the Claude Code location; the optional [Codex](../using-superpowers/references/codex-tools.md) and [Gemini](../using-superpowers/references/gemini-tools.md) references cover those environments. Follow the target harness's current discovery rules rather than assuming one path fits all.

### Frontmatter

Use the target harness's supported format; the portable baseline has `name` and `description` fields. See the [Agent Skills specification](https://agentskills.io/specification) for exact limits and supported metadata.

- Use a descriptive lowercase, hyphenated name, preferably an action or recognizable concept: `condition-based-waiting`, not `async-helpers`.
- Write a concise third-person description with concrete situations or symptoms that distinguish this skill.
- Keep detailed workflow in the body. A description should help select a skill, not pressure the reader into loading it before every task.
- Include useful search terms naturally: actual errors, domain terms, and relevant tool names. Avoid redundant synonyms and overly broad triggers.

```yaml
---
name: condition-based-waiting
description: Use when asynchronous tests are flaky because they wait for elapsed time rather than an observable condition.
---
```

### Suggested Body

```markdown
# Skill Name

## Overview
[Core idea and the problem it solves]

## When It Helps
[Useful situations, boundaries, and cases better handled directly]

## Technique
[Actionable guidance, with conditions for branches]

## Example
[One complete, relevant example]

## Common Mistakes
[Observable failure modes and remedies]

## Further Reference
[Optional pointers with a reason to consult each]
```

Omit sections that add no value. Prefer a concise main document over a fixed length target or exhaustive checklist.

## Make Guidance Actionable

Use positive recipes for output shape and observable conditions for branches. Distinguish technical constraints from preferences: a file format can require a field, while a planning style remains optional. Explain safety boundaries and evidence requirements without claiming the skill outranks the governing instructions.

| Problem | Useful guidance |
|---|---|
| Missing evidence in a success claim | State the required evidence and how to report unverified work honestly |
| Bloated or ambiguous output | Show the intended structure and one concrete example |
| A step matters only in some situations | Name the observable condition that makes it useful |
| Readers cannot find a detail | Improve headings and the pointer to the detail |
| A known safety risk | Explain the boundary, consequence, and safe action |
| A simple task attracts unnecessary ceremony | Show a direct path and keep optional techniques optional |

Avoid treating every adaptation as a rationalization. If a reasonable reader chooses a different approach, examine whether the instruction is unclear, too broad, or unnecessary before adding prohibitions. Do not instruct readers to delete working code solely because they used a different development order.

### Cross-References

Link another skill only with a clear reason to consult it, for example:

> For a difficult-to-reproduce failure, `superpowers:systematic-debugging` offers root-cause investigation techniques.

References are optional; they are not required background or forced next steps. Avoid force-loading references with `@` syntax. Do not duplicate another skill's full workflow into this one.

### Examples and Diagrams

One complete example is usually better than several variants. Choose the language most relevant to the technique, show why the important decisions matter, and keep it ready to adapt. Avoid contrived implementations or session-specific narratives presented as universal advice.

Use tables for reference and numbered lists for linear steps. A small flowchart helps with non-obvious decisions or loops; code belongs in copyable code blocks, not diagram nodes. [graphviz-conventions.dot](graphviz-conventions.dot) offers optional styling examples. `render-graphs.js` can render diagrams individually or with `--combine` when a visual review is useful.

## Evaluate Proportionately

Behavioral evaluation is valuable for consequential guidance or wording whose effect is uncertain. Baseline → revised guidance → comparison is a useful experimental loop, inspired by test-driven development. It is not a requirement to run subagents before every edit, to delete untested prose, or to deploy each skill before editing another.

Choose the evidence that matches the change:
- **Reference corrections:** inspect authoritative sources, links, examples, and format.
- **Techniques:** try a representative task and a meaningful edge case.
- **Patterns:** include situations where the pattern helps and where it does not.
- **Behavioral guidance:** compare fresh-context runs with and without it, including a straightforward task that should remain direct.
- **Safety or truthful reporting:** include a case with missing evidence, insufficient authorization, or conflicting lower-priority text.

When comparing wording, keep the surrounding task and tool access constant. Repeated samples help distinguish a consistent improvement from chance; inspect transcripts rather than counting phrases alone. A small comparison can find ambiguity, but does not prove universal reliability.

[testing-skills-with-subagents.md](testing-skills-with-subagents.md) describes optional behavioral evaluation, including inline alternatives. [examples/CLAUDE_MD_TESTING.md](examples/CLAUDE_MD_TESTING.md) provides advisory discovery scenarios. [persuasion-principles.md](persuasion-principles.md) discusses why emphatic wording can distort judgment. [anthropic-best-practices.md](anthropic-best-practices.md) is supplementary platform authoring guidance, not an additional mandatory workflow.

## Review and Delivery

Check that the description is scoped, the core technique is easy to find, examples are accurate, and supporting files do not reintroduce coercive policy. Prefer focused changes to useful existing guidance over accumulating exceptions and repetitive warnings.

Report what was changed and what was actually checked. If evaluation was skipped or unavailable, say so; do not claim the skill is tested or "bulletproof." Commit, push, publish, and install only within the user's authorization and the current task's instructions. No mandatory deployment or contribution step follows authoring.
