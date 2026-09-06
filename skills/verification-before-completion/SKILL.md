---
name: verification-before-completion
description: Use when deciding what evidence supports a completion, correctness, or test-result claim
---

# Verification Before Completion

## Overview

**Core principle:** Evidence before claims. Report what you observed, not what you hope is true.

This optional guide helps select useful verification; it does not require a full suite, a new test, a checklist, a skill announcement, or another skill invocation for every change. Simple questions can be answered directly. For edits, scale checks to the affected behavior and risk.

## A Proportionate Recipe

1. **Identify the claim.** What would demonstrate the changed behavior or artifact is correct?
2. **Choose the check.** A focused test, actual UI interaction, CLI smoke run, build, document review, or broader suite may fit. Use project requirements where applicable.
3. **Observe the result.** Read relevant output and exit status; distinguish failures, warnings, and checks not run.
4. **Match the report to the evidence.** A passing focused test supports that scenario, not a claim that every test passes.

Use evidence from the relevant revision and environment. A run already observed in this session need not be repeated merely to place it next to the final message; rerun when intervening changes could invalidate it. When verification is unavailable or explicitly skipped, say what changed and what remains unverified.

## Choosing Evidence

| Claim | Suitable evidence | Not enough on its own |
|-------|-------------------|----------------------|
| Specific tests pass | Those test results, with scope and failures visible | Confidence or an assumed outcome |
| All tests pass | Complete applicable suite results on the relevant code | One focused test |
| Build succeeds | Successful build command | Linter output |
| Original bug resolved | Original reproduction no longer triggers under stated conditions | An edit that looks plausible |
| Regression test detects defect | Expected failing result before the fix, or a safe isolated mutation/pre-fix check | A single passing run |
| UI behavior works | Interaction with the actual changed surface | Compilation alone |
| Documentation updated | Inspection of changed instructions, links, or examples as appropriate | A claim that runtime behavior was tested |
| Requirements met | Relevant deliverables checked against the request | Tests unrelated to acceptance criteria |

A partial check is useful evidence for its scope. Do not present it as comprehensive verification.

## Examples

- "The retry regression test passes; I did not run the full suite."
- "The CLI accepted the new flag and produced the expected output in the smoke run."
- "Updated the instructions. Behavioral scenarios were not run, as requested."
- "The build fails on the existing missing dependency; this does not establish whether the changed path works."

## Regression Checks

For a bug fix, a failing reproduction followed by a passing run is strong evidence. Keep a durable regression test when it protects a plausible recurring failure. A manual scenario or throwaway smoke check can be better for one-off or difficult-to-automate surfaces.

Do not destructively revert a shared checkout just to produce RED evidence. If a pre-fix check is needed, use a safe isolated revision or mutation, preserve existing work, and restore temporary changes. Never delete useful implementation solely because it was not test-first.

## Delegated Work

A worker's summary is a claim, not independent proof. Inspect its deliverable and supporting evidence before making your own completion claim. Reuse trustworthy results for the same code instead of automatically rerunning every suite. If evidence is missing, investigate that gap or state the limitation.

## Reporting Boundaries

- Do not fabricate command output, test counts, or runtime observations.
- Do not confuse an unavailable check with a passing check.
- Do not suppress a failure or weaken a valid assertion to manufacture success.
- A known failure can be reported honestly without pretending the work is fully verified.
- Qualifiers such as "appears" or "likely" are appropriate for inferences when clearly labeled; they are not substitutes for evidence of success.
