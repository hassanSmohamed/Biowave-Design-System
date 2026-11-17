const pages = figma.root.children;
let btnEnDefault = null, btnArDefault = null, appTransInverse = null;

for (const p of pages) {
  if (p.name.includes('Button')) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === 'COMPONENT')) {
      if (c.parent && c.parent.name === '.Button _en' && c.name.includes('Variant=text') && c.name.includes('Color=inverse') && c.name.includes('Size=sm') && c.name.includes('State=default')) {
        btnEnDefault = { id: c.id, name: c.name };
      }
      if (c.parent && c.parent.name === '.Button _ar' && c.name.includes('Variant=text') && c.name.includes('Color=inverse') && c.name.includes('Size=sm') && c.name.includes('State=default')) {
        btnArDefault = { id: c.id, name: c.name };
      }
    }
  }
  if (p.name.includes('Icon Button') || p.name.includes('IconButton')) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === 'COMPONENT')) {
      if (c.parent && c.parent.name === 'Icon Button / Appearance' && c.name.includes('Variant=transparent') && c.name.includes('Color=inverse') && c.name.includes('State=default')) {
        appTransInverse = { id: c.id, name: c.name };
      }
    }
  }
}

return { btnEnDefault, btnArDefault, appTransInverse };
