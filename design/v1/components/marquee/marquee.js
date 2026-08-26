/* ============================================================
   TRADE LINE — Marquee (v1)
   Disables the marquee animation for reduced-motion users.
   Toggles .no-anim -> animation: none (marquee.css).
   ============================================================ */

(() => {
  'use strict';

  const marquee = document.querySelector('.tl-marquee');
  if (!marquee) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const apply = () => {
    marquee.classList.toggle('no-anim', reduceMotion.matches);
  };

  apply();
  reduceMotion.addEventListener('change', apply);
})();