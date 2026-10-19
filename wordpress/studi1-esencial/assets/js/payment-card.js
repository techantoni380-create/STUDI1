/* Vista decorativa: solo refleja el nombre. Nunca lee número, CVC ni datos de pasarela. */
(() => {
  'use strict';
  const widgets = [...document.querySelectorAll('[data-card-widget]')];
  if (!widgets.length) return;
  const holder = document.getElementById('card-holder');
  const design = document.getElementById('card-design');
  let edited = false;
  const displayName = value => String(value || '').trim().replace(/\s+/g, ' ').slice(0, 80).toLocaleUpperCase('es-ES') || 'TU NOMBRE Y APELLIDOS';
  function paintName(value) {
    widgets.forEach(widget => { widget.querySelector('[data-card-name]').textContent = displayName(value); });
  }
  function paintDesign(value) {
    const master = value === 'mastercard';
    widgets.forEach(widget => {
      const production = widget.hasAttribute('data-card-production');
      widget.querySelector('[data-card-visa]').hidden = production || master;
      widget.querySelector('[data-card-mastercard]').hidden = production || !master;
      widget.querySelector('[data-card-generic]').hidden = !production;
      widget.querySelector('[data-card-number]').textContent = production ? '•••• •••• •••• ••••' : master ? '•••• •••• •••• 4444' : '•••• •••• •••• 4242';
    });
    const example = document.querySelector('[data-sample-number]');
    if (example) example.textContent = master ? '•••• •••• •••• 4444' : '•••• •••• •••• 4242';
  }
  const billingName = () => ['billing_first_name', 'billing_last_name'].map(id => document.getElementById(id)?.value || '').join(' ');
  if (holder) {
    holder.addEventListener('input', () => { edited = true; paintName(holder.value); });
    document.addEventListener('studi1:review', event => {
      if (!edited) holder.value = String(event.detail?.name || '').slice(0, 80);
      paintName(holder.value);
    });
  } else {
    const sync = event => { if (['billing_first_name', 'billing_last_name'].includes(event.target.id)) paintName(billingName()); };
    document.addEventListener('input', sync);
    document.addEventListener('change', sync);
    // El checkout clásico actualiza sus totales y autocompleta datos mediante jQuery.
    if (window.jQuery) window.jQuery(document.body).on('updated_checkout.studi1Card', () => paintName(billingName()));
  }
  design?.addEventListener('change', () => paintDesign(design.value));
  paintDesign(design?.value || 'visa');
  paintName(holder ? holder.value : billingName());
})();
