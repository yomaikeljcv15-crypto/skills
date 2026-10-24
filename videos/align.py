"""Alineador local de respaldo: estima el tiempo de cada palabra cuando la transcripción de ElevenLabs
está limitada. Reparte el texto entre los tramos de voz detectados en audio/sil.txt.

uso: python3 align.py <carpeta_video>   (lee <carpeta>/narracion.txt y audio/take1.wav; escribe audio/words.json)
"""
import json, os, re, sys, wave

V = sys.argv[1]
A = os.path.join(V, 'audio')
text = open(os.path.join(V, 'narracion.txt')).read()
words = re.sub(r'\[[^\]]*\]', '', text).split()
with wave.open(os.path.join(A, 'take1.wav')) as f:
    dur = f.getnframes() / f.getframerate()
sil = [tuple(map(float, l.split())) for l in open(os.path.join(A, 'sil.txt'))]

speech, t = [], 0.0
for s, e in sil:
    if s > t + .02: speech.append((t, s))
    t = e
if t < dur: speech.append((t, dur))
merged = [list(speech[0])]
for s, e in speech[1:]:
    if s - merged[-1][1] < .18: merged[-1][1] = e
    else: merged.append([s, e])

wt = [len(w) + 1.5 for w in words]
brk = [1 if re.search(r'[.:…!?]["”]?$', w) else (.5 if w.endswith(',') else 0) for w in words]
tot = sum(e - s for s, e in merged); cum, bounds = 0, []
for s, e in merged[:-1]:
    cum += e - s; bounds.append(cum / tot)
Wt = sum(wt); acc, c = [], 0
for x in wt:
    c += x; acc.append(c / Wt)
cuts, last = [], -1
for b in bounds:
    cand = [i for i in range(last + 1, len(words) - 1) if brk[i] > 0]
    if not cand: break
    i = min(cand, key=lambda i: abs(acc[i] - b) + (0 if brk[i] == 1 else .01))
    if abs(acc[i] - b) > .06: continue
    cuts.append(i); last = i
gaps = sorted(sorted(range(len(merged) - 1), key=lambda k: -(merged[k + 1][0] - merged[k][1]))[:len(cuts)])
groups, st = [], 0
for g in gaps:
    groups.append((merged[st][0], merged[g][1])); st = g + 1
groups.append((merged[st][0], merged[-1][1]))
segs, prev = [], 0
for c in cuts + [len(words) - 1]:
    segs.append(list(range(prev, c + 1))); prev = c + 1
out = []
for (s, e), idx in zip(groups, segs):
    tw = sum(wt[i] for i in idx); t = s
    for i in idx:
        d = (e - s) * wt[i] / tw
        out.append({'text': words[i], 'start': round(t, 3), 'end': round(t + d * .9, 3)}); t += d
json.dump({'words': out}, open(os.path.join(A, 'words.json'), 'w'), ensure_ascii=False)
print(len(words), 'palabras,', len(groups), 'tramos')
