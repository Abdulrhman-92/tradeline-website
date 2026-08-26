/* ============================================================
   TRADE LINE — Footer (v1)
   One task: set the current year into [data-year].
   ============================================================ */

(() => {
  'use strict';

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();