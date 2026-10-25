const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'perfil.html')); await p.waitForTimeout(400);
  for (const k of ['a', 'b', 'c']) { const d = await p.evaluate(k => window.draw(k), k); fs.writeFileSync(path.join(__dirname, `perfil_${k}.png`), Buffer.from(d.split(',')[1], 'base64')); }
  await b.close(); })();
