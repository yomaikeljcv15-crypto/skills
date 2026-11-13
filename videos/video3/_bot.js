let grain;
function makeGrain() { grain = document.createElement('canvas'); grain.width = 512; grain.height = 512; const g = grain.getContext('2d'), im = g.createImageData(512, 512); for (let i = 0; i < im.data.length; i += 4) { const v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 14; } g.putImageData(im, 0, 0); }
makeGrain();

function render(t) {
  performanceT = t;
  let i = SC.findIndex(s => t < s.end); if (i < 0) i = SC.length - 1;
  const lt = t - SC[i].start, d = SC[i].end - SC[i].start;
  X.fillStyle = C.bg; X.fillRect(0, 0, W, H);
  // ilustración con zoom lento
  X.save(); X.beginPath(); X.rect(0, IL_Y, W, IL_H); X.clip(); X.translate(0, IL_Y);
  const z = 1 + .05 * clamp(lt / d), shake = (i === 7 && lt < .7) ? Math.sin(t * 70) * 8 : 0;
  X.translate(W / 2 + shake, IL_H / 2); X.scale(z, z); X.translate(-W / 2, -IL_H / 2);
  S[i](lt, d);
  X.restore();
  X.save(); X.translate(0, IL_Y); X.beginPath(); X.rect(0, 0, W, IL_H); X.clip(); X.globalAlpha = 1; X.drawImage(grain, (t * 997) % 400 - 400, (t * 613) % 400 - 400, 1600, 1600); X.restore();
  hud(t, i); rulesHud(t, i);
  // transición: barrido rápido
  if (i > 0 && lt < .22) { const k = lt / .22; X.fillStyle = '#000'; X.fillRect(0, IL_Y, W * (1 - easeIO(k)), IL_H); }
  if (i === 8 && lt < .5) { X.fillStyle = '#000'; X.fillRect(0, IL_Y, W, IL_H); }
  topBar(t, i, lt); pulseBar(t, i); captions(t, i);
  X.strokeStyle = '#151824'; X.lineWidth = 2; X.beginPath(); X.moveTo(0, IL_Y); X.lineTo(W, IL_Y); X.moveTo(0, IL_Y + IL_H); X.lineTo(W, IL_Y + IL_H); X.stroke();
  // final a negro
  const end = T.duration - .8; if (t > end) { X.fillStyle = `rgba(0,0,0,${clamp((t - end) / .8)})`; X.fillRect(0, 0, W, H); }
}
window.render = render; window.DURATION = T.duration;
window.frame = (t) => { render(t); return cv.toDataURL('image/jpeg', 0.92); };
if (!navigator.webdriver) { const t0 = performance.now(); (function loop() { render(((performance.now() - t0) / 1000) % T.duration); requestAnimationFrame(loop); })(); }
</script></body></html>
