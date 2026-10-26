# STUDI-1 · Energía cinematográfica · v25

Actualización del 26/10/2026, preparada para revisión local. No publicada.

La identidad utiliza carbón, verde profundo, lima #C8EF35 y blanco. Se han sustituido los azules de interfaz, incluidos enlaces, títulos, paneles y controles. Los colores impresos de los productos se conservan.

## Composición

- Atmósfera abstracta de luz verde y superficies oscuras, con líneas de energía y monogramas S1 decorativos. El contenido se mantiene sobre superficies de contraste suficiente.
- Entrada con un barrido suave de luz; halos y líneas de movimiento lento. No hay sonido añadido.
- Bloque de vídeos de Inicio, accesos y secciones interiores coordinados con el fondo de energía.
- Raúl Beas conserva su fotografía real. Nombre tipográfico en el marco y a gran escala en el fondo; no se ha integrado un recorte generativo del retrato.
- Footer compartido con imagen de campaña, llamada a la inscripción, acceso a Contacto, franja lima y enlaces originales. La modelo de campaña es ilustrativa; no se presenta como integrante del equipo.
- Etiquetas, botones y tarjetas iluminan el borde en verde al pasar el ratón. Los controles de teclado tienen foco visible.

## Recursos

| Recurso | Uso |
| --- | --- |
| `assets/img/cinema/energy-atmosphere-{800,1600}.webp` | Fondo decorativo y paneles |
| `assets/img/cinema/footer-training-{640,1280,1600}.webp` | Campaña del footer |
| `assets/img/deluxe/tienda-green-{640,1280,1600}.webp` | Cabecera de Tienda con iluminación verde |
| `assets/css/luxury-green.css` | Paleta, superficies e interacción |
| `assets/css/cinematic.css` | Atmósfera, carteles y footer responsive |
| `assets/js/cinematic.js` | Movimiento y pausa |

Las imágenes se generaron o editaron con ImageGen. Los prompts completos y rutas integradas están en `CINEMATIC-PROMPTS-V25.json`. `PALETA-VERDE-V25.json` registra las sustituciones de color. WebP incluye variantes para reducir el peso de carga según el dispositivo.

## Movimiento y funcionamiento

«Pausar luces» detiene los halos y las líneas decorativas. La preferencia se conserva en localStorage con la clave `studi1-cinema-paused`, sin datos personales. El efecto inicial se oculta al pausar. Los efectos también se pausan en pestañas ocultas; las líneas solo se animan en secciones visibles. Se respeta `prefers-reduced-motion`.

El carrusel mantiene los 5 segundos y su propio control. Los vídeos mantienen sus controles, reproducción silenciosa y bucle. No se han vuelto a procesar los vídeos en esta versión; no son 4K nativo.

Se mantienen los datos, horarios, tarifas y lógica de inscripción. El catálogo de Tienda continúa siendo una demostración pendiente de la fase de productos. El tema WordPress está sincronizado y necesita validación en un servidor WordPress/WooCommerce real antes de activar ventas.
