export default function Loader({ loaded }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0D0B0A",
        transition: "opacity .6s ease, visibility .6s ease",
        opacity: loaded ? 0 : 1,
        visibility: loaded ? "hidden" : "visible",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <div style={{ position: "relative", width: 74, height: 74 }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(226,59,42,.25)",
              borderTopColor: "#E23B2A",
              animation: "kbcSpin 1s linear infinite",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 14,
              borderRadius: "50%",
              background: "#E23B2A",
              animation: "kbcPulse 1.6s ease-out infinite",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Barlow Condensed', Barlow, sans-serif",
            fontWeight: 700,
            letterSpacing: ".34em",
            textTransform: "uppercase",
            fontSize: 14,
            color: "rgba(246,239,228,.75)",
          }}
        >
          Firing the coals…
        </span>
      </div>
    </div>
  );
}
