# Testing Superpowers

Superpowers has two distinct kinds of tests, each in its own directory:

- **`tests/`** — does the plugin's non-LLM code work? Bash + node + python integration tests for brainstorm-server JS, OpenCode plugin loading, codex-plugin sync, and analysis utilities.
- **Live agent scenarios** — optional experiments with explicitly requested skills. Legacy workflow-compliance scenarios are not acceptance criteria for this advisory fork.

## Plugin tests

Live in `tests/`. Currently:

- `tests/brainstorm-server/` — node test suite for the brainstorm server JS code.
- `tests/opencode/` — bash tests for OpenCode discovery, preserved user configuration, and on-demand tools.
- `tests/codex-plugin-sync/` — bash sync verification.
- `tests/kimi/` — bash/Python checks for Kimi plugin manifest wiring.
- `tests/claude-code/test-helpers.sh`, `analyze-token-usage.py` — utilities used by remaining bash tests.
- `tests/claude-code/test-subagent-driven-development-integration.sh` — explicitly requested SDD execution, delivered API checks, and token analysis.
- `tests/claude-code/test-worktree-native-preference.sh` — RED-GREEN-REFACTOR validation for worktree skill (drill covers the PRESSURE phase; bash also covers RED/GREEN baselines).
- `tests/explicit-skill-requests/` — Haiku-specific, multi-turn, and skill-name-prompted tests not covered by drill.

Run plugin tests via the relevant directory's `run-*.sh` or `npm test`.

## Advisory behavior smoke checks

Install the local fork in a scratch project. In a fresh session, ask a plain factual question and confirm no startup guide or compulsory workflow appears. Then explicitly ask to load `systematic-debugging` and confirm the skill is available. Repeat after restart or compaction to check that bootstrap injection has not returned.

Useful deterministic commands from the repository root:

```bash
bun test ./tests/pi/test-pi-extension.mjs ./tests/omp/advisory-superpowers.test.ts
python3 -m pytest tests/hermes
bash tests/opencode/run-tests.sh
bash tests/kimi/run-tests.sh
bash tests/codex/test-marketplace-manifest.sh
```

The Pi adapter test needs a TypeScript-capable runtime (Bun above, or Node with native TypeScript stripping). OpenCode tests isolate `HOME`; when using an asdf Node shim, prepend the actual Node executable directory to `PATH` before running them. Codex ZIP packaging tests require `zip` and `unzip`. These checks exercise registration and discovery; they do not replace a live target-harness smoke check.
