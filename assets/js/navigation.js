/* Shared responsive anchor clearance and dialog labels. */
(() => {
  // Keep anchor headings clear of the real, responsive header height.
  const header = document.querySelector('.site-header');
  const fit = () => {
    if (!header) return;
    document.documentElement.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`);
    document.documentElement.style.scrollPaddingTop = `${header.getBoundingClientRect().height + 12}px`;
  };
  if (header && 'ResizeObserver' in window) new ResizeObserver(fit).observe(header);
  window.addEventListener('resize',fit);
  document.querySelectorAll('#coach-dialog .coach-close,#product-dialog .dialog-x,#search-dialog .panel-head [data-close-dialog],#cart-dialog .panel-head [data-close-dialog]').forEach(button => {
    button.classList.add('dialog-return-button');
    button.textContent = '← Volver';
    button.setAttribute('aria-label','Volver a la página anterior a esta ficha');
  });
  fit();
})();
