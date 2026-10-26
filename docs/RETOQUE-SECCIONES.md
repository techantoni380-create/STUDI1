# Retoque de secciones · 26/10/2026

Edición mediante la herramienta integrada ImageGen. Se pidió mejorar iluminación, exposición, contraste y color de las fotografías reales, conservando arquitectura, encuadres y equipamiento. Puede haber pequeñas variaciones generativas en detalles; los originales se conservan en `assets/img/real/`.

| Ubicación | Original o referencia | Archivo final (dentro de assets/img/deluxe/) |
| --- | --- | --- |
| Gimnasio, cabecera | gimnasio-panoramica | gimnasio-hero-{640,1280,1600}.webp |
| Clases, cabecera | actividades-sala; luces encendidas, columnas claras conservadas | clases-hero-{640,1280,1600}.webp |
| Inscripción | inscripcion-sala | inscripcion-hero-{640,840}.webp |
| Tarjeta Funcional | instalaciones-funcional | instalaciones-funcional-{640,840}.webp |
| Servicios | Fotograma a 12 s de clase-en-grupo.mp4 | servicios-sesion-{640,840}.webp |
| Peso libre | instalaciones-peso-libre | instalaciones-peso-libre-{640,840}.webp |
| Sala de clases | instalaciones-sala; luminarias existentes encendidas | instalaciones-sala-{640,840}.webp |
| Máquinas | instalaciones-maquinas | instalaciones-maquinas-{640,840}.webp |
| Entrenamiento | instalaciones-entrenamiento | instalaciones-entrenamiento-{640,840}.webp |
| Rack | instalaciones-rack | instalaciones-rack-{640,840}.webp |
| Trabajo con bancos | instalaciones-fuerza | instalaciones-fuerza-{640,840}.webp |
| Más espacio para entrenar | instalaciones-bancos | instalaciones-bancos-{640,840}.webp |
| Tienda | Cinco fotos de productos recibidas el 26/10/2026 | tienda-hero-{640,1280,1600}.webp |

La cabecera de tienda es una composición publicitaria basada en envases iO.GENIX, avena Life Pro, complementos y la toalla STUDI-1. No sustituye las fotografías exactas de las fichas de producto. Las cinco fotos recibidas se conservan visualmente en `assets/img/productos/`, con variantes de 640 y 1280 px y ampliación. Los precios y fichas transaccionales de muestra quedan pendientes de la fase de catálogo.

Las versiones web se codificaron con FFmpeg/libwebp, calidad 91, sin añadir filtros creativos después de ImageGen. Se entregan 29 WebP nuevos retocados para estas secciones y diez derivados de las fotos de productos, además de la portada DELUXE anterior. Las ocho fotos de instalaciones usan los archivos mejorados en miniaturas y ampliaciones.

El conjunto de prompts finales y la corrección específica de Clases se encuentra en `RETOQUE-PROMPTS.json`. Se utilizó la herramienta integrada, no la alternativa CLI/API.

Servicios utiliza un fotograma distinto de la sesión real facilitada, retocado con la herramienta integrada ImageGen. El original está en assets/img/real/servicios-sesion-original.png y su prompt en RETOQUE-SERVICIOS-PROMPT.txt. La foto funcional queda solo en la galería de Gimnasio.
