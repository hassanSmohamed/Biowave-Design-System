const webSb = await figma.getNodeByIdAsync('694:220191');
const cb = webSb.findOne(n => n.name === 'close-button');
const icons = [];
for (const n of cb.findAll(n => n.type === 'INSTANCE')) {
  const m = await n.getMainComponentAsync();
  icons.push({
    name: n.name,
    mainName: m ? m.name : null,
    parentName: m && m.parent ? m.parent.name : null,
    key: m ? m.key : null
  });
}
return icons;
