# Cabecera DELUXE · 26/10/2026

Las tres fotografías originales de la portada se han editado con la herramienta integrada `image_gen`, en modo edición con imagen de referencia y fondo opaco. El objetivo es enriquecer color, exposición y contraste; en la tercera, encender las luminarias existentes. Son fotografías del gimnasio retocadas mediante edición generativa, que puede modificar detalles finos.

## Recursos

| Referencia original | Archivo web final de mayor resolución |
| --- | --- |
| assets/img/real/inicio-musculacion-2048.webp | assets/img/deluxe/musculacion-1870.webp |
| assets/img/real/inicio-equipamiento-2048.webp | assets/img/deluxe/equipamiento-1870.webp |
| assets/img/real/inicio-sala-clases-2048.webp | assets/img/deluxe/sala-clases-1870.webp |

Cada salida generada fue de 1870 × 841 px. Se codificó con FFmpeg/libwebp, calidad 90, en anchos 640, 1280 y 1870 px. Los originales anteriores se conservan. No se aplicó otro retoque creativo durante la conversión.

## Prompts utilizados

Plantilla común, sustituyendo `{EXTRA}` por el texto correspondiente:

```text
Use case: lighting-weather. Edit target: the supplied exact real photograph of STUDI-1 gym. Asset type: premium photographic homepage banner, not a mockup. Retouch this real interior photo to a deluxe professional architectural photography finish: richer more vivid but believable colors, clean white balance, improved exposure and local contrast, crisp natural detail, controlled highlights and luminous shadows. {EXTRA} Preserve the exact camera angle, panoramic composition, crop, every machine, object, reflection, column, wall, window, ceiling and floor. No redesign, no replacement of equipment, no additional objects, no people, no added lettering, no logo, no website interface. This must remain recognizably the same actual gym, only beautifully lit and professionally retouched. Keep the original wide panoramic aspect ratio about 2.22:1, full original framing, approximately 3072 pixels wide. Do not make a square image or collage. Do not bake in a dark text overlay or vignette; the website handles that separately. Photorealism, restrained premium finish, no plastic HDR, no excessive bloom, no fantasy neon.
```

Musculación:

```text
Restore deep clean black gym equipment with clearly visible fine detail; bring out the real lime columns, turquoise mirror-edge strip lights, and warm wood floor. Keep the natural daylight and all existing structures exactly.
```

Equipamiento:

```text
Give the existing lime green columns a rich, fresh, punchy color, refine the black metal and upholstery texture, balance the existing switched-on white strip lights and window highlights, warm the wood floor subtly. Preserve the exact equipment and layout.
```

Sala de clases:

```text
Switch ON the existing overhead fluorescent strip light fixtures visible in the original photograph. Give them natural bright neutral-white illumination that realistically lights the room and reflects subtly on the wooden floor. Do not add new fixtures. Bring out the real blue, magenta and orange exercise balls, yellow suspension straps, and warm wood floor, preserve pale columns and mirrors.
```

## Integración

- Portada bajo la barra superior y el menú, ajustada a la altura disponible de la primera pantalla; altura mínima de seguridad en pantallas bajas.
- Cambio automático cada 5 segundos con fundido; sin flechas ni números visibles. Se conserva una pausa discreta y navegación por teclado sobre ese control.
- Imágenes adaptables mediante `srcset`; las tres se cargan anticipadamente para el carrusel.
- Destello del logo cada 3 segundos, duración de barrido de 1,15 segundos. La introducción inicial conserva sus 5 segundos.
- Movimiento reducido y pausas al ocultar la pestaña conservados.
- HTML y tema WordPress comparten los mismos recursos. Actualización local, sin publicación.
