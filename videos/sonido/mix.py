"""Mezcla voz + efectos reales (biblioteca ElevenLabs) + ambiente con ducking.

uso: python3 mix.py <carpeta_build> <eventos.json> <salida.wav>
eventos.json: {"beds": [[archivo, inicio, fin, volumen]], "hits": [[archivo, tiempo, volumen]], "heart": volumen}
"""
import json, os, subprocess, sys, wave
import numpy as np

LIB = os.path.dirname(os.path.abspath(__file__))
B, EV, OUT = os.path.abspath(sys.argv[1]), sys.argv[2], sys.argv[3]
SR = 48000
T = json.load(open(os.path.join(B, 'timing.json')))
ev = json.load(open(EV))
N = int((T['duration'] + 1) * SR)

def load(name):
    p = name if os.path.isabs(name) else os.path.join(LIB, name)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

cache = {}
def get(name):
    if name not in cache: cache[name] = load(name)
    return cache[name]

bed = np.zeros(N, np.float32); hits = np.zeros(N, np.float32); heart = np.zeros(N, np.float32)
def place(buf, x, t, g):
    i = int(t * SR); j = min(N, i + len(x))
    if 0 <= i < N: buf[i:j] += x[:j - i] * g

# ambientes en bucle con fundidos
for name, s, e, g in ev.get('beds', []):
    x = get(name); n = int((e - s) * SR)
    loop = np.tile(x, n // len(x) + 2)[:n].copy()
    f = min(int(.8 * SR), n // 3); loop[:f] *= np.linspace(0, 1, f); loop[-f:] *= np.linspace(1, 0, f)
    place(bed, loop, s, g)
for name, t, g in ev.get('hits', []):
    place(hits, get(name), t, g)

# latido real, sincronizado con la curva de pulso del monitor
if ev.get('heart'):
    hb = get('heartbeat.wav'); bpms = ev['bpm']; SC = T['scenes']
    def bpm_at(t):
        i = next((k for k, s in enumerate(SC) if t < s['end']), len(SC) - 1)
        prev = bpms[i - 1] if i else bpms[0]
        return prev + (bpms[i] - prev) * min(1, max(0, (t - SC[i]['start']) / 1.2))
    dt, ph, t = 1 / 600, 0.0, 0.0
    while t < T['duration'] - .8:
        nph = ph + bpm_at(t) / 60 * dt
        if np.floor(nph - .16) > np.floor(ph - .16):
            b = bpm_at(t); place(heart, hb, t - .02, (.45 + .55 * (b - 90) / 80))
        ph, t = nph, t + dt

def wav(path, x):
    with wave.open(path, 'w') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
# balance automático respecto a la voz
voz = load(os.path.join(B, 'audio', 'narration.wav'))
habla = voz[np.abs(voz) > .02]; v_rms = np.sqrt(np.mean(habla ** 2)); v_pk = np.abs(voz).max()
rms = lambda x: np.sqrt(np.mean(x[np.abs(x) > 1e-4] ** 2)) if np.any(np.abs(x) > 1e-4) else 1
bed *= v_rms * 10 ** (ev.get('bed_db', -14) / 20) / rms(bed)
if np.abs(hits).max() > 0: hits *= v_pk * ev.get('hits_rel', 1.0) / np.abs(hits).max()
if np.abs(heart).max() > 0: hits += heart * v_pk * ev.get('heart', .5) / np.abs(heart).max()
wav(os.path.join(B, 'audio', '_bed.wav'), bed); wav(os.path.join(B, 'audio', '_hits.wav'), hits)

# voz al frente; el ambiente baja (sidechain) cuando habla; los golpes no se atenúan
fc = ('[0]aresample=48000,highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,asplit=2[v][key];'
      '[1][key]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[bd];'
      '[v][bd][2]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.95,loudnorm=I=-14:TP=-1.5:LRA=11[a]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(B, 'audio', 'narration.wav'), '-i', os.path.join(B, 'audio', '_bed.wav'),
                '-i', os.path.join(B, 'audio', '_hits.wav'), '-filter_complex', fc, '-map', '[a]', '-ar', '48000', OUT], check=True)
print('ok', OUT)
