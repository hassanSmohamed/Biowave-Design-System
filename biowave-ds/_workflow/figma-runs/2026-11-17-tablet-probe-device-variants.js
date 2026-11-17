const C = async (k, set) => set ? await figma.importComponentSetByKeyAsync(k) : await figma.importComponentByKeyAsync(k);
const devSet = await C('c7c9ec2e833fad1b54333707c2210744515d5339', 1);
return {
  ok: true,
  name: devSet.name,
  variants: devSet.children.map(c => c.name)
};