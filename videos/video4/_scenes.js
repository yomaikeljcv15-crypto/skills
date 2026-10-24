// ---------- ESCENAS · VIDEO 4: LA ESTACIÓN QUE ASCIENDE ----------
let performanceT = 0;
const S = [];
const SUIT = {...YOU, shirt: '#E07A2E', sleeve: '#E07A2E', pants: '#C9651F', hair: '#3A2A1F'};
const LUCIA = {...SUIT, hair: '#1E1410', hairStyle: 'long', skin: '#E9B88F'};
const SEA1 = '#04121A', SEA2 = '#0B2A36', GLOW = '#46E0A8';

function interior(lt, lights = 1) {
  X.fillStyle = lights ? '#25313A' : '#070B0E'; X.fillRect(0, 0, W, IL_H);
  for (let i = 0; i < 6; i++) { rr(0, 60 + i * 190, W, 14, 0, lights ? '#1C262E' : '#05080A'); }
  for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) circ(40 + i * 125, 67 + j * 190, 5, lights ? '#56636E' : '#11161A');
  X.fillStyle = lights ? '#1A2229' : '#05080A'; X.fillRect(0, 930, W, IL_H - 930);
  if (lights) { X.fillStyle = 'rgba(255,240,200,.06)'; X.beginPath(); X.moveTo(400, 0); X.lineTo(680, 0); X.lineTo(900, 930); X.lineTo(180, 930); X.fill(); }
}
function porthole(x, y, r, lt, o = {}) {
  circ(x, y, r + 26, '#6D7A85'); circ(x, y, r + 10, '#3D4852');
  X.save(); X.beginPath(); X.arc(x, y, r, 0, Math.PI * 2); X.clip();
  X.fillStyle = SEA1; X.fillRect(x - r, y - r, 2 * r, 2 * r);
  const sp = o.fast ? 900 : 40;
  for (let i = 0; i < 50; i++) { const px = x - r + rnd(i) * 2 * r, py = y - r + ((rnd(i + 5) * 2 * r + lt * sp * (o.fast ? 1 : (.3 + rnd(i)))) % (2 * r)); if (o.fast) { X.strokeStyle = 'rgba(220,240,255,.6)'; X.lineWidth = 3; X.beginPath(); X.moveTo(px, py); X.lineTo(px, py - 30); X.stroke(); } else circ(px, py, 2 + rnd(i) * 2, 'rgba(220,240,255,.5)'); }
  X.restore(); for (let a = 0; a < 8; a++) circ(x + Math.cos(a * Math.PI / 4) * (r + 18), y + Math.sin(a * Math.PI / 4) * (r + 18), 6, '#A9B4BE');
}
function console_(x, y, w, h, lt, dim = 0) {
  rr(x, y, w, h, 12, '#2E3A44'); rr(x + 20, y + 20, w - 40, h * .55, 8, '#06110D');
  for (let i = 0; i < 8; i++) circ(x + 40 + i * (w - 80) / 7, y + h * .8, 9, rnd(i + Math.floor(lt * 2)) > .4 ? (dim ? '#1E4A3A' : GLOW) : '#333');
}
function depthGauge(x, y, r, depth, lt) {
  circ(x, y, r + 14, '#AEB8C1'); circ(x, y, r, '#0E1418');
  for (let i = 0; i <= 10; i++) { const a = Math.PI * .75 + i / 10 * Math.PI * 1.5; X.strokeStyle = '#DDE'; X.lineWidth = 4; X.beginPath(); X.moveTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); X.lineTo(x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92); X.stroke(); }
  const a = Math.PI * .75 + (depth / 4000) * Math.PI * 1.5; X.strokeStyle = C.red; X.lineWidth = 8; X.beginPath(); X.moveTo(x, y); X.lineTo(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78); X.stroke(); circ(x, y, 14, '#DDD');
  txt(Math.round(depth) + ' m', x, y + r * .45, F(900, r * .2), GLOW);
}
function sonar(x, y, r, lt, o = {}) {
  circ(x, y, r + 16, '#2E3A44'); circ(x, y, r, '#03140C');
  for (let k = 1; k < 4; k++) circ(x, y, r * k / 4, null, 'rgba(70,224,168,.25)', 2);
  const a = lt * 2.2; X.save(); X.beginPath(); X.moveTo(x, y); X.arc(x, y, r, a - .6, a); X.closePath(); X.fillStyle = 'rgba(70,224,168,.18)'; X.fill(); X.restore();
  X.strokeStyle = GLOW; X.lineWidth = 3; X.beginPath(); X.moveTo(x, y); X.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); X.stroke();
  if (o.ping !== undefined && o.ping >= 0 && o.ping < 1) circ(x, y, r * o.ping, null, `rgba(140,255,200,${1 - o.ping})`, 6);
  if (o.echo) { const [ex, ey, al] = o.echo; circ(x + ex * r, y + ey * r, 18, `rgba(255,90,90,${al})`); circ(x + ex * r, y + ey * r, 34, null, `rgba(255,90,90,${al * .6})`, 4); }
}
function hudSea(i) {
  const dep = [3200, 3200, 3200, 3200, 3200, 3150, 3100, 2700, 1800, 1200, 1100, 900, 300, 0][i], o2 = [98, 97, 96, 95, 94, 92, 90, 88, 84, 80, 72, 66, 60, 55][i];
  rr(W - 330, 20, 300, 64, 10, 'rgba(11,13,20,.85)', GLOW, 3); txt('PROF: ' + dep + ' m', W - 180, 53, MONO(26), GLOW);
  rr(W - 330, 96, 300, 64, 10, 'rgba(11,13,20,.85)', o2 < 75 ? C.red : C.ice, 3); txt('O₂: ' + o2 + ' %', W - 180, 129, MONO(26), o2 < 75 ? C.red : C.ice);
}
// 1 · SUBIENDO
S[0] = (lt, d) => {
  interior(lt); porthole(240, 330, 150, lt); console_(520, 600, 500, 330, lt);
  depthGauge(770, 330, 190, 3200 - clamp(lt / d) * 18, lt);
  person({...SUIT, x: 330, y: 930, h: 380, look: 1, eyeScale: lt > 2 ? 1.25 : 1, mouth: lt > 2 ? 'o' : 'line', blink: blinkAt(lt, 0)});
  tag('ESTACIÓN ABISAL · 03:10', 40, 40, GLOW); hudSea(0);
};
// 2 · SIN SUPERFICIE
S[1] = (lt, d) => {
  interior(lt);
  rr(80, 160, 560, 380, 16, '#2E3A44'); rr(100, 180, 520, 300, 8, '#120607');
  if (Math.floor(lt * 2) % 2 === 0) txt('ENLACE PERDIDO', 360, 300, MONO(42), C.red); txt('ÚLTIMO CONTACTO: 6 h', 360, 380, MONO(26), '#C46');
  rr(640, 600, 400, 160, 20, '#4A5560'); rr(650, 560, 380, 60, 20, '#8A9AAA');
  circ(720, 575, 30, LUCIA.skin); X.fillStyle = LUCIA.hair; X.beginPath(); X.arc(720, 575, 32, Math.PI, Math.PI * 2); X.fill();
  txt('z', 780, 520 - (lt * 20 % 40), F(800, 34), C.ice); txt('z', 810, 500 - ((lt * 20 + 20) % 40), F(800, 26), C.ice);
  person({...SUIT, x: 300, y: 930, h: 340, look: 1, blink: blinkAt(lt, 1), mouth: 'line'});
  tag('RADIO · SUPERFICIE', 40, 40, C.red); hudSea(1);
};
// 3 · PING
S[2] = (lt, d) => {
  X.fillStyle = '#071014'; X.fillRect(0, 0, W, IL_H);
  const rt = wordTime(2, 'responde');
  sonar(540, 540, 400, lt, {ping: lt / 1.6, echo: lt > rt ? [.5, -.35, clamp(Math.sin((lt - rt) * 4) * .5 + .7)] : null});
  tag('SONAR', 40, 40, GLOW); hudSea(2);
};
// 4 · REGLA 1
S[3] = (lt, d) => {
  interior(lt);
  X.save(); X.translate(540, 470); X.rotate(-.02); rr(-300, -330, 600, 660, 10, '#E9E4D2'); rr(-300, -330, 600, 90, 10, '#C9443C'); txt('PROTOCOLO 7', 0, -285, F(900, 50), '#FFF');
  for (let i = 0; i < 9; i++) rr(-250, -200 + i * 55, 500 - (i % 3) * 80, 14, 4, '#B9B3A2'); X.restore();
  const rt = wordTime(3, 'regla'); if (lt > rt) ruleCard(1, 'HAZ PING SOLO CADA 60 SEGUNDOS EXACTOS.', 'Ni uno antes. Ni uno después.', lt - rt, false);
  tag('PARED · MANUAL', 40, 40, C.yellow); hudSea(3);
};
// 5 · REGLA 2
S[4] = (lt, d) => {
  X.fillStyle = '#071014'; X.fillRect(0, 0, W, IL_H);
  const wave = (y, off, col, lab) => { X.strokeStyle = col; X.lineWidth = 5; X.beginPath(); for (let x = 80; x < 1000; x += 4) { const p = x - 120 - off; const v = p > 0 && p < 60 ? Math.sin(p / 60 * Math.PI) * 80 : 0; x === 80 ? X.moveTo(x, y - v) : X.lineTo(x, y - v); } X.stroke(); txt(lab, 80, y + 50, MONO(26), col, 'left'); };
  wave(820, 380, GLOW, 'ECO REAL: +0,5 s'); wave(1000, 0, C.red, 'ECO FALSO: 0,0 s');
  ruleCard(2, 'SI UN PING TE RESPONDE AL INSTANTE, NO CONTESTES.', 'Los ecos de verdad siempre llegan tarde.', lt, false);
  tag('PROTOCOLO 7', 40, 40, C.yellow); hudSea(4);
};
// 6 · AL INSTANTE
S[5] = (lt, d) => {
  const fl = rnd(Math.floor(lt * 14)) > .7 ? .5 : 0;
  X.fillStyle = '#071014'; X.fillRect(0, 0, W, IL_H);
  const p = (lt % 2.2) / 1.2;
  sonar(540, 540, 400, lt, {ping: p, echo: p < 1 ? [p * .7, -p * .5, 1] : null});
  if (fl) { X.fillStyle = `rgba(0,0,0,${fl})`; X.fillRect(0, 0, W, IL_H); }
  const it = wordTime(5, 'instante'); if (lt > it) { const k = ease((lt - it) / .3); X.save(); X.globalAlpha = k; rr(260, 960, 560, 90, 12, 'rgba(11,13,20,.92)', C.red, 4); txt('RETRASO: 0,00 s', 540, 1006, MONO(36), C.red); X.restore(); }
  tag('SONAR · ECO', 40, 40, C.red); hudSea(5);
};
// 7 · REGLA 3
S[6] = (lt, d) => {
  interior(lt); depthGauge(540, 520, 330, 3150 - clamp(lt / d) * 50, lt);
  ruleCard(3, 'SI LA PROFUNDIDAD BAJA SOLA, APAGA TODAS LAS LUCES.', '', lt, true); tag('PROTOCOLO 7', 40, 40, C.red); hudSea(6);
};
// 8 · OSCURIDAD
S[7] = (lt, d) => {
  interior(lt, 0); console_(560, 640, 440, 260, lt, 1); depthGauge(780, 340, 160, 2900 - clamp(lt / d) * 200, lt);
  const fast = lt > wordTime(7, 'rápido') - .3; porthole(280, 420, 210, lt, {fast});
  if (fast) { X.strokeStyle = 'rgba(255,255,255,.8)'; X.lineWidth = 6; X.beginPath(); X.moveTo(560, 320); X.lineTo(560, 160); X.moveTo(530, 200); X.lineTo(560, 160); X.lineTo(590, 200); X.stroke(); txt('SUBES', 560, 360, MONO(30), '#FFF'); }
  tag('LUCES APAGADAS', 40, 40, C.red); hudSea(7);
};
// 9 · GOLPES
S[8] = (lt, d) => {
  interior(lt, 0); X.fillStyle = '#10161B'; X.fillRect(80, 120, 920, 760);
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) circ(170 + i * 190, 200 + j * 190, 18, '#3A444C');
  const g1 = wordTime(8, 'golpe'), g2 = wordTime(8, 'golpe', 1), g0 = wordTime(8, 'golpea');
  for (const g of [g0, g1, g2]) { const k = (lt - g) / .7; if (k > 0 && k < 1) { circ(540, 500, 60 + k * 500, null, `rgba(232,185,49,${(1 - k) * .8})`, 10); } }
  tag('CASCO · 1.800 m', 40, 40, C.red); hudSea(8);
};
// 10 · EL CABLE
S[9] = (lt, d) => {
  X.fillStyle = '#021208'; X.fillRect(0, 0, W, IL_H);
  rr(240, 760, 600, 300, 60, '#1F5A3A'); rr(300, 700, 480, 90, 30, '#2B7A50'); circ(540, 700, 40, '#3FA36A');
  const sway = Math.sin(lt * 1.3) * 6; X.strokeStyle = '#7CFFB0'; X.lineWidth = 12; X.beginPath(); X.moveTo(540, 680); X.lineTo(540 + sway, -40); X.stroke();
  for (let i = 0; i < 40; i++) circ(rnd(i) * W, (rnd(i + 3) * IL_H + lt * 260) % IL_H, 3, 'rgba(160,255,200,.5)');
  X.fillStyle = 'rgba(0,0,0,.15)'; for (let y = 0; y < IL_H; y += 6) X.fillRect(0, y, W, 2);
  txt('CÁM. EXTERIOR · REC ●', 540, 1040, MONO(28), '#7CFFB0');
  tag('CÁMARA EXTERIOR', 40, 40, GLOW); hudSea(9);
};
// 11 · LUCÍA
S[10] = (lt, d) => {
  interior(lt, 0); X.fillStyle = 'rgba(70,224,168,.08)'; X.fillRect(0, 0, W, IL_H);
  person({...SUIT, x: 330, y: 930, h: 360, look: 1, mouth: 'worried', blink: blinkAt(lt, 2)});
  person({...LUCIA, x: 720, y: 930, h: 350, look: -1, arms: [0.1, -2.6], eyeScale: 1.2, mouth: 'line'});
  const b = (lt % 1.4) < .2; if (b) { X.fillStyle = 'rgba(232,185,49,.15)'; X.fillRect(0, 0, W, IL_H); }
  tag('LUCÍA DESPIERTA', 40, 40, C.yellow); hudSea(10);
};
// 12 · EL CARRETE
S[11] = (lt, d) => {
  X.fillStyle = '#05080C'; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(540, 470); X.rotate(lt * 1.6); circ(0, 0, 330, '#2E3640'); circ(0, 0, 250, '#5A4632');
  for (let i = 0; i < 18; i++) { X.strokeStyle = '#3E3022'; X.lineWidth = 6; X.beginPath(); X.arc(0, 0, 130 + i * 6.5, 0, Math.PI * 2); X.stroke(); }
  for (let k = 0; k < 6; k++) { X.rotate(Math.PI / 3); rr(-14, -330, 28, 200, 6, '#1C232B'); }
  circ(0, 0, 60, '#C9A46A'); X.restore();
  X.strokeStyle = '#AAB'; X.lineWidth = 10; X.beginPath(); X.moveTo(540 + 300, 470); X.lineTo(900, IL_H); X.stroke();
  const it = wordTime(11, 'izando'); if (lt > it) { const k = ease((lt - it) / .3); X.save(); X.globalAlpha = k; rr(240, 920, 600, 110, 14, 'rgba(11,13,20,.92)', C.red, 5); txt('TE ESTÁN IZANDO', 540, 977, F(900, 52), C.red); X.restore(); }
  tag('LO QUE OYES', 40, 40, C.red); hudSea(11);
};
// 13 · LO QUE PESCÓ
S[12] = (lt, d) => {
  const g = X.createLinearGradient(0, 0, 0, IL_H); g.addColorStop(0, '#1A2A3A'); g.addColorStop(.25, SEA2); g.addColorStop(1, SEA1); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  X.fillStyle = '#0D1820'; X.fillRect(0, 0, W, 170);
  X.strokeStyle = 'rgba(200,220,255,.5)'; X.lineWidth = 3; X.beginPath(); for (let x = 0; x <= W; x += 20) X.lineTo(x, 170 + Math.sin(x * .02 + lt * 2) * 6); X.stroke();
  const rise = ease(lt / d); const sy = lerp(1000, 520, rise);
  X.strokeStyle = '#AAB'; X.lineWidth = 4; X.beginPath(); X.moveTo(540, sy - 40); X.lineTo(540, 160); X.stroke();
  rr(490, sy - 40, 100, 60, 20, '#E07A2E'); circ(540, sy - 10, 12, '#FFE9A8');
  const s = ease((lt - 1.5) / (d - 1.5)); X.fillStyle = '#000'; X.beginPath(); X.ellipse(540, 90, 300 + s * 300, 140 + s * 60, 0, 0, Math.PI * 2); X.fill();
  if (lt > d * .55) { circ(380, 90, 22, `rgba(255,240,180,${ease((lt - d * .55) / .5)})`); circ(700, 90, 22, `rgba(255,240,180,${ease((lt - d * .55) / .5)})`); }
  tag('SUPERFICIE', 40, 40, C.red); hudSea(12);
};
// 14 · FINAL
S[13] = (lt, d) => { X.fillStyle = '#000'; X.fillRect(0, 0, W, IL_H); if (lt < 1.5) { X.globalAlpha = 1 - lt / 1.5; circ(380, 540, 22, '#FFF0B4'); circ(700, 540, 22, '#FFF0B4'); X.globalAlpha = 1; } };

