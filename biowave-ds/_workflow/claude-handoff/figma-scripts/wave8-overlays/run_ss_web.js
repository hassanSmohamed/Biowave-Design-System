for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold'],['IBM Plex Sans Arabic','Bold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const PLAT={dlgSet:null,ssSet:'636:2391',scrim:'635:1457'};
const M={Size:'MD',Mode:'Modal',Language:'EN'};
const D={name:'Side sheet',setId:'636:2391',sub:'Panel for details or a longer task beside the page',ver:'1.0',
 desc:'A side sheet slides in from the end of the window (right in English, left in Arabic) and floats above the page with a small gap from the edge. It shows the details of something on the page or holds a task that is too long for a dialog, while the page stays visible behind it. It replaces the legacy Slide Out Panel.',
 col:'Language', rows:['Size','Mode'], cellW:660, axisW:260,
 parts:['scrim','container','header','back-button','title','close-button','body','footer'],
 intro:[{ss:M,stage:true,w:900,hh:520}],
 propsNote:'One set: Size × Mode × Language = 12 variants. Title is a text property on the EN variants; AR variants carry Arabic copy. Body is an instance-swap slot (.Side sheet/body, .Side sheet/body AR).',
 props:[['Size','VARIANT','SM · MD · LG','MD','sm · md · lg — width size/container/xs · sm · lg'],['Mode','VARIANT','Modal · Standard','Modal','modal · standard (Web only, wide windows)'],['Language','VARIANT','EN · AR','EN','Typography mode Web · EN / AR; opens from the left in Arabic'],['Title','TEXT','—','Edit device','title (EN variants)'],['Back button','BOOLEAN','—','false','onBack'],['Footer','BOOLEAN','—','true','footer'],['Body','INSTANCE_SWAP','.Side sheet/body','.Side sheet/body','children']],
 tokensNote:'No component tokens: every value is a Foundations semantic variable.',
 tokens:[['scrim · fill','Modal','color/overlay/default'],['container · fill','all','color/surface/raised'],['container · radius','Modal · Standard','radius/4xl · radius/none'],['container · shadow','Modal','Elevation/4'],['container · border-inline-start','Standard','color/border/subtle · border/width/default'],['container · width','SM · MD · LG','size/container/xs · sm · lg'],['container · inset','Modal','spacing/md'],['header · padding · gap','all','spacing/2xl · spacing/md'],['title · text','all','title/lg · color/text/default'],['body · padding-inline · gap','all','spacing/layout/container · spacing/layout/stack'],['footer · padding','all','spacing/layout/container']],
 vars:[{title:'Size',desc:'SM for details and short forms, MD (default) for edit forms and filters, LG for content that needs width.',tiles:[['Size = SM',{ss:{Size:'SM',Mode:'Modal',Language:'EN'},h:480}],['Size = MD',{ss:M,h:480}],['Size = LG',{ss:{Size:'LG',Mode:'Modal',Language:'EN'},h:480}]]},
  {title:'Mode',desc:'Modal floats over a dimmed page. Standard (Web only, wide windows) sits beside the page, which narrows to make room.',tiles:[['Mode = Modal',{ss:M,stage:true,w:900,hh:480}],['Mode = Standard',{ss:{Size:'MD',Mode:'Standard',Language:'EN'},stage:true,w:900,hh:480}]]},
  {title:'Back button and footer',desc:'The back button appears on a second view. The footer is off for read-only details.',tiles:[['Back button = true',{ss:M,props:{'Back button':true},h:480}],['Footer = false',{ss:M,props:{Footer:false},h:480}]]}],
 statesNote:'No hover, pressed or disabled state on the sheet; its controls keep their own. Body scrolls under the header and above the footer, with dividers while scrolled. Unsaved changes: closing asks "Discard changes?" in a Dialog.',
 motionNote:'Enter: slides in from the inline end, scrim fades in (modal) or the page narrows (standard), motion-duration-lg, emphasized decelerate. Exit: motion-duration-md, emphasized accelerate. Reduced motion: instant.',
 motion:[['Closed → Open','lg',{empty:true,w:520,h:300},{ss:{Size:'SM',Mode:'Modal',Language:'EN'},stage:true,w:520,hh:300}],['Open → Closed','md',{ss:{Size:'SM',Mode:'Modal',Language:'EN'},stage:true,w:520,hh:300},{empty:true,w:520,h:300}]],
 use:['Use a side sheet to show the details of a row or card without leaving the list, or to edit something with more fields than a dialog holds.',{ss:M,stage:true,w:900,hh:480}],
 notUse:'Not for yes / no decisions (Dialog), choices on a touch phone (Bottom sheet), app navigation (Navigation drawer) or whole workflows with many steps (a page).',
 dos:[['Keep the page visible behind the sheet',{ss:M,stage:true,w:900,hh:480}],['Keep the main action in the footer, always visible',{ss:M,h:480}]],
 donts:[['Do not fill the whole window with a side sheet',{ss:{Size:'LG',Mode:'Modal',Language:'EN'},stage:true,w:660,hh:480}],['Do not hide the save button at the end of a long body',{ss:M,props:{Footer:false},h:480}]],
 content:[['title','The object or the task: "Edit device", "Request details"','40 chars'],['footer action','The outcome: "Save changes", "Connect"','3 words']],
 contentEx:[['Edit device · Save changes','تعديل الجهاز · حفظ التغييرات','Details · Submit']],
 devices:[['Desktop','Modal sheet over the dimmed page, inset from the window edge.',{ss:M,stage:true,w:960,hh:560}]],
 platform:[['Sizes and modes','SM · MD · LG; Modal · Standard'],['Standard','Desktop breakpoint and wider; below it the sheet opens as Modal'],['Narrow windows','Window width minus the inset'],['Interaction','Pointer + keyboard; Esc closes']],
 rtlNote:'In Arabic the sheet opens from the left, the back arrow points right (mirrored), the close button sits on the left of the header. The close glyph does not mirror.',
 rtl:[[['LTR (en) — from the right',{ss:M,stage:true,w:620,hh:420}],['RTL (ar) — from the left',{ss:{Size:'MD',Mode:'Modal',Language:'AR'},stage:true,w:620,hh:420}]]],
 a11yUse:'The title names the sheet and is read when it opens. Modal sheets keep focus inside until closed; standard sheets are a complementary landmark. Every close action works without a swipe.',
 keys:[['Tab / Shift+Tab','Modal: inside the sheet only · Standard: normal page order'],['Esc','Closes the sheet'],['Enter / Space','Activate the focused control']],
 sr:'Modal: role="dialog", aria-modal, aria-labelledby → title ("Edit device, dialog"). Standard: <aside aria-labelledby>.',
 focus:'Modal: focus to the first field or the close button, trapped, returned to the opener. Icon buttons keep their tooltips and targets.',
 contrast:[['title / surface raised','19.8:1','13.58:1']],
 changes:null,
 changelog:[['1.0','2026-11-13','Initial (Wave 8): Size × Mode × Language, back button, footer, body slot; replaces the legacy Slide Out Panel','No']]};
