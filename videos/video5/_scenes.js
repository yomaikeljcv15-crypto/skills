// ---------- ESCENAS · VIDEO 5: HABITACIÓN 4:44 ----------
let performanceT = 0;
const S = [];
const DANIEL = {...YOU};
const MARINA = {skin: '#EBC09A', hair: '#B5562E', hairStyle: 'long', shirt: '#F2F2F2', sleeve: '#F2F2F2', pants: '#E6E6E6', shoes: '#DDD'};
const ERNESTO = {skin: '#E2B791', hair: '#1A1A1A', hairStyle: 'side', shirt: '#4A5160', sleeve: '#4A5160', pants: '#3A404C', vest: '#3A404C'};
const TOMAS = {skin: '#C9926A', skin2: '#B57F59', hair: '#2A1B12', hairStyle: 'side', shirt: '#7A3B2E', sleeve: '#7A3B2E', pants: '#2E3A5C', shoes: '#5A4030', eyeScale: .9};
const RECEP = {skin: '#E6D3C3', skin2: '#D6BFAE', hair: '#101010', hairStyle: 'side', shirt: '#E8E8E8', sleeve: '#E8E8E8', vest: '#2E6B4F', pants: '#2B2B2B', mouth: 'grin', pupil: .3};

function motelRoom(lt, o = {}) {
  X.fillStyle = '#3A2E3E'; X.fillRect(0, 0, W, IL_H);
  for (let x = 0; x < W; x += 90) { X.fillStyle = x / 90 % 2 ? '#41344A' : '#3A2E3E'; X.fillRect(x, 0, 45, 930); }
  X.fillStyle = '#2A2028'; X.fillRect(0, 930, W, IL_H - 930);
  // ventana con lluvia
  rr(60, 140, 330, 420, 6, '#1E1810'); X.save(); X.beginPath(); X.rect(76, 156, 298, 388); X.clip();
  X.fillStyle = '#0E1526'; X.fillRect(76, 156, 298, 388);
  X.strokeStyle = 'rgba(180,200,255,.35)'; X.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = 76 + rnd(i) * 298, y = 156 + ((rnd(i + 4) * 388 + lt * 700) % 388); X.beginPath(); X.moveTo(x, y); X.lineTo(x - 6, y + 26); X.stroke(); }
  if (o.reflection) { X.globalAlpha = .55; circ(300, 260, 46, null, '#DDD', 4); X.strokeStyle = '#DDD'; X.lineWidth = 4; X.beginPath(); X.moveTo(300, 260); X.lineTo(300, 228); X.moveTo(300, 260); X.lineTo(278, 272); X.stroke(); txt('3:58', 300, 330, MONO(26), '#DDD'); X.globalAlpha = 1; }
  X.restore();
  // reloj de pared
  circ(560, 260, 80, '#EEE'); circ(560, 260, 80, null, '#5A4A3A', 10);
  X.strokeStyle = '#111'; X.lineWidth = 6; X.beginPath(); X.moveTo(560, 260); X.lineTo(560 + Math.cos(-.3) * 45, 260 + Math.sin(-.3) * 45 + 10); X.moveTo(560, 260); X.lineTo(560 + 10, 260 - 62); X.stroke();
  txt('4:44', 560, 380, MONO(32), C.red);
  // puerta de la habitación
  door(700, 380, 290, 550, o.shake ? 1 : 0, true);
  rr(770, 330, 150, 36, 4, '#C9A46A'); txt('12', 845, 349, F(900, 28), '#111');
}
function peepPerson(p, lt, extra) {
  X.fillStyle = '#050608'; X.fillRect(0, 0, W, IL_H);
  const cx = 540, cy = 545, R = 430;
  X.save(); X.beginPath(); X.arc(cx, cy, R, 0, Math.PI * 2); X.clip();
  const g = X.createRadialGradient(cx, cy - 250, 40, cx, cy, R); g.addColorStop(0, '#4A3A20'); g.addColorStop(1, '#1A1420'); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  circ(cx, 140, 16, '#FFE9A8'); txt('PASILLO', cx, 940, MONO(24), '#6A5A40');
  const br = 1 + Math.sin(lt * 1.6) * .006; X.save(); X.translate(cx, 1240); X.scale(br, br); person({...p, x: 0, y: 0, h: 860, look: 0, blink: blinkAt(lt, 1.3)}); X.restore();
  if (extra) extra();
  const v = X.createRadialGradient(cx, cy, R * .55, cx, cy, R); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.95)'); X.fillStyle = v; X.fillRect(0, 0, W, IL_H);
  X.restore(); circ(cx, cy, R, null, '#1A1A1A', 22);
}
function bubble(s, x, y, w, k) { X.save(); X.globalAlpha = k; rr(x - w / 2, y - 55, w, 110, 55, 'rgba(245,245,245,.96)'); txt(s, x, y + 1, F(800, 36), '#111'); X.restore(); }

