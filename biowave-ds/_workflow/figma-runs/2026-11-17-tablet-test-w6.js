const t0 = Date.now();
let W6 = null, W2 = null, XL = null, BG = null;
try {
  W6 = await figma.variables.getVariableByIdAsync('VariableID:99599514c759fa9e28a58abf278f73814f1a0d18/4987:213');
} catch (e) { W6 = e.message; }
try {
  W2 = await figma.variables.getVariableByIdAsync('VariableID:099f79a0492cc7bb141b6647f26b8637d2dd7021/4987:218');
} catch (e) { W2 = e.message; }
try {
  XL = await figma.variables.importVariableByKeyAsync('5fa0c2ce8ae034e9696038d2704e520fd8383e55');
} catch (e) { XL = e.message; }
try {
  BG = await figma.variables.importVariableByKeyAsync('82c8830a9ba9a3837c6d6f261cc1b43e8b6a9c08');
} catch (e) { BG = e.message; }

return {
  ms: Date.now() - t0,
  W6: Boolean(W6 && W6.id),
  W2: Boolean(W2 && W2.id),
  XL: Boolean(XL && XL.id),
  BG: Boolean(BG && BG.id)
};