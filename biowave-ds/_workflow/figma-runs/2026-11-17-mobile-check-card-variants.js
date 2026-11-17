const cs = await figma.getNodeByIdAsync("202:28604");
return {
  ok: true,
  name: cs.name,
  variantsCount: cs.children.length,
  variants: cs.children.map(c => c.name)
};