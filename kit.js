/* Shared helpers for the Mathe games: storage, language, sound, voice, confetti, number pad, level screen. */
(() => {
  'use strict';

  /* ---------- Storage (private windows may throw) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    json(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  };

  /* ---------- Language (shared with Island Hopper via the same key) ---------- */
  let lang = store.get('ih-lang', 'en');
  if (lang !== 'en' && lang !== 'de') lang = 'en';
  const FLAGS = { en: '🇬🇧 EN', de: '🇩🇪 DE' };
  const langButtons = [];
  function renderLangButtons() {
    langButtons.forEach(b => { b.textContent = FLAGS[lang]; });
    document.documentElement.lang = lang;
  }
  function bindLangButton(btn, onChange) {
    langButtons.push(btn);
    renderLangButtons();
    btn.addEventListener('click', () => {
      lang = lang === 'en' ? 'de' : 'en';
      store.set('ih-lang', lang);
      renderLangButtons();
      hush();
      if (onChange) onChange(lang);
    });
  }

  /* ---------- Sound (Web Audio synth, no files needed) ---------- */
  let ctx = null;
  function audio() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(type, f0, f1, dur, vol = 0.3, delay = 0) {
    const a = audio(); if (!a) return;
    const t = a.currentTime + delay;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur, f0, f1, vol, type = 'bandpass', delay = 0) {
    const a = audio(); if (!a) return;
    const t = a.currentTime + delay;
    const buf = a.createBuffer(1, Math.floor(a.sampleRate * dur), a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource(); src.buffer = buf;
    const f = a.createBiquadFilter(); f.type = type; f.Q.value = 1.2;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(a.destination); src.start(t);
  }
  const sfx = {
    tap() { tone('sine', 660, 880, 0.08, 0.15); },
    boing(k = 1) { tone('sine', 180, 620 + 160 * k, 0.24 + 0.06 * k, 0.4); tone('triangle', 360, 800 + 200 * k, 0.2 + 0.05 * k, 0.15, 0.03); },
    whoosh() { noise(0.45, 2400, 300, 0.5); tone('sine', 700, 160, 0.35, 0.1); },
    splash() { noise(0.6, 900, 120, 0.55, 'lowpass'); tone('sine', 420, 90, 0.35, 0.2); },
    bonk() { tone('square', 160, 70, 0.18, 0.16); tone('sine', 90, 60, 0.25, 0.28, 0.02); },
    clack() { tone('triangle', 520, 300, 0.09, 0.3); noise(0.12, 1800, 700, 0.25); tone('sine', 1040, 1040, 0.18, 0.1, 0.06); },
    rumble() { noise(1.3, 220, 40, 0.8, 'lowpass'); tone('sawtooth', 70, 40, 1.1, 0.12); },
    ding() { tone('sine', 1320, 1320, 0.25, 0.18); tone('sine', 1760, 1760, 0.3, 0.12, 0.08); },
    win() {
      [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone('triangle', f, f * 1.01, 0.22, 0.28, i * 0.11));
      [1568, 2093, 2637].forEach((f, i) => tone('sine', f, f, 0.15, 0.08, 0.8 + i * 0.07));
    },
    perfect() { [1319, 1568, 2093, 2637].forEach((f, i) => tone('sine', f, f, 0.2, 0.12, 1.1 + i * 0.09)); }
  };

  /* ---------- Voice (children may not read yet) ---------- */
  function speak(text) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith(lang));
      if (v) u.voice = v;
      u.lang = lang === 'de' ? 'de-DE' : 'en-US';
      u.rate = 0.95; u.pitch = 1.3;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function hush() { try { speechSynthesis.cancel(); } catch (e) {} }
  if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); } catch (e) {} }

  /* ---------- Small DOM helpers ---------- */
  function restart(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  const pick = arr => arr[(Math.random() * arr.length) | 0];
  const rand = (lo, hi) => lo + ((Math.random() * (hi - lo + 1)) | 0);

  /* ---------- Stars per game & level ---------- */
  function stars(key, levels) {
    const a = store.json(key, []);
    return Array.from({ length: levels }, (_, i) => +a[i] || 0);
  }
  function addStars(key, levels, level, n) {
    const a = stars(key, levels);
    a[level] += n;
    store.set(key, JSON.stringify(a));
    return a[level];
  }

  /* ---------- Confetti (also used for volcano lava) ---------- */
  const confetti = (() => {
    let cv = null, c = null, parts = [], running = false;
    const COLORS = ['#FFC83D', '#FF6FB5', '#5EF08A', '#6FC8FF', '#C88BFF', '#FF6B6E', '#FFFFFF'];
    const EMOJI = ['⭐', '🎉', '✨', '🌟'];
    function ensure() {
      if (cv) return;
      cv = document.createElement('canvas'); cv.className = 'kit-confetti';
      document.body.appendChild(cv); c = cv.getContext('2d');
      const resize = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; };
      addEventListener('resize', resize); resize();
    }
    // origins: [{x, y, ang, spread, speed}] in CSS pixels; ang in radians (−π/2 = straight up)
    function burst({ count = 90, origins, colors = COLORS, emoji = EMOJI, round = false, gravity = 0.25 } = {}) {
      ensure();
      const W = innerWidth, H = innerHeight;
      origins = origins || [
        { x: W * 0.15, y: H, ang: -Math.PI / 2 + 0.35, spread: 1.1, speed: 11 },
        { x: W * 0.85, y: H, ang: -Math.PI / 2 - 0.35, spread: 1.1, speed: 11 },
        { x: W * 0.5, y: H * 0.35, ang: 0, spread: Math.PI * 2, speed: 4 }
      ];
      for (const o of origins) {
        for (let i = 0; i < count; i++) {
          const ang = o.ang + (Math.random() - 0.5) * o.spread;
          const sp = o.speed + Math.random() * 9;
          parts.push({
            x: o.x, y: o.y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, g: gravity,
            r: 5 + Math.random() * 7, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
            color: colors[(Math.random() * colors.length) | 0], round,
            emoji: emoji && Math.random() < 0.12 ? emoji[(Math.random() * emoji.length) | 0] : null,
            life: 0, max: 150 + Math.random() * 80
          });
        }
      }
      if (!running) { running = true; requestAnimationFrame(tick); }
    }
    function tick() {
      const dpr = devicePixelRatio;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, innerWidth, innerHeight);
      parts = parts.filter(p => p.life < p.max && p.y < innerHeight + 40);
      for (const p of parts) {
        p.life++; p.vy += p.g; p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        c.save(); c.translate(p.x, p.y); c.rotate(p.rot);
        c.globalAlpha = Math.max(0, 1 - p.life / p.max);
        if (p.emoji) { c.font = `${p.r * 4}px serif`; c.fillText(p.emoji, -p.r * 2, p.r); }
        else if (p.round) { c.fillStyle = p.color; c.beginPath(); c.arc(0, 0, p.r * 0.8, 0, Math.PI * 2); c.fill(); }
        else { c.fillStyle = p.color; c.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); }
        c.restore();
      }
      if (parts.length) requestAnimationFrame(tick);
      else { running = false; c.clearRect(0, 0, innerWidth, innerHeight); }
    }
    return { burst };
  })();

  /* ---------- Big celebration: flash, giant text, confetti, fanfare ---------- */
  let flashEl = null, yayEl = null;
  function celebrate({ text, say, perfect = false, confettiMult = 1 } = {}) {
    if (!flashEl) {
      flashEl = document.createElement('div'); flashEl.className = 'kit-flash';
      yayEl = document.createElement('div'); yayEl.className = 'kit-yay';
      document.body.append(flashEl, yayEl);
    }
    yayEl.textContent = text;
    restart(yayEl, 'show');
    restart(flashEl, 'on');
    sfx.win(); if (perfect) sfx.perfect();
    confetti.burst({ count: Math.round(90 * confettiMult) });
    speak(say);
  }

  /* ---------- Number pad: big colourful bubbles 0..max ---------- */
  function numberPad(el, max, onPick) {
    el.innerHTML = '';
    el.classList.toggle('big', max > 10);
    const btns = [];
    for (let n = 0; n <= max; n++) {
      const b = document.createElement('button');
      b.textContent = n; b.setAttribute('aria-label', String(n));
      b.addEventListener('pointerdown', e => { e.preventDefault(); audio(); onPick(n, b); });
      b.addEventListener('click', e => { if (e.detail === 0) onPick(n, b); }); // keyboard Enter/Space
      el.appendChild(b); btns.push(b);
    }
    return {
      enable(on) { el.classList.toggle('off', !on); },
      markWrong(n) { if (btns[n]) { btns[n].classList.add('wrong'); } },
      clearMarks() { btns.forEach(b => b.classList.remove('wrong')); }
    };
  }

  /* ---------- Level screen tiles ---------- */
  // levels: [{icon, chips:[{t, cls}]}], got: stars array
  function levelTiles(el, levels, got, current, onStart) {
    el.innerHTML = '';
    levels.forEach((lv, i) => {
      const b = document.createElement('button');
      b.className = 'level' + (i === current ? ' last' : '');
      b.setAttribute('aria-label', 'Level ' + (i + 1));
      b.innerHTML = `<span class="ico">${lv.icon}</span>` +
        `<span class="chips">${lv.chips.map(c => `<span class="chip ${c.cls || ''}">${c.t}</span>`).join('')}</span>` +
        `<span class="got">⭐ ${got[i]}</span>`;
      b.addEventListener('click', () => { audio(); onStart(i); });
      el.appendChild(b);
    });
  }

  window.Kit = {
    store, get lang() { return lang; }, bindLangButton,
    audio, sfx, speak, hush,
    restart, pick, rand,
    stars, addStars,
    confetti, celebrate, numberPad, levelTiles
  };
})();