const META = [
  ['3.200 m', 'ESTACIÓN ABISAL', 'SUBIENDO', C.yellow, 98, 'ALERTA'],
  ['+0 s', 'RADIO', 'SIN SUPERFICIE', C.white, 102, 'ALERTA'],
  ['+30 s', 'SONAR', 'PING', GLOW, 110, 'ALERTA'],
  ['+1 min', 'REGLA 1', 'CADA 60 S', C.yellow, 108, 'VIGILANCIA'],
  ['+2 min', 'REGLA 2', 'EL ECO PUNTUAL', C.yellow, 118, 'VIGILANCIA'],
  ['+4 min', 'SONAR', 'AL INSTANTE', C.red, 130, 'PELIGRO'],
  ['+5 min', 'REGLA 3', 'APAGA LAS LUCES', C.red, 128, 'PELIGRO'],
  ['2.700 m', 'OSCURIDAD', 'SUBES', C.red, 135, 'PELIGRO'],
  ['1.800 m', 'CASCO', 'GOLPES', C.red, 142, 'PELIGRO'],
  ['1.200 m', 'CÁMARA', 'EL CABLE', C.red, 150, 'AMENAZA'],
  ['1.100 m', 'O₂ 72 %', 'LUCÍA', C.yellow, 148, 'AMENAZA'],
  ['900 m', 'EL RITMO', 'EL CARRETE', C.red, 160, 'AMENAZA'],
  ['300 m', 'ARRIBA', 'LO QUE PESCÓ', C.red, 167, 'AMENAZA'],
  ['0 m', 'SUPERFICIE', '¿CORTARÍAS EL CABLE?', C.red, 150, 'AMENAZA'],
];
const KEY_Y = ['ping', 'sonar', 'protocolo', 'sesenta', 'luces', 'cable', 'ritmo'];
const KEY_R = ['responde', 'instante', 'imitara', 'sube', 'golpe', 'carrete', 'izando', 'pescó'];
const END_LINES = ['¿Cortarías el cable?', 'Escríbelo en los comentarios.'];
