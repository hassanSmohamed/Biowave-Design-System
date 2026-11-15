// Wave 9 Phase 1 — Build Alert, Snackbar, Empty state, and Skeleton component sets in Biowave DS — Tablet Components + Lint
for (const f of [
  ['Inter', 'Regular'], ['Inter', 'Medium'], ['Inter', 'Semi Bold'], ['Inter', 'Bold'],
  ['IBM Plex Sans Arabic', 'Regular'], ['IBM Plex Sans Arabic', 'Medium'], ['IBM Plex Sans Arabic', 'SemiBold'], ['IBM Plex Sans Arabic', 'Bold']
]) {
  await figma.loadFontAsync({ family: f[0], style: f[1] });
}

const want = [
  'color/background/info/subtlest', 'color/background/success/subtlest', 'color/background/warning/subtlest', 'color/background/error/subtlest',
  'color/background/base/subtle', 'color/surface/subtle', 'color/surface/inverse',
  'color/border/info', 'color/border/success', 'color/border/warning', 'color/border/error', 'color/border/default',
  'color/icon/role/info', 'color/icon/role/success', 'color/icon/role/warning', 'color/icon/role/error', 'color/icon/subtle', 'color/icon/subtlest', 'color/icon/inverse',
  'color/text/role/info', 'color/text/role/success', 'color/text/role/warning', 'color/text/role/error', 'color/text/default', 'color/text/subtle', 'color/text/subtlest', 'color/text/inverse',
  'border/width/default', 'radius/xs', 'radius/sm', 'radius/md', 'radius/full',
  'spacing/xs', 'spacing/sm', 'spacing/md', 'spacing/lg', 'spacing/xl', 'spacing/2xl', 'spacing/3xl',
  'size/icon/xs', 'size/icon/sm', 'size/icon/md', 'size/icon/lg', 'size/icon/xl', 'size/icon/2xl', 'size/icon/3xl',
  'size/control/height/sm', 'size/control/height/md', 'size/control/height/lg', 'size/control/height/xl',
  'size/container/xxs', 'size/container/xs', 'size/container/sm', 'size/container/md', 'size/container/lg'
];

const K = {};
for (const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()) {
  if (c.libraryName !== 'Biowave DS — Foundations') continue;
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) {
    if (want.includes(v.name) && !K[v.name]) K[v.name] = v.key;
  }
}
const miss = want.filter(w => !K[w]);
if (miss.length) return { error: 'Missing variables', miss };

const V = {};
for (const [n, k] of Object.entries(K)) V[n] = await figma.variables.importVariableByKeyAsync(k);

const paint = v => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const bind = (n, ks, v) => { for (const k of ks) n.setBoundVariable(k, v); };
const rads = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
const strokes = ['strokeTopWeight', 'strokeBottomWeight', 'strokeLeftWeight', 'strokeRightWeight'];

const typo = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const grid = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:3a09ae14c43cda497602c162d19445554a09fcf2/5267:205');
const EN_MODE = '3869:8';
const AR_MODE = '5258:1';
const GRID_MODE = '3889:1';

const TITLE_LG = await figma.importStyleByKeyAsync('2da324fe6d92dee8e8bfb65214f3572272421b71');
const TITLE_MD = await figma.importStyleByKeyAsync('80e371f8315ffdb2da029152a20e42afcd924824');
const BODY_LG = await figma.importStyleByKeyAsync('cc33c6262ef50667e2975e4669f8fff2229373db');
const BODY_MD = await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');
const LABEL_MD = await figma.importStyleByKeyAsync('e3c53522eceb6758fc2a3be8644311f584118505');
const ELEV_3 = await figma.importStyleByKeyAsync('a6ffc0d435b5e225dd534e3df14eee3e2dba22b0');

const gly = async k => {
  const s = await figma.importComponentSetByKeyAsync(k);
  return s.children.find(c => c.name === 'Style=Rounded, Fill=Unfilled') || s.defaultVariant;
};
const G = {
  Info: await gly('1a5ce5356055e28237bb66c81c0d787a00896698'),
  Success: await gly('f80e17d72d468f025b926c73aaeefd73a5ca5410'),
  Warning: await gly('a3e59dd796f70814461803f15a547cea25021f89'),
  Error: await gly('aa594051025acfef3ec05fd545aa033af18edf25'),
  Neutral: await gly('0b32136df031bc4e9f23088a3383f5548cc5a47d'),
  Check: await gly('7cffc6ec4f597c487859d4091ce6d499ea120150'),
  Close: await gly('e59e13c612139f0079fe8e1c86a696f24a335eec'),
  Search: await gly('744f9679cd7bc248d4408574f1fde6ce4384c6b5')
};

