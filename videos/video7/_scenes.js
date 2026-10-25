// ---------- ESCENAS · VIDEO 7: TRIAJE AL REVÉS ----------
let performanceT = 0;
const S = [];
const LEO = {...YOU, shirt: '#C94444', sleeve: '#C94444', hair: '#2A1B14'};
const CARO = {skin: '#E9B88F', hair: '#4A2A18', hairStyle: 'long', shirt: '#2E9A8A', sleeve: '#2E9A8A', pants: '#2E3A5C'};

function stormField(lt, o = {}) {
  const g = X.createLinearGradient(0, 0, 0, 760); g.addColorStop(0, '#1A1E2C'); g.addColorStop(1, '#3E4A5E'); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  for (let i = 0; i < 9; i++) { const x = ((i * 170 + lt * 25) % 1400) - 200, y = 90 + (i % 3) * 70; ell(x, y, 190, 70, '#2A3040'); ell(x + 90, y + 20, 150, 60, '#232837'); }
  X.fillStyle = '#3F5A3A'; X.fillRect(0, 760, W, IL_H - 760); X.fillStyle = '#4C6B45'; for (let i = 0; i < 40; i++) rr(rnd(i) * W, 770 + rnd(i + 2) * 300, 4, 18, 2, '#4C6B45');
  if (o.car) { rr(860, 700, 160, 60, 14, '#3B5BA0'); circ(895, 765, 16, '#111'); circ(985, 765, 16, '#111'); }
  if (o.rain) { X.strokeStyle = 'rgba(200,210,230,.35)'; X.lineWidth = 2; for (let i = 0; i < 60; i++) { const x = rnd(i) * W, y = (rnd(i + 5) * IL_H + lt * 900) % IL_H; X.beginPath(); X.moveTo(x, y); X.lineTo(x - 8, y + 28); X.stroke(); } }
}
function bolt(x, y0, y1, seed, w = 10) {
  X.strokeStyle = '#FFFFFF'; X.lineWidth = w; X.shadowColor = '#AFC8FF'; X.shadowBlur = 40; X.beginPath(); X.moveTo(x, y0); let cx = x;
  for (let y = y0; y < y1; y += 60) { cx += (rnd(seed + y) - .5) * 120; X.lineTo(cx, y); } X.lineTo(x, y1); X.stroke(); X.shadowBlur = 0;
}
function lichtenberg(x, y, ang, len, depth, k, seed) {
  if (depth <= 0 || len < 8) return; const ex = x + Math.cos(ang) * len * k, ey = y + Math.sin(ang) * len * k;
  X.strokeStyle = `rgba(214,70,70,${.25 + depth * .1})`; X.lineWidth = depth * 2.2; X.beginPath(); X.moveTo(x, y); X.lineTo(ex, ey); X.stroke();
  if (k < .99) return;
  lichtenberg(ex, ey, ang - .45 - rnd(seed) * .3, len * .72, depth - 1, 1, seed + 1); lichtenberg(ex, ey, ang + .4 + rnd(seed + 7) * .3, len * .68, depth - 1, 1, seed + 3);
}
function hudCaro(i) {
  if (i < 4 || i > 12) return;
  const ok = i >= 10, col = ok ? C.green : C.red;
  rr(W - 330, 20, 300, 64, 10, 'rgba(11,13,20,.85)', col, 3); txt('CARO RESPIRA: ' + (ok ? 'SÍ' : 'NO'), W - 180, 53, MONO(24), col);
  if (i >= 8) { rr(W - 330, 96, 300, 64, 10, 'rgba(11,13,20,.85)', C.yellow, 3); txt('EMERGENCIAS: ' + (i >= 12 ? 'AQUÍ' : 'EN CAMINO'), W - 180, 129, MONO(22), C.yellow); }
}
// 1 · LA REGLA
S[0] = (lt, d) => {
  stormField(lt, {rain: true});
  const fl = lt < .35 || (lt > 1.1 && lt < 1.3); if (fl) { X.fillStyle = 'rgba(255,255,255,.85)'; X.fillRect(0, 0, W, IL_H); }
  if (lt < 1.4) bolt(560, 0, 780, 3, 14);
  const rt = wordTime(0, 'muertos'); if (lt > rt) { const k = ease((lt - rt) / .35); X.save(); X.globalAlpha = k; rr(140, 380, 800, 200, 20, 'rgba(11,13,20,.92)', C.red, 6); txt('LOS MUERTOS', 540, 450, F(900, 70), C.red); txt('PRIMERO', 540, 525, F(900, 70), C.white); X.restore(); }
  tag('TORMENTA ELÉCTRICA', 40, 40, C.red);
};
// 2 · TORMENTA
S[1] = (lt, d) => {
  stormField(lt, {car: true});
  const x = 240 + lt * 22;
  person({...LEO, x: x - 130, y: 960, h: 300, look: 1}); person({...CARO, x, y: 960, h: 290, look: 1, mouth: 'smile'}); person({...YOU, x: x + 140, y: 960, h: 300, look: 1});
  tag('CAMPO ABIERTO · 17:20', 40, 40);
};
// 3 · EL PELO
S[2] = (lt, d) => {
  stormField(lt);
  const xs = [290, 430, 570];
  [LEO, CARO, YOU].forEach((p, j) => { person({...p, x: xs[j], y: 960, h: 320, look: 0, eyeScale: 1.25, mouth: 'o'});
    X.strokeStyle = '#3A2A1F'; X.lineWidth = 6; for (let s = -3; s <= 3; s++) { X.beginPath(); X.moveTo(xs[j] + s * 9, 960 - 320 * 1.12); X.lineTo(xs[j] + s * 14, 960 - 320 * 1.12 - 40 - Math.sin(lt * 30 + s) * 6); X.stroke(); } });
  for (let k = 0; k < 3; k++) { const r = ((lt * 1.6 + k / 3) % 1); circ(430, 520, 120 + r * 300, null, `rgba(200,210,255,${(1 - r) * .4})`, 4); }
  txt('ZZZZZ', 430, 220, MONO(40), '#AFC8FF');
  tag('ZUMBIDO', 40, 40, C.red);
};
// 4 · IMPACTO
S[3] = (lt, d) => {
  if (lt < .5) { X.fillStyle = '#FFF'; X.fillRect(0, 0, W, IL_H); bolt(430, 0, 900, 9, 26); return; }
  stormField(lt); X.fillStyle = `rgba(255,255,255,${clamp(1 - (lt - .5) / .6)})`; X.fillRect(0, 0, W, IL_H);
  for (const [p, x] of [[LEO, 300], [CARO, 500], [YOU, 700]]) { X.save(); X.translate(x, 980); X.rotate(Math.PI / 2); person({...p, x: 0, y: 0, h: 260, blink: true}); X.restore(); }
  tag('+0 s · IMPACTO', 40, 40, C.red);
};
// 5 · LOS DOS
S[4] = (lt, d) => {
  stormField(lt, {rain: true});
  X.save(); X.translate(160, 1000); X.rotate(Math.PI / 2 * .85); person({...LEO, x: 0, y: 0, h: 280, mouth: 'o', eyeScale: 1.2, arms: [0.8, -1.4]}); X.restore();
  if (Math.floor(lt * 3) % 2 === 0) txt('¡AAAH!', 300, 760, F(900, 50), C.red);
  X.save(); X.translate(520, 1010); X.rotate(Math.PI / 2); person({...CARO, x: 0, y: 0, h: 290, pupil: .8, mouth: 'line'}); X.restore();
  person({...YOU, x: 880, y: 960, h: 320, look: -1, eyeScale: 1.2, mouth: 'o', blink: blinkAt(lt, 1)});
  tag('+10 s', 40, 40, C.red); hudCaro(4);
};
// 6 · REGLA 1
S[5] = (lt, d) => {
  stormField(lt); X.fillStyle = 'rgba(0,0,0,.4)'; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(160, 1000); X.rotate(Math.PI / 2 * .85); person({...LEO, x: 0, y: 0, h: 280, mouth: 'o'}); X.restore();
  X.save(); X.translate(520, 1010); X.rotate(Math.PI / 2); person({...CARO, x: 0, y: 0, h: 290, pupil: .8}); X.restore();
  const k = ease((lt - 1) / 1); X.strokeStyle = C.yellow; X.lineWidth = 10; X.beginPath(); X.moveTo(300, 860); X.quadraticCurveTo(480, 760, lerp(300, 700, k), lerp(860, 900, k)); X.stroke();
  ruleCard(1, 'CON UN RAYO, PRIMERO AL QUE PARECE MUERTO.', 'El que grita está respirando.', lt, false); tag('TRIAJE AL REVÉS', 40, 40, C.yellow); hudCaro(5);
};
// 7 · REGLA 2
S[6] = (lt, d) => {
  stormField(lt); X.fillStyle = 'rgba(0,0,0,.4)'; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(340, 1010); X.rotate(Math.PI / 2); person({...CARO, x: 0, y: 0, h: 290, pupil: .8}); X.restore();
  const k = ease((lt - .8) / 1.2); X.strokeStyle = C.yellow; X.lineWidth = 40; X.lineCap = 'round'; X.beginPath(); X.moveTo(1100, 760); X.lineTo(lerp(1000, 760, k), lerp(760, 930, k)); X.stroke(); circ(lerp(1000, 760, k), lerp(760, 930, k), 26, C.skin);
  ruleCard(2, 'PUEDES TOCARLA.', 'El cuerpo no queda cargado de electricidad.', lt, false); tag('MITO', 40, 40, C.yellow); hudCaro(6);
};
// 8 · RADIOGRAFÍA
S[7] = (lt, d) => {
  X.fillStyle = '#07121C'; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(540, 0);
  circ(0, 240, 130, 'rgba(110,198,255,.1)'); circ(0, 240, 130, null, C.ice, 5);
  const off = lt > wordTime(7, 'apagó'); X.fillStyle = off ? 'rgba(224,72,72,.5)' : 'rgba(110,198,255,.3)'; X.beginPath(); X.ellipse(0, 320, 60, 30, 0, 0, Math.PI * 2); X.fill();
  if (off) { txt('✕', 0, 322, F(900, 50), '#FFF'); txt('CENTRO DE LA RESPIRACIÓN', 0, 410, MONO(24), C.red); }
  for (const s of [-1, 1]) ell(s * 120, 640, 90, 160, 'rgba(110,198,255,.18)');
  const beat = (Math.sin(lt * 7) > .6) ? 1.15 : 1; X.save(); X.translate(-20, 680); X.scale(beat, beat); X.fillStyle = C.red; X.beginPath(); X.moveTo(0, 30); X.bezierCurveTo(-60, -10, -40, -60, 0, -30); X.bezierCurveTo(40, -60, 60, -10, 0, 30); X.fill(); X.restore();
  txt('CORAZÓN: LATE', -220, 900, MONO(26), C.green); txt('PULMONES: QUIETOS', 220, 900, MONO(26), C.red);
  X.restore(); tag('RADIOGRAFÍA · CARO', 40, 40, C.ice); hudCaro(7);
};
// 9 · RESPIRA POR ELLA
S[8] = (lt, d) => {
  stormField(lt, {rain: true});
  X.save(); X.translate(420, 1010); X.rotate(Math.PI / 2); person({...CARO, x: 0, y: 0, h: 290, blink: true}); X.restore();
  const bend = (Math.sin(lt * 2.4) + 1) / 2; X.save(); X.translate(780, 1000); X.rotate(-.5 - bend * .35); person({...YOU, x: 0, y: 0, h: 300, look: -1}); X.restore();
  const n = Math.floor(lt / 2.6) + 1; rr(60, 160, 400, 80, 12, 'rgba(11,13,20,.85)', C.yellow, 3); txt('RESPIRACIONES: ' + n, 260, 200, MONO(28), C.yellow);
  person({...LEO, x: 160, y: 900, h: 250, look: 1, arms: [0.1, -2.4], mouth: 'o'}); rr(150, 560, 26, 44, 5, '#111');
  tag('+1 min', 40, 40, C.red); hudCaro(8);
};
// 10 · REGLA 3
S[9] = (lt, d) => {
  stormField(lt); X.fillStyle = 'rgba(0,0,0,.45)'; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(300, 1010); X.rotate(Math.PI / 2); person({...CARO, pants: C.ice, shoes: '#4A8AB8', x: 0, y: 0, h: 330, blink: true}); X.restore();
  const rt = wordTime(9, 'regla'); if (lt > rt) ruleCard(3, 'LAS PIERNAS AZULES NO SON LO QUE PARECEN.', 'Es una parálisis pasajera del rayo.', lt - rt, false);
  else { txt('AZULES · FRÍAS · SIN PULSO', 540, 760, F(900, 44), C.ice); }
  tag('KERAUNOPARÁLISIS', 40, 40, C.ice); hudCaro(9);
};
// 11 · AIRE
S[10] = (lt, d) => {
  stormField(lt); X.fillStyle = 'rgba(76,195,138,.08)'; X.fillRect(0, 0, W, IL_H);
  const br = Math.sin(lt * 2.2) * 6; X.save(); X.translate(420, 1010 - br); X.rotate(Math.PI / 2); person({...CARO, x: 0, y: 0, h: 290, blink: lt < 2, mouth: 'o'}); X.restore();
  person({...YOU, x: 820, y: 960, h: 320, look: -1, mouth: 'smile', blink: blinkAt(lt, 2)});
  tag('+4 min', 40, 40, C.green); hudCaro(10);
};
// 12 · EL TATUAJE DEL RAYO
S[11] = (lt, d) => {
  X.fillStyle = '#1A1E2C'; X.fillRect(0, 0, W, IL_H);
  rr(-40, 380, 1160, 360, 180, CARO.skin);
  const grow = clamp(lt / 2.5), fade = 1 - clamp((lt - (d - 2)) / 2) * .6;
  X.save(); X.beginPath(); X.roundRect(-40, 380, 1160, 360, 180); X.clip(); X.globalAlpha = fade; X.lineCap = 'round'; lichtenberg(60, 560, -.05, 230, 7, grow, 11); lichtenberg(60, 560, .25, 200, 6, grow, 23); X.restore();
  txt('FIGURAS DE LICHTENBERG', 540, 860, MONO(30), C.red);
  tag('BRAZO DE CARO', 40, 40, C.red); hudCaro(11);
};
// 13 · EL QUE GRITABA
S[12] = (lt, d) => {
  stormField(lt);
  const siren = Math.floor(lt * 3) % 2; rr(760, 640, 300, 130, 16, '#EEE'); rr(860, 610, 60, 30, 6, siren ? C.red : '#3B6FD8'); circ(800, 780, 22, '#111'); circ(1010, 780, 22, '#111');
  person({...LEO, x: 200, y: 960, h: 280, look: 1, mouth: 'line', blink: blinkAt(lt, 1)}); rr(150, 830, 60, 24, 8, '#F4F4F4');
  person({...CARO, x: 420, y: 960, h: 280, look: 1, mouth: 'smile', blink: blinkAt(lt, 2)}); person({...YOU, x: 600, y: 960, h: 300, look: -1, mouth: 'smile'});
  tag('LLEGA LA AMBULANCIA', 40, 40, C.green); hudCaro(12);
};
// 14 · FINAL
S[13] = (lt, d) => { X.fillStyle = '#0B0D14'; X.fillRect(0, 0, W, IL_H); if (lt < 1.2) bolt(540, 0, 900, 5, 8); rr(140, 760, 800, 120, 16, 'rgba(20,24,36,.95)', C.yellow, 3); txt('No sustituye un curso de primeros auxilios.', 540, 820, F(700, 30), '#AAB'); };

