const p = await figma.getNodeByIdAsync('181:15576');
return {
  ok: true,
  pageName: p.name,
  explicitVariableModes: p.explicitVariableModes
};