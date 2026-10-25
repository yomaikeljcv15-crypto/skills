# Estado del proyecto (para retomar en otra sesión)

Última actualización: 25 de octubre de 2026.

## Videos

| # | Título | Estado |
|---|---|---|
| 1 | El censo de las 2:17 | Terminado |
| 2 | El peaje que cobra recuerdos | Terminado |
| 3 | Baliza de avalancha | Terminado |
| 4 | La estación que asciende | Terminado |
| 5 | Habitación 4:44 | Terminado |
| 6 | 13,7 grados (historia real) | Terminado |
| 7 | Triaje al revés | Terminado |
| 8 | El hombre que cayó dentro de una tormenta | Pendiente: solo guion |
| 9 | Ocho ceros | Pendiente: solo guion |
| 10 | Cartas de último recurso | Pendiente: solo guion |

Los guiones completos están en `guiones/10_temas_finalistas.md` y el proceso paso a paso en `README.md`. Cada video nuevo cuesta unos 1.400 créditos de ElevenLabs (una sola toma de voz). Los MP4 no se guardan en el repositorio, pero se regeneran con los archivos de cada carpeta `videoN/`.

## Marca de la cuenta

- **Nombre recomendado:** Regla Tres (`@reglatres`). Cada video tiene tres reglas para sobrevivir, y la tercera siempre es la que importa. Alternativas: Tres Golpes (`@tresgolpes`), Si Fueras Tú (`@sifuerastu`), Último Latido (`@ultimolatido`), Expediente Pulso (`@expedientepulso`). Hay que comprobar que el nombre esté libre en las tres plataformas antes de decidir.
- **Foto de perfil:** opciones en `marca/` (`perfil_a.png`, `perfil_b.png`, `perfil_c.png`), que se regeneran con `node marca/snap_perfil.js`. Para avatares circulares se recomiendan la A o la C.

## Conexión con YouTube, Instagram y TikTok

Es posible con el conector Composio, que ya está disponible en Claude:

- **YouTube:** permite subir videos con título, descripción, etiquetas y privacidad (`YOUTUBE_UPLOAD_VIDEO`).
- **Instagram:** permite publicar Reels, pero **solo con una cuenta Profesional (Creador o Empresa)**, no con una cuenta personal.
- **TikTok:** permite subir videos, pero mientras la app de Composio no esté auditada por TikTok, los videos quedan en **privado (solo yo)** y hay que hacerlos públicos a mano desde la app.
- **Requisito:** el dueño de las cuentas debe autorizar cada conexión con el enlace que genera `COMPOSIO_MANAGE_CONNECTIONS`. Claude debe confirmar con el dueño antes de publicar cada video.
- **Archivo:** los MP4 pesan unos 150 MB. Instagram acepta hasta 100 MB en algunos casos, así que conviene exportar una versión comprimida (por ejemplo, `-crf 23`, unos 30 MB).

## Cuenta de ElevenLabs

Ya es de pago (el acceso gratuito fue bloqueado por "actividad inusual").

## Siguiente paso

Conexiones Composio iniciadas: YouTube e Instagram (cuenta Profesional) con enlace de autorización; TikTok requiere que el dueño configure primero su propia app en el panel de Composio. Siguiente: confirmar las conexiones, publicar los videos y seguir con los videos 8 a 10.
