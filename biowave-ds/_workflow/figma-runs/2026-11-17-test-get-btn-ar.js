
const log = [];
try {
  log.push("1. start getNodeByIdAsync");
  const btnAr = await figma.getNodeByIdAsync("77:17006");
  log.push("2. btnAr: " + (btnAr ? btnAr.name : "null"));
  return { ok: true, log };
} catch (e) {
  return { ok: false, at: log[log.length - 1], error: e.message || String(e), log };
}
