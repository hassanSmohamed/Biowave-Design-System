const cardsTop = await figma.getNodeByIdAsync('14:104');
const w10 = cardsTop.children.find(c => c.name.includes('Wave 10'));
return {
  hasW10: !!w10,
  w10Id: w10 ? w10.id : null
};
