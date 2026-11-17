// 2026-11-18-apply-tablet-fixes.js
// Fixes Findings 2, 4, 5, 8 on Biowave DS — Tablet Components

const ICONS = {
  info: '3121996eaabfa69051ae557ce13a33a30b320cbf',
  warning: '1023c7d93843369fa5e72e5e65e357753925daa9',
  lightbulb: 'd3a4f61cd3aff5ef6d723d5e4897d7b71845ec25',
  close: '59b74c3af3cc86471fc3c3da406e1af6f4653030'
};

const BUTTONS = {
  btnEnDefault: '77:16363', // .Button _en (Variant=text, Color=inverse, State=default, Size=sm)
  btnArDefault: '77:18379', // .Button _ar (Variant=text, Color=inverse, State=default, Size=sm)
  iconBtnSm: '77:50516',    // Icon Button (Toggle=false, Selected=false, Size=sm)
  appTransInverse: '77:50226' // Icon Button / Appearance (Variant=transparent, Color=inverse, State=default)
};

const results = [];

// ==========================================
// 1. FIX ALERT (218:650151) - Findings 2 & 5
// ==========================================
const alertSet = await figma.getNodeByIdAsync('218:650151');
if (alertSet) {
  let alertFixed = 0;
  for (const v of alertSet.children) {
    // Finding 2: Button minWidth = null, layoutSizingHorizontal = 'HUG'
    const btn = v.findOne(n => n.type === 'INSTANCE' && (n.name === 'action' || (n.parent && n.parent.name === 'action')));
    if (btn) {
      btn.minWidth = null;
      btn.layoutSizingHorizontal = 'HUG';
      alertFixed++;
    }
    // Also ensure text container / content is FILL
    const content = v.findOne(n => n.name === 'content' || n.name === 'text-content' || n.name === 'body');
    if (content && content.layoutSizingHorizontal) {
      content.layoutSizingHorizontal = 'FILL';
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
  }
  results.push(`Alert: updated ${alertFixed} variants (buttons + status glyphs)`);
} else {
  results.push('Alert set 218:650151 not found');
}

// ==========================================
// 2. FIX EMPTY STATE (218:650317) - Finding 2
// ==========================================
const emptySet = await figma.getNodeByIdAsync('218:650317');
if (emptySet) {
  let emptyFixed = 0;
  for (const v of emptySet.children) {
    // Buttons minWidth = null, layoutSizingHorizontal = 'HUG'
    for (const b of v.findAll(n => n.type === 'INSTANCE' && (n.name === 'primary-action' || n.name === 'secondary-action' || n.name === 'action'))) {
      b.minWidth = null;
      b.layoutSizingHorizontal = 'HUG';
      emptyFixed++;
    }
    const actions = v.findOne(n => n.name === 'actions');
    if (actions) {
      actions.layoutSizingHorizontal = 'HUG';
      actions.primaryAxisAlignItems = 'CENTER';
    }
  }
  results.push(`Empty State: updated ${emptyFixed} buttons (minWidth=null, HUG)`);
} else {
  results.push('Empty state set 218:650317 not found');
}

// ==========================================
// 3. FIX SNACKBAR (218:650210) - Finding 4 & 2
// ==========================================
const snackbarSet = await figma.getNodeByIdAsync('218:650210');
if (snackbarSet) {
  const iconBtnMaster = await figma.getNodeByIdAsync(BUTTONS.iconBtnSm);
  const appTransMaster = await figma.getNodeByIdAsync(BUTTONS.appTransInverse);
  const btnEnMaster = await figma.getNodeByIdAsync(BUTTONS.btnEnDefault);
  const btnArMaster = await figma.getNodeByIdAsync(BUTTONS.btnArDefault);
  const closeIconComp = await figma.importComponentByKeyAsync(ICONS.close);

  let sbFixed = 0;
  for (const v of snackbarSet.children) {
    const isAr = v.name.includes('Language=AR');
    const withAction = v.name.includes('Action=With action');

    // 1. Remove old hand-drawn frames
    const oldActionBtn = v.findOne(n => n.name === 'action-button' || (n.name === 'action' && n.type === 'FRAME'));
    const oldCloseBtn = v.findOne(n => n.name === 'close-button' && n.type === 'FRAME');
    if (oldActionBtn) oldActionBtn.remove();
    if (oldCloseBtn) oldCloseBtn.remove();

    // 2. Ensure message text node is FILL
    const msg = v.findOne(n => n.name === 'message');
    if (msg) {
      msg.layoutSizingHorizontal = 'FILL';
      msg.layoutSizingVertical = 'HUG';
    }

    // 3. Create or reuse real close-button instance
    let closeBtn = v.findOne(n => n.name === 'close-button' && n.type === 'INSTANCE');
    if (!closeBtn && iconBtnMaster) {
      closeBtn = iconBtnMaster.createInstance();
      closeBtn.name = 'close-button';
      v.appendChild(closeBtn);
    }

    if (closeBtn) {
      // Configure Appearance inside closeBtn
      const app = closeBtn.findOne(n => n.name === 'Appearance');
      if (app && appTransMaster && app.type === 'INSTANCE') {
        await app.swapComponent(appTransMaster);
      }
      // Swap icon to close
      if (closeIconComp) {
        for (const ic of closeBtn.findAll(n => n.name === 'Outlined icon' || n.name === 'Filled icon')) {
          if (ic.type === 'INSTANCE') await ic.swapComponent(closeIconComp);
        }
      }
    }

    // 4. Create or reuse real action Button instance (only if withAction)
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

        // Set label text
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

    // 5. Reorder children to match Web blueprint
    // EN: [icon, message, action?, close-button]
    // AR: [close-button, action?, message, icon]
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

    sbFixed++;
  }
  results.push(`Snackbar: updated ${sbFixed} variants with real Button and Icon Button`);
} else {
  results.push('Snackbar set 218:650210 not found');
}

// ==========================================
// 4. UNCLIP DOCS PAGES (Finding 8)
// ==========================================
const DOC_SECTIONS = ['219:654620', '219:656645', '219:658890', '219:660436'];
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
results.push(`Docs: unclipped ${unclippedTotal} frames across Tablet docs sections`);

return results;
