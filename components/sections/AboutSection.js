import Reveal from "@/components/Reveal";
import { PILLARS, STORY } from "@/lib/content";

const DISPLAY = "Anton, Impact, sans-serif";
const CONDENSED = "'Barlow Condensed', Barlow, sans-serif";

export default function AboutSection({ goMenu, goLocations }) {
  return (
    <div>
      <section
        style={{
          background:
            "radial-gradient(55% 100% at 30% 0%, rgba(226,59,42,.32), rgba(13,11,10,0))",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "60px clamp(20px,4vw,52px) 48px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: CONDENSED,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#F2A32B",
                fontSize: 14,
              }}
            >
              Since the first grill
            </span>
            <h1
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(40px, 7vw, 88px)",
                lineHeight: 0.9,
                margin: "12px 0 20px",
              }}
            >
              More than a meal. An experience.
            </h1>
            <p
              style={{
                maxWidth: "54ch",
                color: "rgba(246,239,228,.78)",
                fontSize: 19,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Real charcoal, real spice, real fire. Eat alone, eat with
              friends, bring the whole family — there&apos;s always room at
              the table.
            </p>
          </div>
          <img
            src="https://kbcoriginal.lk/wp-content/uploads/2026/07/people.png"
            alt="People eating at KBC"
            style={{ width: "100%", borderRadius: 36 }}
          />
        </div>
      </section>

      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "78px clamp(20px,4vw,52px)",
        }}
      >
        <Reveal
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: 16,
          }}
        >
          {PILLARS.map((p) => (
            <div
              key={p.no}
              style={{
                background: "linear-gradient(165deg,#191311,#100C0B)",
                borderRadius: 32,
                padding: "34px 30px",
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 40,
                  color: "#E23B2A",
                  lineHeight: 1,
                }}
              >
                {p.no}
              </span>
              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: 24,
                  margin: "14px 0 10px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "rgba(246,239,228,.7)",
                  fontSize: 16,
                  lineHeight: 1.55,
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section
        style={{
          background: "linear-gradient(165deg,#191311,#100C0B)",
          borderRadius: "clamp(28px,4vw,52px)",
          margin: "24px clamp(12px,3vw,28px)",
        }}
      >
        <div
          style={{
            maxWidth: 1060,
            margin: "0 auto",
            padding: "78px clamp(20px,4vw,52px)",
          }}
        >
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(30px, 4.4vw, 52px)",
              lineHeight: 0.95,
              margin: "0 0 34px",
            }}
          >
            How it started
          </h2>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: 12,
            }}
          >
            {STORY.map((s) => (
              <li
                key={s.tag}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
                  gap: "12px 24px",
                  padding: "24px clamp(20px,4vw,30px)",
                  background: "rgba(246,239,228,.045)",
                  borderRadius: 26,
                }}
              >
                <span
                  style={{
                    fontFamily: DISPLAY,
                    textTransform: "uppercase",
                    fontSize: 22,
                    color: "#F2A32B",
                  }}
                >
                  {s.tag}
                </span>
                <p
                  style={{
                    margin: 0,
                    color: "rgba(246,239,228,.8)",
                    fontSize: 18,
                    lineHeight: 1.6,
                  }}
                >
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "78px clamp(20px,4vw,52px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(28px, 4vw, 46px)",
            lineHeight: 1,
            margin: 0,
            maxWidth: "24ch",
          }}
        >
          Come get smoked, Colombo style.
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <button
            onClick={goMenu}
            className="kbc-btn-primary"
            style={{
              padding: "16px 28px",
              background: "#E23B2A",
              color: "#fff",
              fontFamily: CONDENSED,
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              borderRadius: 999,
            }}
          >
            See the menu
          </button>
          <button
            onClick={goLocations}
            className="kbc-btn-ghost"
            style={{
              padding: "16px 28px",
              background: "rgba(246,239,228,.07)",
              boxShadow: "inset 0 0 0 1px rgba(246,239,228,.16)",
              fontFamily: CONDENSED,
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              borderRadius: 999,
            }}
          >
            Find us
          </button>
        </div>
      </section>
    </div>
  );
}
