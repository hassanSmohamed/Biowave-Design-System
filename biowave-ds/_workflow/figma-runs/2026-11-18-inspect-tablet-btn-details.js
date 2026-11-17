const iconBtnSet = await figma.getNodeByIdAsync('77:50515');
const variants = iconBtnSet.children.map(c => ({
  id: c.id,
  name: c.name
}));

// Also find .Button _en and .Button _ar variants for Size=sm, Color=inverse, Variant=text
let btnEnSm = null, btnArSm = null;
const pages = figma.root.children;
for (const p of pages) {
  if (p.name.includes('Button')) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === 'COMPONENT')) {
      if (c.parent && c.parent.name === '.Button _en' && c.name.includes('Variant=text') && c.name.includes('Color=inverse') && c.name.includes('Size=sm')) {
        btnEnSm = { id: c.id, name: c.name };
      }
      if (c.parent && c.parent.name === '.Button _ar' && c.name.includes('Variant=text') && c.name.includes('Color=inverse') && c.name.includes('Size=sm')) {
        btnArSm = { id: c.id, name: c.name };
      }
    }
  }
}

// Find Icon Button Appearance Color=inverse in Tablet
let appInverse = null;
for (const p of pages) {
  if (p.name.includes('Icon Button') || p.name.includes('IconButton')) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === 'COMPONENT')) {
      if (c.parent && c.parent.name === 'Icon Button / Appearance' && c.name.includes('Color=inverse')) {
        appInverse = { id: c.id, name: c.name };
      }
    }
  }
}

return {
  variantsCount: variants.length,
  sampleVariant: variants.find(v => v.name.includes('Size=sm')),
  btnEnSm,
  btnArSm,
  appInverse
};
