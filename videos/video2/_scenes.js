// ---------- ESCENAS · VIDEO 2: EL PEAJE QUE COBRA RECUERDOS ----------
let performanceT = 0;
const S = [];
const PAREJA = {skin: '#E9B88F', hair: '#2A1B14', hairStyle: 'long', shirt: '#3E8E6E', pants: '#2E3A5C'};
const GRAYARM = '#8C939E', GRAYARM2 = '#6F7682';

function roadNight(lt, speed = 1, city = 0) {
  const g = X.createLinearGradient(0, 0, 0, IL_H); g.addColorStop(0, C.night2); g.addColorStop(1, C.night); X.fillStyle = g; X.fillRect(0, 0, W, IL_H);
  circ(600, 200, 40, '#F2F2F2'); for (let i = 0; i < 40; i++) circ(rnd(i) * W, rnd(i + 7) * 420, 2, 'rgba(255,255,255,.55)');
  if (city > 0) { X.globalAlpha = city; for (let i = 0; i < 26; i++) { const bx = i * 44, bh = 60 + rnd(i + 3) * 140; rr(bx, 640 - bh, 38, bh, 2, '#1A2238'); for (let k = 0; k < 6; k++) if (rnd(i * 7 + k) > .45) rr(bx + 8 + (k % 2) * 14, 650 - bh + 12 + Math.floor(k / 2) * 30, 8, 12, 1, '#F2D27A'); } X.globalAlpha = 1; }
  X.fillStyle = '#0A0F1E'; const off = (lt * 60 * speed) % 160;
  for (let i = -1; i < 9; i++) { const px = i * 160 - off, ph = 140 + rnd(i + 20 + Math.floor((lt * 60 * speed) / 160)) * 60; X.beginPath(); X.moveTo(px - 60, 660); X.lineTo(px, 660 - ph); X.lineTo(px + 60, 660); X.fill(); }
  X.fillStyle = '#151B2E'; X.fillRect(0, 660, W, IL_H - 660);
  X.fillStyle = '#1F2538'; X.fillRect(0, 820, W, 170);
  X.fillStyle = 'rgba(232,185,49,.6)'; const d = (lt * 500 * speed) % 200; for (let x = -d; x < W; x += 200) X.fillRect(x, 900, 110, 10);
}
// coche visto de lado, mirando a la derecha. x = centro, y = suelo
function car(x, y, s, o = {}) {
  X.save(); X.translate(x, y); X.scale(s, s);
  const bob = o.moving ? Math.sin(performanceT * 18) * 1.5 : 0; X.translate(0, bob);
  // cabina
  X.fillStyle = '#B33A3A'; X.beginPath(); X.moveTo(-190, -95); X.lineTo(-150, -175); X.lineTo(90, -175); X.lineTo(150, -95); X.closePath(); X.fill();
  // ventanas
  const win = (pts) => { X.beginPath(); X.moveTo(...pts[0]); for (const p of pts.slice(1)) X.lineTo(...p); X.closePath(); X.fillStyle = '#1B2540'; X.fill(); };
  win([[-172, -100], [-140, -162], [-30, -162], [-30, -100]]); win([[-15, -100], [-15, -162], [82, -162], [130, -100]]);
  // ocupantes (recortados a las ventanas)
  X.save(); X.beginPath(); X.moveTo(-172, -100); X.lineTo(-140, -162); X.lineTo(-30, -162); X.lineTo(-30, -100); X.moveTo(-15, -100); X.lineTo(-15, -162); X.lineTo(82, -162); X.lineTo(130, -100); X.clip();
  if (o.baby) { rr(-140, -150, 80, 70, 14, '#3B82C4'); circ(-100, -128, 17, C.skin); X.fillStyle = '#6B3F22'; X.beginPath(); X.arc(-100, -128, 18, Math.PI * 1.1, Math.PI * 1.9); X.fill(); X.strokeStyle = '#333'; X.lineWidth = 2; X.beginPath(); X.arc(-106, -128, 4, .1 * Math.PI, .9 * Math.PI); X.arc(-94, -128, 4, .1 * Math.PI, .9 * Math.PI); X.stroke(); }
  if (o.dark) { X.fillStyle = `rgba(0,0,0,${o.dark})`; X.fillRect(-180, -170, 160, 80); }
  // pareja (atrás de ti, cabeza inclinada si duerme)
  X.save(); X.translate(4, -110); X.rotate(o.awake ? 0 : -.35); circ(0, 0, 22, PAREJA.skin); X.fillStyle = PAREJA.hair; X.beginPath(); X.arc(0, -2, 24, Math.PI * .95, Math.PI * 2.05); X.fill(); X.fillRect(-24, -2, 12, 30);
  if (o.awake) { circ(8, -2, 4, '#FFF'); circ(9, -2, 2, '#111'); } else { X.strokeStyle = '#333'; X.lineWidth = 2; X.beginPath(); X.moveTo(3, 0); X.lineTo(12, 0); X.stroke(); }
  X.restore();
  // tú, conduciendo
  circ(62, -118, 23, C.skin); X.fillStyle = YOU.hair; X.beginPath(); X.arc(62, -120, 25, Math.PI, Math.PI * 2); X.fill();
  circ(76, -120, 6, '#FFF'); circ(77 + (o.look || 0) * 2, -120, 3, '#111');
  X.strokeStyle = '#5A2D22'; X.lineWidth = 2; X.beginPath(); if (o.smile) X.arc(74, -106, 5, .2 * Math.PI, .8 * Math.PI); else { X.moveTo(70, -104); X.lineTo(80, -104); } X.stroke();
  X.restore();
  // carrocería
  rr(-230, -100, 460, 75, 26, '#C94444');
  rr(170, -80, 50, 20, 8, o.lights === false ? '#666' : '#FFE9A8'); rr(-228, -80, 22, 18, 6, '#E04848');
  X.strokeStyle = 'rgba(0,0,0,.25)'; X.lineWidth = 3; X.beginPath(); X.moveTo(-22, -100); X.lineTo(-22, -32); X.stroke();
  rr(-60, -72, 24, 6, 3, '#7A2828'); rr(40, -72, 24, 6, 3, '#7A2828');
  for (const wx of [-140, 135]) { circ(wx, -22, 38, '#1A1A1A'); circ(wx, -22, 18, '#888'); const a = o.moving ? performanceT * 14 : 0; X.strokeStyle = '#555'; X.lineWidth = 4; X.beginPath(); X.moveTo(wx + Math.cos(a) * 16, -22 + Math.sin(a) * 16); X.lineTo(wx - Math.cos(a) * 16, -22 - Math.sin(a) * 16); X.stroke(); }
  if (o.lights !== false) { X.fillStyle = 'rgba(255,233,168,.12)'; X.beginPath(); X.moveTo(220, -80); X.lineTo(700, -170); X.lineTo(700, 40); X.closePath(); X.fill(); }
  X.restore();
}
// caseta de peaje con brazo
function booth(x, y, lt, o = {}) {
  X.fillStyle = 'rgba(255,255,255,.07)'; X.beginPath(); X.moveTo(x - 40, y - 520); X.lineTo(x + 280, y - 520); X.lineTo(x + 420, y); X.lineTo(x - 180, y); X.fill();
  rr(x - 120, y - 560, 500, 50, 6, '#2A2F40'); rr(x - 100, y - 512, 460, 14, 0, '#E8E8E8');
  rr(x, y - 430, 240, 430, 8, '#3A4052'); rr(x + 30, y - 390, 180, 150, 6, '#05070C');
  circ(x + 95, y - 320, 7, `rgba(240,240,240,${.4 + .3 * Math.sin(lt * 2)})`); circ(x + 135, y - 320, 7, `rgba(240,240,240,${.4 + .3 * Math.sin(lt * 2)})`);
  rr(x - 70, y - 510, 380, 70, 6, '#E8B931'); txt(o.sign || 'PAGUE LO QUE TRAIGA', x + 120, y - 474, F(900, o.signSize || 26), '#111');
  if (o.num) { rr(x + 250, y - 430, 80, 80, 8, '#E8E8E8'); txt(String(o.num), x + 290, y - 388, F(900, 54), '#111'); }
  // barrera
  const ang = -Math.PI / 2 * (o.barrier || 0);
  X.save(); X.translate(x - 10, y - 150); X.rotate(ang); for (let i = 0; i < 9; i++) rr(-420 + i * 46, -10, 46, 20, 2, i % 2 ? '#E04848' : '#F5F5F5'); X.restore(); rr(x - 30, y - 170, 40, 170, 4, '#2A2F40');
  // brazo
  if (o.arm) { const k = o.arm; X.save(); X.translate(x + 30, y - 300); X.strokeStyle = GRAYARM; X.lineWidth = 34; X.lineCap = 'round';
    X.beginPath(); X.moveTo(0, 0); X.quadraticCurveTo(-140 * k, 30, -320 * k, 10 + (o.armY || 0)); X.stroke();
    X.save(); X.translate(-320 * k, 10 + (o.armY || 0)); ell(0, 0, 34, 20, GRAYARM2); for (let f = 0; f < 4; f++) { X.strokeStyle = GRAYARM2; X.lineWidth = 9; X.beginPath(); X.moveTo(-20 + f * 12, -6); X.lineTo(-34 + f * 9, -30 - (o.closed ? -18 : 0)); X.stroke(); }
    if (o.holding) o.holding(); X.restore(); X.restore(); }
}
function hudBars(i) {
  const left = [5, 5, 5, 4, 4, 4, 3, 2, 2, 0, 0, 0, 2, 0][i], mem = [100, 100, 100, 80, 80, 80, 60, 60, 60, 20, 20, 20, 60, 20][i];
  rr(W - 330, 20, 300, 64, 10, 'rgba(11,13,20,.85)', C.yellow, 3); txt('CASETAS: ' + left, W - 180, 53, MONO(28), C.yellow);
  rr(W - 330, 96, 300, 64, 10, 'rgba(11,13,20,.85)', C.ice, 3); txt('RECUERDOS', W - 250, 128, MONO(20), C.ice);
  rr(W - 175, 116, 130, 24, 4, '#1C2230'); rr(W - 175, 116, 130 * mem / 100, 24, 4, mem > 40 ? C.ice : C.red);
}
// 1 · SIN SEÑAL
S[0] = (lt, d) => {
  roadNight(lt, 1); car(520, 900, 1.45, {moving: true, baby: true});
  const k = ease((lt - .6) / .4); X.save(); X.globalAlpha = k; rr(70, 150, 230, 360, 30, '#111', '#333', 6); rr(88, 190, 194, 290, 8, '#1A1F2E');
  txt('SIN', 185, 300, F(900, 40), C.red); txt('SERVICIO', 185, 345, F(900, 34), C.red); txt('▁ ▂ ▃', 185, 410, F(700, 30), '#444'); X.restore();
  tag('CARRETERA · 23:40', 40, 40); hudBars(0);
};
// 2 · CASETA 1
S[1] = (lt, d) => {
  roadNight(0, 0); booth(620, 990, lt, {arm: ease((lt - 1) / 1.6), barrier: 0, num: 1});
  car(250, 990, 1.2, {baby: true, look: 1});
  tag('CASETA 1', 40, 40, C.yellow); hudBars(1);
};
// 3 · LA NOTA
S[2] = (lt, d) => {
  X.fillStyle = '#14171F'; X.fillRect(0, 0, W, IL_H);
  rr(60, 120, 960, 740, 30, '#262B36'); rr(110, 200, 860, 520, 16, '#0C0E13'); X.fillStyle = 'rgba(255,233,168,.12)'; X.fillRect(110, 200, 860, 520);
  const k = ease(lt / .6); X.save(); X.translate(540, 460 + (1 - k) * 80); X.rotate(-.05);
  rr(-330, -220, 660, 440, 6, '#E9DDB8'); txt('REGLAS DEL PEAJE', 0, -160, 'italic 700 46px "DejaVu Serif"', '#5A1A1A');
  X.strokeStyle = 'rgba(0,0,0,.15)'; X.lineWidth = 2; for (let i = -100; i < 200; i += 52) { X.beginPath(); X.moveTo(-290, i); X.lineTo(290, i); X.stroke(); }
  ['1. Paga siempre con objetos.', '2. Nunca digas tu nombre.', '3. No mires el asiento', '    trasero por el espejo.'].forEach((l, j) => txt(l, -280, -95 + j * 62, 'italic 600 38px "DejaVu Serif"', '#2A2A6A', 'left'));
  X.restore();
  const rt = wordTime(2, 'regla'); if (lt > rt) ruleCard(1, 'PAGA SIEMPRE CON OBJETOS.', 'Antes de que te pidan otra cosa.', lt - rt, false);
  tag('GUANTERA', 40, 40, C.yellow); hudBars(2);
};
// 4 · UNA FOTO
S[3] = (lt, d) => {
  X.fillStyle = '#0B0F1C'; X.fillRect(0, 0, W, IL_H);
  const give = ease(lt / 1.4), took = clamp((lt - 1.6) / 1.4);
  // ventanilla del auto
  rr(-40, 140, 520, 900, 40, '#B33A3A'); rr(20, 220, 400, 520, 20, '#1B2540');
  // tu mano con la foto
  X.save(); X.translate(lerp(300, 560, give), 560); X.rotate(-.1);
  X.strokeStyle = C.yellow; X.lineWidth = 60; X.lineCap = 'round'; X.beginPath(); X.moveTo(-400, 120); X.lineTo(-40, 20); X.stroke(); circ(-20, 15, 38, C.skin);
  rr(0, -150, 260, 220, 6, '#FFF'); rr(14, -136, 232, 160, 3, '#F3D9E0');
  X.globalAlpha = 1 - took; circ(95, -70, 30, C.skin); X.fillStyle = YOU.hair; X.beginPath(); X.arc(95, -72, 31, Math.PI, Math.PI * 2); X.fill(); rr(70, -40, 50, 60, 10, '#222');
  circ(165, -70, 30, PAREJA.skin); X.fillStyle = PAREJA.hair; X.beginPath(); X.arc(165, -72, 31, Math.PI, Math.PI * 2); X.fill(); rr(140, -40, 50, 60, 18, '#FFF');
  txt('Nuestra boda', 130, 50, 'italic 600 26px "DejaVu Serif"', '#555'); X.globalAlpha = 1;
  X.restore();
  // brazo gris que la recibe
  X.strokeStyle = GRAYARM; X.lineWidth = 46; X.beginPath(); X.moveTo(1180, 380); X.quadraticCurveTo(1000, 420, 900, 440); X.stroke(); ell(880, 440, 46, 28, GRAYARM2);
  // recuerdo que se borra
  if (lt > 1.6) { const k = ease((lt - 1.6) / .5); X.save(); X.globalAlpha = k; rr(140, 820, 800, 130, 12, 'rgba(11,13,20,.9)', C.ice, 3); txt('OLVIDADO:', 300, 885, MONO(30), C.ice); txt('EL DÍA DE TU BODA', 650, 885, F(900, 40), C.white); X.restore(); }
  tag('CASETA 1 · PAGO', 40, 40, C.yellow); hudBars(3);
};
// 5 · REGLA 2
S[4] = (lt, d) => {
  roadNight(0, 0); X.fillStyle = 'rgba(0,0,0,.35)'; X.fillRect(0, 0, W, IL_H);
  rr(240, 180, 600, 520, 10, '#3A4052'); rr(290, 230, 500, 380, 8, '#05070C');
  circ(480, 400, 12, 'rgba(240,240,240,.7)'); circ(600, 400, 12, 'rgba(240,240,240,.7)');
  ruleCard(2, 'NUNCA DIGAS TU NOMBRE COMPLETO.', 'Al cobrador. Nunca.', lt, false); tag('CASETA 1 · VENTANILLA', 40, 40); hudBars(4);
};
// 6 · REGLA 3
S[5] = (lt, d) => {
  X.fillStyle = '#0B0F1C'; X.fillRect(0, 0, W, IL_H);
  X.strokeStyle = '#333'; X.lineWidth = 14; X.beginPath(); X.moveTo(540, 0); X.lineTo(540, 140); X.stroke();
  rr(160, 140, 760, 260, 60, '#222'); rr(185, 165, 710, 210, 46, '#3A4A6A');
  X.fillStyle = '#E8E1D0'; X.beginPath(); X.moveTo(170, 150); X.quadraticCurveTo(540, 120 + Math.sin(lt * 2) * 8, 910, 150); X.lineTo(880, 420); X.quadraticCurveTo(540, 470, 200, 420); X.fill();
  X.strokeStyle = 'rgba(0,0,0,.1)'; X.lineWidth = 3; for (let i = 0; i < 6; i++) { X.beginPath(); X.moveTo(260 + i * 110, 160); X.lineTo(250 + i * 115, 430); X.stroke(); }
  ruleCard(3, 'NO MIRES EL ASIENTO TRASERO POR EL ESPEJO.', 'Después de pagar.', lt, true); tag('RETROVISOR', 40, 40, C.red); hudBars(5);
};
// 7 · CASETA 2 · LLAVES
S[6] = (lt, d) => {
  roadNight(0, 0);
  const keys = () => { X.strokeStyle = '#C9A46A'; X.lineWidth = 6; circ(0, -40, 16, null, '#C9A46A', 6); rr(-4, -24, 8, 40, 2, '#C9A46A'); rr(4, 4, 12, 6, 1, '#C9A46A'); };
  booth(620, 990, lt, {arm: lt < 2.2 ? ease(lt / 1) : 1 - ease((lt - 2.2) / .8), num: 2, closed: lt > 1.4, holding: lt > 1.4 ? keys : null, barrier: ease((lt - 2.8) / .8)});
  car(250, 990, 1.2, {baby: true, look: 1});
  if (lt > 2.4) { const k = ease((lt - 2.4) / .4); X.save(); X.globalAlpha = k; rr(100, 160, 560, 130, 12, 'rgba(11,13,20,.9)', C.red, 4); txt('OLVIDADO:', 230, 225, MONO(28), C.red); txt('TU DIRECCIÓN', 480, 225, F(900, 40), C.white); X.restore(); }
  tag('CASETA 2', 40, 40, C.yellow); hudBars(6);
};
// 8 · CASETA 3 · NADA
S[7] = (lt, d) => {
  roadNight(0, 0);
  const rise = wordTime(7, 'barrera'), bar = ease((lt - rise) / 1.2);
  booth(620, 990, lt, {arm: ease(lt / 1), num: 3, armY: Math.sin(lt * 1.5) * 6, barrier: bar});
  car(250, 990, 1.2, {baby: lt < rise, dark: clamp(lt / rise) * .85, look: 1});
  X.fillStyle = `rgba(0,0,0,${clamp(lt / d) * .45})`; X.fillRect(0, 0, W, IL_H);
  const wt = wordTime(7, 'espera'); if (lt > wt && lt < rise) { txt('…', 300, 560, F(900, 90), C.white); }
  tag('CASETA 3', 40, 40, C.red); hudBars(7);
};
// 9 · ALIVIO
S[8] = (lt, d) => { roadNight(lt, 1); car(520, 900, 1.45, {moving: true, baby: false, smile: true}); tag('CARRETERA · 00:31', 40, 40, C.green); hudBars(8); };
// 10 · CASETAS 4 Y 5
S[9] = (lt, d) => {
  const w5 = wordTime(9, 'quinta'), wc = wordTime(9, 'luces');
  if (lt < wc) {
    X.fillStyle = '#0B0F1C'; X.fillRect(0, 0, W, IL_H);
    const panel = (y, label, n, item, on) => { rr(60, y, 960, 400, 20, '#141A2A', on ? C.yellow : '#2A3046', 4); txt('CASETA ' + n, 200, y + 50, MONO(30), on ? C.yellow : '#555');
      X.strokeStyle = GRAYARM; X.lineWidth = 40; X.lineCap = 'round'; X.beginPath(); X.moveTo(1040, y + 200); X.lineTo(720, y + 220); X.stroke(); ell(700, y + 220, 40, 24, GRAYARM2);
      X.strokeStyle = C.yellow; X.lineWidth = 50; X.beginPath(); X.moveTo(40, y + 260); X.lineTo(400, y + 220); X.stroke(); circ(420, y + 215, 34, C.skin);
      item(560, y + 210); txt(label, 540, y + 345, F(900, 46), C.white); };
    panel(80, 'TU RELOJ', 4, (x, y) => { circ(x, y, 46, '#C9A46A'); circ(x, y, 36, '#F5F5F5'); X.strokeStyle = '#111'; X.lineWidth = 5; X.beginPath(); X.moveTo(x, y); X.lineTo(x, y - 26); X.moveTo(x, y); X.lineTo(x + 18, y); X.stroke(); }, true);
    if (lt > w5) panel(560, 'TU ANILLO', 5, (x, y) => { circ(x, y, 34, null, '#E8C547', 14); circ(x, y - 36, 12, '#BDE7FF'); }, true);
  } else { roadNight(lt, 1, ease((lt - wc) / 1)); car(520, 900, 1.45, {moving: true, smile: true}); }
  tag('CASETAS 4 Y 5', 40, 40, C.yellow); hudBars(9);
};
// 11 · CIUDAD
S[10] = (lt, d) => {
  X.fillStyle = C.night2; X.fillRect(0, 0, W, IL_H);
  for (let i = 0; i < 26; i++) { const bx = i * 44, bh = 120 + rnd(i + 3) * 240; rr(bx, 520 - bh, 38, bh, 2, '#1A2238'); for (let k = 0; k < 10; k++) if (rnd(i * 7 + k) > .45) rr(bx + 8 + (k % 2) * 14, 530 - bh + 12 + Math.floor(k / 2) * 30, 8, 12, 1, '#F2D27A'); }
  rr(80, 300, 920, 60, 6, '#E8E8E8'); txt('GASOLINERA 24 H', 540, 332, F(900, 36), C.red); rr(140, 360, 30, 560, 0, '#AAA'); rr(910, 360, 30, 560, 0, '#AAA');
  X.fillStyle = 'rgba(255,255,255,.12)'; X.fillRect(80, 360, 920, 560); X.fillStyle = '#2A3046'; X.fillRect(0, 920, W, IL_H - 920);
  car(560, 960, 1.45, {awake: lt > 1, smile: true, lights: false});
  const bt = wordTime(10, 'siempre'); if (lt > bt) { const k = ease((lt - bt) / .3); X.save(); X.globalAlpha = k; rr(420, 420, 560, 120, 60, 'rgba(245,245,245,.96)'); txt('Siempre hemos sido dos.', 700, 481, F(800, 36), '#111'); X.restore(); }
  tag('CIUDAD · 01:12', 40, 40, C.green); hudBars(10);
};
// 12 · LA SILLITA
S[11] = (lt, d) => {
  X.fillStyle = '#1A1F2E'; X.fillRect(0, 0, W, IL_H);
  X.fillStyle = '#2A3046'; X.fillRect(0, 0, 140, IL_H); X.fillRect(940, 0, 140, IL_H);
  rr(140, 140, 800, 640, 30, '#3A4258'); rr(140, 700, 800, 220, 20, '#323A4F');
  // sillita vacía
  X.save(); X.translate(540, 560); const z = 1 + lt * .02; X.scale(z, z);
  rr(-200, -300, 400, 420, 60, '#3B82C4'); rr(-150, -250, 300, 330, 40, '#2C6AA6');
  X.strokeStyle = '#111'; X.lineWidth = 16; X.beginPath(); X.moveTo(-90, -200); X.lineTo(0, 40); X.lineTo(90, -200); X.stroke(); rr(-24, 20, 48, 40, 8, '#E04848');
  X.restore();
  // chupete y mochila
  const t2 = wordTime(11, 'mochila'), t3 = wordTime(11, 'sofía');
  circ(300, 1000, 22, '#F7A8C8'); ell(300, 1000, 40, 10, 'rgba(247,168,200,.6)');
  if (lt > t2) { const k = ease((lt - t2) / .4); X.save(); X.translate(780, 1000 - k * 20); rr(-110, -170, 220, 220, 40, '#F3A6C0'); rr(-80, -80, 160, 100, 20, '#E78FB0'); rr(-50, -200, 100, 50, 25, null, '#D57A9C', 10);
    if (lt > t3) { const k3 = ease((lt - t3) / .3); X.globalAlpha = k3; txt('SOFÍA', 0, -35, 'italic 800 46px "DejaVu Serif"', '#FFF'); } X.restore(); }
  tag('ASIENTO TRASERO', 40, 40, C.red); hudBars(11);
};
// 13 · EL COBRO (flashback)
S[12] = (lt, d) => {
  X.save(); X.filter = 'grayscale(.85) brightness(.8)';
  roadNight(0, 0);
  const bundle = () => { ell(0, -26, 40, 30, '#F3A6C0'); circ(-6, -34, 14, C.skin); };
  const back = ease((lt - 1.2) / 2.2);
  booth(620, 990, lt, {arm: 1 - back * .9, num: 3, barrier: 1, closed: true});
  car(250, 990, 1.2, {dark: .85});
  X.restore(); X.filter = 'none';
  X.save(); X.translate(650 - 320 * (1 - back * .9), 700); bundle(); X.restore();
  X.fillStyle = `rgba(160,20,30,${.08 + .06 * Math.sin(lt * 4)})`; X.fillRect(0, 0, W, IL_H);
  tag('CASETA 3 · LO QUE NO VISTE', 40, 40, C.red); hudBars(12);
};
// 14 · FINAL
S[13] = (lt, d) => {
  X.fillStyle = '#000'; X.fillRect(0, 0, W, IL_H);
  if (lt < 2.2) { X.globalAlpha = 1 - ease((lt - 1.4) / .8); car(540, 760, 1.6, {baby: true, lights: false}); X.globalAlpha = 1; }
};

