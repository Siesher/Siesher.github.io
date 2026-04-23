// Variant 1: Grimoire — minimalist editorial "book" layout with Frieren image
const { useState: useStateG, useEffect: useEffectG } = React;

function Grimoire({ lang = "ru", theme = "night", fontMode = "modern", particleDensity = 0.5 }) {
  const [spread, setSpread] = useStateG(0);
  const [hovered, setHovered] = useStateG(null);

  const P = window.PROFILE;
  const L = (o) => (typeof o === "string" ? o : o[lang]);

  const isNight = theme === "night";
  // Minimalist ice palette
  const bg = isNight ? "#0C1424" : "#F5F7FB";
  const surface = isNight ? "#131C30" : "#FFFFFF";
  const border = isNight ? "#1F2A45" : "#E4E9F2";
  const ink = isNight ? "#E6EDF7" : "#1A2238";
  const inkSoft = isNight ? "#8EA1C4" : "#4A5878";
  const muted = isNight ? "#5B6B8A" : "#8A96AE";
  const accent = isNight ? "#8FB8E8" : "#4A7BB8";

  const fontTitle = fontMode === "gothic" ? "'UnifrakturCook', serif"
    : fontMode === "handwritten" ? "'Tangerine', cursive"
    : "'Cormorant Garamond', serif";
  const fontBody = "'Inter', sans-serif";
  const fontMono = "'Fira Code', monospace";

  const spreads = [
    { id: "cover",   labelRu: "Обложка",    labelEn: "Cover" },
    { id: "profile", labelRu: "Профиль",    labelEn: "Profile" },
    { id: "spells",  labelRu: "Проекты",    labelEn: "Projects" },
    { id: "journey", labelRu: "Путь",       labelEn: "Journey" },
  ];

  return (
    <div style={{
      position: "relative", width: "100%", minHeight: "100vh",
      background: bg, color: ink, fontFamily: fontBody, overflow: "hidden",
    }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.5 }}>
        <window.StarField density={particleDensity} color={accent} />
      </div>

      {/* Top bar */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "80px 8vw 20px",
      }}>
        <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 4, color: muted }}>
          ✦ @{P.handle.toUpperCase()}
        </div>
        <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 4, color: muted }}>
          {String(spread + 1).padStart(2, "0")} / {String(spreads.length).padStart(2, "0")}
        </div>
      </div>

      {/* Chapter nav */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", gap: 24, padding: "0 8vw 40px",
        borderBottom: `1px solid ${border}`, marginBottom: 60,
      }}>
        {spreads.map((sp, i) => (
          <button key={sp.id} data-no-spell onClick={() => setSpread(i)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            padding: "8px 0",
            fontFamily: fontMono, fontSize: 11, letterSpacing: 2,
            color: i === spread ? ink : muted,
            borderBottom: i === spread ? `1px solid ${accent}` : "1px solid transparent",
            marginBottom: -1,
            transition: "all .25s",
          }}>
            {String(i + 1).padStart(2, "0")} · {(lang === "ru" ? sp.labelRu : sp.labelEn).toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0 8vw 120px" }}>
        {spread === 0 && <CoverPage {...{ P, L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, bg }} />}
        {spread === 1 && <ProfilePage {...{ P, L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, surface, bg }} />}
        {spread === 2 && <SpellsPage {...{ L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, surface, bg, hovered, setHovered }} />}
        {spread === 3 && <JourneyPage {...{ P, L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, surface, bg }} />}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 80, paddingTop: 30, borderTop: `1px solid ${border}` }}>
          <button data-no-spell onClick={() => setSpread(s => Math.max(s - 1, 0))} disabled={spread === 0}
            style={navBtn(ink, muted, spread === 0, fontMono)}>
            ← {lang === "ru" ? "НАЗАД" : "PREV"}
          </button>
          <button data-no-spell onClick={() => setSpread(s => Math.min(s + 1, spreads.length - 1))} disabled={spread === spreads.length - 1}
            style={navBtn(ink, muted, spread === spreads.length - 1, fontMono)}>
            {lang === "ru" ? "ДАЛЕД" : "NEXT"} →
          </button>
        </div>
      </div>
    </div>
  );
}

function navBtn(ink, muted, disabled, fontMono) {
  return {
    background: "transparent", border: "none",
    fontFamily: fontMono, fontSize: 11, letterSpacing: 3,
    color: disabled ? muted : ink,
    opacity: disabled ? 0.35 : 1,
    cursor: disabled ? "default" : "pointer",
    padding: "8px 0",
  };
}

