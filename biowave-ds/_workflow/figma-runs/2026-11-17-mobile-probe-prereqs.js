// Probe prerequisites on Mobile Components (249tIAxlZogRvgBBXjcIZ5)
const btnPage = figma.root.children.find(p => p.name.trim() === '↳ Button');
if (btnPage) await btnPage.loadAsync();
const btnEn = btnPage ? btnPage.findOne(n => n.type === 'COMPONENT_SET' && (n.name === '.Button _en' || n.name === 'Button')) : null;
const btnAr = btnPage ? btnPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === '.Button _ar') : null;

// Find elevation style from Popover or local effects
const popPage = figma.root.children.find(p => p.name.trim() === '↳ Popover');
let popElevId = null;
if (popPage) {
  await popPage.loadAsync();
  const pop = popPage.findOne(n => n.name === '.Popover _en' || n.name === 'Popover');
  if (pop && pop.effectStyleId) popElevId = pop.effectStyleId;
}

// Text styles
const TITLE_MD = await figma.importStyleByKeyAsync('80e371f8315ffdb2da029152a20e42afcd924824');
const BODY_MD = await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');
const BODY_SM = await figma.importStyleByKeyAsync('49f1d79a1ea0f0083dde003404f6295314f8804b');

// Icons
const CHEVRON_G = await figma.importComponentByKeyAsync('7614dc418009adcc275d35ff07afcb7b4f62b1fd');
const INFO_G = await figma.importComponentByKeyAsync('e08b509b26ac62a48693567e87f8b43551150599');

return {
  ok: true,
  file: figma.root.name,
  btnEnId: btnEn ? btnEn.id : null,
  btnArId: btnAr ? btnAr.id : null,
  btnEnName: btnEn ? btnEn.name : null,
  btnArName: btnAr ? btnAr.name : null,
  popElevId,
  styles: {
    TITLE_MD: Boolean(TITLE_MD),
    BODY_MD: Boolean(BODY_MD),
    BODY_SM: Boolean(BODY_SM)
  },
  icons: {
    chevron: Boolean(CHEVRON_G),
    info: Boolean(INFO_G)
  }
};