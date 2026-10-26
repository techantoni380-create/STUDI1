# Actualización visual · v23 · 26/10/2026

Se retocaron las trece fotografías adicionales señaladas: los dos accesos al gimnasio y clases en Inicio, la toalla, las dos personas de Inicio, Raúl en competición, cuatro fotografías de comunidad, las tres categorías de Clases y la recepción. Se ajustaron iluminación, exposición, contraste y color, buscando conservar el contenido de las fotos originales. Los originales siguen incluidos para permitir comparaciones y futuras ediciones.

Servicios incorpora una nueva campaña de entrenamiento, con imagen panorámica, titular y enlaces reales a los cinco servicios. Contacto incorpora una campaña en negro y lima, llamada al gimnasio y acceso a la visita; más abajo aparecen la recepción retocada, dirección, horarios, teléfono y redes sin repetir fichas informativas. Las dos imágenes de campaña se generaron con modelos ilustrativos: no representan al personal ni documentan las instalaciones de STUDI-1. Los textos y botones son HTML accesible, no están incrustados en las imágenes.

## Fotografías y prompts

- Derivados integrados: `RETOQUE-V23-ASSETS.json`, con rutas relativas, tamaños y variantes WebP.
- Prompts de retoque, campañas y correcciones: `RETOQUE-V23-PROMPTS.json`.
- Recursos finales: `assets/img/deluxe/`.
- Las fotos se abren en la versión retocada de mayor resolución disponible. La elección responsive limita la descarga inicial.
- Se corrigieron las columnas de la sala de movilidad para conservar su color claro original.

## Vídeos

Se volvieron a procesar los diez vídeos desde los originales de WhatsApp: reducción suave de ruido, recuperación de sombras según cada clip, contraste y saturación moderados, y enfoque ligero. Las versiones finales se encuentran en `assets/video/deluxe/`, acompañadas de diez portadas nuevas. El contenido, el audio y la duración se conservan; la variación de duración debida al contenedor es inferior a 0,2 segundos. Todos mantienen autoplay, muted, loop y playsinline, con controles de pausa, sonido y ampliación.

Estos archivos NO son 4K nativo. Los originales tienen entre 368 y 576 píxeles de ancho y varios contienen compresión o desenfoque. El escalado moderado (máximo 2 veces, hasta 1080 de alto salvo originales de 1280) mejora la presentación sin afirmar que se ha recuperado detalle inexistente. No se ha aplicado interpolación de movimiento ni reconstrucción generativa a personas. Para un resultado 4K auténtico se necesitan las grabaciones originales de la cámara en esa resolución.

La tabla técnica completa está en `VIDEO-RETOQUE.json`. `tools/enhance_videos.py` permite reproducir el tratamiento con la carpeta original recibida. Las versiones previas de vídeo también permanecen disponibles en `assets/video/real/`.

## Integración

`assets/css/campaign.css` contiene los encuadres de Servicios y Contacto para escritorio, tableta y móvil. El generador de Servicios sigue en `tools/dossier_content.py`; el contenido de Contacto está en `src/pages/contacto.html`. Los datos oficiales y la lógica de inscripción se conservan.

HTML estático y tema WordPress sincronizados. No se ha publicado la web. El tema no se ha ejecutado en un servidor PHP/WooCommerce en esta revisión.
