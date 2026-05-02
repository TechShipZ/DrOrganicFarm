/* ═══════════════════════════════════════════════
   Dr. Organic Vermicompost Farm — main.js
   All 3D canvas animations + interactions
════════════════════════════════════════════════ */

// ── CURSOR ──────────────────────────────────────
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
if (cur && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
}

// ── NAV ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('solid', scrollY > 40);
});
function toggleNav() {
  const nl = document.getElementById('navLinks');
  if (nl) nl.classList.toggle('open');
}

// ── LOAD IMAGES ─────────────────────────────────
window.addEventListener('load', function () {
  function setImg(id, src) {
    const el = document.getElementById(id);
    if (el && src) el.src = src;
  }
  if (typeof img_founder !== 'undefined') {
    setImg('founderPill', img_founder);
    setImg('founderMainImg', img_founder);
    setImg('heroFounderImg', img_founder);
    setImg('aboutFounderMain', img_founder);
  }
  if (typeof img_training1 !== 'undefined') { setImg('tpImg1', img_training1); setImg('train1Img', img_training1); setImg('g-train1', img_training1); }
  if (typeof img_training2 !== 'undefined') { setImg('tpImg2', img_training2); setImg('train2Img', img_training2); setImg('g-train2', img_training2); }
  if (typeof img_farm !== 'undefined') { setImg('farmImg', img_farm); setImg('g-farm', img_farm); }
  if (typeof img_award !== 'undefined') { setImg('awardImg', img_award); setImg('awardCertImg', img_award); setImg('g-award', img_award); }
  if (typeof img_icar !== 'undefined') { setImg('icarImg', img_icar); setImg('icarDocImg', img_icar); setImg('g-icar', img_icar); }
  // Gallery lightbox images
  if (typeof galleryImages !== 'undefined') {
    if (typeof img_training1 !== 'undefined') galleryImages[0] = img_training1;
    if (typeof img_founder !== 'undefined') galleryImages[1] = img_founder;
    if (typeof img_training2 !== 'undefined') galleryImages[2] = img_training2;
    if (typeof img_farm !== 'undefined') galleryImages[3] = img_farm;
    if (typeof img_award !== 'undefined') galleryImages[4] = img_award;
    if (typeof img_icar !== 'undefined') galleryImages[5] = img_icar;
  }
  // Init all canvases after load
  setTimeout(initAllCanvases, 100);
});

