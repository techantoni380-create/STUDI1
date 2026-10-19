# STUDI-1 en WordPress y WooCommerce

Se entrega un tema clásico original. El catálogo, stock, carrito, cálculo de impuestos, envío, pedidos, pasarela y correos se delegan en WooCommerce. No hay claves de pago en el navegador ni precios tomados del JavaScript de la demo.

## Preparar el hosting

1. Utiliza primero una instalación de pruebas de WordPress con HTTPS y copia de seguridad.
2. Instala WooCommerce desde el panel de WordPress.
3. En Apariencia → Temas → Añadir → Subir tema, carga `wordpress/studi1-esencial.zip` y actívalo.
4. Crea páginas con estas direcciones y selecciona su plantilla cuando corresponda:

| Página | Slug | Plantilla / contenido |
|---|---|---|
| Inicio | inicio | Se utiliza `front-page.php` al elegirla como portada estática |
| Gimnasio | gimnasio | STUDI-1 · Gimnasio |
| Actividades | actividades | STUDI-1 · Actividades |
| Tienda | tienda | Seleccionarla como página de tienda en WooCommerce |
| Inscripción | inscripcion | STUDI-1 · Inscripción |
| Carrito | carrito | Shortcode `[woocommerce_cart]` |
| Finalizar compra | finalizar-compra | Shortcode `[woocommerce_checkout]` |
| Mi cuenta | mi-cuenta | Shortcode `[woocommerce_my_account]` si se desea |
| Información legal | informacion-legal | Textos oficiales revisados por el titular |

5. En Ajustes → Lectura selecciona Inicio como portada estática. Revisa los enlaces permanentes.
6. Asigna Carrito y Finalizar compra en la configuración avanzada de WooCommerce. Este tema está diseñado para los shortcodes clásicos, no para sustituir a mano el bloque Checkout.
7. En Apariencia → Personalizar → STUDI-1 revisa el teléfono, dirección y horarios ya incorporados. Añade WhatsApp solo si se confirma, email y los IDs de los productos de inscripción. El logo puede cambiarse en Identidad del sitio.

## Inscripción en dos pasos

La primera pantalla permite elegir una de las tres cuotas y añadir los nombres de los acompañantes. La segunda es el checkout clásico con los datos de la primera persona y el pago. La demo HTML reúne modalidad y datos en el primer paso y muestra el resumen y la tarjeta visual en el segundo.

Crea **tres productos simples y virtuales**, con visibilidad de catálogo «Oculto», y asigna un ID diferente a cada opción en Apariencia → Personalizar → STUDI-1. El antiguo ajuste de inscripción se conserva para la individual. No se crean productos ni se cambian precios automáticamente.

| Modalidad | Precio del producto | Cantidad al carrito | Personas |
|---|---:|---:|---:|
| Cuota individual | 39 € | 1 | 1 |
| Cuota pareja | 37 € | 2 | 2 |
| Cuota familiar | 35 € | Número elegido | Número elegido |

1. Confirma período de cuota, condiciones de pareja/familia e impuestos antes de habilitar productos. El cartel no especifica esos datos. Añádelos a la descripción corta de cada producto.
2. En **cuota pareja y familiar desactiva «Vendido individualmente»**, porque la cantidad representa personas.
3. Si una modalidad no tiene un producto válido, está agotada o comparte ID con otra, aparece desactivada. La pantalla toma los precios actuales del servidor y el checkout calcula el importe final.
4. La primera plaza corresponde a la persona de los datos de facturación. Los nombres de sus acompañantes aparecen en carrito, pedido y metadatos de la línea. No se piden documentos ni datos de salud.
5. Familia: 1–12 personas por formulario como límite de interfaz; el gimnasio determina la elegibilidad comercial.
6. Los entrenamientos personales tienen tarifas informativas y un enlace de llamada. No se contratan ni se pagan en este formulario; el horario se acuerda directamente con el gimnasio.
7. Se permite una inscripción en el carrito a la vez; los productos físicos existentes se conservan. Para modificar modalidad o acompañantes, elimina la inscripción y vuelve a completarla.
8. Nonce, modalidad, cantidad y nombres se validan en servidor. La cantidad de una inscripción no se edita por separado en el carrito para evitar desajustes con sus participantes. No se toman precios del navegador.
9. El acceso al gimnasio es manual. No se incluyen tornos, cargos recurrentes ni suscripciones.

### Actualización desde la versión con entrenamientos

Si llegaste a crear productos de entrenamiento en WooCommerce, pásalos a borrador y revisa cualquier pedido pendiente que los contenga antes de reabrir los pagos. El tema bloquea los seis IDs de entrenamiento vinculados en los ajustes anteriores y rechaza líneas de entrenamiento que permanezcan en el carrito. No modifica ni cancela productos o pedidos automáticamente. Los productos de entrenamiento creados fuera de esa vinculación también deben retirarse manualmente. Un ID reasignado explícitamente a una cuota se trata como producto de inscripción; una línea antigua con metadatos de entrenamiento sigue siendo rechazada.

