# Pi Tool Mapping

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). On Pi these resolve to the tools below.

This is optional tool reference, not a workflow requirement. Consult the mappings only for actions you choose to take; the active tool catalog and governing instructions take precedence.

| Action skills request | Pi equivalent |
| --- | --- |
| Dispatch a subagent (`Subagent (general-purpose):` template) | Use an installed subagent tool such as `subagent` from `pi-subagents` if available |
| Task tracking, when useful | Use an installed todo/task tool or an existing plan; no new tracking file is necessary |

## Subagents

Pi core does not ship a standard subagent tool. The `pi-subagents` package is a strong optional companion and provides a `subagent` tool with single-agent, chain, parallel, async, forked-context, and resume/status workflows. If no subagent tool is available, do not fabricate `Task` calls; execute sequentially in the current session or explain that the optional subagent capability is not installed.

## Task lists

Pi core does not ship a standard task-list tool. If tracking would help, use an installed tool or an existing plan. Older docs may refer to `TodoWrite`; treat that as optional task tracking, not a reason to create `TODO.md` or a plan file.
