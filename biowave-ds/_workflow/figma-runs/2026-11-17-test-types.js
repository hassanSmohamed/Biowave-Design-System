
const c = await figma.importComponentByKeyAsync("7614dc418009adcc275d35ff07afcb7b4f62b1fd");
const i = await figma.importComponentByKeyAsync("e08b509b26ac62a48693567e87f8b43551150599");
return {
  cType: c.type,
  cName: c.name,
  iType: i.type,
  iName: i.name
};