const findPage = n => figma.root.children.find(p => p.name.trim() === n);
const ensurePageAfter = (name, afterTrim) => {
  let p = findPage('↳ ' + name);
  if (!p) {
    const idx = figma.root.children.findIndex(x => x.name.trim() === afterTrim);
    p = figma.createPage();
    p.name = '     ↳ ' + name;
    figma.root.insertChild(idx >= 0 ? idx + 1 : figma.root.children.length, p);
  }
  return p;
};

const btnPage = findPage('↳ Button');
await btnPage.loadAsync();
const btnEn = btnPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === '.Button _en') || btnPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Button');
const btnAr = btnPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === '.Button _ar') || btnEn;

const ibPage = findPage('↳ Icon Button');
await ibPage.loadAsync();
const iconBtnSet = ibPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Icon Button');

const pick = (set, o) =>
  set.children.find(c => Object.entries(o).every(([k, v]) => c.name.split(', ').includes(k + '=' + v))) ||
  set.defaultVariant;

const setP = (inst, map) => {
  const p = {};
  for (const [pre, val] of Object.entries(map)) {
    const k = Object.keys(inst.componentProperties).find(x => x.split('#')[0] === pre);
    if (k) p[k] = val;
  }
  if (Object.keys(p).length) inst.setProperties(p);
};

const results = {};

