// Fix Alert on Mobile: width 328, button HUG, status glyphs
const ICONS = {
  info: '3121996eaabfa69051ae557ce13a33a30b320cbf',
  warning: '1023c7d93843369fa5e72e5e65e357753925daa9',
  lightbulb: 'd3a4f61cd3aff5ef6d723d5e4897d7b71845ec25'
};

const infoComp = await figma.importComponentByKeyAsync(ICONS.info);
const warnComp = await figma.importComponentByKeyAsync(ICONS.warning);
const lightComp = await figma.importComponentByKeyAsync(ICONS.lightbulb);

const alertSet = await figma.getNodeByIdAsync('181:16391');
let count = 0;

for (const v of alertSet.children) {
  // Width 328
  v.resize(328, v.height);
  v.layoutSizingHorizontal = 'FIXED';
  v.layoutSizingVertical = 'HUG';

  // Content FILL
  for (const c of v.children) {
    if (c.name === 'content' || c.name === 'text-content' || c.name === 'body') {
      c.layoutSizingHorizontal = 'FILL';
    }
  }

  // Button HUG
  const btn = v.findOne(n => n.type === 'INSTANCE' && (n.name === 'action' || (n.parent && n.parent.name === 'action')));
  if (btn) {
    btn.minWidth = null;
    btn.layoutSizingHorizontal = 'HUG';
  }

  // Swap icon
  const iconInst = v.findOne(n => n.name === 'icon' || n.name === 'status-icon');
  if (iconInst && iconInst.type === 'INSTANCE') {
    if (v.name.includes('Status=Info')) await iconInst.swapComponent(infoComp);
    else if (v.name.includes('Status=Warning')) await iconInst.swapComponent(warnComp);
    else if (v.name.includes('Status=Neutral')) await iconInst.swapComponent(lightComp);
    iconInst.name = 'icon';
  }
  count++;
}

return { ok: true, count };
