for (const pn of ['↳ Button', '↳ Icon Button']) {
  const p = figma.root.children.find(x => x.name.trim() === pn);
  if (p) await p.loadAsync();
}
const btnEn = await figma.getNodeByIdAsync('116:5183');
const btnAr = await figma.getNodeByIdAsync('116:7271');
const iconBtn = await figma.getNodeByIdAsync('116:30310');

const sampleSet = (set) => ({
  id: set.id,
  name: set.name,
  props: Object.keys(set.componentPropertyDefinitions).map(k => ({
    key: k,
    type: set.componentPropertyDefinitions[k].type,
    def: set.componentPropertyDefinitions[k].defaultValue,
    opts: set.componentPropertyDefinitions[k].variantOptions
  })),
  smVariants: set.children.filter(c => c.name.includes('Size=sm')).slice(0, 10).map(c => c.name),
  inverseVariants: set.children.filter(c => c.name.includes('inverse')).slice(0, 8).map(c => c.name)
});

return {
  btnEn: sampleSet(btnEn),
  btnAr: { id: btnAr.id, count: btnAr.children.length, sample: btnAr.children.slice(0, 4).map(c => c.name) },
  iconBtn: sampleSet(iconBtn),
  pageNames: figma.root.children.map(p => p.name)
};
