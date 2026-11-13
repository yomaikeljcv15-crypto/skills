// ---------- pulso ----------
const DT = 1 / 600, N = Math.ceil((T.duration + 2) / DT);
const phase = new Float64Array(N);
function bpmAt(t) { let i = SC.findIndex(s => t < s.end); if (i < 0) i = SC.length - 1; const prev = i ? META[i - 1][4] : META[0][4]; return lerp(prev, META[i][4], clamp((t - SC[i].start) / 1.2)); }
for (let i = 1; i < N; i++) phase[i] = phase[i - 1] + bpmAt(i * DT) / 60 * DT;
const ph = t => phase[clamp(Math.round(t / DT), 0, N - 1)];
function ecg(p) { const f = p - Math.floor(p); if (f < .08) return Math.sin(f / .08 * Math.PI) * .12; if (f < .14) return 0; if (f < .16) return -.18; if (f < .2) return 1; if (f < .24) return -.35; if (f < .4) return 0; if (f < .52) return Math.sin((f - .4) / .12 * Math.PI) * .22; return 0; }
function pulseColor(i) { const m = META[i]; return m[5] === 'CONTENCIÓN' || m[5] === 'VIGILANCIA' ? C.yellow : m[4] >= 120 ? C.red : C.yellow; }

// ---------- capas fijas ----------
function topBar(t, i, lt) {
  const m = META[i], k = ease(lt / .3);
  X.fillStyle = C.bg; X.fillRect(0, 0, W, IL_Y);
  X.save(); X.globalAlpha = k; txt(m[0], 540, 82, F(900, 76), C.white); X.restore();
  const n = META.length, x0 = 140, x1 = 940; X.strokeStyle = '#2A2E3A'; X.lineWidth = 4; X.beginPath(); X.moveTo(x0, 158); X.lineTo(x1, 158); X.stroke();
  for (let j = 0; j < n; j++) { const x = lerp(x0, x1, j / (n - 1)); const on = j <= i; circ(x, 158, j === i ? 11 : 7, on ? C.yellow : '#3A3F4D'); if (j === i) circ(x, 158, 22 + Math.sin(t * 6) * 3, null, 'rgba(232,185,49,.35)', 3); }
  txt(m[1], 540, 207, MONO(24), '#9AA0AE');
  X.save(); X.globalAlpha = k; X.translate(0, (1 - k) * 18); txt(m[2], 540, 270, F(900, 64), m[3]); X.restore();
}
function pulseBar(t, i) {
  const y0 = IL_Y + IL_H, h = 170; X.fillStyle = C.bg; X.fillRect(0, y0, W, h);
  const col = pulseColor(i), bpm = Math.round(bpmAt(t)), cy = y0 + 72;
  X.strokeStyle = col; X.lineWidth = 5; X.lineJoin = 'round'; X.beginPath();
  const x0 = 50, x1 = 800, span = 3.2;
  for (let x = x0; x <= x1; x += 3) { const tt = t - (x1 - x) / (x1 - x0) * span; const v = tt < 0 ? 0 : ecg(ph(tt)); const y = cy - v * 62; x === x0 ? X.moveTo(x, y) : X.lineTo(x, y); }
  X.stroke(); circ(x1, cy - ecg(ph(t)) * 62, 9, col);
  const beat = ph(t) % 1, s = beat > .16 && beat < .3 ? 1.18 : 1;
  X.save(); X.translate(865, cy); X.scale(s, s); X.fillStyle = col; X.beginPath(); X.moveTo(0, 14); X.bezierCurveTo(-30, -6, -18, -30, 0, -14); X.bezierCurveTo(18, -30, 30, -6, 0, 14); X.fill(); X.restore();
  txt(String(bpm), 965, cy + 2, F(900, 58), col);
  txt(META[i][5] + ' · PULSO', 540, y0 + 140, MONO(22), '#6C7280');
}
function captions(t, i) {
  const y0 = IL_Y + IL_H + 170; X.fillStyle = C.bg; X.fillRect(0, y0, W, H - y0);
  const ws = WORDS.filter(w => w.sc === i); if (!ws.length) { if (i === 13 && t > SC[13].start + 2.6) { const k = ease((t - SC[13].start - 2.6) / .4); X.globalAlpha = k; txt('¿Qué número', 540, y0 + 95, F(900, 64), C.white); txt('habrías dicho tú?', 540, y0 + 172, F(900, 64), C.yellow); X.globalAlpha = 1; } return; }
  // agrupar en bloques de hasta 5 palabras o fin de frase
  const groups = []; let g = [];
  ws.forEach((w, j) => { g.push(w); const end = /[.?:!…"]$/.test(w.w) || g.length >= 5; if (end || j === ws.length - 1) { groups.push(g); g = []; } });
  let cur = groups.find((gr, j) => t < (groups[j + 1] ? groups[j + 1][0].s : 1e9));
  if (!cur || t < cur[0].s - .15) return;
  X.font = F(900, 66); const shown = cur;
  const clean = w => w.replace(/["“”]/g, '');
  const parts = shown.map(w => clean(w.w)); const lines = [[]]; let lw = 0;
  parts.forEach((p, j) => { const ww = X.measureText(p + ' ').width; if (lw + ww > 920 && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push(j); lw += ww; });
  lines.forEach((ln, li) => {
    const full = ln.map(j => parts[j]).join(' '); let x = 540 - X.measureText(full).width / 2;
    ln.forEach(j => { const p = parts[j], key = p.toLowerCase().replace(/[¿?¡!.,:"]/g, ''); const w = shown[j];
      const said = t >= w.s - .05, col = !said ? '#3A3F4D' : KEY_R.includes(key) ? C.red : KEY_Y.includes(key) ? C.yellow : C.white; const pop = said ? ease((t - w.s) / .12) : 0;
      X.save(); X.translate(0, -pop * 0); X.scale(1, 1); txt(p, x, y0 + 110 + (li - (lines.length - 1) / 2) * 80, F(900, 66), col, 'left'); X.restore();
      x += X.measureText(p + ' ').width; });
  });
}
