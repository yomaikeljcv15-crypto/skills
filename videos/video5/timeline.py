"""Corta la narración en escenas, añade pausas y escribe timing.json + narration.wav."""
import json, wave, numpy as np, os

B = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(B, 'audio')
SR = 44100

words = [w for w in json.load(open(f'{A}/words.json'))['words'] if not w['text'].startswith('[') and not w['text'].endswith(']')]
sil = [tuple(map(float, l.split())) for l in open(f'{A}/sil.txt')]

# Primera palabra de cada escena (13 escenas habladas)
starts = ['Este', 'Llegas', 'A', 'La primera', 'El segundo', 'El tercero', 'Regla uno:', 'Regla dos:', 'Regla tres:', 'Solo', 'Pones', 'Es el', 'Marina tenía']
# Pausa añadida ANTES de cada escena (s)
gap_before = [0.35, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.4, 0.4, 0.6, 0.6, 0.6, 0.9]
TAIL = 5.0  # escena final sin voz

idx, k = [], 0
for i, w in enumerate(words):
    seq = starts[k].split() if k < len(starts) else []
    if seq and [x['text'] for x in words[i:i + len(seq)]] == seq and (not idx or i > idx[-1]):
        idx.append(i); k += 1
assert len(idx) == 13, idx

def cut_between(a, b):
    """Punto de corte en el silencio entre el fin de la palabra a y el inicio de b."""
    lo, hi = a['end'], b['start']
    best = None
    for s, e in sil:
        ov0, ov1 = max(s, lo - 0.25), min(e, hi + 0.25)
        if ov1 > ov0 and (best is None or ov1 - ov0 > best[1] - best[0]):
            best = (ov0, ov1)
    return (best[0] + best[1]) / 2 if best else (lo + hi) / 2

with wave.open(f'{A}/take1.wav') as f:
    src = np.frombuffer(f.readframes(f.getnframes()), dtype=np.int16).astype(np.float32)
dur_src = len(src) / SR

cuts = [0.0] + [cut_between(words[i - 1], words[i]) for i in idx[1:]] + [dur_src]
out, t, scenes, wout = [], 0.0, [], []
for s in range(13):
    g = gap_before[s]
    out.append(np.zeros(int(g * SR), np.float32)); t += g
    a, b = cuts[s], cuts[s + 1]
    seg = src[int(a * SR):int(b * SR)]
    # fundido corto en los bordes del corte
    n = min(220, len(seg) // 4)
    seg = seg.copy(); seg[:n] *= np.linspace(0, 1, n); seg[-n:] *= np.linspace(1, 0, n)
    scene_start = t - g
    out.append(seg)
    last = idx[s + 1] if s + 1 < 13 else len(words)
    for w in words[idx[s]:last]:
        wout.append({'w': w['text'], 's': round(w['start'] - a + t, 3), 'e': round(w['end'] - a + t, 3), 'sc': s})
    t += len(seg) / SR
    scenes.append({'start': round(scene_start, 3), 'end': round(t, 3)})
# los inicios de escena son el final de la anterior
for s in range(1, 13):
    scenes[s]['start'] = scenes[s - 1]['end']
scenes.append({'start': round(t, 3), 'end': round(t + TAIL, 3)})
out.append(np.zeros(int(TAIL * SR), np.float32))
audio = np.concatenate(out)

with wave.open(f'{A}/narration.wav', 'w') as f:
    f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
    f.writeframes(np.clip(audio, -32768, 32767).astype(np.int16).tobytes())

total = len(audio) / SR
json.dump({'duration': round(total, 3), 'scenes': scenes, 'words': wout}, open(f'{B}/timing.json', 'w'), ensure_ascii=False)
print('total', round(total, 2))
for i, s in enumerate(scenes):
    print(i + 1, s, ' '.join(w['w'] for w in wout if w['sc'] == i)[:70])
