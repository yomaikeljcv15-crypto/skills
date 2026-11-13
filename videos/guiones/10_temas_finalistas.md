# Guiones completos: 10 videos de esta semana

Documento de producción. Cada video tiene su historia completa, escena por escena, con narración, visuales, texto en pantalla y pulso. Cualquier Claude que lea este documento debe poder hacer el video sin inventar nada.

---

## Cómo usar este documento

- **Para hacer el video final (MP4 con voz):** usa Claude Code. Pídele: "Haz el video N del documento, siguiendo la guía de estilo al pie de la letra." Claude Code anima en HTML, genera la voz con ElevenLabs y une todo en un MP4 vertical.
- **En un chat normal de Claude:** pega este documento y pide "Haz una animación en HTML del video N". Verás la animación en pantalla, pero el chat no entrega un MP4 con la voz incluida.
- **No cambies la historia.** La narración de cada escena está escrita para durar lo indicado. Si se cambia, cambia la duración.

---

## Guía de estilo (obligatoria para los 10 videos)

### Formato
- Vertical 9:16, 1080 × 1920 px, 30 fps, MP4 (H.264 + AAC).
- Duración objetivo: 85 a 100 segundos (alrededor de 1:30).
- Idioma: español neutro latinoamericano.

### Estructura fija de la pantalla (de arriba abajo)
1. **Barra de tiempo (franja superior, 0–15 % de la altura):** marca de tiempo grande en blanco ("+0 s", "+40 s", "+1 h 30 min" o "DÍA 1 · 07:12"). Debajo, una línea fina con puntos: el punto activo es amarillo y brilla; los puntos pasados quedan amarillos y los futuros, gris oscuro. Debajo, en letra muy pequeña y espaciada, el lugar ("CASA · NOCHE") y, en grande, el **título de la escena** en mayúsculas, con color según la tensión (blanco normal, amarillo mostaza alerta, rojo peligro, azul frío o extraño).
2. **Ilustración (15–75 %):** escena en vector plano.
3. **Monitor de pulso (75–85 %):** línea de electrocardiograma que se mueve de izquierda a derecha, con un corazón y el número de pulsaciones a la derecha ("♥ 96"). Debajo, en letra pequeña, el estado ("ALERTA · PULSO", "PELIGRO · PULSO", "CALMA APARENTE · PULSO"). Color de la línea: amarillo (alerta), rojo (peligro, más de 130), verde (calma), azul (frío o hipotermia). La velocidad del latido coincide con el número.
4. **Subtítulos (85–95 %):** frase actual de la narración, máximo 2 líneas, tipografía sans muy gruesa, en blanco. La palabra clave de cada frase va en color (amarillo o rojo). Aparecen palabra por palabra, sincronizadas con la voz.

