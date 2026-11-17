const s = await figma.getNodeByIdAsync('691:219739');
const results = [];
for (const v of s.children) {
  const icon = v.findOne(n => n.name === 'icon' || n.name === 'leading-icon');
  let glyphInfo = null;
  if (icon) {
    if (icon.type === 'INSTANCE') {
      const mc = await icon.getMainComponentAsync();
      glyphInfo = { type: 'INSTANCE', name: icon.name, mcName: mc ? mc.name : null, mcKey: mc ? mc.key : null };
    } else if (icon.type === 'TEXT') {
      glyphInfo = { type: 'TEXT', chars: icon.characters };
    } else {
      const t = icon.findOne(n => n.type === 'TEXT');
      const inst = icon.findOne(n => n.type === 'INSTANCE');
      glyphInfo = {
        type: icon.type,
        childText: t ? t.characters : null,
        childInst: inst ? (await inst.getMainComponentAsync())?.name : null
      };
    }
  }
  results.push({ variant: v.name, iconFound: !!icon, glyphInfo });
}
return results;