// ─── 1. ALERT (Tablet) ───
{
  const page = ensurePageAfter('Alert', '↳ Stepper');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.setExplicitVariableModeForCollection(typo, EN_MODE);
  page.setExplicitVariableModeForCollection(grid, GRID_MODE);

  let AL = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Alert');
  let area = page.findOne(n => n.type === 'SECTION' && n.name === 'Alert — Component');
  if (!AL) {
    if (area) area.remove();
    area = figma.createSection();
    area.name = 'Alert — Component';
    page.appendChild(area);

    const TOK = {
      Info:    { bg: 'color/background/info/subtlest',    bd: 'color/border/info',    ic: 'color/icon/role/info',    ti: 'color/text/role/info',    btn: 'brand' },
      Success: { bg: 'color/background/success/subtlest', bd: 'color/border/success', ic: 'color/icon/role/success', ti: 'color/text/role/success', btn: 'brand' },
      Warning: { bg: 'color/background/warning/subtlest', bd: 'color/border/warning', ic: 'color/icon/role/warning', ti: 'color/text/role/warning', btn: 'neutral' },
      Error:   { bg: 'color/background/error/subtlest',   bd: 'color/border/error',   ic: 'color/icon/role/error',   ti: 'color/text/role/error',   btn: 'error' },
      Neutral: { bg: 'color/surface/subtle',              bd: 'color/border/default', ic: 'color/icon/subtle',       ti: 'color/text/default',      btn: 'neutral' }
    };
    const COPY = {
      Info:    { EN: ['Shift update scheduled', 'New attendance rules take effect on Monday.', 'View details'], AR: ['تحديث المناوبة مجدول', 'تبدأ قواعد الحضور الجديدة يوم الإثنين.', 'عرض التفاصيل'] },
      Success: { EN: ['Device synced', 'All attendance logs have been uploaded.', 'View logs'], AR: ['تمت مزامنة الجهاز', 'تم رفع جميع سجلات البصمة بنجاح.', 'عرض'] },
      Warning: { EN: ['Unsaved changes', 'Some shift edits have not been published yet.', 'Publish'], AR: ['تغييرات غير محفوظة', 'بعض تعديلات المناوبة لم تُنشر بعد.', 'نشر'] },
      Error:   { EN: ['Connection lost', 'Check your network settings and try again.', 'Retry'], AR: ['انقطع الاتصال', 'تحقّق من إعدادات الشبكة وأعد المحاولة.', 'إعادة المحاولة'] },
      Neutral: { EN: ['System tip', 'Use saved filter views to compare branches faster.', 'Learn more'], AR: ['نصيحة للنظام', 'استخدم الفلاتر المحفوظة لمقارنة الفروع أسرع.', 'المزيد'] }
    };

    const comps = [];
    for (const st of ['Info', 'Success', 'Warning', 'Error', 'Neutral']) {
      const tk = TOK[st];
      for (const lang of ['EN', 'AR']) {
        const rtl = lang === 'AR';
        const c = figma.createComponent();
        c.name = `Status=${st}, Language=${lang}`;
        area.appendChild(c);
        c.layoutMode = 'HORIZONTAL';
        c.counterAxisAlignItems = 'CENTER';
        c.primaryAxisSizingMode = 'AUTO';
        c.counterAxisSizingMode = 'FIXED';
        c.resize(640, 88);
        c.setBoundVariable('width', V['size/container/lg']);
        c.primaryAxisSizingMode = 'FIXED';
        c.counterAxisSizingMode = 'AUTO';
        bind(c, ['paddingTop', 'paddingBottom'], V['spacing/lg']);
        bind(c, ['paddingLeft', 'paddingRight'], V['spacing/xl']);
        c.setBoundVariable('itemSpacing', V['spacing/lg']);
        bind(c, rads, V['radius/md']);
        c.fills = [paint(V[tk.bg])];
        c.strokes = [paint(V[tk.bd])];
        c.strokeAlign = 'INSIDE';
        bind(c, strokes, V['border/width/default']);
        c.setExplicitVariableModeForCollection(typo, rtl ? AR_MODE : EN_MODE);

        const icon = G[st].createInstance();
        icon.name = 'icon';
        icon.setBoundVariable('width', V['size/icon/lg']);
        icon.setBoundVariable('height', V['size/icon/lg']);
        for (const v of icon.findAll(n => 'fills' in n && Array.isArray(n.fills) && n.fills.length && n.type !== 'INSTANCE' && n.type !== 'FRAME')) {
          v.fills = [paint(V[tk.ic])];
        }

        const content = figma.createFrame();
        content.name = 'content';
        content.layoutMode = 'VERTICAL';
        content.primaryAxisSizingMode = 'AUTO';
        content.fills = [];
        content.setBoundVariable('itemSpacing', V['spacing/xs']);

        const ti = figma.createText();
        ti.name = 'title';
        await ti.setTextStyleIdAsync(TITLE_MD.id);
        ti.characters = COPY[st][lang][0];
        ti.fills = [paint(V[tk.ti])];
        ti.textAutoResize = 'HEIGHT';
        if (rtl) ti.textAlignHorizontal = 'RIGHT';
        content.appendChild(ti);
        ti.layoutSizingHorizontal = 'FILL';

        const de = figma.createText();
        de.name = 'description';
        await de.setTextStyleIdAsync(BODY_LG.id);
        de.characters = COPY[st][lang][1];
        de.fills = [paint(V['color/text/default'])];
        de.textAutoResize = 'HEIGHT';
        if (rtl) de.textAlignHorizontal = 'RIGHT';
        content.appendChild(de);
        de.layoutSizingHorizontal = 'FILL';

        const bSet = rtl ? btnAr : btnEn;
        const act = pick(bSet, { Variant: 'outlined', Color: tk.btn, State: 'default', Size: 'md' }).createInstance();
        act.name = 'action';
        setP(act, { Label: COPY[st][lang][2], 'Leading icon': false, 'Trailing icon': false });

        const cb = pick(iconBtnSet, { Toggle: 'false', Selected: 'false', Size: 'md' }).createInstance();
        cb.name = 'close-button';
        const ic = cb.findOne(n => n.name.includes('Icon configuration'));
        if (ic) {
          const k = Object.keys(ic.componentProperties).find(x => x.startsWith('Outlined icon'));
          if (k) ic.setProperties({ [k]: G.Close.id });
        }

        const nodes = [icon, content, act, cb];
        (rtl ? nodes.reverse() : nodes).forEach(n => c.appendChild(n));
        content.layoutSizingHorizontal = 'FILL';

        comps.push(c);
      }
    }

    AL = figma.combineAsVariants(comps, area);
    AL.name = 'Alert';
    AL.description = 'An inline banner that communicates important contextual status inside a page, section, form or dialog. Spec: 4-tablet-components/components/alert/alert.md';

    const titleP = AL.addComponentProperty('Title', 'TEXT', 'Shift update scheduled');
    const descP = AL.addComponentProperty('Description', 'TEXT', 'New attendance rules take effect on Monday.');
    const showTitleP = AL.addComponentProperty('Show title', 'BOOLEAN', true);
    const actP = AL.addComponentProperty('Action', 'BOOLEAN', true);
    const closeP = AL.addComponentProperty('Close button', 'BOOLEAN', true);

    for (const c of AL.children) {
      const g = n => c.findOne(x => x.name === n);
      if (c.name.endsWith('EN')) {
        g('title').componentPropertyReferences = { characters: titleP };
        g('description').componentPropertyReferences = { characters: descP };
      }
      g('title').componentPropertyReferences = {
        ...(g('title').componentPropertyReferences || {}),
        visible: showTitleP
      };
      g('action').componentPropertyReferences = { visible: actP };
      g('close-button').componentPropertyReferences = { visible: closeP };
    }

    AL.layoutMode = 'NONE';
    let y = 40, maxX = 0;
    for (const st of ['Info', 'Success', 'Warning', 'Error', 'Neutral']) {
      let x = 40, rh = 0;
      for (const lang of ['EN', 'AR']) {
        const v = AL.children.find(n => n.name === `Status=${st}, Language=${lang}`);
        v.x = x;
        v.y = y;
        x += v.width + 40;
        rh = Math.max(rh, v.height);
      }
      maxX = Math.max(maxX, x);
      y += rh + 40;
    }
    AL.resizeWithoutConstraints(maxX, y);
    AL.x = 80;
    AL.y = 80;
    area.resizeWithoutConstraints(Math.max(1500, AL.x + AL.width + 80), Math.max(800, AL.y + AL.height + 80));
  }
  results.Alert = { page: page.id, section: area.id, set: AL.id, variants: AL.children.length };
}

