const typo = "VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/4987:2676";
const f = figma.createFrame();
f.setExplicitVariableModeForCollection(typo, "3869:8");
const mode = f.explicitVariableModes[typo];
f.remove();
return { ok: true, mode };