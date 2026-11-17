const src = figma.root.getSharedPluginData("biowave", "w8core");
const matches = [];
let idx = 0;
while ((idx = src.indexOf("lf(", idx)) !== -1) {
  matches.push({ idx, snippet: src.slice(Math.max(0, idx - 20), idx + 30) });
  idx += 3;
}
return { ok: true, matches };