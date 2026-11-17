const t0 = Date.now();
try {
  const typo = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
  return { ms: Date.now() - t0, ok: true, typo: typo ? typo.name : null };
} catch (e) {
  return { ms: Date.now() - t0, ok: false, error: e.message };
}