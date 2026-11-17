const keys = [
  'e08b509b26ac62a48693567e87f8b43551150599',
  '0042de634e564fcc79a6ba1315529f5a0da578f2',
  '39469416065e4ce9be9a64d0f7fbf7b785344237'
];
const out = [];
for (const k of keys) {
  try {
    const comp = await figma.importComponentByKeyAsync(k);
    out.push({
      key: k,
      compName: comp.name,
      parentName: comp.parent ? comp.parent.name : null
    });
  } catch (e) {
    out.push({ key: k, error: e.message });
  }
}
return out;
