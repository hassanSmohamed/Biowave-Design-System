// Biowave Script Runner — runs a use_figma-style script (top-level await + return) in the open file.
// The script text comes from the UI; the result (or error) goes back to the UI to copy.
figma.showUI(__html__, { width: 560, height: 620, themeColors: true });
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'run') return;
  const started = Date.now();
  try {
    const fn = new AsyncFunction('figma', msg.code);
    const result = await fn(figma);
    const text = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    figma.ui.postMessage({ type: 'done', ok: true, text: text === undefined ? '(no return value)' : text, ms: Date.now() - started, file: figma.root.name });
  } catch (e) {
    figma.ui.postMessage({ type: 'done', ok: false, text: String(e && e.stack || e), ms: Date.now() - started, file: figma.root.name });
  }
};
