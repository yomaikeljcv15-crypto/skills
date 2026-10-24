<!doctype html>
<html><head><meta charset="utf-8"><title>El censo de las 2:17</title>
<style>html,body{margin:0;background:#000}canvas{display:block;width:540px;height:960px}</style>
</head><body><canvas id="c" width="1080" height="1920"></canvas>
<script src="timing.js"></script>
<script>
'use strict';
const cv = document.getElementById('c'), X = cv.getContext('2d');
const W = 1080, H = 1920, IL_Y = 330, IL_H = 1090; // zona de ilustración
const C = {bg:'#0B0D14', night:'#1E2A4F', night2:'#121A33', wood:'#4A3426', woodD:'#3B2A1F', woodL:'#5A402F',
  yellow:'#E8B931', red:'#E04848', green:'#4CC38A', ice:'#6EC6FF', white:'#F5F5F5', gray:'#8A8F9C', skin:'#F2C29B', skin2:'#E8B08A'};
const F = (w, s) => `${w} ${s}px Inter`, MONO = s => `600 ${s}px "JetBrains Mono", "DejaVu Sans Mono", monospace`;
const T = TIMING, SC = T.scenes, WORDS = T.words;

// ---------- utilidades ----------
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => k < 0 ? 0 : k > 1 ? 1 : 1 - Math.pow(1 - k, 3);
const easeIO = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
function rr(x, y, w, h, r, fill, stroke, lw) { X.beginPath(); X.roundRect(x, y, w, h, r); if (fill) { X.fillStyle = fill; X.fill(); } if (stroke) { X.lineWidth = lw || 3; X.strokeStyle = stroke; X.stroke(); } }
function circ(x, y, r, fill, stroke, lw) { X.beginPath(); X.arc(x, y, r, 0, Math.PI * 2); if (fill) { X.fillStyle = fill; X.fill(); } if (stroke) { X.lineWidth = lw || 3; X.strokeStyle = stroke; X.stroke(); } }
function ell(x, y, rx, ry, fill) { X.beginPath(); X.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); X.fillStyle = fill; X.fill(); }
function txt(s, x, y, font, color, align = 'center', base = 'middle') { X.font = font; X.fillStyle = color; X.textAlign = align; X.textBaseline = base; X.fillText(s, x, y); }
function rnd(i) { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function wordTime(sc, w, nth = 0) { let n = 0; for (const o of WORDS) if (o.sc === sc && o.w.toLowerCase().replace(/[^a-záéíóúñü]/g, '') === w) { if (n++ === nth) return o.s - SC[sc].start; } return 0; }

// ---------- personajes ----------
// p: {x, y (pies), h, skin, hair, hairStyle, shirt, pants, shoes, mouth, eyes, look, blink, arms, vest, badge, clip, beard, scale}
function person(p) {
  const h = p.h, u = h / 100; X.save(); X.translate(p.x, p.y); if (p.flip) X.scale(-1, 1);
  const sh = p.shoes || '#222', legW = 9 * u;
  // piernas
  rr(-12 * u, -42 * u, legW, 40 * u, 3 * u, p.pants || '#2E3A5C'); rr(3 * u, -42 * u, legW, 40 * u, 3 * u, p.pants || '#2E3A5C');
  rr(-14 * u, -4 * u, 13 * u, 5 * u, 2 * u, sh); rr(2 * u, -4 * u, 13 * u, 5 * u, 2 * u, sh);
  // torso
  rr(-19 * u, -76 * u, 38 * u, 38 * u, 9 * u, p.shirt || C.yellow);
  if (p.plaid) { X.save(); X.beginPath(); X.roundRect(-19 * u, -76 * u, 38 * u, 38 * u, 9 * u); X.clip(); X.strokeStyle = 'rgba(0,0,0,.25)'; X.lineWidth = 2.2 * u; for (let i = -20; i < 20; i += 7) { X.beginPath(); X.moveTo(i * u, -76 * u); X.lineTo(i * u, -38 * u); X.stroke(); X.beginPath(); X.moveTo(-19 * u, (-74 + i + 20) * u); X.lineTo(19 * u, (-74 + i + 20) * u); X.stroke(); } X.restore(); }
  if (p.vest) { rr(-19 * u, -74 * u, 13 * u, 35 * u, 5 * u, p.vest); rr(6 * u, -74 * u, 13 * u, 35 * u, 5 * u, p.vest); }
  if (p.badge) { rr(-15 * u, -66 * u, 9 * u, 11 * u, 1.5 * u, '#E9E9E9'); rr(-13 * u, -64 * u, 5 * u, 4 * u, 1 * u, '#9AA0AA'); }
  // brazos
  const arm = (side, ang) => { X.save(); X.translate(side * 19 * u, -71 * u); X.rotate(ang); rr(-4.5 * u, 0, 9 * u, 31 * u, 4.5 * u, p.sleeve || p.shirt || C.yellow); circ(0, 32 * u, 4.6 * u, p.skin || C.skin); X.restore(); };
  const a = p.arms || [0.12, -0.12];
  arm(-1, a[0]); arm(1, a[1]);
  if (p.clip) { X.save(); X.translate(14 * u, -50 * u); X.rotate(-0.15); rr(-2 * u, -14 * u, 18 * u, 24 * u, 2 * u, '#C9A46A'); rr(0, -11 * u, 14 * u, 19 * u, 1 * u, '#F4F1E8'); rr(4 * u, -15 * u, 6 * u, 3 * u, 1 * u, '#777'); for (let i = 0; i < 4; i++) rr(2 * u, (-7 + i * 4) * u, 10 * u, 1.2 * u, 0, '#AAA'); X.restore(); }
  if (p.cup) { rr(15 * u, -45 * u, 10 * u, 11 * u, 2 * u, p.cup); }
  // cuello y cabeza
  rr(-5 * u, -82 * u, 10 * u, 8 * u, 2 * u, p.skin2 || C.skin2);
  const hy = -97 * u, hr = 16 * u;
  if (p.hairStyle === 'long') { rr(-19 * u, hy - 4 * u, 38 * u, 34 * u, 12 * u, p.hair); }
  circ(0, hy, hr, p.skin || C.skin);
  if (p.hair && p.hairStyle !== 'bald') {
    X.save(); X.beginPath(); X.arc(0, hy, hr + 1.5 * u, Math.PI * 1.02, Math.PI * 1.98); X.closePath(); X.fillStyle = p.hair; X.fill(); X.restore();
    if (p.hairStyle === 'pigtails') { circ(-18 * u, hy - 2 * u, 6 * u, p.hair); circ(18 * u, hy - 2 * u, 6 * u, p.hair); }
    if (p.hairStyle === 'side') { X.beginPath(); X.moveTo(-hr, hy - 2 * u); X.quadraticCurveTo(-4 * u, hy - 4 * u, 6 * u, hy - 15 * u); X.lineTo(-hr, hy - 12 * u); X.fillStyle = p.hair; X.fill(); }
  }
  if (p.hairStyle === 'bald' && p.hair) { X.save(); X.beginPath(); X.arc(0, hy, hr + 1 * u, Math.PI * .85, Math.PI * 1.15); X.lineWidth = 3 * u; X.strokeStyle = p.hair; X.stroke(); X.beginPath(); X.arc(0, hy, hr + 1 * u, -Math.PI * .15, Math.PI * .15); X.stroke(); X.restore(); }
  if (p.beard) { X.beginPath(); X.arc(0, hy + 4 * u, 13 * u, 0.1 * Math.PI, 0.9 * Math.PI); X.lineTo(-8 * u, hy + 3 * u); X.fillStyle = p.beard; X.fill(); }
  // ojos
  const es = p.eyeScale || 1, lx = (p.look || 0) * 1.8 * u, er = 4.6 * u * es;
  for (const s of [-1, 1]) {
    const ex = s * 6.5 * u, ey = hy - 1 * u;
    if (p.blink) { rr(ex - er, ey - 0.8 * u, er * 2, 1.6 * u, 1 * u, '#222'); continue; }
    circ(ex, ey, er, '#FFF'); circ(ex + lx, ey + (p.lookY || 0) * u, er * (p.pupil || 0.42), '#151515');
  }
  // boca
  X.strokeStyle = '#5A2D22'; X.lineWidth = 1.7 * u; X.lineCap = 'round';
  const my = hy + 8 * u;
  if (p.mouth === 'grin') { X.beginPath(); X.arc(0, my - 4 * u, 8.5 * u, 0.12 * Math.PI, 0.88 * Math.PI); X.fillStyle = '#3A1712'; X.fill(); X.beginPath(); X.rect(-7 * u, my + 0.5 * u, 14 * u, 2.2 * u); X.fillStyle = '#FFF'; X.fill(); }
  else if (p.mouth === 'smile') { X.beginPath(); X.arc(0, my - 3 * u, 5 * u, 0.2 * Math.PI, 0.8 * Math.PI); X.stroke(); }
  else if (p.mouth === 'o') { ell(0, my, 2.6 * u, 3.4 * u, '#3A1712'); }
  else if (p.mouth === 'worried') { X.beginPath(); X.arc(0, my + 3 * u, 4 * u, 1.2 * Math.PI, 1.8 * Math.PI); X.stroke(); }
  else { X.beginPath(); X.moveTo(-3.5 * u, my); X.lineTo(3.5 * u, my); X.stroke(); }
  if (p.blush) { circ(-10 * u, hy + 5 * u, 2.6 * u, 'rgba(230,110,110,.45)'); circ(10 * u, hy + 5 * u, 2.6 * u, 'rgba(230,110,110,.45)'); }
  X.restore();
}
const YOU = {skin: C.skin, hair: '#5B3A22', hairStyle: 'side', shirt: C.yellow, pants: '#2E3A5C', shoes: '#1A1A1A'};
const MOM = {skin: '#E9B88F', hair: '#2A1B14', hairStyle: 'long', shirt: '#7A4FA0', pants: '#3A2F4F'};
const SIS = {skin: C.skin, hair: '#6B3F22', hairStyle: 'pigtails', shirt: '#3B82C4', pants: '#24304F', blush: true};
const MAN = {skin: '#E6D3C3', skin2: '#D6BFAE', hair: '#1C1C1C', hairStyle: 'side', shirt: '#E8E8E8', sleeve: '#E8E8E8', vest: '#6B7280', pants: '#2B2B2B', badge: true, clip: true, mouth: 'grin', eyeScale: 1.05, pupil: .3};
const OLD = {skin: '#E2B791', hair: '#DDD', hairStyle: 'bald', beard: '#E8E8E8', shirt: '#7A5A3A', pants: '#4A3B2E', mouth: 'line'};
const blinkAt = (t, seed) => ((t + seed) % 3.7) < 0.12;

// ---------- fondos ----------
function woodWall(x, y, w, h, base = C.wood, line = C.woodD) {
  X.fillStyle = base; X.fillRect(x, y, w, h); X.strokeStyle = line; X.lineWidth = 4;
  for (let i = x + 30; i < x + w; i += 64) { X.beginPath(); X.moveTo(i, y); X.lineTo(i, y + h); X.stroke(); }
  X.strokeStyle = 'rgba(0,0,0,.12)'; X.lineWidth = 2;
  for (let i = 0; i < 26; i++) { const xx = x + rnd(i) * w, yy = y + rnd(i + 9) * h; X.beginPath(); X.moveTo(xx, yy); X.lineTo(xx, yy + 40 + rnd(i + 3) * 60); X.stroke(); }
}
function floor(y, col = '#2A1E17') { X.fillStyle = col; X.fillRect(0, y, W, IL_H - y); X.fillStyle = 'rgba(0,0,0,.25)'; X.fillRect(0, y, W, 8); }
function nightWindow(x, y, w, h, t, day = false) {
  rr(x - 14, y - 14, w + 28, h + 28, 6, '#2B1E16');
  X.save(); X.beginPath(); X.rect(x, y, w, h); X.clip();
  const g = X.createLinearGradient(0, y, 0, y + h);
  if (day) { g.addColorStop(0, '#BFE3F5'); g.addColorStop(1, '#F7E3B5'); } else { g.addColorStop(0, C.night2); g.addColorStop(1, C.night); }
  X.fillStyle = g; X.fillRect(x, y, w, h);
  if (day) circ(x + w * .7, y + h * .3, 34, '#FFF3C4'); else { circ(x + w * .68, y + h * .28, 26, '#F2F2F2'); for (let i = 0; i < 14; i++) circ(x + rnd(i) * w, y + rnd(i + 4) * h * .5, 2, 'rgba(255,255,255,.7)'); }
  X.fillStyle = day ? '#5E8A6A' : '#0A0F1E';
  for (let i = 0; i < 7; i++) { const px = x + i * w / 6 - 10, ph = 60 + rnd(i + 2) * 50; X.beginPath(); X.moveTo(px - 22, y + h); X.lineTo(px, y + h - ph); X.lineTo(px + 22, y + h); X.fill(); }
  X.restore();
  X.fillStyle = '#2B1E16'; X.fillRect(x + w / 2 - 6, y, 12, h); X.fillRect(x, y + h / 2 - 6, w, 12);
}
function door(x, y, w, h, shake = 0, peep = true) {
  X.save(); X.translate(shake * (Math.sin(performanceT * 90) * 6), 0);
  rr(x - 16, y - 16, w + 32, h + 16, 4, '#2B1E16');
  rr(x, y, w, h, 3, '#6B4A33');
  for (const [a, b] of [[.12, .08], [.12, .55]]) rr(x + w * a, y + h * b, w * .76, h * .36, 4, null, '#5A3D29', 6);
  circ(x + w * .85, y + h * .55, 11, '#C9A46A'); if (peep) circ(x + w / 2, y + h * .27, 7, '#111');
  X.restore();
}
function knockRings(cx, cy, k) { // k 0..1
  for (let i = 0; i < 3; i++) { const kk = clamp(k * 1.4 - i * .2); if (kk <= 0 || kk >= 1) continue; circ(cx, cy, 20 + kk * 140, null, `rgba(232,185,49,${(1 - kk) * .8})`, 5); }
}
function vignette(a = .6) { const g = X.createRadialGradient(W / 2, IL_H / 2, IL_H * .25, W / 2, IL_H / 2, IL_H * .85); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); X.fillStyle = g; X.fillRect(0, 0, W, IL_H); }
function tag(s, x, y, col = C.gray) { X.font = MONO(22); const w = X.measureText(s).width + 26; rr(x, y, w, 40, 4, 'rgba(11,13,20,.75)', col, 2); txt(s, x + w / 2, y + 21, MONO(22), col); }

// ---------- tarjeta de regla ----------
function ruleCard(n, big, small, lt, red) {
  const k = ease(lt / .45), col = red ? C.red : C.yellow;
  X.save(); X.globalAlpha = k; X.translate(0, (1 - k) * 60);
  rr(70, 300, 940, 470, 18, 'rgba(11,13,20,.92)', col, 5);
  txt('REGLA ' + n, 540, 370, MONO(34), col);
  X.fillStyle = col; X.fillRect(470, 400, 140, 4);
  wrap(big, 540, 480, 860, F(900, 66), C.white, 78);
  if (small) wrap(small, 540, 690, 860, F(700, 40), red ? '#F2A0A0' : '#D9C27A', 50);
  X.restore();
}
function wrap(s, x, y, maxW, font, color, lh) {
  X.font = font; const words = s.split(' '), lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (X.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  lines.push(cur); const y0 = y - (lines.length - 1) * lh / 2;
  lines.forEach((l, i) => txt(l, x, y0 + i * lh, font, color));
}

