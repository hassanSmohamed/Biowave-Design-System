// HANDOFF §7 checks 3–4. Run in each component file (Web, Tablet, Mobile) with the Biowave Script Runner; copy the result back.
const r = { file: figma.root.name, w8coreLength: figma.root.getSharedPluginData('biowave', 'w8core').length };
try { const s = await figma.importComponentSetByKeyAsync('9b46e7de73427b157abc3a24e5bd338c0887886b'); r.logo = s.name + ' · ' + s.children.length + ' variants'; } catch (e) { r.logo = 'ERROR ' + e.message; }
try { const v = await figma.variables.importVariableByKeyAsync('c92e3f33bc4da813e300178b0eaee8aaf75f10ec'); r.indicator = v.name; } catch (e) { r.indicator = 'ERROR ' + e.message; }
try { const libs = (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).filter((c) => c.libraryName === 'Biowave DS — Foundations'); r.foundationsCollections = libs.length; } catch (e) { r.foundationsCollections = 'ERROR ' + e.message; }
// expected: Web w8coreLength 13481 · Tablet/Mobile 13485 · logo "Logo · 12 variants" · indicator "size/indicator/sm" · foundationsCollections > 0
return r;
