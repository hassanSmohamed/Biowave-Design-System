const p = figma.root.children.find(x => x.name.trim() === '↳ Alert');
if (!p) return { error: 'Alert page not found' };
await p.loadAsync();
return { ok: true, page: p.name, childrenCount: p.children.length };
