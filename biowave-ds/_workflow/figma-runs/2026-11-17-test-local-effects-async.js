
const styles = await figma.getLocalEffectStylesAsync();
return styles.map(s => ({ id: s.id, name: s.name, key: s.key }));