// 1 · TRES PISTAS
S[0] = (lt, d) => {
  X.fillStyle = '#1A1420'; X.fillRect(0, 0, W, IL_H);
  for (let i = 0; i < 6; i++) door(60 + i * 340, 420, 220, 520, 0, false);
  const on = rnd(Math.floor(lt * 6)) > .15; rr(300, 140, 480, 120, 14, '#120A0E', on ? C.red : '#4A1A20', 6); txt('VACANTE', 540, 202, F(900, 70), on ? C.red : '#4A1A20');
  ['?', '?', '?'].forEach((q, j) => { const k = ease((lt - .8 - j * .4) / .3); if (k > 0) { X.save(); X.globalAlpha = k; circ(300 + j * 240, 720, 80, 'rgba(11,13,20,.9)'); circ(300 + j * 240, 720, 80, null, C.yellow, 6); txt(q, 300 + j * 240, 725, F(900, 100), C.yellow); X.restore(); } });
  tag('MOTEL · CARRETERA 9', 40, 40, C.red);
};
// 2 · EL REGISTRO
S[1] = (lt, d) => {
  X.fillStyle = '#3A2E3E'; X.fillRect(0, 0, W, IL_H); rr(0, 640, W, 300, 0, '#5A3D29'); rr(0, 620, W, 40, 0, '#6B4A33');
  person({...RECEP, x: 760, y: 640, h: 520, look: -1, blink: blinkAt(lt, 2)});
  person({...DANIEL, x: 260, y: 1020, h: 520, look: 1, arms: [0.1, -1.2], mouth: 'line', blink: blinkAt(lt, 0)});
  X.save(); X.translate(470, 690); X.rotate(-.05); rr(-120, -40, 240, 120, 6, '#EFE6CF'); txt('REGISTRO', 0, -10, MONO(20), '#555'); txt('Daniel', 0, 40, 'italic 600 34px "DejaVu Serif"', '#2A2A6A'); X.restore();
  const lk = wordTime(1, 'llave'); if (lt > lk) { const k = ease((lt - lk) / .4); X.save(); X.globalAlpha = k; rr(760, 760, 200, 130, 10, '#3A2A1E', '#C9A46A', 4); rr(835, 800, 50, 40, 6, '#C9A46A'); X.strokeStyle = '#C9A46A'; X.lineWidth = 7; X.beginPath(); X.arc(860, 800, 17, Math.PI, 0); X.stroke(); txt('CAJÓN', 860, 870, MONO(18), '#C9A46A'); X.restore(); }
  tag('RECEPCIÓN · 21:10', 40, 40, C.yellow);
};
// 3 · 4:44
S[2] = (lt, d) => {
  motelRoom(lt, {reflection: true, shake: (lt % 1.2) < .2 && lt > 1});
  if (lt > 1) knockRings(845, 650, (lt % 1.2) / 1.2);
  person({...DANIEL, x: 420, y: 930, h: 380, look: 1, eyeScale: 1.25, mouth: 'o'});
  tag('HABITACIÓN 12', 40, 40);
};
// 4 · MARINA
S[3] = (lt, d) => {
  peepPerson(MARINA, lt, () => { rr(600, 640, 110, 160, 20, '#8FD3E8'); });
  const k = ease((lt - wordTime(3, 'vengo')) / .3); bubble('Vengo de la piscina…', 540, 960, 640, k);
  tag('PUERTA · HUÉSPED 1', 40, 40, C.yellow);
};
// 5 · ERNESTO
S[4] = (lt, d) => {
  peepPerson(ERNESTO, lt, () => { X.strokeStyle = 'rgba(160,190,255,.6)'; X.lineWidth = 3; for (let i = 0; i < 14; i++) { const x = 360 + rnd(i) * 360, y = 300 + ((rnd(i + 2) * 500 + lt * 200) % 500); X.beginPath(); X.moveTo(x, y); X.lineTo(x, y + 18); X.stroke(); } });
  const k = ease((lt - wordTime(4, 'daniel')) / .3); bubble('Daniel, ábreme.', 540, 960, 560, k);
  tag('PUERTA · HUÉSPED 2', 40, 40, C.yellow);
};
// 6 · TOMÁS
S[5] = (lt, d) => {
  peepPerson({...TOMAS, h: 860}, lt, () => { X.strokeStyle = '#8A4A3A'; X.lineWidth = 8; X.beginPath(); X.moveTo(470, 160); X.lineTo(500, 220); X.stroke(); });
  const k = ease((lt - wordTime(5, 'llegué')) / .3); bubble('No le abras a nadie. Ni a mí.', 540, 960, 760, k);
  tag('PUERTA · HUÉSPED 3', 40, 40, C.red);
};
// 7 · REGLA 1
S[6] = (lt, d) => { motelRoom(lt, {reflection: true}); X.fillStyle = 'rgba(0,0,0,.45)'; X.fillRect(0, 0, W, IL_H); ruleCard(1, 'NUNCA ABRAS A QUIEN SABE MÁS DE LO QUE DEBERÍA.', '', lt, false); tag('REGLAS DEL MOTEL', 40, 40, C.yellow); };
// 8 · REGLA 2
S[7] = (lt, d) => { motelRoom(lt, {reflection: true}); X.fillStyle = 'rgba(0,0,0,.45)'; X.fillRect(0, 0, W, IL_H); ruleCard(2, 'DESCONFÍA DEL QUE TIENE PRISA.', '', lt, false); tag('REGLAS DEL MOTEL', 40, 40, C.yellow); };
// 9 · REGLA 3
S[8] = (lt, d) => { motelRoom(lt, {reflection: true}); X.fillStyle = 'rgba(0,0,0,.35)'; X.fillRect(0, 0, W, IL_H); ruleCard(3, 'EL RELOJ DE ESTA HABITACIÓN NO ES TUYO.', '', lt, true); tag('REGLAS DEL MOTEL', 40, 40, C.red); };
// 10 · DECIDE
S[9] = (lt, d) => {
  X.fillStyle = '#0B0D14'; X.fillRect(0, 0, W, IL_H);
  [[MARINA, 190], [ERNESTO, 540], [TOMAS, 890]].forEach(([p, x], j) => { X.save(); X.beginPath(); X.arc(x, 420, 150, 0, Math.PI * 2); X.clip(); X.fillStyle = '#2A2018'; X.fillRect(x - 150, 270, 300, 300); person({...p, x, y: 860, h: 520, look: 0}); X.restore(); circ(x, 420, 150, null, '#333', 10); txt(['MARINA', 'ERNESTO', 'TOMÁS'][j], x, 610, MONO(28), C.white); });
  const n = Math.max(1, 5 - Math.floor(clamp(lt / (d * .9)) * 5)); txt(String(n), 540, 860, F(900, 220), C.red);
  tag('DECIDE', 40, 40, C.red);
};
// 11 · CLIC
S[10] = (lt, d) => {
  motelRoom(lt, {reflection: true});
  const ct = wordTime(10, 'clic'); const open = ease((lt - ct) / 1);
  rr(60, 600, 220, 330, 4, '#2A2028'); rr(60, 600, 220 * (1 - open * .7), 330, 4, '#6B4A33'); if (open > 0) { X.fillStyle = `rgba(255,240,200,${open * .35})`; X.beginPath(); X.moveTo(60 + 220 * (1 - open * .7), 600); X.lineTo(60 + 220, 600); X.lineTo(420, 930); X.lineTo(60 + 220 * (1 - open * .7), 930); X.fill(); }
  person({...DANIEL, x: 640, y: 930, h: 380, look: lt > ct ? -1 : 1, arms: [0.1, -1.3], eyeScale: lt > ct ? 1.35 : 1, mouth: lt > ct ? 'o' : 'line'});
  tag('HABITACIÓN 12 · BAÑO', 40, 40, C.red);
};
// 12 · EL RECEPCIONISTA
S[11] = (lt, d) => {
  motelRoom(lt, {reflection: true});
  rr(60, 600, 66, 330, 4, '#6B4A33');
  const k = ease(lt / 1.2); person({...RECEP, x: lerp(120, 330, k), y: 930, h: 470, look: 1, arms: [0.1, -1.6], blink: false});
  X.save(); X.translate(lerp(120, 330, k) + 60, 640); for (let i = 0; i < 5; i++) { X.save(); X.rotate(-.4 + i * .2); rr(-4, 0, 8, 46, 2, '#C9A46A'); X.restore(); } circ(0, 0, 18, null, '#C9A46A', 5); X.restore();
  const rt = wordTime(11, 'adelantó'); if (lt > rt) { const kk = ease((lt - rt) / .6); X.strokeStyle = C.red; X.lineWidth = 8; X.beginPath(); X.arc(560, 260, 110, -Math.PI / 2, -Math.PI / 2 + kk * Math.PI * .9); X.stroke(); txt('+46 MIN', 560, 410, MONO(30), C.red); }
  tag('LLAVE MAESTRA', 40, 40, C.red);
};
// 13 · LAS PISTAS
S[12] = (lt, d) => {
  X.fillStyle = '#0B0D14'; X.fillRect(0, 0, W, IL_H);
  const items = [['marina', 'PELO SECO', 'Dijo venir de la piscina.'], ['ernesto', 'SABÍA TU NOMBRE', 'Solo estaba en el registro.'], ['reflejo', 'EL RELOJ: 3:58', 'Alguien lo adelantó.'], ['tomás', 'TOMÁS', 'Decía la verdad.']];
  items.forEach(([w, a, b], j) => { const wt = wordTime(12, w); if (lt > wt - .2) { const k = ease((lt - wt + .2) / .35); X.save(); X.globalAlpha = k; X.translate(0, (1 - k) * 30);
    const ok = j === 3, col = ok ? C.green : C.red; rr(70, 60 + j * 200, 940, 170, 16, 'rgba(20,24,36,.95)', col, 4); txt(ok ? '✓' : '✗', 150, 145 + j * 200, F(900, 80), col); txt(a, 230, 120 + j * 200, F(900, 46), C.white, 'left'); txt(b, 230, 178 + j * 200, F(700, 32), '#AAB', 'left'); X.restore(); } });
  const nt = wordTime(12, 'nadie'); if (lt > nt - .5) { const k = ease((lt - nt + .5) / .4); X.save(); X.globalAlpha = k; rr(140, 880, 800, 140, 20, C.red); txt('NO ABRIR A NADIE', 540, 952, F(900, 58), '#FFF'); X.restore(); }
  tag('SOLUCIÓN', 40, 40, C.green);
};
// 14 · FINAL
S[13] = (lt, d) => { motelRoom(lt, {reflection: true}); X.fillStyle = 'rgba(0,0,0,.6)'; X.fillRect(0, 0, W, IL_H); for (let i = 0; i <= 9; i++) { const k = i / 9, x = lerp(730, 960, k), y = 600 + Math.sin(k * Math.PI) * 60; X.save(); X.translate(x, y); X.rotate(i % 2 ? .6 : -.6); X.beginPath(); X.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2); X.strokeStyle = '#C9A46A'; X.lineWidth = 5; X.stroke(); X.restore(); } rr(705, 585, 30, 40, 4, '#8A7A5A'); rr(955, 575, 30, 40, 4, '#8A7A5A'); };

