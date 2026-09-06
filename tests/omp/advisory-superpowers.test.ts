import { describe, expect, test } from "bun:test";
import advisorySuperpowers from "../../.omp/advisory-superpowers";
import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

function loadHandler() {
  let handler: (event: { systemPrompt: string[] }) => { systemPrompt: string[] } | undefined;
  advisorySuperpowers({
    on(event: string, callback: typeof handler) {
      expect(event).toBe("before_agent_start");
      handler = callback;
    },
  } as unknown as ExtensionAPI);
  return (systemPrompt: string[]) => handler({ systemPrompt });
}

describe("OMP advisory workflow policy", () => {
  test("changes workflow selection without replacing unrelated prompt blocks", () => {
    const run = loadHandler();
    const safety = "Ask before destroying user data.";
    const result = run(["Matching skill → MUST read `skill://<name>` first.", safety])!;
    expect(result.systemPrompt[0]).toContain("are optional reference guides");
    expect(result.systemPrompt[0]).toContain("For other matching domain skills, read");
    expect(result.systemPrompt[1]).toBe(safety);
    expect(run(result.systemPrompt)).toBeUndefined();
  });

  test("handles the custom-system-prompt policy without discarding user context", () => {
    const run = loadHandler();
    const result = run(["User context\nSkills are specialized knowledge. Scan descriptions for your task domain.\nIf a skill applies, you MUST read `skill://<name>` before proceeding.\nAdditional requirements"]);
    expect(result?.systemPrompt[0]).toStartWith("User context\n");
    expect(result?.systemPrompt[0]).toEndWith("\nAdditional requirements");
    expect(result?.systemPrompt[0]).toContain("are optional reference guides");
  });

  test("leaves unknown policy formats untouched instead of rewriting broadly", () => {
    expect(loadHandler()(["A host-specific safety policy with MUST in its text."])).toBeUndefined();
  });
});
