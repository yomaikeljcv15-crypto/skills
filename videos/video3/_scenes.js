// ---------- ESCENAS · VIDEO 3: BALIZA DE AVALANCHA ----------
let performanceT = 0;
const S = [];
const SNOW = '#E8F1F8', SNOW2 = '#C9DAEA', SNOW3 = '#9FB8D1', SKY1 = '#22324F', SKY2 = '#5F7FA6';
const JACKET = {...YOU, shirt: C.yellow, sleeve: C.yellow, pants: '#2E3A5C', hair: '#2E5C8A', hairStyle: 'side'};

function skyMountain(lt, dark = 0) {
  const g = X.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, SKY1); g.addColorStop(1, SKY2); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  X.fillStyle = '#7F98B8'; X.beginPath(); X.moveTo(-50, 620); X.lineTo(260, 180); X.lineTo(520, 560); X.lineTo(760, 120); X.lineTo(1130, 640); X.fill();
  X.fillStyle = SNOW; X.beginPath(); X.moveTo(260, 180); X.lineTo(320, 270); X.lineTo(230, 260); X.fill(); X.beginPath(); X.moveTo(760, 120); X.lineTo(840, 230); X.lineTo(700, 210); X.fill();
  X.fillStyle = SNOW2; X.beginPath(); X.moveTo(-50, 1200); X.lineTo(-50, 640); X.quadraticCurveTo(540, 520, 1130, 660); X.lineTo(1130, 1200); X.fill();
  for (let i = 0; i < 60; i++) { const x = (rnd(i) * W + lt * 30 * (1 + rnd(i + 3))) % W, y = (rnd(i + 9) * IL_H + lt * 80 * (1 + rnd(i + 5))) % IL_H; circ(x, y, 2 + rnd(i) * 3, 'rgba(255,255,255,.7)'); }
  if (dark) { X.fillStyle = `rgba(5,10,25,${dark})`; X.fillRect(0, 0, W, IL_H); }
}
function beacon(x, y, s, dist, o = {}) {
  X.save(); X.translate(x, y); X.scale(s, s); X.rotate(o.rot || 0);
  rr(-130, -220, 260, 440, 40, '#F07A1A'); rr(-105, -190, 210, 250, 16, '#0E1A12');
  // flecha
  if (dist !== null) { X.save(); X.translate(0, -110); X.rotate(o.arrow || 0); X.fillStyle = '#8CFF9E'; X.beginPath(); X.moveTo(0, -50); X.lineTo(34, 0); X.lineTo(12, 0); X.lineTo(12, 40); X.lineTo(-12, 40); X.lineTo(-12, 0); X.lineTo(-34, 0); X.fill(); X.restore();
    txt(dist + ' m', 0, 0, F(900, 56), '#8CFF9E'); }
  txt(o.mode || 'EMITIR', 0, 44, MONO(o.modeSize || 20), o.modeCol || 'rgba(140,255,158,.55)');
  circ(0, 130, 46, '#C55F10'); circ(0, 130, 30, '#2A2A2A');
  if (o.beep) { for (let i = 0; i < 2; i++) { const k = (o.beep + i * .5) % 1; circ(0, -110, 140 + k * 140, null, `rgba(140,255,158,${(1 - k) * .5})`, 5); } }
  X.restore();
}
function underSnow(lt, o = {}) {
  X.fillStyle = '#8FB0CF'; X.fillRect(0, 0, W, IL_H);
  // capas de nieve compacta
  for (let i = 0; i < 9; i++) { X.fillStyle = i % 2 ? '#A9C3DC' : '#9AB8D5'; X.beginPath(); X.moveTo(0, 220 + i * 110); for (let x = 0; x <= W; x += 60) X.lineTo(x, 220 + i * 110 + Math.sin(x * .01 + i) * 14); X.lineTo(W, IL_H); X.lineTo(0, IL_H); X.fill(); }
  X.fillStyle = SKY2; X.fillRect(0, 0, W, 120); X.fillStyle = SNOW; X.fillRect(0, 110, W, 30);
  if (o.figures) { person({...JACKET, shirt: '#C94444', sleeve: '#C94444', x: 380, y: 120, h: 90}); person({...JACKET, shirt: '#3B82C4', sleeve: '#3B82C4', x: 700, y: 120, h: 90}); }
}
function hudBeacon(i, lt, d) {
  const sim = [0, 30, 45, 60, 120, 150, 300, 330, 480, 500, 540, 720, 760, 780], k = clamp(lt / d);
  const s = i < 13 ? lerp(sim[i], sim[i + 1], k) : 780, left = Math.max(0, 900 - 30 - s);
  if (i >= 1 && i <= 11) { const mm = Math.floor(left / 60), ss = Math.floor(left % 60), red = left < 300;
    rr(W - 300, 20, 270, 74, 10, 'rgba(11,13,20,.85)', red ? C.red : C.ice, 3); txt(`${mm}:${String(ss).padStart(2, '0')}`, W - 165, 58, F(900, 44), red ? C.red : C.ice); }
  const dist = [null, null, 14, 12, 9, 5, 2, 2, 2, 2, null, null, null, null][i];
  if (dist !== null) { rr(W - 300, 104, 270, 64, 10, 'rgba(11,13,20,.85)', '#8CFF9E', 3); txt('BALIZA: ' + dist + ' m', W - 165, 137, MONO(26), '#8CFF9E'); }
}
// 1 · ESTRUENDO
S[0] = (lt, d) => {
  skyMountain(lt);
  const k = ease((lt - 1.2) / 2.2);
  [[300, 760, '#C94444'], [470, 800, '#3B82C4'], [640, 770, '#4CC38A'], [520, 960, C.yellow]].forEach(([x, y, c], j) => person({...JACKET, shirt: c, sleeve: c, x, y, h: j === 3 ? 160 : 110, look: -1, eyeScale: lt > 1 ? 1.3 : 1, mouth: lt > 1 ? 'o' : 'line'}));
  if (k > 0) { X.fillStyle = 'rgba(232,241,248,.93)'; X.beginPath(); X.moveTo(-50, 380); X.lineTo(1130, 380); X.lineTo(1130, lerp(420, 1000, k)); for (let x = 1130; x >= -50; x -= 70) X.lineTo(x, lerp(420, 1000, k) + Math.sin(x * .03 + lt * 8) * 40); X.fill();
    for (let i = 0; i < 40; i++) circ(rnd(i) * W, lerp(420, 1000, k) + rnd(i + 2) * 60 - 30, 20 + rnd(i) * 40, 'rgba(255,255,255,.85)'); }
  if (lt > 3.4 && lt < 3.7) { X.fillStyle = '#FFF'; X.fillRect(0, 0, W, IL_H); }
  if (lt > 3.7) { X.fillStyle = SNOW; X.fillRect(0, 0, W, IL_H); X.fillStyle = SNOW2; for (let i = 0; i < 6; i++) ell(rnd(i) * W, 300 + rnd(i + 1) * 700, 160, 40, SNOW2);
    person({...JACKET, x: 540, y: 1000, h: 380, look: 0, eyeScale: 1.3, mouth: 'o', blink: blinkAt(lt, 1)}); }
  tag('LADERA NORTE · 15:42', 40, 40);
};
// 2 · 15 MINUTOS
S[1] = (lt, d) => {
  underSnow(lt);
  X.save(); X.translate(560, 700); X.rotate(-.3); person({...JACKET, shirt: '#C94444', sleeve: '#C94444', x: 0, y: 0, h: 300, arms: [2.6, -2.4], mouth: 'line'}); X.restore();
  ell(500, 560, 60, 40, 'rgba(30,50,80,.35)');
  const k = ease(lt / .5); X.save(); X.globalAlpha = k; rr(240, 240, 600, 200, 24, 'rgba(11,13,20,.9)', C.ice, 5); txt('15:00', 540, 345, F(900, 120), C.ice); X.restore();
  tag('BAJO LA NIEVE', 40, 40, C.ice); hudBeacon(1, lt, d);
};
// 3 · PIIP
S[2] = (lt, d) => {
  X.fillStyle = SNOW2; X.fillRect(0, 0, W, IL_H); vignette(.4);
  X.strokeStyle = C.yellow; X.lineWidth = 70; X.lineCap = 'round'; X.beginPath(); X.moveTo(-60, 1100); X.lineTo(330, 820); X.stroke();
  beacon(540, 560, 1.4, 14, {beep: lt * 1.4 % 1, arrow: Math.sin(lt * 2) * .15});
  tag('TU BALIZA', 40, 40, '#8CFF9E'); hudBeacon(2, lt, d);
};
// 4 · REGLA 1
S[3] = (lt, d) => {
  skyMountain(lt);
  X.fillStyle = SNOW; X.fillRect(0, 760, W, IL_H - 760);
  for (let i = 0; i < 6; i++) ell(200 + i * 120 - (lt * 40 % 120), 860, 30, 10, SNOW3);
  person({...JACKET, x: 540, y: 1000, h: 330, look: 1, arms: [0.1, -1.1]});
  ruleCard(1, 'SIGUE LA FLECHA, NO TU OÍDO.', 'Bajo la nieve nadie oye los gritos.', lt, false); tag('LADERA · BÚSQUEDA', 40, 40); hudBeacon(3, lt, d);
};
// 5 · 9 METROS
S[4] = (lt, d) => {
  X.fillStyle = SNOW; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(540, 1300); X.scale(2.4, 2.4); person({...JACKET, x: 0, y: 0, h: 500, look: 0, eyeScale: 1.1, mouth: 'o', blink: blinkAt(lt, .5)}); X.restore();
  // vaho demasiado cerca de la cara
  for (let i = 0; i < 4; i++) { const k = ((lt * .8 + i * .25) % 1); circ(560 + Math.sin(i * 3) * 50 + k * 60, 250 - k * 150, 40 + k * 80, `rgba(255,255,255,${(1 - k) * .7})`); }
  beacon(870, 300, .55, 9, {beep: lt * 1.6 % 1});
  tag('+2 MIN · TU RESPIRACIÓN', 40, 40); hudBeacon(4, lt, d);
};
// 6 · REGLA 2
S[5] = (lt, d) => {
  X.fillStyle = SNOW; X.fillRect(0, 0, W, IL_H);
  for (let k = 0; k < 24; k++) { const a = k * .7, r = 20 + k * 14, show = lt > k * .12; if (show) circ(540 + Math.cos(a) * r, 560 + Math.sin(a) * r, 9, SNOW3); }
  X.strokeStyle = '#555'; X.lineWidth = 12; const k = Math.min(23, Math.floor(lt / .12)), a = k * .7, r = 20 + k * 14; X.beginPath(); X.moveTo(540 + Math.cos(a) * r, 560 + Math.sin(a) * r); X.lineTo(540 + Math.cos(a) * r + 40, 560 + Math.sin(a) * r - 300); X.stroke();
  ruleCard(2, 'A MENOS DE 3 METROS: DEJA LA BALIZA.', 'Saca la sonda. Pincha en espiral.', lt, false); tag('SONDA', 40, 40); hudBeacon(5, lt, d);
};
// 7 · 2 METROS
S[6] = (lt, d) => {
  X.fillStyle = SNOW; X.fillRect(0, 0, W, IL_H);
  ell(540, 820, 360, 150, SNOW2); ell(540, 840, 300, 110, '#B7CCE0');
  const dig = Math.sin(lt * 7);
  person({...JACKET, x: 540, y: 760, h: 380, arms: [0.8 + dig * .4, -0.8 - dig * .4], look: 0, mouth: 'worried'});
  for (let i = 0; i < 8; i++) { const k = (lt * 1.5 + i / 8) % 1; circ(540 + (i % 2 ? 1 : -1) * (80 + k * 300), 760 - Math.sin(k * Math.PI) * 220, 16, SNOW); }
  const g = X.createRadialGradient(540, 560, 200, 540, 560, 760); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(40,55,80,${.35 + clamp(lt / d) * .45})`); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  tag('+5 MIN · CAVANDO', 40, 40, C.red); hudBeacon(6, lt, d);
};
// 8 · REGLA 3
S[7] = (lt, d) => {
  X.fillStyle = '#0B1A30'; X.fillRect(0, 0, W, IL_H);
  const br = .7 + Math.sin(lt * 9) * .15 * (1 - clamp(lt / d) * .6);
  X.save(); X.translate(540, 760); X.strokeStyle = C.ice; X.lineWidth = 4; circ(0, -330, 90, null, C.ice, 4);
  for (const s of [-1, 1]) { X.save(); X.scale(br, br); ell(s * 110, 0, 95, 170, 'rgba(110,198,255,.25)'); X.restore(); }
  for (let i = 0; i < 6; i++) { X.beginPath(); X.ellipse(0, -100 + i * 50, 200, 26, 0, Math.PI * .05, Math.PI * .95); X.stroke(); }
  X.restore();
  ruleCard(3, 'CUENTA TUS RESPIRACIONES.', 'Si se aceleran sin esfuerzo… para todo.', lt, true); tag('RADIOGRAFÍA · PULMONES', 40, 40, C.red); hudBeacon(7, lt, d);
};
// 9 · MÁS RÁPIDO
S[8] = (lt, d) => {
  X.fillStyle = SNOW2; X.fillRect(0, 0, W, IL_H);
  const nums = ['una', 'dos', 'tres', 'cuatro'];
  nums.forEach((w, j) => { const wt = wordTime(8, w); if (lt > wt) { const k = ease((lt - wt) / .25); X.save(); X.globalAlpha = k; txt(String(j + 1), 220 + j * 210, 520, F(900, 170 + j * 20), j > 1 ? C.red : '#2E3A5C'); X.restore(); } });
  const close = clamp(lt / d); const g = X.createRadialGradient(540, 540, 600 - close * 420, 540, 540, 900 - close * 380); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.97)'); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  tag('+8 MIN · RESPIRACIONES', 40, 40, C.red); hudBeacon(8, lt, d);
};
// 10 · EMITIR
S[9] = (lt, d) => {
  X.fillStyle = '#0B1A30'; X.fillRect(0, 0, W, IL_H);
  const k = ease((lt - wordTime(9, 'emitir')) / .5);
  beacon(540, 560, 1.6 + k * .2, 2, {mode: 'EMITIR', modeSize: 20 + k * 40, modeCol: k > 0 ? C.red : 'rgba(140,255,158,.55)'});
  const bt = wordTime(9, 'buscar'); if (lt > bt) { const kk = ease((lt - bt) / .3); X.save(); X.globalAlpha = kk; rr(170, 120, 300, 90, 10, 'rgba(11,13,20,.9)', '#666', 3); txt('BUSCAR', 320, 166, MONO(36), '#888'); X.strokeStyle = C.red; X.lineWidth = 8; X.beginPath(); X.moveTo(180, 200); X.lineTo(460, 130); X.stroke(); X.restore(); }
  tag('TU BALIZA', 40, 40, C.red); hudBeacon(9, lt, d);
};
// 11 · LA SEÑAL ERES TÚ
S[10] = (lt, d) => {
  underSnow(lt, {figures: true});
  const z = 1 + ease(lt / d) * .15; X.save(); X.translate(540, 700); X.scale(z, z); X.translate(-540, -700);
  X.save(); X.translate(560, 760); X.rotate(1.35); person({...JACKET, x: 0, y: 0, h: 330, arms: [2.2, -1.8], eyeScale: 1.2, mouth: 'o', look: 0}); X.restore();
  ell(905, 640, 70, 50, 'rgba(20,35,60,.35)');
  X.restore();
  txt('TÚ', 700, 560, F(900, 60), C.red); X.strokeStyle = C.red; X.lineWidth = 6; X.beginPath(); X.moveTo(690, 590); X.lineTo(610, 680); X.stroke();
  tag('BAJO 1 METRO DE NIEVE', 40, 40, C.red); hudBeacon(10, lt, d);
};
// 12 · 3:00
S[11] = (lt, d) => {
  underSnow(lt); X.fillStyle = 'rgba(30,60,110,.35)'; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(560, 760); X.rotate(1.35); person({...JACKET, x: 0, y: 0, h: 330, arms: [2.2, -1.8], blink: true, mouth: 'line'}); X.restore();
  ell(905, 640, 70 * (1 - clamp(lt / d) * .6), 50 * (1 - clamp(lt / d) * .6), 'rgba(20,35,60,.4)');
  const on = Math.floor(lt * 2) % 2 === 0; if (on) { rr(300, 230, 480, 170, 20, 'rgba(11,13,20,.9)', C.red, 5); txt('3:00', 540, 318, F(900, 110), C.red); }
  tag('+12 MIN · TU AIRE', 40, 40, C.ice); hudBeacon(11, lt, d);
};
// 13 · ¡ESTÁ AQUÍ!
S[12] = (lt, d) => {
  underSnow(lt, {figures: true});
  const pt = wordTime(12, 'toca'), k = ease((lt - pt + .8) / .8);
  X.strokeStyle = '#555'; X.lineWidth = 12; X.beginPath(); X.moveTo(790, 110); X.lineTo(790, lerp(110, 670, k)); X.stroke();
  X.save(); X.translate(560, 760); X.rotate(1.35); person({...JACKET, x: 0, y: 0, h: 330, arms: [2.2, -1.8], blink: lt < pt, eyeScale: 1.1, mouth: lt > pt ? 'o' : 'line'}); X.restore();
  const vt = wordTime(12, 'marca'); if (lt > vt) { const kk = ease((lt - vt) / .6); X.fillStyle = `rgba(255,250,220,${kk * .8})`; X.beginPath(); X.moveTo(740, 120); X.lineTo(840, 120); X.lineTo(960, 690); X.lineTo(640, 690); X.fill();
    X.save(); X.globalAlpha = kk; rr(560, 160, 460, 110, 55, 'rgba(245,245,245,.96)'); txt('¡Está aquí!', 790, 216, F(900, 46), '#111'); X.restore(); }
  tag('ARRIBA · RESCATE', 40, 40, C.green); hudBeacon(12, lt, d);
};
// 14 · FINAL
S[13] = (lt, d) => {
  X.fillStyle = SNOW; X.fillRect(0, 0, W, IL_H);
  person({...JACKET, x: 540, y: 980, h: 360, mouth: 'smile', look: 0, blink: blinkAt(lt, 2)});
  person({...JACKET, shirt: '#C94444', sleeve: '#C94444', x: 290, y: 980, h: 360, look: 1, mouth: 'smile', arms: [0.1, -1.0]});
  beacon(820, 520, .7, null, {mode: 'BUSCAR', modeSize: 30, modeCol: '#8CFF9E'});
};

const META = [
  ['+0 s', 'MONTAÑA', 'ESTRUENDO', C.yellow, 120, 'ALERTA'],
  ['+30 s', 'BAJO LA NIEVE', '15 MINUTOS', C.ice, 130, 'PELIGRO'],
  ['+45 s', 'TU BALIZA', 'PIIP', C.white, 128, 'PELIGRO'],
  ['+1 min', 'REGLA 1', 'SIGUE LA FLECHA', C.yellow, 125, 'VIGILANCIA'],
  ['+2 min', 'BÚSQUEDA', '9 METROS', C.white, 122, 'ALERTA'],
  ['+2 min 30 s', 'REGLA 2', 'LA SONDA', C.yellow, 124, 'VIGILANCIA'],
  ['+5 min', 'CAVANDO', '2 METROS', C.red, 140, 'PELIGRO'],
  ['+5 min 30 s', 'REGLA 3', 'CUENTA TU AIRE', C.red, 148, 'PELIGRO'],
  ['+8 min', 'RESPIRACIÓN', 'MÁS RÁPIDO', C.red, 155, 'PELIGRO'],
  ['+8 min 20 s', 'TU BALIZA', 'EMITIR', C.red, 160, 'AMENAZA'],
  ['+9 min', 'LA VERDAD', 'LA SEÑAL ERES TÚ', C.red, 165, 'AMENAZA'],
  ['+12 min', 'TU AIRE', '3:00', C.ice, 118, 'HIPOTERMIA', C.ice],
  ['+12 min 40 s', 'ARRIBA', '¡ESTÁ AQUÍ!', C.green, 98, 'RESCATE', C.green],
  ['+13 min', 'A SALVO', 'SOBREVIVISTE', C.green, 90, 'CALMA', C.green],
];
const KEY_Y = ['avalancha', 'quince', 'minutos', 'baliza', 'flecha', 'nueve', 'sonda', 'espiral', 'dos', 'respiraciones', 'aire'];
const KEY_R = ['enterrado', 'techo', 'emitir', 'tuya', 'frío', 'rápido', 'nadie'];
const END_LINES = ['Aprende a usar tu baliza.', 'La señal puede ser la tuya.'];
