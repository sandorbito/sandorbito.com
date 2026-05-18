// Curated photo set for the green photo-window card.
// Empty card by default — click opens a lightbox with these photos.
// Source: "Linuxnak a sandorbito.com-ra" SSD folder, processed 2026-05-18
// (max 2400px long side, JPEG q=92 — visually lossless for web).
const CURATED_PHOTOS = [
  { full: 'images/curated/curated-01.jpg' },
  { full: 'images/curated/curated-02.jpg' },
  { full: 'images/curated/curated-03.jpg' },
  { full: 'images/curated/curated-04.jpg' },
  { full: 'images/curated/curated-05.jpg' },
  { full: 'images/curated/curated-06.jpg' },
  { full: 'images/curated/curated-07.jpg' },
  { full: 'images/curated/curated-08.jpg' },
  { full: 'images/curated/curated-09.jpg' },
  { full: 'images/curated/curated-10.jpg' },
];

// Count badge + click-to-open binding
(function () {
  const win = document.getElementById('photo-window');
  if (!win) return;

  const countEl = document.getElementById('photo-window-count');
  if (countEl) {
    countEl.dataset.photoCount = String(CURATED_PHOTOS.length);
    const render = () => {
      const lang = document.documentElement.lang || 'en';
      const n = parseInt(countEl.dataset.photoCount, 10);
      if (lang === 'hu') {
        countEl.textContent = `▷  ${n} KÉP`;
      } else {
        countEl.textContent = `▷  ${n} ${n === 1 ? 'PHOTO' : 'PHOTOS'}`;
      }
    };
    render();
    document.addEventListener('sb:langchange', render);
  }
})();

// Lightbox: opens on photo-window click, navigates with prev/next/keyboard
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let photos = [];
  let currentIndex = 0;

  const win = document.getElementById('photo-window');
  if (win) {
    win.addEventListener('click', () => {
      if (CURATED_PHOTOS.length === 0) return;
      openLightbox(CURATED_PHOTOS, 0);
    });
  }

  function openLightbox(set, idx) {
    photos = set;
    currentIndex = idx;
    showCurrent();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.src = '';
  }

  function showCurrent() {
    if (photos.length === 0) return;
    const photo = photos[currentIndex];
    imgEl.src = photo.full;
    imgEl.alt = '';
    if (captionEl) {
      captionEl.textContent = photos.length > 1
        ? `${currentIndex + 1} / ${photos.length}`
        : '';
    }
  }

  function nextPhoto() {
    if (photos.length === 0) return;
    currentIndex = (currentIndex + 1) % photos.length;
    showCurrent();
  }

  function prevPhoto() {
    if (photos.length === 0) return;
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    showCurrent();
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prevPhoto);
  nextBtn.addEventListener('click', nextPhoto);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-stage')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });
})();
