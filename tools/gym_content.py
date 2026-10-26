"""Genera componentes compartidos a partir de los datos aportados por el gimnasio."""
from pathlib import Path
from html import escape
from urllib.parse import quote
import json

ROOT = Path(__file__).resolve().parents[1]

def euro(number):
    value = (str(int(number)) if float(number).is_integer() else f'{number:.2f}').replace('.', ',')
    return value + ' €'

def generate():
    data = json.loads((ROOT/'src/data/gym.json').read_text())
    data['enrollmentMaxPeople'] = 12
    plans = []
    for fee, key, people in zip(data['fees'], ['individual','couple','family'], [1,2,0]):
        plans.append({'id':'membership-'+key, 'name':'Cuota '+fee['name'].lower(),
                      'group':'Cuotas del gimnasio', 'price':fee['price'], 'basis':'person',
                      'people':people, 'defaultPeople':people or 3, 'audience':'all', 'kind':'membership'})
    data['enrollmentPlans'] = plans
    partials = ROOT/'src/partials'
    options = ''
    for group in dict.fromkeys(p['group'] for p in plans):
        options += '<optgroup label="'+escape(group)+'">'
        for plan in [p for p in plans if p['group']==group]:
            suffix = ' / persona / mes' if plan['basis']=='person' else ' total'
            options += '<option value="'+plan['id']+'">'+escape(plan['name'])+' · '+euro(plan['price'])+suffix+'</option>'
        options += '</optgroup>'
    (partials/'enrollment-options.html').write_text(options+'\n')
    (ROOT/'assets/data').mkdir(exist_ok=True)
    (ROOT/'assets/data/gym.json').write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
    (ROOT/'assets/js/gym-data.js').write_text('/* Datos del gimnasio actualizados el 26/10/2026. Generado desde src/data/gym.json. */\nwindow.STUDI_GYM='+json.dumps(data, ensure_ascii=False, separators=(',',':'))+';\n')
    maps = 'https://www.google.com/maps/search/?api=1&query='+quote(data['address'])
    opening = '<div class="hours-block" data-opening-hours><dl class="opening-hours">'
    for item in data['openingHours']:
        opening += f'<div><dt>{escape(item["days"])}</dt><dd><time>{item["from"]}</time>–<time>{item["to"]}</time></dd></div>'
    opening += '</dl></div>'
    (partials/'opening-hours.html').write_text(opening+'\n')
    contact = f'''<div class="contact-details">
<div><i data-icon="pin"></i><div><h3>Dirección en Reus</h3><address data-location>{escape(data['address'])}</address><a class="text-link" data-map href="{escape(maps)}" target="_blank" rel="noopener noreferrer">Cómo llegar <i data-icon="arrow"></i></a></div></div>
<div><i data-icon="clock"></i><div><h3>Horario de apertura</h3>{{{{include:opening-hours}}}}<small>{escape(data['holidayNotice'])}</small></div></div>
<div><i data-icon="phone"></i><div><h3>Teléfono</h3><a class="contact-phone" data-call href="tel:{data['phone']}"><span data-phone>{data['phoneDisplay']}</span></a><p>Consulta horarios, cuotas y entrenamiento personal.</p></div></div>
<div><i data-icon="instagram"></i><div><h3>Síguenos</h3>{''.join('<a class="contact-social" href="'+escape(s['url'])+'" target="_blank" rel="noopener noreferrer">'+escape(s['handle'])+'</a>' for s in data['socials'])}</div></div>
</div>'''
    (partials/'visit-details.html').write_text(contact+'\n')
    from dossier_content import generate_dossier
    generate_dossier(data)
    rows = sorted({s['time'] for day in data['days'] for s in day['sessions']} | {t for day in data['days'] for t in day['unreadable']})
    schedule = '<section class="section wrap schedule-section" id="horarios"><div class="section-heading"><div><p class="eyebrow">CLASES DIRIGIDAS · 2026</p><h2 class="section-title">CADA DÍA,<br><span>UNA FORMA DE MOVERTE.</span></h2></div><p>Consulta los días y las horas de las sesiones. Las franjas pendientes de confirmar se indican en el horario.</p></div><div class="schedule-legend"><span><b class="lime-text">●</b> Horario de clases</span><a href="contacto.html">Ver horario de apertura <i data-icon="arrow"></i></a></div>'
    schedule += '<div class="schedule-desktop table-scroll" tabindex="0" role="region" aria-label="Horario semanal de clases"><table class="schedule-table"><caption>Horario de lunes a viernes. Confirma las franjas marcadas «Consultar».</caption><thead><tr><th scope="col">Hora</th>'
    schedule += ''.join(f'<th scope="col">{day["name"]}</th>' for day in data['days'])+'</tr></thead><tbody>'
    for time in rows:
        schedule += f'<tr><th scope="row"><time>{time}</time></th>'
        for day in data['days']:
            session = next((s for s in day['sessions'] if s['time']==time), None)
            if session:
                detail = '<small>Hora por confirmar*</small>' if session['uncertain'] else f'<small>{escape(session["detail"])}</small>' if session['detail'] else ''
                schedule += f'<td class="has-class{" uncertain" if session["uncertain"] else ""}"><strong>{escape(session["name"])}</strong>{detail}</td>'
            elif time in day['unreadable']:
                schedule += '<td class="unreadable"><span>Consultar</span></td>'
            else:
                schedule += '<td class="no-class"><span aria-label="Sin clase indicada">—</span></td>'
        schedule += '</tr>'
    schedule += '</tbody></table></div><div class="schedule-mobile">'
    for day in data['days']:
        schedule += f'<details class="schedule-day" open><summary>{day["name"]}<i data-icon="plus"></i></summary><ul>'
        for s in day['sessions']:
            detail = '<small>Hora por confirmar*</small>' if s['uncertain'] else f'<small>{escape(s["detail"])}</small>' if s['detail'] else ''
            schedule += f'<li><time>{s["time"]}{"*" if s["uncertain"] else ""}</time><span><strong>{escape(s["name"])}</strong>{detail}</span></li>'
        schedule += '</ul>'
        if day['unreadable']:
            schedule += '<p class="schedule-day-note">Consultar las franjas de '+', '.join(day['unreadable'])+'.</p>'
        schedule += '</details>'
    schedule += '</div><div class="schedule-notes"><p>Yoga y Taichí tienen suplemento. <a href="inscripcion.html#otros-servicios">Ver condiciones en Tarifas</a>.</p><p>La actividad del martes a las 18:00 está pendiente de confirmación en recepción.</p><p><strong>* Pilates TRX del martes:</strong> hora pendiente de confirmar entre las 18:30 y las 18:45. Llámanos antes de asistir.</p><p>Para las franjas marcadas «Consultar» del jueves y viernes, confirma la programación con el gimnasio.</p><a class="text-link" data-call href="tel:'+data['phone']+'">Llamar al <span data-phone>'+data['phoneDisplay']+'</span> <i data-icon="phone"></i></a></div></section>'
    (partials/'class-schedule.html').write_text(schedule+'\n')

if __name__ == '__main__':
    generate()