// ── BG PARTICLE NETWORK ──────────────────────────
(function () {
  const c = document.getElementById('bgCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts = [];
  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 70; i++) pts.push({
    x: Math.random() * 1920, y: Math.random() * 1080,
    vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
    r: Math.random() * 1.5 + .5
  });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120,184,50,.35)'; ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(120,184,50,${.1 * (1 - d / 130)})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── HERO ORBIT CANVAS ───────────────────────────
(function () {
  const c = document.getElementById('heroCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, t = 0;
  function resize() { W = c.width = c.offsetWidth || window.innerWidth; H = c.height = c.offsetHeight || window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cx = W * .72, cy = H * .5;
    for (let i = 0; i < 3; i++) {
      const angle = t * (.35 + i * .15) + i * Math.PI / 3;
      const orx = 220 + i * 40, ory = 70 + i * 25;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
      ctx.beginPath(); ctx.ellipse(0, 0, orx, ory, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(120,184,50,${.07 + i * .04})`; ctx.lineWidth = 1; ctx.stroke();
      const dx = Math.cos(t * (1 + i * .3)) * orx, dy = Math.sin(t * (1 + i * .3)) * ory;
      const gr = ctx.createRadialGradient(dx, dy, 0, dx, dy, 8);
      gr.addColorStop(0, `rgba(168,212,74,.9)`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(dx, dy, 8, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
      ctx.restore();
    }
    t += .007;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── HERO WORM CANVAS ────────────────────────────
function initWormHeroCanvas() {
  const c = document.getElementById('wormHeroCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  let t = 0;
  const worms = [];
  for (let i = 0; i < 14; i++) {
    worms.push({
      x: 90 + Math.random() * (W - 180), y: 90 + Math.random() * (H - 180),
      vx: (Math.random() - .5) * 1.3, vy: (Math.random() - .5) * 1.3,
      len: 5 + Math.floor(Math.random() * 5),
      phase: Math.random() * Math.PI * 2, speed: .018 + Math.random() * .018,
      hue: 10 + Math.random() * 20, sat: 60 + Math.random() * 15, lit: 38 + Math.random() * 18
    });
  }
  function drawWorm(w, t) {
    const angle = Math.atan2(w.vy, w.vx);
    const pts = [];
    for (let i = 0; i < w.len; i++) {
      const wave = Math.sin(t * 3.5 + w.phase + i * .9) * 11;
      pts.push({
        x: w.x - Math.cos(angle) * i * 15 + Math.sin(angle) * wave,
        y: w.y - Math.sin(angle) * i * 15 - Math.cos(angle) * wave
      });
    }
    if (pts.length < 2) return;
    // shadow glow
    ctx.shadowColor = `hsla(${w.hue},70%,60%,.3)`;
    ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.lineWidth = 13; ctx.strokeStyle = `hsl(${w.hue},${w.sat}%,${w.lit}%)`;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    // highlight
    ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,200,160,.25)'; ctx.stroke();
    // head
    ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, 8, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${w.hue + 5},${w.sat}%,${w.lit + 8}%)`; ctx.fill();
    // eyes
    for (const s of [.45, -.45]) {
      ctx.beginPath(); ctx.arc(pts[0].x + Math.cos(angle + s) * 5, pts[0].y + Math.sin(angle + s) * 5, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#120500'; ctx.fill();
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Soil background
    const grad = ctx.createRadialGradient(W / 2, H / 2, 30, W / 2, H / 2, W * .52);
    grad.addColorStop(0, '#3a2010'); grad.addColorStop(.6, '#1e1008'); grad.addColorStop(1, '#0d0806');
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(W / 2, H / 2, W * .5, 0, Math.PI * 2); ctx.fill();
    // Soil dots texture
    for (let i = 0; i < 40; i++) {
      const a = i * 2.618, r = 30 + (i % 8) * 22;
      ctx.beginPath(); ctx.arc(W / 2 + Math.cos(a) * r, H / 2 + Math.sin(a) * r, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90,55,25,${.3 + Math.sin(i) * .1})`; ctx.fill();
    }
    // Green glow overlay
    const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * .48);
    glow.addColorStop(0, 'rgba(78,120,30,.1)'); glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(W / 2, H / 2, W * .5, 0, Math.PI * 2); ctx.fill();
    // Clip & draw worms
    ctx.save(); ctx.beginPath(); ctx.arc(W / 2, H / 2, W * .47, 0, Math.PI * 2); ctx.clip();
    worms.forEach(w => {
      w.x += w.vx; w.y += w.vy;
      if (w.x < 70) w.vx = Math.abs(w.vx); if (w.x > W - 70) w.vx = -Math.abs(w.vx);
      if (w.y < 70) w.vy = Math.abs(w.vy); if (w.y > H - 70) w.vy = -Math.abs(w.vy);
      const dist = Math.hypot(w.x - W / 2, w.y - H / 2);
      if (dist > W * .43) {
        const ang = Math.atan2(w.y - H / 2, w.x - W / 2);
        w.vx = -Math.cos(ang) * 1.3; w.vy = -Math.sin(ang) * 1.3;
      }
      drawWorm(w, t);
    });
    ctx.restore();
    // Badge
    ctx.fillStyle = 'rgba(13,10,6,.82)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(W / 2 - 72, H * .82, 144, 44, 8);
    else { const r = 8, x = W / 2 - 72, y = H * .82, w2 = 144, h2 = 44; ctx.moveTo(x + r, y); ctx.lineTo(x + w2 - r, y); ctx.arcTo(x + w2, y, x + w2, y + r, r); ctx.lineTo(x + w2, y + h2 - r); ctx.arcTo(x + w2, y + h2, x + w2 - r, y + h2, r); ctx.lineTo(x + r, y + h2); ctx.arcTo(x, y + h2, x, y + h2 - r, r); ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r); }
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,184,50,.45)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = 'rgba(168,212,74,.95)'; ctx.font = 'bold 15px Cormorant Garamond, serif';
    ctx.textAlign = 'center'; ctx.fillText('2000 Worms / kg', W / 2, H * .82 + 27);
    // Ring
    ctx.beginPath(); ctx.arc(W / 2, H / 2, W * .49, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(120,184,50,.18)'; ctx.lineWidth = 2; ctx.stroke();
    t += .016;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── FARMING SECTION CANVASES ───────────────────
function initFarmingCanvas(id, type) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  function resize() {
    c.width = c.offsetWidth || 520;
    c.height = c.offsetHeight || 520;
  }
  resize();
  const W = () => c.width, H = () => c.height;
  let t = 0;

  if (type === 'farming') {
    function draw() {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);
      // Sky-to-earth gradient
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#060e03'); sky.addColorStop(.55, '#0d1f06'); sky.addColorStop(.56, '#1f1005'); sky.addColorStop(1, '#140c04');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      // Ground line
      const gy = h * .58;
      // 8 plants
      for (let i = 0; i < 8; i++) {
        const px = w * .08 + i * (w * .12), py = gy;
        const stemH = h * .22 + Math.sin(t * .5 + i) * h * .025 + i * h * .015;
        const sway = Math.sin(t * .6 + i * 1.1) * 8;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.bezierCurveTo(px + sway * .5, py - stemH * .4, px + sway * .8, py - stemH * .7, px + sway, py - stemH);
        const col = `hsl(${95 + i * 6},${55 + i * 3}%,${30 + i * 2}%)`;
        ctx.strokeStyle = col; ctx.lineWidth = 2.5 + Math.sin(i) * .5; ctx.lineCap = 'round'; ctx.stroke();
        // Leaves
        for (let l = 0; l < 3; l++) {
          const lf = .25 + l * .28, lx = px + sway * lf, ly = py - stemH * lf;
          const sw = Math.sin(t * .6 + i + l) * 5;
          ctx.save(); ctx.translate(lx, ly); ctx.rotate((l % 2 ? .5 : -.5) + sw * .02);
          ctx.beginPath(); ctx.ellipse(l % 2 ? 14 : -14, 0, 18, 7, l % 2 ? .3 : -.3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${100 + l * 12},${60 + l * 8}%,${32 + l * 6}%,.85)`; ctx.fill();
          ctx.restore();
        }
        // Seed / fruit at top
        if (i % 3 === 0) {
          ctx.beginPath(); ctx.arc(px + sway, py - stemH, 6 + Math.sin(t + i) * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${30 + i * 20},70%,55%,.8)`; ctx.fill();
        }
      }
      // Sun glow
      const sg = ctx.createRadialGradient(w * .82, h * .1, 0, w * .82, h * .1, 140);
      sg.addColorStop(0, 'rgba(201,160,48,.3)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h);
      // Soil surface
      ctx.fillStyle = 'rgba(40,22,8,.7)'; ctx.fillRect(0, gy, w, h - gy);
      for (let i = 0; i < 25; i++) {
        ctx.beginPath(); ctx.arc(w * .02 + i * w * .04, gy + 8 + Math.sin(i) * 5, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100,60,25,.5)'; ctx.fill();
      }
      t += .012; requestAnimationFrame(draw);
    }
    draw();

  } else if (type === 'vermicompost') {
    function draw() {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * .65);
      bg.addColorStop(0, '#2a1508'); bg.addColorStop(.7, '#130c05'); bg.addColorStop(1, '#0a0704');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      // Rich soil particles
      for (let i = 0; i < 140; i++) {
        const a = i * 2.399 + t * .05, r = 20 + (i % 9) * 28;
        const x = w / 2 + Math.cos(a) * r * (w / 520), y = h / 2 + Math.sin(a) * r * (h / 520);
        const sz = .8 + (i % 4) * .8;
        ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${75 + (i % 30)},${42 + (i % 15)},${18},${.35 + Math.sin(i + t) * .12})`; ctx.fill();
      }
      // Glowing nutrient orbs
      for (let i = 0; i < 22; i++) {
        const a = (i / 22) * Math.PI * 2 + t * .25, r = 55 + Math.sin(t * .8 + i) * 30;
        const x = w / 2 + Math.cos(a) * r, y = h / 2 + Math.sin(a) * r;
        const gr2 = ctx.createRadialGradient(x, y, 0, x, y, 14);
        gr2.addColorStop(0, `rgba(120,184,50,${.6 + Math.sin(t + i) * .2})`);
        gr2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fillStyle = gr2; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 3 + Math.sin(t * 2 + i), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,212,74,${.7 + Math.sin(t + i) * .25})`; ctx.fill();
      }
      // Center glow
      const cg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 120);
      cg.addColorStop(0, 'rgba(80,50,20,.5)'); cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cg; ctx.fillRect(0, 0, w, h);
      // Rotating ring
      ctx.beginPath(); ctx.arc(w / 2, h / 2, 85 + Math.sin(t) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(120,184,50,.12)'; ctx.lineWidth = 1; ctx.stroke();
      t += .01; requestAnimationFrame(draw);
    }
    draw();

  } else if (type === 'worm') {
    const wms = [];
    for (let i = 0; i < 8; i++) wms.push({
      x: Math.random() * 400 + 60, y: Math.random() * 300 + 80,
      vx: (Math.random() - .5) * 1, vy: (Math.random() - .5) * 1,
      phase: Math.random() * Math.PI * 2, hue: 10 + i * 4, len: 5
    });
    function draw() {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#120a04'; ctx.fillRect(0, 0, w, h);
      // Soil layer lines
      for (let ly = 0; ly < h; ly += 55) {
        ctx.fillStyle = `rgba(${35 + ly / h * 20},${20 + ly / h * 8},${8},${.25 + ly / h * .15})`;
        ctx.fillRect(0, ly, w, 55);
      }
      // Pebbles
      for (let i = 0; i < 18; i++) {
        ctx.beginPath(); ctx.ellipse(w * .05 + i * w * .055, h * .12 + (i % 5) * h * .18, 5 + i % 4, 3 + i % 3, i * .3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,50,28,${.4 + (i % 3) * .15})`; ctx.fill();
      }
      wms.forEach(wm => {
        wm.x += wm.vx; wm.y += wm.vy;
        if (wm.x < 50) wm.vx = Math.abs(wm.vx); if (wm.x > w - 50) wm.vx = -Math.abs(wm.vx);
        if (wm.y < 50) wm.vy = Math.abs(wm.vy); if (wm.y > h - 50) wm.vy = -Math.abs(wm.vy);
        const ang = Math.atan2(wm.vy, wm.vx);
        const pts = [];
        for (let s = 0; s < wm.len; s++) {
          const wave = Math.sin(t * 3 + wm.phase + s * .8) * 10;
          pts.push({ x: wm.x - Math.cos(ang) * s * 16 + Math.sin(ang) * wave, y: wm.y - Math.sin(ang) * s * 16 + Math.cos(ang) * wave * -1 });
        }
        if (pts.length < 2) return;
        ctx.shadowColor = `hsla(${wm.hue},60%,50%,.4)`; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.lineWidth = 14; ctx.strokeStyle = `hsl(${wm.hue},60%,42%)`; ctx.lineCap = 'round'; ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, 9, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${wm.hue + 5},62%,50%)`; ctx.fill();
        for (const s of [.45, -.45]) {
          ctx.beginPath(); ctx.arc(pts[0].x + Math.cos(ang + s) * 5, pts[0].y + Math.sin(ang + s) * 5, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#0d0400'; ctx.fill();
        }
      });
      // Badge
      ctx.fillStyle = 'rgba(10,7,3,.85)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(w / 2 - 65, h - 55, 130, 40, 7);
      else ctx.rect(w / 2 - 65, h - 55, 130, 40);
      ctx.fill(); ctx.strokeStyle = 'rgba(120,184,50,.4)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = 'rgba(168,212,74,.95)'; ctx.font = 'bold 14px Cormorant Garamond,serif';
      ctx.textAlign = 'center'; ctx.fillText('2000 Worms / kg', w / 2, h - 30);
      t += .014; requestAnimationFrame(draw);
    }
    draw();
  }
}

// ── PRODUCT MINI CANVASES ───────────────────────
function initProdCanvas(id, type) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  function resize() { c.width = c.offsetWidth || 400; c.height = 200; }
  resize();
  const W = () => c.width, H = () => c.height;
  let t = 0;
  function draw() {
    const w = W(), h = H();
    ctx.clearRect(0, 0, w, h);
    if (type === 'vc') {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#2a1005'); g.addColorStop(.5, '#4a2010'); g.addColorStop(1, '#2a1005');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 80; i++) {
        const a = i * 2.399 + t * .2, r = 15 + (i % 7) * 18;
        ctx.beginPath(); ctx.arc(w / 2 + Math.cos(a) * r * (w / 400), h / 2 + Math.sin(a) * r * (h / 200), .8 + (i % 3) * .7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${80 + i % 30},${45 + i % 20},18,${.35 + Math.sin(i + t) * .1})`; ctx.fill();
      }
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + t * .3, r = 35 + Math.sin(t + i) * 18;
        ctx.beginPath(); ctx.arc(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r * .6, 3 + Math.sin(t * 2 + i), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,184,50,${.55 + Math.sin(t + i) * .2})`; ctx.fill();
      }
    } else if (type === 'ew') {
      ctx.fillStyle = '#160804'; ctx.fillRect(0, 0, w, h);
      const wData = [{ x: w * .14, y: h * .4 }, { x: w * .38, y: h * .6 }, { x: w * .62, y: h * .35 }, { x: w * .86, y: h * .55 }];
      wData.forEach((wd, wi) => {
        const ang = Math.sin(t * .5 + wi) * .5;
        for (let s = 4; s >= 0; s--) {
          const wave = Math.sin(t * 3 + wi + s) * 8;
          const sx = wd.x - Math.cos(ang) * s * 15 + Math.sin(ang) * wave;
          const sy = wd.y - Math.sin(ang) * s * 15 + Math.cos(ang) * wave;
          ctx.beginPath(); ctx.arc(sx, sy, s === 0 ? 8 : 6 - s * .5, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${12 + wi * 5},60%,${40 + s * 4}%)`; ctx.fill();
        }
      });
    } else {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#051a08'); g.addColorStop(1, '#0a2e0e');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 18; i++) {
        const dx = w * .05 + ((i * 55 + t * 40) % (w * 1.1));
        const dy = h * .15 + (i % 5) * h * .16 + Math.sin(t + i) * 10;
        const gr = ctx.createRadialGradient(dx, dy, 0, dx, dy, 16);
        gr.addColorStop(0, `rgba(50,210,90,${.55 + Math.sin(t + i) * .2})`);
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(dx, dy, 16, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        ctx.beginPath(); ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,240,120,${.6 + Math.sin(t * 2 + i) * .2})`; ctx.fill();
      }
    }
    t += .016; requestAnimationFrame(draw);
  }
  draw();
}

// ── SCROLL STORY CANVAS ─────────────────────────
function initStoryCanvas() {
  const c = document.getElementById('storyCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, t = 0, panelIdx = 0;
  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const palettes = [
    [60, 200, 90],   // vermiwash - green
    [50, 140, 220],  // jeevamrit - blue
    [210, 155, 40]   // panchagavya - gold
  ];
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const [r, g, b] = palettes[panelIdx];
    const grad = ctx.createRadialGradient(
      W * .5 + Math.sin(t * .4) * 120, H * .5 + Math.cos(t * .3) * 80, 0,
      W * .5, H * .5, Math.max(W, H) * .75
    );
    grad.addColorStop(0, `rgba(${r * .25},${g * .25},${b * .25},.45)`);
    grad.addColorStop(1, 'rgba(3,5,2,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 50; i++) {
      const a = (i / 50) * Math.PI * 2 + t * (.18 + i * .006);
      const rad = 130 + Math.sin(t * .5 + i) * 70;
      const x = W * .5 + Math.cos(a) * rad * 1.8, y = H * .5 + Math.sin(a) * rad;
      ctx.beginPath(); ctx.arc(x, y, 2.5 + Math.sin(t + i) * 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${.25 + Math.sin(t + i) * .15})`; ctx.fill();
    }
    // Central soft radial
    const cg = ctx.createRadialGradient(W * .5, H * .5, 0, W * .5, H * .5, 250);
    cg.addColorStop(0, `rgba(${r * .35},${g * .35},${b * .35},.3)`);
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cg; ctx.fillRect(0, 0, W, H);
    t += .007; requestAnimationFrame(draw);
  }
  draw();
  // Scroll handler
  const section = document.getElementById('scroll-story');
  const spEls = [document.getElementById('sp0'), document.getElementById('sp1'), document.getElementById('sp2')];
  window.addEventListener('scroll', () => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / total));
    const idx = Math.min(2, Math.floor(progress * 3));
    panelIdx = idx;
    spEls.forEach((p, i) => {
      if (!p) return;
      p.classList.toggle('active', i === idx);
      p.classList.toggle('right', i % 2 === 1);
    });
  });
}

// ── INIT ALL ────────────────────────────────────
function initAllCanvases() {
  initWormHeroCanvas();
  initFarmingCanvas('c-farming', 'farming');
  initFarmingCanvas('c-vc', 'vermicompost');
  initFarmingCanvas('c-worm', 'worm');
  initProdCanvas('pc1', 'vc');
  initProdCanvas('pc2', 'ew');
  initProdCanvas('pc3', 'vw');
  initStoryCanvas();
}

// ── SCROLL REVEAL ───────────────────────────────
const revEls = document.querySelectorAll('.rev,.rev-l,.rev-r');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('vis'), i * 80);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: .08 });
revEls.forEach(el => revObs.observe(el));
