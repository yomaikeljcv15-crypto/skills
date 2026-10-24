"""Sintetiza la biblioteca de efectos (WAV 48 kHz) que complementa los sonidos reales de ElevenLabs."""
import os, wave
import numpy as np

D = os.path.dirname(os.path.abspath(__file__))
SR = 48000
rng = np.random.default_rng(3)

def save(name, x):
    x = x / max(1e-9, np.abs(x).max()) * .95
    with wave.open(os.path.join(D, name), 'w') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes((x * 32767).astype(np.int16).tobytes())

def t_(sec): return np.arange(int(sec * SR)) / SR
def lp(x, a):  # filtro paso bajo de un polo (a: 0..1, menor = más oscuro)
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
    return y
def lp_fast(x, k): return np.convolve(x, np.ones(k) / k, mode='same')
def env(n, a, d):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na); e[na:] = np.exp(-np.arange(n - na) / (d * SR)); return e
def pitch_drop(sec, f0, f1, k):
    t = t_(sec); f = f1 + (f0 - f1) * np.exp(-t * k); return np.sin(2 * np.pi * np.cumsum(f) / SR)

# latido: lub (grave) + dub (más agudo y corto)
def beat(sec, f0, f1, k, d, g):
    n = int(sec * SR); return pitch_drop(sec, f0, f1, k) * env(n, .004, d) * g
hb = np.zeros(int(.7 * SR))
lub = beat(.35, 90, 48, 25, .07, 1.0) + lp_fast(rng.standard_normal(int(.35 * SR)), 40) * env(int(.35 * SR), .002, .03) * .5
dub = beat(.3, 110, 60, 30, .05, .75)
hb[:len(lub)] += lub; i = int(.17 * SR); hb[i:i + len(dub)] += dub
save('heartbeat.wav', np.tanh(hb * 1.6))

# ambiente oscuro: drones desafinados + viento con barrido lento (30 s, en bucle)
t = t_(30)
drone = sum(np.sin(2 * np.pi * f * t + 3 * np.sin(2 * np.pi * .05 * t * (j + 1))) * a for j, (f, a) in enumerate([(41.2, 1), (41.6, .8), (61.7, .5), (82.4, .35), (123.5, .12)]))
wind = lp(rng.standard_normal(len(t)), .02) * 6
wind *= .5 + .5 * np.sin(2 * np.pi * t / 7.5) ** 2
amb = drone * .55 + wind * .6
fade = int(1.5 * SR); amb[:fade] *= np.linspace(0, 1, fade); amb[-fade:] *= np.linspace(1, 0, fade)
save('ambience_dark.wav', amb)

# subida de tensión (riser) 3 s: ruido que se abre + tono que sube
t = t_(3); n = len(t)
nz = rng.standard_normal(n); a = np.linspace(.01, .35, n) ** 2
riser = np.zeros(n); acc = 0.0
for k in range(n): acc += a[k] * (nz[k] - acc); riser[k] = acc
tone = np.sin(2 * np.pi * np.cumsum(np.linspace(80, 420, n)) / SR) * .25 + np.sin(2 * np.pi * np.cumsum(np.linspace(81, 427, n)) / SR) * .25
save('riser.wav', (riser * 4 + tone) * np.linspace(0, 1, n) ** 2)

# transición (whoosh)
t = t_(.7); n = len(t); nz = rng.standard_normal(n); a = .02 + .3 * np.sin(np.linspace(0, np.pi, n)) ** 2
w = np.zeros(n); acc = 0.0
for k in range(n): acc += a[k] * (nz[k] - acc); w[k] = acc
save('whoosh.wav', w * np.sin(np.linspace(0, np.pi, n)) ** 1.5)

# golpe sub-grave
n = int(2.5 * SR); save('sub_boom.wav', pitch_drop(2.5, 70, 32, 4) * env(n, .003, .7) + lp_fast(rng.standard_normal(n), 60) * env(n, .001, .15) * 2)

# tic-tac de reloj (4 s en bucle)
x = np.zeros(int(4 * SR))
for k in range(4):
    n = int(.05 * SR); c = (np.sin(2 * np.pi * (2400 if k % 2 else 1900) * t_(.05)) + rng.standard_normal(n) * .4) * env(n, .0005, .008)
    i = int(k * SR); x[i:i + n] += c
