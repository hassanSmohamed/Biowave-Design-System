// Inspect Tablet Snackbar and Button / Icon Button in Tablet file
const snackbarSet = await figma.getNodeByIdAsync('218:650210');
const alertSet = await figma.getNodeByIdAsync('218:650151');

// Find Button and Icon Button in Tablet file
const pages = figma.root.children;
let btnEn = null, btnAr = null, iconBtn = null;

for (const p of pages) {
  if (p.name.includes('Button')) {
    await p.loadAsync();
    for (const c of p.findAll(n => n.type === 'COMPONENT')) {
      if (c.name.includes('.Button _en') || (c.parent && c.parent.name.includes('.Button _en'))) {
        if (!btnEn) btnEn = { id: c.id, name: c.name, parent: c.parent ? c.parent.name : null };
      }
      if (c.name.includes('.Button _ar') || (c.parent && c.parent.name.includes('.Button _ar'))) {
        if (!btnAr) btnAr = { id: c.id, name: c.name, parent: c.parent ? c.parent.name : null };
      }
    }
  }
  if (p.name.includes('Icon Button') || p.name.includes('IconButton')) {
    await p.loadAsync();
    for (const s of p.findAll(n => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT')) {
      if (s.name === 'Icon Button' || s.name === 'IconButton') {
        iconBtn = { id: s.id, name: s.name, type: s.type };
      }
    }
  }
}

// Inspect Snackbar variant structure
const sbVar = snackbarSet.children[0];
const sbChildren = sbVar.children.map(c => ({
  name: c.name,
  type: c.type,
  layoutSizingHorizontal: c.layoutSizingHorizontal,
  layoutSizingVertical: c.layoutSizingVertical
}));

// Inspect Alert status icons
const alertIcons = [];
for (const v of alertSet.children) {
  const iconInst = v.findOne(n => n.name === 'icon' || n.name === 'status-icon' || n.name === 'Leading icon');
  if (iconInst) {
    const main = iconInst.type === 'INSTANCE' ? await iconInst.getMainComponentAsync() : null;
    alertIcons.push({
      variant: v.name,
      iconName: iconInst.name,
      mainName: main ? main.name : null,
      mainKey: main ? main.key : null
    });
  }
}

return {
  btnEn,
  btnAr,
  iconBtn,
  sbChildren,
  alertIcons
};
