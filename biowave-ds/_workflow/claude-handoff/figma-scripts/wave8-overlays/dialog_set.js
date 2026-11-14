// expects const P = {en, ar, sec, titleStyle, btnSet, after}
for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold'],['IBM Plex Sans Arabic','Bold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const iv=k=>figma.variables.importVariableByKeyAsync(k);
const paint=v=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v);
const typo=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:39add4d8aacddd3c691a5adf59aada01231e4adf/5258:780');
const V={raised:await iv('92b71ada5e0cffef4eec84e17092c1f3d81da69f'),overlay:await iv('3ecd2f2ffb4741abe966b362763abdda03333e76'),text:await iv('4ea63d9ab5254c4df4eba4d26f771377a07929c4'),subtle:await iv('dac97f2fd2a80ccffd6283bcc06c623f64ebe90a'),bdef:await iv('ad520e82898707a0d3112a12f6f9439566c6d6c4'),r3:await iv('591d461e10b84f8ba353fe4d1c2b3deaa849aabb'),cont:await iv('3bed90002d4c00acf31906a48972c1bf1c043e72'),xl:await iv('5fa0c2ce8ae034e9696038d2704e520fd8383e55'),md:await iv('58c93e3cec1b6ba603371a027483e101adcef4f0'),bw:await iv('9b62f24ecdfc438789ce3fa296e725ac14b1e08f'),
 SM:await iv('b9fcef135f2275525eb20e99c3a9b64033f7b4f3'),MD:await iv('395fa36fef4f74f5d8755267443acd00e941e16b'),LG:await iv('b40ce034064c05c7ccfefe9ebb2e6afcedefb9f5')};
