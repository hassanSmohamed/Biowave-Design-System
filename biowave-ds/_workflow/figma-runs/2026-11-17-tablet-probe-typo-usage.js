const src = figma.root.getSharedPluginData("biowave", "w8core");
const matches = [];
let idx = 0;
while ((idx = src.indexOf("typo", idx)) !== -1) {
  matches.push(src.slice(Math.max(0, idx - 40), idx + 60));
  idx += 4;
}
return { ok: true, matches };