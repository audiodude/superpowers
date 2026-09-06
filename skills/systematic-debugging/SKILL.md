---
name: systematic-debugging
description: Use when root-cause investigation would help with a bug, test failure, or unexpected behavior
---

# Systematic Debugging

## Overview

**Core principle:** Investigate causes rather than stacking speculative symptom fixes. Match the investigation to the evidence and risk.

This is an optional recipe, not a gate before every edit. For an obvious, well-understood bug, a short investigation and focused reproduction may suffice. No announcements, plan files, approvals, or other skills are required by this guide.

During incidents, authorized reversible mitigation can protect users while investigation continues. Label mitigation as mitigation, preserve diagnostic evidence, and do not claim the underlying cause is fixed without support.

## When to Use

Useful for technical issues such as:
- Test failures
- Bugs in production
- Unexpected behavior
- Performance problems
- Build failures
- Integration issues

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

For small issues, use only the steps that reduce uncertainty. Under time pressure, prioritize evidence that distinguishes likely causes rather than mechanically completing every phase.

## The Four Phases

Use these phases as a guide; combine or revisit them as the evidence warrants.

### Phase 1: Root Cause Investigation

Build enough understanding to justify a targeted fix:

1. **Read Error Messages Carefully**
   - Don't skip past errors or warnings
   - They often contain the exact solution
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - What are the exact steps?
   - Does it happen every time?
   - If not reproducible → gather more data, don't guess

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits
   - New dependencies, config changes
   - Environmental differences

4. **Gather Evidence in Multi-Component Systems**

   **WHEN system has multiple components (CI → build → signing, API → service → database):**

   **If existing evidence does not locate the failure, add focused diagnostic instrumentation:**
   ```
   For relevant component boundaries:
     - Inspect necessary input/output metadata, redacting secrets and personal data
     - Verify environment/config propagation
     - Check state at each layer

   Run once to gather evidence showing WHERE it breaks
   THEN analyze evidence to identify failing component
   THEN investigate that specific component
   ```

   **Example (multi-layer system):**
   ```bash
   # Layer 1: Workflow
   echo "=== Secrets available in workflow: ==="
   if [ -n "${IDENTITY:-}" ]; then echo "IDENTITY: SET"; else echo "IDENTITY: UNSET"; fi

   # Layer 2: Build script (repeat presence check there; do not dump secrets)
   echo "=== Signing identity present in build script: ==="
   if [ -n "${IDENTITY:-}" ]; then echo "SET"; else echo "UNSET"; fi

   # Layer 3: Signing script
   echo "=== Keychain state: ==="
   security list-keychains
   security find-identity -v

   # Layer 4: Actual signing
   codesign --sign "$IDENTITY" --verbose=4 "$APP"
   ```

   **This reveals:** Which layer fails (secrets → workflow ✓, workflow → build ✗)

5. **Trace Data Flow**

   **WHEN error is deep in call stack:**

   See `root-cause-tracing.md` in this directory for the complete backward tracing technique.

   **Quick version:**
   - Where does bad value originate?
   - What called this with bad value?
   - Keep tracing up until you find the source
   - Fix at source, not at symptom

### Phase 2: Pattern Analysis

**Find the pattern before fixing:**

1. **Find Working Examples**
   - Locate similar working code in same codebase
   - What works that's similar to what's broken?

2. **Compare Against References**
   - Read the relevant reference implementation and enough surrounding context to understand its assumptions
   - Follow important dependencies rather than copying an isolated snippet

3. **Identify Differences**
   - What's different between working and broken?
   - List every difference, however small
   - Don't assume "that can't matter"

4. **Understand Dependencies**
   - What other components does this need?
   - What settings, config, environment?
   - What assumptions does it make?

### Phase 3: Hypothesis and Testing

**Scientific method:**

1. **Form Single Hypothesis**
   - State clearly: "I think X is the root cause because Y"
   - Write it down
   - Be specific, not vague

