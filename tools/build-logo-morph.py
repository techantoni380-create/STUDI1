#!/usr/bin/env python3
"""Genera máscaras geométricas de animación. No modifica ni exporta el PNG."""
from pathlib import Path
from PIL import Image
import json

ROOT = Path(__file__).resolve().parents[1]
image = Image.open(ROOT/'assets/img/logo-oficial.png')
if image.size not in {(2143, 734), (2142, 734)}:
    raise SystemExit('Las máscaras corresponden al logo horizontal de 734 px de alto. Adaptarlas para otro diseño.')
W, H = 256, 256*734/2143
def polygon(points):
    return [[round(x*W/2143,6),round(y*H/734,6)] for x,y in points]

data = {
    'width':W,'height':H,'naturalWidth':image.width,'naturalHeight':image.height,
    'seams':{'left':395*W/2143,'right':1845*W/2143},
    'monogram':{'left':98.5,'right':128-1780*W/2143*.64,'top':H/2-580*H/734*.64/2},
    'regions':{
        's':polygon([(0,0),(395,0),(395,565),(0,565)]),
        'one':polygon([(1780,0),(2143,0),(2143,580),(1845,580),(1845,120),(1780,120)]),
        'middle':polygon([(395,0),(1780,0),(1780,120),(1845,120),(1845,565),(395,565)]),
        'secondary':polygon([(0,565),(1845,565),(1845,580),(2143,580),(2143,734),(0,734)])
    }
}
output=ROOT/'assets/js/logo-morph-data.js'
output.write_text('/* Máscaras complementarias del PNG oficial; sin datos de partículas. */\nwindow.STUDI1_LOGO_DATA='+json.dumps(data,separators=(',',':'))+';\n')
print(f'Máscaras locales: {output.stat().st_size} bytes; PNG intacto.')
