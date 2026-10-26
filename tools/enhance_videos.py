"""Mejora fotográfica de los vídeos reales desde los originales entregados.

Uso: python3 tools/enhance_videos.py /ruta/a/Imagenes
No genera detalle 4K ni interpola fotogramas. Conserva contenido, duración y audio.
"""
from pathlib import Path
import concurrent.futures
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
ORIGINALS = Path(sys.argv[1])
OUT = ROOT / 'assets/video/deluxe'
POSTERS = ROOT / 'assets/img/deluxe'
OUT.mkdir(parents=True, exist_ok=True)
FILES = {
    'clase-en-colchoneta': '09.59.33 (1)',
    'entrenamiento-con-pelota': '09.59.33',
    'clase-en-grupo': '09.59.34 (1)',
    'suspension-en-grupo': '09.59.34 (2)',
    'circuito-de-suelo': '09.59.34 (3)',
    'trabajo-de-core': '09.59.34 (4)',
    'ciclo-indoor': '09.59.34',
    'suspension-en-colchoneta': '09.59.35 (1)',
    'control-en-suspension': '09.59.35 (2)',
    'movilidad-con-cintas': '09.59.35',
}

def probe(path):
    return json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))

def process(item):
    name, stamp = item
    source = ORIGINALS / f'WhatsApp Video 2026-10-26 at {stamp}.mp4'
    meta = probe(source)
    video = next(s for s in meta['streams'] if s['codec_type'] == 'video')
    # Escalado moderado para visualización; nunca más del doble del original.
    height = max(video['height'], min(1080, video['height'] * 2))
    height = height // 2 * 2
    dark = name in {'entrenamiento-con-pelota', 'suspension-en-grupo', 'ciclo-indoor', 'suspension-en-colchoneta', 'control-en-suspension'}
    gamma, brightness = (1.13, 0.015) if dark else (1.06, 0.005)
    filters = f'hqdn3d=1.2:1.0:2.4:2.0,eq=contrast=1.055:brightness={brightness}:saturation=1.08:gamma={gamma}:gamma_weight=0.75,scale=-2:{height}:flags=lanczos,unsharp=5:5:0.38:3:3:0,setsar=1'
    target = OUT / f'{name}.mp4'
    temp = OUT / f'{name}.working.mp4'
    if not target.exists():
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(source), '-map', '0:v:0', '-map', '0:a?', '-vf', filters, '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-threads', '2', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', str(temp)], check=True)
        result = probe(temp)
        assert abs(float(meta['format']['duration'])-float(result['format']['duration'])) < 0.2, name
        assert temp.stat().st_size > 10000, name
        subprocess.run(['ffmpeg', '-v', 'error', '-i', str(temp), '-f', 'null', '-'], check=True)
        temp.replace(target)
    else:
        result = probe(target)
        assert abs(float(meta["format"]["duration"])-float(result["format"]["duration"])) < 0.2
    poster = POSTERS / f'{name}-poster.webp'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '1', '-i', str(target), '-frames:v', '1', '-vf', 'scale=640:-2', '-c:v', 'libwebp', '-quality', '88', str(poster)], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-i', str(poster), '-f', 'null', '-'], check=True)
    output_video = next(s for s in result['streams'] if s['codec_type'] == 'video')
    row = {'name': name, 'source': source.name, 'source_size': [video['width'], video['height']], 'output_size': [output_video['width'], output_video['height']], 'duration': float(result['format']['duration']), 'bytes': target.stat().st_size, 'filters': filters, 'audio': any(s['codec_type']=='audio' for s in result['streams'])}
    print(json.dumps(row), flush=True)
    return row

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        rows = list(pool.map(process, FILES.items()))
    (ROOT/'docs/VIDEO-RETOQUE.json').write_text(json.dumps(rows, indent=2)+'\n')
    print('10 vídeos y 10 portadas verificados.', flush=True)
