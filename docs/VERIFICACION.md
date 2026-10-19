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

- No se ha realizado una inspección visual en navegador porque no hay navegador de pruebas compatible disponible en este entorno.
- No hay motor PHP ni instalación WordPress/WooCommerce en esta sesión: no se ha ejecutado el tema ni probado pasarela, pedidos o correos.
- Probar todas las páginas y funciones en escritorio y móvil al extraer el ZIP.
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
