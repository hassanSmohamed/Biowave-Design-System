const p = await figma.getNodeByIdAsync('74:10');
await p.loadAsync();
const pop = p.findOne(n => n.name === '.Popover _en' || n.name === 'Popover');
return {
  ok: true,
  pageName: p.name,
  popName: pop ? pop.name : null,
  effectStyleId: pop ? pop.effectStyleId : null
};