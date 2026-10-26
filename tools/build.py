#!/usr/bin/env python3
"""Compila HTML desde páginas y componentes compartidos. Sin dependencias."""
from pathlib import Path
import re
from gym_content import generate
ROOT = Path(__file__).resolve().parents[1]
PAGES = {
 'index':('inicio','Inicio','STUDI-1 Gimnàs en Reus. Tu ritmo, tu fuerza. Descubre el gimnasio, actividades e inscripción online.'),
 'servicios':('servicios','Servicios','Sala fitness, entrenamiento personal, clases dirigidas, orientación alimentaria y sauna en STUDI-1 Reus.'),
 'gimnasio':('gimnasio','El gimnasio','Conoce STUDI-1 Gimnàs, sus espacios y cómo dar el primer paso.'),
 'actividades':('actividades','Actividades','Fuerza, cardio y movilidad. Encuentra tu forma de entrenar en STUDI-1.'),
 'tienda':('tienda','Tienda','Proteínas y accesorios. Tienda STUDI-1 con recogida o envío.'),
 'inscripcion':('inscripcion','Inscripción online','Inscripción a STUDI-1 en dos pasos, sin crear una cuenta.'),
 'checkout':('checkout','Finalizar compra','Revisa tu selección de productos STUDI-1.'),
 'legal':('legal','Información legal','Información legal de la propuesta STUDI-1.')
}
def render(text, depth=0):
 if depth > 8: raise ValueError('Demasiados componentes anidados.')
 return re.sub(r'\{\{include:([a-z-]+)\}\}', lambda m: render((ROOT/'src/partials'/f'{m[1]}.html').read_text(), depth+1), text)

def build():
 # Evita entregar recursos vacíos o WebP incompletos aunque su ruta exista.
 for directory in ('assets/img', 'assets/video'):
  for media in (ROOT/directory).rglob('*'):
   if not media.is_file(): continue
   size = media.stat().st_size
   if size == 0: raise ValueError(f'Recurso vacío: {media.relative_to(ROOT)}')
   if media.suffix.lower() == '.webp':
    with media.open('rb') as stream: header = stream.read(12)
    if header[:4] != b'RIFF' or header[8:12] != b'WEBP' or int.from_bytes(header[4:8], 'little') + 8 != size:
     raise ValueError(f'WebP incompleto: {media.relative_to(ROOT)}')
   if media.suffix.lower() == '.mp4':
    boxes = set()
    with media.open('rb') as stream:
     while stream.tell() < size:
      start = stream.tell(); header = stream.read(8)
      if len(header) != 8: raise ValueError(f'MP4 incompleto: {media.relative_to(ROOT)}')
      length = int.from_bytes(header[:4], 'big'); kind = header[4:8]; minimum = 8
      if length == 1:
       length = int.from_bytes(stream.read(8), 'big'); minimum = 16
      elif length == 0: length = size - start
      if length < minimum or start + length > size: raise ValueError(f'MP4 incompleto: {media.relative_to(ROOT)}')
      boxes.add(kind); stream.seek(start + length)
    if not {b'ftyp', b'moov', b'mdat'} <= boxes:
     raise ValueError(f'MP4 sin estructura de reproducción: {media.relative_to(ROOT)}')
 generate()
 partials={name:render((ROOT/'src/partials'/f'{name}.html').read_text()) for name in ['head','header','footer']}
 for name,(page,title,description) in PAGES.items():
  head=partials['head'].replace('{{title}}',title).replace('{{description}}',description)
  body=render((ROOT/'src/pages'/f'{name}.html').read_text())
  output=f'<!doctype html>\n<html lang="es">\n<head>\n{head}</head>\n<body data-page="{page}">\n{partials["header"]}\n{body}\n{partials["footer"]}\n</body>\n</html>\n'
  (ROOT/f'{name}.html').write_text(output)
 print(f'{len(PAGES)} páginas generadas desde src/partials y src/pages.')
if __name__=='__main__': build()
