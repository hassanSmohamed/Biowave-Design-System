# Biowave Script Runner (Figma development plugin)

Antigravity (and Gemini CLI) can **read** Figma through the Figma MCP server, and **write** to Figma through this development plugin over a local bridge (`http://127.0.0.1:9876`).

## Security Architecture (Hardened)
- **Localhost only:** The bridge server binds strictly to `127.0.0.1`. It does not listen on public network interfaces (`0.0.0.0`).
- **Restricted CORS:** `Access-Control-Allow-Origin: *` is completely removed. CORS headers are only emitted for the sandboxed Figma plugin UI iframe origin (`'null'`) on long-polling endpoints (`/poll`, `/v2/poll`, `/result`).
- **Token Authentication:** The `/exec` endpoint requires an authentication token passed in the `X-Bridge-Token` header. The bridge generates a cryptographically random 256-bit token at startup, stores it with restricted file permissions (`0600`) at `_workflow/.local/bridge-token`, and verifies it on every execution request. Unauthorized requests return `401 Unauthorized`.
- **Automatic Lifecycle:** The token file is automatically deleted when the bridge server shuts down.
- **File Queue Fallback:** The file-based request queue (`_workflow/.local/v2-req-*.json`) trusts local processes with write access to `_workflow/.local/`, operating with the same local filesystem boundary as the token file.

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
   node _workflow/figma-runner/exec.mjs _workflow/figma-runs/<date>-<task>.js [targetFile]
   ```
   The plugin runs the script automatically in Figma and returns the JSON output directly to the agent.

## Manual Fallback
You can also uncheck **Auto localhost:9876**, paste any script into the plugin box, click **Run** (or **Paste & Run**), and click **Copy result**.
