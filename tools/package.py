#!/usr/bin/env python3
"""Reconstruye HTML, copia recursos al tema y prepara el ZIP instalable."""
from pathlib import Path
import shutil
import zipfile
from build import ROOT, build, render
build()
theme=ROOT/'wordpress/studi1-esencial'
if (theme/'assets').exists(): shutil.rmtree(theme/'assets')
if (theme/'content').exists(): shutil.rmtree(theme/'content')
shutil.copytree(ROOT/'assets',theme/'assets',dirs_exist_ok=True)
shutil.copytree(ROOT/'src/partials',theme/'content/partials',dirs_exist_ok=True)
shutil.copytree(ROOT/'src/pages',theme/'content/pages',dirs_exist_ok=True)
for page in (theme/'content').rglob('*.html'):
 page.write_text(render(page.read_text()))
# El tema utiliza los datos reales de WooCommerce. No se envía el catálogo ficticio.
(theme/'assets/js/config.js').unlink(missing_ok=True)
for name in ['head.html']:
 (theme/'content/partials'/name).unlink(missing_ok=True)
for name in ['tienda','inscripcion','checkout']:
 (theme/'content/pages'/f'{name}.html').unlink(missing_ok=True)
archive=ROOT/'wordpress/studi1-esencial.zip'
temporary=archive.with_suffix('.tmp')
with zipfile.ZipFile(temporary,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(theme.rglob('*')):
  if p.is_file(): z.write(p,p.relative_to(theme.parent))
with zipfile.ZipFile(temporary) as z:
 if z.testzip() is not None: raise RuntimeError('No se pudo verificar el ZIP del tema.')
temporary.replace(archive)
print('Tema instalable:',archive.name)
