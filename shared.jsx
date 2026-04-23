// Shared visuals: particles background, Frieren silhouette, spell effects

const { useEffect, useRef, useState, useMemo } = React;

// -------- Star / particle field --------
function StarField({ density = 1, color = "#C4B5FD", followCursor = true }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, stars, rafId;
    const mouse = { x: -9999, y: -9999, has: false };

    const rand = (a, b) => a + Math.random() * (b - a);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width * devicePixelRatio;
      h = canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const count = Math.floor((rect.width * rect.height) / 9000 * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.8) * devicePixelRatio,
        vx: rand(-0.15, 0.15),
        vy: rand(-0.15, 0.15),
        baseAlpha: rand(0.2, 0.9),
        twinkle: rand(0.002, 0.012),
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * devicePixelRatio;
      mouse.y = (e.clientY - rect.top) * devicePixelRatio;
      mouse.has = true;
    }
    function onLeave() { mouse.has = false; }

    function tick(t) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;

        // cursor attraction / twinkle
        if (followCursor && mouse.has) {
          const dx = mouse.x - s.x, dy = mouse.y - s.y;
          const d2 = dx * dx + dy * dy;
          const R = 150 * devicePixelRatio;
          if (d2 < R * R) {
            const f = (1 - Math.sqrt(d2) / R) * 0.4;
            s.x += dx * 0.005 * f;
            s.y += dy * 0.005 * f;
          }
        }
        s.phase += s.twinkle * 16;
        const a = s.baseAlpha * (0.5 + 0.5 * Math.sin(s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        // soft glow
        ctx.globalAlpha = a * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density, color, followCursor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// -------- Spell cast on click (ripples + sparks) --------
function SpellCaster({ color = "#C4B5FD" }) {
  const [spells, setSpells] = useState([]);
  useEffect(() => {
    function onClick(e) {
      // Ignore clicks on real interactive elements
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "a" || tag === "button" || tag === "input" || tag === "textarea") return;
      if (e.target.closest && e.target.closest("[data-no-spell]")) return;
      const id = Math.random().toString(36).slice(2);
      const sparks = Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 2 + Math.random() * 0.3,
        dist: 40 + Math.random() * 60,
        delay: Math.random() * 80,
      }));
      setSpells(s => [...s, { id, x: e.clientX, y: e.clientY, sparks }]);
      setTimeout(() => setSpells(s => s.filter(x => x.id !== id)), 1100);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {spells.map(sp => (
        <div key={sp.id} style={{ position: "absolute", left: sp.x, top: sp.y }}>
          {/* magic circle */}
          <div
            style={{
              position: "absolute",
              left: -40, top: -40,
              width: 80, height: 80,
              border: `1.5px solid ${color}`,
              borderRadius: "50%",
              animation: "spellRing 900ms ease-out forwards",
              boxShadow: `0 0 20px ${color}80`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -28, top: -28,
              width: 56, height: 56,
              border: `1px solid ${color}`,
              borderRadius: "50%",
              animation: "spellRing 900ms ease-out 80ms forwards",
              opacity: 0.7,
            }}
          />
          {/* six-point star */}
          <svg width="60" height="60" style={{ position: "absolute", left: -30, top: -30, animation: "spellStar 1100ms ease-out forwards" }}>
            <polygon points="30,4 36,22 54,22 39,33 45,52 30,41 15,52 21,33 6,22 24,22" fill="none" stroke={color} strokeWidth="1" />
          </svg>
          {/* sparks */}
          {sp.sparks.map((sk, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                width: 3, height: 3,
                background: color,
                borderRadius: "50%",
                boxShadow: `0 0 8px ${color}`,
                animation: `spellSpark 900ms ${sk.delay}ms ease-out forwards`,
                ["--sx"]: `${Math.cos(sk.angle) * sk.dist}px`,
                ["--sy"]: `${Math.sin(sk.angle) * sk.dist}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// -------- Frieren silhouette (stylized SVG) --------
function FrierenSilhouette({ size = 240, animate = true, theme = "night" }) {
  // A stylized silhouette: long hair, cape, pointed ears. Not a portrait — an emblem.
  const hair = theme === "night" ? "#E9D5FF" : "#F5F3FF";
  const skin = theme === "night" ? "#1E1B4B" : "#312E81";
  const cape = theme === "night" ? "#4C1D95" : "#6D28D9";
  const accent = "#C4B5FD";

  return (
    <svg
      viewBox="0 0 240 300"
      width={size}
      height={(size * 300) / 240}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hair} />
          <stop offset="100%" stopColor="#A5B4FC" />
        </linearGradient>
        <linearGradient id="capeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cape} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id="blurGlow"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      {/* halo glow */}
      <circle cx="120" cy="110" r="95" fill="url(#glow)" />

      {/* cape back */}
      <path
        d="M 60 150 Q 40 230 55 295 L 185 295 Q 200 230 180 150 Q 150 170 120 170 Q 90 170 60 150 Z"
        fill="url(#capeGrad)"
      >
        {animate && <animate attributeName="d" dur="8s" repeatCount="indefinite"
          values="M 60 150 Q 40 230 55 295 L 185 295 Q 200 230 180 150 Q 150 170 120 170 Q 90 170 60 150 Z;
                  M 58 150 Q 38 228 57 295 L 183 295 Q 202 228 182 150 Q 150 172 120 172 Q 90 172 58 150 Z;
                  M 60 150 Q 40 230 55 295 L 185 295 Q 200 230 180 150 Q 150 170 120 170 Q 90 170 60 150 Z" />}
      </path>

      {/* shoulders / robe base */}
      <path d="M 75 165 Q 90 155 120 155 Q 150 155 165 165 L 170 200 Q 145 195 120 195 Q 95 195 70 200 Z" fill={skin} />

      {/* long hair — twin tails */}
      <path
        d="M 70 90 Q 55 150 52 230 Q 60 260 70 270 Q 72 200 82 160 Z"
        fill="url(#hairGrad)"
      />
      <path
        d="M 170 90 Q 185 150 188 230 Q 180 260 170 270 Q 168 200 158 160 Z"
        fill="url(#hairGrad)"
      />

      {/* head */}
      <ellipse cx="120" cy="105" rx="38" ry="44" fill="#EDE9FE" />

      {/* front hair / bangs */}
      <path
        d="M 82 90 Q 95 70 120 68 Q 145 70 158 90 Q 152 95 145 92 Q 135 82 120 82 Q 105 82 95 92 Q 88 95 82 90 Z"
        fill="url(#hairGrad)"
      />
      <path d="M 110 68 Q 115 95 120 100 Q 125 95 130 68 Q 120 62 110 68 Z" fill="url(#hairGrad)" />

      {/* pointed ears */}
      <path d="M 80 108 L 70 95 L 84 105 Z" fill="#EDE9FE" />
      <path d="M 160 108 L 170 95 L 156 105 Z" fill="#EDE9FE" />

      {/* closed/calm eyes */}
      <path d="M 100 112 Q 108 108 116 112" stroke="#4C1D95" strokeWidth="2" fill="none" strokeLinecap="round">
        {animate && <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M 100 112 Q 108 108 116 112;
                  M 100 113 Q 108 110 116 113;
                  M 100 112 Q 108 108 116 112" />}
      </path>
      <path d="M 124 112 Q 132 108 140 112" stroke="#4C1D95" strokeWidth="2" fill="none" strokeLinecap="round">
        {animate && <animate attributeName="d" dur="4s" repeatCount="indefinite"
          values="M 124 112 Q 132 108 140 112;
                  M 124 113 Q 132 110 140 113;
                  M 124 112 Q 132 108 140 112" />}
      </path>

      {/* tiny star on chest */}
      <g transform="translate(120 180)">
        <polygon points="0,-6 2,-2 6,-2 3,1 4,5 0,3 -4,5 -3,1 -6,-2 -2,-2" fill={accent}>
          {animate && <animate attributeName="opacity" dur="3s" repeatCount="indefinite"
            values="0.4;1;0.4" />}
        </polygon>
      </g>

      {/* floating sparkles */}
      {animate && (
        <>
          <circle cx="55" cy="60" r="1.5" fill={accent}>
            <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0;1;0" />
            <animate attributeName="cy" dur="6s" repeatCount="indefinite" values="60;40;60" />
          </circle>
          <circle cx="195" cy="80" r="1" fill={accent}>
            <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0;1;0" />
            <animate attributeName="cy" dur="7s" repeatCount="indefinite" values="80;60;80" />
          </circle>
          <circle cx="30" cy="130" r="1.2" fill={accent}>
            <animate attributeName="opacity" dur="5s" repeatCount="indefinite" values="0;1;0" />
          </circle>
          <circle cx="210" cy="140" r="1.2" fill={accent}>
            <animate attributeName="opacity" dur="4.5s" repeatCount="indefinite" values="0;1;0" />
          </circle>
        </>
      )}
    </svg>
  );
}

// -------- Magic circle (decorative) --------
function MagicCircle({ size = 120, color = "#C4B5FD", spin = true }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      style={{
        animation: spin ? "mcSpin 30s linear infinite" : "none",
      }}
    >
      <g fill="none" stroke={color} strokeWidth="0.8">
        <circle cx="60" cy="60" r="55" />
        <circle cx="60" cy="60" r="46" />
        <circle cx="60" cy="60" r="36" opacity="0.6" />
        <circle cx="60" cy="60" r="24" opacity="0.5" />
        {/* hex */}
        <polygon points="60,16 96,38 96,82 60,104 24,82 24,38" />
        {/* inverted triangle */}
        <polygon points="60,28 92,80 28,80" opacity="0.6" />
        <polygon points="60,92 28,40 92,40" opacity="0.6" />
        {/* ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = 60 + Math.cos(a) * 50;
          const y1 = 60 + Math.sin(a) * 50;
          const x2 = 60 + Math.cos(a) * 55;
          const y2 = 60 + Math.sin(a) * 55;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
}

// -------- Runic divider --------
function Divider({ color = "#818CF8" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
      <svg width="20" height="20" viewBox="0 0 20 20">
        <polygon points="10,2 12,8 18,10 12,12 10,18 8,12 2,10 8,8" fill={color} opacity="0.9" />
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
    </div>
  );
}

Object.assign(window, { StarField, SpellCaster, FrierenSilhouette, MagicCircle, Divider });

