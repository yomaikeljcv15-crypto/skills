// ---------- ESCENAS · VIDEO 6: 13,7 GRADOS (historia real) ----------
let performanceT = 0;
const S = [];
const ANNA = {skin: C.skin, hair: '#E3C26A', hairStyle: 'long', shirt: '#7A4FA0', sleeve: '#7A4FA0', pants: '#2E3A5C'};
const ANNA_COLD = {...ANNA, skin: '#B9C6D3', skin2: '#A9B6C3'};
const FR1 = {...YOU, shirt: '#C94444', sleeve: '#C94444'}, FR2 = {...YOU, shirt: '#3B82C4', sleeve: '#3B82C4', hair: '#2A1B14'};
const DOC = {...YOU, shirt: '#3FA38A', sleeve: '#3FA38A', pants: '#3FA38A', hair: '#3A2A1F'};

function thermo(x, y, s, temp, o = {}) {
  X.save(); X.translate(x, y); X.scale(s, s);
  rr(-34, -300, 68, 330, 34, '#EAF2F8'); circ(0, 40, 58, '#EAF2F8');
  const k = clamp((temp - 10) / 30), col = temp < 30 ? C.ice : temp < 35 ? C.yellow : C.red;
  rr(-16, 20 - 300 * k, 32, 300 * k + 20, 16, col); circ(0, 40, 42, col);
  for (let i = 0; i < 7; i++) rr(38, -270 + i * 45, 22, 5, 2, '#9AB');
  X.restore();
  if (!o.noLabel) txt(temp.toFixed(1).replace('.', ',') + ' °C', x, y + 120 * s, F(900, 56 * s), col);
}
function hudTemp(i, lt, d) {
  const T0 = [13.7, 37, 37, 33, 28, 22, 16, 13.7, 13.7, 13.7, 26, 36.4, 36.8, 36.8], T1 = [13.7, 37, 33, 28, 22, 16, 13.7, 13.7, 13.7, 26, 30, 36.6, 36.8, 36.8];
  const tmp = lerp(T0[i], T1[i], clamp(lt / d)), col = tmp < 30 ? C.ice : tmp < 35 ? C.yellow : C.green;
  rr(W - 300, 20, 270, 64, 10, 'rgba(11,13,20,.85)', col, 3); txt('TEMP: ' + tmp.toFixed(1).replace('.', ',') + ' °C', W - 165, 53, MONO(24), col);
  return tmp;
}
function iceCreek(lt) {
  const g = X.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, '#2B3E5C'); g.addColorStop(1, '#D9A88A'); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  X.fillStyle = '#7F98B8'; X.beginPath(); X.moveTo(-50, 560); X.lineTo(300, 220); X.lineTo(560, 520); X.lineTo(820, 180); X.lineTo(1130, 580); X.fill();
  X.fillStyle = '#E8F1F8'; X.fillRect(0, 560, W, IL_H - 560);
  X.fillStyle = '#9CC9E6'; X.beginPath(); X.moveTo(0, 820); X.quadraticCurveTo(540, 720, W, 860); X.lineTo(W, 960); X.quadraticCurveTo(540, 830, 0, 930); X.fill();
}
function hospitalBg(lt, dim = 0) {
  X.fillStyle = '#DDE6EC'; X.fillRect(0, 0, W, IL_H); X.fillStyle = '#C9D4DC'; X.fillRect(0, 880, W, IL_H - 880);
  for (let i = 0; i < 4; i++) rr(60 + i * 260, 80, 200, 40, 6, '#F4F8FA');
  if (dim) { X.fillStyle = `rgba(5,10,20,${dim})`; X.fillRect(0, 0, W, IL_H); }
}
function lyingPerson(p, x, y, s, o = {}) { X.save(); X.translate(x, y); X.rotate(Math.PI / 2); person({...p, x: 0, y: 0, h: 300 * s, blink: o.closed, mouth: o.mouth || 'line', arms: [0.05, -0.05]}); X.restore(); }