// ---------- COVER ----------
function CoverPage({ P, L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, bg }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "60vh" }}>
      <div style={{
        position: "relative",
        height: "min(70vh, 620px)",
        borderRadius: 2,
        overflow: "hidden",
        backgroundImage: "url('frieren.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, transparent 60%, ${bg}cc 100%)`,
        }} />
      </div>

      <div>
        <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 4, color: muted }}>
          {lang === "ru" ? "ВИЗИТКА · MMXXVI" : "CARD · MMXXVI"}
        </div>
        <div style={{ fontFamily: fontTitle, fontSize: "clamp(60px, 8vw, 120px)", lineHeight: 0.92, color: ink, marginTop: 22, fontWeight: 400, letterSpacing: -2 }}>
          {lang === "ru" ? P.nameRu : P.nameEn}
        </div>
        <div style={{ fontFamily: fontBody, fontSize: "clamp(15px, 1.3vw, 18px)", color: accent, marginTop: 16, fontWeight: 500, letterSpacing: 0.5 }}>
          {L(P.title)}
        </div>
        <div style={{ height: 1, background: border, width: 60, margin: "32px 0" }} />
        <div style={{ fontSize: 16, color: inkSoft, lineHeight: 1.7, fontWeight: 300, maxWidth: 480 }}>
          {L({ ru: P.bioRu, en: P.bioEn })}
        </div>
        <div style={{ fontFamily: fontTitle, fontSize: 22, color: inkSoft, fontStyle: "italic", marginTop: 28, lineHeight: 1.4, maxWidth: 480 }}>
          {lang === "ru" ? P.quoteRu : P.quoteEn}
        </div>
      </div>
    </div>
  );
}

