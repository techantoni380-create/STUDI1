/* Reflejo sobre la transparencia del PNG. Solo se renderiza durante el barrido. */
(() => {
  'use strict';
  function draw(ctx, image, progress, width, height) {
    ctx.clearRect(0, 0, width, height);
    if (progress <= 0 || progress >= 1) return;
    ctx.save();
    ctx.drawImage(image, 0, 0, width, height);
    ctx.globalCompositeOperation = 'source-in';
    const x = -width*.4 + width*1.8*progress;
    const beam = ctx.createLinearGradient(x-height*.3, height, x+height*.3, 0);
    beam.addColorStop(0, 'rgba(255,255,255,0)');
    beam.addColorStop(.32, 'rgba(230,243,255,0.06)');
    beam.addColorStop(.5, 'rgba(255,255,255,0.78)');
    beam.addColorStop(.68, 'rgba(230,243,255,0.06)');
    beam.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = beam;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
  window.STUDI1_LOGO_SHINE = { draw };
  const logo = document.querySelector('.site-header .logo');
  const image = logo && logo.querySelector('img');
  if (!image || !window.matchMedia || !window.requestAnimationFrame) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const interval = 2000, sweep = 1150;
  let timer, frame, canvas, away = false;
  const allowed = () => !away && !document.hidden && !motion.matches && image.naturalWidth && !logo.classList.contains('logo-unified-active');
  function stop() {
    window.clearTimeout(timer);
    window.cancelAnimationFrame(frame);
    if (canvas) canvas.remove();
    canvas = null;
  }
  function schedule(delay = interval) {
    stop();
    if (allowed()) timer = window.setTimeout(start, delay);
  }
  function start() {
    if (!allowed()) return;
    canvas = document.createElement('canvas');
    canvas.className = 'logo-shine-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    const box = image.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(box.width*ratio));
    canvas.height = Math.max(1, Math.round(box.height*ratio));
    logo.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx || window.getComputedStyle(canvas).position !== 'absolute') { stop(); return; }
    const began = performance.now();
    function paint(now) {
      if (!allowed()) { stop(); return; }
      const elapsed = now-began;
      if (elapsed >= sweep) { schedule(Math.max(0, interval-elapsed)); return; }
      try { draw(ctx, image, elapsed/sweep, canvas.width, canvas.height); }
      catch (_) { stop(); return; }
      frame = window.requestAnimationFrame(paint);
    }
    frame = window.requestAnimationFrame(paint);
  }
  const observer = new MutationObserver(() => {
    if (logo.classList.contains('logo-unified-active')) stop();
    else schedule(180); // Primer reflejo justo después de asentarse el logo.
  });
  observer.observe(logo, { attributes: true, attributeFilter: ['class'] });
  document.addEventListener('visibilitychange', () => schedule());
  if (motion.addEventListener) motion.addEventListener('change', () => schedule());
  window.addEventListener('pagehide', () => { away = true; stop(); });
  window.addEventListener('pageshow', () => { away = false; schedule(); });
  image.addEventListener('load', () => schedule());
  schedule();
})();
