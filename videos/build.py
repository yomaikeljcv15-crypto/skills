"""Ensambla videoN.html a partir del motor común (_top/_mid/_bot de video2) y el _scenes.js del video.

uso: python3 build.py <N> "<título>"
"""
import os, sys

D = os.path.dirname(os.path.abspath(__file__))
N, title = sys.argv[1], sys.argv[2]
V = os.path.join(D, f'video{N}')
eng = os.path.join(D, 'video2')

top = open(os.path.join(eng, '_top.js')).read().replace('<title>El censo de las 2:17</title>', f'<title>{title}</title>')
mid = open(os.path.join(eng, '_mid.js')).read()
patches = [
    ("function pulseColor(i) { const m = META[i]; return", "function pulseColor(i) { const m = META[i]; if (m[6]) return m[6]; return"),
    ("if (i === 13 && t > SC[13].start + 2.6) { const k = ease((t - SC[13].start - 2.6) / .4); X.globalAlpha = k; txt('¿Qué número', 540, y0 + 95, F(900, 64), C.white); txt('habrías dicho tú?', 540, y0 + 172, F(900, 64), C.yellow); X.globalAlpha = 1; }",
     "if (i === 13 && t > SC[13].start + 1.6) { const k = ease((t - SC[13].start - 1.6) / .4); X.globalAlpha = k; txt(END_LINES[0], 540, y0 + 95, F(900, 56), C.white); txt(END_LINES[1], 540, y0 + 172, F(900, 56), C.yellow); X.globalAlpha = 1; }"),
    # monitor plano cuando el pulso es 0 (paro cardíaco)
    ("const v = tt < 0 ? 0 : ecg(ph(tt));", "const v = tt < 0 || bpmAt(tt) < 5 ? 0 : ecg(ph(tt));"),
    ("txt(String(bpm), 965, cy + 2, F(900, 58), col);", "txt(bpm < 5 ? '--' : String(bpm), 965, cy + 2, F(900, 58), col);"),
    ("X.stroke(); circ(x1, cy - ecg(ph(t)) * 62, 9, col);", "X.stroke(); circ(x1, cy - (bpmAt(t) < 5 ? 0 : ecg(ph(t))) * 62, 9, col);"),
]
for a, b in patches:
    assert a in mid, a[:60]
    mid = mid.replace(a, b)
scenes = open(os.path.join(V, '_scenes.js')).read()
hud = '' if 'function hud(' in scenes else 'function hud(t, i) {}\nfunction rulesHud(t, i) {}\n'
bot = open(os.path.join(eng, '_bot.js')).read()
open(os.path.join(V, f'video{N}.html'), 'w').write(top + scenes + '\n' + mid + hud + bot)
print('ok', f'video{N}.html')