// ─── 2. SNACKBAR (Tablet) ───
{
  const page = ensurePageAfter('Snackbar', '↳ Alert');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.setExplicitVariableModeForCollection(typo, EN_MODE);
  page.setExplicitVariableModeForCollection(grid, GRID_MODE);

  let SB = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Snackbar');
  let area = page.findOne(n => n.type === 'SECTION' && n.name === 'Snackbar — Component');
  if (!SB) {
    if (area) area.remove();
    area = figma.createSection();
    area.name = 'Snackbar — Component';
    page.appendChild(area);

    const COPY = {
      EN: { msg: 'Shift changes saved', act: 'Undo' },
      AR: { msg: 'تم حفظ تعديلات المناوبة', act: 'تراجع' }
    };

    const comps = [];
    for (const actMode of ['None', 'With action']) {
      for (const lang of ['EN', 'AR']) {
        const rtl = lang === 'AR';
        const c = figma.createComponent();
        c.name = `Action=${actMode}, Language=${lang}`;
        area.appendChild(c);
        c.layoutMode = 'HORIZONTAL';
        c.counterAxisAlignItems = 'CENTER';
        c.primaryAxisSizingMode = 'AUTO';
        c.counterAxisSizingMode = 'AUTO';
        c.setBoundVariable('minWidth', V['size/container/xs']);
        c.setBoundVariable('maxWidth', V['size/container/sm']);
        c.setBoundVariable('minHeight', V['size/control/height/lg']);
        bind(c, ['paddingTop', 'paddingBottom'], V['spacing/md']);
        bind(c, ['paddingLeft', 'paddingRight'], V['spacing/xl']);
        c.setBoundVariable('itemSpacing', V['spacing/lg']);
        bind(c, rads, V['radius/md']);
        c.fills = [paint(V['color/surface/inverse'])];
        await c.setEffectStyleIdAsync(ELEV_3.id);
        c.setExplicitVariableModeForCollection(typo, rtl ? AR_MODE : EN_MODE);

        const ic = G.Check.createInstance();
        ic.name = 'icon';
        ic.setBoundVariable('width', V['size/icon/md']);
        ic.setBoundVariable('height', V['size/icon/md']);
        for (const v of ic.findAll(n => 'fills' in n && Array.isArray(n.fills) && n.fills.length && n.type !== 'INSTANCE' && n.type !== 'FRAME')) {
          v.fills = [paint(V['color/icon/inverse'])];
        }

        const msg = figma.createText();
        msg.name = 'message';
        await msg.setTextStyleIdAsync(BODY_MD.id);
        msg.characters = COPY[lang].msg;
        msg.fills = [paint(V['color/text/inverse'])];
        msg.textAutoResize = 'HEIGHT';
        if (rtl) msg.textAlignHorizontal = 'RIGHT';

        const nodes = [ic, msg];

        if (actMode === 'With action') {
          const ab = figma.createFrame();
          ab.name = 'action-button';
          ab.layoutMode = 'HORIZONTAL';
          ab.primaryAxisAlignItems = 'CENTER';
          ab.counterAxisAlignItems = 'CENTER';
          ab.primaryAxisSizingMode = 'AUTO';
          ab.counterAxisSizingMode = 'FIXED';
          ab.resize(64, 40);
          ab.setBoundVariable('height', V['size/control/height/md']);
          bind(ab, ['paddingLeft', 'paddingRight'], V['spacing/md']);
          bind(ab, rads, V['radius/sm']);
          ab.fills = [];
          const al = figma.createText();
          al.name = 'label';
          await al.setTextStyleIdAsync(LABEL_MD.id);
          al.characters = COPY[lang].act;
          al.fills = [paint(V['color/text/inverse'])];
          ab.appendChild(al);
          nodes.push(ab);
        }

        const cb = figma.createFrame();
        cb.name = 'close-button';
        cb.layoutMode = 'HORIZONTAL';
        cb.primaryAxisAlignItems = 'CENTER';
        cb.counterAxisAlignItems = 'CENTER';
        cb.resize(40, 40);
        cb.primaryAxisSizingMode = 'FIXED';
        cb.counterAxisSizingMode = 'FIXED';
        cb.setBoundVariable('width', V['size/control/height/md']);
        cb.setBoundVariable('height', V['size/control/height/md']);
        bind(cb, rads, V['radius/full']);
        cb.fills = [];
        const cic = G.Close.createInstance();
        cic.name = 'close-icon';
        cic.setBoundVariable('width', V['size/icon/sm']);
        cic.setBoundVariable('height', V['size/icon/sm']);
        for (const v of cic.findAll(n => 'fills' in n && Array.isArray(n.fills) && n.fills.length && n.type !== 'INSTANCE' && n.type !== 'FRAME')) {
          v.fills = [paint(V['color/icon/inverse'])];
        }
        cb.appendChild(cic);
        nodes.push(cb);

        (rtl ? nodes.reverse() : nodes).forEach(n => c.appendChild(n));
        msg.layoutSizingHorizontal = 'FILL';

        comps.push(c);
      }
    }

    SB = figma.combineAsVariants(comps, area);
    SB.name = 'Snackbar';
    SB.description = 'Brief floating notification bar at the viewport edge that confirms a completed action with an optional single action. Spec: 4-tablet-components/components/snackbar/snackbar.md';

    const msgP = SB.addComponentProperty('Message', 'TEXT', 'Shift changes saved');
    const actLabelP = SB.addComponentProperty('Action label', 'TEXT', 'Undo');
    const iconP = SB.addComponentProperty('Show icon', 'BOOLEAN', true);
    const closeP = SB.addComponentProperty('Close button', 'BOOLEAN', true);

    for (const c of SB.children) {
      const g = n => c.findOne(x => x.name === n);
      if (c.name.endsWith('EN')) {
        g('message').componentPropertyReferences = { characters: msgP };
        const ab = g('action-button');
        if (ab) {
          const lbl = ab.findOne(x => x.name === 'label');
          if (lbl) lbl.componentPropertyReferences = { characters: actLabelP };
        }
      }
      g('icon').componentPropertyReferences = { visible: iconP };
      g('close-button').componentPropertyReferences = { visible: closeP };
    }

    SB.layoutMode = 'NONE';
    let y = 40, maxX = 0;
    for (const actMode of ['None', 'With action']) {
      let x = 40, rh = 0;
      for (const lang of ['EN', 'AR']) {
        const v = SB.children.find(n => n.name === `Action=${actMode}, Language=${lang}`);
        v.x = x;
        v.y = y;
        x += v.width + 40;
        rh = Math.max(rh, v.height);
      }
      maxX = Math.max(maxX, x);
      y += rh + 40;
    }
    SB.resizeWithoutConstraints(maxX, y);
    SB.x = 80;
    SB.y = 80;
    area.resizeWithoutConstraints(Math.max(1100, SB.x + SB.width + 80), Math.max(400, SB.y + SB.height + 80));
  }
  results.Snackbar = { page: page.id, section: area.id, set: SB.id, variants: SB.children.length };
}