// shared EX for Dialog / Side sheet docs (Web/Tablet). Needs PLAT={en,ar,dlgSet,ssSet,scrim,ar ids}
const iv0=k=>figma.variables.importVariableByKeyAsync(k);
const TXT=await iv0('4ea63d9ab5254c4df4eba4d26f771377a07929c4'), PAGEBG=await iv0('92b71ada5e0cffef4eec84e17092c1f3d81da69f'), BSUB=await iv0('07f3e9a3d1ca641c7f05d37bf2e4383e4a8e6112');
const BODY=await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69');
const typoX=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const DLG=PLAT.dlgSet?await figma.getNodeByIdAsync(PLAT.dlgSet):null, SS=PLAT.ssSet?await figma.getNodeByIdAsync(PLAT.ssSet):null, SCRIM=await figma.getNodeByIdAsync(PLAT.scrim);
for(const [id,nm] of [[PLAT.dlgSet,'Dialog'],[PLAT.ssSet,'Side sheet']]) if(id){ const s=await figma.getNodeByIdAsync(id); if(s.parent.type==='SECTION'&&s.parent.name===nm) s.parent.name=nm+' — Component'; }
const pick=(set,o)=>set.children.find(c=>Object.entries(o).every(([k,v])=>c.name.split(', ').includes(k+'='+v)))||set.defaultVariant;
const setPr=(i,map)=>{ const p={}; for(const [pre,val] of Object.entries(map||{})){ const k=Object.keys(i.componentProperties).find(x=>x.split('#')[0]===pre); if(k) p[k]=val; } if(Object.keys(p).length) i.setProperties(p); };
const inst=(set,o,props)=>{ const i=pick(set,o).createInstance(); setPr(i,props); return i; };
async function stage(child,w,h,opts){ const f=figma.createFrame(); f.name='stage'; f.resize(w,h); f.clipsContent=true; f.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',PAGEBG)];
 // page skeleton lines
 for(let k=0;k<4;k++){ const r=figma.createRectangle(); r.resize(Math.round(w*0.5),10); r.x=24; r.y=24+k*28; r.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',BSUB)]; r.name='page-content'; f.appendChild(r); }
 if(!opts||!opts.noScrim){ const s=SCRIM.createInstance(); f.appendChild(s); s.resize(w,h); s.x=0; s.y=0; }
 if(child){ f.appendChild(child); if(opts&&opts.side){ const inset=8; child.resize(child.width,h-2*inset); child.y=inset; child.x=opts.rtl?inset:w-child.width-inset; } else { child.x=Math.round((w-child.width)/2); child.y=Math.round((h-child.height)/2); } }
 return f; }
async function EX(s){
 if(s.dlg){ const i=inst(DLG,s.dlg,s.props); if(s.stage) return await stage(i,s.w||960,s.h||560,s); return i; }
 if(s.ss){ const i=inst(SS,s.ss,s.props); if(s.h) i.resize(i.width,s.h); if(s.stage) return await stage(i,s.w||1100,s.hh||640,{side:true,rtl:s.ss.Language==='AR',noScrim:s.ss.Mode==='Standard'}); return i; }
 if(s.empty) return await stage(null,s.w||960,s.h||560,{noScrim:true});
 if(s.text){ const t=figma.createText(); await t.setTextStyleIdAsync(BODY.id); t.characters=s.text; t.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',TXT)]; return t; }
 return figma.createFrame(); }
// ===== generic doc builder (Wave 7). Expects const D (data) and async function EX(spec) defined before this block.
const page=figma.root.children.find(p=>p.name.trim()==='↳ '+D.name); await page.loadAsync(); await figma.setCurrentPageAsync(page);
const old=page.findOne(n=>n.type==='SECTION'&&n.name===D.name+' — Documentation'); if(old&&!D.rebuild) return 'docs exist'; if(old) old.remove();
for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold'],['IBM Plex Sans Arabic','Bold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const loaded=new Set(); async function lf(node){ for(const t of (node.type==='TEXT'?[node]:node.findAll(n=>n.type==='TEXT'))) for(const s of t.getStyledTextSegments(['fontName'])){const k=JSON.stringify(s.fontName); if(!loaded.has(k)){await figma.loadFontAsync(s.fontName); loaded.add(k);}} }
const C=async(k,set)=>set?await figma.importComponentSetByKeyAsync(k):await figma.importComponentByKeyAsync(k);
const DK={header:await C('dd9347ba546590b632ae68976fe2733f3f7d340e'),section:await C('f29dffabb982e9374b1b804639f45514a29146a2'),axis:await C('24a64b9f56bb95bffc1b5f1ce61e58205b3023fb',1),callout:await C('24c24d19f00001b99acb880c3101afb1842a64f6',1),panel:await C('b8b20494dcf5f71d3492d90a96498d510d490132',1),tile:await C('eb3bac08d98c62634cbbc8a6a0129a5fa1783836'),cell:await C('4b48bcab4faac402c079e941b30f8987159bfa3f',1),row:await C('fb2c9fdd139f3be6860495d1d95a911275ed8224',1),table:await C('40980251551a20a72810037dc043c66e9271600b'),motion:await C('2072d9e2a11281879696f1f8c6ee6ef917b029ac'),uses:await C('25ed1809ed37c229827ee8019ec52fe129ec0d31'),do:await C('45fdac0674bae9a7d6502a0d2e7f76943d8ea4f1'),dont:await C('b6271df857b44407da2657601b4e388bf843b7e8'),device:await C('c7c9ec2e833fad1b54333707c2210744515d5339',1),skel:await C('cdb8f9c05ff039be8fda885a25e3ade2986da93b',1),footer:await C('dd342bd1d199a8c5f353c58125681fad6b6c09f2'),change:await C('5cc8476dd2952640e8138cf21feeb637cfcfe73a')};
const variant=(set,name)=>set.children.find(c=>c.name===name);
const iv=k=>figma.variables.importVariableByKeyAsync(k);
const W6=await figma.variables.getVariableByIdAsync((await figma.getNodeByIdAsync('389:65518')).boundVariables.width.id), W2=await figma.variables.getVariableByIdAsync((await figma.getNodeByIdAsync('389:65520')).boundVariables.width.id);
const XL=await iv('5fa0c2ce8ae034e9696038d2704e520fd8383e55'), BG=await iv('82c8830a9ba9a3837c6d6f261cc1b43e8b6a9c08');
const typo=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const SET=await figma.getNodeByIdAsync(D.setId);
async function setP(inst,map){ await lf(inst); const p={}; for(const [pre,val] of Object.entries(map)){ const k=Object.keys(inst.componentProperties).find(x=>x===pre||x.split('#')[0]===pre); if(k) p[k]=val; } if(Object.keys(p).length) inst.setProperties(p); return inst; }
async function vInst(set,props,over){ let v=set.children.find(c=>{const ps=c.name.split(', '); return Object.entries(props||{}).every(([k,x])=>ps.includes(k+'='+x));}); if(!v) v=set.defaultVariant; const i=v.createInstance(); if(over) await setP(i,over); return i; }
function frame(title,wide){ const f=figma.createAutoLayout('VERTICAL'); f.name=D.name+' / '+title; f.setBoundVariable('width',wide?W6:W2); f.primaryAxisSizingMode='AUTO'; f.counterAxisSizingMode='FIXED'; for(const p of ['paddingTop','paddingBottom','paddingLeft','paddingRight','itemSpacing']) f.setBoundVariable(p,XL); f.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',BG)]; f.setExplicitVariableModeForCollection(typo,'3869:6'); return f; }
function add(parent,node){ parent.appendChild(node); try{node.layoutSizingHorizontal='FILL';}catch(e){} return node; }
async function header(f,title){ const h=DK.header.createInstance(); add(f,h); await setP(h,{Title:D.name+' / '+title,Subtitle:D.sub,Platform:D.os||'Web'}); const c=figma.createAutoLayout('VERTICAL'); c.name='Documentation content'; c.fills=[]; c.setBoundVariable('itemSpacing',XL); add(f,c); return c; }
function footer(f){ add(f,DK.footer.createInstance()); }
async function section(p,t,d){ const s=DK.section.createInstance(); add(p,s); await setP(s,{Title:t,Description:d||' ','Show description':!!d}); }
const slotOf=i=>i.findOne(n=>n.type==='SLOT'); const clear=s=>[...s.children].forEach(c=>c.remove());
async function table(p,rows,codeCols){ const t=DK.table.createInstance(); add(p,t); const sl=slotOf(t); clear(sl);
 for(let r=0;r<rows.length;r++){ const hdr=r===0; const rw=variant(DK.row,'Row='+(hdr?'Header':'Body')).createInstance(); sl.appendChild(rw); rw.layoutSizingHorizontal='FILL'; const cs=slotOf(rw); clear(cs);
  for(let ci=0;ci<rows[r].length;ci++){ const kind=hdr?'Text':((codeCols||[]).includes(ci)?'Code':(ci===0?'Bold':'Text')); const cell=variant(DK.cell,`Cell=${kind}, Row=${hdr?'Header':'Body'}`).createInstance(); cs.appendChild(cell); cell.layoutSizingHorizontal='FILL'; await setP(cell,{Text:String(rows[r][ci])}); } } return t; }
async function tile(p,cap,node){ const t=DK.tile.createInstance(); p.appendChild(t); await setP(t,{Caption:cap}); const sl=slotOf(t); clear(sl); if(node) sl.appendChild(node); return t; }
function hrow(p){ const r=figma.createAutoLayout('HORIZONTAL'); r.fills=[]; r.setBoundVariable('itemSpacing',XL); p.appendChild(r); r.layoutSizingHorizontal='FILL'; r.layoutWrap='WRAP'; r.setBoundVariable('counterAxisSpacing',XL); return r; }
const pages=[];
try{
// 00
{ const f=frame('00 Component sheet',true); pages.push(f); const c=await header(f,'00 Component sheet');
  await section(c,D.name,SET.children.length+' live variants · rows '+D.rows.join(' → ')+' · '+D.col+' columns');
  const opts={}; SET.children.forEach(v=>v.name.split(', ').forEach(p=>{const [k,x]=p.split('='); (opts[k]=opts[k]||[]); if(!opts[k].includes(x)) opts[k].push(x);}));
  const head=figma.createAutoLayout('HORIZONTAL'); head.fills=[]; head.setBoundVariable('itemSpacing',XL); add(c,head); const sp=figma.createFrame(); sp.fills=[]; sp.resize(D.axisW||300,8); head.appendChild(sp);
  for(const cv of opts[D.col]){ const a=variant(DK.axis,'Orientation=Column').createInstance(); head.appendChild(a); await setP(a,{Property:D.col,Value:cv}); a.resize(D.cellW,a.height); }
  let combos=[{}]; for(const ax of D.rows){ const nx=[]; for(const cb of combos) for(const o of opts[ax]) nx.push({...cb,[ax]:o}); combos=nx; }
  for(const cb of combos){ const match=x=>Object.entries(cb).every(([k,y])=>x.name.split(', ').includes(k+'='+y)); if(!SET.children.some(match)) continue;
   const row=figma.createAutoLayout('HORIZONTAL'); row.fills=[]; row.setBoundVariable('itemSpacing',XL); row.counterAxisAlignItems='CENTER'; add(c,row);
   const ax=figma.createAutoLayout('HORIZONTAL'); ax.fills=[]; ax.itemSpacing=6; row.appendChild(ax); ax.primaryAxisSizingMode='FIXED'; ax.resize(D.axisW||300,ax.height);
   const k=Math.max(1,Object.keys(cb).length); for(const [kk,x] of Object.entries(cb)){ const a=variant(DK.axis,'Orientation=Column').createInstance(); ax.appendChild(a); await setP(a,{Property:kk,Value:x}); a.resize(Math.floor(((D.axisW||300)-6*(k-1))/k),a.height); }
   for(const cv of opts[D.col]){ const cell=figma.createAutoLayout('VERTICAL'); cell.fills=[]; row.appendChild(cell); cell.counterAxisSizingMode='FIXED'; cell.resize(D.cellW,Math.max(cell.height,1)); cell.primaryAxisSizingMode='AUTO';
    const v=SET.children.find(x=>x.name.split(', ').includes(D.col+'='+cv)&&match(x)); if(v){ const i=v.createInstance(); cell.appendChild(i); if(D.sheetFill) try{ i.layoutSizingHorizontal='FILL'; }catch(e){} } } }
  footer(f); }
// 01
{ const f=frame('01 Introduction',false); pages.push(f); const c=await header(f,'01 Introduction'); await section(c,'Introduction',D.desc);
  for(const th of ['Light','Dark']){ const p=variant(DK.panel,'Theme='+th).createInstance(); add(c,p); const sl=slotOf(p); clear(sl);
   const callRow=figma.createAutoLayout('HORIZONTAL'); callRow.fills=[]; callRow.itemSpacing=16; sl.appendChild(callRow); for(const part of D.parts){ const co=variant(DK.callout,'Side=Bottom').createInstance(); callRow.appendChild(co); await setP(co,{Label:part}); }
   const ex=figma.createAutoLayout('HORIZONTAL'); ex.fills=[]; ex.itemSpacing=32; ex.counterAxisAlignItems='CENTER'; sl.appendChild(ex); for(const s of D.intro) ex.appendChild(await EX(s)); }
  footer(f); }
// 02
{ const f=frame('02 Props and tokens',false); pages.push(f); const c=await header(f,'02 Props and tokens');
  await section(c,'Props',D.propsNote); await table(c,[['Property','Type','Values','Default','Description'],...D.props]);
  await section(c,'Tokens',D.tokensNote); await table(c,[['Part · property','Option','Token'],...D.tokens],[2]); footer(f); }
// 03
{ const f=frame('03 Variations',true); pages.push(f); const c=await header(f,'03 Variations');
  for(const blk of D.vars){ await section(c,blk.title,blk.desc); const r=hrow(c); for(const [cap,s] of blk.tiles) await tile(r,cap,await EX(s)); }
  footer(f); }
// 04
{ const f=frame('04 States and motion',true); pages.push(f); const c=await header(f,'04 States and motion'); await section(c,'States',D.statesNote);
  if(D.motion.length){ await section(c,'Motion',D.motionNote);
   for(const [trig,dur,from,to] of D.motion){ const m=DK.motion.createInstance(); add(c,m); await setP(m,{Trigger:trig}); const sls=m.findAll(n=>n.type==='SLOT'); clear(sls[0]); sls[0].appendChild(await EX(from)); sls[0].appendChild(await EX(to)); if(sls[1]) clear(sls[1]); const tl=m.findOne(n=>n.type==='INSTANCE'&&n.name.includes('Timeline')); if(tl) try{tl.setProperties({Duration:dur});}catch(e){} } }
  footer(f); }
// 05
{ const f=frame('05 Usage guidelines',false); pages.push(f); const c=await header(f,'05 Usage guidelines');
  const u=DK.uses.createInstance(); add(c,u); await setP(u,{Title:'When to use',Rules:D.use[0]}); let sl=slotOf(u); clear(sl); sl.appendChild(await EX(D.use[1]));
  const n=DK.uses.createInstance(); add(c,n); await setP(n,{Title:'When not to use',Rules:D.notUse}); sl=slotOf(n); clear(sl);
  for(let k=0;k<D.dos.length;k++){ const r=hrow(c); r.layoutWrap='NO_WRAP'; const d=DK.do.createInstance(); r.appendChild(d); d.layoutSizingHorizontal='FILL'; await setP(d,{Rules:D.dos[k][0]}); let s=slotOf(d); clear(s); s.appendChild(await EX(D.dos[k][1]));
   const t=DK.dont.createInstance(); r.appendChild(t); t.layoutSizingHorizontal='FILL'; await setP(t,{Rules:D.donts[k][0]}); s=slotOf(t); clear(s); s.appendChild(await EX(D.donts[k][1])); }
  footer(f); }
// 06
{ const f=frame('06 Content guidelines',false); pages.push(f); const c=await header(f,'06 Content guidelines'); await table(c,[['Element','Rule','Max length'],...D.content]); await table(c,[['✓ EN','✓ AR','✗ Avoid'],...D.contentEx]); footer(f); }
// 07
{ const f=frame('07 Platform',false); pages.push(f); const c=await header(f,'07 Platform');
  for(const [dev,desc,s] of D.devices){ await section(c,dev,desc); const d=variant(DK.device,'Device='+dev).createInstance(); add(c,d); try{ d.layoutSizingHorizontal='FIXED'; d.layoutSizingVertical='FIXED'; d.resize(d.mainComponent.width,d.mainComponent.height); }catch(e){} const sl=slotOf(d); clear(sl); sl.appendChild(await EX(s)); }
  await table(c,[['Aspect','Web'],...D.platform]); footer(f); }
// 08
{ const f=frame('08 RTL',false); pages.push(f); const c=await header(f,'08 RTL'); await section(c,'Mirroring',D.rtlNote);
  for(const blk of D.rtl){ const r=hrow(c); for(const [cap,s] of blk) await tile(r,cap,await EX(s)); } footer(f); }
// 09
{ const f=frame('09 Accessibility',false); pages.push(f); const c=await header(f,'09 Accessibility');
  await section(c,'Use case',D.a11yUse); await table(c,[['Key','Action'],...D.keys]); await section(c,'Screen reader',D.sr);
  await section(c,'Focus and target size',D.focus); await table(c,[['Pair','Light','Dark'],...D.contrast]); footer(f); }
// 10
if(D.changes){ const f=frame('10 Changes from previous version',false); pages.push(f); const c=await header(f,'10 Changes from previous version'); await section(c,'Version '+D.ver,D.changes); const r=hrow(c); for(const [cap,s] of D.changeTiles) await tile(r,cap,await EX(s)); footer(f); }
// 11
{ const f=frame('11 Changelog',false); pages.push(f); const c=await header(f,'11 Changelog'); await table(c,[['Version','Date','Change','Breaking'],...D.changelog]); footer(f); }
}catch(e){ pages.forEach(p=>p.remove()); throw e; }
const sec=figma.createSection(); sec.name=D.name+' — Documentation'; page.appendChild(sec);
const comp=page.findOne(n=>n.type==='SECTION'&&n.name===D.name+' — Component');
let x=80,y=80,rowH=0,col=0; for(const p of pages){ sec.appendChild(p); p.x=x; p.y=y; rowH=Math.max(rowH,p.height); col++; x+=2000; if(col===3){col=0;x=80;y+=rowH+120;rowH=0;} }
sec.resizeWithoutConstraints(6080, y+rowH+120); sec.x=comp?comp.x+comp.width+200:0; sec.y=0;

for(const t of sec.findAll(x=>x.type==='INSTANCE'&&x.name==='Doc/Tile')){ const sl=t.findOne(x=>x.type==='SLOT'); const c=sl&&sl.children[0]; if(!c) continue; const need=c.width+(t.width-sl.width); if(need>t.width) t.resize(need,t.height); }
for(const s of sec.findAll(x=>x.type==='SLOT')){ const avail=s.width-(s.paddingLeft||0)-(s.paddingRight||0); for(const c of s.children) if(c.width>avail+0.5) c.rescale(avail/c.width); }

return {section:sec.id,pages:pages.map(p=>p.name.split(' / ')[1])};
