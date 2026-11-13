// Renderiza video1.html cuadro a cuadro y lo envía a ffmpeg.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const dir = __dirname, FPS = 30;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.join(dir, 'video1.html')); await p.waitForTimeout(500);
  const dur = await p.evaluate(() => window.DURATION), n = Math.ceil(dur * FPS);
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', path.join(dir, 'video_mudo.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
  const BATCH = 10;
  for (let i = 0; i < n; i += BATCH) {
    const frames = await p.evaluate(([i, n, FPS, B]) => { const r = []; for (let k = i; k < Math.min(n, i + B); k++) r.push(window.frame(k / FPS).split(',')[1]); return r; }, [i, n, FPS, BATCH]);
    for (const f of frames) if (!ff.stdin.write(Buffer.from(f, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`${i}/${n}`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('listo', n);
})();
