const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const dir = __dirname, times = process.argv.slice(2).map(Number);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + path.join(dir, 'video1.html')); await p.waitForTimeout(500);
  for (const t of times) { const d = await p.evaluate(t => window.frame(t), t); fs.writeFileSync(path.join(dir, 'snaps', `s_${t}.jpg`), Buffer.from(d.split(',')[1], 'base64')); }
  if (errs.length) console.log('ERR', errs.slice(0, 5)); await b.close();
})();
