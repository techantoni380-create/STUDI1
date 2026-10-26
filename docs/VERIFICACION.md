# Verificación de la entrega

## Comprobado automáticamente

- actividades.html: enlaces locales, anclas, IDs y componentes verificados
- checkout.html: enlaces locales, anclas, IDs y componentes verificados
- gimnasio.html: enlaces locales, anclas, IDs y componentes verificados
- index.html: enlaces locales, anclas, IDs y componentes verificados
- inscripcion.html: enlaces locales, anclas, IDs y componentes verificados
- legal.html: enlaces locales, anclas, IDs y componentes verificados
- tienda.html: enlaces locales, anclas, IDs y componentes verificados
- cardio.webp: imagen decodificada
- tienda.webp: imagen decodificada
- fuerza.webp: imagen decodificada
- logo-oficial.png: imagen decodificada
- movilidad.webp: imagen decodificada
- Vídeo: 5,000 s, 1280 × 720
- Tema ZIP: integridad, estructura instalable y ausencia de catálogo demo verificados
- Sintaxis JavaScript comprobada con Node.js, incluido el motor y los datos de la animación.
- Animación sobre canvas: S1 extraído visualmente del mismo PNG mediante máscaras; giro de 1440° en 1,45 s, pausa y apertura continua hacia el nombre completo. La secuencia dura 5 segundos.
- Motor real ejecutado con Canvas 2D fuera del navegador; fotogramas renderizados e inspeccionados para comprobar las formas intermedias. No usa partículas.
- Recursos de la animación enlazados en las siete páginas y en el tema WordPress, con orden de carga definido.
- Condición de reproducción: primera entrada o recarga; omite navegación interna, restauración con Atrás/Adelante y movimiento reducido.
- Formularios de demostración sin envíos de red ni almacenamiento de datos personales.
- Imágenes locales WebP, fuente local y logo PNG original.

## Cambios de destello e inscripciones

- Reflejo compuesto sobre la transparencia del PNG; barrido de 1,15 segundos cada 8 segundos. Fotogramas renderizados con Canvas 2D; comprobado que no ilumina píxeles fuera de la máscara.
- Temporizadores ejecutados con reloj controlado: separación entre inicios de 8 s, primer reflejo tras la introducción y cancelación al ocultar la pestaña, reducir movimiento o salir.
- Se detiene al ocultar la pestaña y respeta movimiento reducido. El giro inicial conserva su motor y sus condiciones.
- Tres cuotas generadas desde las tarifas oficiales: 39 € individual, 74 € pareja y 105 € familia de tres. Verificados importes y cantidades; se rechazan cantidades familiares vacías, fraccionarias o fuera de rango y modalidades antiguas de entrenamiento.
- Selector y resumen separados del JavaScript general, con acompañantes. Entrenamientos fuera del catálogo de inscripción; sus tarifas y consulta telefónica siguen visibles.
- Integración PHP preparada para tres productos virtuales, validación de cantidades y participantes. Incluye bloqueo de antiguos productos de entrenamiento vinculados y carritos de entrenamiento. Requiere prueba real con WordPress.
- Tarjeta visual en HTML/CSS con PNG oficial: nombre editable, diseños Visa/Mastercard de muestra y números enmascarados fijos. Interacciones verificadas con un DOM simulado: nombre inicial, escritura, edición conservada al volver, cambio de diseño y nombre de facturación. No equivale a una prueba visual en navegador.
- El componente de tarjeta no lee ni envía números de tarjeta o CVC; no usa almacenamiento. En producción mantiene los campos nativos de la pasarela.

## Datos del gimnasio

- Contacto, apertura, cuotas y tarifas contrastados con las imágenes aportadas.
- Las cifras por persona se distinguen de los importes totales.
- Horario de clases transcrito; dudas marcadas en la web y detalladas en DATOS-OFICIALES.md.
- Componentes compartidos generados desde src/data/gym.json y enlaces de llamada/mapa incorporados.

## Pendiente en el entorno real

