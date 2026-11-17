
const p = figma.root.children.find(x => x.name.includes("Skeleton"));
try {
  await p.loadAsync();
  return { ok: true, name: p.name, childCount: p.children.length };
} catch (e) {
  return { ok: false, error: e.message };
}
