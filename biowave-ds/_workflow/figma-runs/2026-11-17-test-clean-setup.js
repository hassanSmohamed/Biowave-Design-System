
const log = [];
try {
  log.push("1. fonts");
  for (const f of [
    ["Inter", "Regular"], ["Inter", "Medium"], ["Inter", "Semi Bold"],
    ["IBM Plex Sans Arabic", "Regular"], ["IBM Plex Sans Arabic", "Medium"], ["IBM Plex Sans Arabic", "SemiBold"]
  ]) {
    await figma.loadFontAsync({ family: f[0], style: f[1] });
  }

  log.push("2. variables");
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
    "radius/sm": "44047be92c065ef35e4aa9ed6732645870ae38c9",
    "radius/md": "0758e506cdfd4d7a4eef6369a4851133d7eab5a4",
    "radius/xl": "a5042304656c42bab9b62a4f4ab9c6b1831b487c",
    "radius/full": "cde1a4778562f488d8f32680d4d00f7957cc2a21",
    "spacing/none": "4879183c164f25d975ac0a8664388a77a2073b80",
    "spacing/xs": "9ea993d003d5368c5100b038d51c7c8f3e95c115",
    "spacing/sm": "8332b62aa90dea8417383c59a11eee680e0f1db5",
    "spacing/md": "58c93e3cec1b6ba603371a027483e101adcef4f0",
    "spacing/lg": "6976021b7dd1218f670faa6dd403943fbe7b2638",
    "spacing/xl": "5fa0c2ce8ae034e9696038d2704e520fd8383e55",
    "spacing/2xl": "a7775480bb9a7d53f9f512cbf08b5854451df564",
    "size/control/height/md": "cb6d23a09de76b9cea37c24579dbb2a9e6e6a079",
    "size/icon/md": "eb459c673e6ca16e3c81b240f04b467717953a9a"
  };
  const V = {};
  for (const [n, k] of Object.entries(K)) {
    V[n] = await figma.variables.importVariableByKeyAsync(k);
  }

  log.push("3. styles");
  await figma.importStyleByKeyAsync("80e371f8315ffdb2da029152a20e42afcd924824");
  await figma.importStyleByKeyAsync("87a12277da6eb5157d262a0d847b277747f73b69");
  await figma.importStyleByKeyAsync("49f1d79a1ea0f0083dde003404f6295314f8804b");

  log.push("4. buttons getNodeByIdAsync");
  const btnEn = await figma.getNodeByIdAsync("77:14918");
  const btnAr = await figma.getNodeByIdAsync("77:17006");

  log.push("5. page setup");
  let page = figma.root.children.find(p => p.name.trim() === "↳ Card");
  if (!page) {
    page = figma.createPage();
    page.name = "     ↳ Card";
    const idx = figma.root.children.findIndex(p => p.name.includes("Accordion"));
    if (idx !== -1) figma.root.insertChild(idx + 1, page);
  }
  await figma.setCurrentPageAsync(page);
  log.push("6. page id: " + page.id);

  return { ok: true, log, btnEn: Boolean(btnEn), btnAr: Boolean(btnAr) };
} catch (e) {
  return { ok: false, at: log[log.length - 1], error: e.message || String(e), log };
}
