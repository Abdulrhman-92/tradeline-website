/* ============================================================
   TRADE LINE — Hero (v2.0)
   1. Pauses ALL hero animations when the hero scrolls off-screen
      (toggles .is-paused -> animation-play-state: paused in CSS).
   2. Subtle cinematic parallax on the background layer
      (rAF-throttled, transform-only, respects reduced motion).
   ============================================================ */

(() => {
  'use strict';

  const hero = document.querySelector('.tl-hero');
  if (!hero) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Pause animations while off-screen ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      hero.classList.toggle('is-paused', !entry.isIntersecting);
    });
  }, { threshold: 0 });

  observer.observe(hero);

  /* ---------- Cinematic background parallax ---------- */
  const parallax = hero.querySelector('.tl-hero__parallax');
  if (!parallax || reduceMotion) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1);
    parallax.style.transform = `translate3d(0, ${progress * 40}px, 0)`;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();