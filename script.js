/* =====================================================================
   script.js — sandorbito.com (personal site, NOVA-family DNA)
   - i18n hydration from translations.js (text + .html keys + attributes)
   - nav: scrolled glass state + mobile menu
   - scroll reveals (IntersectionObserver, GPU-friendly, light stagger)
   - hero status: decrypt / typewriter on load
   - EN / HU language switch (persisted)
   All motion is gated by prefers-reduced-motion.
   translations.js is loaded first and exposes window.TRANSLATIONS.
   ===================================================================== */
(function () {
  "use strict";

  var REDUCE = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var STORAGE_KEY = "sandorbito-lang";

  /* --------------------------- i18n ---------------------------------
     EN is the source of truth; unknown locales fall back to EN.
     - [data-i18n]       : key for text / .html keys (innerHTML)
     - [data-i18n-attr]  : "attr:key[,attr2:key2]" attribute mapping
     The dictionary is trusted (authored locally), so .html injection
     and attribute writes are safe.                                     */
  function applyI18n(lang) {
    var dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) ||
               (window.TRANSLATIONS && window.TRANSLATIONS.en) || {};

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!(key in dict)) return;
      var value = dict[key];

      if (key.slice(-5) === ".html") {
        el.innerHTML = value;
      } else if (el.tagName === "TITLE") {
        el.textContent = value;
      } else if (el.tagName === "META") {
        el.setAttribute("content", value);
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var parts = pair.split(":");
        var attr = (parts[0] || "").trim();
        var key = (parts[1] || "").trim();
        if (attr && key in dict) el.setAttribute(attr, dict[key]);
      });
    });

    document.documentElement.lang = lang;

    // Notify dynamic parts (e.g. gallery caption) so they can re-render.
    document.dispatchEvent(new CustomEvent("sb:langchange", { detail: { lang: lang } }));
  }

  function pickLang() {
    var avail = window.TRANSLATIONS ? Object.keys(window.TRANSLATIONS) : ["en"];
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored && avail.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return avail.indexOf(nav) !== -1 ? nav : "en";
  }

  var currentLang = pickLang();
  applyI18n(currentLang);

  /* ---------------------- LANGUAGE SWITCHER ------------------------- */
  var langButtons = document.querySelectorAll(".lang-switch__btn");

  function syncLangButtons(lang) {
    langButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("is-active", active);
    });
  }
  syncLangButtons(currentLang);

  if (langButtons.length) {
    langButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        if (!lang || lang === currentLang) return;
        window.setLanguage(lang);
      });
    });
  }

  /* ------------------------ NAV behaviour --------------------------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.querySelector(".nav__links");

  if (nav) {
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        nav.classList.toggle("is-scrolled", window.scrollY > 24);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --------------------- SCROLL REVEALS ----------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (REDUCE || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = 0;
        var group = el.parentElement;
        if (group) {
          var sibs = Array.prototype.filter.call(
            group.children,
            function (c) { return c.classList.contains("reveal"); }
          );
          delay = Math.min(sibs.indexOf(el), 5) * 80;
        }
        el.style.transitionDelay = delay + "ms";
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* -------------------- HERO STATUS: decrypt ------------------------ */
  var statusEl = document.getElementById("hero-status");
  if (statusEl) {
    var finalText = (window.TRANSLATIONS && window.TRANSLATIONS[currentLang] &&
                     window.TRANSLATIONS[currentLang]["hero.status"]) ||
                    statusEl.textContent;

    if (REDUCE) {
      statusEl.textContent = finalText;
      statusEl.classList.add("is-done");
    } else {
      statusEl.textContent = "";
      var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*<>/";
      var i = 0;

      function decryptStep() {
        if (i > finalText.length) {
          statusEl.textContent = finalText;
          statusEl.classList.add("is-done");
          return;
        }
        var settled = finalText.slice(0, i);
        var noise = "";
        var noiseLen = Math.min(3, finalText.length - i);
        for (var n = 0; n < noiseLen; n++) {
          var c = finalText[i + n];
          noise += (c === " ")
            ? " "
            : charset[(Math.random() * charset.length) | 0];
        }
        statusEl.textContent = settled + noise;
        i++;
        setTimeout(decryptStep, 38);
      }
      setTimeout(decryptStep, 650);
    }
  }

  /* Language switch entry point (persists choice + re-hydrates the page). */
  window.setLanguage = function (lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    currentLang = lang;
    applyI18n(lang);
    syncLangButtons(lang);
  };
})();
