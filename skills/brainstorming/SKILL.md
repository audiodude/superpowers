---
name: brainstorming
description: Use when requested or when an ambiguous idea, architectural choice, or consequential design trade-off would benefit from collaborative exploration.
---

# Brainstorming Ideas Into Designs

Turn uncertain ideas into useful designs through collaborative dialogue. This is an optional technique, not a prerequisite for creative work or implementation. A clear, authorized request can proceed directly; do not require another approval merely because a design has not been presented.

## Scale to the Task

- **Question or bounded change:** inspect relevant context, resolve only material uncertainty, and answer or implement. A short explanation may be enough; no design document or plan is needed.
- **Feasibility spike:** identify the question and the cheapest informative experiment. Report observations separately from conclusions and label throwaway code. Do not silently turn an investigation into a production feature.
- **Architectural or ambiguous work:** explore constraints and alternatives before committing to costly choices. A written design can help when several interfaces, contributors, or long-lived decisions are involved.

Reassess as you learn. Add structure when hidden dependencies or risk emerge; simplify it when uncertainty is resolved. Ask for a decision when alternatives materially affect the user's goals, authorization, or irreversible outcomes—not to satisfy a ceremony.

## Understand the Idea

Read the existing code and relevant docs before asking questions the repository can answer. Identify purpose, constraints, success criteria, and non-goals. Follow existing patterns rather than introducing a second convention.

Ask focused questions that would change the design. One at a time often works well for an unfamiliar topic; batch related, easy questions when that is clearer. State reasonable assumptions for low-risk details instead of blocking progress on every preference.

If the request spans independent subsystems, identify their responsibilities, interfaces, and dependencies. Separate designs or plans can help when each produces a useful deliverable; avoid forcing every subsystem through its own approval cycle.

## Explore Approaches

When there is a real choice, offer two or three viable alternatives with trade-offs and lead with a recommendation. Compare complexity, compatibility, failure modes, operational cost, and reversibility. Do not invent alternatives for an obvious small change.

Keep scope lean: remove unrequested features and abstractions that do not serve the current goal.

## Develop the Design

Cover the parts that matter:
- Architecture and component responsibilities
- Inputs, outputs, interfaces, and data flow
- Error handling, security boundaries, and recovery
- Compatibility or migration concerns
- Observable acceptance criteria and a proportionate verification approach

Use a few sentences for simple decisions and sections for complex ones. Invite feedback at meaningful decision points rather than requiring approval after every section.

### Isolation and Clarity

Prefer units with one clear purpose and explicit interfaces. For each unit, explain what it does, how consumers use it, and what it depends on. Consumers should not need implementation details to understand the contract. Follow the codebase's structure; include targeted improvements only where they serve the requested change.

## Capture and Continue

Use chat for short-lived decisions. When a durable spec is requested or useful for handoff, follow the project's location convention; absent one, `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` is an option. Creating, committing, or publishing a document is not an automatic part of brainstorming.

For a written spec, check:
1. **Completeness:** requirements and acceptance criteria are concrete; unresolved questions are identified rather than disguised as finished decisions.
2. **Consistency:** architecture, interfaces, and feature descriptions agree.
3. **Scope:** requested behavior is covered without unrelated work.
4. **Clarity:** assumptions and consequential choices are explicit.

The [spec review template](spec-document-reviewer-prompt.md) is available for self-review or an optional independent review. It does not create a gate.

Continue with the work already authorized. If a detailed implementation plan would reduce coordination or dependency risk, `superpowers:writing-plans` is an optional reference. No next skill, planning document, worktree, or subagent is required by this guide.

## Optional Visual Companion

Mockups and diagrams help with visual questions such as layout comparisons, not every question about a UI. Text is often clearer for requirements and trade-offs.

If browser-based collaboration would help, offer the companion when needed unless the user already requested it. Do not open the user's browser or expose a server without appropriate authorization. If they decline, continue in text. When using it, consult [visual-companion.md](visual-companion.md) for server operation, authenticated URLs, content fragments, and cleanup.
