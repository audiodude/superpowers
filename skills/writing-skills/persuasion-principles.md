# Persuasion Principles and Advisory Skill Design

Emphatic wording can change an agent's behavior without improving its judgment. This reference explains common persuasion mechanisms so skill authors can recognize and avoid coercive process. It is not a recipe for making optional skills compulsory.

## Clarity Instead of Manufactured Authority

A skill can explain a real safety boundary, technical constraint, or useful technique. It cannot promote itself above system, developer, or applicable user instructions. Match the strength of the wording to the actual requirement and its source.

Prefer:

> Before reporting that a check passed, inspect its result. If it did not run, report it as unverified.

For an optional technique:

> Test-first development can clarify uncertain behavior. Use a focused reproduction or existing test when that better fits the task.

These communicate purpose and observable actions without demanding ritual or deleting useful work because it followed a different sequence.

## Seven Mechanisms to Recognize

| Principle | Mechanism | Responsible use in guidance |
|---|---|---|
| Authority | Deference to expertise or official sources | Cite the real source and scope; never invent higher-priority status |
| Commitment | Desire to follow prior declarations | Use clear deliverables when helpful, not mandatory skill announcements |
| Scarcity | Urgency or limited opportunity | Describe genuine timing constraints; do not create artificial gates |
| Social proof | Conformity to what others do | Give supported examples rather than claims that every deviation fails |
| Unity | Shared identity and goals | Encourage candid collaboration without making disagreement disloyal |
| Reciprocity | Obligation after receiving a benefit | Avoid guilt or implied debt as a reason to follow a workflow |
| Liking | Preference for pleasing others | Encourage accurate feedback rather than sycophancy |

The existence of a persuasion mechanism is not evidence that using it improves correctness. Compliance with a skill and success on the user's task are different outcomes.

## Practical Writing Choices

- Explain why a technique helps, and identify when a simpler path is enough.
- State observable conditions: "If the change affects a public API, examine its consumers."
- Use positive structure for output requirements, such as a short finding, evidence, and consequence.
- Distinguish required format fields from optional authoring workflows.
- Preserve truthful verification and authorization boundaries without forcing plans, approval cycles, subagents, or skill chaining.
- Examine whether surprising behavior reveals an overbroad instruction before adding stronger prohibitions.

## Evaluating Wording

For a consequential wording change, a small controlled comparison can reveal unwanted effects. Include a direct, low-risk task as well as a task that benefits from the guidance. Measure correctness, helpfulness, scope control, and honest reporting—not invocation rate alone.

Repeated independent samples and transcript inspection provide better evidence than a single compliant response. [testing-skills-with-subagents.md](testing-skills-with-subagents.md) offers optional evaluation techniques.

## Ethical Questions

1. Does this serve the user's actual goal and preserve their choice of workflow?
2. Is the claimed authority real and correctly scoped?
3. Is urgency genuine, or merely a device to compel compliance?
4. Can a reasonable reader choose a simpler approach when appropriate?
5. Does the guidance encourage accurate disagreement and disclosure of uncertainty?

## Background Reading

- Cialdini, R. B. (2021). *Influence: The Psychology of Persuasion (New and Expanded).* Harper Business.
- Meincke, L., Shapiro, D., Duckworth, A. L., Mollick, E., Mollick, L., & Cialdini, R. (2025). *Call Me A Jerk: Persuading AI to Comply with Objectionable Requests.* University of Pennsylvania.

These are background on persuasion, not proof that compulsory skill workflows improve software engineering. Any claimed benefit for a particular skill needs evidence from that task and environment.
