// Biowave Script Runner — runs a use_figma-style script (top-level await + return) in the open file.
// The script text comes from the UI (manual or localhost bridge); the result goes back to the UI.
figma.showUI(__html__, { width: 560, height: 620, themeColors: true });
figma.ui.postMessage({ type: 'init', file: figma.root.name });
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'ping') {
    figma.ui.postMessage({ type: 'init', file: figma.root.name });
    return;
  }
  if (msg.type !== 'run') return;
  const started = Date.now();
  try {
    const fn = new AsyncFunction('figma', msg.code);
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('Script timed out after 180s inside Figma')), 180000));
    const result = await Promise.race([fn(figma), timeout]);
    const text = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    figma.ui.postMessage({ type: 'done', id: msg.id || null, ok: true, text: text === undefined ? '(no return value)' : text, ms: Date.now() - started, file: figma.root.name });
  } catch (e) {
    const errText = (e && e.message ? e.message + '\n' : '') + String(e && e.stack || e);
    figma.ui.postMessage({ type: 'done', id: msg.id || null, ok: false, text: errText, ms: Date.now() - started, file: figma.root.name });
  }
};
