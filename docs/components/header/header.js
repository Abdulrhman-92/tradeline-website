/* ============================================================
   TRADE LINE — Header (v1)
   One task: add .is-scrolled to the header after 10px of scroll.
   ============================================================ */

(() => {
  'use strict';

  const header = document.querySelector('.tl-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
})();