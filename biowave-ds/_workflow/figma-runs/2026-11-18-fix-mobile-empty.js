// Fix Empty State on Mobile: actions vertical, buttons FILL, primary on top
const emptySet = await figma.getNodeByIdAsync('181:16557');
let count = 0;

for (const v of emptySet.children) {
  const actions = v.findOne(n => n.name === 'actions');
  if (actions) {
    actions.layoutMode = 'VERTICAL';
    actions.layoutSizingHorizontal = 'FILL';
    actions.primaryAxisAlignItems = 'CENTER';
    actions.counterAxisAlignItems = 'CENTER';

    const pri = actions.findOne(n => n.name === 'primary-action');
    const sec = actions.findOne(n => n.name === 'secondary-action');

    if (pri) {
      pri.minWidth = null;
      pri.layoutSizingHorizontal = 'FILL';
    }
    if (sec) {
      sec.minWidth = null;
      sec.layoutSizingHorizontal = 'FILL';
    }

    if (pri && sec) {
      actions.insertChild(0, pri);
      actions.insertChild(1, sec);
    }
  }
  count++;
}

return { ok: true, count };