- La revisión visual inicial quedó pendiente; se ha completado en las actualizaciones del 26/10/2026 indicadas al final.
- No hay motor PHP ni instalación WordPress/WooCommerce en esta sesión: no se ha ejecutado el tema ni probado pasarela, pedidos o correos.
- Repetir la aceptación funcional en el hosting real antes de publicar.
- Seguir la prueba de aceptación de INSTALACION-WOOCOMMERCE.md antes de habilitar ventas.

## Ajustes responsive — 19/10/2026

- Titulares móviles reducidos y con interlineado seguro; ancho medido con la fuente del proyecto a 320, 360, 390, 440 y 560 px.
- Cabecera flexible con botones táctiles de 44 px; galería distribuida dentro de su contenedor.
- Tarjetas en dos columnas para tablet y una para móvil; formulario en una columna en móvil.
- Campos a 16 px en pantallas táctiles para evitar ampliación automática al enfocar en iOS.
- Tablas de tarifas ajustadas al contenedor y datos de tarjeta reorganizados.
- Enlaces locales y recursos comprobados en las siete páginas; sintaxis JavaScript comprobada.
- Recursos sincronizados con el tema WordPress y ZIP del tema regenerado.
- La instalación del navegador de pruebas no se pudo completar: no se afirma validación visual ni de interacciones en dispositivos reales. Comprobar la nueva versión en navegador antes de publicarla.


ACTUALIZACIÓN 26/10/2026 · MEDIOS REALES
- Siete páginas reconstruidas y enlaces locales de recursos comprobados.
- 25 fotografías y 10 vídeos únicos en el contenido principal.
- Horarios, tarifas, configuración de productos y lógica de inscripción comparados con la versión anterior sin cambios.
- Carrusel: navegación manual, pausa y reanudación comprobadas en navegador.
- Galería: apertura y cierre de fotografía ampliada comprobados.
- Vídeo de ciclo indoor: reproducción comprobada en navegador. Los diez MP4 han sido transcodificados y verificados con ffmpeg.
- Revisión visual móvil de Inicio y Actividades; comprobación de ausencia de desbordamiento horizontal de Gimnasio e Inscripción a 320 px.
- Inscripción de pareja mantiene el cálculo 37 × 2 = 74 €.
- Tema WordPress regenerado con los mismos recursos. No se ha ejecutado en un servidor PHP/WooCommerce en esta revisión.
- Actualización preparada para revisión local, sin publicación.

ACTUALIZACIÓN 26/10/2026 · DOSSIER DE RAÚL
- Ocho páginas, incluida Servicios. Secciones de cinco servicios, cinco profesionales y doce clases generadas desde gym.json.
- Tarifas completas centralizadas en Inscripción; navegación y accesos cruzados actualizados.
- Cuotas mensuales y bonos contrastados con el dossier. Los cinco totales incluyen 15 € de seguro y se validan al construir.
- Seguro informado junto al resumen de inscripción, sin incorporarlo automáticamente al cobro. Bonos informativos.
- Revisión en navegador de equipo en escritorio, Servicios en móvil, catálogo de clases y navegación móvil.
- A 320 px, Servicios, Clases e Inscripción no desbordan horizontalmente. Tabla de bonos ajustada y revisada visualmente, sin desplazamiento horizontal interno.
- Se conservan 25 fotos y 10 vídeos únicos; recursos, enlaces y anclas locales comprobados en los ocho HTML.
- Clase del martes a las 18:00 pendiente de confirmar; se conservan las dudas anteriores del horario.
- Tema WordPress sincronizado, incluida la plantilla Servicios. No hay servidor PHP/WooCommerce para validar el funcionamiento del tema en producción.
- Sin publicación ni cambios en el catálogo de productos.


