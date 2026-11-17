// Apply Wave 9 Web Fixes: Findings 2, 5, 10, 11
const findPage = n => figma.root.children.find(p => p.name.trim() === n);

const infoKey = "3121996eaabfa69051ae557ce13a33a30b320cbf";
const warningKey = "1023c7d93843369fa5e72e5e65e357753925daa9";
const lightbulbKey = "d3a4f61cd3aff5ef6d723d5e4897d7b71845ec25";

const infoComp = await figma.importComponentByKeyAsync(infoKey);
const warningComp = await figma.importComponentByKeyAsync(warningKey);
const lightbulbComp = await figma.importComponentByKeyAsync(lightbulbKey);

// 1. Alert (691:219739) on page ↳ Alert
const alertPage = findPage('↳ Alert');
await alertPage.loadAsync();
await figma.setCurrentPageAsync(alertPage);
const alertSet = alertPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Alert');

for (const v of alertSet.children) {
  // Finding 2: Button instance HUG, minWidth null
  const action = v.findOne(n => n.name === 'action' && n.type === 'INSTANCE');
  if (action) {
    action.minWidth = null;
    action.layoutSizingHorizontal = 'HUG';
  }
  const textGroup = v.findOne(n => n.name === 'text-group');
  if (textGroup) {
    textGroup.layoutSizingHorizontal = 'FILL';
  }

  // Finding 5: Correct glyphs
  const icon = v.findOne(n => n.name === 'icon' && n.type === 'INSTANCE');
  if (icon) {
    if (v.name.includes('Status=Info')) {
      await icon.swapComponent(infoComp);
    } else if (v.name.includes('Status=Warning')) {
      await icon.swapComponent(warningComp);
    } else if (v.name.includes('Status=Neutral')) {
      await icon.swapComponent(lightbulbComp);
    }
  }
}

// 2. Empty state (694:220298) on page ↳ Empty state
const emptyPage = findPage('↳ Empty state');
await emptyPage.loadAsync();
await figma.setCurrentPageAsync(emptyPage);
const emptySet = emptyPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Empty state');

for (const v of emptySet.children) {
  // Finding 10: Auto height (HUG)
  v.primaryAxisSizingMode = 'AUTO';
  v.layoutSizingVertical = 'HUG';

  // Finding 2: Button instances HUG, minWidth null
  const actions = v.findOne(n => n.name === 'actions');
  if (actions) {
    actions.layoutSizingHorizontal = 'HUG';
    for (const btn of actions.children) {
      if (btn.type === 'INSTANCE') {
        btn.minWidth = null;
        btn.layoutSizingHorizontal = 'HUG';
      }
    }
  }
}

// 3. Snackbar (694:220191) on page ↳ Snackbar
const snackPage = findPage('↳ Snackbar');
await snackPage.loadAsync();
await figma.setCurrentPageAsync(snackPage);
const snackSet = snackPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Snackbar');

for (const v of snackSet.children) {
  // Finding 2 & 11: Button instance HUG, minWidth null, message FILL
  const action = v.findOne(n => n.name === 'action' && n.type === 'INSTANCE');
  if (action) {
    action.minWidth = null;
    action.layoutSizingHorizontal = 'HUG';
  }
  const msg = v.findOne(n => n.name === 'message');
  if (msg) {
    msg.layoutSizingHorizontal = 'FILL';
  }
}

return {
  ok: true,
  alertCount: alertSet.children.length,
  emptyCount: emptySet.children.length,
  snackCount: snackSet.children.length
};