// ---------- PROFILE ----------
function ProfilePage({ P, L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, surface, bg }) {
  return (
    <div>
      <PageHeader num="01" title={lang === "ru" ? "Профиль" : "Profile"} sub={lang === "ru" ? "кто я" : "about"} {...{ fontTitle, fontMono, muted, accent, ink, border }} />

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, marginTop: 60, alignItems: "start" }}>
        <div>
          <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted }}>{lang === "ru" ? "ИМЯ" : "NAME"}</div>
          <div style={{ fontFamily: fontTitle, fontSize: 48, color: ink, marginTop: 6, fontWeight: 400, letterSpacing: -0.5 }}>
            {lang === "ru" ? P.nameRu : P.nameEn} <span style={{ color: muted, fontSize: 24 }}>· @{P.handle}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 18, marginTop: 40, fontSize: 14 }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, paddingTop: 2 }}>{lang === "ru" ? "РОЛЬ" : "ROLE"}</div>
            <div style={{ color: ink }}>{L(P.role)}</div>
            <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, paddingTop: 2 }}>{lang === "ru" ? "ОБРАЗОВАНИЕ" : "EDUCATION"}</div>
            <div style={{ color: ink }}>{L(P.edu)}</div>
            <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, paddingTop: 2 }}>{lang === "ru" ? "EMAIL" : "EMAIL"}</div>
            <a href={`mailto:${P.contacts.email}`} style={{ color: accent, textDecoration: "none" }}>{P.contacts.email}</a>
            <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, paddingTop: 2 }}>TELEGRAM</div>
            <a href={P.contacts.telegramUrl} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: "none" }}>{P.contacts.telegram}</a>
            <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, paddingTop: 2 }}>GITHUB</div>
            <a href={P.contacts.githubUrl} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: "none" }}>@{P.contacts.github}</a>
          </div>

          <div style={{ marginTop: 48 }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, marginBottom: 16 }}>{lang === "ru" ? "СТЕК" : "STACK"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
              {window.SKILLS.slice(0, 8).map((sk, i) => (
                <div key={sk.name} style={{ display: "grid", gridTemplateColumns: "160px 1fr 40px", gap: 14, alignItems: "center", fontSize: 13 }}>
                  <div style={{ color: ink }}>{sk.name}</div>
                  <div style={{ height: 2, background: border, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${sk.level}%`, background: accent, animation: `barFill 1s ${i * 40}ms ease-out both` }} />
                  </div>
                  <div style={{ fontFamily: fontMono, fontSize: 10, color: muted, textAlign: "right" }}>{sk.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          position: "relative",
          height: "min(70vh, 560px)",
          borderRadius: 2,
          overflow: "hidden",
          backgroundImage: "url('frieren.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(180deg, transparent 70%, ${bg} 100%)`,
          }} />
        </div>
      </div>
    </div>
  );
}

// ---------- SPELLS (projects) ----------
function SpellsPage({ L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, surface, bg, hovered, setHovered }) {
  return (
    <div>
      <PageHeader num="02" title={lang === "ru" ? "Проекты" : "Projects"} sub={lang === "ru" ? "публичные репозитории" : "public repositories"} {...{ fontTitle, fontMono, muted, accent, ink, border }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 60 }}>
        {window.PROJECTS.map((p) => (
          <a key={p.id} href={`https://github.com/Siesher/${p.repo}`} target="_blank" rel="noreferrer"
            onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}
            style={{
              display: "block", padding: "26px 26px 22px",
              background: hovered === p.id ? surface : "transparent",
              border: `1px solid ${hovered === p.id ? accent : border}`,
              borderRadius: 2,
              textDecoration: "none", color: ink,
              transition: "all .25s",
              transform: hovered === p.id ? "translateY(-3px)" : "none",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 2, color: muted }}>
                {p.repo}
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 10, color: accent, opacity: hovered === p.id ? 1 : 0.4, transition: "all .25s" }}>↗</div>
            </div>
            <div style={{ fontFamily: fontTitle, fontSize: 28, fontWeight: 400, color: ink, marginTop: 16, letterSpacing: -0.3 }}>{L(p.name)}</div>
            <div style={{ fontFamily: fontBody, fontSize: 13, color: accent, marginTop: 2, fontWeight: 500 }}>{L(p.tag)}</div>
            <div style={{ fontSize: 14, color: inkSoft, marginTop: 14, lineHeight: 1.6, fontWeight: 300 }}>{L(p.desc)}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontFamily: fontMono, fontSize: 10, padding: "3px 8px", border: `1px solid ${border}`, color: inkSoft, borderRadius: 2 }}>{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------- JOURNEY ----------
function JourneyPage({ P, L, lang, fontTitle, fontBody, fontMono, ink, inkSoft, muted, accent, border, surface, bg }) {
  return (
    <div>
      <PageHeader num="03" title={lang === "ru" ? "Путь" : "Journey"} sub={lang === "ru" ? "опыт и контакты" : "experience & contacts"} {...{ fontTitle, fontMono, muted, accent, ink, border }} />

      <div style={{ marginTop: 60, maxWidth: 900 }}>
        {window.EXPERIENCE.map((e, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "160px 1fr",
            gap: 48, padding: "30px 0",
            borderTop: `1px solid ${border}`,
            borderBottom: i === window.EXPERIENCE.length - 1 ? `1px solid ${border}` : "none",
          }}>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: accent, letterSpacing: 2, paddingTop: 4 }}>
              {lang === "ru" ? e.whenRu : e.when}
            </div>
            <div>
              <div style={{ fontFamily: fontTitle, fontSize: 28, color: ink, fontWeight: 400, letterSpacing: -0.3 }}>{L(e.role)}</div>
              <div style={{ fontFamily: fontBody, fontSize: 14, color: accent, marginTop: 4, fontWeight: 500 }}>{L(e.org)}</div>
              <div style={{ fontSize: 14, color: inkSoft, marginTop: 10, lineHeight: 1.6, fontWeight: 300 }}>{L(e.desc)}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 100 }}>
        <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted }}>— {lang === "ru" ? "СВЯЗАТЬСЯ" : "GET IN TOUCH"} —</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, marginTop: 24, background: border, border: `1px solid ${border}` }}>
          {[
            { t: P.contacts.email,    u: `mailto:${P.contacts.email}`, lbl: "E-MAIL" },
            { t: P.contacts.telegram, u: P.contacts.telegramUrl,       lbl: "TELEGRAM" },
            { t: "@" + P.contacts.github, u: P.contacts.githubUrl,     lbl: "GITHUB" },
          ].map(c => (
            <a key={c.lbl} href={c.u} target="_blank" rel="noreferrer"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "22px 24px", background: bg,
                textDecoration: "none", color: ink, transition: "all .25s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = surface}
              onMouseLeave={e => e.currentTarget.style.background = bg}>
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted }}>{c.lbl}</div>
                <div style={{ fontFamily: fontBody, fontSize: 15, color: ink, marginTop: 4 }}>{c.t}</div>
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 12, color: accent }}>↗</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageHeader({ num, title, sub, fontTitle, fontMono, muted, accent, ink, border }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 3, color: accent }}>— {num} —</div>
        <div style={{ flex: 1, height: 1, background: border }} />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
        <div style={{ fontFamily: fontTitle, fontSize: "clamp(48px, 6vw, 84px)", color: ink, fontWeight: 400, letterSpacing: -1, lineHeight: 1 }}>{title}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: muted, fontStyle: "italic" }}>/ {sub}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Grimoire });

