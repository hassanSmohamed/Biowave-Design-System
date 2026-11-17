const p = figma.root.children.find(x => x.name.trim() === '↳ Alert');
if (!p) return { error: 'Alert page not found' };
await p.loadAsync();
await figma.setCurrentPageAsync(p);
const set = p.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Alert');
return { ok: true, page: p.name, setId: set?.id, variantsCount: set?.children.length };
