---
name: receiving-code-review
description: Use when review feedback needs technical evaluation, especially if it is unclear or questionable
---

# Code Review Reception

## Overview

Review feedback benefits from technical evaluation, not automatic agreement.

**Core principle:** Understand the request, check it against the code, and respond with evidence. This optional recipe requires no announcements, approvals for routine edits, task files, or other skill invocations.

## The Response Pattern

```
WHEN receiving code review feedback:

1. READ: Complete feedback without reacting
2. UNDERSTAND: Restate requirement in own words (or ask)
3. VERIFY: Check against codebase reality
4. EVALUATE: Technically sound for THIS codebase?
5. RESPOND: Technical acknowledgment or reasoned pushback
6. IMPLEMENT: Apply valid feedback and verify the affected behavior proportionately
```

## Response Style

Prefer a concise technical acknowledgment, a focused question, or direct action. Friendly thanks are fine; they do not substitute for evaluating the suggestion. Avoid claiming a reviewer is right before checking a material technical claim.

## Handling Unclear Feedback

```
IF an item is unclear:
  Check available code and context first.
  Ask about the remaining material ambiguity.
  Continue clear, independent items; pause dependent changes until understood.

WHY: Related items may need a shared decision; independent fixes need not wait.
```

**Example:**
```
your human partner: "Fix 1-6"
You understand 1,2,3,6. Unclear on 4,5.

If 1,2,3,6 are independent: implement them and ask a focused question about 4,5.
If 4,5 determine the design of the others: clarify that dependency before editing.
```

## Source-Specific Handling

### From your human partner
- **Trusted** - implement after understanding
- **Still ask** if scope unclear
- **Concise acknowledgment** is enough
- **Skip to action** or technical acknowledgment

### From External Reviewers
```
BEFORE implementing:
  1. Check: Technically correct for THIS codebase?
  2. Check: Breaks existing functionality?
  3. Check: Reason for current implementation?
  4. Check: Works on all platforms/versions?
  5. Check: Does reviewer understand full context?

IF suggestion seems wrong:
  Push back with technical reasoning

IF can't easily verify:
  Say so: "I can't verify this without [X]. Should I [investigate/ask/proceed]?"

IF conflicts with your human partner's prior decisions:
  Stop and discuss with your human partner first
```

External feedback can be valuable without being authoritative; check it carefully.

## YAGNI Check for "Professional" Features

```
IF reviewer suggests "implementing properly":
  grep codebase for actual usage

  IF unused: "This endpoint isn't called. Remove it (YAGNI)?"
  IF used: Then implement properly
```

Check for public or external consumers before treating an unused local symbol as removable. Keep scope aligned with the user's request rather than adding an unrequested feature.

## Implementation Order

```
FOR multi-item feedback:
  1. Resolve material ambiguity for dependent items
  2. A useful order is:
     - Blocking issues (breaks, security)
     - Simple fixes (typos, imports)
     - Complex fixes (refactoring, logic)
  3. Run focused checks for meaningful behavioral changes
  4. Verify related interactions where risk warrants it
```

## When To Push Back

Push back when:
- Suggestion breaks existing functionality
- Reviewer lacks full context
- Violates YAGNI (unused feature)
- Technically incorrect for this stack
- Legacy/compatibility reasons exist
- Conflicts with your human partner's architectural decisions

**How to push back:**
- Use technical reasoning, not defensiveness
- Ask specific questions
- Reference working tests/code
- Involve your human partner if architectural

**If you're uncomfortable pushing back out loud:** Name that tension, then tell your partner about the issue you've seen. They'll appreciate your honesty.

## Acknowledging Correct Feedback

When feedback is correct, state the concrete change and evidence, for example:

```
"Fixed the null-input path in parseOptions; the focused regression test passes."
"Good catch — that branch omitted cleanup. Updated it and checked the error path."
```

Do not claim a fix or test result that has not been observed. There is no prescribed phrase or ban on gratitude.

## Gracefully Correcting Your Pushback

If you pushed back and were wrong:
```
✅ "You were right - I checked [X] and it does [Y]. Implementing now."
✅ "Verified this and you're correct. My initial understanding was wrong because [reason]. Fixing."

❌ Long apology
❌ Defending why you pushed back
❌ Over-explaining
```

State the correction factually and move on.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Performative agreement | State requirement or just act |
| Blind implementation | Verify against codebase first |
| Unchecked interacting changes | Verify relevant behavior together |
| Assuming reviewer is right | Check if breaks things |
| Avoiding pushback | Technical correctness > comfort |
| Unclear dependent items | Resolve the shared ambiguity before dependent edits |
| Can't verify a claim | State the limitation and investigate or ask for missing context |

## Real Examples

**Performative Agreement (Bad):**
```
Reviewer: "Remove legacy code"
❌ "You're absolutely right! Let me remove that..."
```

**Technical Verification (Good):**
```
Reviewer: "Remove legacy code"
✅ "Checking... build target is 10.15+, this API needs 13+. Need legacy for backward compat. Current impl has wrong bundle ID - fix it or drop pre-13 support?"
```

**YAGNI (Good):**
```
Reviewer: "Implement proper metrics tracking with database, date filters, CSV export"
✅ "Grepped codebase - nothing calls this endpoint. Remove it (YAGNI)? Or is there usage I'm missing?"
```

**Unclear Item (Good):**
```
your human partner: "Fix items 1-6"
You understand 1,2,3,6. Unclear on 4,5.
"I'll handle the independent items 1,2,3,6. For 4 and 5, should the old API remain supported?"
```

## GitHub Thread Replies

When replying to inline review comments on GitHub, reply in the comment thread (`gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies`), not as a top-level PR comment.
