"""Contenido editorial de Raúl: un único origen para servicios, equipo y tarifas."""
from pathlib import Path
from html import escape
from team_content import generate_team, instructor_links, slug
ROOT=Path(__file__).resolve().parents[1]

def euro(v):
 return (str(int(v)) if float(v).is_integer() else f'{v:.2f}'.replace('.',','))+' €'
def heading(label,title,description=''):
 return '<div class="section-heading"><div><p class="eyebrow">'+label+'</p><h2 class="section-title">'+title+'</h2></div>'+('<p>'+description+'</p>' if description else '')+'</div>'
def generate_dossier(d):
 partials=ROOT/'src/partials'
 # Services page: no tariff duplication, no made-up sauna price or inclusion.
 services='''<main id="contenido"><section class="services-campaign campaign-head">{{include:services-hero-media}}<div class="wrap"><p class="eyebrow">SERVICIOS · STUDI-1 REUS</p><div class="campaign-copy"><h1>SUPÉRATE.<br><span>A TU MANERA.</span></h1><p>Entrenamiento, acompañamiento y bienestar en un gimnasio cercano y familiar.</p><a class="button lime" href="contacto.html">Encuentra tu entrenamiento <i data-icon="arrow"></i></a><nav class="section-jump" aria-label="Servicios disponibles">'''
 for service in d['services']:services+='<a href="#'+service['id']+'">'+escape(service['name'])+'</a>'
 services+='</nav></div></div></section><section class="section wrap service-grid energy-scene" aria-label="Nuestros servicios"><span class="scene-monogram" aria-hidden="true">S<span>1</span></span>'
 for i,s in enumerate(d['services']):
  services+=f'<article class="service-card" id="{s["id"]}"><div class="service-top"><span class="service-icon"><i data-icon="{s["icon"]}"></i></span><span class="service-number">0{i+1}</span></div><h2>{escape(s["name"])}</h2><p>{escape(s["description"])}</p><a class="text-link" href="{s["link"]}">{escape(s["action"])} <i data-icon="arrow"></i></a></article>'
 services+='''</section><section class="wrap visit-cta"><div><p class="eyebrow">PERSONAS QUE TE ACOMPAÑAN</p><h2 class="section-title">TU OBJETIVO,<br><span>CON NUESTRO EQUIPO.</span></h2></div><a class="button lime" href="gimnasio.html#equipo">Conoce al equipo <i data-icon="users"></i></a></section></main>'''
 (ROOT/'src/pages/servicios.html').write_text(services+'\n')
 generate_team(d)
 # Full class descriptions live here; the timetable only adds days and hours.
 classes='<section class="section wrap class-catalog energy-scene" id="clases"><span class="scene-monogram" aria-hidden="true">S<span>1</span></span>'+heading('CLASES DIRIGIDAS','ELIGE CÓMO<br><span>QUIERES MOVERTE.</span>','Conoce qué se trabaja en cada clase y encuentra tu sesión en el horario semanal.')+'<div class="class-cards">'
 for c in d['classCatalog']:
  classes+='<article class="class-card" id="clase-'+slug(c['name'])+'"><h3>'+escape(c['name'])+'</h3><p>'+escape(c['description'])+'</p>'
  classes+=instructor_links(d,c['name'])
  if c['supplement']:classes+='<a class="class-supplement" href="inscripcion.html#otros-servicios">Con suplemento · consultar ↗</a>'
  classes+='</article>'
 classes+='</div><a class="button outline-blue catalog-schedule-link" href="#horarios">Encuentra tu horario <i data-icon="clock"></i></a></section>'
 (partials/'class-catalog.html').write_text(classes+'\n')
 # The only full price guide, reused by the WordPress enrollment page.
 rates='<section class="section wrap rates-section energy-scene" id="tarifas"><span class="scene-monogram" aria-hidden="true">S<span>1</span></span>'+heading('TARIFAS · CUOTAS Y BONOS','ELIGE TU RITMO.<br><span>CONOCE TU CUOTA.</span>','Cuotas mensuales, bonos por duración y servicios adicionales. Consulta las condiciones de cada modalidad en recepción.')+'<nav class="section-jump" aria-label="Apartados de tarifas"><a href="#cuotas">Cuotas</a><a href="#bonos">Bonos</a><a href="#entrenamientos">Entrenamiento personal</a><a href="#otros-servicios">Otros servicios</a></nav><div id="cuotas" class="membership-rates">'
 for fee, plan_key in zip(d['fees'], ['individual','couple','family']):
  rates+=f'<button type="button" class="rate-card" data-choose-plan="membership-{plan_key}" aria-pressed="false"><span class="rate-name">{escape(fee["name"])}</span><span class="rate-price">{euro(fee["price"])}<small>/ mes</small></span><span class="rate-description">{"Por persona" if fee["name"]!="Individual" else "Cuota individual"}</span><span class="rate-action" data-rate-action>Elegir {escape(fee["name"].lower())} <span aria-hidden="true">↗</span></span></button>'
 rates+='</div><div class="insurance-note"><span class="service-icon"><i data-icon="info"></i></span><div><strong>Seguro anual: '+euro(d['annualInsurance'])+'</strong><p>Se añade a la cuota. Los totales de los bonos que aparecen a continuación ya incluyen el seguro anual.</p></div></div>'
 rates+='<section class="dossier-rate-block" id="bonos"><div class="rate-section-intro"><p class="eyebrow">BONOS POR DURACIÓN</p><h3>MÁS CONTINUIDAD.<br>OTRA CUOTA MENSUAL.</h3><p>Los bonos de 3, 6, 9 y 12 meses corresponden a meses consecutivos.</p></div><div class="table-scroll" tabindex="0" role="region" aria-label="Precios de bonos por duración"><table class="price-table pass-table"><caption>Totales del bono con seguro anual incluido</caption><thead><tr><th scope="col">Duración</th><th scope="col">Precio mensual</th><th scope="col">Total con seguro</th></tr></thead><tbody>'
 for p in d['durationPasses']:
  assert p['months']*p['monthly']+d['annualInsurance']==p['totalWithInsurance']
  rates+=f'<tr><th scope="row">{p["months"]} {"mes" if p["months"]==1 else "meses"}</th><td>{euro(p["monthly"])} / mes</td><td><strong>{euro(p["totalWithInsurance"])}</strong></td></tr>'
 rates+='</tbody></table></div></section>'
 rates+='<section class="dossier-rate-block" id="entrenamientos"><div class="rate-section-intro"><p class="eyebrow">ENTRENAMIENTOS PERSONALES</p><h3>A TU MEDIDA.<br>A TU NIVEL.</h3><p>Sesiones individuales, en pareja o en un grupo de cuatro. Acuerda el horario, la duración y la disponibilidad con el gimnasio.</p></div><div class="table-scroll" tabindex="0" role="region" aria-label="Tarifas de entrenamiento personal"><table class="price-table"><caption>Importes para socios y no socios</caption><thead><tr><th scope="col">Modalidad</th><th scope="col">Socios</th><th scope="col">No socios</th></tr></thead><tbody>'
 for rate in d['personalTraining']:
  rates+='<tr><th scope="row">'+escape(rate['name'])+'</th>'
  for key in ['members','nonMembers']:
   per='<small>'+euro(rate[key]/rate['people'])+' / persona</small>' if rate['people']>1 else ''
   rates+='<td><strong>'+euro(rate[key])+'</strong>'+per+'</td>'
  rates+='</tr>'
 rates+='</tbody></table></div></section><p class="price-footnote">En pareja y grupo de cuatro se muestra el importe total y su equivalente por persona. Los entrenamientos se acuerdan directamente con el gimnasio.</p>'
 rates+='<section class="dossier-rate-block other-rate-block" id="otros-servicios"><div class="rate-section-intro"><p class="eyebrow">OTROS SERVICIOS</p><h3>COMPLETA<br>TU EXPERIENCIA.</h3></div><div class="other-service-rates">'
 for service in d['otherServices']:
  rates+='<article><div><h4>'+escape(service['name'])+'</h4><p>'+escape(service['note'])+'</p></div><strong>'+(euro(service['price']) if service['price'] is not None else 'Consultar')+'</strong></article>'
 rates+='</div></section><div class="rates-bottom"><p>Consulta las condiciones de las cuotas de pareja y familiar, los bonos, el seguro anual y los servicios adicionales en recepción.</p><a class="button outline-blue" data-call href="tel:'+d['phone']+'">Consultar tarifas <i data-icon="phone"></i></a></div></section>'
 (partials/'rates.html').write_text(rates+'\n')
