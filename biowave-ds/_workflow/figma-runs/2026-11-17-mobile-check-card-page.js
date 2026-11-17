const p = figma.root.children.find(p => p.name.trim() === '↳ Card');
return {
  ok: true,
  pageName: p ? p.name : null,
  children: p ? p.children.map(c => ({ id: c.id, name: c.name })) : []
};