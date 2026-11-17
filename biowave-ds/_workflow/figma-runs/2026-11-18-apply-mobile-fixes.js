// 2026-11-18-apply-mobile-fixes.js
// Fixes Findings 2, 3, 4, 5, 6, 7, 8 on Biowave DS — Mobile Components

const ICONS = {
  info: '3121996eaabfa69051ae557ce13a33a30b320cbf',
  warning: '1023c7d93843369fa5e72e5e65e357753925daa9',
  lightbulb: 'd3a4f61cd3aff5ef6d723d5e4897d7b71845ec25',
  close: '59b74c3af3cc86471fc3c3da406e1af6f4653030'
};

const BUTTONS = {
  btnEnDefault: '75:25853', // .Button _en (Variant=text, Color=inverse, State=default, Size=sm)
  btnArDefault: '75:27869', // .Button _ar (Variant=text, Color=inverse, State=default, Size=sm)
  iconBtnSm: '76:60004',    // Icon Button (Toggle=false, Selected=false, Size=sm)
  appTransInverse: '76:59714' // Icon Button / Appearance (Variant=transparent, Color=inverse, State=default)
};

const RADIUS = {
  md: 'VariableID:0758e506cdfd4d7a4eef6369a4851133d7eab5a4/5321:13',
  xl: 'VariableID:a5042304656c42bab9b62a4f4ab9c6b1831b487c/5321:19'
};

const results = [];

// ==========================================
// 1. FIX ALERT (181:16391) - Findings 2, 5, 6
// ==========================================
const alertSet = await figma.getNodeByIdAsync('181:16391');
if (alertSet) {
  let alertFixed = 0;
  for (const v of alertSet.children) {
    // Finding 6: width 328px (mobile sample width 360 - 2 * spacing-xl)
    v.resize(328, v.height);
    v.layoutSizingHorizontal = 'FIXED';
    v.layoutSizingVertical = 'HUG';

    // Text container / content FILL
    for (const c of v.children) {
      if (c.name === 'content' || c.name === 'text-content' || c.name === 'body') {
        c.layoutSizingHorizontal = 'FILL';
      }
    }

    // Finding 2: Button minWidth = null, layoutSizingHorizontal = 'HUG'
    const btn = v.findOne(n => n.type === 'INSTANCE' && (n.name === 'action' || (n.parent && n.parent.name === 'action')));
    if (btn) {
      btn.minWidth = null;
      btn.layoutSizingHorizontal = 'HUG';
    }

    // Finding 5: Status icons
    const iconInst = v.findOne(n => n.name === 'icon' || n.name === 'status-icon');
    if (iconInst && iconInst.type === 'INSTANCE') {
      let targetKey = null;
      if (v.name.includes('Status=Info')) targetKey = ICONS.info;
      else if (v.name.includes('Status=Warning')) targetKey = ICONS.warning;
      else if (v.name.includes('Status=Neutral')) targetKey = ICONS.lightbulb;

      if (targetKey) {
        try {
          const comp = await figma.importComponentByKeyAsync(targetKey);
          if (comp) {
            await iconInst.swapComponent(comp);
            iconInst.name = 'icon';
          }
        } catch (e) {
          results.push(`Alert icon swap error: ${e.message}`);
        }
      }
    }
    alertFixed++;
  }
  results.push(`Alert: updated ${alertFixed} variants (width 328 + HUG buttons + status glyphs)`);
} else {
  results.push('Alert set 181:16391 not found');
}

// ==========================================
// 2. FIX EMPTY STATE (181:16557) - Findings 2, 7
// ==========================================
const emptySet = await figma.getNodeByIdAsync('181:16557');
if (emptySet) {
  let emptyFixed = 0;
  for (const v of emptySet.children) {
    const isAr = v.name.includes('Language=AR');
    const actions = v.findOne(n => n.name === 'actions');
    if (actions) {
      // Finding 7: actions VERTICAL, buttons FILL, primary on top
      actions.layoutMode = 'VERTICAL';
      actions.layoutSizingHorizontal = 'FILL';
      actions.primaryAxisAlignItems = 'CENTER';
      actions.counterAxisAlignItems = 'CENTER';

      const pri = actions.findOne(n => n.name === 'primary-action');
      const sec = actions.findOne(n => n.name === 'secondary-action');

      if (pri) {
        pri.minWidth = null;
        pri.layoutSizingHorizontal = 'FILL';
      }
      if (sec) {
        sec.minWidth = null;
        sec.layoutSizingHorizontal = 'FILL';
      }

      // Ensure primary is on top
      if (pri && sec) {
        actions.insertChild(0, pri);
        actions.insertChild(1, sec);
      }
    }
    emptyFixed++;
  }
  results.push(`Empty State: updated ${emptyFixed} variants (vertical actions, FILL buttons, primary on top)`);
} else {
  results.push('Empty state set 181:16557 not found');
}

