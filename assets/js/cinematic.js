/* Atmósfera decorativa: nunca intercepta clics ni bloquea el contenido. */
(() => {
 'use strict';
 const root = document.documentElement;
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 function update() { root.classList.toggle('cinema-paused', motion.matches); }
 update();
 root.classList.add('cinema-ready');
 motion.addEventListener('change', update);
 function visibility() { root.classList.toggle('cinema-hidden', document.hidden); }
 document.addEventListener('visibilitychange', visibility);
 visibility();
 document.querySelectorAll('.campaign-head .hero-media img, .campaign-head .enrollment-photo, .contact-campaign-visual img').forEach(img => img.classList.add('header-motion-image'));
 const scenes = document.querySelectorAll('.energy-scene, .campaign-head');
 if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('energy-visible', entry.isIntersecting)), {threshold: .03});
  scenes.forEach(scene => observer.observe(scene));
 } else scenes.forEach(scene => scene.classList.add('energy-visible'));
})();
