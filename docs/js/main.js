/* ============================================================
   TRADE LINE — Shared Interactions (v1)
   Vanilla JS, zero dependencies. Loaded once per page.

   Data-attribute contract:
     [data-menu-toggle] / [data-menu]   mobile menu toggle
     [data-lang-btn="ar"|"en"]          language switcher buttons (legacy pill)
     [data-lang-toggle]                 single icon language toggle
     [data-ar] / [data-en]              translatable text nodes
     [data-count] [data-count-suffix]   animated counters
     [data-form] [data-form-success]    contact form validation
     [data-newsletter] [data-newsletter-success]  footer newsletter
     [data-whatsapp]                    floating WhatsApp button
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Mobile menu ---------- */
  const initMenu = () => {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu]');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  };

  /* ---------- Language switcher (AR/EN) ---------- */
  const applyLang = (lang) => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-ar], [data-en]').forEach((el) => {
      const text = el.dataset[lang];
      if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const active = btn.dataset.langBtn === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
      const code = btn.querySelector('[data-lang-code]');
      if (code) code.textContent = lang === 'ar' ? 'ع' : 'EN';
      const next = lang === 'ar' ? 'English' : 'العربية';
      btn.setAttribute('aria-label', next);
      btn.setAttribute('title', next);
    });

    localStorage.setItem('tl-lang', lang);
  };

  const initLang = () => {
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
    });

    document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.lang === 'en' ? 'en' : 'ar';
        applyLang(current === 'ar' ? 'en' : 'ar');
      });
    });
  };

  // Apply persisted language early (script is deferred -> DOM already parsed)
  const savedLang = localStorage.getItem('tl-lang');
  if (savedLang === 'ar' || savedLang === 'en') applyLang(savedLang);

  /* ---------- AOS scroll reveals ---------- */
  const initAOS = () => {
    if (window.AOS) {
      AOS.init({ once: true, duration: 700 });
    } else {
      window.addEventListener('load', () => {
        if (window.AOS) AOS.init({ once: true, duration: 700 });
      });
    }
  };

  /* ---------- Animated counters ---------- */
  const initCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (el) => {
      const target = parseFloat(el.dataset.count) || 0;
      const suffix = el.dataset.countSuffix || '';

      if (reduceMotion) {
        el.textContent = target + suffix;
        return;
      }

      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((el) => observer.observe(el));
  };

  /* ---------- Form validation ---------- */
  const initForms = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.querySelectorAll('[data-form]').forEach((form) => {
      const success = form.querySelector('[data-form-success]');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        form.querySelectorAll('[required]').forEach((field) => {
          const value = field.value.trim();
          const emailOk = field.type !== 'email' || emailPattern.test(value);
          const ok = value.length > 0 && emailOk;
          field.classList.toggle('is-invalid', !ok);
          if (!ok) isValid = false;
        });

        if (!isValid) return;

        if (success) {
          success.hidden = false;
          form.reset();
          setTimeout(() => {
            success.hidden = true;
          }, 5000);
        }
      });

      form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('input', () => field.classList.remove('is-invalid'));
      });
    });
  };

  /* ---------- Footer newsletter ---------- */
  const initNewsletter = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.querySelectorAll('[data-newsletter]').forEach((form) => {
      const success = form.querySelector('[data-newsletter-success]');
      const input = form.querySelector('input[type="email"]');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = input ? input.value.trim() : '';
        if (!emailPattern.test(value)) {
          if (input) input.classList.add('is-invalid');
          return;
        }
        if (input) input.classList.remove('is-invalid');
        if (success) {
          success.hidden = false;
          form.reset();
          setTimeout(() => {
            success.hidden = true;
          }, 5000);
        }
      });

      if (input) {
        input.addEventListener('input', () => input.classList.remove('is-invalid'));
      }
    });
  };

  /* ---------- WhatsApp floating button ---------- */
  const initWhatsApp = () => {
    const btn = document.querySelector('[data-whatsapp]');
    if (!btn) return;

    const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 400);
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  };

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initLang();
    initAOS();
    initCounters();
    initForms();
    initNewsletter();
    initWhatsApp();
  });
})();