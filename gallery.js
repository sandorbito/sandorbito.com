/* =====================================================================
   gallery.js — sandorbito.com photography
   Builds a modern responsive masonry grid (#photo-grid) from the curated
   set, lazy-loading thumbnails, and wires the lightbox (full-size image,
   prev / next / keyboard, restored focus). Restyled neutral + warm caption.
   Source: images/curated/ — processed 2026-05-18 (visually lossless for web).
   ===================================================================== */

// Curated photo set. `thumb` feeds the grid (fast, lazy); `full` the lightbox.
const CURATED_PHOTOS = [
  { full: 'images/curated/curated-01.jpg', thumb: 'images/curated/curated-01-thumb.jpg' },
  { full: 'images/curated/curated-02.jpg', thumb: 'images/curated/curated-02-thumb.jpg' },
  { full: 'images/curated/curated-03.jpg', thumb: 'images/curated/curated-03-thumb.jpg' },
  { full: 'images/curated/curated-04.jpg', thumb: 'images/curated/curated-04-thumb.jpg' },
  { full: 'images/curated/curated-05.jpg', thumb: 'images/curated/curated-05-thumb.jpg' },
  { full: 'images/curated/curated-06.jpg', thumb: 'images/curated/curated-06-thumb.jpg' },
  { full: 'images/curated/curated-07.jpg', thumb: 'images/curated/curated-07-thumb.jpg' },
  { full: 'images/curated/curated-08.jpg', thumb: 'images/curated/curated-08-thumb.jpg' },
  { full: 'images/curated/curated-09.jpg', thumb: 'images/curated/curated-09-thumb.jpg' },
  { full: 'images/curated/curated-10.jpg', thumb: 'images/curated/curated-10-thumb.jpg' },
];

(function () {
  'use strict';

  /* ----------------------- build the grid ------------------------- */
  const grid = document.getElementById('photo-grid');

  function altFor(index) {
    const lang = document.documentElement.lang || 'en';
    return lang === 'hu'
      ? `Fotó a Côte d'Azur partvidékéről — ${index + 1}. kép`
      : `Photograph from the Côte d'Azur — frame ${index + 1}`;
  }

  if (grid) {
    const frag = document.createDocumentFragment();
    CURATED_PHOTOS.forEach((photo, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'photo__item';
      btn.setAttribute('data-index', String(i));

      const img = document.createElement('img');
      img.src = photo.thumb;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = altFor(i);

      btn.appendChild(img);
      btn.addEventListener('click', () => openLightbox(i));
      frag.appendChild(btn);
    });
    grid.appendChild(frag);

    // Refresh alt text on language change.
    document.addEventListener('sb:langchange', () => {
      grid.querySelectorAll('.photo__item img').forEach((img, i) => {
        img.alt = altFor(i);
      });
    });
  }

  /* --------------------------- lightbox ---------------------------- */
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentIndex = 0;
  let lastFocused = null;

  function openLightbox(idx) {
    if (CURATED_PHOTOS.length === 0) return;
    lastFocused = document.activeElement;
    currentIndex = idx;
    showCurrent();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.src = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function showCurrent() {
    const photo = CURATED_PHOTOS[currentIndex];
    if (!photo) return;
    imgEl.src = photo.full;
    imgEl.alt = altFor(currentIndex);
    if (captionEl) {
      captionEl.textContent = CURATED_PHOTOS.length > 1
        ? `${currentIndex + 1} / ${CURATED_PHOTOS.length}`
        : '';
    }
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % CURATED_PHOTOS.length;
    showCurrent();
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + CURATED_PHOTOS.length) % CURATED_PHOTOS.length;
    showCurrent();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

  // Click on the backdrop / stage (but not the image) closes.
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__stage')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') nextPhoto();
    else if (e.key === 'ArrowLeft') prevPhoto();
  });
})();