2. **Test Minimally**
   - Make the SMALLEST possible change to test hypothesis
   - One variable at a time
   - Don't fix multiple things at once

3. **Verify Before Continuing**
   - Did it work? Yes → Phase 4
   - Didn't work? Form NEW hypothesis
   - DON'T add more fixes on top

4. **When You Don't Know**
   - Say "I don't understand X"
   - Don't pretend to know
   - Ask for help
   - Research more

### Phase 4: Implementation

**Fix the root cause, not the symptom:**

1. **Choose a Reproduction**
   - Use the simplest reliable reproduction of the defect
   - An automated regression test is valuable for recurring or risky behavior
   - A one-off script or manual scenario can be appropriate when automation is impractical
   - If choosing test-first implementation, superpowers:test-driven-development is an optional reference

2. **Implement Single Fix**
   - Address the root cause identified
   - ONE change at a time
   - No "while I'm here" improvements
   - No bundled refactoring

3. **Verify Fix**
   - Test passes now?
   - No other tests broken?
   - Issue actually resolved?
   - Report the observed evidence and its limits; superpowers:verification-before-completion is an optional reference

4. **If Fix Doesn't Work**
   - Re-analyze the hypothesis using the new evidence rather than piling on fixes
   - Repeated failures are a signal to reconsider assumptions or architecture
   - There is no magic attempt count; seek help when missing context or material design choices block progress

5. **When Repeated Fixes Fail: Question Architecture**

   **Pattern indicating architectural problem:**
   - Each fix reveals new shared state/coupling/problem in different place
   - Fixes require "massive refactoring" to implement
   - Each fix creates new symptoms elsewhere

   **Questions to investigate:**
   - Is this pattern fundamentally sound?
   - Are we preserving an assumption the evidence contradicts?
   - Would a change to architecture address the cause, or merely broaden scope?

   Discuss material architectural changes when the task does not authorize them. Repeated failures suggest a hypothesis needs revision; they do not by themselves prove the architecture is wrong.

## Signs to Revisit the Investigation

- Multiple speculative changes obscure which one mattered
- Each fix reveals a new problem in another component
- A proposed fix has no evidence connecting it to the symptom
- A reproduction or test fails for a different reason than expected
- A user reports that the assumed behavior is not what actually happens

Use these signals to gather the missing evidence. Manual verification, a short process, or adapting a reference is not itself a failure.

## Common Mistakes

| Mistake | Better approach |
|---------|-----------------|
| Treating a symptom as proof of its cause | Trace the value or control flow that produced it |
| Changing several unrelated variables | Test one hypothesis at a time where practical |
| Copying a pattern without its assumptions | Read the relevant context and compare dependencies |
| Calling a temporary mitigation a fix | Distinguish restored service from root-cause resolution |
| Repeating failed attempts unchanged | Reconsider the hypothesis or ask for missing context |

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|------------------|
| **1. Root Cause** | Read errors, reproduce, check changes, gather evidence | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare | Identify differences |
| **3. Hypothesis** | Form theory, test minimally | Confirmed or new hypothesis |
| **4. Implementation** | Reproduce, fix, verify | Original issue resolved with proportionate evidence |

## When Process Reveals "No Root Cause"

If investigation points to an environmental, timing-dependent, or external cause:

1. Record the evidence and what remains unknown
2. Choose handling justified by the failure mode (for example, bounded retry only where duplicate side effects are safe)
3. Verify that handling under representative failure conditions
4. Add focused, privacy-safe diagnostics when they would reduce future uncertainty

If the cause remains unknown, say so. Do not invent certainty or add retries, timeouts, or monitoring merely to close the task.

## Supporting Techniques

Optional supporting techniques in this directory:

- **`root-cause-tracing.md`** - Trace bugs backward through call stack to find original trigger
- **`defense-in-depth.md`** - Add validation at multiple layers after finding root cause
- **`condition-based-waiting.md`** - Replace arbitrary timeouts with condition polling
