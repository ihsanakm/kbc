"use client";

import { useState } from "react";
import { CAT_DATA } from "@/lib/content";

const DISPLAY = "Anton, Impact, sans-serif";
const CONDENSED = "'Barlow Condensed', Barlow, sans-serif";

export default function MenuSection() {
  const [cat, setCat] = useState("bbq");
  const activeCat = CAT_DATA.find((c) => c.key === cat) || CAT_DATA[0];

  return (
    <div>
      <section
        style={{
          background:
            "radial-gradient(60% 100% at 20% 0%, rgba(226,59,42,.3), rgba(13,11,10,0))",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "60px clamp(20px,4vw,52px) 44px",
          }}
        >
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
            Grilled to order
          </span>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: 0.9,
              margin: "12px 0 18px",
            }}
          >
            The menu
          </h1>
          <p
            style={{
              maxWidth: "62ch",
              color: "rgba(246,239,228,.75)",
              fontSize: 19,
              lineHeight: 1.55,
              margin: "0 0 28px",
            }}
          >
            Pick your bird — quarter, half or full — then pick what it rides
            with. Prices at the counter; ask the crew about family packs.
          </p>
          <a
            href="/kbc-menu.pdf"
            target="_blank"
            rel="noopener"
            className="kbc-btn-ghost"
            style={{
              display: "inline-block",
              padding: "15px 26px",
              background: "rgba(246,239,228,.07)",
              boxShadow: "inset 0 0 0 1px rgba(246,239,228,.16)",
              fontFamily: CONDENSED,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              borderRadius: 999,
            }}
          >
            Download full menu
          </a>
        </div>
      </section>

      <div
        style={{
          position: "sticky",
          top: 76,
          zIndex: 40,
          background: "rgba(13,11,10,.72)",
          backdropFilter: "blur(14px)",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "12px clamp(20px,4vw,52px)",
            display: "flex",
            gap: 10,
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {CAT_DATA.map((c) => {
            const active = c.key === cat;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className="kbc-lift-hover"
                style={{
                  flex: "0 0 auto",
                  padding: "12px 22px",
                  background: "rgba(246,239,228,.06)",
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                {active && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      marginRight: 9,
                      background: "#E23B2A",
                    }}
                  />
                )}
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "52px clamp(20px,4vw,52px) 100px",
        }}
      >
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1,
            margin: "0 0 8px",
          }}
        >
          {activeCat.label}
        </h2>
        <p
          style={{
            color: "rgba(246,239,228,.65)",
            fontSize: 17,
            margin: "0 0 34px",
          }}
        >
          {activeCat.note}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: 18,
          }}
        >
          {activeCat.items.map((i) => (
            <article
              key={i.name}
              style={{
                background: "#16110F",
                borderRadius: 32,
                boxShadow: "0 20px 44px rgba(0,0,0,.4)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: 22,
                  background:
                    "radial-gradient(70% 70% at 50% 45%, rgba(226,59,42,.18), rgba(22,17,15,0))",
                  borderRadius: 32,
                }}
              >
                {i.img ? (
                  <img
                    src={i.img}
                    alt={i.name}
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/images/logo.webp"
                      alt=""
                      style={{ width: "55%", opacity: 0.18 }}
                    />
                  </div>
                )}
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <h3
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: 22,
                    lineHeight: 1.05,
                    margin: "0 0 6px",
                  }}
                >
                  {i.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "rgba(246,239,228,.65)",
                    fontSize: 15,
                    lineHeight: 1.45,
                  }}
                >
                  {i.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
