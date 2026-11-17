let src = figma.root.getSharedPluginData('biowave', 'w8core');
const lines = src.split('\n');
return {
  ok: true,
  totalLines: lines.length,
  lines50to90: lines.slice(50, 95).map((l, i) => `${i + 50}: ${l}`)
};