# STUDI-1 · Composición móvil y tableta · v27

Actualización del 27/10/2026, preparada sin publicar. Referencia estructural: capturas de Migros facilitadas por el usuario. Se conserva la identidad gráfica de STUDI-1.

## Cambios

- Barra compacta con logo, carrito y menú; buscador visible y enlaces directos a Gimnasio, Clases, Tarifas, Tienda y Contacto.
- En móvil, la portada deja de ocupar una pantalla completa. La fotografía se presenta horizontal, con un recorte mucho menor, y el mensaje aparece en una tarjeta debajo. Dos acciones breves y accesos fotográficos en tres columnas.
- En tableta, portada de 420 px y contenido distribuido en horizontal. No se cambia la portada de escritorio por encima de 1050 px.
- Cabeceras interiores reorganizadas, títulos más contenidos, separación uniforme y superficies oscuras para facilitar la lectura.
- Inscripción en una columna hasta 1050 px, con cabecera de altura limitada para acercar el formulario al inicio.
- Vídeos de Inicio en una fila deslizable en móvil, con indicación visible, ajuste al borde de cada tarjeta y navegación por teclado. Se conservan autoplay, silencio inicial, bucle y controles individuales.
- Menú desplegable colocado debajo de toda la barra, sin tapar buscador y accesos. La búsqueda continúa usando el índice local existente.
- Atmósfera y figuras de gimnasio más suaves en móvil. Logo de 3 s y destello de 2 s conservados.

El diseño se concentra en `assets/css/responsive-layout.css`, cargado después de las capas visuales anteriores. La barra común está en `src/partials/header.html`; las etiquetas cortas y fila de vídeos, en `src/pages/index.html`. La navegación activa y su punto de cambio están en `assets/js/app.js`.

## Paquete para GitHub

`STUDI1-GitHub.zip` contiene la versión estática, con todos sus recursos, fuentes, componentes y herramientas de edición. Excluye la carpeta WordPress y archivos ZIP anidados. Ninguno de sus archivos supera 100 MiB. El paquete completo `STUDI1-web.zip` conserva el tema y el instalador de WordPress.

Si un intento anterior de push contiene el ZIP grande, hay que deshacer primero el commit local pendiente y retirar `wordpress` del repositorio antes de volver a confirmar. Copiar el paquete nuevo no elimina automáticamente archivos antiguos ni corrige el historial local. Consulta `GITHUB-PAGES.md`.

## Verificación

Revisión en navegador de las nueve páginas a 320, 360, 393, 768 y 1024 px. Se corrigió el halo de Contacto que sobresalía lateralmente a 1024 px. Se revisó también la composición de Inicio a 820 px y el escritorio.

Se han comprobado buscador, menú, enlaces rápidos, pausa del carrusel y desplazamiento horizontal de vídeos. Datos oficiales, tarifas y lógica del formulario conservados. HTML y tema WordPress sincronizados; no se ha ejecutado el tema dentro de un servidor PHP/WooCommerce real.
