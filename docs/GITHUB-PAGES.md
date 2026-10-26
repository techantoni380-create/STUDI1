# Actualizar la demostración en GitHub Pages

Para GitHub utiliza **STUDI1-GitHub.zip**. Extrae el archivo y copia el contenido de su carpeta `STUDI1-web` al repositorio STUDI1: `index.html` y `assets` deben quedar en la raíz configurada para GitHub Pages.

El archivo comprimido completo `STUDI1-web.zip` incluye también el tema de WordPress y su instalador. Guarda esa copia fuera del repositorio de la demostración. La versión HTML funciona sin la carpeta `wordpress`.

## Si GitHub Desktop rechazó el ZIP de WordPress

1. Cierra el aviso y pulsa **Undo** para deshacer el último commit local pendiente, conservando sus archivos.
2. Con **Show in Explorer**, mueve la carpeta `wordpress` fuera del repositorio. Conserva esa carpeta para instalar WordPress más adelante.
3. Copia la actualización HTML. Revisa los cambios y confirma con **Commit to main**.
4. Pulsa **Push origin**. Cuando termine la publicación de GitHub Pages, recarga la web sin caché.

Estas instrucciones corresponden al caso observado: un único commit sin subir. Si el archivo grande está en varios commits locales, no basta con añadir otro commit que lo borre; hay que corregir ese historial pendiente.

## Protección para próximas actualizaciones

El paquete añade un `.gitignore` que excluye `/wordpress/`, archivos ZIP y cachés de Python. No elimina archivos ya incluidos en un commit. `.nojekyll` indica que la entrega es una web estática.

Para regenerar los nueve HTML, ejecuta `python tools/build.py`. Para generar este paquete de nuevo desde la copia completa: `python tools/package_github.py`.

La inscripción y tienda de esta demostración no envían datos ni realizan cobros.
