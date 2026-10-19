# Datos facilitados por el gimnasio · 16/10/2026

## Contacto y apertura

Fuente: captura `image(20261016-210356).png`.

- Dirección: Carrer de Sant Pau i Sant Blai, 1, 43202 Reus, Tarragona.
- Teléfono para llamadas: 675 72 83 43 (+34 675 72 83 43).
- Lunes a viernes: 06:00–22:00.
- Sábado: 09:00–13:00.
- Domingo: 10:00–14:00.
- No se ha confirmado WhatsApp, email ni festivos.

## Cuotas

Fuente: cartel `20261016_103617.jpg`, confirmado con `image(20261016-212847).png`; `20261016_103619.jpg` muestra parte del mismo cartel.

| Modalidad | Importe anunciado |
|---|---:|
| Individual | 39 € |
| Pareja | 37 € por persona |
| Familiar | 35 € por persona |

El cartel no indica el período. No se ha añadido «al mes», matrícula incluida,
duración del alta ni condiciones familiares que no aparezcan en la fuente.
La inscripción HTML permite elegir únicamente las tres cuotas, con un resumen
y una tarjeta visual de demostración. WooCommerce requiere configurar tres
productos virtuales y sus condiciones. Pareja y familiar se calculan por persona.
Los entrenamientos conservan sus tarifas informativas, con consulta telefónica
para acordar horario y disponibilidad, sin contratación ni pago online.

## Entrenamiento personal

| Modalidad | Socios: total | Socios: por persona | No socios: total | No socios: por persona |
|---|---:|---:|---:|---:|
| Individual | 15 € | 15 € | 18 € | 18 € |
| Pareja | 20 € | 10 € | 25 € | 12,50 € |
| Grupo de 4 | 28 € | 7 € | 35 € | 8,75 € |

No se ha supuesto duración por sesión ni periodicidad.

## Clases dirigidas 2026

Fuente: `20261016_103621.jpg`. Se han transcrito 42 clases legibles.
Se conservan los nombres del cartel: Tono Suau, Body Tono, Tonificació,
Movilitat i estiraments, Ciclo Indoor, Yoga, Pilates, Zumba, Core, Tai Chi,
Fit Box Saco, Pilates TRX y GAP.

Pendiente de confirmar:

- Pilates TRX del martes: el texto de la celda dice **18:30h**, pero aparece
  dentro de la fila **18:45**. Se muestra como 18:30 con aviso de confirmación.
- Jueves a las 20:00 y 21:00: reflejos impiden identificar con certeza el contenido.
- Viernes a las 18:45, 19:15, 20:00 y 21:00: no se deduce una clase ni se afirma
  que no haya actividad; las celdas se muestran como «Consultar».
- Solo se publica «30 min» donde se lee: Ciclo Indoor de lunes y miércoles
  a las 07:45, Fit Box Saco del martes a las 18:00 y Ciclo Indoor del miércoles
  a las 18:45. No se han calculado duraciones a partir de la siguiente clase.

## Mantenimiento

La fuente editable única es `src/data/gym.json`. `tools/gym_content.py` genera
los componentes HTML y los archivos de datos; `python tools/package.py` actualiza
la versión HTML y el tema. El catálogo de muestra permanece en `assets/js/config.js`.
El sitio no incorpora la puntuación o número de reseñas de Google, ni presume
que el teléfono tenga WhatsApp.
