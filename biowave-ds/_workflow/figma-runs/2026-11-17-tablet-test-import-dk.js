const keys = [
  ['header', 'dd9347ba546590b632ae68976fe2733f3f7d340e', false],
  ['section', 'f29dffabb982e9374b1b804639f45514a29146a2', false],
  ['axis', '24a64b9f56bb95bffc1b5f1ce61e58205b3023fb', true],
  ['callout', '24c24d19f00001b99acb880c3101afb1842a64f6', true],
  ['panel', 'b8b20494dcf5f71d3492d90a96498d510d490132', true],
  ['tile', 'eb3bac08d98c62634cbbc8a6a0129a5fa1783836', false],
  ['cell', '4b48bcab4faac402c079e941b30f8987159bfa3f', true],
  ['row', 'fb2c9fdd139f3be6860495d1d95a911275ed8224', true],
  ['table', '40980251551a20a72810037dc043c66e9271600b', false],
  ['motion', '2072d9e2a11281879696f1f8c6ee6ef917b029ac', false],
  ['uses', '25ed1809ed37c229827ee8019ec52fe129ec0d31', false],
  ['do', '45fdac0674bae9a7d6502a0d2e7f76943d8ea4f1', false],
  ['dont', 'b6271df857b44407da2657601b4e388bf843b7e8', false],
  ['device', 'c7c9ec2e833fad1b54333707c2210744515d5339', true],
  ['skel', 'cdb8f9c05ff039be8fda885a25e3ade2986da93b', true]
];

const log = [];
for (const [name, key, isSet] of keys) {
  const t0 = Date.now();
  try {
    if (isSet) await figma.importComponentSetByKeyAsync(key);
    else await figma.importComponentByKeyAsync(key);
    log.push({ name, ms: Date.now() - t0, ok: true });
  } catch (e) {
    log.push({ name, ms: Date.now() - t0, ok: false, err: e.message });
  }
}
return { ok: true, log };