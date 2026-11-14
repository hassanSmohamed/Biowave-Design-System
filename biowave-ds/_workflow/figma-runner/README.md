# Biowave Script Runner (Figma development plugin)

Antigravity (and Gemini CLI) can **read** Figma through the Figma MCP server but cannot **write**: Figma allows `use_figma` only for listed clients (Figma MCP docs › "Write to canvas"). This plugin runs the same Plugin API scripts inside Figma, so the agent writes the script and Hassan runs it. Free, no publishing.

## Install once (Figma desktop app, Mac or Windows)
1. Open any Biowave file in the **Figma desktop app**.
2. Menu › **Plugins › Development › Import plugin from manifest…** → choose `biowave-ds/_workflow/figma-runner/manifest.json`.
3. Run it: **Plugins › Development › Biowave Script Runner**.

## Loop with the agent
1. The agent writes the script to a file (e.g. `_workflow/figma-runs/<date>-<task>.js`) — same format as `use_figma`: top-level `await`, ends with `return …`, starts by loading fonts, never `figma.loadAllPagesAsync` / `setPluginData` / `createImageAsync`.
2. Hassan opens the **target file** (Web / Tablet / Mobile / Foundations), copies the script, clicks **Paste & Run** (or pastes and clicks **Run**).
3. **Copy result** → paste it back to the agent.
4. The agent checks the result with its read tools (`get_screenshot`, `get_metadata`) and continues.

## Notes
- Runs in the file that is open; check the file name shown after the run.
- `teamlibrary` permission is on, so library variable lookups by name work (as in the existing scripts).
- Big scripts can take a while; Figma may show "plugin is running". Do not close the file.
- Shared plugin data (`biowave` › `w8core`, the docs builder) is read with `figma.root.getSharedPluginData`, so the stored tooling works unchanged.
