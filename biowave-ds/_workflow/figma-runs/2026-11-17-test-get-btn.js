
const log = [];
try {
  log.push("1. start getNodeByIdAsync");
  const btnEn = await figma.getNodeByIdAsync("77:14918");
  log.push("2. btnEn: " + (btnEn ? btnEn.name : "null"));
  return { ok: true, log };
} catch (e) {
  return { ok: false, at: log[log.length - 1], error: e.message || String(e), log };
}
