// Variant 2: Minimalist card with Frieren image
function StarryCard({ lang = "ru", theme = "night", fontMode = "modern", particleDensity = 0.4 }) {
  const { useState } = React;
  const [flipped, setFlipped] = useState(false);
  const P = window.PROFILE;
  const L = (o) => (typeof o === "string" ? o : o[lang]);

  const isNight = theme === "night";
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

  return (
    <div style={{
      position: "relative", width: "100%", minHeight: "100vh",
      background: bg, color: ink, fontFamily: fontBody,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 40, overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
        <window.StarField density={particleDensity} color={accent} />
      </div>

      <div
        style={{ position: "relative", width: "min(760px, 94vw)", aspectRatio: "1.72/1", perspective: 2200, cursor: "pointer", zIndex: 2 }}
        onClick={() => setFlipped(f => !f)}
        data-no-spell
      >
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 1s cubic-bezier(.77,0,.18,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* Front */}
          <div style={{
            position: "absolute", inset: 0,
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 2,
            backfaceVisibility: "hidden",
            display: "grid", gridTemplateColumns: "0.85fr 1fr", overflow: "hidden",
          }}>
            <div style={{
              backgroundImage: "url('frieren.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRight: `1px solid ${border}`,
            }} />
            <div style={{ padding: "clamp(26px, 3vw, 44px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 4, color: muted }}>
                  @{P.handle.toUpperCase()}
                </div>
                <div style={{ fontFamily: fontTitle, fontSize: "clamp(38px, 5vw, 60px)", color: ink, lineHeight: 0.95, marginTop: 16, fontWeight: 400, letterSpacing: -1 }}>
                  {lang === "ru" ? P.nameRu : P.nameEn}
                </div>
                <div style={{ fontFamily: fontBody, fontSize: 14, color: accent, marginTop: 10, fontWeight: 500, letterSpacing: 0.3 }}>
                  {L(P.title)}
                </div>
                <div style={{ height: 1, background: border, margin: "22px 0", width: 40 }} />
                <div style={{ fontSize: 13, color: inkSoft, lineHeight: 1.6, fontWeight: 300 }}>
                  {L({ ru: P.bioRu, en: P.bioEn })}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Python", "PyTorch", "LLM", "GNN"].map(t => (
                    <span key={t} style={{ fontFamily: fontMono, fontSize: 10, padding: "3px 8px", border: `1px solid ${border}`, color: inkSoft, borderRadius: 2 }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: 3, color: muted }}>↺ FLIP</div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div style={{
            position: "absolute", inset: 0,
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 2,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "clamp(26px, 3vw, 44px)",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 4, color: muted }}>
              {lang === "ru" ? "ОБРАТНАЯ СТОРОНА" : "REVERSE"}
            </div>
            <div style={{ fontFamily: fontTitle, fontSize: "clamp(20px, 2vw, 26px)", color: ink, marginTop: 18, fontStyle: "italic", lineHeight: 1.4, fontWeight: 400, maxWidth: 600 }}>
              {lang === "ru" ? P.quoteRu : P.quoteEn}
            </div>
            <div style={{ height: 1, background: border, margin: "22px 0", width: 40 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flex: 1 }}>
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, marginBottom: 10 }}>
                  {lang === "ru" ? "КОНТАКТЫ" : "CONTACTS"}
                </div>
                {[
                  { t: P.contacts.email, u: `mailto:${P.contacts.email}` },
                  { t: P.contacts.telegram, u: P.contacts.telegramUrl },
                  { t: "@" + P.contacts.github, u: P.contacts.githubUrl },
                ].map(x => (
                  <a key={x.t} href={x.u} target="_blank" rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ display: "block", padding: "4px 0", color: ink, textDecoration: "none", fontSize: 13 }}>
                    {x.t}
                  </a>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 10, letterSpacing: 3, color: muted, marginBottom: 10 }}>
                  {lang === "ru" ? "ОПЫТ" : "EXPERIENCE"}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                  <div style={{ fontFamily: fontMono, fontSize: 10, color: accent }}>2024 — NOW</div>
                  <div style={{ color: ink }}>Data Engineer · Alfa-Bank</div>
                  <div style={{ fontFamily: fontMono, fontSize: 10, color: accent, marginTop: 8 }}>2022 — NOW</div>
                  <div style={{ color: ink }}>{L(P.edu)}</div>
                </div>
              </div>
            </div>

            <div style={{ fontFamily: fontMono, fontSize: 9, letterSpacing: 3, color: muted, opacity: 0.6 }}>
              MMXXVI · SIESHER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StarryCard });