ACTUALIZACIÓN 26/10/2026 · BUCLES Y CORRECCIÓN DE RECURSOS
- Reconstruidos cinco WebP vacíos y el MP4 de colchoneta incompleto desde sus originales.
- 75 imágenes locales decodificadas; diez vídeos decodificados completos con ffmpeg, sin errores.
- Bloque de tres vídeos en Inicio, dos en Gimnasio y cinco en Clases. Siguen siendo 25 fotos y 10 vídeos únicos.
- Reproducción automática simultánea comprobada en navegador: los diez alcanzan readyState 4, sin errores, en silencio y con loop activo. Observado reinicio de los vídeos de Inicio al llegar al final.
- Controles de pausa/reanudación comprobados; pausar uno mantiene los demás en marcha.
- Galería de máquinas con movimiento CSS, marco verde y pausa/reanudación verificada. No se presentan las fotos animadas como nuevas grabaciones.
- Fotografías de comunidad, funcional, fuerza y cardio comprobadas en el navegador.
- Contacto con fotografía central ampliada; cifras de Servicios en verde lima.
- Revisión visual de escritorio y móvil, y ausencia de desbordamiento en Inicio y Clases a 320/390 px.
- La compilación rechaza archivos vacíos, WebP incompletos y MP4 sin su estructura de reproducción.
- Versión HTML y tema WordPress sincronizados. Sigue pendiente la prueba del tema en un servidor PHP/WooCommerce real; no se ha publicado.

ACTUALIZACIÓN 26/10/2026 · CABECERA DELUXE
- Tres imágenes retocadas y nueve variantes WebP nuevas decodificadas sin errores. Carga de las tres imágenes comprobada en navegador.
- Portada de escritorio: barra y cabecera más imagen suman la altura inicial de pantalla (936 px en la revisión). Revisión móvil en marcos de 390 y 320 px: portada completa, botones visibles y sin desbordamiento horizontal.
- Quitados los controles de flechas y numeración visible; pausa discreta y navegación por teclado comprobadas. Avance automático observado entre las tres fotos; intervalo configurado en 8000 ms.
- Destello del logo actualizado a 3000 ms entre inicios; barrido de 1150 ms. Introducción y tratamiento de movimiento reducido conservados.
- Ocho HTML revisados: enlaces, anclas, IDs, rutas y srcset locales. Sintaxis de JavaScript comprobada.
- Se mantienen 25 fotografías y 10 vídeos únicos en las páginas. Vídeos con autoplay, muted, loop y playsinline.
- Datos de horarios/tarifas, catálogo demo y lógica de inscripción/tarjeta comparados con el ZIP anterior sin cambios.
- Tema WordPress reconstruido y sincronizado. Prueba del tema en un servidor PHP/WooCommerce pendiente. Sin publicación.

AJUSTE DE VELOCIDAD · 26/10/2026
- Carrusel de Inicio reducido de 8 a 5 segundos por foto, en el atributo HTML y el valor de respaldo JavaScript. Se conserva el fundido, la pausa y el destello del logo cada 3 segundos.
- HTML y tema WordPress regenerados; intervalo sincronizado en ambas versiones y sintaxis JavaScript comprobada.


ACTUALIZACIÓN 26/10/2026 · SECCIONES DELUXE Y GALERÍA
- Nueve HTML generados. Enlaces, anclas, IDs y todos los src/srcset/poster locales comprobados sin rutas ausentes.
- 48 WebP de deluxe/ y productos/ decodificados correctamente, incluidos los 39 nuevos derivados. Una variante vacía detectada durante la revisión se regeneró y volvió a verificarse.
- Ocho fotos de instalaciones mejoradas. Las cinco del recorrido cargan en navegador; ampliación móvil de Peso libre abre su archivo DELUXE.
- Cabeceras de Gimnasio, Servicios, Clases, Tienda e Inscripción actualizadas; Clases conserva las columnas claras y muestra luces encendidas.
- Revisión visual de Servicios, Tienda, Contacto, Inscripción, Clases y galería en escritorio o móvil según el caso. Sin desbordamiento horizontal en Servicios, Contacto e Inscripción a 320 px y Tienda a 390 px.
- Contacto abre contacto.html desde el menú de escritorio y conserva teléfono, dirección y horarios.
- Selección de las tres tarjetas comprobada en navegador: Individual 39 €, Pareja 74 € con un acompañante, Familiar 105 € con dos acompañantes y tres personas iniciales. El selector y aria-pressed reflejan la elección.
- Etiquetas e importes revisados visualmente; brillo suave y alternativa sin movimiento.
- Sintaxis de enrollment.js y app.js validada con node --check.
- Datos oficiales, importes y enrollment-model comparados con la entrega anterior: preservados; solo cambia el destino de Contacto.
- Tienda incorpora cinco fotos recibidas y una composición de campaña; las fichas/precios de venta de la demo siguen pendientes de la fase de catálogo.
- Tema WordPress sincronizado con página Contacto y todos los recursos. No ejecutado en PHP/WooCommerce real en esta revisión.
- Sin publicación.