const META = [
  ['+0 s', 'TORMENTA', 'LA REGLA', C.red, 120, 'ALERTA'],
  ['−2 min', 'CAMPO', 'TORMENTA', C.white, 95, 'CALMA', C.green],
  ['−30 s', 'CAMPO', 'EL PELO', C.red, 130, 'PELIGRO'],
  ['+0 s', 'IMPACTO', 'EL RAYO', C.red, 160, 'PELIGRO'],
  ['+10 s', 'TUS AMIGOS', 'LOS DOS', C.red, 150, 'PELIGRO'],
  ['+15 s', 'REGLA 1', 'AL QUE NO SE MUEVE', C.yellow, 145, 'VIGILANCIA'],
  ['+20 s', 'REGLA 2', 'NO QUEMA', C.yellow, 140, 'VIGILANCIA'],
  ['+30 s', 'RADIOGRAFÍA', 'NO RESPIRA', C.red, 138, 'PELIGRO'],
  ['+1 min', 'CARO', 'RESPIRA POR ELLA', C.red, 135, 'PELIGRO'],
  ['+3 min', 'REGLA 3', 'LAS PIERNAS', C.ice, 130, 'VIGILANCIA'],
  ['+4 min', 'CARO', 'AIRE', C.green, 110, 'ALIVIO', C.green],
  ['+1 h', 'SU BRAZO', 'EL TATUAJE', C.red, 96, 'CALMA', C.green],
  ['+1 h', 'LEO', 'EL QUE GRITABA', C.green, 90, 'CALMA', C.green],
  ['—', 'PRIMEROS AUXILIOS', '¿A QUIÉN AYUDABAS?', C.yellow, 90, 'CALMA', C.green],
];
const KEY_Y = ['regla', 'leo', 'caro', 'emergencias', 'respiras', 'mito'];
const KEY_R = ['muertos', 'rayo', 'zumbido', 'muerto', 'azules', 'respirar', 'quemadura'];
const END_LINES = ['¿A quién habrías ayudado primero?', 'Ante una emergencia, llama a emergencias.'];
