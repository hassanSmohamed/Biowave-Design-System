const set = await figma.getNodeByIdAsync("230:662521");
return {
  ok: true,
  name: set.name,
  variants: set.children.map(c => c.name)
};