// 1 · AÚN NO
S[0] = (lt, d) => {
  hospitalBg(lt, .55); rr(140, 640, 800, 60, 12, '#F4F8FA'); rr(160, 700, 30, 180, 4, '#AAB'); rr(890, 700, 30, 180, 4, '#AAB');
  lyingPerson(ANNA_COLD, 220, 600, 1.4, {closed: true});
  X.fillStyle = 'rgba(200,230,255,.25)'; for (let i = 0; i < 30; i++) circ(rnd(i) * W, rnd(i + 3) * 600, 3 + rnd(i) * 4, 'rgba(220,240,255,.5)');
  thermo(800, 380, 1, 13.7); tag('HOSPITAL DE TROMSØ', 40, 40, C.ice); hudTemp(0, lt, d);
};
// 2 · ESQUIANDO
S[1] = (lt, d) => {
  iceCreek(lt);
  const x = 300 + lt * 40;
  person({...FR1, x: x - 160, y: 760, h: 230, look: 1}); person({...ANNA, x, y: 790, h: 240, look: 1, mouth: 'smile'}); person({...FR2, x: x + 170, y: 760, h: 230, look: 1});
  tag('NORUEGA · MAYO 1999', 40, 40); hudTemp(1, lt, d);
};
// 3 · EL HIELO
S[2] = (lt, d) => {
  iceCreek(lt);
  const k = ease((lt - .8) / 1);
  if (k < 1) { X.save(); X.translate(540, 820 + k * 60); X.rotate(k * Math.PI * .9); person({...ANNA, x: 0, y: 0, h: 240, eyeScale: 1.3, mouth: 'o'}); X.restore(); }
  else { X.strokeStyle = '#555'; X.lineWidth = 10; X.beginPath(); X.moveTo(500, 860); X.lineTo(470, 760); X.moveTo(580, 860); X.lineTo(610, 760); X.stroke(); }
  if (lt > 1.4) { X.strokeStyle = '#FFF'; X.lineWidth = 5; for (let i = 0; i < 8; i++) { X.beginPath(); X.moveTo(540, 870); X.lineTo(540 + Math.cos(i) * 180, 870 + Math.sin(i) * 50); X.stroke(); } for (let i = 0; i < 10; i++) circ(540 + Math.cos(i * 2) * (60 + (lt - 1.4) * 90), 860 - Math.abs(Math.sin(i * 3)) * (lt - 1.4) * 120, 10, '#CFE6F5'); }
  tag('+0 s · ARROYO', 40, 40, C.red); hudTemp(2, lt, d);
};
// 4 · BOLSA DE AIRE
S[3] = (lt, d) => {
  X.fillStyle = '#16384F'; X.fillRect(0, 0, W, IL_H); X.fillStyle = '#E8F1F8'; X.fillRect(0, 0, W, 200); X.fillStyle = '#BFD8EA'; X.fillRect(0, 200, W, 40);
  X.strokeStyle = 'rgba(160,210,240,.35)'; X.lineWidth = 6; for (let i = 0; i < 8; i++) { const y = 400 + i * 80, o = (lt * 160 + i * 70) % 300; X.beginPath(); X.moveTo(o, y); X.lineTo(o + 120, y); X.lineTo(o + 100, y - 15); X.stroke(); }
  ell(800, 262, 150, 42, 'rgba(220,240,255,.7)');
  lyingPerson(ANNA, 320, 330, 1.6, {mouth: 'o'});
  person({...FR1, x: 120, y: 200, h: 230, arms: [0.1, -1.4], look: 1}); person({...FR2, x: 230, y: 200, h: 230, arms: [0.1, -1.4], look: 1});
  tag('+1 min · BAJO EL HIELO', 40, 40, C.red); hudTemp(3, lt, d);
};
// 5 · SILENCIO
S[4] = (lt, d) => {
  X.fillStyle = '#0E2436'; X.fillRect(0, 0, W, IL_H); X.fillStyle = '#E8F1F8'; X.fillRect(0, 0, W, 200);
  const k = clamp(lt / d); ell(800, 262, 150 * (1 - k * .7), 42 * (1 - k * .7), `rgba(220,240,255,${.7 - k * .5})`);
  lyingPerson(k > .6 ? ANNA_COLD : ANNA, 320, 330, 1.6, {closed: k > .6});
  X.fillStyle = `rgba(5,15,30,${k * .5})`; X.fillRect(0, 0, W, IL_H);
  tag('+40 min', 40, 40, C.ice); hudTemp(4, lt, d);
};
// 6 · PARO
S[5] = (lt, d) => {
  X.fillStyle = '#07121C'; X.fillRect(0, 0, W, IL_H);
  X.save(); X.translate(540, 1050); X.strokeStyle = C.ice; X.lineWidth = 5;
  circ(0, -800, 150, 'rgba(110,198,255,.12)'); circ(0, -800, 150, null, C.ice, 5);
  const glow = .35 + Math.sin(lt * 2) * .15; X.fillStyle = `rgba(110,198,255,${glow})`; X.beginPath(); X.ellipse(0, -810, 100, 80, 0, 0, Math.PI * 2); X.fill();
  rr(-170, -620, 340, 420, 50, null, C.ice, 5); X.fillStyle = '#6A7A88'; X.beginPath(); X.moveTo(-30, -440); X.bezierCurveTo(-90, -500, -70, -560, -30, -540); X.bezierCurveTo(-10, -560, 30, -560, 30, -500); X.bezierCurveTo(30, -460, 0, -430, -30, -400); X.fill();
  X.restore();
  const pt = wordTime(5, 'pausa'); if (lt > pt - .3) { const k = ease((lt - pt + .3) / .3); X.save(); X.globalAlpha = k; rr(700, 180, 300, 90, 12, 'rgba(11,13,20,.9)', C.ice, 4); txt('EN PAUSA', 850, 226, F(900, 40), C.ice); X.restore(); }
  txt('CORAZÓN: DETENIDO', 540, 1000, MONO(30), '#8A9AA8');
  tag('RADIOGRAFÍA', 40, 40, C.ice); hudTemp(5, lt, d);
};
// 7 · LA SACAN
S[6] = (lt, d) => {
  iceCreek(lt); X.fillStyle = 'rgba(20,30,60,.45)'; X.fillRect(0, 0, W, IL_H);
  const dig = Math.sin(lt * 7);
  person({...DOC, shirt: '#E07A2E', sleeve: '#E07A2E', pants: '#C9651F', x: 320, y: 860, h: 300, arms: [0.6 + dig * .3, -0.8]}); person({...DOC, shirt: '#E07A2E', sleeve: '#E07A2E', pants: '#C9651F', x: 760, y: 860, h: 300, arms: [0.8, -0.6 - dig * .3]});
  const k = ease((lt - d * .4) / 1.2); lyingPerson(ANNA_COLD, 420, lerp(980, 900, k), 1.1, {closed: true});
  tag('+80 min · RESCATE', 40, 40, C.ice); hudTemp(6, lt, d);
};
// 8 · REGLA
S[7] = (lt, d) => { hospitalBg(lt, .6); ruleCard('DE URGENCIAS', 'NADIE ESTÁ MUERTO…', '…hasta que está caliente y muerto.', lt, false); tag('MEDICINA DE URGENCIAS', 40, 40, C.yellow); hudTemp(7, lt, d); };
// 9 · HELICÓPTERO
S[8] = (lt, d) => {
  X.fillStyle = '#0B1426'; X.fillRect(0, 0, W, IL_H); for (let i = 0; i < 40; i++) circ(rnd(i) * W, rnd(i + 9) * 700, 2, 'rgba(255,255,255,.6)');
  X.fillStyle = '#0A0F1E'; for (let i = 0; i < 9; i++) { const px = i * 135 - (lt * 50 % 135), ph = 120 + rnd(i) * 90; X.beginPath(); X.moveTo(px - 60, 1090); X.lineTo(px, 1090 - ph); X.lineTo(px + 60, 1090); X.fill(); }
  X.save(); X.translate(540, 420 + Math.sin(lt * 2) * 10); rr(-180, -60, 300, 120, 60, '#E04848'); rr(110, -20, 220, 30, 10, '#E04848'); rr(-120, -40, 120, 60, 20, '#9CC9E6');
  X.strokeStyle = '#DDD'; X.lineWidth = 8; const a = lt * 30; X.beginPath(); X.moveTo(-30 + Math.cos(a) * 260, -90); X.lineTo(-30 - Math.cos(a) * 260, -90); X.stroke(); rr(-40, -95, 20, 40, 4, '#666'); X.restore();
  if (Math.floor(lt * 2) % 2 === 0) thermo(540, 800, .7, 13.7);
  tag('VUELO MÉDICO', 40, 40, C.red); hudTemp(8, lt, d);
};
// 10 · LA MÁQUINA
S[9] = (lt, d) => {
  hospitalBg(lt); rr(120, 640, 600, 60, 12, '#F4F8FA'); lyingPerson(ANNA_COLD, 190, 600, 1.2, {closed: true});
  rr(780, 300, 220, 400, 16, '#7A8A98'); rr(800, 330, 180, 120, 8, '#0E1A12'); txt('ECMO', 890, 390, MONO(34), '#8CFF9E');
  const flow = (lt * 300) % 60;
  for (const [col, y0] of [[C.red, 520], ['#3B6FD8', 600]]) { X.strokeStyle = col; X.lineWidth = 12; X.setLineDash([30, 30]); X.lineDashOffset = col === C.red ? -flow : flow; X.beginPath(); X.moveTo(780, y0); X.quadraticCurveTo(600, y0 - 120, 420, 600); X.stroke(); } X.setLineDash([]);
  const tmp = hudTemp(9, lt, d); thermo(330, 420, .6, tmp);
  tag('HOSPITAL · CALENTANDO', 40, 40, C.yellow);
};
// 11 · UN LATIDO
S[10] = (lt, d) => {
  hospitalBg(lt, .2);
  rr(140, 160, 800, 500, 20, '#1A2229'); rr(170, 190, 740, 440, 10, '#040A06');
  const p1 = wordTime(10, 'pico'), p2 = wordTime(10, 'otro');
  X.strokeStyle = '#8CFF9E'; X.lineWidth = 6; X.beginPath(); X.moveTo(190, 410);
  for (let x = 190; x < 890; x += 4) { const tt = (x - 190) / 700 * d; let v = 0; for (const p of [p1, p2]) { const q = lt - (d - tt) - (p - d * .5); if (Math.abs(tt - (p + .2)) < .12 && lt > p) v = Math.sin((tt - p - .08) / .24 * Math.PI) * 150; } X.lineTo(x, 410 - v); }
  X.stroke();
  person({...DOC, x: 300, y: 1000, h: 280, look: 1, eyeScale: lt > p1 ? 1.3 : 1, mouth: lt > p1 ? 'o' : 'line'}); person({...DOC, x: 780, y: 1000, h: 280, look: -1, eyeScale: lt > p1 ? 1.3 : 1, mouth: lt > p1 ? 'o' : 'line', hair: '#C9A46A'});
  tag('HORAS DESPUÉS', 40, 40, C.green); hudTemp(10, lt, d);
};
// 12 · DESPIERTA
S[11] = (lt, d) => {
  hospitalBg(lt); X.fillStyle = 'rgba(76,195,138,.08)'; X.fillRect(0, 0, W, IL_H);
  rr(140, 640, 800, 60, 12, '#F4F8FA'); lyingPerson(ANNA, 220, 600, 1.4, {closed: lt < 1.2, mouth: 'line'});
  if (lt > 1.2) { rr(560, 230, 420, 110, 55, 'rgba(245,245,245,.96)'); txt('Estoy viva.', 770, 286, F(800, 40), '#111'); }
  tag('DÍAS DESPUÉS', 40, 40, C.green); hudTemp(11, lt, d);
};
// 13 · LA MISMA PUERTA
S[12] = (lt, d) => {
  X.fillStyle = '#BFE3F5'; X.fillRect(0, 0, W, IL_H); circ(860, 160, 60, '#FFF3C4');
  rr(140, 240, 800, 680, 10, '#E8EEF2'); for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) rr(200 + i * 190, 300 + j * 150, 120, 90, 6, '#9CC9E6');
  rr(420, 740, 240, 180, 6, '#7A8A98'); rr(240, 250, 600, 50, 6, '#3FA38A'); txt('HOSPITAL UNIVERSITARIO · TROMSØ', 540, 276, F(800, 28), '#FFF');
  X.fillStyle = '#9DB59A'; X.fillRect(0, 920, W, IL_H - 920);
  const k = ease(lt / d); person({...ANNA, shirt: '#F4F4F4', sleeve: '#F4F4F4', x: lerp(160, 520, k), y: 1000, h: 330, look: 1, mouth: 'smile', blink: blinkAt(lt, 1)});
  tag('AÑOS DESPUÉS', 40, 40, C.green); hudTemp(12, lt, d);
};
// 14 · FINAL
S[13] = (lt, d) => { X.fillStyle = '#0B0D14'; X.fillRect(0, 0, W, IL_H); thermo(540, 520, 1.3, lerp(13.7, 37, ease(lt / 2.5))); };

