"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import SriLankaMap from "@/components/SriLankaMap";
import {
  OUTLETS,
  HERO_DISHES,
  SIDE_DISHES,
  LAYERS,
  REVIEWS,
  FAQS,
} from "@/lib/content";

const DISPLAY = "Anton, Impact, sans-serif";
const CONDENSED = "'Barlow Condensed', Barlow, sans-serif";
const EASE = "cubic-bezier(.16,1,.3,1)";

const marqueeItems = [
  "Fresh off the flame",
  "Smoky & spicy",
  "Island-loved BBQ chicken",
  "Always worth the queue",
];

function MarqueeRow() {
  return (
    <div
      style={{
        display: "flex",
        gap: "clamp(20px, 4vw, 40px)",
        padding: "13px 16px",
        fontFamily: DISPLAY,
        fontSize: "clamp(15px, 3.4vw, 22px)",
        textTransform: "uppercase",
        letterSpacing: ".04em",
        color: "#fff",
        whiteSpace: "nowrap",
      }}
    >
      {[0, 1].map((rep) =>
        marqueeItems.map((t, i) => (
          <span key={rep + "-" + i}>
            {t}
            <span style={{ marginLeft: "clamp(20px, 4vw, 40px)" }}>•</span>
          </span>
        ))
      )}
    </div>
  );
}

function renderOutletCard(o, active) {
  return (
    <div
      className="kbc-card-hover"
      style={{
        background: active ? "rgba(226,59,42,.12)" : "rgba(246,239,228,.045)",
        boxShadow: active
          ? "inset 0 0 0 1px rgba(226,59,42,.55)"
          : "inset 0 0 0 1px rgba(246,239,228,0)",
        borderRadius: 26,
        padding: "24px 26px",
        transition: "background .3s ease, box-shadow .3s ease, transform .3s ease",
        transform: active ? "translateY(-4px)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
          fontFamily: CONDENSED,
          fontWeight: 700,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          fontSize: 13,
          color: "#7FCB92",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7FCB92" }} />
        {o.status}
      </div>
      <h3
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          textTransform: "uppercase",
          fontSize: 24,
          lineHeight: 1.05,
          margin: "0 0 6px",
        }}
      >
        {o.name}
      </h3>
      <p style={{ margin: "0 0 12px", color: "rgba(246,239,228,.62)", fontSize: 15 }}>
        {o.address}
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: CONDENSED,
          fontWeight: 700,
          letterSpacing: ".1em",
          fontSize: 16,
        }}
      >
        {o.hours}
      </p>
    </div>
  );
}

