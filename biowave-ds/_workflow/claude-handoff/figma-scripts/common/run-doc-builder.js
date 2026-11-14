// Build docs 00–09 and 11 for a component with the stored doc builder (shared plugin data 'biowave' › 'w8core').
// The builder expects D (data) and EX (async function that returns a node for an example spec). See ../README.md › Doc builder.
for(const f of [['Inter','Regular'],['Inter','Medium'],['Inter','Semi Bold'],['Inter','Bold'],['IBM Plex Sans Arabic','Regular'],['IBM Plex Sans Arabic','Medium'],['IBM Plex Sans Arabic','SemiBold'],['IBM Plex Sans Arabic','Bold']]) await figma.loadFontAsync({family:f[0],style:f[1]});
const SET=await figma.getNodeByIdAsync('SET_ID');
const pick=(set,o)=>set.children.find(c=>Object.entries(o).every(([k,v])=>c.name.split(', ').includes(k+'='+v)))||set.defaultVariant;
const setPr=(i,map)=>{ const p={}; for(const [pre,val] of Object.entries(map||{})){ const k=Object.keys(i.componentProperties).find(x=>x.split('#')[0]===pre); if(k) p[k]=val; } if(Object.keys(p).length) i.setProperties(p); };
async function EX(s){ if(s.v){ const i=pick(SET,s.v).createInstance(); setPr(i,s.props); return i; } return figma.createFrame(); }
const D={ name:'Name', setId:'SET_ID', /* Tablet/Mobile: os:'Tablet'|'Mobile', mode:'3869:8'|'3869:7', */ sub:'one line', ver:'1.0', desc:'…',
 col:'Language', rows:['Variant'], cellW:600, axisW:180, parts:['…'], intro:[{v:{}}],
 propsNote:'…', props:[['Prop','VARIANT','a · b','a','codeProp']], tokensNote:'…', tokens:[['part · prop','state','token']],
 vars:[{title:'…',desc:'…',tiles:[['caption',{v:{}}]]}], statesNote:'…', motionNote:'…', motion:[['A → B','sm',{v:{}},{v:{}}]],
 use:['…',{v:{}}], notUse:'…', dos:[['…',{v:{}}],['…',{v:{}}]], donts:[['…',{v:{}}],['…',{v:{}}]],
 content:[['element','rule','max']], contentEx:[['EN','AR','avoid']],
 devices:[['Desktop','…',{v:{}}]], /* valid device names: Desktop · Web narrow · Tablet landscape · Tablet portrait · Phone */
 platform:[['Aspect','value']], rtlNote:'…', rtl:[[['LTR',{v:{}}],['RTL',{v:{}}]]],
 a11yUse:'…', keys:[['Key','Action']], sr:'…', focus:'…', contrast:[['pair','light','dark']], changes:null, changelog:[['1.0','YYYY-MM-DD','Initial','No']] };
const src=figma.root.getSharedPluginData('biowave','w8core'); const AF=Object.getPrototypeOf(async function(){}).constructor;
return await (new AF('D','EX',src))(D,EX);
