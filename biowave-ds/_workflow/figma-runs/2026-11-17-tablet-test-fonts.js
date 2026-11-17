const fontsToTest = [
  ['Inter', 'Regular'],
  ['Inter', 'Medium'],
  ['Inter', 'Semi Bold'],
  ['Inter', 'Bold'],
  ['IBM Plex Sans Arabic', 'Regular'],
  ['IBM Plex Sans Arabic', 'Medium'],
  ['IBM Plex Sans Arabic', 'SemiBold'],
  ['IBM Plex Sans Arabic', 'Semi Bold'],
  ['IBM Plex Sans Arabic', 'Bold']
];

const results = [];
for (const [family, style] of fontsToTest) {
  const p = figma.loadFontAsync({ family, style });
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout 2s')), 2000));
  try {
    await Promise.race([p, timeout]);
    results.push({ family, style, ok: true });
  } catch (e) {
    results.push({ family, style, ok: false, err: e.message });
  }
}
return { ok: true, results };