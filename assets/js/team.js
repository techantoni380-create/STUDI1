/* Team interactions are scoped to the team; no payment or global carousel changes. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionAllowed = () => !reduceMotion.matches && !document.documentElement.classList.contains('cinema-paused');
  document.querySelectorAll('[data-coach-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('[data-coach-slide]')];
    const picks = [...carousel.querySelectorAll('[data-coach-select]')];
    const status = carousel.querySelector('[data-coach-status]');
    const picker = carousel.querySelector('.coach-picker');
    let index = 0;
    const select = (next, moveFocus = false) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== index; });
      picks.forEach((pick, i) => pick.setAttribute('aria-pressed', String(i === index)));
      if (status) status.textContent = slides[index].getAttribute('aria-label');
      // Scroll only the selector rail; the page and the reader's position stay put.
      const pick = picks[index];
      const left = pick.offsetLeft - picker.offsetLeft;
      if (left < picker.scrollLeft || left + pick.offsetWidth > picker.scrollLeft + picker.clientWidth) {
        picker.scrollTo({left: Math.max(0, left - (picker.clientWidth - pick.offsetWidth) / 2), behavior: motionAllowed() ? 'smooth' : 'auto'});
      }


      if (moveFocus) pick.focus({preventScroll: true});
    };
    picks.forEach((pick, i) => {
      pick.addEventListener('click', () => select(i));
      pick.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = index + 1;
        if (event.key === 'ArrowLeft') next = index - 1;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = slides.length - 1;
        if (next !== undefined) { event.preventDefault(); select(next, true); }
      });
    });
    carousel.querySelectorAll('[data-coach-step]').forEach(button => button.addEventListener('click', () => select(index + Number(button.dataset.coachStep))));
    carousel.querySelectorAll('[data-coach-swipe]').forEach(photo => {
      let start = null;
      photo.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' || !event.isPrimary) return;
        start = {x: event.clientX, y: event.clientY};
      });
      photo.addEventListener('pointerup', event => {
        if (!start) return;
        const dx = event.clientX - start.x, dy = event.clientY - start.y;
        start = null;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) select(index + (dx < 0 ? 1 : -1));
      });
      photo.addEventListener('pointercancel', () => { start = null; });
    });
  });

  const dialog = document.getElementById('coach-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    let trigger = null;
    const openProfile = (id, from) => {
      const profile = [...dialog.querySelectorAll('[data-coach-profile]')].find(p => p.dataset.coachProfile === id);
      if (!profile) return false;
      // The existing assistant is nonessential while a profile is open.
      const assistant = document.getElementById('assistant');
      if (assistant?.open) assistant.close();
      trigger = from || document.activeElement;
      dialog.querySelectorAll('[data-coach-profile]').forEach(p => { p.hidden = p !== profile; });
      dialog.setAttribute('aria-labelledby', `coach-name-${id}`);
      document.body.classList.add('coach-modal-open');
      if (!dialog.open) dialog.showModal();
      dialog.scrollTop = 0;
      dialog.querySelector('.coach-close').focus({preventScroll: true});

      return true;
    };
    document.querySelectorAll('[data-coach-open]').forEach(link => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        if (openProfile(link.dataset.coachOpen, link)) event.preventDefault();
      });
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('coach-modal-open');
      if (trigger?.isConnected) trigger.focus({preventScroll: true});
    });
    dialog.querySelectorAll('a').forEach(link => link.addEventListener('click', () => dialog.close()));
    const openFromHash = () => {
      const match = location.hash.match(/^#perfil-([a-z]+)$/);
      if (match) {
        const summary = document.querySelector(`#perfil-${match[1]} summary`);
        openProfile(match[1], summary);
      }
    };
    window.addEventListener('hashchange', openFromHash);
    openFromHash();
  }

  document.querySelectorAll('[data-coach-marquee]').forEach(strip => {
    const track = strip.querySelector('.coach-marquee-track');
    const group = track.firstElementChild;
    const content = group.innerHTML;
    const fit = () => {
      group.innerHTML = content;
      // Each identical half covers the viewport, including ultrawide screens.
      const baseWidth = group.getBoundingClientRect().width;
      if (baseWidth <= 0 || strip.clientWidth <= 0) return;
      const copies = Math.max(1, Math.ceil(strip.clientWidth / baseWidth));
      group.innerHTML = content.repeat(copies);
      track.lastElementChild.innerHTML = group.innerHTML;
      const distance = group.getBoundingClientRect().width;
      track.style.setProperty('--marquee-duration', `${distance / 72}s`);
    };
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(strip);
    window.addEventListener('resize', fit);
    if (document.fonts) document.fonts.ready.then(fit);
    fit();
  });
})();