save('clock.wav', x)

# motor de auto por dentro (12 s en bucle)
t = t_(12)
eng = np.sin(2 * np.pi * 32 * t + .4 * np.sin(2 * np.pi * 3 * t)) + .5 * np.sin(2 * np.pi * 64 * t) + .25 * np.sign(np.sin(2 * np.pi * 32 * t))
road = lp(rng.standard_normal(len(t)), .03) * 5
save('engine.wav', lp_fast(eng, 12) * .6 + road * .5)

# crujido mecánico / barrera
t = t_(1.6); n = len(t)
f = 140 + 60 * np.sin(t * 7) + np.linspace(0, 80, n)
saw = 2 * ((np.cumsum(f) / SR) % 1) - 1
cr = lp_fast(saw * (rng.random(n) > .3), 6) * np.sin(np.linspace(0, np.pi, n))
mot = np.sin(2 * np.pi * np.cumsum(np.full(n, 95)) / SR) * .4 * np.sin(np.linspace(0, np.pi, n))
save('creak.wav', cr + mot)

# llaves
x = np.zeros(int(1 * SR))
for k in range(9):
    n = int(.25 * SR); f0 = 2500 + 2500 * rng.random()
    c = (np.sin(2 * np.pi * f0 * t_(.25)) + .5 * np.sin(2 * np.pi * f0 * 2.7 * t_(.25))) * env(n, .0005, .05)
    i = int((k * .06 + rng.random() * .04) * SR); x[i:i + n] += c * (.5 + rng.random())
save('keys.wav', x)

# papel
n = int(1 * SR); nz = rng.standard_normal(n); nz = nz - lp_fast(nz, 6)
gate = lp_fast((rng.random(n) > .6).astype(float), 300)
save('paper.wav', nz * gate * np.sin(np.linspace(0, np.pi, n)))

# chisporroteo de sartén (8 s en bucle)
n = int(8 * SR); crack = rng.standard_normal(n) * (rng.random(n) > .992) * 3
hiss = rng.standard_normal(n); hiss = hiss - lp_fast(hiss, 4)
save('sizzle.wav', crack + hiss * .25)

# pasos alejándose sobre grava
x = np.zeros(int(5 * SR))
for k in range(9):
    n = int(.22 * SR); s = lp_fast(rng.standard_normal(n), 3) * env(n, .003, .05) + pitch_drop(.22, 120, 60, 40) * env(n, .002, .03) * .8
    i = int(k * .5 * SR); x[i:i + n] += s * (1 - k / 11)
save('footsteps.wav', x)

# glitch / recuerdo que se borra
t = t_(1.2); n = len(t); nz = rng.standard_normal(n); nz = nz - lp_fast(nz, 8)
chop = (np.sin(2 * np.pi * 14 * t) > 0).astype(float)
tone = np.sin(2 * np.pi * np.cumsum(np.linspace(1200, 200, n)) / SR)
save('erase.wav', (nz * .6 + tone * .5) * chop * np.linspace(1, 0, n) ** 1.5)

# puerta de auto
n = int(.6 * SR); save('car_door.wav', pitch_drop(.6, 160, 70, 20) * env(n, .002, .09) + lp_fast(rng.standard_normal(n), 5) * env(n, .001, .03) * 1.5)

# pitido de baliza
n = int(.12 * SR); save('beep.wav', np.sin(2 * np.pi * 2200 * t_(.12)) * np.minimum(1, np.minimum(np.arange(n), n - np.arange(n)) / (.004 * SR)))

# estruendo de avalancha (6 s)
t = t_(6); n = len(t); nz = lp_fast(rng.standard_normal(n), 120) * 8
rum = (nz + np.sin(2 * np.pi * 30 * t) * .4) * np.sin(np.linspace(0, np.pi, n)) ** .7
save('rumble.wav', rum)

# respiración agitada (2,4 s en bucle: inhala y exhala)
x = np.zeros(int(2.4 * SR))
for k in range(4):
    n = int(.42 * SR); b = rng.standard_normal(n); b = lp_fast(b, 3) - lp_fast(b, 30)
    e = np.sin(np.linspace(0, np.pi, n)) ** 2 * (.7 if k % 2 else 1)
    i = int(k * .6 * SR); x[i:i + n] += b * e
save('breath.wav', x)
print('biblioteca lista')