const META = [
  ['KM 0', 'CARRETERA · NOCHE', 'SIN SEÑAL', C.yellow, 90, 'ALERTA'],
  ['KM 12', 'CASETA 1', 'EL COBRADOR', C.white, 104, 'ALERTA'],
  ['KM 12', 'GUANTERA', 'LA NOTA', C.yellow, 108, 'ALERTA'],
  ['KM 12', 'CASETA 1', 'UNA FOTO', C.yellow, 115, 'ALERTA'],
  ['KM 19', 'REGLA 2', 'TU NOMBRE NO', C.yellow, 112, 'VIGILANCIA'],
  ['KM 24', 'REGLA 3', 'NO MIRES ATRÁS', C.red, 120, 'PELIGRO'],
  ['KM 31', 'CASETA 2', 'LAS LLAVES', C.white, 118, 'ALERTA'],
  ['KM 47', 'CASETA 3', 'NADA EN LAS MANOS', C.red, 138, 'PELIGRO'],
  ['KM 48', 'CARRETERA', 'ALIVIO', C.green, 106, 'CALMA APARENTE', C.green],
  ['KM 63', 'CASETAS 4 Y 5', 'PAGOS', C.yellow, 104, 'ALERTA'],
  ['KM 80', 'CIUDAD', 'LLEGASTE', C.green, 96, 'CALMA APARENTE', C.green],
  ['KM 80', 'ASIENTO TRASERO', 'LA SILLITA', C.red, 150, 'PELIGRO'],
  ['KM 47', 'TERCERA CASETA', 'EL COBRO', C.red, 167, 'AMENAZA'],
  ['KM 0', 'VUELVE AL INICIO', '¿CUÁNTOS IBAN?', C.red, 140, 'AMENAZA'],
];
const KEY_Y = ['recuerdo', 'caseta', 'objetos', 'foto', 'boda', 'nombre', 'llaves', 'reloj', 'anillo', 'ciudad', 'solos'];
const KEY_R = ['espejo', 'trasero', 'nada', 'sola', 'sillita', 'bebé', 'sofía', 'alguien', 'perdonó'];
const END_LINES = ['Vuelve al principio.', '¿Cuántos iban en el auto?'];
