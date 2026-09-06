import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

// OMP 18.1.x emits these two skill-policy forms. Replace only that policy;
// leave domain skills, tool safety, verification, and the rest of the prompt intact.
const policies = [
  "Matching skill → MUST read `skill://<name>` first.",
  "Skills are specialized knowledge. Scan descriptions for your task domain.\nIf a skill applies, you MUST read `skill://<name>` before proceeding.",
];
const workflowSkills = [
  "using-superpowers", "brainstorming", "writing-plans", "executing-plans",
  "subagent-driven-development", "dispatching-parallel-agents", "test-driven-development",
  "systematic-debugging", "verification-before-completion", "requesting-code-review",
  "receiving-code-review", "using-git-worktrees", "finishing-a-development-branch", "writing-skills",
];
const advisory = `Superpowers workflow skills (${workflowSkills.join(", ")}) are optional reference guides. Consult them when explicitly requested or clearly useful. Answer questions and perform straightforward authorized edits directly. Scale planning, testing, review, isolation, and delegation to risk and complexity; selecting one skill does not require another workflow. Preserve truthful verification and all applicable safety requirements. For other matching domain skills, read \`skill://<name>\` before proceeding.`;

export default function advisorySuperpowers(pi: ExtensionAPI) {
  pi.on("before_agent_start", (event) => {
    const systemPrompt = event.systemPrompt.map((part) => {
      for (const policy of policies) part = part.replaceAll(policy, advisory);
      return part;
    });
    if (systemPrompt.some((part, index) => part !== event.systemPrompt[index])) {
      return { systemPrompt };
    }
  });
}
