# Datos facilitados por el gimnasio · 26/10/2026

Última fuente: once capturas del dossier de Raúl recibidas el 26/10/2026,
de `image(20261026-094509).png` a `image(20261026-094701).png`.
Los horarios de clases conservan como fuente el cartel `20261016_103621.jpg`.

## Distribución de contenidos

- Inicio: presentación, accesos al contenido, contacto y horario de apertura.
- Gimnasio: instalaciones, equipo de cinco profesionales y trayectoria de Raúl.
- Servicios: sala fitness, entrenamiento personal, clases, alimentación y sauna.
- Clases: catálogo de doce actividades, horario semanal y vídeos.
- Inscripción: formulario y guía completa de tarifas, bonos y suplementos.

Los demás apartados enlazan a estos bloques. Se mantienen las 25 fotografías
y 10 vídeos únicos ya incorporados. No se asignan retratos sin identificación
a los miembros del equipo. La tienda queda pendiente de la fase de productos.

## Contacto y apertura

- Carrer de Sant Pau i Sant Blai, 1, 43202 Reus, Tarragona.
- Teléfono: 675 72 83 43 (+34 675 72 83 43).
- Lunes a viernes: 06:00–22:00; sábado: 09:00–13:00; domingo: 10:00–14:00.
- Los horarios de festivos pueden variar y se comunican en redes y en el centro.
- Instagram del gimnasio: @gimstudi1. Raúl: @raul_beas_studi1.
- Email y uso de WhatsApp pendientes de confirmar.

## Cuotas y bonos

El nuevo dossier confirma que las cuotas son **mensuales**.

| Modalidad | Precio mensual |
|---|---:|
| Individual | 39 € |
| Pareja | 37 € por persona |
| Familiar | 35 € por persona |

Seguro anual: **15 €**, aparte de la cuota.

| Bono | Precio por mes | Total con seguro |
|---|---:|---:|
| 1 mes | 39 € | 54 € |
| 3 meses | 35 € | 120 € |
| 6 meses | 32 € | 207 € |
| 9 meses | 30 € | 285 € |
| 12 meses | 28 € | 351 € |

Los bonos de 3, 6, 9 y 12 meses son consecutivos. No se han añadido otras
condiciones. Los cinco totales se validan al construir: meses × precio + 15 €.

La inscripción conserva sus tres modalidades y calcula solo la cuota mensual.
Informa del seguro al lado del importe, pero no lo carga automáticamente: falta
concretar su aplicación por participante, altas y renovaciones. Los bonos son
informativos; no se crean productos ni cobros nuevos. WooCommerce requiere
configuración y pruebas reales antes de habilitar ventas.

## Entrenamientos y servicios adicionales

| Modalidad | Socios: total | Por persona | No socios: total | Por persona |
|---|---:|---:|---:|---:|
| Individual | 15 € | 15 € | 18 € | 18 € |
| Pareja | 20 € | 10 € | 25 € | 12,50 € |
| Grupo de 4 | 28 € | 7 € | 35 € | 8,75 € |

No se ha supuesto duración por sesión. La contratación se acuerda con el centro.
Plan de alimentación: **40 €**, sin inventar una periodicidad. Yoga y Taichí
tienen suplemento, con tarifa y condiciones a consultar en recepción. No se
presume precio ni inclusión gratuita de la sauna.

## Equipo y clases

Equipo: Raúl Beas, Elissa Santos, María Florencia, Reduan Gzouli y Alex Dengra.
Nombres, funciones y especialidades proceden del dossier.

Catálogo: Pilates, Pilates con TRX, Body Tono, Tono Suau, Movilidad, GAP, Core,
Ciclo Indoor, Cardio Box, Zumba, Yoga y Taichí. Cardio Box se describe sin contacto.
No se incluyen Latino, Cross Kids ni Funcional Box.

El dossier no trae un horario nuevo. Se conservan las franjas del cartel anterior
y las dudas ya detectadas:

- Martes 18:00: el cartel decía «Fit Box Saco»; no se ha equiparado automáticamente
  a Cardio Box. Se muestra «Clase por confirmar» hasta aclararlo con Raúl.
- Pilates TRX del martes: texto 18:30, ubicado en la fila 18:45. Aviso visible.
- Jueves 20:00 y 21:00, y viernes 18:45, 19:15, 20:00 y 21:00: consultar por
  falta de legibilidad; no se deduce ausencia de actividad.
- Solo se publica duración cuando era legible en el cartel original.

## Mantenimiento

Fuente editable única: `src/data/gym.json`. `tools/gym_content.py` y
`tools/dossier_content.py` generan los componentes; `python3 tools/package.py`
reconstruye los ocho HTML y sincroniza el tema WordPress.
Los productos de muestra siguen en `assets/js/config.js`.