export default function HomeSection({ goMenu, goLocations, goAbout, goCareers, narrow }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [hoveredOutlet, setHoveredOutlet] = useState(null);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [layer, setLayer] = useState(-1);
  const layerRowRefs = useRef([]);

  // Scroll-spy for the "Every layer" section: hover drives it on desktop,
  // but touch devices have no hover, so whichever row sits closest to the
  // viewport's vertical center becomes active as the user scrolls past.
  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const rows = layerRowRefs.current;
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = -1;
      let closestDist = Infinity;
      rows.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const dist = Math.abs(r.top + r.height / 2 - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      if (closestIdx !== -1) setLayer(closestIdx);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "0 0 clamp(28px,4vw,52px) clamp(28px,4vw,52px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-20% -10% auto -10%",
            height: "120%",
            background:
              "radial-gradient(60% 55% at 70% 35%, rgba(226,59,42,.38), rgba(13,11,10,0) 70%)",
            animation: "kbcEmber 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        {(() => {
          const badgeEl = (
            <div
              style={{
                display: "inline-flex",
                alignSelf: narrow ? "center" : "flex-start",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                boxShadow: "inset 0 0 0 1px rgba(226,59,42,.45)",
                color: "#F2A32B",
                fontFamily: CONDENSED,
                fontWeight: 700,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontSize: 14,
                marginBottom: 26,
                borderRadius: 999,
                background: "rgba(226,59,42,.12)",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E23B2A" }} />
              Grills fire at 4:00 PM
            </div>
          );

          const headingEl = (
            <h1
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                textTransform: "uppercase",
                lineHeight: 0.86,
                letterSpacing: "-.015em",
                fontSize: "clamp(38px, 10.5vw, 108px)",
                overflowWrap: "break-word",
                margin: "0 0 22px",
                textAlign: narrow ? "center" : "left",
              }}
            >
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    animation: "kbcRise .85s cubic-bezier(.16,1,.3,1) both",
                    paddingTop: 10,
                  }}
                >
                  Charcoal.
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    animation: "kbcRise .85s cubic-bezier(.16,1,.3,1) .1s both",
                    paddingTop: 3,
                  }}
                >
                  Spice.
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    color: "#E23B2A",
                    animation: "kbcRise .85s cubic-bezier(.16,1,.3,1) .2s both",
                    paddingTop: 3,
                  }}
                >
                  Sold out
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    animation: "kbcRise .85s cubic-bezier(.16,1,.3,1) .3s both",
                  }}
                >
                  by midnight.
                </span>
              </span>
            </h1>
          );

          const paragraphEl = (
            <p
              style={{
                maxWidth: "52ch",
                fontSize: 19,
                lineHeight: 1.55,
                color: "rgba(246,239,228,.78)",
                margin: narrow ? "0 auto 30px" : "0 0 30px",
                textAlign: narrow ? "center" : "left",
              }}
            >
              Sri Lanka&apos;s largest BBQ chicken chain. Whole birds basted
              in our own island spice blend, slow-grilled over 100% natural
              coconut-shell charcoal, and handed over hot with flaky parata
              and the garlic cream people queue for.
            </p>
          );

          const ctaRowEl = (
            <div
              style={{
                display: "flex",
                flexWrap: narrow ? "nowrap" : "wrap",
                gap: narrow ? 10 : 14,
                marginBottom: 34,
              }}
            >
              <button
                onClick={goMenu}
                className="kbc-btn-primary"
                style={{
                  flex: narrow ? "1 1 0" : "0 0 auto",
                  padding: narrow ? "14px 12px" : "17px 30px",
                  background: "#E23B2A",
                  color: "#fff",
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  fontSize: narrow ? 15 : 20,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  borderRadius: 999,
                  textAlign: "center",
                }}
              >
                See the menu
              </button>
              <button
                onClick={goLocations}
                className="kbc-btn-ghost"
                style={{
                  flex: narrow ? "1 1 0" : "0 0 auto",
                  padding: narrow ? "14px 12px" : "17px 30px",
                  background: "rgba(246,239,228,.07)",
                  boxShadow: "inset 0 0 0 1px rgba(246,239,228,.16)",
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  fontSize: narrow ? 15 : 20,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  borderRadius: 999,
                  textAlign: "center",
                }}
              >
                Find your outlet
              </button>
            </div>
          );

          const statsRowEl = (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 26,
                paddingBottom: 40,
                fontFamily: CONDENSED,
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                fontSize: 14,
                color: "rgba(246,239,228,.6)",
                justifyContent: narrow ? "center" : "flex-start",
              }}
            >
              <span>16 outlets island-wide</span>
              <span>100% halal</span>
              <span>Coconut-shell charcoal</span>
            </div>
          );

          const imageBlockEl = (
            <div
              style={{
                position: "relative",
                minHeight: "clamp(240px, 46vw, 340px)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              {!narrow && (
                <span
                  style={{
                    position: "absolute",
                    top: "4%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: DISPLAY,
                    fontSize: "clamp(90px, 17vw, 230px)",
                    lineHeight: 0.8,
                    letterSpacing: "-.03em",
                    color: "rgba(246,239,228,.055)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  KBC
                </span>
              )}
              <img
                src="/hero-mandi.png"
                alt="KBC charcoal grilled chicken mandi platter"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 640,
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,.65))",
                  animation: "kbcFloat 7s ease-in-out infinite",
                }}
              />
            </div>
          );

          if (narrow) {
            return (
              <div
                style={{
                  position: "relative",
                  maxWidth: 1360,
                  margin: "0 auto",
                  padding: "clamp(28px,6vw,64px) clamp(20px,4vw,52px) 0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {badgeEl}
                {headingEl}
                {paragraphEl}
                {imageBlockEl}
                {ctaRowEl}
                {statsRowEl}
              </div>
            );
          }

          return (
            <div
              style={{
                position: "relative",
                maxWidth: 1360,
                margin: "0 auto",
                padding: "clamp(28px,6vw,64px) clamp(20px,4vw,52px) 0",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "clamp(24px,4vw,56px)",
                alignItems: "center",
              }}
            >
              <div>
                {badgeEl}
                {headingEl}
                {paragraphEl}
                {ctaRowEl}
                {statsRowEl}
              </div>
              {imageBlockEl}
            </div>
          );
        })()}
      </section>

      {/* Marquee */}
      <div
        style={{
          overflow: "hidden",
          background: "linear-gradient(90deg,#E23B2A,#F04A34)",
          margin: "8px 0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "kbcMarquee 26s linear infinite",
            willChange: "transform",
          }}
        >
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      {/* Open tonight */}
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
            padding: "60px clamp(20px,4vw,52px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(30px, 4vw, 46px)",
                lineHeight: 1,
                margin: 0,
              }}
            >
              Open tonight
            </h2>
            <span
              style={{
                fontFamily: CONDENSED,
                fontWeight: 700,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#F2A32B",
                fontSize: 15,
              }}
            >
              4:00 PM – 12:00 AM · or until sold out
            </span>
            <button
              onClick={goLocations}
              className="kbc-hover-red"
              style={{
                marginLeft: "auto",
                fontFamily: CONDENSED,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#E23B2A",
                fontSize: 16,
              }}
            >
              All locations →
            </button>
          </div>
          {narrow ? (
            <div>
              <SriLankaMap
                outlets={OUTLETS}
                activeId={hoveredOutlet || selectedOutlet}
                onHoverOutlet={setHoveredOutlet}
                onSelectOutlet={(name) =>
                  setSelectedOutlet((cur) => (cur === name ? null : name))
                }
              />
              {!selectedOutlet && (
                <p
                  style={{
                    textAlign: "center",
                    margin: "20px 0 0",
                    color: "rgba(246,239,228,.5)",
                    fontFamily: CONDENSED,
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    fontSize: 14,
                  }}
                >
                  Tap a pin to see outlet details
                </p>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr minmax(320px, 400px)",
                gap: 32,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
                  gap: 16,
                }}
              >
                {OUTLETS.map((o) => (
                  <div
                    key={o.name}
                    onMouseEnter={() => setHoveredOutlet(o.name)}
                    onMouseLeave={() =>
                      setHoveredOutlet((cur) => (cur === o.name ? null : cur))
                    }
                  >
                    {renderOutletCard(o, hoveredOutlet === o.name)}
                  </div>
                ))}
              </div>
              <SriLankaMap
                outlets={OUTLETS}
                activeId={hoveredOutlet}
                onHoverOutlet={setHoveredOutlet}
                onSelectOutlet={setHoveredOutlet}
              />
            </div>
          )}
        </div>
      </section>

      {/* Menu highlights */}
      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "90px clamp(20px,4vw,52px)",
        }}
      >
        <Reveal>
          <span
            style={{
              fontFamily: CONDENSED,
              fontWeight: 700,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "#E23B2A",
              fontSize: 14,
            }}
          >
            Top of the coals
          </span>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(34px, 5.5vw, 64px)",
              lineHeight: 0.95,
              margin: "12px 0 12px",
            }}
          >
            What&apos;s on the menu
          </h2>
          <p
            style={{
              maxWidth: "60ch",
              color: "rgba(246,239,228,.7)",
              fontSize: 18,
              margin: "0 0 40px",
            }}
          >
            Quarter, half or full — however big the craving. Every plate
            lands with garlic cream.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
              gap: 18,
              alignItems: "start",
            }}
          >
            {HERO_DISHES.map((d) => (
              <button
                key={d.name}
                onClick={goMenu}
                className="kbc-lift-hover"
                style={{
                  textAlign: "left",
                  background: "#16110F",
                  borderRadius: 34,
                  boxShadow: "0 20px 44px rgba(0,0,0,.4)",
                  padding: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background:
                      "radial-gradient(70% 70% at 50% 40%, rgba(226,59,42,.22), rgba(22,17,15,0))",
                    padding: 26,
                    borderRadius: "34px 34px 28px 28px",
                  }}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    style={{
                      width: "100%",
                      aspectRatio: "4/3",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div style={{ padding: 22 }}>
                  <h3
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 400,
                      textTransform: "uppercase",
                      fontSize: 26,
                      lineHeight: 1.05,
                      margin: "0 0 10px",
                    }}
                  >
                    {d.name}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 14px",
                      color: "rgba(246,239,228,.7)",
                      fontSize: 16,
                      lineHeight: 1.5,
                    }}
                  >
                    {d.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: CONDENSED,
                      fontWeight: 700,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      fontSize: 14,
                      color: "#F2A32B",
                    }}
                  >
                    {d.sizes}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
              gap: 20,
              marginTop: 20,
            }}
          >
            {SIDE_DISHES.map((d) => (
              <button
                key={d.name}
                onClick={goMenu}
                className="kbc-lift-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  textAlign: "left",
                  background: "rgba(246,239,228,.045)",
                  borderRadius: 999,
                  padding: "14px 24px 14px 14px",
                  minWidth: 0,
                }}
              >
                <img
                  src={d.img}
                  alt={d.name}
                  style={{
                    width: "clamp(64px,16vw,88px)",
                    height: "clamp(64px,16vw,88px)",
                    objectFit: "contain",
                    flex: "0 0 auto",
                    borderRadius: "50%",
                    background: "rgba(226,59,42,.14)",
                    padding: 8,
                  }}
                />
                <div>
                  <h3
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 400,
                      textTransform: "uppercase",
                      fontSize: 20,
                      margin: "0 0 4px",
                    }}
                  >
                    {d.name}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "rgba(246,239,228,.62)",
                      fontSize: 15,
                      lineHeight: 1.4,
                    }}
                  >
                    {d.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Every layer */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#080706",
          borderRadius: "clamp(28px,4vw,52px)",
          margin: "24px clamp(12px,3vw,28px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "auto -10% -30% -10%",
            height: "70%",
            background:
              "radial-gradient(50% 60% at 50% 100%, rgba(226,59,42,.28), rgba(10,9,8,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <Reveal
          style={{
            position: "relative",
            maxWidth: 1360,
            margin: "0 auto",
            padding: "100px clamp(20px,4vw,52px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              gap: "20px 40px",
              marginBottom: 40,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: "#F2A32B",
                  fontSize: 14,
                }}
              >
                Every layer
              </span>
              <h2
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: "clamp(34px, 5vw, 62px)",
                  lineHeight: 0.92,
                  margin: "14px 0 0",
                  maxWidth: "18ch",
                }}
              >
                Four things. Done the same way every night.
              </h2>
            </div>
            <p
              style={{
                maxWidth: "38ch",
                margin: "0 0 6px auto",
                color: "rgba(246,239,228,.68)",
                fontSize: 17,
                lineHeight: 1.6,
              }}
            >
              No oven, no holding lamp, no second recipe. Scroll or hover
              any layer to see how it is actually done — it is the reason
              the queue forms before the grills are hot.
            </p>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column" }}
            onMouseLeave={() => setLayer(-1)}
          >
            {LAYERS.map((l, i) => {
              const on = layer === i;
              const dim = layer !== -1 && !on;
              return (
                <div
                  key={l.no}
                  ref={(el) => (layerRowRefs.current[i] = el)}
                  onMouseEnter={() => setLayer(i)}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: narrow ? "12px 16px" : "clamp(16px,2.6vw,38px)",
                    padding: "clamp(20px,2.6vw,34px) clamp(16px,2.4vw,34px)",
                    borderRadius: 32,
                    cursor: "default",
                    overflow: "hidden",
                    transition: `opacity .5s ${EASE}, transform .55s ${EASE}`,
                    opacity: dim ? 0.38 : 1,
                    transform: `translateX(${on && !narrow ? "10px" : "0"})`,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 32,
                      background:
                        "linear-gradient(90deg,rgba(226,59,42,.22),rgba(226,59,42,0) 78%)",
                      transformOrigin: "left center",
                      transition: `transform .6s ${EASE}, opacity .4s ease`,
                      transform: `scaleX(${on ? 1 : 0})`,
                      opacity: on ? 1 : 0,
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      flex: "0 0 auto",
                      fontFamily: CONDENSED,
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: ".18em",
                      transition: "color .4s ease",
                      color: on ? "#E23B2A" : "rgba(246,239,228,.35)",
                    }}
                  >
                    {l.no}
                  </span>
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "12px 26px",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: DISPLAY,
                        fontWeight: 400,
                        textTransform: "uppercase",
                        lineHeight: 0.95,
                        fontSize: "clamp(26px,4vw,52px)",
                        transition: "color .4s ease",
                        color: on ? "#F6EFE4" : "rgba(246,239,228,.9)",
                      }}
                    >
                      {l.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: CONDENSED,
                        fontWeight: 700,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        fontSize: 13,
                        padding: "7px 15px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                        transition: "background .4s ease, color .4s ease",
                        background: on
                          ? "rgba(226,59,42,.85)"
                          : "rgba(246,239,228,.07)",
                        color: on ? "#fff" : "rgba(246,239,228,.6)",
                      }}
                    >
                      {l.tag}
                    </span>
                  </div>
                  <p
                    style={{
                      position: "relative",
                      zIndex: 1,
                      margin: 0,
                      flex: narrow ? "1 1 100%" : "0 1 32ch",
                      minWidth: 0,
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "rgba(246,239,228,.72)",
                      transition: `opacity .5s ${EASE}, transform .5s ${EASE}, max-height .5s ${EASE}`,
                      overflow: "hidden",
                      opacity: on || narrow ? 1 : 0,
                      transform: `translateY(${on || narrow ? "0" : "12px"})`,
                      maxHeight: on || narrow ? 220 : 0,
                    }}
                  >
                    {l.desc}
                  </p>
                  <img
                    src={l.img}
                    alt={l.title}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      flex: "0 0 auto",
                      order: narrow ? -1 : 0,
                      height: narrow ? 62 : "clamp(64px,7vw,104px)",
                      width: "auto",
                      transition: `transform .65s ${EASE}, filter .5s ease`,
                      transform: `scale(${on && !narrow ? 1.22 : 1}) rotate(${
                        on && !narrow ? "-7deg" : "0deg"
                      })`,
                      filter: `drop-shadow(0 18px 30px rgba(0,0,0,.55)) ${
                        on ? "saturate(1.15)" : "saturate(1)"
                      }`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* KBC way */}
      <section
        style={{
          background: "linear-gradient(165deg,#191311,#100C0B)",
          borderRadius: "clamp(28px,4vw,52px)",
          margin: "24px clamp(12px,3vw,28px)",
        }}
      >
        <Reveal
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "90px clamp(20px,4vw,52px)",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 48,
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
                color: "#E23B2A",
                fontSize: 14,
              }}
            >
              The KBC way
            </span>
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                textTransform: "uppercase",
                fontSize: "clamp(32px, 4.6vw, 56px)",
                lineHeight: 0.95,
                margin: "14px 0 20px",
              }}
            >
              Backyard fire, built for the whole island
            </h2>
            <p
              style={{
                color: "rgba(246,239,228,.75)",
                fontSize: 18,
                lineHeight: 1.6,
                margin: "0 0 16px",
              }}
            >
              We started with what Sri Lankans already knew: family backyard
              BBQs, Friday spice markets, village cooking over wood. KBC took
              that and made it fast, consistent and open till midnight.
            </p>
            <p
              style={{
                color: "rgba(246,239,228,.75)",
                fontSize: 18,
                lineHeight: 1.6,
                margin: "0 0 26px",
              }}
            >
              Every bird is basted in our own spice blend, grilled to order
              over hot coals to lock the juices in, and served with hot
              parata or mandi rice, crisp salad and garlic cream. That&apos;s
              the whole trick. There isn&apos;t a shortcut.
            </p>
            <button
              onClick={goAbout}
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
              Our full story
            </button>
          </div>
          <img
            src="https://kbcoriginal.lk/wp-content/uploads/2026/07/bbq-shred2.png"
            alt="Shredded charcoal BBQ chicken"
            style={{
              width: "100%",
              borderRadius: 40,
              filter: "drop-shadow(0 24px 50px rgba(0,0,0,.6))",
            }}
          />
        </Reveal>
      </section>

      {/* Reviews */}
      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "90px clamp(20px,4vw,52px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "clamp(32px, 4.6vw, 56px)",
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            Straight from the queue
          </h2>
          <span
            style={{
              fontFamily: CONDENSED,
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "rgba(246,239,228,.55)",
              fontSize: 15,
            }}
          >
            Google reviews
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: 20,
          }}
        >
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              style={{
                margin: 0,
                background: "rgba(246,239,228,.045)",
                borderRadius: 30,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ color: "#F2A32B", letterSpacing: ".2em", fontSize: 15 }}>
                ★★★★★
              </div>
              <blockquote
                style={{
                  margin: 0,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "rgba(246,239,228,.85)",
                }}
              >
                {r.text}
              </blockquote>
              <figcaption
                style={{
                  marginTop: "auto",
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  borderRadius: 999,
                  fontSize: 15,
                  color: "rgba(246,239,228,.6)",
                }}
              >
                {r.name} · {r.branch}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Join the crew */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(150deg,#F04A34,#C42A1C)",
          overflow: "hidden",
          borderRadius: "clamp(28px,4vw,52px)",
          margin: "24px clamp(12px,3vw,28px)",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "78px clamp(20px,4vw,52px)",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
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
                fontSize: "clamp(34px, 5vw, 60px)",
                lineHeight: 0.92,
                margin: "0 0 16px",
                color: "#fff",
              }}
            >
              Join the crew
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.92)",
                fontSize: 19,
                lineHeight: 1.55,
                margin: "0 0 26px",
                maxWidth: "46ch",
              }}
            >
              Grill hands, counter crew, shift leads. If you can keep your
              head at 8 PM on a Friday, we&apos;ll teach you the fire.
            </p>
            <button
              onClick={goCareers}
              style={{
                padding: "17px 30px",
                background: "#0D0B0A",
                color: "#F6EFE4",
                fontFamily: CONDENSED,
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                borderRadius: 999,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F6EFE4";
                e.currentTarget.style.color = "#0D0B0A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0D0B0A";
                e.currentTarget.style.color = "#F6EFE4";
              }}
            >
              Work with us
            </button>
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
                id={`crewHome${n}`}
                src="/crew.png"
                mask="inset(0 round 999px 999px 26px 26px)"
                placeholder={`Crew portrait ${n}`}
                style={{
                  width: "clamp(100px,26vw,132px)",
                  height: "137%",
                  aspectRatio: "unset",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "90px clamp(20px,4vw,52px)",
        }}
      >
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(32px, 4.6vw, 56px)",
            lineHeight: 0.95,
            margin: "0 0 32px",
          }}
        >
          Burning questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={f.q}
                style={{
                  background: "rgba(246,239,228,.045)",
                  borderRadius: 26,
                  padding: "4px 28px",
                }}
              >
                <button
                  onClick={() => setOpenFaq((cur) => (cur === i ? -1 : i))}
                  className="kbc-hover-red"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "22px 0",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: CONDENSED,
                      fontWeight: 700,
                      fontSize: 22,
                      letterSpacing: ".04em",
                      textTransform: "uppercase",
                      flex: 1,
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{ fontFamily: DISPLAY, fontSize: 22, color: "#E23B2A" }}
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <p
                    style={{
                      margin: 0,
                      padding: "0 40px 24px 0",
                      color: "rgba(246,239,228,.75)",
                      fontSize: 17,
                      lineHeight: 1.6,
                    }}
                  >
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
