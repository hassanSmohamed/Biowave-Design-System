// Fix Mobile Snackbar: real controls, OS=Android · iOS, radius md/xl
const ICONS = {
  close: '59b74c3af3cc86471fc3c3da406e1af6f4653030'
};

const BUTTONS = {
  btnEnDefault: '75:25853',
  btnArDefault: '75:27869',
  iconBtnSm: '76:60004',
  appTransInverse: '76:59714'
};

const RADIUS = {
  md: 'VariableID:0758e506cdfd4d7a4eef6369a4851133d7eab5a4/5321:13',
  xl: 'VariableID:a5042304656c42bab9b62a4f4ab9c6b1831b487c/5321:19'
};

const snackbarSet = await figma.getNodeByIdAsync('181:16450');
if (!snackbarSet) return { ok: false, error: 'Snackbar set 181:16450 not found' };

const iconBtnMaster = await figma.getNodeByIdAsync(BUTTONS.iconBtnSm);
const appTransMaster = await figma.getNodeByIdAsync(BUTTONS.appTransInverse);
const btnEnMaster = await figma.getNodeByIdAsync(BUTTONS.btnEnDefault);
const btnArMaster = await figma.getNodeByIdAsync(BUTTONS.btnArDefault);
const closeIconComp = await figma.importComponentByKeyAsync(ICONS.close);
const rMdVar = await figma.variables.getVariableByIdAsync(RADIUS.md);
const rXlVar = await figma.variables.getVariableByIdAsync(RADIUS.xl);

async function configureVariant(v, isAr, withAction) {
  // Remove hand-drawn frames
  const oldActionBtn = v.findOne(n => n.name === 'action-button' || (n.name === 'action' && n.type === 'FRAME'));
  const oldCloseBtn = v.findOne(n => n.name === 'close-button' && n.type === 'FRAME');
  if (oldActionBtn) oldActionBtn.remove();
  if (oldCloseBtn) oldCloseBtn.remove();

  // Message FILL
  const msg = v.findOne(n => n.name === 'message');
  if (msg) {
    msg.layoutSizingHorizontal = 'FILL';
    msg.layoutSizingVertical = 'HUG';
  }

  // Real close button
  let closeBtn = v.findOne(n => n.name === 'close-button' && n.type === 'INSTANCE');
  if (!closeBtn && iconBtnMaster) {
    closeBtn = iconBtnMaster.createInstance();
    closeBtn.name = 'close-button';
    v.appendChild(closeBtn);
  }
  if (closeBtn) {
    const app = closeBtn.findOne(n => n.name === 'Appearance');
    if (app && appTransMaster && app.type === 'INSTANCE') {
      await app.swapComponent(appTransMaster);
    }
    if (closeIconComp) {
      for (const ic of closeBtn.findAll(n => n.name === 'Outlined icon' || n.name === 'Filled icon')) {
        if (ic.type === 'INSTANCE') await ic.swapComponent(closeIconComp);
      }
    }
  }

  // Real action button
  let actionBtn = v.findOne(n => n.name === 'action' && n.type === 'INSTANCE');
  if (withAction) {
    const master = isAr ? btnArMaster : btnEnMaster;
    if (!actionBtn && master) {
      actionBtn = master.createInstance();
      actionBtn.name = 'action';
      v.appendChild(actionBtn);
    }
    if (actionBtn) {
      if (master) await actionBtn.swapComponent(master);
      actionBtn.minWidth = null;
      actionBtn.layoutSizingHorizontal = 'HUG';
      const labelNode = actionBtn.findOne(n => n.type === 'TEXT');
      if (labelNode) {
        const font = labelNode.fontName;
        if (font && font !== figma.mixed) await figma.loadFontAsync(font);
        labelNode.characters = isAr ? 'تراجع' : 'Undo';
      }
    }
  } else if (actionBtn) {
    actionBtn.remove();
  }

  // Reorder children
  const icon = v.findOne(n => n.name === 'icon');
  const finalClose = v.findOne(n => n.name === 'close-button');
  const finalAction = v.findOne(n => n.name === 'action');

  if (!isAr) {
    if (icon) v.appendChild(icon);
    if (msg) v.appendChild(msg);
    if (finalAction) v.appendChild(finalAction);
    if (finalClose) v.appendChild(finalClose);
  } else {
    if (finalClose) v.appendChild(finalClose);
    if (finalAction) v.appendChild(finalAction);
    if (msg) v.appendChild(msg);
    if (icon) v.appendChild(icon);
  }
}

// 1. Configure the 4 Android variants
const origVariants = [...snackbarSet.children].filter(c => !c.name.includes('OS=iOS'));
for (const v of origVariants) {
  const isAr = v.name.includes('Language=AR');
  const withAction = v.name.includes('Action=With action');
  await configureVariant(v, isAr, withAction);

  if (rMdVar) {
    for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
      v.setBoundVariable(k, rMdVar);
    }
  }
  v.cornerRadius = 8;

  const actionPart = withAction ? 'Action=With action' : 'Action=None';
  const langPart = isAr ? 'Language=AR' : 'Language=EN';
  v.name = `${actionPart}, OS=Android, ${langPart}`;
}

// 2. Clone for iOS variants if not present
let iosVariants = snackbarSet.children.filter(c => c.name.includes('OS=iOS'));
if (iosVariants.length === 0) {
  for (const v of origVariants) {
    const isAr = v.name.includes('Language=AR');
    const withAction = v.name.includes('Action=With action');

    const iosV = v.clone();
    const actionPart = withAction ? 'Action=With action' : 'Action=None';
    const langPart = isAr ? 'Language=AR' : 'Language=EN';
    iosV.name = `${actionPart}, OS=iOS, ${langPart}`;

    if (rXlVar) {
      for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
        iosV.setBoundVariable(k, rXlVar);
      }
    }
    iosV.cornerRadius = 12;

    const icon = iosV.findOne(n => n.name === 'icon');
    if (icon) icon.visible = true;

    iosV.x = v.x;
    iosV.y = v.y + 192;

    snackbarSet.appendChild(iosV);
  }
} else {
  for (const v of iosVariants) {
    const isAr = v.name.includes('Language=AR');
    const withAction = v.name.includes('Action=With action');
    await configureVariant(v, isAr, withAction);
    if (rXlVar) {
      for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
        v.setBoundVariable(k, rXlVar);
      }
    }
    v.cornerRadius = 12;
    const icon = v.findOne(n => n.name === 'icon');
    if (icon) icon.visible = true;
  }
}

snackbarSet.resize(snackbarSet.width, 440);

return {
  ok: true,
  variantsCount: snackbarSet.children.length,
  variantNames: snackbarSet.children.map(c => c.name)
};