const META = [
  ['13,7 °C', 'HOSPITAL', 'AÚN NO', C.ice, 0, 'PARO CARDÍACO', C.ice],
  ['1999', 'NORUEGA', 'ESQUIANDO', C.yellow, 110, 'ALERTA'],
  ['+0 s', 'ARROYO', 'EL HIELO', C.red, 160, 'PELIGRO'],
  ['+1 min', 'BAJO EL HIELO', 'UNA BOLSA DE AIRE', C.red, 170, 'PELIGRO'],
  ['+40 min', 'HIPOTERMIA', 'SILENCIO', C.ice, 40, 'HIPOTERMIA', C.ice],
  ['+40 min', 'RADIOGRAFÍA', 'PARO', C.ice, 0, 'PARO CARDÍACO', C.ice],
  ['+80 min', 'RESCATE', 'LA SACAN', C.ice, 0, 'PARO CARDÍACO', C.ice],
  ['+90 min', 'REGLA', 'CALIENTE Y MUERTO', C.yellow, 0, 'PARO CARDÍACO', C.ice],
  ['+2 h', 'HELICÓPTERO', '13,7 °C', C.red, 0, 'PARO CARDÍACO', C.ice],
  ['+3 h', 'HOSPITAL', 'LA MÁQUINA', C.yellow, 0, 'PARO CARDÍACO', C.ice],
  ['HORAS DESPUÉS', 'MONITOR', 'UN LATIDO', C.green, 45, 'RITMO', C.green],
  ['+10 DÍAS', 'UCI', 'DESPIERTA', C.green, 72, 'ESTABLE', C.green],
  ['AÑOS DESPUÉS', 'TROMSØ', 'LA MISMA PUERTA', C.green, 80, 'CALMA', C.green],
  ['HISTORIA REAL', 'ANNA BÅGENHOLM', '13,7 °C', C.ice, 80, 'CALMA', C.green],
];
const KEY_Y = ['anna', 'médica', 'aire', 'regla', 'máquina', 'pico', 'viva', 'hospital'];
const KEY_R = ['hielo', 'detiene', 'muerta', 'muerto', 'pulso', 'respira'];
const END_LINES = ['Nadie está muerto…', '…hasta que está caliente y muerto.'];