// ==========================================
// 3. FIX SNACKBAR (181:16450) - Findings 2, 3, 4
// ==========================================
const snackbarSet = await figma.getNodeByIdAsync('181:16450');
if (snackbarSet) {
  const iconBtnMaster = await figma.getNodeByIdAsync(BUTTONS.iconBtnSm);
  const appTransMaster = await figma.getNodeByIdAsync(BUTTONS.appTransInverse);
  const btnEnMaster = await figma.getNodeByIdAsync(BUTTONS.btnEnDefault);
  const btnArMaster = await figma.getNodeByIdAsync(BUTTONS.btnArDefault);
  const closeIconComp = await figma.importComponentByKeyAsync(ICONS.close);
  const rMdVar = await figma.variables.getVariableByIdAsync(RADIUS.md);
  const rXlVar = await figma.variables.getVariableByIdAsync(RADIUS.xl);

  // Helper to configure a variant's controls
  async function configureSnackbarVariant(v, isAr, withAction) {
    // Remove old hand-drawn frames
    const oldActionBtn = v.findOne(n => n.name === 'action-button' || (n.name === 'action' && n.type === 'FRAME'));
    const oldCloseBtn = v.findOne(n => n.name === 'close-button' && n.type === 'FRAME');
    if (oldActionBtn) oldActionBtn.remove();
    if (oldCloseBtn) oldCloseBtn.remove();

    // Ensure message text node is FILL
    const msg = v.findOne(n => n.name === 'message');
    if (msg) {
      msg.layoutSizingHorizontal = 'FILL';
      msg.layoutSizingVertical = 'HUG';
    }

    // Close button
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

    // Action button
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

  // 1. First, configure the existing 4 variants as Android
  const origVariants = [...snackbarSet.children];
  for (const v of origVariants) {
    const isAr = v.name.includes('Language=AR');
    const withAction = v.name.includes('Action=With action');
    await configureSnackbarVariant(v, isAr, withAction);

    // Bind radius-md for Android
    if (rMdVar) {
      for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
        v.setBoundVariable(k, rMdVar);
      }
    }
    v.cornerRadius = 8;

    // Update name to include OS=Android
    const actionPart = withAction ? 'Action=With action' : 'Action=None';
    const langPart = isAr ? 'Language=AR' : 'Language=EN';
    v.name = `${actionPart}, OS=Android, ${langPart}`;
  }

  // 2. Check if iOS variants already exist, or create them by duplicating
  let iosVariants = snackbarSet.children.filter(c => c.name.includes('OS=iOS'));
  if (iosVariants.length === 0) {
    for (const v of origVariants) {
      const isAr = v.name.includes('Language=AR');
      const withAction = v.name.includes('Action=With action');

      // Duplicate variant
      const iosV = v.clone();
      const actionPart = withAction ? 'Action=With action' : 'Action=None';
      const langPart = isAr ? 'Language=AR' : 'Language=EN';
      iosV.name = `${actionPart}, OS=iOS, ${langPart}`;

      // Bind radius-xl for iOS
      if (rXlVar) {
        for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) {
          iosV.setBoundVariable(k, rXlVar);
        }
      }
      iosV.cornerRadius = 12;

      // iOS leading icon is ON by default
      const icon = iosV.findOne(n => n.name === 'icon');
      if (icon) icon.visible = true;

      // Position: y = v.y + 192 (below Android rows)
      iosV.x = v.x;
      iosV.y = v.y + 192;

      snackbarSet.appendChild(iosV);
    }
  } else {
    // If iOS variants already exist, configure them
    for (const v of iosVariants) {
      const isAr = v.name.includes('Language=AR');
      const withAction = v.name.includes('Action=With action');
      await configureSnackbarVariant(v, isAr, withAction);
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

  // Resize set frame to fit 8 variants
  snackbarSet.resize(snackbarSet.width, 440);
  results.push(`Snackbar: 8 variants configured (OS=Android · iOS, real controls, radius md/xl)`);
} else {
  results.push('Snackbar set 181:16450 not found');
}

// ==========================================
// 4. UNCLIP DOCS PAGES (Finding 8)
// ==========================================
const DOC_SECTIONS = ['181:21193', '181:23218', '181:25525', '181:27012'];
let unclippedTotal = 0;
for (const secId of DOC_SECTIONS) {
  const sec = await figma.getNodeByIdAsync(secId);
  if (!sec) continue;
  for (const node of sec.findAll(n => n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE')) {
    if (node.clipsContent) {
      node.clipsContent = false;
      unclippedTotal++;
    }
  }
}
results.push(`Docs: unclipped ${unclippedTotal} frames across Mobile docs sections`);

return results;
