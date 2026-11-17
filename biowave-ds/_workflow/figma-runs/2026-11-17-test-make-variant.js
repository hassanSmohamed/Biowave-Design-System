
const log = [];
try {
  for (const f of [
    ["Inter", "Regular"], ["Inter", "Medium"], ["Inter", "Semi Bold"],
    ["IBM Plex Sans Arabic", "Regular"], ["IBM Plex Sans Arabic", "Medium"], ["IBM Plex Sans Arabic", "SemiBold"]
  ]) {
    await figma.loadFontAsync({ family: f[0], style: f[1] });
  }

  const K = {
    "color/surface/default": "2013a1c60d84d2bac2524fd0c32229e20cc341a1",
    "color/surface/subtle": "5963036a1ce77158a13d05d89008d80267f7be1f",
    "color/border/default": "ad520e82898707a0d3112a12f6f9439566c6d6c4",
    "color/border/subtle": "07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112",
    "color/border/brand": "50ddd3d7028ede7c14f73576869a28588b0c3b7d",
    "color/text/default": "4ea63d9ab5254c4df4eba4d26f771377a07929c4",
    "color/text/subtle": "dac97f2fd2a80ccffd6283bcc06c623f64ebe90a",
    "color/text/disabled": "f88c10f90f454d356c14cc3240da0f04eafbbedd",
    "color/icon/default": "b0844bd913aafe8789a44bc7b647058cdae299df",
    "color/icon/subtle": "fc66c13d6c036489bf774535cd8dbbf749795748",
    "radius/md": "0758e506cdfd4d7a4eef6369a4851133d7eab5a4",
    "spacing/none": "4879183c164f25d975ac0a8664388a77a2073b80",
    "spacing/xs": "9ea993d003d5368c5100b038d51c7c8f3e95c115",
    "spacing/sm": "8332b62aa90dea8417383c59a11eee680e0f1db5",
    "spacing/md": "58c93e3cec1b6ba603371a027483e101adcef4f0",
    "spacing/lg": "6976021b7dd1218f670faa6dd403943fbe7b2638",
    "spacing/xl": "5fa0c2ce8ae034e9696038d2704e520fd8383e55",
    "size/control/height/lg": "14c0f56d2add6f7149374e67cf4d3a2656aeb5dc",
    "size/icon/md": "eb459c673e6ca16e3c81b240f04b467717953a9a"
  };

  const V = {};
  for (const [n, k] of Object.entries(K)) {
    V[n] = await figma.variables.importVariableByKeyAsync(k);
  }

  const paint = v => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", v);
  const rads = ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"];
  const bind = (n, ks, v) => { for (const k of ks) n.setBoundVariable(k, v); };

  const TITLE_MD = await figma.importStyleByKeyAsync("80e371f8315ffdb2da029152a20e42afcd924824");
  const BODY_MD = await figma.importStyleByKeyAsync("87a12277da6eb5157d262a0d847b277747f73b69");
  const BODY_SM = await figma.importStyleByKeyAsync("49f1d79a1ea0f0083dde003404f6295314f8804b");

  const CHEVRON_G = await figma.importComponentByKeyAsync("7614dc418009adcc275d35ff07afcb7b4f62b1fd");
  const INFO_G = await figma.importComponentByKeyAsync("e08b509b26ac62a48693567e87f8b43551150599");

  const page = figma.root.children.find(p => p.name.trim() === "↳ Accordion");
  await figma.setCurrentPageAsync(page);

  log.push("create variant component");
  const comp = figma.createComponent();
  comp.name = "Expanded=false, Language=EN";
  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(640, 100);
  bind(comp, rads, V["radius/md"]);
  comp.strokes = [paint(V["color/border/default"])];
  comp.strokeWeight = 1;
  comp.fills = [paint(V["color/surface/default"])];
  comp.clipsContent = true;

  log.push("header");
  const header = figma.createFrame();
  header.name = "header";
  header.layoutMode = "HORIZONTAL";
  header.layoutAlign = "STRETCH";
  header.counterAxisAlignItems = "CENTER";
  header.minHeight = 48;
  header.setBoundVariable("paddingLeft", V["spacing/xl"]);
  header.setBoundVariable("paddingRight", V["spacing/xl"]);
  header.setBoundVariable("paddingTop", V["spacing/xl"]);
  header.setBoundVariable("paddingBottom", V["spacing/xl"]);
  header.setBoundVariable("itemSpacing", V["spacing/lg"]);
  header.fills = [];

  log.push("icon inst");
  const iconInst = INFO_G.createInstance();
  iconInst.name = "leading-icon";
  iconInst.resize(20, 20);
  bind(iconInst, ["width", "height"], V["size/icon/md"]);
  for (const v of iconInst.findAll(n => n.type === "VECTOR")) {
    v.fills = [paint(V["color/icon/subtle"])];
  }

  log.push("text group");
  const textGroup = figma.createFrame();
  textGroup.name = "text-group";
  textGroup.layoutMode = "VERTICAL";
  textGroup.layoutGrow = 1;
  textGroup.setBoundVariable("itemSpacing", V["spacing/xs"]);
  textGroup.fills = [];

  const title = figma.createText();
  title.name = "title";
  title.characters = "Section title";
  await title.setRangeTextStyleIdAsync(0, title.characters.length, TITLE_MD.id);
  title.fills = [paint(V["color/text/default"])];
  title.layoutAlign = "STRETCH";

  textGroup.appendChild(title);

  log.push("chevron");
  const chevron = CHEVRON_G.createInstance();
  chevron.name = "chevron";
  chevron.resize(20, 20);
  bind(chevron, ["width", "height"], V["size/icon/md"]);
  for (const v of chevron.findAll(n => n.type === "VECTOR")) {
    v.fills = [paint(V["color/icon/subtle"])];
  }

  header.appendChild(iconInst);
  header.appendChild(textGroup);
  header.appendChild(chevron);
  comp.appendChild(header);

  page.appendChild(comp);
  log.push("appended: " + comp.id);

  return { ok: true, compId: comp.id, log };
} catch (e) {
  return { ok: false, at: log[log.length - 1], error: e.message || String(e), log };
}
