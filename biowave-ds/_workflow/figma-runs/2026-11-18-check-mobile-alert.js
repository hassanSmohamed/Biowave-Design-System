const alertSet = await figma.getNodeByIdAsync('181:16391');
const report = [];
for (const v of alertSet.children) {
  const btn = v.findOne(n => n.type === 'INSTANCE' && (n.name === 'action' || (n.parent && n.parent.name === 'action')));
  const icon = v.findOne(n => n.name === 'icon' || n.name === 'status-icon');
  const main = icon && icon.type === 'INSTANCE' ? await icon.getMainComponentAsync() : null;
  report.push({
    name: v.name,
    width: v.width,
    btnWidth: btn ? btn.width : null,
    btnMinW: btn ? btn.minWidth : null,
    btnSizing: btn ? btn.layoutSizingHorizontal : null,
    iconParent: main && main.parent ? main.parent.name : null
  });
}
return report;
