const p = await figma.getNodeByIdAsync('706:22199');
await p.loadAsync();
await figma.setCurrentPageAsync(p);

const nonSections = p.children.filter(c => c.type !== 'SECTION');
const deleted = [];
for (const node of nonSections) {
  deleted.push({ id: node.id, name: node.name, type: node.type });
  node.remove();
}

return {
  ok: true,
  deletedCount: deleted.length,
  deleted,
  remainingPageChildren: p.children.map(c => ({ id: c.id, name: c.name, type: c.type }))
};
