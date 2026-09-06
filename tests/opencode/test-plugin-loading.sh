#!/usr/bin/env bash
# Test: Plugin Loading
# Verifies that the superpowers plugin loads correctly in OpenCode
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Test: Plugin Loading ==="

# Source setup to create isolated environment
source "$SCRIPT_DIR/setup.sh"

# Trap to cleanup on exit
trap cleanup_test_env EXIT

plugin_link="$OPENCODE_CONFIG_DIR/plugins/superpowers.js"

# Test 1: Verify plugin file exists and is registered
echo "Test 1: Checking plugin registration..."
if [ -L "$plugin_link" ]; then
    echo "  [PASS] Plugin symlink exists"
else
    echo "  [FAIL] Plugin symlink not found at $plugin_link"
    exit 1
fi

# Verify symlink target exists
if [ -f "$(readlink -f "$plugin_link")" ]; then
    echo "  [PASS] Plugin symlink target exists"
else
    echo "  [FAIL] Plugin symlink target does not exist"
    exit 1
fi

# Test 2: Verify skills directory is populated
echo "Test 2: Checking skills directory..."
skill_count=$(find "$SUPERPOWERS_SKILLS_DIR" -name "SKILL.md" | wc -l)
if [ "$skill_count" -gt 0 ]; then
    echo "  [PASS] Found $skill_count skills"
else
    echo "  [FAIL] No skills found in $SUPERPOWERS_SKILLS_DIR"
    exit 1
fi

# Test 4: Verify plugin JavaScript syntax (basic check)
echo "Test 4: Checking plugin JavaScript syntax..."
if node --check "$SUPERPOWERS_PLUGIN_FILE" 2>/dev/null; then
    echo "  [PASS] Plugin JavaScript syntax is valid"
else
    echo "  [FAIL] Plugin has JavaScript syntax errors"
    exit 1
fi

# Verify discovery preserves user configuration and remains idempotent.
node --input-type=module - "$SUPERPOWERS_PLUGIN_FILE" "$SUPERPOWERS_SKILLS_DIR" <<'JS'
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { SuperpowersPlugin } = await import(pathToFileURL(process.argv[2]));
const plugin = await SuperpowersPlugin({});
assert.equal(plugin['experimental.chat.messages.transform'], undefined);
const config = { skills: { paths: ['/personal/skills'], urls: ['https://example.com/skills'] } };
await plugin.config(config);
await plugin.config(config);
assert.deepEqual(config.skills.paths, ['/personal/skills', process.argv[3]]);
assert.deepEqual(config.skills.urls, ['https://example.com/skills']);
JS

# Test 6: Verify personal test skill was created
echo "Test 6: Checking test fixtures..."
if [ -f "$OPENCODE_CONFIG_DIR/skills/personal-test/SKILL.md" ]; then
    echo "  [PASS] Personal test skill fixture created"
else
    echo "  [FAIL] Personal test skill fixture not found"
    exit 1
fi

echo ""
echo "=== All plugin loading tests passed ==="