ACTUALIZACIÓN v23 · RETOQUE COMPLETO Y CAMPAÑAS
- Trece fotos adicionales retocadas y dos campañas nuevas, con 34 variantes WebP y diez nuevas portadas de vídeo. Las 44 imágenes se decodifican sin errores. Tres variantes vacías detectadas durante la integración se regeneraron antes de empaquetar.
- Diez vídeos procesados desde los originales y comprobados en FFmpeg. Resolución, duración, tamaño y ajustes registrados en VIDEO-RETOQUE.json. La duración difiere menos de 0,2 s del original. No se presenta el material como 4K nativo.
- Los diez reproductores se comprobaron en navegador: readyState 4, muted y loop activos, paused false y avance de currentTime. Inicio 3, Gimnasio 2 y Clases 5.
- Servicios y Contacto revisados visualmente en escritorio; Servicios a 390 px y ambos sin desbordamiento a 320 px; Contacto revisado además a 768 px. Tipografía móvil ajustada para que la imagen gane presencia.
- Recepción y fichas de dirección, apertura, teléfono y redes verificadas visualmente. Contacto sigue abriendo una página independiente.
- Las tres pestañas de Clases cargan su fotografía DELUXE. La galería de comunidad abre la versión retocada de mayor tamaño. Los tres accesos de Inicio utilizan las nuevas fotos.
- Enlaces, recursos locales, srcset y IDs revisados sin errores.
- Datos del gimnasio, modelo de cuotas, formulario y comportamiento de vídeo comparados con v22 y conservados.
- Los registros ajenos al sitio de la extensión del navegador no se consideran errores de la web.
- Nueve HTML y tema WordPress regenerados. No se ejecutó el tema en PHP/WooCommerce real.
- Sin publicación.


ACTUALIZACIÓN v24 · CABECERAS UNIFICADAS
- Las siete cabeceras con imagen comparten tipografía inclinada, blanco y lima, etiquetas y botones coordinados.
- Revisión responsive a 320 y 768 px: ninguna de las siete páginas presenta desbordamiento horizontal.
- Pestañas de Clases comprobadas tras el cambio visual.
- Contenido, datos y scripts funcionales comparados con v23 y conservados.
- Detalle en CABECERAS-UNIFICADAS.md. HTML y tema WordPress sincronizados, sin publicación.


ACTUALIZACIÓN v25 · ENERGÍA CINEMATOGRÁFICA
- Paleta verde/carbón aplicada a la interfaz. Inspección de textos en las siete páginas principales sin azules residuales. Se conservan los colores de impresión de los envases.
- Revisión visual de Inicio, bloque de vídeos, cartel de Raúl, Tienda y footer. Footer comprobado en escritorio y móvil a 320 px.
- Siete páginas principales revisadas a 320 y 768 px, sin desbordamiento horizontal. Las imágenes con src no presentan errores de carga en la revisión.
- Pausa de luces comprobada: animationPlayState pasa a paused, aria-pressed se actualiza y la preferencia permanece al cambiar de página. Reanudación comprobada. El movimiento reducido está cubierto por CSS y JavaScript.
- Asistente y foco de teclado comprobados. Los estados de selección conservan contraste oscuro sobre lima.
- Nueve HTML revisados: enlaces, anclas, IDs, src/srcset/poster y recursos CSS sin rutas ausentes. Ocho variantes WebP nuevas decodificadas con FFmpeg. Sintaxis de cinematic.js validada con Node.
- Datos del gimnasio, catálogo demo, lógica de inscripción, app.js, reproductores, fotografía original de Raúl y todos los MP4 comparados con v24: preservados.
- Nuevas imágenes y prompts documentados en CINEMATIC-V25.md y CINEMATIC-PROMPTS-V25.json. No se afirma resolución 4K para los vídeos.
- HTML y tema WordPress regenerados. Versiones de caché de CSS del tema actualizadas. No se ha ejecutado en un servidor PHP/WooCommerce real.
- Los errores observados en los registros corresponden a la extensión del navegador, no al código de la web.
- Sin publicación.


