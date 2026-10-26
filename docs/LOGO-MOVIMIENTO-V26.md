# STUDI-1 · Logo y movimiento · v26

Actualización local del 26/10/2026. Sin publicación.

- Logo de la barra principal ampliado: 232 px en escritorio, 208 px en tableta y tamaño adaptable en móvil. El logo del footer se conserva.
- Introducción del logo: **3 segundos**. Se mantiene la secuencia de giro y apertura del PNG oficial, acelerada proporcionalmente. El modelo interno conserva una escala temporal de referencia de 5000 ms; el controlador la reproduce en 3000 ms.
- Destello del logo: **2 segundos entre inicios**, con barrido de 1150 ms. Sigue pausándose en segundo plano y con movimiento reducido.
- Imágenes de las siete cabeceras: acercamiento lento, con un recorrido menor en móvil. Textos y botones permanecen inmóviles. Las imágenes fuera de la vista y las diapositivas ocultas se pausan.
- El carrusel mantiene el intervalo de **5 segundos**. Su botón de pausa detiene también el acercamiento de la fotografía.
- Fondo con seis figuras vectoriales originales: mancuerna, disco, kettlebell, banco, bicicleta y barra con discos. Son decoración, no un inventario de servicios o máquinas disponibles.
- «Pausar efectos» controla las luces y el movimiento de cabeceras. Los vídeos, el carrusel y el brillo del logo conservan sus controles y reglas propias. Se respeta `prefers-reduced-motion`.

## Archivos

`assets/css/logo-animation.css` y `assets/js/logo-animation.js` definen los 3 segundos. `assets/js/logo-shine.js` establece los 2 segundos del destello.

`assets/css/cinematic.css` contiene los tamaños de la barra, las siluetas y el movimiento de cámara. `assets/js/cinematic.js` activa las fotografías y las pausa fuera de la vista. `assets/js/real-media.js` conecta la pausa del carrusel con el acercamiento de su imagen.

`assets/img/cinema/gym-equipment.svg` contiene las figuras. Es un SVG local sin scripts ni recursos externos.

## Verificación

Revisión de las nueve páginas a 320 y 768 px sin desbordamiento horizontal. Barra revisada además a 390, 900, 1050 y 1100 px; navegación móvil operativa y logo sin solaparse con los controles. Logo medido en 232 px en escritorio y aproximadamente 141 px en un marco de 320 px.

Duración de introducción comprobada mediante la propiedad CSS efectiva de 3 s y el controlador; intervalo del destello establecido en 2000 ms. Acercamiento y pausa de la fotografía del carrusel comprobados en navegador. Sintaxis de los cuatro scripts modificados validada con Node.

Datos del gimnasio, precios, horarios, catálogo y lógica de inscripción conservados. Tema WordPress sincronizado con nuevas versiones de caché para los recursos modificados; requiere validación en un servidor WordPress/WooCommerce real.
