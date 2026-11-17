
const btnEn = await figma.getNodeByIdAsync("77:14918");
const btnAr = await figma.getNodeByIdAsync("77:17006");

const checkBtn = (set, variant, color) => {
  const match = set.children.find(x => x.name.includes("Variant=" + variant) && x.name.includes("Color=" + color) && x.name.includes("Size=sm"));
  return match ? match.name : "NOT FOUND (sample: " + set.children[0].name + ")";
};

return {
  enOutlined: checkBtn(btnEn, "outlined", "neutral"),
  enFilled: checkBtn(btnEn, "filled", "brand"),
  arOutlined: checkBtn(btnAr, "outlined", "neutral"),
  arFilled: checkBtn(btnAr, "filled", "brand")
};