ACTUALIZACIÓN v26 · LOGO, CABECERAS Y FIGURAS DE GIMNASIO
- Logo ampliado en la barra compartida de los nueve HTML: 232 px en escritorio, 208 px en tableta y aproximadamente 141 px en el marco de 320 px revisado. Footer sin cambio de tamaño.
- Introducción configurada a 3 s, comprobada en la propiedad CSS efectiva y el controlador; respaldo de 3000 ms. Modelo de giro y máscaras conservados. Destello configurado con 2000 ms entre inicios.
- Acercamiento de las siete cabeceras aplicado; transformaciones distintas observadas durante la reproducción. Pausa del carrusel detiene su fotografía; pausa general detiene las cabeceras.
- Figuras de material deportivo integradas mediante SVG local y comprobadas visualmente. SVG válido, sin scripts ni peticiones externas.
- Nueve páginas a 320 y 768 px sin desbordamiento. Barra revisada también a 390, 900, 1050 y 1100 px, sin solapamiento entre logo y controles ni desbordamiento de página. Menú móvil operativo.
- Enlaces, anclas, IDs, src/srcset/poster y recursos CSS comprobados. Sintaxis de los cuatro scripts modificados validada con Node.
- Datos oficiales, catálogo, inscripción, app.js, modelo geométrico y máscaras del logo comparados con v25 y preservados.
- HTML y tema WordPress sincronizados; caché de recursos modificados actualizada. No probado en PHP/WooCommerce real; sin publicación.
- Detalles de edición y límites en LOGO-MOVIMIENTO-V26.md.


ACTUALIZACIÓN v27 · MÓVIL Y TABLETA
- Las nueve páginas se revisaron a 320, 360, 393, 768 y 1024 px. Corregido un desbordamiento de 5 px del halo de Contacto a 1024 px y verificado después del ajuste.
- Inicio revisado visualmente a 390/393 y 820 px; Gimnasio y Contacto a 393 px. Escritorio revisado a 1363 px, sin barra compacta ni cambios en la composición principal.
- Cabeceras móviles con fotografía horizontal y tarjeta de texto; accesos principales en tres columnas, buscador visible y menú bajo toda la barra. Formulario de inscripción en una columna hasta 1050 px.
- Buscador con resultados para «clases», menú desplegable y navegación a Inicio comprobados. Pausa del carrusel verificada con aria-pressed y animation-play-state; reanudación operativa.
- Fila de vídeos móvil con desplazamiento por teclado comprobado: scrollLeft pasó a 232 px. Los tres reproductores conservan controles etiquetados y bucle.
- Enlaces, anclas, IDs, src/srcset/poster y recursos CSS de los nueve HTML comprobados sin rutas ausentes. Sintaxis de app.js validada con Node.
- Comparación con v26: datos y lógica conservados; app.js cambia únicamente la navegación activa y el umbral del menú. Los 197 recursos gráficos/vídeos comparados permanecen iguales.
- Los errores observados en consola proceden de la extensión del navegador, no del sitio.
- Se incluye un paquete estático para GitHub sin WordPress ni ZIP anidados y con todos los archivos por debajo de 100 MiB. La guía explica cómo retirar el commit pendiente rechazado; no se ha alterado ningún repositorio remoto.
- HTML y tema WordPress sincronizados. No ejecutado en PHP/WooCommerce real. Sin publicación.
