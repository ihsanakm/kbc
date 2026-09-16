const DISPLAY = "Anton, Impact, sans-serif";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kbcoriginal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/kbcoriginal/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 8.5h2V5h-2c-2.2 0-4 1.8-4 4v2H9v3.5h2V21h3.5v-6.5H17l.5-3.5h-3V9c0-.5.5-.5.5-.5Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#120E0C,#080706)",
        borderRadius: "clamp(28px,4vw,52px) clamp(28px,4vw,52px) 0 0",
        margin: "24px clamp(12px,3vw,28px) 0",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden", padding: "48px 20px 0" }}>
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: DISPLAY,
              textTransform: "uppercase",
              fontSize: "clamp(46px, 19vw, 280px)",
              lineHeight: 0.84,
              letterSpacing: "-.03em",
              color: "rgba(246,239,228,.08)",
              whiteSpace: "nowrap",
              userSelect: "none",
              paddingTop: 7,
              paddingBottom: 7,
            }}
          >
            KBC ORIGINAL
          </span>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "28px 28px 28px",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
          color: "rgba(246,239,228,.45)",
          fontSize: 14,
        }}
      >
        <span>© 2026 KBC Original. All rights reserved.</span>
        <div style={{ display: "flex", gap: 12 }}>
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener"
              aria-label={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(246,239,228,.06)",
                boxShadow: "inset 0 0 0 1px rgba(246,239,228,.14)",
                color: "#F6EFE4",
                transition: "background .25s ease, color .25s ease",
              }}
              className="kbc-social-icon"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <span>Charcoal-grilled · halal · open till midnight</span>
      </div>
    </footer>
  );
}
