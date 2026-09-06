---
name: finishing-a-development-branch
description: Use when integration, a pull request, or branch cleanup is requested after implementation
---

# Finishing a Development Branch

## Overview

**Core principle:** Check the relevant evidence, understand the environment, follow the requested integration choice, and preserve work during cleanup.

This is an optional integration recipe, not a required end to every task. If the user asked only for edits, report the result and leave the branch and working tree intact. No announcement, commit, PR, or menu is required.

## Step 1: Check Verification Evidence

Use checks appropriate to the change and the repository's integration requirements. A full suite may be warranted for broad changes; a focused test, build, or smoke run may suffice for a narrow change. Reuse current evidence when no relevant changes have invalidated it.

If checks fail or cannot run, report the exact scope and limitation. Do not represent an unverified branch as ready to merge. Investigate regressions before integrating; preserving the branch or opening an explicitly requested draft PR does not require pretending the suite is green.

## Step 2: Detect Environment

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
# Capture now, while still inside the workspace — Step 5 changes directory
# before cleanup (Step 6) needs this value
WORKTREE_PATH=$(git rev-parse --show-toplevel)
```

Check `git rev-parse --show-superproject-working-tree` before interpreting differing git directories: submodules also have a separate git directory and are not proof of a linked worktree.

This determines which menu to show and how cleanup works:

| State | Menu | Cleanup |
|-------|------|---------|
| `GIT_DIR == GIT_COMMON` (normal repo) | Standard 3 options | No worktree to clean up |
| `GIT_DIR != GIT_COMMON`, named branch | Standard 3 options | Provenance-based (see Step 6) |
| `GIT_DIR != GIT_COMMON`, detached HEAD | Reduced 2 options (no merge) | Externally managed — leave in place |

## Step 3: Determine Base Branch

Use the base named in the request, plan, or repository PR configuration. Confirm the actual target from available repository context; if ambiguity remains before merging, ask a focused question. Do not silently guess `main` or switch to a different base.

## Step 4: Present Options

If integration is requested but the desired method is unspecified, these are useful options. If the user already chose one, act on that choice without asking again:

```
Implementation complete. What would you like to do?

1. Merge back to <base-branch> locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)

Which option?
```

For a detached HEAD, omit local branch merge unless a branch has been created intentionally:

```
Implementation complete. You're on a detached HEAD (externally managed workspace).

1. Push as new branch and create a Pull Request
2. Keep as-is (I'll handle it later)

Which option?
```

Adapt the wording to the actual state; do not call implementation complete unless supported. Leave work in place when integration was not requested. Discarding work requires explicit informed authorization, not an inference that the task is finished.

## Step 5: Execute Choice

### Option 1: Merge Locally

```bash
# Get main repo root for CWD safety
MAIN_ROOT=$(git -C "$(git rev-parse --git-common-dir)/.." rev-parse --show-toplevel)
cd "$MAIN_ROOT"

# Check the target's working tree and branch state before switching.
# Do not overwrite unrelated changes or pull automatically.
git checkout <base-branch>
git merge <feature-branch>

# Verify tests on merged result
<test command>
```

If tests fail on the merged result: stop, leave the worktree and branch in
place, and investigate — nothing has been pushed, so the merge is local
and recoverable.

Once the merged result is verified, remove the worktree or branch only when cleanup is part of the requested integration and ownership is known:

```bash
git branch -d <feature-branch>
```

### Option 2: Push and Create PR

```bash
git push -u origin <feature-branch>
# From a detached HEAD, name the new branch on the remote:
# git push origin HEAD:refs/heads/<new-branch>
```

Then create the pull/merge request against <base-branch> with the forge's
tooling — its CLI if one is available, or the creation URL most forges
print when you push — following the repo's PR template and conventions if
present, and report the URL to your human partner.

Keep the worktree — your human partner iterates on PR feedback there.

### Option 3: Keep As-Is

Report: "Keeping branch <name>. Worktree preserved at <path>."

### If your human partner asks to discard the work

This path exists only as a response to an explicit request to throw the
work away. Before destructive action, confirm the exact branch, commits,
workspace, and any uncommitted/untracked files that would be lost. An
existing explicit, informed authorization need not be replaced with a
magic-word ceremony. When scope is unclear, ask for confirmation:

```
Discarding <branch> and <worktree> would remove:
<commits and uncommitted/untracked files>
Please confirm that these are the items you want deleted.
```

After that authorization:

```bash
MAIN_ROOT=$(git -C "$(git rev-parse --git-common-dir)/.." rev-parse --show-toplevel)
cd "$MAIN_ROOT"
```

Then clean up the worktree (Step 6) and force-delete the branch:

```bash
git branch -D <feature-branch>
```

## Step 6: Cleanup Workspace

Cleanup is optional and scoped to the user's request. Preserve the worktree for PR iteration or when keeping the branch. When removal is authorized, first change to a safe directory outside the worktree and retain the original path and git-directory information.

**Normal repo or submodule:** No linked worktree to remove through this recipe.

**Known task-created worktree:** Verify provenance from the actual creation record or explicit user instructions. A path under `.worktrees/` or `worktrees/` alone does not prove ownership. Remove only the identified worktree:

```bash
git worktree remove "$WORKTREE_PATH"
```

**If removal is refused** (`contains modified or untracked files`): the
worktree holds files that exist nowhere else — uncommitted plans, notes,
or scratch work. Never `--force` on your own initiative. Show your human
partner what is at stake and ask:

```bash
git -C "$WORKTREE_PATH" status --porcelain -uall
```

```
Worktree removal refused — these files were never committed:

<file list>

1. Commit them to <branch> before cleanup
2. Move them into <main repo root>
3. Delete them (unrecoverable)

Which?
```

Carry out the choice, then remove the worktree.

**Externally managed or uncertain ownership:** Leave the workspace in place. Use a host workspace-exit tool only when its behavior and the requested cleanup are understood.

## Quick Reference

| Option | Merge | Push | Keep Worktree | Cleanup Branch |
|--------|-------|------|---------------|----------------|
| 1. Merge locally | yes | - | - | yes |
| 2. Create PR | - | yes | yes | - |
| 3. Keep as-is | - | - | yes | - |
| Discard (explicit request only) | - | - | - | yes (force) |

## Safety Reminders

- Integration follows the user's request, not an assumed next step.
- Check evidence against the code being integrated; do not claim stale runs cover later changes.
- Preserve branch and worktree when a merge result fails verification.
- Never force removal of uncommitted work without explicit informed authorization.
- Never clean another task's workspace merely because its path looks familiar.
- Investigate a rejected push; do not force-push unless explicitly authorized.
- Confirm the base and remote rather than risking integration into the wrong target.
