// Inspect Mobile components: buttons, radius, elevation, current snackbar
const sb = await figma.getNodeByIdAsync('181:16450');
const pages = figma.root.children;

// Find Button and Icon Button in Mobile
let btnEn = null, btnAr = null, iconBtn = null, appTransInverse = null;
for (const p of pages) {
  if (p.name.includes('Button')) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === 'COMPONENT')) {
      if (c.parent && c.parent.name === '.Button _en' && c.name.includes('Variant=text') && c.name.includes('Color=inverse') && c.name.includes('Size=sm') && c.name.includes('State=default')) {
        btnEn = { id: c.id, name: c.name };
      }
      if (c.parent && c.parent.name === '.Button _ar' && c.name.includes('Variant=text') && c.name.includes('Color=inverse') && c.name.includes('Size=sm') && c.name.includes('State=default')) {
        btnAr = { id: c.id, name: c.name };
      }
    }
  }
  if (p.name.includes('Icon Button') || p.name.includes('IconButton')) {
    await p.loadAsync();
    for (const s of p.findAll(n => n.type === 'COMPONENT_SET')) {
      if (s.name === 'Icon Button') iconBtn = { id: s.id, name: s.name };
    }
    for (const c of p.findAll(n => n.type === 'COMPONENT')) {
      if (c.parent && c.parent.name === 'Icon Button / Appearance' && c.name.includes('Variant=transparent') && c.name.includes('Color=inverse') && c.name.includes('State=default')) {
        appTransInverse = { id: c.id, name: c.name };
      }
    }
  }
}

// Find radius variables and Elevation style
const radiusVars = [];
for (const v of await figma.variables.getLocalVariablesAsync()) {
  if (v.name.includes('radius/')) {
    radiusVars.push({ id: v.id, name: v.name, key: v.key });
  }
}

const effectStyles = [];
for (const s of await figma.getLocalEffectStylesAsync()) {
  if (s.name.includes('Elevation')) {
    effectStyles.push({ id: s.id, name: s.name, key: s.key });
  }
}

// Current sb variants
const currentSbVariants = sb.children.map(c => ({
  id: c.id,
  name: c.name,
  width: c.width,
  height: c.height,
  cornerRadius: c.cornerRadius,
  boundVariables: c.boundVariables
}));

return {
  btnEn,
  btnAr,
  iconBtn,
  appTransInverse,
  radiusVars,
  effectStyles,
  currentSbVariants
};
