const webSb = await figma.getNodeByIdAsync('694:220191');
const cb = webSb.findOne(n => n.name === 'close-button');
const children = [];
for (const c of cb.children) {
  const main = c.type === 'INSTANCE' ? await c.getMainComponentAsync() : null;
  children.push({
    name: c.name,
    type: c.type,
    mainName: main ? main.name : null,
    mainKey: main ? main.key : null,
    parentSet: main && main.parent ? main.parent.name : null,
    boundVariables: c.boundVariables
  });
}
return {
  cbName: cb.name,
  cbCompProps: cb.componentProperties,
  main: (await cb.getMainComponentAsync()).name,
  children
};