const TS={title:await figma.importStyleByKeyAsync(P.titleStyle),body:await figma.importStyleByKeyAsync('87a12277da6eb5157d262a0d847b277747f73b69')};
const EL4=await figma.importStyleByKeyAsync('0918575e22aab65c62e4adf84b63a7d7761acc6d');
const closeSet=await figma.importComponentSetByKeyAsync('e59e13c612139f0079fe8e1c86a696f24a335eec'); const closeG=(closeSet.children.find(c=>c.name==='Style=Rounded, Fill=Unfilled')||closeSet.defaultVariant).id;
const findPage=n=>figma.root.children.find(p=>p.name.trim()===n);
if(!findPage('↳ Dialog')){ const idx=figma.root.children.findIndex(p=>p.name.trim()===P.after)+1; ['↳ Dialog','↳ Side sheet'].filter(n=>P.pages.includes(n)).forEach((nm,i)=>{ const p=figma.createPage(); p.name='     '+nm; figma.root.insertChild(idx+i,p); }); }
const page=findPage('↳ Dialog'); await figma.setCurrentPageAsync(page); page.setExplicitVariableModeForCollection(typo,P.en);
if(page.findOne(n=>n.type==='COMPONENT_SET'&&n.name==='Dialog')) return 'exists';
const findSet=async(pn,nm)=>{ const p=findPage(pn); await p.loadAsync(); return p.findOne(n=>n.type==='COMPONENT_SET'&&n.name===nm); };
const BT=await findSet('↳ Button',P.btnSet), IB=await findSet('↳ Icon Button','Icon Button');
const setP=(inst,map)=>{ const p={}; for(const [pre,val] of Object.entries(map)){ const k=Object.keys(inst.componentProperties).find(x=>x.split('#')[0]===pre); if(k) p[k]=val; } inst.setProperties(p); };
const btn=(variant,color,label)=>{ const v=BT.children.find(c=>c.name===`Variant=${variant}, Color=${color}, State=default, Size=md`)||BT.defaultVariant; const i=v.createInstance(); setP(i,{Label:label,'Leading icon':false,'Trailing icon':false}); return i; };
const closeBtn=(lbl)=>{ const i=(IB.children.find(c=>c.name==='Toggle=false, Selected=false, Size=md')||IB.defaultVariant).createInstance(); i.name='close-button'; setP(i,{'Tooltip label':lbl}); const ic=i.findOne(n=>n.name.includes('Icon configuration')); if(ic){ const k=Object.keys(ic.componentProperties).find(x=>x.startsWith('Outlined icon')); if(k) ic.setProperties({[k]:closeG}); } return i; };
const txt=async(style,fill,s,name)=>{ const t=figma.createText(); t.name=name; await t.setTextStyleIdAsync(style.id); t.characters=s; t.fills=[paint(fill)]; return t; };
const bind4=(n,k,v)=>{ for(const s of k) n.setBoundVariable(s,v); };
const pads=['paddingTop','paddingBottom','paddingLeft','paddingRight'], rads=['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'];
// private components
const area=figma.createSection(); area.name='Dialog'; page.appendChild(area);
const scrim=figma.createComponent(); scrim.name='.Scrim'; scrim.resize(480,320); scrim.fills=[paint(V.overlay)]; scrim.description='Private. Dims the page behind Dialog, Bottom sheet and Side sheet. Fill color/overlay/default.'; area.appendChild(scrim);
const body=figma.createComponent(); body.name='.Dialog/body'; body.layoutMode='VERTICAL'; body.primaryAxisSizingMode='AUTO'; body.counterAxisSizingMode='FIXED'; body.resize(480,10); body.fills=[]; body.setBoundVariable('itemSpacing',V.md);
const bt=await txt(TS.body,V.text,'Learners lose access to courses until you connect the LMS again. Type DISCONNECT to confirm.','body-text'); body.appendChild(bt); bt.layoutSizingHorizontal='FILL'; bt.textAutoResize='HEIGHT';
const bodyProp=body.addComponentProperty('Body','TEXT','Learners lose access to courses until you connect the LMS again. Type DISCONNECT to confirm.'); bt.componentPropertyReferences={characters:bodyProp};
body.description='Private placeholder slot for the Dialog body. Swap it for real content (text, list, fields).'; area.appendChild(body);
const T={EN:{Basic:['Rename report','Save'],Destructive:['Disconnect LMS?','Disconnect'],cancel:'Cancel',more:'Learn more',close:'Close',body:'Learners lose access to courses until you connect the LMS again. Type DISCONNECT to confirm.',alert:'Alert slot · Wave 9'},
 AR:{Basic:['إعادة تسمية التقرير','حفظ'],Destructive:['فصل نظام إدارة التعلم؟','فصل'],cancel:'إلغاء',more:'معرفة المزيد',close:'إغلاق',body:'سيفقد المتعلمون الوصول إلى الدورات حتى تعيد ربط النظام. اكتب DISCONNECT للتأكيد.',alert:'مكان التنبيه · الموجة 9'}};
