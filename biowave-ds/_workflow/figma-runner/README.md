# Biowave Script Runner (Figma development plugin)

Antigravity (and Gemini CLI) can **read** Figma through the Figma MCP server, and **write** to Figma through this development plugin over a local bridge (`http://127.0.0.1:9876`).

## Install once (Figma desktop app, Mac or Windows)
1. Open any Biowave file in the **Figma desktop app**.
2. Menu › **Plugins › Development › Import plugin from manifest…** → choose `biowave-ds/_workflow/figma-runner/manifest.json`.
3. Run it: **Plugins › Development › Biowave Script Runner**.

## Automatic Loop (localhost:9876)
1. Start the bridge daemon:
   ```bash
   node _workflow/figma-runner/bridge.mjs
   ```
2. Keep **Biowave Script Runner** open in the target Figma file (the badge turns green: `🟢 localhost:9876 · <file>`).
3. The agent writes a script to `_workflow/figma-runs/<date>-<task>.js` and runs:
   ```bash
   node _workflow/figma-runner/exec.mjs _workflow/figma-runs/<date>-<task>.js
   ```
   The plugin runs the script automatically in Figma and returns the JSON output directly to the agent.

## Manual Fallback
You can also uncheck **Auto localhost:9876**, paste any script into the plugin box, click **Run** (or **Paste & Run**), and click **Copy result**.
