/* El mismo selector para la demo y los productos virtuales de WooCommerce. */
(() => {
  'use strict';
  const form = document.getElementById('enrollment-form');
  if (!form || !window.STUDI1_ENROLLMENT) return;
  const $ = id => document.getElementById(id);
  const server = $('enrollment-config');
  const data = server ? JSON.parse(server.textContent) : window.STUDI_GYM;
  const plans = (data.enrollmentPlans || []).filter(plan => plan.kind === 'membership');
  const select = $('enrollment-plan'), family = $('family-people');
  const submit = $('enrollment-submit'), names = $('participant-inputs');
  const money = n => Number(n).toLocaleString('es-ES', { style:'currency', currency:data.currency || 'EUR' });
  const current = () => window.STUDI1_ENROLLMENT.quote(plans, select.value, family.value, data.enrollmentMaxPeople || 12);
  const choices = [...document.querySelectorAll('[data-choose-plan]')];
  const followup = $('inscripcion-datos');
  let hasChosen = !followup;
  let extraCount = -1;
  function setStep(review) {
    document.querySelectorAll('.enrollment-steps li').forEach((li, i) => {
      li.classList.toggle('active', i === (review ? 2 : 1));
      li.classList.toggle('complete', i < (review ? 2 : 1));
      if (i === (review ? 2 : 1)) li.setAttribute('aria-current','step'); else li.removeAttribute('aria-current');
    });
  }
  function update() {
    const plan = plans.find(p => p.id === select.value);
    choices.forEach(button => {
      const option = plans.find(p => p.id === button.dataset.choosePlan);
      const active = hasChosen && !!option && option.id === select.value;
      button.setAttribute('aria-pressed', String(active));
      button.disabled = !option || option.available === false;
      const action = button.querySelector('[data-rate-action]');
      if (action) action.textContent = button.disabled ? 'Consultar disponibilidad' : active ? 'Seleccionada · continuar debajo ↓' : 'Elegir esta tarifa ↓';
    });
    const flexible = plan && plan.people === 0;
    $('family-people-wrap').hidden = !flexible;
    family.disabled = !flexible;
    family.required = !!flexible;
    family.max = data.enrollmentMaxPeople || 12;
    const q = current();
    submit.disabled = !q || plan.available === false;
    if (!q) { $('plan-total').textContent = '—'; $('plan-calculation').textContent = 'Indica un número válido de personas.'; return; }
    $('plan-name').textContent = plan.name;
    $('plan-total').textContent = plan.available === false ? 'Próximamente' : money(q.total);
    $('plan-calculation').textContent = plan.basis==='person'
      ? `${money(plan.price)} / mes × ${q.people} ${q.people===1?'persona':'personas'}`
      : `${q.people} ${q.people===1?'persona':'personas'} · ${money(q.perPerson)} por persona`;
    $('plan-note').textContent = 'Cuota mensual. Seguro anual: 15 € aparte. Consulta en recepción si corresponde abonarlo al realizar tu alta. El importe mostrado corresponde solo a la cuota seleccionada.';
    if (server) {
      $('plan-note').textContent += ' El importe final, con los impuestos aplicables, se confirma al pagar.';
      const description = $('enrollment-description');
      if (description) description.textContent = plan.description || '';
      const product = form.elements.namedItem('add-to-cart');
      product.value = plan.productId || '';
      form.elements.namedItem('quantity').value = q.quantity;
    }
    $('extra-participants').hidden = q.people <= 1;
    if (extraCount !== q.people-1) {
      const saved = [...names.querySelectorAll('input')].map(input=>input.value);
      names.replaceChildren();
      for (let i=0; i<q.people-1; i++) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.id = `participant-${i+2}`;
        input.name = 'studi1_participants[]'; input.maxLength = 100;
        input.required = true; input.autocomplete = 'off'; input.value = saved[i] || '';
        label.htmlFor = input.id; label.textContent = `Nombre y apellidos · Persona ${i+2} *`;
        label.append(input); names.append(label);
      }
      extraCount = q.people-1;
    }
  }
  select.addEventListener('change', update);
  choices.forEach(button => button.addEventListener('click', () => {
    const option = plans.find(p => p.id === button.dataset.choosePlan);
    if (!option || option.available === false) return;
    hasChosen = true;
    if (followup) followup.hidden = false;
    select.value = option.id;
    form.hidden = false;
    if ($('enrollment-review')) $('enrollment-review').hidden = true;
    setStep(false);
    update();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelector('.enrollment-form-wrap').scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block: 'start'});
    select.focus({preventScroll:true});
  }));
  family.addEventListener('input', update);
  form.addEventListener('input', e => { if (e.target.setCustomValidity) e.target.setCustomValidity(''); });
  form.addEventListener('submit', e => {
    [...form.querySelectorAll('input[required]')].forEach(input => {
      input.setCustomValidity('');
      if (input.type!=='checkbox' && !input.value.trim()) input.setCustomValidity('Completa este dato.');
    });
    const phone = form.elements.namedItem('phone');
    if (phone && !/^[0-9]{7,15}$/.test(phone.value.replace(/\D/g,''))) phone.setCustomValidity('Introduce un teléfono válido.');
    const q = current();
    if (!q || q.plan.available===false || !form.reportValidity()) { e.preventDefault(); return; }
    if (server) return; // En producción envía al flujo nativo, sin inventar confirmaciones.
    e.preventDefault();
    const target = $('review-data'); target.replaceChildren();
    const add = (tag, text, className='') => { const el=document.createElement(tag);el.textContent=text;el.className=className;target.append(el);return el; };
    add('p', $('plan-name').textContent, 'review-plan');
    add('p', `${$('first-name').value.trim()} ${$('last-name').value.trim()}`);
    add('p', $('email').value); add('p', $('phone').value);
    add('p', $('plan-calculation').textContent);
    const guests = [...names.querySelectorAll('input')];
    if (guests.length) { const list=add('ul','');guests.forEach(input=>{const li=document.createElement('li');li.textContent=input.value.trim();list.append(li);}); }
    add('p', $('plan-note').textContent, 'review-note');
    $('review-total').textContent = money(q.total);
    $('payment-demo-total').textContent = money(q.total);
    document.dispatchEvent(new CustomEvent('studi1:review', { detail: { name: `${$('first-name').value.trim()} ${$('last-name').value.trim()}` } }));
    form.hidden = true; $('enrollment-review').hidden = false;
    setStep(true);
    $('enrollment-back').focus();
  });
  $('enrollment-back')?.addEventListener('click', () => {
    $('enrollment-review').hidden = true; form.hidden = false;
    setStep(false);
    select.focus();
  });
  $('enrollment-confirm')?.addEventListener('click', () => {
    const dialog=$('result-dialog');if(dialog&&!dialog.open)dialog.showModal();
  });
  update();
})();
