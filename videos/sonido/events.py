"""Escribe eventos.json (qué sonido suena y cuándo) para cada video. uso: python3 events.py <1|2> <carpeta_build>"""
import json, os, sys

V, B = sys.argv[1], sys.argv[2]
T = json.load(open(os.path.join(B, 'timing.json'))); SC = T['scenes']; END = T['duration']
def st(i): return SC[i]['start']
def W(sc, w): return next(x['s'] for x in T['words'] if x['sc'] == sc and w in x['w'].lower())

beds, hits = [['ambience_dark.wav', 0, END, .55]], []
for s in SC[1:]: hits.append(['whoosh.wav', s['start'] - .2, .45])
def twist(t, g=1.0, riser=.55):
    hits.append(['riser.wav', t - 3.0, riser]); hits.append(['stinger.mp3', t, g])

if V == '1':
    bpm = [92, 104, 110, 112, 114, 121, 118, 132, 145, 128, 140, 155, 167, 150]
    beds += [['clock.wav', st(0), SC[0]['end'], .35], ['clock.wav', st(6), SC[6]['end'], .35], ['sizzle.wav', st(10), SC[10]['end'], .45]]
    hits += [['knock.mp3', st(0) + x, 1.0] for x in (.9, 1.15, 3.4, 3.65)]
    hits += [['knock.mp3', st(7) + x, 1.25] for x in (0, .22, .44)]
    hits += [['knock.mp3', st(13) + x, .7] for x in (.1, .33, 1.4, 1.63)]
    hits += [['creak.wav', st(1) + .1, .3], ['paper.wav', st(2) + (SC[2]['end'] - st(2)) * .42, .7], ['paper.wav', st(12) + .1, .7]]
    hits += [['sub_boom.wav', st(8) + .45, .8], ['footsteps.wav', st(9) + .8, .6], ['sub_boom.wav', st(5) + .2, .4]]
    twist(W(8, 'cuatro'), 1.0, .6); twist(W(10, 'papá'), .7, .4); twist(W(11, 'gira'), .9, .45)
    hits += [['stinger.mp3', st(13) + 2.6, 1.0]]
else:
    bpm = [90, 104, 108, 115, 112, 120, 118, 138, 106, 104, 96, 150, 167, 140]
    beds += [['engine.wav', st(0), SC[0]['end'], .55], ['engine.wav', st(8), SC[8]['end'], .55], ['engine.wav', W(9, 'luces'), SC[9]['end'], .55]]
    hits += [['creak.wav', st(1) + 1.0, .5], ['paper.wav', st(2) + .2, .7], ['erase.wav', st(3) + 1.6, .8], ['sub_boom.wav', st(3) + 1.6, .5]]
    hits += [['keys.wav', st(6) + 1.4, .7], ['erase.wav', st(6) + 2.4, .6], ['creak.wav', st(6) + 2.8, .6]]
    twist(W(7, 'barrera'), .6, .5); hits += [['creak.wav', W(7, 'barrera'), .8]]
    hits += [['keys.wav', W(9, 'reloj') - .1, .4], ['keys.wav', W(9, 'anillo') - .1, .45], ['car_door.wav', st(11) + .1, .8]]
    hits += [['sub_boom.wav', W(11, 'sillita'), .6]]; twist(W(11, 'sofía'), 1.0, .5)
    hits += [['sub_boom.wav', st(12) + .1, .8], ['creak.wav', st(12) + 1.2, .5]]; twist(W(12, 'alguien'), 1.0, .5)
json.dump({'beds': beds, 'hits': hits, 'heart': .32, 'bpm': bpm}, open(os.path.join(B, 'eventos.json'), 'w'))
print(len(beds), 'ambientes,', len(hits), 'efectos')
