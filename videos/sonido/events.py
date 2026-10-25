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
elif V == '3':
    bpm = [120, 130, 128, 125, 122, 124, 140, 148, 155, 160, 165, 118, 98, 90]
    beds += [['breath.wav', st(4), SC[4]['end'], .5], ['breath.wav', st(7), SC[8]['end'], .7]]
    hits += [['rumble.wav', st(0) + .8, 1.0], ['stinger.mp3', st(0) + 3.4, .7], ['sub_boom.wav', st(1) + .2, .5]]
    for sc, every in ((2, .72), (3, 1.0), (4, .8), (5, .7), (6, .55)):
        x = st(sc) + .3
        while x < SC[sc]['end'] - .2: hits.append(['beep.wav', x, .35]); x += every
    x = st(5) + .2
    while x < SC[5]['end'] - .3: hits.append(['knock.mp3', x, .25]); x += .5
    x = st(6) + .3
    while x < SC[6]['end'] - .3: hits.append(['paper.wav', x, .45]); x += .45
    twist(W(9, 'emitir'), .9, .5); hits += [['sub_boom.wav', st(10) + .2, .8]]; twist(W(10, 'enterrado'), 1.0, .4)
    hits += [['knock.mp3', W(12, 'toca'), .6], ['whoosh.wav', W(12, 'marca') - .2, .6]]
elif V == '4':
    bpm = [98, 102, 110, 108, 118, 130, 128, 135, 142, 150, 148, 160, 167, 150]
    beds += [['engine.wav', st(0), SC[6]['end'], .25]]
    hits += [['creak.wav', st(0) + 1.5, .3], ['erase.wav', st(1) + .3, .4], ['beep.wav', st(2) + .2, .6], ['beep.wav', W(2, 'responde'), .5]]
    hits += [['paper.wav', st(3) + .2, .5]]
    x = st(5) + .1
    while x < SC[5]['end'] - .3: hits += [['beep.wav', x, .6], ['beep.wav', x + .03, .5]]; x += 2.2
    hits += [['sub_boom.wav', st(7) + .1, .7]]; twist(W(7, 'sube'), .7, .5)
    hits += [['knock.mp3', W(8, 'golpea'), 1.3], ['knock.mp3', W(8, 'golpe'), 1.3], ['knock.mp3', W(8, 'golpe') + 2.0, 1.3]]
    for sc in (9, 10, 11):
        x = st(sc) + .3
        while x < SC[sc]['end'] - .2: hits.append(['knock.mp3', x, .7]); x += 1.4
    x = st(11) + .2
    while x < SC[11]['end'] - .3: hits.append(['creak.wav', x, .35]); x += 1.6
    twist(W(11, 'izando'), 1.0, .5); hits += [['sub_boom.wav', st(12) + .2, .8]]; twist(W(12, 'pescó'), 1.0, .5)
elif V == '5':
    bpm = [95, 92, 110, 115, 120, 132, 125, 125, 135, 150, 160, 167, 140, 120]
    beds += [['rain.wav', 0, END, .45], ['clock.wav', st(6), SC[9]['end'], .5]]
    hits += [['paper.wav', st(1) + .5, .5], ['keys.wav', W(1, 'llave'), .5]]
    x = st(2) + 1.0
    while x < SC[2]['end'] - .2: hits += [['knock.mp3', x, 1.0], ['knock.mp3', x + .22, .9]]; x += 1.2
    for sc in (3, 4, 5): hits += [['knock.mp3', st(sc) + .15, .8], ['knock.mp3', st(sc) + .37, .7]]
    for k in range(5): hits.append(['beep.wav', st(9) + .2 + k * (SC[9]['end'] - st(9)) * .9 / 5, .6])
    twist(W(10, 'clic'), .8, .5); hits += [['keys.wav', W(10, 'clic'), .7]]
    hits += [['sub_boom.wav', st(11) + .1, .8], ['keys.wav', st(11) + .6, .6]]; twist(W(11, 'adelantó'), .7, .4)
    for w in ('marina', 'ernesto', 'reflejo', 'tomás'): hits.append(['whoosh.wav', W(12, w) - .25, .5])
    twist(W(12, 'nadie'), 1.0, .5)
elif V == '6':
    bpm = [0, 110, 160, 170, 40, 0, 0, 0, 0, 0, 45, 72, 80, 80]
    beds += [['flat.wav', st(0), SC[0]['end'], .12]] + [['flat.wav', st(5), SC[9]['end'], .12]]
    beds += [['rain.wav', st(2), SC[4]['end'], .5], ['breath.wav', st(3), SC[3]['end'], .5], ['engine.wav', st(8), SC[8]['end'], .6], ['engine.wav', st(9), SC[9]['end'], .25]]
    hits += [['creak.wav', st(2) + 1.3, .7], ['stinger_short.mp3', st(2) + 1.4, .8], ['rumble.wav', st(2) + 1.4, .5]]
    hits += [['sub_boom.wav', W(4, 'moverse'), .6], ['sub_boom.wav', st(5) + .2, .5]]
    x = st(6) + .3
    while x < SC[6]['end'] - .4: hits += [['knock.mp3', x, .5], ['paper.wav', x + .1, .4]]; x += .6
    twist(W(10, 'pico'), .6, .5); hits += [['beep.wav', W(10, 'pico'), 1.0], ['beep.wav', W(10, 'otro'), 1.0]]
    for sc in (11, 12):
        x = st(sc) + .3
        while x < SC[sc]['end'] - .2: hits.append(['beep.wav', x, .35]); x += 60 / bpm[sc]
    hits += [['sub_boom.wav', st(13) + .1, .4]]
elif V == '7':
    bpm = [120, 95, 130, 160, 150, 145, 140, 138, 135, 130, 110, 96, 90, 90]
    beds += [['rain.wav', 0, SC[12]['end'], .5], ['buzz.wav', st(2) + .5, SC[2]['end'], .6], ['siren.wav', st(12), SC[12]['end'], .35]]
    hits += [['thunder.wav', st(0) + .05, 1.0], ['stinger.mp3', W(0, 'muertos'), .8], ['thunder.wav', st(1) + 2.5, .4]]
    hits += [['thunder.wav', st(3), 1.3], ['sub_boom.wav', st(3), 1.0]]
    hits += [['whoosh.wav', st(5) + 1.0, .5]]
    x = st(8) + .3
    while x < SC[8]['end'] - .4: hits.append(['breath.wav', x, .5]); x += 2.6
    hits += [['beep.wav', W(8, 'emergencias'), .4], ['beep.wav', W(8, 'emergencias') + .3, .4]]
    twist(W(10, 'sola'), .5, .3); hits += [['erase.wav', st(11) + .2, .4], ['thunder.wav', st(13) + .1, .6]]
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
