
const p = figma.createPage();
p.name = "_test_mode";
try {
  p.setExplicitVariableModeForCollection("VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/4987:2676", "3869:8");
  const modes = p.explicitVariableModes;
  p.remove();
  return { ok: true, modes };
} catch (e) {
  p.remove();
  return { ok: false, error: e.message };
}