### Dibujo
- Vector plano 2D sin texturas ni degradados fuertes. Personajes simples: cabeza redonda, ojos grandes blancos con pupila negra, sin nariz o con nariz mínima, cuerpo de bloques, contorno nulo o muy fino.
- Fondo oscuro siempre. Interiores en madera café (#4A3426, vetas #3B2A1F); exteriores de noche en azul (#121A33 a #1E2A4F) con luna blanca y pinos negros.
- **Paleta:** fondo #0B0D14 · azul noche #1E2A4F · madera #4A3426 · amarillo mostaza #E8B931 · rojo alerta #E04848 · verde calma #4CC38A · azul frío #6EC6FF · blanco #F5F5F5.
- Elementos de interfaz con estilo de "expediente": etiquetas pequeñas en recuadros finos ("REGLA 1", "PUERTA", "VERSIÓN DEL VISITANTE"), mapas con líneas punteadas, iconos simples, radiografías azules del cuerpo cuando se habla de lo que siente el protagonista.
- **Tipografía:** sans geométrica muy gruesa (Montserrat ExtraBold o Inter Black) para títulos y subtítulos; monoespaciada pequeña (JetBrains Mono) para etiquetas.

### Animación
- Una escena nueva cada 5–8 segundos como máximo. Algo se mueve siempre: respiración del personaje, parpadeo, la línea del pulso, partículas de polvo o nieve.
- Transiciones: corte seco o barrido rápido de 0,2 s. En momentos de susto: pantalla negra de 0,3 s, golpe de sonido y vuelta.
- Las reglas aparecen como tarjeta: recuadro con borde amarillo, "REGLA 1" en pequeño y el texto de la regla en grande. Queda una lista de reglas acumuladas en la esquina superior izquierda.
- Cámara: zoom lento (de 100 % a 108 %) dentro de cada escena; zoom rápido (de 100 % a 130 %) en los sustos.
- Final: tras la última frase, 1,5 s de silencio sobre la última imagen y corte a negro con el nombre de la cuenta.

### Voz (ElevenLabs)
- Narrador masculino, voz grave, cercana y tranquila, como alguien que cuenta algo en voz baja de noche. Español latinoamericano.
- Modelo multilingüe de ElevenLabs. Estabilidad media-alta (alrededor de 0,6), similitud alrededor de 0,8, estilo bajo (0,2). Velocidad normal: unas 150 palabras por minuto.
- Pausas: punto = pausa breve; los "…" = pausa de 0,6 s; cada cambio de escena = pausa de 0,3 s.

### Sonido
- Música: drone grave oscuro, muy bajo (−24 dB bajo la voz), que sube un poco hacia el final.
- Efectos: latido del corazón sincronizado con el monitor (más fuerte en peligro), golpes de puerta, viento, radio con estática, pitidos de interfaz, "whoosh" en los barridos.
- La voz es lo más importante: nunca debe taparla la música.

---

# 1. El censo de las 2:17

**Tipo:** ficción con reglas · **Duración:** ~95 s · **Medidor extra:** contador "PERSONAS EN CASA: 3" arriba a la derecha.

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–5 s | +0 s · TRES DE NOCHE · **TOCAN** | Casa de madera de noche. Tú en pijama en la cocina, vaso de agua. La puerta vibra con dos golpes. Reloj: 2:17. | "A las dos y diecisiete de la madrugada alguien toca tu puerta. Y trae una tabla de censo." | ♥ 92 amarillo |
| 5–12 s | +10 s · MIRILLA · **EL ENCUESTADOR** | Vista por la mirilla (círculo distorsionado): hombre alto con chaleco gris, tabla, gafete sin foto. Sonríe sin moverse. | "Por la mirilla ves a un hombre con chaleco y gafete. Sonríe. Y pregunta: '¿Cuántas personas viven aquí?'" | ♥ 104 |
| 12–19 s | +20 s · BOLSILLO · **LA NOTA** | Flashback rápido (tono sepia): el vecino viejo te da un papel doblado. "Por si vienen." Vuelta al presente: lo desdoblas. | "Recuerdas la nota que te dio el vecino cuando llegaste al pueblo. 'Si vienen de noche, sigue esto. Lo que contestes, será verdad por la mañana.'" | ♥ 110 |
| 19–26 s | REGLA 1 · **SOLO NÚMEROS** | Tarjeta de regla. Detrás, la puerta con sombra de pies por debajo. | "Regla uno: nunca digas nombres. Solo números." | ♥ 112 |
| 26–33 s | REGLA 2 · **NO CAMBIES** | Tarjeta de regla. El encuestador escribe sin mirar la tabla. | "Regla dos: si pregunta dos veces, no cambies tu respuesta." | ♥ 114 |
| 33–41 s | REGLA 3 · **NUNCA MENOS** | Tarjeta de regla en rojo. Tres siluetas de tu familia (mamá, hermanita, tú); una parpadea. | "Regla tres: jamás digas un número menor que el real. Si dices menos… alguien de la casa sobra." | ♥ 121 rojo |
| 41–49 s | +1 min · TU CASA · **CUENTA** | Plano de la casa en corte: mamá dormida, tu hermana dormida, tú en la cocina. Contador: 3. | "Cuentas. Tu madre. Tu hermana. Tú. Tres. La respuesta es tres." | ♥ 118 |
| 49–56 s | +1 min 20 s · PUERTA · **OTRA VEZ** | Golpe más fuerte. Primer plano del encuestador: ahora pega la cara a la mirilla. | "Tocan otra vez. '¿Cuántas personas viven aquí?' Abres la boca para decir tres…" | ♥ 132 rojo |
| 56–62 s | +1 min 21 s · **CUATRO** | Pantalla negra 0,3 s. Tu boca en primer plano. Contador pasa de 3 a **4** con un "clic". | "…y de los nervios dices: 'cuatro'." | ♥ 145 |
| 62–68 s | +1 min 30 s · **ANOTADO** | El encuestador escribe "4", hace una reverencia y se va caminando por la carretera sin hacer ruido. | "El hombre sonríe más. Escribe. Y se va." | ♥ 128 |
| 68–76 s | +5 h · MAÑANA · **EL DESAYUNO** | Cocina con luz de mañana. Un hombre de espaldas hace huevos. Tu mamá y tu hermana desayunan tranquilas. | "Por la mañana huele a desayuno. Un hombre que nunca has visto cocina en tu casa. Y tu familia lo llama papá." | ♥ 140 rojo |
| 76–84 s | COCINA · **LA CARTERA** | Zoom: la cartera del hombre abierta sobre la mesa. Tu foto de bebé. Él se gira despacio y sonríe igual que el encuestador. | "En su cartera hay una foto tuya de bebé. Se gira. Y te sonríe exactamente igual." | ♥ 155 |
| 84–93 s | NOTA · **AL REVERSO** | Le das la vuelta a la nota del vecino. Letra temblorosa. | "Le das la vuelta a la nota del vecino. Detrás dice: 'Yo contesté cinco hace tres años. Todavía no sé cuál de mis hijos es el de verdad.'" | ♥ 167 rojo |
| 93–96 s | — | Ventana: el encuestador está en la casa de enfrente, tocando. Corte a negro. | (silencio, dos golpes de puerta) | — |

**Texto final en pantalla:** "¿Qué número habrías dicho tú?"

---

# 2. El peaje que cobra recuerdos

**Tipo:** ficción con reglas · **Duración:** ~95 s · **Medidores extra:** "CASETAS: 5" y una barra "RECUERDOS" que se vacía.

**Pista oculta para volver a verlo:** en las escenas 1 y 2 se ve una sillita infantil en el asiento trasero. A partir de la tercera caseta desaparece del dibujo sin que se mencione.

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | KM 0 · **SIN SEÑAL** | Auto de frente en carretera de noche, pinos. Dentro: tú al volante, tu pareja dormida, sillita infantil atrás con un bebé dormido. Celular: "Sin servicio". | "En esta carretera el peaje no cuesta dinero. Cuesta un recuerdo. Y no eliges cuál." | ♥ 90 amarillo |
| 6–13 s | CASETA 1 · **EL COBRADOR** | Caseta iluminada con luz blanca. Brazo largo y gris sale por la ventanilla, palma arriba. Letrero: "PAGUE LO QUE TRAIGA". | "Primera caseta. Un brazo gris sale por la ventanilla. No hay precio. Solo un letrero: 'Pague lo que traiga'." | ♥ 104 |
| 13–20 s | REGLA 1 · **PAGA CON OBJETOS** | Tarjeta de regla. Detrás, la guantera abierta. | "En la guantera hay una nota vieja con reglas. Regla uno: paga siempre con objetos, antes de que te pidan otra cosa." | ♥ 108 |
| 20–27 s | CASETA 1 · **UNA FOTO** | Das una foto de tu boda. La mano la cierra. Barra de recuerdos baja un poco. Tu cara: parpadeo de confusión. | "Le das una foto. La barrera sube. Y por un segundo… no recuerdas el día de tu boda." | ♥ 115 |
| 27–34 s | REGLA 2 · **TU NOMBRE NO** | Tarjeta de regla. | "Regla dos: nunca digas tu nombre completo al cobrador." | ♥ 112 |
| 34–41 s | REGLA 3 · **NO MIRES ATRÁS** | Tarjeta de regla en rojo. Espejo retrovisor tapado por un pañuelo. | "Regla tres: después de pagar, no mires el asiento trasero por el espejo." | ♥ 120 rojo |
| 41–49 s | CASETA 2 · **LAS LLAVES** | Das las llaves de tu casa. Barra baja. Un recuadro "OLVIDADO: tu dirección". | "Segunda caseta. Das las llaves de tu casa. Ya no sabes en qué calle vives. Pero sigues manejando." | ♥ 118 |
| 49–57 s | CASETA 3 · **NADA EN LAS MANOS** | El brazo gris espera. Revisas: guantera vacía, bolsillos vacíos. El brazo no se mueve. Pantalla se oscurece. | "Tercera caseta. Ya no te queda nada que dar. El brazo espera. Y espera. Hasta que la barrera sube sola." | ♥ 138 rojo |
| 57–64 s | +3 s · **ALIVIO** | El auto pasa. Tu cara se relaja. La sillita trasera ya no está (sin mencionarlo). | "Respiras. No te cobró nada. Quizás se apiadó de ti." | ♥ 110 |
| 64–72 s | CASETAS 4 Y 5 · **MONEDAS** | Montaje rápido: das el reloj, das el anillo. Barra casi vacía. | "Cuarta caseta: tu reloj. Quinta: tu anillo. Y por fin, las luces de la ciudad." | ♥ 104 |
| 72–80 s | CIUDAD · **LLEGASTE** | Estacionas frente a una gasolinera. Tu pareja despierta. "¿Por qué venimos solos?", piensas: siempre fueron dos. | "Llegas. Tu pareja despierta. Y sonríes, porque es raro: siempre has viajado los dos solos." | ♥ 96 verde |
| 80–89 s | ASIENTO TRASERO · **LA SILLITA** | Abres la puerta trasera. Sillita vacía, abrochada. Un chupete en el suelo. Una mochila pequeña con un nombre bordado: "SOFÍA". | "Abres la puerta de atrás. Hay una sillita de bebé abrochada. Y una mochila con un nombre que no conoces: Sofía." | ♥ 150 rojo |
| 89–96 s | TERCERA CASETA · **EL COBRO** | Flashback de 1 s: la tercera caseta, la barrera sube y el brazo gris se retira… sosteniendo algo pequeño envuelto en una manta. Corte a negro. | "La tercera caseta no te perdonó. No te pidió un recuerdo. Te pidió a alguien." | ♥ 167 |

**Texto final en pantalla:** "Vuelve al principio. ¿Cuántos iban en el auto?"

---

# 3. Baliza de avalancha

**Tipo:** ficción con datos reales de rescate · **Duración:** ~95 s · **Medidores extra:** distancia de la baliza (en metros) y cronómetro "15:00" hacia atrás.

**Datos reales que usa:** la supervivencia de una persona enterrada es muy alta los primeros 15 minutos y luego cae rápido; las balizas (ARVA) tienen modo emitir y modo buscar; cerca del objetivo se deja la baliza y se usa la sonda; en una avalancha no se oyen los gritos bajo la nieve.

**Pista oculta:** la pantalla de la baliza siempre dice "EMITIR" en pequeño. Nunca la cambiaste a "BUSCAR".

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | +0 s · MONTAÑA · **ESTRUENDO** | Ladera blanca, cuatro esquiadores pequeños. Grieta en la nieve, ola blanca que los cubre. Pantalla en blanco. | "Una avalancha cubre a tu grupo de esquí en cuatro segundos. Cuando todo se detiene, eres el único que se ve." | ♥ 120 amarillo |
| 6–13 s | +30 s · **15 MINUTOS** | Cronómetro 15:00 grande que empieza a bajar. Silueta de un cuerpo bajo la nieve con una burbuja de aire. | "Bajo la nieve una persona tiene, más o menos, quince minutos. Después, casi nadie sobrevive." | ♥ 130 rojo |
| 13–20 s | +45 s · TU BALIZA · **PIIP** | Primer plano de la baliza: flecha, número "14 m", y en pequeño "EMITIR". | "Tu baliza pita. Una flecha. Catorce metros. Alguien está ahí abajo." | ♥ 128 |
| 20–27 s | REGLA 1 · **SIGUE LA FLECHA** | Tarjeta de regla. Tú caminando en la nieve hasta las rodillas. | "Regla uno: sigue la flecha, no tu oído. Bajo la nieve nadie oye los gritos. Ni de ida, ni de vuelta." | ♥ 125 |
| 27–34 s | +2 min · **9 METROS** | Cronómetro 13:00. Número baja a 9 m. Nieve que cae a tus pies. | "Nueve metros. El silencio es total. Solo el pitido… y tu propia respiración, extrañamente cerca de tu cara." | ♥ 122 |
| 34–41 s | REGLA 2 · **SONDA** | Tarjeta. Ilustración de una sonda larga entrando en la nieve en espiral. | "Regla dos: a menos de tres metros, deja la baliza. Saca la sonda. Pincha en espiral." | ♥ 124 |
| 41–49 s | +5 min · **2 METROS** | Número 2 m. Te arrodillas y cavas con las manos. La nieve que apartas se vuelve gris en los bordes de la pantalla. | "Dos metros. Cavas con las manos. Es raro: la nieve no se mueve. La empujas… y vuelve a estar ahí. Y hace muchísimo frío en la espalda." | ♥ 140 rojo |
| 49–56 s | REGLA 3 · **CUENTA TU AIRE** | Tarjeta en rojo. Radiografía azul: pulmones que se inflan cada vez menos. | "Regla tres: cuenta tus respiraciones. Si se aceleran sin hacer esfuerzo… para todo." | ♥ 148 |
| 56–63 s | +8 min · **MÁS RÁPIDO** | Contador de respiraciones subiendo. Bordes negros que cierran la imagen como un túnel. | "Una, dos, tres, cuatro… Respiras muy rápido. Y no estás haciendo esfuerzo." | ♥ 155 |
| 63–70 s | BALIZA · **EMITIR** | Zoom a la pantalla de la baliza: la palabra "EMITIR" crece y se pone roja. | "Miras la baliza otra vez. No dice 'buscar'. Dice 'emitir'. Nunca la cambiaste." | ♥ 160 rojo |
| 70–78 s | **LA SEÑAL ERES TÚ** | Corte: ya no hay ladera. Plano desde abajo: estás de lado, encogido, bajo un metro de nieve, con una burbuja de aire pequeña delante de la boca. | "La señal que seguías es la tuya. No estás cavando. Estás enterrado. La nieve que no se movía… es el techo." | ♥ 165 |
| 78–85 s | +12 min · **3:00** | Cronómetro 3:00 parpadeando. Burbuja de aire más pequeña. Silencio total. | "El cronómetro nunca fue el tiempo de tu amigo. Siempre fue tu aire." | ♥ 120 azul (baja) |
| 85–94 s | ARRIBA · **2 METROS** | Arriba, una sonda atraviesa la nieve y toca tu hombro. Voz lejana. Luz que entra por un agujero. | "Entonces, algo te toca el hombro. Y arriba, una voz grita: '¡Marca dos metros! ¡Está aquí!'" | ♥ 96 verde |

**Texto final en pantalla:** "Si vas a la montaña: aprende a usar tu baliza. Puede que la señal que importa sea la tuya."

---

# 4. La estación que asciende

**Tipo:** ficción con reglas · **Duración:** ~95 s · **Medidores extra:** profundidad en metros y oxígeno en %.

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | 3.200 M · **SUBIENDO** | Interior de una estación submarina: tubos, luces verdes, ventanilla redonda negra. Medidor de profundidad que pasa de 3.200 a 3.190. | "Estás a tres mil doscientos metros bajo el mar. Y el medidor de profundidad empieza a subir… sin que nadie lo toque." | ♥ 98 amarillo |
| 6–13 s | +0 s · RADIO · **SIN SUPERFICIE** | Pantalla de comunicaciones: "ENLACE PERDIDO". Tu compañera Lucía dormida en la litera. | "Hace seis horas que no hay contacto con el barco de superficie. Tu compañera duerme. Estás solo de guardia." | ♥ 102 |
| 13–20 s | SONAR · **PING** | Pantalla de sonar circular con un pulso que sale. Vuelve un eco. | "Mandas un ping de sonar para medir el fondo. Y algo responde." | ♥ 110 |
| 20–27 s | REGLA 1 · **CADA 60 S** | Tarjeta de regla. Manual plastificado colgado en la pared: "PROTOCOLO 7". | "En la pared está el protocolo siete. Nadie lo ha leído nunca. Regla uno: haz ping solo cada sesenta segundos exactos." | ♥ 108 |
| 27–35 s | REGLA 2 · **EL ECO PUNTUAL** | Tarjeta. Gráfico: el eco real llega con medio segundo de retraso; el falso, exacto. | "Regla dos: si un ping te responde al instante, no contestes. Los ecos de verdad siempre llegan tarde. El agua es lenta." | ♥ 118 |
| 35–42 s | +4 min · **AL INSTANTE** | Mandas ping. El eco vuelve sin retraso, en el mismo segundo. Luces parpadean. | "Mandas otro. El eco vuelve al instante. Exacto. Como si algo te imitara desde muy cerca." | ♥ 130 rojo |
| 42–49 s | REGLA 3 · **APAGA LAS LUCES** | Tarjeta en rojo. | "Regla tres: si la profundidad baja sin que muevas nada, apaga todas las luces." | ♥ 128 |
| 49–56 s | 2.700 M · **OSCURIDAD** | Apagas. Solo brillan los medidores. Por la ventanilla pasan partículas hacia abajo, rápido. | "Apagas todo. Por la ventanilla, la nieve marina cae muy rápido… porque eres tú el que sube." | ♥ 135 |
| 56–63 s | 1.800 M · **GOLPES** | Ondas en el casco. Tornillos que vibran. | "Algo golpea el casco. Un golpe. Pausa. Otro golpe. Pausa. Un ritmo." | ♥ 142 rojo |
| 63–70 s | 1.200 M · **EL CABLE** | Cámara exterior en verde nocturno: un cable grueso tenso que sale del techo hacia arriba, hacia lo negro. | "Enciendes la cámara de afuera. Del techo sale un cable. Muy tenso. Y sube hacia la oscuridad." | ♥ 150 |
| 70–77 s | OXÍGENO · **72 %** | Medidor de oxígeno bajando. Lucía despierta: "¿Qué pasa?". | "Lucía despierta. Le muestras el cable. No dice nada. Solo te señala el ritmo de los golpes." | ♥ 148 |
| 77–85 s | 900 M · **EL CARRETE** | Ilustración de un carrete enorme. Cada golpe = una vuelta. | "Los golpes no son golpes. Es un carrete. La estación no se hunde ni flota. La están izando." | ♥ 160 rojo |
| 85–95 s | 300 M · **ARRIBA** | Plano exterior gigante: la estación como un anzuelo pequeño. Arriba, en la superficie, una silueta enorme sin forma tapa la luz de la luna. | "Allá arriba no hay ningún barco esperándote. Hay algo esperando… lo que pescó." | ♥ 167 |

**Texto final en pantalla:** "¿Cortarías el cable?"

---

# 5. Habitación 4:44 (misterio con pistas)

**Tipo:** misterio para volver a ver · **Duración:** ~100 s · **Medidor extra:** reloj de pared en una esquina.

**Solución (no se dice hasta el final):**
- **Huésped 1, Marina (mujer con toalla):** dice que viene de la piscina, pero su pelo está seco. Miente.
- **Huésped 2, Ernesto (hombre de traje):** te llama por tu nombre, pero solo lo escribiste en el registro de recepción. Miente: el recepcionista se lo dijo.
- **Huésped 3, Tomás (hombre grande con cicatriz):** parece el peligroso, pero su historia encaja con todo. Dice la verdad e intenta avisarte.
- **El reloj:** marca 4:44, pero su reflejo en la ventana marca 3:58. Alguien lo adelantó: el recepcionista, que tiene llave maestra de todas las habitaciones.

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | 4:44 · **TRES PISTAS** | Pasillo de motel de carretera, lluvia en la ventana, luz de neón rojo "VACANTE". | "Este video tiene tres pistas. Si las ves todas, sabrás a quién no debes abrir la puerta." | ♥ 95 amarillo |
| 6–13 s | MOTEL · **TORMENTA** | Recepción: recepcionista flaco, sonriente, te da la llave 12. Tú escribes tu nombre en el registro. Él cierra el registro con llave en un cajón. | "Llegas a un motel en plena tormenta. Escribes tu nombre en el registro. El recepcionista lo guarda bajo llave." | ♥ 92 |
| 13–19 s | HABITACIÓN 12 · **4:44** | Habitación con reloj de pared que marca 4:44. En la ventana, su reflejo marca 3:58 (pasa rápido, sin resaltar). | "A las cuatro y cuarenta y cuatro tocan tu puerta. Tres veces. Tres personas distintas." | ♥ 110 |
| 19–27 s | PUERTA · **MARINA** | Mirilla: mujer con bata y toalla al hombro, pelo seco y peinado. | "La primera es Marina: 'Vengo de la piscina, por favor, el hombre del pasillo me está siguiendo.'" | ♥ 115 |
| 27–35 s | PUERTA · **ERNESTO** | Mirilla: hombre de traje mojado por la lluvia. | "El segundo es Ernesto: 'Daniel, ábreme, no confíes en el grandote. Te lo explico adentro.'" | ♥ 120 |
| 35–43 s | PUERTA · **TOMÁS** | Mirilla: hombre muy grande, cicatriz en la ceja, voz grave. Chaqueta mojada, botas con barro. | "El tercero es Tomás, enorme, con una cicatriz: 'Llegué en camión hace diez minutos. No le abras a nadie. Ni a mí.'" | ♥ 132 rojo |
| 43–50 s | REGLA 1 · **SABE DEMASIADO** | Tarjeta. | "Regla uno: nunca abras a quien sabe más de lo que debería." | ♥ 125 |
| 50–56 s | REGLA 2 · **LA PRISA** | Tarjeta. | "Regla dos: desconfía del que tiene prisa." | ♥ 125 |
| 56–62 s | REGLA 3 · **EL RELOJ NO ES TUYO** | Tarjeta en rojo. El reloj de pared hace tic. | "Regla tres: el reloj de esta habitación no es tuyo." | ♥ 135 |
| 62–70 s | **DECIDE** | Pantalla dividida en tres mirillas. Cuenta regresiva 5-4-3-2-1. | "Solo puedes abrirle a uno. Tienes cinco segundos." | ♥ 150 rojo |
| 70–77 s | **CLIC** | Tu mano en el pomo. Detrás de ti, un clic de cerradura: la puerta del baño se abre. | "Pones la mano en la puerta. Y detrás de ti, oyes un clic. Viene de adentro de tu habitación." | ♥ 160 |
| 77–85 s | **EL RECEPCIONISTA** | El recepcionista sale del baño con un manojo de llaves maestras. Sonríe. Mueve el reloj de la pared con un dedo: lo había adelantado. | "Es el recepcionista. Tiene llave de todas las habitaciones. Y fue él quien adelantó tu reloj. Necesitaba que pensaras que ya era hora." | ♥ 167 |
| 85–94 s | SOLUCIÓN · **LAS PISTAS** | Repaso rápido: pelo seco de Marina (rojo), nombre que dijo Ernesto + cajón cerrado (rojo), reflejo del reloj 3:58 (rojo). Tomás con un check verde. | "Marina tenía el pelo seco. Ernesto sabía tu nombre: solo el recepcionista lo conocía. Y el reflejo del reloj marcaba otra hora. Tomás era el único que decía la verdad." | ♥ 140 |
| 94–100 s | — | Tomás, desde fuera, empuja la puerta. Corte a negro. | "La respuesta correcta… era no abrirle a nadie." | — |

**Texto final en pantalla:** "¿En qué segundo viste la pista del reloj? Escríbelo."

---

# 6. 13,7 grados (historia real)

**Tipo:** caso real · **Duración:** ~95 s · **Medidor extra:** termómetro corporal. El monitor de pulso se queda en línea plana durante buena parte del video.

**Hechos:** Anna Bågenholm, médica sueca, en mayo de 1999, esquiando cerca de Narvik (Noruega). Cayó de cabeza en un arroyo bajo el hielo. Encontró una bolsa de aire y respiró unos 40 minutos; luego perdió el conocimiento y su corazón se detuvo. La sacaron tras unos 80 minutos en el agua helada. Llegó al hospital de Tromsø con 13,7 °C de temperatura corporal, la más baja registrada en un adulto que sobrevivió a una hipotermia accidental. La recalentaron con una máquina de circulación extracorpórea y su corazón volvió a latir horas después. Despertó días más tarde, paralizada; tras una larga rehabilitación se recuperó casi del todo y volvió a trabajar en ese mismo hospital.
**Fuentes:** sciencealert.com/this-woman-survived-the-lowest-body-temperature-ever-recorded · edition.cnn.com/2009/HEALTH/10/12/cheating.death.bagenholm

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | 13,7 °C · **AÚN NO** | Línea plana del monitor. Termómetro en 13,7. | "Tu corazón lleva horas sin latir. Tu cuerpo está a trece coma siete grados. Y todavía no estás muerta." | — plano |
| 6–13 s | NORUEGA · 1999 · **ESQUIANDO** | Montaña nevada al atardecer, tres esquiadores bajando junto a un arroyo helado. | "Mil novecientos noventa y nueve. Noruega. Anna es médica. Esquía con dos compañeros junto a un arroyo helado." | ♥ 110 amarillo |
| 13–19 s | +0 s · **EL HIELO** | Anna cae de cabeza, rompe el hielo. Solo se ven sus esquís. | "Pierde el control. Cae de cabeza. El hielo se rompe. Y el agua la arrastra debajo." | ♥ 160 rojo |
| 19–27 s | +1 min · **UNA BOLSA DE AIRE** | Corte bajo el hielo: Anna boca arriba, una burbuja de aire entre el agua y el hielo. Sus amigos arriba la sujetan de las botas. | "Bajo el hielo encuentra una bolsa de aire. Respira. Sus amigos la sujetan de los pies, pero la corriente es más fuerte." | ♥ 170 |
| 27–34 s | +40 min · **SILENCIO** | La burbuja se apaga. Termómetro bajando. | "Aguanta cuarenta minutos consciente. Después… deja de moverse." | ♥ 60 → 0 azul |
| 34–41 s | +40 min · **PARO** | Monitor plano. Radiografía azul: el corazón quieto, el cerebro con un brillo azul tenue. | "Su corazón se detiene. Pero el agua helada hace algo extraño: enfría su cerebro tan rápido que lo pone en pausa." | — plano |
| 41–48 s | +80 min · **LA SACAN** | Rescatistas rompen el hielo con una pala. Sacan a Anna, piel gris. | "Ochenta minutos después, un equipo de rescate rompe el hielo y la saca. No respira. No tiene pulso." | — plano |
| 48–55 s | REGLA · **CALIENTE Y MUERTO** | Tarjeta de regla médica en amarillo. | "En medicina de urgencias hay una regla: nadie está muerto… hasta que está caliente y muerto." | — plano |
| 55–62 s | HELICÓPTERO · **13,7 °C** | Helicóptero de noche. Termómetro: 13,7 parpadeando. | "Llega al hospital con trece coma siete grados. Ningún adulto había sobrevivido a algo así." | — plano |
| 62–70 s | HOSPITAL · **LA MÁQUINA** | Quirófano: una máquina saca su sangre, la calienta y la devuelve. Termómetro sube 14, 16, 20… | "La conectan a una máquina que saca su sangre, la calienta y se la devuelve. Grado a grado." | — plano |
| 70–77 s | HORAS DESPUÉS · **UN LATIDO** | El monitor plano hace un primer pico. Silencio. Otro pico. | "Y horas después… el monitor hace un pico. Y otro." | ♥ 30 → 60 verde |
| 77–85 s | +DÍAS · **DESPIERTA** | Cama de hospital, Anna abre los ojos. No puede moverse. | "Días después despierta. Paralizada del cuello hacia abajo. Pero viva." | ♥ 72 verde |
| 85–95 s | AÑOS DESPUÉS · **LA MISMA PUERTA** | Anna con bata de médica entrando al mismo hospital. Letrero: "Tromsø". | "Tras meses de rehabilitación volvió a caminar. Y volvió a trabajar como médica… en el mismo hospital que la salvó." | ♥ 80 verde |

**Texto final en pantalla:** "Nadie está muerto hasta que está caliente y muerto."

---

# 7. Triaje al revés (los muertos primero)

**Tipo:** escenario con datos médicos reales · **Duración:** ~95 s

**Datos reales (verificados en fuentes de medicina de urgencias):** un rayo puede detener el corazón y paralizar la respiración. El corazón suele volver a latir solo, pero la respiración tarda más, y la persona puede morir por falta de aire si nadie la ayuda. Por eso, con varias víctimas de un rayo, se atiende primero a quien parece muerto: quien grita, respira. La víctima de un rayo no queda "cargada" y se puede tocar sin peligro. La keraunoparálisis (piernas azules, frías y sin pulso) suele ser pasajera, y las pupilas dilatadas no significan muerte. Las figuras de Lichtenberg (ramas rojas en la piel) desaparecen en horas o días.
**Aviso obligatorio en pantalla al final:** "Ante una emergencia, llama al número de emergencias. Este video no sustituye un curso de primeros auxilios."

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–5 s | +0 s · **LA REGLA** | Rayo blanco que parte la pantalla. | "Te cae un rayo cerca. Y la regla es: los muertos primero." | ♥ 120 amarillo |
| 5–12 s | −2 min · CAMPO · **TORMENTA** | Tú y dos amigos, Leo y Caro, en un campo abierto, nubes negras. | "Estás en el campo con Leo y Caro. Se acerca una tormenta. Creen que les da tiempo de llegar al auto." | ♥ 95 |
| 12–19 s | −30 s · **EL PELO** | Primer plano: el pelo de los tres se levanta. Zumbido. | "Entonces se te eriza el pelo. Oyes un zumbido. Es la peor señal posible." | ♥ 130 rojo |
| 19–26 s | +0 s · **IMPACTO** | Destello blanco total, 0,3 s. Silencio. Los tres en el suelo. | "El rayo cae entre ustedes." | ♥ 160 |
| 26–33 s | +10 s · **LOS DOS** | Te levantas. Leo grita y se agarra la pierna. Caro no se mueve, ojos abiertos, pupilas enormes. | "Te levantas. Leo grita de dolor. Caro no se mueve. Tiene las pupilas enormes." | ♥ 150 |
| 33–40 s | REGLA 1 · **AL QUE NO SE MUEVE** | Tarjeta. Flecha que salta de Leo a Caro. | "Tu instinto dice: ayuda al que grita. Pero regla uno: con un rayo, primero al que parece muerto. El que grita… está respirando." | ♥ 145 |
| 40–47 s | REGLA 2 · **NO QUEMA** | Tarjeta. Tu mano dudando sobre Caro. | "Regla dos: puedes tocarla. El cuerpo no se queda cargado de electricidad. Eso es un mito." | ♥ 140 |
| 47–55 s | CARO · **RADIOGRAFÍA** | Radiografía azul de Caro: el corazón hace un latido débil; los pulmones quietos. | "Su corazón vuelve a latir solo. Pero el rayo apagó la parte del cerebro que manda respirar. Y eso tarda más en volver." | ♥ 138 |
| 55–63 s | +1 min · **RESPIRA POR ELLA** | Tú dándole respiración boca a boca. Contador de respiraciones. Leo llama a emergencias. | "Así que respiras por ella. Una vez cada pocos segundos. Leo llama a emergencias." | ♥ 135 |
| 63–70 s | REGLA 3 · **LAS PIERNAS** | Tarjeta. Las piernas de Caro en azul. | "Sus piernas están azules, frías, sin pulso. Regla tres: no es lo que parece. Es una parálisis pasajera del rayo." | ♥ 130 |
| 70–78 s | +4 min · **AIRE** | El pecho de Caro sube solo. Tu cara de alivio. | "Cuatro minutos después, Caro respira sola." | ♥ 110 verde |
| 78–87 s | DESPUÉS · **EL TATUAJE** | El brazo de Caro con ramas rojas como un helecho, que se van borrando. | "En su brazo aparece un dibujo rojo, como ramas de un árbol: el camino del rayo por su piel. Se borra en unas horas." | ♥ 96 verde |
| 87–95 s | **EL QUE GRITABA** | Leo sentado, adolorido pero bien. Texto: "Ante una emergencia, llama al número de emergencias." | "Leo solo tenía una quemadura. Si hubieras corrido hacia él… Caro no estaría aquí." | ♥ 90 verde |

**Texto final en pantalla:** "¿A quién habrías ayudado primero?" + aviso de emergencias.

---

# 8. El hombre que cayó dentro de una tormenta (historia real)

**Tipo:** caso real · **Duración:** ~95 s · **Medidor extra:** altímetro (en metros) que a veces SUBE.

**Hechos:** 26 de julio de 1959, teniente coronel William Rankin, Marines de EE. UU., en un caza F-8 Crusader sobre Carolina del Norte. El motor falló a unos 14.000 m (47.000 pies) encima de una tormenta. Se eyectó sin traje de presión, con temperaturas de unos −50 °C. La descompresión le hizo sangrar por la nariz, los ojos y los oídos, y sufrió congelación. El paracaídas, programado para abrirse a unos 3.000 m, se abrió antes de lo previsto por la presión de la tormenta. Las corrientes lo subieron y bajaron entre granizo y rayos. Una caída que debía durar unos 10 minutos duró unos 40. Aterrizó en un bosque y sobrevivió. Contó que había tanta agua en el aire que tuvo que contener la respiración para no ahogarse. Escribió el libro "The Man Who Rode the Thunder".
**Fuentes:** taskandpurpose.com/history/incredible-story-marine-rode-lightning · amusingplanet.com/2023/10/william-rankin-man-who-fell-through.html
**Nota de moderación:** el sangrado se muestra con unas pocas gotas estilizadas, sin primeros planos.

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | 14.000 M · **10 MINUTOS** | Silueta pequeña cayendo en un cielo negro. Altímetro. | "Saltas de un avión a catorce kilómetros de altura. Deberías tocar tierra en diez minutos. Vas a tardar cuarenta." | ♥ 110 amarillo |
| 6–13 s | 1959 · CABINA · **EL MOTOR** | Cabina de un caza. Luz roja de alarma, aguja de motor cayendo a cero. Abajo, una tormenta gigante como una coliflor gris. | "Mil novecientos cincuenta y nueve. El piloto William Rankin vuela sobre una tormenta. Y su motor se apaga." | ♥ 140 rojo |
| 13–19 s | +0 s · **EYECCIÓN** | El asiento sale disparado. Rankin sin traje de presión, solo casco y uniforme. | "No tiene traje de presión. Pero no tiene opción. Tira de la palanca." | ♥ 150 |
| 19–27 s | −50 °C · **EL FRÍO** | Escarcha que cubre la imagen. Radiografía azul: manos que se congelan. Gotas rojas estilizadas en la nariz. | "Afuera hay cincuenta grados bajo cero. Sus manos se congelan al instante. La presión es tan baja que sangra por la nariz y los oídos." | ♥ 155 azul |
| 27–34 s | 10.000 M · **CAÍDA LIBRE** | Cae con el estómago dolorido, abrazándose. | "Cae en picada. Su plan: aguantar hasta tres mil metros, donde se abrirá el paracaídas." | ♥ 140 |
| 34–41 s | 3.000 M · **ADENTRO** | Entra en la nube: gris oscuro, granizo como balas. | "Pero cae justo dentro de la tormenta." | ♥ 150 rojo |
| 41–48 s | +5 min · **SE ABRE** | El paracaídas se abre de golpe, antes de tiempo. | "Su paracaídas se abre antes de lo previsto. Parece una buena noticia." | ♥ 130 |
| 48–56 s | 3.000 → 4.500 M · **SUBE** | Altímetro que SUBE. Rankin sube como en un ascensor dentro de la nube. | "No lo es. El viento de la tormenta lo empuja hacia arriba. Como un ascensor. Sube cientos de metros." | ♥ 155 rojo |
| 56–63 s | **ARRIBA Y ABAJO** | Animación en bucle: sube, baja, sube. Granizo golpeando. | "Luego cae. Luego sube otra vez. Una y otra vez. Granizo. Viento. Oscuridad total." | ♥ 160 |
| 63–70 s | +20 min · **RAYOS** | Rayos azules enormes a su lado, cada uno con un trueno que hace temblar la pantalla. | "Los rayos pasan a su lado. Los describió como láminas azules del grosor de una tabla. Los truenos le golpean el pecho." | ♥ 165 |
| 70–78 s | +30 min · **AHOGARSE EN EL AIRE** | Lluvia tan densa que la imagen se vuelve casi agua. Él conteniendo la respiración, mejillas infladas. | "Y lo más absurdo: hay tanta agua en la nube que tiene que contener la respiración… para no ahogarse en el aire." | ♥ 150 |
| 78–86 s | +40 min · **ÁRBOL** | La nube lo suelta. Cae en un bosque, el paracaídas se engancha en un árbol. | "Cuarenta minutos después de saltar, la tormenta lo suelta. Cae en un bosque. Su paracaídas se engancha en un árbol." | ♥ 120 amarillo |
| 86–95 s | **SOBREVIVIÓ** | Rankin caminando hacia una carretera, congelado, magullado. Portada de su libro. | "Con congelación y golpes por todo el cuerpo… sobrevivió. Y escribió un libro: 'El hombre que montó el trueno'." | ♥ 90 verde |

**Texto final en pantalla:** "40 minutos dentro de una tormenta. ¿Tú habrías aguantado?"

---

# 9. Ocho ceros (historia real)

**Tipo:** caso real · **Duración:** ~95 s · **Medidor extra:** contador del turno "HORA 00:00 → 23:59".

**Hechos:** los oficiales de lanzamiento de misiles Minuteman de EE. UU. trabajan en parejas en cápsulas subterráneas. Rigen la "regla de las dos personas". Las dos llaves de lanzamiento están lo bastante separadas (unos 3,6 m) para que una sola persona no pueda girarlas a la vez. Hace falta además el "voto" de otra cápsula. Desde los años 60 se instalaron cerraduras electrónicas con un código de 8 dígitos (PAL). Según Bruce Blair, exoficial de lanzamiento, el Mando Aéreo Estratégico dejó ese código en 00000000 hasta 1977, y la lista de comprobación incluía verificar que siguiera en ceros. **La Fuerza Aérea lo ha negado**: hay que contarlo como "según un exoficial".
**Fuentes:** Bruce Blair, Princeton: sgs.princeton.edu/pdf/00000000.pdf · NPS: nps.gov/articles/ewo-countdown.htm · Wikipedia "Two-man rule".

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | −18 M · **TU TURNO** | Ascensor que baja en un pozo de hormigón. Tú con uniforme y una llave colgada del cuello. | "Estás dieciocho metros bajo tierra. Llevas una llave colgada del cuello. Y tu turno dura veinticuatro horas." | ♥ 88 amarillo |
| 6–13 s | AÑOS 70 · **LA CÁPSULA** | Puerta blindada redonda que se cierra. Cápsula con paneles, luces y dos sillas. | "Años setenta. Eres oficial de lanzamiento de misiles nucleares. Detrás de ti se cierra una puerta blindada de ocho toneladas." | ♥ 95 |
| 13–20 s | HORA 00:00 · **TU COMPAÑERO** | Tu compañero sentado, café en mano. Sonríe poco. | "Tu compañero se llama Miller. Lo conociste hace una hora. Vas a vivir con él un día entero en una lata bajo tierra." | ♥ 92 |
| 20–27 s | REGLA 1 · **NUNCA SOLO** | Tarjeta. Dos siluetas siempre juntas. | "Regla uno: nunca estás solo. Hay cosas que nadie puede tocar sin el otro delante." | ♥ 94 |
| 27–35 s | REGLA 2 · **3,6 METROS** | Tarjeta. Plano cenital: dos ranuras de llave separadas por una flecha "3,6 m". | "Regla dos: las dos cerraduras están a tres metros y medio. Una sola persona no llega a girar las dos llaves." | ♥ 96 |
| 35–42 s | REGLA 3 · **OTRA CÁPSULA** | Tarjeta. Mapa: otra cápsula a kilómetros, unida por una línea. | "Regla tres: aunque giren las dos llaves a la vez, otra cápsula, en otro lugar, tiene que votar lo mismo." | ♥ 98 |
| 42–50 s | REGLA 4 · **EL CÓDIGO** | Tarjeta en rojo. Panel con 8 ruedas de dígitos. | "Y regla cuatro: antes de girar, hay que meter un código secreto de ocho dígitos. La última barrera entre un error y el fin del mundo." | ♥ 110 rojo |
| 50–57 s | HORA 03:00 · **LA ALARMA** | Luz roja. Teletipo que imprime. Los dos se ponen de pie. | "A las tres de la madrugada suena una alarma de prueba. Sacan los sobres. Las manos les tiemblan aunque sea un simulacro." | ♥ 140 rojo |
| 57–64 s | **LA LISTA** | Primer plano de la lista de verificación, línea por línea, con un dedo que baja. | "Siguen la lista de comprobación. Punto por punto. Hasta que el dedo de Miller se detiene en una línea." | ♥ 135 |
| 64–72 s | **EL CÓDIGO ES…** | Las 8 ruedas del panel giran lentamente… y quedan en 0 0 0 0 0 0 0 0. | "La línea dice: comprobar que el código esté en ocho ceros." | ♥ 150 |
| 72–80 s | **OCHO CEROS** | Pantalla llena de ceros grandes. Silencio. | "Según un exoficial de lanzamiento, Bruce Blair, durante años el código secreto de los misiles nucleares fue… ceros. Ocho ceros." | ♥ 160 |
| 80–88 s | 1977 · **CAMBIO** | Calendario que pasa a 1977. Las ruedas giran a números al azar. | "Según él, no se cambió hasta mil novecientos setenta y siete." | ♥ 120 |
| 88–95 s | **LO NIEGAN** | Sello rojo "LA FUERZA AÉREA LO NIEGA". Tú mirando a Miller. | "La Fuerza Aérea lo niega. Pero los dos oficiales de aquella cápsula sabían muy bien lo que decía esa lista." | ♥ 100 amarillo |

**Texto final en pantalla:** "¿Le crees al exoficial o a la Fuerza Aérea?"

---

# 10. Cartas de último recurso (historia real)

**Tipo:** caso real · **Duración:** ~95 s · **Medidor extra:** "SUMERGIDO · DÍA 47".

**Hechos:** el Reino Unido tiene cuatro submarinos nucleares clase Vanguard; siempre hay al menos uno patrullando, escondido. Cada nuevo primer ministro escribe a mano cuatro cartas idénticas, una por submarino, con órdenes para el caso de que el gobierno haya sido destruido. Se guardan en una caja fuerte dentro de otra caja fuerte. Nadie más conoce su contenido, y cuando el primer ministro deja el cargo se destruyen sin abrir. Antes de abrirlas, el comandante debe hacer comprobaciones. **Se cree** (no está confirmado oficialmente) que una de ellas es ver si sigue al aire el programa Today de BBC Radio 4. Se dice que las opciones de la carta son: responder, no responder, unirse a un aliado o que decida el comandante.
**Fuentes:** Wikipedia "Letters of last resort" · The Conversation · The Scotsman.

| Tiempo | Barra superior | Visual | Narración | Pulso |
|---|---|---|---|---|
| 0–6 s | DÍA 47 · **LA RADIO** | Interior de submarino, luz roja. Una radio antigua en una mesa. | "Si un día la radio deja de sonar por la mañana… tienes que abrir la carta." | ♥ 90 amarillo |
| 6–13 s | SUMERGIDO · **NADIE LO SABE** | Mapa del océano Atlántico sin ningún punto. Submarino invisible bajo el agua. | "Eres comandante de un submarino nuclear británico. Nadie en el mundo sabe dónde estás. Ni tu propio gobierno." | ♥ 92 |
| 13–20 s | CAJA FUERTE · **DOS CAJAS** | Caja fuerte que se abre: dentro, otra caja fuerte. Dentro, un sobre. | "En tu camarote hay una caja fuerte. Dentro, otra caja fuerte. Y dentro… una carta." | ♥ 100 |
| 20–28 s | REGLA 1 · **A MANO** | Tarjeta. Mano que escribe con pluma. Cuatro sobres iguales. | "Regla uno: cada primer ministro nuevo la escribe a mano en sus primeros días. Cuatro copias. Una por submarino." | ♥ 98 |
| 28–35 s | REGLA 2 · **NADIE LA LEE** | Tarjeta. Sobres que entran en una trituradora sin abrir. | "Regla dos: nadie la lee. Cuando el primer ministro deja el cargo, las cartas se destruyen sin abrir." | ♥ 100 |
| 35–43 s | REGLA 3 · **SOLO SI…** | Tarjeta en rojo. Siluetas de Londres que desaparecen. | "Regla tres: solo se abre si el gobierno ya no existe. Si no queda nadie que pueda dar una orden." | ♥ 115 rojo |
| 43–51 s | **LAS OPCIONES** | Cuatro casillas: "RESPONDER", "NO RESPONDER", "UNIRSE A UN ALIADO", "DECIDE EL COMANDANTE". | "Se dice que la carta solo puede decir una de estas cosas. Y nadie, nunca, ha sabido cuál eligió cada primer ministro." | ♥ 118 |
| 51–58 s | REGLA 4 · **LA PRUEBA** | Tarjeta. Una radio con ondas. Etiqueta "BBC RADIO 4 · TODAY". | "Antes de abrirla, el comandante hace comprobaciones secretas. Y se cree que una es muy simple: escuchar si sigue al aire un programa de radio de la mañana." | ♥ 120 |
| 58–65 s | DÍA 47 · 06:00 · **ENCIENDES** | Tú en la radio, auriculares, mano en el dial. | "Seis de la mañana. Como cada día, sintonizas la radio." | ♥ 115 |
| 65–72 s | **SILENCIO** | La onda de la radio se vuelve una línea plana. Solo estática. | "Y solo hay estática." | ♥ 150 rojo |
| 72–80 s | **LA CAJA** | Tu mano en la combinación de la caja fuerte. Primera caja abierta. | "Cambias de frecuencia. Nada. Te levantas. Caminas hacia la caja fuerte." | ♥ 160 |
| 80–88 s | **EL SOBRE** | El sobre en tus manos, el sello del gobierno. Tus dedos en la solapa. | "Tienes el sobre en la mano. Ciento cincuenta personas dependen de lo que diga una letra escrita a mano." | ♥ 167 |
| 88–96 s | **LA VOZ** | La radio crepita y vuelve una voz. Tu cara: alivio total. El sobre vuelve a la caja. | "Entonces, la radio vuelve. Una voz dice: 'Disculpen, problemas técnicos'. Y el sobre vuelve a su caja… sin abrir." | ♥ 95 verde |

**Texto final en pantalla:** "¿Qué crees que dice la carta?"

---

## Notas de verificación antes de publicar

- **Video 7:** los datos médicos están comprobados, pero no debe sonar a guía médica. Mantén el aviso de emergencias en pantalla.
- **Video 9:** lo del código 00000000 lo afirma un exoficial (Bruce Blair) y la Fuerza Aérea lo niega. Cuéntalo siempre como "según un exoficial".
- **Video 10:** lo del programa de radio no está confirmado oficialmente. Cuéntalo siempre como "se cree". Las cuatro opciones de la carta también son lo que "se dice".
- **Video 6:** no se usan horas exactas porque las fuentes no coinciden. Los datos principales (80 minutos, 13,7 °C, volvió a trabajar en el mismo hospital) sí coinciden.
