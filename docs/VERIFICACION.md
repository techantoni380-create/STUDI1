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
