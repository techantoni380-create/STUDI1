#!/usr/bin/env python3
"""Crea un paquete estático sin el instalador WordPress ni archivos grandes."""
from pathlib import Path
import argparse
import zipfile
from build import ROOT, build

parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, default=ROOT.parent / 'STUDI1-GitHub.zip')
args = parser.parse_args()
build()
allowed_hidden = {'.gitignore', '.nojekyll'}
files = []
for path in sorted(ROOT.rglob('*')):
    if not path.is_file():
        continue
    relative = path.relative_to(ROOT)
    if relative.parts[0] in {'wordpress', 'dist'} or '__pycache__' in relative.parts:
        continue
    if any(part.startswith('.') and part not in allowed_hidden for part in relative.parts):
        continue
    if path.suffix.lower() in {'.zip', '.pyc', '.tmp'}:
        continue
    if path.stat().st_size >= 100 * 1024 * 1024:
        raise ValueError(f'Archivo demasiado grande para GitHub: {relative}')
    files.append(path)
output = args.output.resolve()
output.parent.mkdir(parents=True, exist_ok=True)
temporary = output.with_suffix('.tmp')
with zipfile.ZipFile(temporary, 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in files:
        archive.write(path, Path(ROOT.name) / path.relative_to(ROOT))
with zipfile.ZipFile(temporary) as archive:
    if archive.testzip() is not None:
        raise RuntimeError('ZIP no válido')
temporary.replace(output)
print(f'Paquete GitHub: {output.name}; {len(files)} archivos; {output.stat().st_size/1024**2:.1f} MiB')
