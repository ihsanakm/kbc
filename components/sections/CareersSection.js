import ImageSlot from "@/components/ImageSlot";
import { ROLES, PERKS } from "@/lib/content";

const DISPLAY = "Anton, Impact, sans-serif";
const CONDENSED = "'Barlow Condensed', Barlow, sans-serif";

export default function CareersSection() {
  return (
    <div>
      <section
        style={{
          background:
            "radial-gradient(60% 100% at 70% 0%, rgba(226,59,42,.32), rgba(13,11,10,0))",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "60px clamp(20px,4vw,52px) 48px",
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
            Join the crew
          </h1>
          <p
            style={{
              maxWidth: "58ch",
              color: "rgba(246,239,228,.78)",
              fontSize: 19,
              lineHeight: 1.6,
              margin: "0 0 28px",
            }}
          >
            No experience needed for most roles — we train on the grill.
            What we need is people who show up, move fast and treat the
            queue well.
          </p>
          <a
            href="tel:+94756882698"
            className="kbc-btn-primary"
            style={{
              display: "inline-block",
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
            Call 075 688 2698 to apply
          </a>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "60px clamp(20px,4vw,52px)",
        }}
      >
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(28px, 4vw, 44px)",
            margin: "0 0 26px",
          }}
        >
          Open roles
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          {ROLES.map((r) => (
            <div
              key={r.title}
              style={{
                background: "rgba(246,239,228,.045)",
                borderRadius: 28,
                padding: "26px clamp(20px,4vw,32px)",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                gap: 18,
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: 26,
                  margin: 0,
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "rgba(246,239,228,.7)",
                  fontSize: 16,
                  lineHeight: 1.5,
                }}
              >
                {r.body}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontSize: 15,
                  color: "#F2A32B",
                  textAlign: "center",
                }}
              >
                {r.meta}
              </p>
            </div>
          ))}
        </div>
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
            maxWidth: 1360,
            margin: "0 auto",
            padding: "70px clamp(20px,4vw,52px)",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(28px, 4vw, 46px)",
                lineHeight: 1,
                margin: "0 0 18px",
              }}
            >
              What you get
            </h2>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "grid",
                gap: 12,
              }}
            >
              {PERKS.map((p) => (
                <li
                  key={p}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                    color: "rgba(246,239,228,.8)",
                    fontSize: 17,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#E23B2A",
                      flex: "0 0 auto",
                      transform: "translateY(2px)",
                    }}
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[1, 2, 3, 4].map((n) => (
              <ImageSlot
                key={n}
                id={`crewCareers${n}`}
                src="/crew.png"
                mask="inset(0 round 999px 999px 26px 26px)"
                placeholder={`Crew portrait ${n}`}
                style={{
                  width: "clamp(104px,27vw,140px)",
                  height: "137%",
                  aspectRatio: "unset",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
