/* Primera entrada y recargas; navegación interna y Atrás/Adelante sin repetición. */
(() => {
  'use strict';
  const logo = document.querySelector('.site-header .logo');
  const original = logo && logo.querySelector('img');
  const model = window.STUDI1_LOGO_MORPH;
  if (!original || !model || !window.matchMedia || !window.requestAnimationFrame) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sessionKey = 'studi1.logo-intro.unified.v1';
  const navigation = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  const legacyType = performance.navigation && performance.navigation.type;
  const navType = navigation ? navigation.type : (legacyType === 1 ? 'reload' : legacyType === 2 ? 'back_forward' : 'navigate');
  let running = false, startedHere = false, hasLeft = false;
  let finishActive = () => {};

  function eligible() {
    if (navType === 'back_forward') return false;
    if (navType === 'reload') return true;
    try { return !sessionStorage.getItem(sessionKey); }
    catch (_) {
      // Sin almacenamiento, evitar repetir al seguir enlaces internos.
      if (!document.referrer) return true;
      try { return new URL(document.referrer).origin !== location.origin; }
      catch (_) { return false; }
    }
  }

  function start() {
    if (running || startedHere || hasLeft || motion.matches || !eligible() || !original.naturalWidth) return;
    if (document.hidden) {
      document.addEventListener('visibilitychange', startWhenVisible);
      return;
    }
    // Las coordenadas corresponden al PNG entregado. Otros logos quedan estáticos.
    const imageURL = new URL(original.currentSrc || original.src, document.baseURI);
    if (!imageURL.pathname.endsWith('/logo-oficial.png') ||
        original.naturalWidth !== model.naturalWidth || original.naturalHeight !== model.naturalHeight) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'logo-unified-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.hidden = true;
    logo.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx || window.getComputedStyle(canvas).position !== 'absolute') {
      canvas.remove();
      return;
    }
    let frame, timer, observer;
    const rawDuration = window.getComputedStyle(logo).getPropertyValue('--logo-intro-duration').trim();
    const parsedDuration = parseFloat(rawDuration) * (rawDuration.endsWith('ms') ? 1 : 1000);
    const duration = Number.isFinite(parsedDuration) && parsedDuration > 0 ? parsedDuration : 3000;

    function sizeCanvas() {
      const box = original.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(box.width * ratio));
      canvas.height = Math.max(1, Math.round(box.height * ratio));
      ctx.setTransform(canvas.width/model.width, 0, 0, canvas.height/model.height, 0, 0);
      ctx.imageSmoothingEnabled = true;
    }
    function finish() {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', sizeCanvas);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (motion.removeEventListener) motion.removeEventListener('change', onMotionChange);
      logo.classList.remove('logo-unified-active');
      canvas.remove();
      running = false;
      finishActive = () => {};
    }
    function onVisibilityChange() { if (document.hidden) finish(); }
    function onMotionChange(event) { if (event.matches) finish(); }
    function paint(now) {
      if (!running) return;
      const elapsed = now-startedAt;
      if (elapsed >= duration) { finish(); return; }
      try { model.draw(ctx, elapsed*5000/duration, original); }
      catch (_) { finish(); return; }
      frame = window.requestAnimationFrame(paint);
    }

    sizeCanvas();
    // Preparar el primer fotograma antes de ocultar el PNG.
    try { model.draw(ctx, 0, original); } catch (_) { canvas.remove(); return; }
    running = true;
    startedHere = true;
    finishActive = finish;
    try { sessionStorage.setItem(sessionKey, '1'); } catch (_) {}
    canvas.hidden = false;
    logo.classList.add('logo-unified-active');
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (motion.addEventListener) motion.addEventListener('change', onMotionChange);
    if (window.ResizeObserver) {
      observer = new ResizeObserver(sizeCanvas);
      observer.observe(original);
    } else window.addEventListener('resize', sizeCanvas);
    const startedAt = performance.now();
    timer = window.setTimeout(finish, duration+500);
    frame = window.requestAnimationFrame(paint);
  }

  function startWhenVisible() {
    if (document.hidden) return;
    document.removeEventListener('visibilitychange', startWhenVisible);
    start();
  }
  window.addEventListener('pagehide', () => {
    hasLeft = true;
    document.removeEventListener('visibilitychange', startWhenVisible);
    finishActive();
  });
  if (original.complete) start();
  else original.addEventListener('load', start, { once: true });
})();