const comps=[];
for(const size of ['SM','MD','LG']) for(const kind of ['Basic','Destructive']) for(const lang of ['EN','AR']){
 const t=T[lang], rtl=lang==='AR';
 const c=figma.createComponent(); c.name=`Size=${size}, Kind=${kind}, Language=${lang}`; area.appendChild(c);
 c.layoutMode='VERTICAL'; c.primaryAxisSizingMode='AUTO'; c.counterAxisSizingMode='FIXED'; c.resize(560,100); c.setBoundVariable('width',V[size]);
 bind4(c,pads,V.cont); c.setBoundVariable('itemSpacing',V.xl); bind4(c,rads,V.r3); c.fills=[paint(V.raised)]; await c.setEffectStyleIdAsync(EL4.id); c.clipsContent=true;
 c.setExplicitVariableModeForCollection(typo,rtl?P.ar:P.en);
 const h=figma.createAutoLayout('HORIZONTAL'); h.name='header'; h.fills=[]; h.setBoundVariable('itemSpacing',V.xl); c.appendChild(h); h.layoutSizingHorizontal='FILL';
 const ti=await txt(TS.title,V.text,t[kind][0],'title'); h.appendChild(ti); ti.layoutSizingHorizontal='FILL'; ti.textAutoResize='HEIGHT'; if(rtl) ti.textAlignHorizontal='RIGHT';
 const cb=closeBtn(t.close); h.appendChild(cb); if(rtl) h.insertChild(0,cb);
 const al=figma.createAutoLayout('HORIZONTAL'); al.name='alert'; al.fills=[]; al.strokes=[paint(V.bdef)]; al.dashPattern=[4,4]; bind4(al,['strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight'],V.bw); bind4(al,pads,V.md); bind4(al,rads,V.r3); c.appendChild(al); al.layoutSizingHorizontal='FILL';
 const at=await txt(TS.body,V.subtle,t.alert,'alert-placeholder'); al.appendChild(at); at.layoutSizingHorizontal='FILL'; if(rtl) at.textAlignHorizontal='RIGHT'; al.visible=false;
 const bi=body.createInstance(); bi.name='body'; c.appendChild(bi); bi.layoutSizingHorizontal='FILL'; if(rtl){ setP(bi,{Body:t.body}); bi.findOne(n=>n.type==='TEXT').textAlignHorizontal='RIGHT'; }
 const ft=figma.createAutoLayout('HORIZONTAL'); ft.name='footer'; ft.fills=[]; ft.setBoundVariable('itemSpacing',V.md); ft.counterAxisAlignItems='CENTER'; c.appendChild(ft); ft.layoutSizingHorizontal='FILL';
 const ter=btn('text','neutral',t.more); ter.name='tertiary-action'; const sp=figma.createFrame(); sp.name='spacer'; sp.fills=[]; sp.resize(8,8);
 const sec=btn('outlined','neutral',t.cancel); sec.name='secondary-action'; const pri=btn('filled',kind==='Basic'?'brand':'error',t[kind][1]); pri.name='primary-action';
 const order=rtl?[pri,sec,sp,ter]:[ter,sp,sec,pri]; for(const n of order) ft.appendChild(n); sp.layoutGrow=1; ter.visible=false; sp.visible=false;
 ft.primaryAxisAlignItems=rtl?'MIN':'MAX';
 comps.push(c); }
const set=figma.combineAsVariants(comps,area); set.name='Dialog';
set.description='Modal window for a decision or a short task. Spec: '+P.sec+'/components/dialog/dialog.md';
const titleP=set.addComponentProperty('Title','TEXT','Disconnect LMS?');
const closeP=set.addComponentProperty('Close button','BOOLEAN',true), alertP=set.addComponentProperty('Alert','BOOLEAN',false), secP=set.addComponentProperty('Secondary action','BOOLEAN',true), terP=set.addComponentProperty('Tertiary action','BOOLEAN',false);
const bodyP=set.addComponentProperty('Body','INSTANCE_SWAP',body.id,{preferredValues:[{type:'COMPONENT',key:body.key}]});
for(const c of set.children){ const g=n=>c.findOne(x=>x.name===n);
 g('title').componentPropertyReferences={characters:titleP}; g('close-button').componentPropertyReferences={visible:closeP}; g('alert').componentPropertyReferences={visible:alertP};
 g('secondary-action').componentPropertyReferences={visible:secP}; g('tertiary-action').componentPropertyReferences={visible:terP}; g('spacer').componentPropertyReferences={visible:terP}; g('body').componentPropertyReferences={mainComponent:bodyP}; }
// layout grid: rows Size×Kind, cols Language
const sizes=['SM','MD','LG'], kinds=['Basic','Destructive']; let y=40;
for(const s of sizes) for(const k of kinds){ let x=40, h=0; for(const l of ['EN','AR']){ const c=set.children.find(n=>n.name===`Size=${s}, Kind=${k}, Language=${l}`); c.x=x; c.y=y; x+=c.width+40; h=Math.max(h,c.height);} y+=h+40; }
set.layoutMode='NONE'; let W=0,H=0; for(const c of set.children){W=Math.max(W,c.x+c.width);H=Math.max(H,c.y+c.height);} set.resizeWithoutConstraints(W+40,H+40);
set.x=40; set.y=40; scrim.x=W+120; scrim.y=40; body.x=W+120; body.y=420;
area.resizeWithoutConstraints(W+120+560+80, H+120); area.x=0; area.y=0;
return {page:page.id,set:set.id,area:area.id,scrim:scrim.id,body:body.id,variants:set.children.length};
