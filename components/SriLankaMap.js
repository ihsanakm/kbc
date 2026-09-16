"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAP_W, MAP_H, ISLAND_PATHS, pinPosition } from "@/lib/sriLankaMap";

const CONDENSED = "'Barlow Condensed', Barlow, sans-serif";
const DISPLAY = "Anton, Impact, sans-serif";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SriLankaMap({ outlets, activeId, onHoverOutlet, onSelectOutlet }) {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const pinRefs = useRef({});
  const ringRefs = useRef({});
  const [hovered, setHovered] = useState(null);

  const setPinRef = (name) => (el) => {
    if (el) pinRefs.current[name] = el;
  };
  const setRingRef = (name) => (el) => {
    if (el) ringRefs.current[name] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
        });
      }

      const pins = outlets.map((o) => pinRefs.current[o.name]).filter(Boolean);
      gsap.set(pins, { scale: 0, opacity: 0, transformOrigin: "50% 100%" });
      gsap.to(pins, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(2.2)",
        stagger: 0.06,
        delay: 0.5,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
      });

      const rings = outlets.map((o) => ringRefs.current[o.name]).filter(Boolean);
      rings.forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { scale: 0.6, opacity: 0.55 },
          {
            scale: 2.4,
            opacity: 0,
            duration: 2.2,
            ease: "power1.out",
            repeat: -1,
            delay: 0.8 + i * 0.18,
            transformOrigin: "50% 50%",
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = (name) => {
    setHovered(name);
    onHoverOutlet && onHoverOutlet(name);
    const pin = pinRefs.current[name];
    if (pin) {
      gsap.to(pin, { scale: 1.35, duration: 0.35, ease: "back.out(3)" });
    }
  };

  const handleLeave = (name) => {
    setHovered((cur) => (cur === name ? null : cur));
    onHoverOutlet && onHoverOutlet(null);
    const pin = pinRefs.current[name];
    if (pin) {
      gsap.to(pin, { scale: 1, duration: 0.35, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 460,
        margin: "0 auto",
        aspectRatio: `${MAP_W} / ${MAP_H}`,
      }}
    >
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="kbcMapFill" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="rgba(226,59,42,.22)" />
            <stop offset="100%" stopColor="rgba(226,59,42,.05)" />
          </radialGradient>
        </defs>
        {ISLAND_PATHS.map((d, i) => (
          <path key={i} d={d} fill="url(#kbcMapFill)" stroke="none" />
        ))}
        <path
          ref={pathRef}
          d={ISLAND_PATHS[0]}
          fill="none"
          stroke="rgba(246,239,228,.55)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {ISLAND_PATHS.slice(1).map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(246,239,228,.4)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      {outlets.map((o) => {
        const pos = pinPosition(o.name);
        if (!pos) return null;
        const leftPct = (pos.x / MAP_W) * 100;
        const topPct = (pos.y / MAP_H) * 100;
        const isActive = hovered === o.name || activeId === o.name;
        const flipUp = topPct > 62; // keep tooltip on-canvas near the southern tip
        const flipLeft = leftPct > 68;

        return (
          <div
            key={o.name}
            style={{
              position: "absolute",
              left: `${leftPct}%`,
              top: `${topPct}%`,
              zIndex: isActive ? 20 : 1,
              // This div has no explicit size, so its own (untransformed)
              // hit-testable layout box sits wherever in-flow content would
              // render before the button's translate(-50%,-100%) shifts it
              // up visually — i.e. a different rectangle than the pin you
              // actually see. Left interactive, that invisible box can
              // shadow a neighboring pin's real position. Disabling pointer
              // events here and re-enabling them only on the button (and
              // tooltip) ensures hover/click always target the visible pin.
              pointerEvents: "none",
            }}
          >
            <span
              ref={setRingRef(o.name)}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: "translate(-50%,-50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#E23B2A",
                pointerEvents: "none",
              }}
            />
            <button
              ref={setPinRef(o.name)}
              onMouseEnter={() => handleEnter(o.name)}
              onMouseLeave={() => handleLeave(o.name)}
              onFocus={() => handleEnter(o.name)}
              onBlur={() => handleLeave(o.name)}
              onClick={() => onSelectOutlet && onSelectOutlet(o.name)}
              aria-label={o.name}
              style={{
                position: "relative",
                transform: "translate(-50%,-100%)",
                width: 20,
                height: 26,
                display: "block",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              <svg width="20" height="26" viewBox="0 0 20 26" style={{ display: "block" }}>
                <path
                  d="M10 0C4.5 0 0 4.4 0 9.8 0 16.6 10 26 10 26s10-9.4 10-16.2C20 4.4 15.5 0 10 0z"
                  fill={isActive ? "#F6EFE4" : "#E23B2A"}
                  stroke="#0D0B0A"
                  strokeWidth="1"
                />
                <circle cx="10" cy="9.6" r="3.6" fill={isActive ? "#E23B2A" : "#0D0B0A"} />
              </svg>
            </button>

            {isActive && (
              <div
                role="tooltip"
                style={{
                  position: "absolute",
                  left: flipLeft ? "auto" : "50%",
                  right: flipLeft ? "50%" : "auto",
                  bottom: flipUp ? "auto" : "calc(100% + 6px)",
                  top: flipUp ? "calc(100% + 6px)" : "auto",
                  transform: flipLeft ? "translateX(50%)" : "translateX(-50%)",
                  width: 190,
                  background: "rgba(22,17,15,.96)",
                  border: "1px solid rgba(246,239,228,.14)",
                  borderRadius: 16,
                  padding: "12px 14px",
                  boxShadow: "0 18px 40px rgba(0,0,0,.55)",
                  pointerEvents: "none",
                  animation: "kbcTooltipIn .2s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 6,
                    fontFamily: CONDENSED,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontSize: 11,
                    color: "#7FCB92",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7FCB92" }} />
                  {o.status}
                </div>
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: 17,
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  {o.name}
                </div>
                <div style={{ fontSize: 12.5, color: "rgba(246,239,228,.65)", marginBottom: 6, lineHeight: 1.4 }}>
                  {o.address}
                </div>
                <div
                  style={{
                    fontFamily: CONDENSED,
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    fontSize: 12.5,
                    color: "#F2A32B",
                  }}
                >
                  {o.hours}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes kbcTooltipIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
