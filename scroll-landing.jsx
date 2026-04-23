// Variant 3: Scroll — minimalist ice-blue layout with Frieren image
function ScrollLanding({ lang = "ru", theme = "night", fontMode = "modern", particleDensity = 0.5 }) {
  const P = window.PROFILE;
  const L = (o) => (typeof o === "string" ? o : o[lang]);

  const isNight = theme === "night";
  // Minimalist palette — cold ice blue / soft white
  const bg = isNight ? "#0C1424" : "#F5F7FB";
  const surface = isNight ? "#131C30" : "#FFFFFF";
  const border = isNight ? "#1F2A45" : "#E4E9F2";
  const ink = isNight ? "#E6EDF7" : "#1A2238";
  const inkSoft = isNight ? "#8EA1C4" : "#4A5878";
  const muted = isNight ? "#5B6B8A" : "#8A96AE";
  const accent = isNight ? "#8FB8E8" : "#4A7BB8";
  const accentSoft = isNight ? "#B9D1EC" : "#6E97C9";

  const fontTitle = fontMode === "gothic" ? "'UnifrakturCook', serif"
    : fontMode === "handwritten" ? "'Tangerine', cursive"
    : "'Cormorant Garamond', serif";
  const fontBody = "'Inter', 'Cormorant Garamond', sans-serif";
  const fontMono = "'Fira Code', monospace";

  return (
    <div style={{
      position: "relative", width: "100%", minHeight: "100vh",
      background: bg, color: ink, fontFamily: fontBody,
      overflow: "hidden",
    }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.6 }}>
        <window.StarField density={particleDensity} color={accent} />
      </div>

      {/* HERO — split layout: image on left, text on right */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 0,
        zIndex: 1,
      }}>
        {/* Frieren image */}
        <div style={{
          position: "relative",
          backgroundImage: "url('frieren.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: isNight
              ? "linear-gradient(90deg, transparent 40%, #0C1424 100%)"
              : "linear-gradient(90deg, transparent 40%, #F5F7FB 100%)",
          }} />
          <div style={{
            position: "absolute", top: 40, left: 40,
            fontFamily: fontMono, fontSize: 11, letterSpacing: 4, color: accentSoft,
          }}>
            ✦ @{P.handle.toUpperCase()}
          </div>
        </div>

        {/* Text */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px 8vw 80px 6vw", maxWidth: 640,
        }}>
          <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 4, color: muted }}>
            ✦ {lang === "ru" ? "ВИЗИТКА" : "BUSINESS CARD"}
          </div>
          <div style={{ fontFamily: fontTitle, fontSize: "clamp(56px, 7vw, 96px)", color: ink, lineHeight: 0.95, marginTop: 20, fontWeight: 400, letterSpacing: -1 }}>
            {lang === "ru" ? P.nameRu : P.nameEn}
          </div>
          <div style={{ fontFamily: fontBody, fontSize: "clamp(16px, 1.3vw, 19px)", color: accent, marginTop: 14, letterSpacing: 0.5, fontWeight: 500 }}>
            {L(P.title)}
          </div>
          <div style={{ height: 1, background: border, marginTop: 32, marginBottom: 28, width: 80 }} />
          <div style={{ fontSize: 16, color: inkSoft, lineHeight: 1.7, fontWeight: 300 }}>
            {L({ ru: P.bioRu, en: P.bioEn })}
          </div>
          <div style={{ marginTop: 20, fontFamily: fontTitle, fontSize: 20, color: inkSoft, fontStyle: "italic", lineHeight: 1.5, opacity: 0.85 }}>
            {lang === "ru" ? P.quoteRu : P.quoteEn}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 36 }}>
            <a href={P.contacts.telegramUrl} target="_blank" rel="noreferrer"
              style={{
                padding: "12px 22px", background: accent, color: bg,
                fontFamily: fontBody, fontSize: 13, letterSpacing: 2, fontWeight: 500,
                borderRadius: 2, textDecoration: "none",
                transition: "all .25s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = accentSoft}
              onMouseLeave={e => e.currentTarget.style.background = accent}>
              {lang === "ru" ? "НАПИСАТЬ" : "MESSAGE"}
            </a>
            <a href={P.contacts.githubUrl} target="_blank" rel="noreferrer"
              style={{
                padding: "12px 22px", background: "transparent", color: ink,
                border: `1px solid ${border}`,
                fontFamily: fontBody, fontSize: 13, letterSpacing: 2, fontWeight: 500,
                borderRadius: 2, textDecoration: "none",
                transition: "all .25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = ink; }}>
              GITHUB ↗
            </a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ position: "relative", padding: "120px 8vw", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
        <SectionTitle num="01" title={lang === "ru" ? "СТЕК" : "STACK"} sub={lang === "ru" ? "школы магии" : "schools of magic"}
          {...{ fontTitle, fontMono, muted, accent, ink, border }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 1, marginTop: 50, background: border }}>
          {window.SKILLS.map((sk, i) => (
            <div key={sk.name} style={{
              padding: "24px 22px",
              background: bg,
              transition: "all .3s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = surface}
            onMouseLeave={e => e.currentTarget.style.background = bg}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontFamily: fontBody, fontSize: 16, color: ink, fontWeight: 500 }}>{sk.name}</div>
                <div style={{ fontFamily: fontMono, fontSize: 11, color: accent }}>{sk.level}</div>
              </div>
              <div style={{ height: 2, background: border, marginTop: 14, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${sk.level}%`,
                  background: accent,
                  animation: `barFill 1.2s ${i * 50}ms ease-out both`,
                }} />
              </div>
              <div style={{ fontFamily: fontBody, fontSize: 12, color: muted, marginTop: 10, letterSpacing: 0.3 }}>{sk.school}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ position: "relative", padding: "60px 8vw 120px", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
        <SectionTitle num="02" title={lang === "ru" ? "ПРОЕКТЫ" : "PROJECTS"} sub={lang === "ru" ? "заклинания в гримуаре" : "spells in the grimoire"}
          {...{ fontTitle, fontMono, muted, accent, ink, border }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 50 }}>
          {window.PROJECTS.map((p) => (
            <a key={p.id} href={`https://github.com/Siesher/${p.repo}`} target="_blank" rel="noreferrer"
              style={{
                display: "block", padding: "26px 26px 22px",
                background: surface,
                border: `1px solid ${border}`,
                borderRadius: 2,
                textDecoration: "none",
                color: ink,
                transition: "all .25s",
                position: "relative",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.transform = "translateY(0)";
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 22, lineHeight: 1 }}>{p.icon}</div>
                {p.private && <span style={{ fontFamily: fontMono, fontSize: 9, padding: "2px 7px", border: `1px solid ${border}`, color: muted, letterSpacing: 1 }}>PRIVATE</span>}
              </div>
              <div style={{ fontFamily: fontBody, fontSize: 20, fontWeight: 500, color: ink, marginTop: 18 }}>{L(p.name)}</div>
              <div style={{ fontFamily: fontBody, fontSize: 12, color: accent, marginTop: 4, letterSpacing: 0.5 }}>{L(p.tag)}</div>
              <div style={{ fontSize: 14, color: inkSoft, marginTop: 14, lineHeight: 1.6, fontWeight: 300 }}>{L(p.desc)}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
                {p.tech.map(t => (
                  <span key={t} style={{ fontFamily: fontMono, fontSize: 10, padding: "3px 8px", background: "transparent", border: `1px solid ${border}`, color: inkSoft, borderRadius: 2 }}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section style={{ position: "relative", padding: "60px 8vw 120px", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle num="03" title={lang === "ru" ? "ПУТЬ" : "JOURNEY"} sub={lang === "ru" ? "опыт и образование" : "experience & education"}
          {...{ fontTitle, fontMono, muted, accent, ink, border }} />

        <div style={{ marginTop: 50 }}>
          {window.EXPERIENCE.map((e, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "160px 1fr",
              gap: 40, padding: "28px 0",
              borderTop: `1px solid ${border}`,
              borderBottom: i === window.EXPERIENCE.length - 1 ? `1px solid ${border}` : "none",
            }}>
              <div style={{ fontFamily: fontMono, fontSize: 12, color: accent, letterSpacing: 2, paddingTop: 4 }}>
                {lang === "ru" ? e.whenRu : e.when}
              </div>
              <div>
                <div style={{ fontFamily: fontBody, fontSize: 20, fontWeight: 500, color: ink }}>{L(e.role)}</div>
                <div style={{ fontFamily: fontBody, fontSize: 14, color: accent, marginTop: 2 }}>{L(e.org)}</div>
                <div style={{ fontSize: 14, color: inkSoft, marginTop: 10, lineHeight: 1.6, fontWeight: 300 }}>{L(e.desc)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ position: "relative", padding: "80px 8vw 100px", zIndex: 1, maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 4, color: muted }}>
          — 04 —
        </div>
        <div style={{ fontFamily: fontTitle, fontSize: "clamp(40px, 5vw, 64px)", color: ink, marginTop: 14, fontWeight: 400, letterSpacing: -0.5 }}>
          {lang === "ru" ? "Связаться" : "Get in touch"}
        </div>
        <div style={{ fontFamily: fontBody, fontSize: 16, color: inkSoft, marginTop: 12, fontWeight: 300 }}>
          {lang === "ru" ? "Маги не торопятся. Но всегда отвечают." : "Mages don't rush. But always reply."}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, marginTop: 48, background: border, border: `1px solid ${border}` }}>
          {[
            { t: P.contacts.email, u: `mailto:${P.contacts.email}`, lbl: "E-MAIL" },
            { t: P.contacts.telegram, u: P.contacts.telegramUrl, lbl: "TELEGRAM" },
            { t: "@" + P.contacts.github, u: P.contacts.githubUrl, lbl: "GITHUB" },
          ].map(c => (
            <a key={c.lbl} href={c.u} target="_blank" rel="noreferrer"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                padding: "28px 20px", background: bg,
                textDecoration: "none", color: ink,
                transition: "all .25s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = surface}
              onMouseLeave={e => e.currentTarget.style.background = bg}>
              <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted }}>{c.lbl}</div>
              <div style={{ fontFamily: fontBody, fontSize: 15, color: ink, fontWeight: 400 }}>{c.t}</div>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: accent }}>↗</div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 80, fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, opacity: 0.6 }}>
          MMXXVI · SIESHER
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ num, title, sub, fontTitle, fontMono, muted, accent, ink, border }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: 3, color: accent }}>— {num} —</div>
        <div style={{ flex: 1, height: 1, background: border }} />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
        <div style={{ fontFamily: fontTitle, fontSize: "clamp(36px, 4.5vw, 56px)", color: ink, letterSpacing: -0.5, fontWeight: 400 }}>{title}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: muted, fontStyle: "italic"}}>{sub}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ScrollLanding });

