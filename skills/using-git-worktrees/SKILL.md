---
name: using-git-worktrees
description: Use when an isolated workspace is requested or useful for keeping concurrent changes separate
---

# Using Git Worktrees

## Overview

A worktree is an optional way to isolate changes. Work in the current checkout when isolation would add little value; an implementation plan alone does not require a worktree. No announcement or other skill invocation is needed.

**Core principle:** When choosing isolation, detect existing workspaces first, prefer compatible native tools, then fall back to git. Respect the user's workspace preferences and preserve their work.

## Step 0: Detect Existing Isolation

**Before creating anything, check if you are already in an isolated workspace.**

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

**Submodule guard:** `GIT_DIR != GIT_COMMON` is also true inside git submodules. Before concluding "already in a worktree," verify you are not in a submodule:

```bash
# If this returns a path, you're in a submodule, not a worktree — treat as normal repo
git rev-parse --show-superproject-working-tree 2>/dev/null
```

**If `GIT_DIR != GIT_COMMON` (and not a submodule):** You are already in a linked worktree. Skip to Step 2 (Project Setup). Do NOT create another worktree.

Report with branch state:
- On a branch: "Already in isolated workspace at `<path>` on branch `<name>`."
- Detached HEAD: "Already in isolated workspace at `<path>` (detached HEAD)." Name a branch later only if the chosen integration method needs one.

**If `GIT_DIR == GIT_COMMON` (or in a submodule):** You are in a normal repo checkout.

Honor any declared workspace preference. If isolation is not requested and offers no clear benefit, stay in place. If its benefit is material but changing workspaces would disrupt the user's setup, ask a focused question rather than treating worktree creation as a gate for the task.

## Step 1: Create Isolated Workspace

**You have two mechanisms. Try them in this order.**

### 1a. Native Worktree Tools (preferred)

If isolation has been chosen, look for a native worktree tool such as `EnterWorktree`, `WorktreeCreate`, a `/worktree` command, or a `--worktree` flag. Prefer it when compatible with the requested setup, then continue to Step 2.

Native tools handle directory placement, branch creation, and cleanup automatically. Using `git worktree add` when you have a native tool creates phantom state your harness can't see or manage.

Only proceed to Step 1b if you have no native worktree tool available.

### 1b. Git Worktree Fallback

**Only use this if Step 1a does not apply** — you have no native worktree tool available. Create a worktree manually using git.

#### Directory Selection

Follow this priority order. Explicit user preference always beats observed filesystem state.

1. **Check your instructions for a declared worktree directory preference.** If the user has already specified one, use it without asking.

2. **Check for an existing project-local worktree directory:**
   ```bash
   ls -d .worktrees 2>/dev/null     # Preferred (hidden)
   ls -d worktrees 2>/dev/null      # Alternative
   ```
   If found, use it. If both exist, `.worktrees` wins.

3. **If there is no other guidance available**, default to `.worktrees/` at the project root.

#### Safety Verification (project-local directories only)

**Before creating a project-local worktree, verify the exact chosen directory is ignored:**

```bash
git check-ignore -q -- "$LOCATION"
```

**If NOT ignored:** Add an appropriate ignore entry (repository `.gitignore` or local `.git/info/exclude`, according to project policy), then verify it. A shared ignore-file edit does not require a commit as part of this recipe. Alternatively, use an external directory.

**Why critical:** Prevents accidentally committing worktree contents to repository.

#### Create the Worktree

```bash
# Determine path based on chosen location
path="$LOCATION/$BRANCH_NAME"

git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

**Sandbox fallback:** If creation is blocked, report that limitation. Work in place only when it still meets the task's isolation and safety needs; otherwise explain the missing capability. Do not bypass the sandbox.

## Step 2: Project Setup

Inspect project setup instructions and existing dependencies. Install or build only what the task needs; a manifest's presence alone is not a reason to run package installation or network access.

## Step 3: Verify Clean Baseline

When useful, establish a baseline with a focused check or the project's required suite. Do not repeat a known baseline failure merely to confirm a user report.

```bash
# Example only: choose the scope appropriate to the work
npm test -- path/to/affected.test.ts
```

**If checks fail:** Distinguish baseline failures from worktree setup problems; report them and investigate blockers. Continue safe, independent work when possible.

**If checks pass:** Report only the scope exercised. If checks were not needed or could not run, say so instead of claiming a green baseline.

### Example Report

```
Worktree ready at <full-path>
Baseline: <check and observed result, or not run>
Workspace: <branch or detached HEAD>
```

## Quick Reference

| Situation | Action |
|-----------|--------|
| Already in linked worktree | Skip creation (Step 0) |
| In a submodule | Treat as normal repo (Step 0 guard) |
| Native worktree tool available | Use it (Step 1a) |
| No native tool | Git worktree fallback (Step 1b) |
| `.worktrees/` exists | Use it (verify ignored) |
| `worktrees/` exists | Use it (verify ignored) |
| Both exist | Use `.worktrees/` |
| Neither exists | Check instruction file, then default `.worktrees/` |
| Directory not ignored | Add appropriate ignore entry or choose external location; verify before creation |
| Permission error on create | Respect sandbox; use current workspace only if suitable |
| Baseline check fails | Report evidence and investigate relevant blockers |
| Dependencies already sufficient | Skip installation |

## Common Mistakes

- Creating a nested worktree without checking for existing isolation.
- Bypassing a compatible native tool and leaving the harness unaware of the workspace.
- Checking one directory's ignore status but creating the worktree somewhere else.
- Assuming a fresh checkout proves tests pass.
- Automatically installing dependencies, committing ignore rules, or switching workspaces when the task does not need it.
