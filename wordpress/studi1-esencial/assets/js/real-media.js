/* Fotografías y vídeos reales de STUDI-1. Sin dependencias externas. */
(() => {
  'use strict';
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('[data-slide]')];
    const dots = [...carousel.querySelectorAll('[data-slide-to]')];
    const pause = carousel.querySelector('[data-slide-pause]');
    const caption = carousel.querySelector('[data-slide-caption]');
    const status = carousel.querySelector('[data-slide-status]');
    const labels = ['Sala de musculación', 'Máquinas y equipamiento', 'Sala de clases'];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0, timer, paused = motion.matches, hovered = false, visible = true;
    const interval = Number(carousel.dataset.interval) || 8000;
    function schedule() {
      clearTimeout(timer);
      if (!paused && !hovered && visible && !document.hidden) timer = setTimeout(() => show(current + 1), interval);
    }
    function show(index, manual = false) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.classList.toggle('is-active', i === current); slide.setAttribute('aria-hidden', String(i !== current)); });
      dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
      caption.textContent = labels[current];
      status.setAttribute('aria-live', manual ? 'polite' : 'off');
      status.textContent = `Foto ${current + 1} de ${slides.length}: ${labels[current]}`;
      carousel.dataset.currentSlide = String(current);
      schedule();
    }
    function updatePause() {
      pause.textContent = paused ? '▶' : 'Ⅱ';
      pause.setAttribute('aria-label', paused ? 'Reanudar presentación' : 'Pausar presentación');
      pause.setAttribute('aria-pressed', String(paused));
      schedule();
    }
    pause.addEventListener('click', () => { paused = !paused; updatePause(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i, true)));
    carousel.querySelector('[data-slide-next]').addEventListener('click', () => show(current + 1, true));
    carousel.querySelector('[data-slide-prev]').addEventListener('click', () => show(current - 1, true));
    carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
    carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
    // El foco de teclado detiene el avance hasta que el visitante lo reanuda.
    carousel.addEventListener('focusin', event => { if (event.target !== pause) { paused = true; updatePause(); } });
    carousel.querySelector('.carousel-controls').addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1), true); }
    });
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', () => { paused = motion.matches; updatePause(); });
    const mobileView = matchMedia('(max-width:700px)');
    const assistant = document.querySelector('.assistant-launch');
    const placeAssistant = () => { if (assistant) assistant.hidden = visible && mobileView.matches; };
    mobileView.addEventListener('change', placeAssistant);
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; placeAssistant(); schedule(); }, {threshold: .1}).observe(carousel);
    placeAssistant();
    updatePause();
    carousel.dataset.currentSlide = '0';
  }
  const playerList = [...document.querySelectorAll('.real-video video')];
  playerList.forEach(player => {
    const card = player.closest('figure');
    const stage = player.closest('.video-stage');
    const name = card.querySelector('figcaption span').textContent;
    const controls = document.createElement('div');
    controls.className = 'film-controls';
    controls.innerHTML = '<button type="button" class="film-toggle" aria-label="Pausar vídeo"><span aria-hidden="true">Ⅱ</span></button><button type="button" class="film-sound" aria-label="Activar sonido" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path class="sound-off" d="m16 9 6 6m0-6-6 6"/><path class="sound-on" d="M15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/></svg></button><button type="button" class="film-expand" aria-label="Ampliar vídeo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5"/></svg></button>';
    stage.append(controls);
    const toggle = controls.querySelector('.film-toggle');
    const sound = controls.querySelector('.film-sound');
    const expand = controls.querySelector('.film-expand');
    player.controls = false;
    player.muted = true;
    player.defaultMuted = true;
    player.autoplay = true;
    player.loop = true;
    let userPaused = false;
    function update() {
      const paused = player.paused;
      card.classList.toggle('is-paused', paused);
      card.classList.toggle('has-sound', !player.muted);
      toggle.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
      toggle.setAttribute('aria-label', `${paused ? 'Reproducir' : 'Pausar'}: ${name}`);
      sound.setAttribute('aria-label', `${player.muted ? 'Activar' : 'Silenciar'} sonido: ${name}`);
      sound.setAttribute('aria-pressed', String(!player.muted));
    }
    function start() {
      if (userPaused || player.error || document.hidden) return;
      const result = player.play();
      if (result && result.catch) result.catch(() => update());
    }
    toggle.addEventListener('click', () => {
      if (player.paused) { userPaused = false; start(); }
      else { userPaused = true; player.pause(); }
    });
    sound.addEventListener('click', () => {
      const unmute = player.muted;
      if (unmute) playerList.forEach(other => { if (other !== player) other.muted = true; });
      player.muted = !unmute;
    });
    expand.setAttribute('aria-label', `Ampliar: ${name}`);
    if (!stage.requestFullscreen && !player.webkitEnterFullscreen) expand.hidden = true;
    expand.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else if (stage.requestFullscreen) stage.requestFullscreen().catch(() => {});
      else if (player.webkitEnterFullscreen) player.webkitEnterFullscreen();
    });
    ['play', 'pause', 'volumechange', 'ended'].forEach(event => player.addEventListener(event, update));
    player.addEventListener('error', () => { card.classList.add('video-error'); player.controls = true; controls.hidden = true; });
    player.addEventListener('loadeddata', start, {once:true});
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    update();
    start();
  });
  const galleryMotion = document.querySelector('[data-gallery-motion]');
  if (galleryMotion) {
    const gallery = document.querySelector('.cinematic-gallery');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = reduced.matches;
    function updateGallery() {
      gallery.classList.toggle('motion-paused', paused);
      galleryMotion.setAttribute('aria-pressed', String(paused));
      galleryMotion.innerHTML = `${paused ? '▶' : 'Ⅱ'} <span>${paused ? 'Activar movimiento' : 'Pausar movimiento'}</span>`;
    }
    galleryMotion.addEventListener('click', () => { paused = !paused; updateGallery(); });
    reduced.addEventListener('change', () => { paused = reduced.matches; updateGallery(); });
    updateGallery();
  }
  const dialog = document.getElementById('photo-dialog');
  if (dialog) {
    const large = document.getElementById('photo-dialog-image');
    const caption = document.getElementById('photo-dialog-caption');
    document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
      const original = button.querySelector('img');
      large.src = original.src; large.alt = original.alt;
      large.srcset = original.srcset; large.sizes = '95vw';
      caption.textContent = original.alt;
      dialog.showModal();
    }));
    dialog.addEventListener('close', () => { large.removeAttribute('src'); large.removeAttribute('srcset'); });
  }
})();
