
const results = {};
const testVars = {
  "radius/sm": "44047be92c065ef35e4aa9ed6732645870ae38c9",
  "radius/xl": "a5042304656c42bab9b62a4f4ab9c6b1831b487c",
  "radius/full": "cde1a4778562f488d8f32680d4d00f7957cc2a21",
  "spacing/2xl": "a7775480bb9a7d53f9f512cbf08b5854451df564",
  "size/control/height/md": "cb6d23a09de76b9cea37c24579dbb2a9e6e6a079"
};
for (const [n, k] of Object.entries(testVars)) {
  try {
    const v = await figma.variables.importVariableByKeyAsync(k);
    results[n] = "OK (" + v.name + ")";
  } catch (e) {
    results[n] = "ERR: " + e.message;
  }
}
try {
  const elev = await figma.importStyleByKeyAsync("f8bd3e0517bac914b6aa83acda696907f0d4a37e");
  results.elevation = "OK (" + elev.name + ")";
} catch (e) {
  results.elevation = "ERR: " + e.message;
}
return results;