const META = [
  ['4:44', 'MOTEL', 'TRES PISTAS', C.yellow, 95, 'ALERTA'],
  ['21:10', 'RECEPCIÓN', 'EL REGISTRO', C.white, 92, 'CALMA', C.green],
  ['4:44', 'HABITACIÓN 12', 'TOCAN', C.yellow, 110, 'ALERTA'],
  ['4:44', 'PUERTA', 'MARINA', C.white, 115, 'ALERTA'],
  ['4:45', 'PUERTA', 'ERNESTO', C.white, 120, 'ALERTA'],
  ['4:45', 'PUERTA', 'TOMÁS', C.red, 132, 'PELIGRO'],
  ['4:46', 'REGLA 1', 'SABE DEMASIADO', C.yellow, 125, 'VIGILANCIA'],
  ['4:46', 'REGLA 2', 'LA PRISA', C.yellow, 125, 'VIGILANCIA'],
  ['4:46', 'REGLA 3', 'EL RELOJ NO ES TUYO', C.red, 135, 'PELIGRO'],
  ['4:47', 'DECIDE', '5 SEGUNDOS', C.red, 150, 'PELIGRO'],
  ['4:47', 'DETRÁS DE TI', 'CLIC', C.red, 160, 'AMENAZA'],
  ['4:47', 'BAÑO', 'EL RECEPCIONISTA', C.red, 167, 'AMENAZA'],
  ['—', 'SOLUCIÓN', 'LAS PISTAS', C.green, 140, 'REVELACIÓN'],
  ['—', '¿LAS VISTE?', 'VUELVE A VERLO', C.yellow, 120, 'ALERTA'],
];
const KEY_Y = ['pistas', 'registro', 'llave', 'marina', 'ernesto', 'tomás', 'reloj', 'prisa'];
const KEY_R = ['clic', 'recepcionista', 'adelantó', 'seco', 'nombre', 'nadie', 'verdad'];
const END_LINES = ['¿Viste la pista del reloj?', 'Escribe el segundo exacto.'];