// ─── 3. EMPTY STATE (Tablet) ───
{
  const page = ensurePageAfter('Empty state', '↳ Snackbar');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.setExplicitVariableModeForCollection(typo, EN_MODE);
  page.setExplicitVariableModeForCollection(grid, GRID_MODE);

  let ES = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Empty state');
  let area = page.findOne(n => n.type === 'SECTION' && n.name === 'Empty state — Component');
  if (!ES) {
    if (area) area.remove();
    area = figma.createSection();
    area.name = 'Empty state — Component';
    page.appendChild(area);

    const COPY = {
      EN: {
        title: 'No matching results',
        desc: 'Try adjusting your filters or search terms.',
        pri: 'Clear filters',
        sec: 'Reset search'
      },
      AR: {
        title: 'لا توجد نتائج مطابقة',
        desc: 'جرّب تعديل الفلاتر أو كلمات البحث للعثور على النتائج.',
        pri: 'مسح الفلاتر',
        sec: 'إعادة ضبط البحث'
      }
    };

    const comps = [];
    for (const sz of ['MD', 'SM']) {
      const isMd = sz === 'MD';
      for (const lang of ['EN', 'AR']) {
        const rtl = lang === 'AR';
        const c = figma.createComponent();
        c.name = `Size=${sz}, Language=${lang}`;
        area.appendChild(c);
        c.layoutMode = 'VERTICAL';
        c.primaryAxisAlignItems = 'CENTER';
        c.counterAxisAlignItems = 'CENTER';
        c.primaryAxisSizingMode = 'AUTO';
        c.counterAxisSizingMode = 'FIXED';
        c.resize(isMd ? 480 : 384, 240);
        c.setBoundVariable('width', V[isMd ? 'size/container/sm' : 'size/container/xs']);
        c.primaryAxisSizingMode = 'AUTO';
        bind(c, ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'], V[isMd ? 'spacing/3xl' : 'spacing/xl']);
        c.setBoundVariable('itemSpacing', V[isMd ? 'spacing/3xl' : 'spacing/xl']);
        c.fills = [];
        c.setExplicitVariableModeForCollection(typo, rtl ? AR_MODE : EN_MODE);

        const vis = figma.createFrame();
        vis.name = 'visual';
        vis.layoutMode = 'HORIZONTAL';
        vis.primaryAxisAlignItems = 'CENTER';
        vis.counterAxisAlignItems = 'CENTER';
        vis.primaryAxisSizingMode = 'AUTO';
        vis.counterAxisSizingMode = 'AUTO';
        bind(vis, ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'], V[isMd ? 'spacing/3xl' : 'spacing/xl']);
        bind(vis, rads, V['radius/full']);
        vis.fills = [paint(V['color/surface/subtle'])];
        c.appendChild(vis);

        const ic = G.Search.createInstance();
        ic.name = 'icon';
        ic.setBoundVariable('width', V[isMd ? 'size/icon/3xl' : 'size/icon/2xl']);
        ic.setBoundVariable('height', V[isMd ? 'size/icon/3xl' : 'size/icon/2xl']);
        for (const v of ic.findAll(n => 'fills' in n && Array.isArray(n.fills) && n.fills.length && n.type !== 'INSTANCE' && n.type !== 'FRAME')) {
          v.fills = [paint(V['color/icon/subtlest'])];
        }
        vis.appendChild(ic);

        const copyStack = figma.createFrame();
        copyStack.name = 'text-stack';
        copyStack.layoutMode = 'VERTICAL';
        copyStack.primaryAxisAlignItems = 'CENTER';
        copyStack.counterAxisAlignItems = 'CENTER';
        copyStack.primaryAxisSizingMode = 'AUTO';
        copyStack.fills = [];
        copyStack.setBoundVariable('itemSpacing', V[isMd ? 'spacing/md' : 'spacing/xs']);
        c.appendChild(copyStack);
        copyStack.layoutSizingHorizontal = 'FILL';

        const ti = figma.createText();
        ti.name = 'title';
        await ti.setTextStyleIdAsync(isMd ? TITLE_LG.id : TITLE_MD.id);
        ti.characters = COPY[lang].title;
        ti.fills = [paint(V['color/text/default'])];
        ti.textAlignHorizontal = 'CENTER';
        ti.textAutoResize = 'HEIGHT';
        copyStack.appendChild(ti);
        ti.layoutSizingHorizontal = 'FILL';

        const de = figma.createText();
        de.name = 'description';
        await de.setTextStyleIdAsync(isMd ? BODY_LG.id : BODY_MD.id);
        de.characters = COPY[lang].desc;
        de.fills = [paint(V[isMd ? 'color/text/subtle' : 'color/text/subtlest'])];
        de.textAlignHorizontal = 'CENTER';
        de.textAutoResize = 'HEIGHT';
        copyStack.appendChild(de);
        de.layoutSizingHorizontal = 'FILL';

        const acts = figma.createFrame();
        acts.name = 'actions';
        acts.layoutMode = 'HORIZONTAL';
        acts.primaryAxisAlignItems = 'CENTER';
        acts.counterAxisAlignItems = 'CENTER';
        acts.primaryAxisSizingMode = 'AUTO';
        acts.counterAxisSizingMode = 'AUTO';
        acts.fills = [];
        acts.setBoundVariable('itemSpacing', V['spacing/md']);

        const bSet = rtl ? btnAr : btnEn;
        const pri = pick(bSet, { Variant: 'filled', Color: 'brand', State: 'default', Size: 'md' }).createInstance();
        pri.name = 'primary-action';
        setP(pri, { Label: COPY[lang].pri, 'Leading icon': false, 'Trailing icon': false });

        const sec = pick(bSet, { Variant: 'outlined', Color: 'neutral', State: 'default', Size: 'md' }).createInstance();
        sec.name = 'secondary-action';
        setP(sec, { Label: COPY[lang].sec, 'Leading icon': false, 'Trailing icon': false });

        (rtl ? [sec, pri] : [pri, sec]).forEach(b => acts.appendChild(b));
        c.appendChild(acts);

        comps.push(c);
      }
    }

    ES = figma.combineAsVariants(comps, area);
    ES.name = 'Empty state';
    ES.description = 'Centred placeholder shown when a page, section, table, card or search result has no items to display. Spec: 4-tablet-components/components/empty-state/empty-state.md';

    const titleP = ES.addComponentProperty('Title', 'TEXT', 'No matching results');
    const descP = ES.addComponentProperty('Description', 'TEXT', 'Try adjusting your filters or search terms.');
    const visP = ES.addComponentProperty('Show visual', 'BOOLEAN', true);
    const priP = ES.addComponentProperty('Primary action', 'BOOLEAN', true);
    const secP = ES.addComponentProperty('Secondary action', 'BOOLEAN', true);

    for (const c of ES.children) {
      const g = n => c.findOne(x => x.name === n);
      if (c.name.endsWith('EN')) {
        g('title').componentPropertyReferences = { characters: titleP };
        g('description').componentPropertyReferences = { characters: descP };
      }
      g('visual').componentPropertyReferences = { visible: visP };
      g('primary-action').componentPropertyReferences = { visible: priP };
      g('secondary-action').componentPropertyReferences = { visible: secP };
    }

    ES.layoutMode = 'NONE';
    let y = 40, maxX = 0;
    for (const sz of ['MD', 'SM']) {
      let x = 40, rh = 0;
      for (const lang of ['EN', 'AR']) {
        const v = ES.children.find(n => n.name === `Size=${sz}, Language=${lang}`);
        v.x = x;
        v.y = y;
        x += v.width + 40;
        rh = Math.max(rh, v.height);
      }
      maxX = Math.max(maxX, x);
      y += rh + 40;
    }
    ES.resizeWithoutConstraints(maxX, y);
    ES.x = 80;
    ES.y = 80;
    area.resizeWithoutConstraints(Math.max(1100, ES.x + ES.width + 80), Math.max(700, ES.y + ES.height + 80));
  }
  results['Empty state'] = { page: page.id, section: area.id, set: ES.id, variants: ES.children.length };
}

// ─── 4. SKELETON (Tablet) ───
{
  const page = ensurePageAfter('Skeleton', '↳ Empty state');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.setExplicitVariableModeForCollection(typo, EN_MODE);
  page.setExplicitVariableModeForCollection(grid, GRID_MODE);

  let SK = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Skeleton');
  let area = page.findOne(n => n.type === 'SECTION' && n.name === 'Skeleton — Component');
  if (!SK) {
    if (area) area.remove();
    area = figma.createSection();
    area.name = 'Skeleton — Component';
    page.appendChild(area);

    const comps = [];
    // 1. Line
    {
      const c = figma.createComponent();
      c.name = 'Shape=Line';
      area.appendChild(c);
      c.resize(384, 16);
      c.setBoundVariable('width', V['size/container/xs']);
      c.setBoundVariable('height', V['spacing/xl']);
      bind(c, rads, V['radius/xs']);
      c.fills = [paint(V['color/background/base/subtle'])];
      comps.push(c);
    }
    // 2. Circle
    {
      const c = figma.createComponent();
      c.name = 'Shape=Circle';
      area.appendChild(c);
      c.resize(40, 40);
      c.setBoundVariable('width', V['size/control/height/md']);
      c.setBoundVariable('height', V['size/control/height/md']);
      bind(c, rads, V['radius/full']);
      c.fills = [paint(V['color/background/base/subtle'])];
      comps.push(c);
    }
    // 3. Block
    {
      const c = figma.createComponent();
      c.name = 'Shape=Block';
      area.appendChild(c);
      c.layoutMode = 'VERTICAL';
      c.primaryAxisSizingMode = 'AUTO';
      c.counterAxisSizingMode = 'FIXED';
      c.resize(320, 112);
      c.setBoundVariable('width', V['size/container/xxs']);
      bind(c, ['paddingTop', 'paddingBottom'], V['size/control/height/xl']);
      bind(c, rads, V['radius/md']);
      c.fills = [paint(V['color/background/base/subtle'])];
      comps.push(c);
    }

    SK = figma.combineAsVariants(comps, area);
    SK.name = 'Skeleton';
    SK.description = 'Low-fidelity structural placeholder that mirrors the layout of content while data is loading. Spec: 4-tablet-components/components/skeleton/skeleton.md';
    SK.layoutMode = 'NONE';
    let y = 40, maxX = 0;
    for (const c of SK.children) {
      c.x = 40;
      c.y = y;
      y += c.height + 32;
      maxX = Math.max(maxX, c.x + c.width + 40);
    }
    SK.resizeWithoutConstraints(maxX, y);
    SK.x = 80;
    SK.y = 80;
    area.resizeWithoutConstraints(Math.max(640, SK.x + SK.width + 80), Math.max(420, SK.y + SK.height + 80));
  }
  results.Skeleton = { page: page.id, section: area.id, set: SK.id, variants: SK.children.length };
}

// ─── 5. LINT ALL 4 SECTIONS ───
const bad = [];
for (const [nm, info] of Object.entries(results)) {
  const p = await figma.getNodeByIdAsync(info.page);
  await p.loadAsync();
  const s = p.children.find(n => n.name.endsWith('— Component'));
  for (const n of s.findAll(() => true)) {
    let q = n.parent, ii = false;
    while (q && q !== s) { if (q.type === 'INSTANCE') { ii = true; break; } q = q.parent; }
    if (ii || n.type === 'COMPONENT_SET' || n.type === 'INSTANCE') continue;
    for (const k of ['fills', 'strokes']) {
      if (Array.isArray(n[k])) {
        n[k].forEach(pt => {
          if (pt.type === 'SOLID' && pt.visible !== false && !(pt.boundVariables && pt.boundVariables.color)) {
            bad.push(nm + ':' + n.name + ' ' + k);
          }
        });
      }
    }
    if (n.type === 'TEXT' && !n.textStyleId) bad.push(nm + ':' + n.name + ' no style');
    if (n.layoutMode && n.layoutMode !== 'NONE') {
      for (const k of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing']) {
        if (n[k] > 0 && !(n.boundVariables && n.boundVariables[k])) {
          bad.push(nm + ':' + n.name + ' raw ' + k);
        }
      }
    }
  }
}

return { unbound: [...new Set(bad)], results };
