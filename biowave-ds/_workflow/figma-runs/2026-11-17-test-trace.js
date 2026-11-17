
const log = [];
try {
  log.push("1. fonts");
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  log.push("2. variable import");
  await figma.variables.importVariableByKeyAsync("2013a1c60d84d2bac2524fd0c32229e20cc341a1");
  log.push("3. collection");
  const typo = await figma.variables.getVariableCollectionByIdAsync("VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/4987:2676");
  log.push("4. text style");
  await figma.importStyleByKeyAsync("80e371f8315ffdb2da029152a20e42afcd924824");
  log.push("5. component import chevron");
  await figma.importComponentByKeyAsync("7614dc418009adcc275d35ff07afcb7b4f62b1fd");
  log.push("6. component import info");
  await figma.importComponentByKeyAsync("e08b509b26ac62a48693567e87f8b43551150599");
  return { ok: true, log };
} catch (e) {
  return { ok: false, at: log[log.length - 1], error: e.message || String(e), log };
}
