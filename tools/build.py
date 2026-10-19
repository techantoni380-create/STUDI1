#!/usr/bin/env python3
"""Compila HTML desde páginas y componentes compartidos. Sin dependencias."""
from pathlib import Path
import re
from gym_content import generate
ROOT = Path(__file__).resolve().parents[1]
PAGES = {
 'index':('inicio','Inicio','STUDI-1 Gimnàs en Reus. Tu ritmo, tu fuerza. Descubre el gimnasio, actividades e inscripción online.'),
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
 generate()
 partials={name:render((ROOT/'src/partials'/f'{name}.html').read_text()) for name in ['head','header','footer']}
 for name,(page,title,description) in PAGES.items():
  head=partials['head'].replace('{{title}}',title).replace('{{description}}',description)
  body=render((ROOT/'src/pages'/f'{name}.html').read_text())
  output=f'<!doctype html>\n<html lang="es">\n<head>\n{head}</head>\n<body data-page="{page}">\n{partials["header"]}\n{body}\n{partials["footer"]}\n</body>\n</html>\n'
  (ROOT/f'{name}.html').write_text(output)
 print(f'{len(PAGES)} páginas generadas desde src/partials y src/pages.')
if __name__=='__main__': build()
