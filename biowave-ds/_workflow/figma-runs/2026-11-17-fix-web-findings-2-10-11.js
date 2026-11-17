// Fix Findings 2, 10, 11 on Web Components
// 1. Alert (691:219739)
const alertSet = await figma.getNodeByIdAsync('691:219739');
if (alertSet) {
  for (const v of alertSet.children) {
    const action = v.findOne(n => n.name === 'action' && n.type === 'INSTANCE');
    if (action) {
      action.minWidth = null;
      action.layoutSizingHorizontal = 'HUG';
    }
    const textGroup = v.findOne(n => n.name === 'text-group');
    if (textGroup) {
      textGroup.layoutSizingHorizontal = 'FILL';
    }
  }
}

// 2. Empty state (694:220298)
const emptySet = await figma.getNodeByIdAsync('694:220298');
if (emptySet) {
  for (const v of emptySet.children) {
    // Finding 10: hug vertical content
    v.primaryAxisSizingMode = 'AUTO';
    v.layoutSizingVertical = 'HUG';

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
}

// 3. Snackbar (694:220191)
const snackSet = await figma.getNodeByIdAsync('694:220191');
if (snackSet) {
  for (const v of snackSet.children) {
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
}

return {
  ok: true,
  alertVariants: alertSet?.children.length,
  emptyVariants: emptySet?.children.length,
  snackVariants: snackSet?.children.length
};
