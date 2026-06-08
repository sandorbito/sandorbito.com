/* =====================================================================
   matrix.js — ambient "rain" canvas for sandorbito.com
   AMBIENT TEXTURE, not wallpaper. Same restrained engine as bitogames,
   but warmed: a Riviera-gold-leaning palette marks the human/sun side.
   - very low opacity (set in CSS) + slowed cadence
   - throttled to a low frame rate (cheap on M1/8GB & low-end Linux)
   - single canvas, no WebGL
   - fully gated by prefers-reduced-motion (won't run at all)
   - paused when the tab is hidden
   ===================================================================== */
(function () {
  "use strict";

  var canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    canvas.style.display = "none";
    return;
  }

  var ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  // NOVA-flavoured glyph set: katakana hints + tech digits + light glyphs.
  var GLYPHS = "01アイウカキサソタヌネハユラリ<>/[]{}=*+ノ#░▒".split("");

  // Warm palette — gold-leaning with rare violet (studio) / cyan sparks.
  var COLORS = ["#e8b06a", "#e8b06a", "#e8b06a", "#8b6cff", "#2ff3ff"];

  var fontSize = 16;
  var columns = 0;
  var drops = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Throttle: ~12fps. Slow cadence = ambient, premium, low CPU.
  var FRAME_MS = 1000 / 12;
  var lastFrame = 0;
  var rafId = null;
  var running = false;

  function size() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.ceil(w / fontSize);
    drops = new Array(columns);
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }
    ctx.font = fontSize + "px 'JetBrains Mono', monospace";
    ctx.textBaseline = "top";
  }

  function draw() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    // Fade prior frame — long trails, gentle. Matches --bg (#07080c).
    ctx.fillStyle = "rgba(7, 8, 12, 0.22)";
    ctx.fillRect(0, 0, w, h);

    for (var i = 0; i < columns; i++) {
      var x = i * fontSize;
      var y = drops[i] * fontSize;

      var glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];

      var color = COLORS[0];
      if (Math.random() > 0.985) {
        color = COLORS[(Math.random() * COLORS.length) | 0];
      }
      ctx.fillStyle = color;
      ctx.fillText(glyph, x, y);

      if (y > h && Math.random() > 0.975) {
        drops[i] = Math.floor(Math.random() * -20);
      }
      drops[i]++;
    }
  }

  function loop(now) {
    if (!running) return;
    rafId = window.requestAnimationFrame(loop);
    if (now - lastFrame < FRAME_MS) return;
    lastFrame = now;
    draw();
  }

  function start() {
    if (running) return;
    running = true;
    lastFrame = 0;
    rafId = window.requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(size, 180);
  });

  size();
  start();
})();
