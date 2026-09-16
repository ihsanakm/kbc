import { OUTLETS } from "@/lib/content";

const DISPLAY = "Anton, Impact, sans-serif";
const CONDENSED = "'Barlow Condensed', Barlow, sans-serif";

export default function LocationsSection() {
  return (
    <div>
      <section
        style={{
          background:
            "radial-gradient(60% 100% at 80% 0%, rgba(226,59,42,.3), rgba(13,11,10,0))",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "60px clamp(20px,4vw,52px) 44px",
          }}
        >
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: 0.9,
              margin: "0 0 18px",
            }}
          >
            Find us
          </h1>
          <p
            style={{
              maxWidth: "60ch",
              color: "rgba(246,239,228,.75)",
              fontSize: 19,
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            Sixteen outlets from Jaffna to Matara. Grills fire at 4:00
            PM at the standalone outlets, from 11:00 AM in the food courts —
            and everything closes when the chicken runs out.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "44px clamp(20px,4vw,52px) 100px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: 20,
          }}
        >
          {OUTLETS.map((o) => (
            <article
              key={o.name}
              style={{
                background: "#16110F",
                borderRadius: 34,
                boxShadow: "0 20px 44px rgba(0,0,0,.4)",
                padding: 30,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  fontSize: 13,
                  color: "#7FCB92",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#7FCB92",
                  }}
                />
                {o.status}
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: 30,
                    lineHeight: 1,
                    margin: "0 0 6px",
                  }}
                >
                  {o.name}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontFamily: CONDENSED,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontSize: 15,
                    color: "#F2A32B",
                  }}
                >
                  {o.kicker}
                </p>
              </div>
              <dl style={{ margin: 0, display: "grid", gap: 10 }}>
                <div>
                  <dt
                    style={{
                      fontFamily: CONDENSED,
                      fontWeight: 700,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      fontSize: 12,
                      color: "rgba(246,239,228,.5)",
                    }}
                  >
                    Address
                  </dt>
                  <dd style={{ margin: "2px 0 0", fontSize: 16 }}>
                    {o.address}
                  </dd>
                </div>
                <div>
                  <dt
                    style={{
                      fontFamily: CONDENSED,
                      fontWeight: 700,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      fontSize: 12,
                      color: "rgba(246,239,228,.5)",
                    }}
                  >
                    Hours
                  </dt>
                  <dd style={{ margin: "2px 0 0", fontSize: 16 }}>
                    {o.hours} · or until sold out
                  </dd>
                </div>
              </dl>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  paddingTop: 6,
                }}
              >
                <a
                  href={o.map}
                  target="_blank"
                  rel="noopener"
                  className="kbc-btn-primary"
                  style={{
                    padding: "12px 20px",
                    background: "#E23B2A",
                    color: "#fff",
                    fontFamily: CONDENSED,
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    borderRadius: 999,
                  }}
                >
                  Directions
                </a>
                <a
                  href="tel:+94756882698"
                  className="kbc-btn-ghost"
                  style={{
                    padding: "12px 20px",
                    background: "rgba(246,239,228,.07)",
                    boxShadow: "inset 0 0 0 1px rgba(246,239,228,.16)",
                    fontFamily: CONDENSED,
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    borderRadius: 999,
                  }}
                >
                  Call
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
