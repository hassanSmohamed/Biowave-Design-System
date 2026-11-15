const sets = ['116:5183', '116:30310'];
const out = {};
for (const id of sets) {
  const s = await figma.getNodeByIdAsync(id);
  out[s.name] = Object.entries(s.componentPropertyDefinitions).map(([k, v]) => ({ k, type: v.type, pref: v.preferredValues }));
}
// Also check nested icon swap props in Button _en and Icon Button
const btn = await figma.getNodeByIdAsync('116:5183');
const defBtn = btn.defaultVariant;
const nested = [];
for (const inst of defBtn.findAll(n => n.type === 'INSTANCE')) {
  nested.push({ name: inst.name, props: Object.keys(inst.componentProperties) });
}
const ib = await figma.getNodeByIdAsync('116:30310');
const defIb = ib.defaultVariant;
for (const inst of defIb.findAll(n => n.type === 'INSTANCE')) {
  nested.push({ name: 'IB/' + inst.name, props: Object.keys(inst.componentProperties), subProps: inst.componentProperties });
}
return { out, nested };
