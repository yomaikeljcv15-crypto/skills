# Videos de suspenso animados (TikTok · YouTube Shorts · Instagram Reels)

Todo lo necesario para producir los 10 videos de `guiones/10_temas_finalistas.md` con el mismo estilo de los videos 1 y 2 ya terminados.

## Contenido

| Carpeta | Qué hay |
|---|---|
| `guiones/` | Guía de estilo obligatoria y los 10 guiones completos, escena por escena. |
| `ideas/` | El brief, las 70 ideas originales y la revisión de originalidad. |
| `sonido/` | Biblioteca de efectos (`make_lib.py` los sintetiza; `knock.mp3` y `stinger*.mp3` son reales de ElevenLabs), mezclador con ducking (`mix.py`) y lista de eventos por video (`events.py`). |
| `video1/`, `video2/` | Videos terminados: animación (`videoN.html`), narración (`audio/take1.mp3`), tiempos por palabra (`audio/words.json`), línea de tiempo y scripts de render. |

Los MP4 finales no están en el repositorio (pesan más de 100 MB, el límite de GitHub). Se regeneran con los pasos de abajo.

## Cómo producir un video nuevo (pasos)

1. **Voz (ElevenLabs):** `creative_generate_speech`, modelo `eleven_v4`, voz **Erick - Cinematic Storyteller** (`nFcvfxkh4Fldtkn096yh`). Narración del guion con etiquetas `[softly]`, `[nervous]`, `[whispers]`, `[trembling voice]` y `[pause]` entre escenas. Descargar la toma a `videoN/audio/take1.mp3`.
2. **Tiempos por palabra:** fijar la toma con `creative_add_flow_asset_node` y transcribir con `creative_transcribe_audio` (`eleven_scribe_v1`). Guardar `words.json` sin las palabras entre corchetes. Generar `audio/take1.wav` (mono 44,1 kHz) y `audio/sil.txt` con `silencedetect` (ver `timeline.py`).
3. **Línea de tiempo:** editar en `timeline.py` la lista `starts` (primera palabra de cada escena) y `gap_before` (pausas añadidas). Ejecutar `python3 timeline.py` → `timing.json` y `audio/narration.wav`. Crear `timing.js` con `const TIMING = <timing.json>;`.
4. **Animación:** copiar `video2/_top.js`, `_mid.js`, `_bot.js` (motor común: barra de tiempo, monitor de pulso, subtítulos palabra por palabra, tarjetas de reglas) y escribir un `_scenes.js` nuevo con las 14 escenas (`S[0]`…`S[13]`), `META` (marca de tiempo, lugar, título, color, pulsaciones, estado), `KEY_Y`/`KEY_R` (palabras resaltadas) y `END_LINES`. Ensamblar como en el video 2.
5. **Revisar:** `node snap.js 3 10 20 …` guarda cuadros en `snaps/` para revisar cada escena antes de renderizar.
6. **Render:** `node render.js` → `video_mudo.mp4` (1080 × 1920, 30 fps, Chromium + ffmpeg).
7. **Sonido:** `python3 ../sonido/make_lib.py` (una vez), añadir el video a `sonido/events.py`, y luego `python3 ../sonido/events.py N .` y `python3 ../sonido/mix.py . eventos.json audio/mix2.wav`.
8. **Unir:** `ffmpeg -i video_mudo.mp4 -i audio/mix2.wav -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart VideoN.mp4`.

## Notas

- ElevenLabs limita las solicitudes seguidas (error 429). Pedir de una en una y esperar unos minutos entre generaciones.
- El balance de sonido es automático: el ambiente queda unos 14 dB por debajo de la voz y baja aún más cuando hay narración; los golpes de impacto suenan tan fuerte como la voz.
- Los videos 7, 9 y 10 tienen notas de verificación de datos al final del documento de guiones.
