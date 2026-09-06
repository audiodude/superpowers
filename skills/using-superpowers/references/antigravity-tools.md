# Antigravity CLI (`agy`) Tool Mapping

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). On the Antigravity CLI (`agy`) these resolve to the tools below.

Optional reference only: task artifacts and subagents are not prerequisites. Follow the active tool catalog and governing instructions if they differ from these mappings.

| Action skills request | Antigravity CLI equivalent |
|----------------------|----------------------|
| Dispatch a subagent (`Subagent (general-purpose):` template) | `invoke_subagent` with a built-in `TypeName` — `self` for full-capability work, `research` for read-only |
| Task tracking ("create a todo", "mark complete") | a **task artifact** — `write_to_file` with `IsArtifact: true` and `ArtifactType: "task"` (see [Task tracking](#task-tracking)). **Not** `manage_task`, which manages background processes. |

## Task tracking

Antigravity has **no todo tool** (`manage_task` manages background
processes — `list`/`kill`/`status`/`send_input` — it is not a checklist).
If a durable checklist would help, a **task artifact** can be saved with
`write_to_file` (`IsArtifact: true`, `ArtifactMetadata.ArtifactType: "task"`)
and edited with `replace_file_content` or `multi_replace_file_content`.

Use an existing plan or in-chat outline when sufficient. If you choose an
artifact, keep it aligned with actual progress; no artifact or step-by-step
tracking is required by this reference.