### Tarjeta visual

Una tarjeta verde metalizada utiliza el PNG oficial del gimnasio. En la demo, el nombre se toma de la inscripción y puede editarse; se refleja al escribir. El selector Visa/Mastercard cambia únicamente el diseño de muestra, con números enmascarados fijos. La confirmación es simulada. No hay campos para introducir número, caducidad o CVC reales ni persistencia de estos datos.

En el checkout clásico de WooCommerce se muestra la misma tarjeta cuando hay una inscripción en el carrito. Refleja el nombre de facturación y mantiene un distintivo genérico; no adivina la marca de una tarjeta ni lee los campos de la pasarela. Se inserta mediante el hook oficial `woocommerce_review_order_before_payment`, sin sustituir plantillas del plugin. La pasarela debe proporcionar sus campos seguros y mostrar las tarjetas realmente admitidas. La compatibilidad de tarjetas españolas, internacionales o Revolut depende de esa configuración.

## Tienda y pago

- Las tres cuotas usan productos virtuales. Los productos físicos se configuran aparte; las tres fichas HTML son ejemplos y no se importan al catálogo real.
- Configura el stock real y la información de cada producto. Los sabores/tallas diferentes se pueden tratar como productos simples separados dentro del alcance acordado.
- Configura una zona de envío, una tarifa fija y recogida gratuita.
- Configura moneda, impuestos, dirección de la tienda, condiciones y privacidad con los datos del titular.
- Instala y conecta una pasarela oficial compatible con WooCommerce. Usa el modo de pruebas antes de cobrar.
- Permite la compra como invitado si se quiere evitar crear una cuenta.
- Configura envío de correos y comprueba la llegada de las confirmaciones. Un pedido pendiente no equivale a un pago cobrado.

## Contenido y actualizaciones

- Los diseños de Inicio/Gimnasio/Actividades se leen desde `content/pages/` dentro del tema. Son archivos de código, no bloques editables del editor de WordPress.
- Cabecera y pie: `content/partials/header.html` y `footer.html`, renderizados por `header.php` y `footer.php`.
- Para mantener una sola fuente, edita `src/` en el proyecto y ejecuta `python tools/package.py` antes de volver a instalar la versión actualizada.
- Guarda una copia de cualquier cambio hecho directamente en el tema del servidor antes de reinstalarlo.
- Las imágenes generadas, frases de muestra y páginas legales deben sustituirse o aprobarse antes de publicar.

## Prueba de aceptación en el hosting

- Navegación, menú, texto e imágenes en escritorio y móvil.
- Alta: probar las tres cuotas, personas, nombres, total, producto virtual y consentimiento. Individual: 39 €; pareja: 74 €; familia de 3: 105 €. Entrenamientos: solo consulta por teléfono, sin compra.
- Comprobar rechazo de cantidades manipuladas, peticiones sin nonce, modalidades sin configurar y cambios de personas desde el carrito.
- Tarjeta: nombre al escribir, corrección, autocompletado y actualización del checkout; comprobar que los campos seguros pertenecen a la pasarela.
- Actualización: rechazar enlaces de compra y carritos de los antiguos productos de entrenamiento; revisar pedidos pendientes existentes.
- Compra: cantidades, stock, recogida, envío, impuestos y total.
- Pago de prueba correcto, cancelado y rechazado; confirmación del estado del pedido.
- Correo al cliente y al gimnasio; comprobar que no se confirma como pagado un pedido pendiente.
- Alta repetida, carrito vacío, datos inválidos y sesión invitada.
- Textos legales, datos oficiales, seguridad de WordPress y copia de seguridad.

La integración aún no se ha ejecutado dentro de una instalación WordPress. No se considera una tienda lista para cobrar hasta superar estas pruebas y configurar la pasarela.

## Referencias técnicas consultadas

- [Manual oficial de temas clásicos WooCommerce](https://developer.woocommerce.com/docs/theming/theme-development/classic-theme-developer-handbook/)
- [Hook de la sección de pago clásica](https://woocommerce.github.io/code-reference/files/woocommerce-templates-checkout-payment.html)
- [Shortcodes oficiales de páginas WooCommerce](https://woocommerce.com/document/woocommerce-shortcodes/page-shortcodes/)

El tema declara soporte WooCommerce y usa `woocommerce_content()` y los shortcodes nativos, sin copiar plantillas de checkout del plugin.

## Actualizar los datos del gimnasio

Edita `src/data/gym.json` y ejecuta `python tools/package.py`. Se regeneran contacto, apertura, horario de clases y tarifas en todas las páginas y en el tema. Las opciones de teléfono, dirección y apertura del Personalizador prevalecen cuando se rellenan. Consulta `DATOS-OFICIALES.md` para las dudas pendientes del material recibido.
