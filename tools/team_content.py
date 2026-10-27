"""Retratos identificados por el cliente; biografías del dossier original."""
import json
import unicodedata
from html import escape as e
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def slug(value):
    return ''.join(c for c in unicodedata.normalize('NFKD', value.lower()) if not unicodedata.combining(c)).replace(' ', '-')

def members(data):
    originals = {m['name']: m for m in data['team']}
    return [{**originals[p['name']], **p} for p in json.loads((ROOT/'src/data/team-presentation.json').read_text())]

def portrait(m, css='', alt=True):
    return f'<img class="{css}" src="assets/img/team/{m["photo"]}" width="{m["width"]}" height="{m["height"]}" alt="{e(m["name"]) if alt else ""}" loading="lazy" decoding="async">'

def bolt():
    return '<svg class="coach-bolt" viewBox="0 0 180 100" aria-hidden="true"><path pathLength="1" d="M0 48 46 40 36 59 91 38 79 60 126 43 117 62 180 50"/></svg>'

def instructor_links(data, name):
    matches = [m for m in members(data) if name.casefold() in [c.casefold() for c in m['classes']]]
    if not matches:
        return ''
    return '<div class="class-coaches"><span>Con el equipo</span><div>'+''.join(
        f'<a class="class-coach" href="gimnasio.html#perfil-{m["id"]}" data-coach-open="{m["id"]}" aria-label="Conoce a {e(m["name"])}">{portrait(m, alt=False)}<span>{m["shortName"]}</span></a>' for m in matches)+'</div></div>'

def bio(m):
    classes = ''.join(f'<a href="actividades.html#clase-{slug(c)}">{e(c)} <span aria-hidden="true">↗</span></a>' for c in m['classes'])
    return f'<p class="coach-description">{e(m["description"])}</p><h3>Cómo te acompaña</h3><p class="coach-specialties">{e(m["specialties"])}</p>'+(
        '<h3>Sus clases</h3><nav class="coach-class-links" aria-label="Clases de '+e(m['name'])+'">'+classes+'</nav>' if classes else '')+(
        '<a class="coach-story-link" href="gimnasio.html#raul-beas">Conoce su trayectoria deportiva <span aria-hidden="true">↗</span></a>' if m.get('story') else '')

def generate_team(data):
    people = members(data)
    partials = ROOT/'src/partials'
    title = '<p class="eyebrow">PERSONAS QUE TE IMPULSAN</p><h2 class="section-title">EL EQUIPO.<br><span>TU IMPULSO.</span></h2>'
    home = '<section class="section wrap coach-home energy-scene" id="equipo-inicio" aria-labelledby="coach-home-title"><div class="coach-heading"><div>'+title.replace('class="section-title"','class="section-title" id="coach-home-title"')+'</div><p>Cinco profesionales. Una misma energía. <br>Elige a quién quieres conocer.</p></div><div class="coach-carousel" data-coach-carousel role="region" aria-label="Conoce al equipo de STUDI-1" aria-roledescription="carrusel"><div class="coach-stage">'
    for i, m in enumerate(people):
        home += f'<article class="coach-slide" data-coach-slide="{m["id"]}" id="coach-slide-{m["id"]}" aria-label="{i+1} de {len(people)}: {e(m["name"])}"'+(' hidden' if i else '')+'>'+f'<div class="coach-portrait" data-coach-swipe>{portrait(m)}<span class="coach-photo-mark" aria-hidden="true">S1</span>{bolt()}</div><div class="coach-slide-copy"><p class="coach-kicker">{e(m["role"])}</p><h3>{e(m["name"])}</h3><p class="coach-teaser">{e(m["teaser"])}</p><div class="coach-tags">'+''.join('<span>'+e(t)+'</span>' for t in m['tags'])+f'</div><a class="coach-profile-link" href="gimnasio.html#perfil-{m["id"]}" data-coach-open="{m["id"]}">Conoce a {m["shortName"]} <span aria-hidden="true">↗</span></a></div></article>'
    home += '</div><div class="coach-picker" role="group" aria-label="Selecciona un profesional">'
    for i, m in enumerate(people):
        home += f'<button class="coach-pick" type="button" data-coach-select="{m["id"]}" aria-controls="coach-slide-{m["id"]}" aria-pressed="{str(i==0).lower()}">{portrait(m, alt=False)}<span>{m["shortName"]}</span>{bolt()}</button>'
    home += '</div><div class="coach-carousel-bottom"><a class="coach-all-link" href="gimnasio.html#equipo">Todo el equipo <span aria-hidden="true">↗</span></a><div class="coach-arrows"><button type="button" data-coach-step="-1" aria-label="Profesional anterior">←</button><button type="button" data-coach-step="1" aria-label="Profesional siguiente">→</button></div></div><p class="coach-sr" data-coach-status aria-live="polite" aria-atomic="true"></p></div></section>'
    # Put the choices before the portrait so selecting on mobile keeps it in view.
    a = home.index('<div class="coach-picker"')
    b = home.index('<div class="coach-carousel-bottom"', a)
    picker = home[a:b]
    home = home[:a] + home[b:]
    home = home.replace('<div class="coach-stage">', picker + '<div class="coach-stage">', 1)
    (partials/'team-home.html').write_text(home+'\n')

    grid = '<section class="section wrap coach-team energy-scene" id="equipo"><div class="coach-heading"><div>'+title+'</div><p>Conoce a quienes te acompañan. <br>Dentro y fuera de la sala.</p></div><div class="coach-grid">'
    for i, m in enumerate(people):
        grid += f'<details class="coach-card'+(' coach-card-lead' if i == 0 else '')+f'" id="perfil-{m["id"]}"><summary data-coach-open="{m["id"]}" aria-label="Conoce a {e(m["name"])}">{portrait(m)}<span class="coach-card-shade"></span><span class="coach-card-copy"><span class="coach-kicker">{e(m["role"])}</span><span class="coach-card-name">{e(m["name"])}</span><span class="coach-card-action">Ver perfil <span aria-hidden="true">↗</span></span></span>{bolt()}</summary><div class="coach-fallback-bio">{bio(m)}</div></details>'
    grid += '</div></section>'
    (partials/'team.html').write_text(grid+'\n')

    dialog = '<dialog class="coach-dialog" id="coach-dialog" aria-label="Perfil del equipo"><button class="coach-close" type="button" data-close-dialog aria-label="Cerrar perfil">×</button>'
    for m in people:
        dialog += f'<section class="coach-profile" data-coach-profile="{m["id"]}" hidden><div class="coach-profile-photo">{portrait(m)}</div><div class="coach-profile-body"><p class="eyebrow">EQUIPO STUDI-1</p><h2 id="coach-name-{m["id"]}">{e(m["name"])}</h2><p class="coach-kicker">{e(m["role"])}</p>{bio(m)}<a class="coach-profile-link" href="contacto.html">Hablemos de tu objetivo <span aria-hidden="true">↗</span></a></div></section>'
    dialog += '</dialog>'
    (partials/'team-dialog.html').write_text(dialog+'\n')

    words = '<span>STUDI-1</span><b>✦</b><span>FUERZA</span><b>✦</b><span>ENERGÍA</span><b>✦</b><span>REUS</span><b>✦</b>'
    (partials/'team-marquee.html').write_text('<div class="coach-marquee" data-coach-marquee role="region" aria-label="STUDI-1 · Fuerza · Energía · Reus"><div class="coach-marquee-window" aria-hidden="true"><div class="coach-marquee-track"><div>'+words+'</div><div>'+words+'</div></div></div><button type="button" data-marquee-toggle aria-label="Pausar texto en movimiento" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button></div>\n')
