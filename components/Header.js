"use client";

import { useState } from "react";
import { NAV } from "@/lib/content";

const CONDENSED = "'Barlow Condensed', Barlow, sans-serif";

export default function Header({ page, onNavigate, mobile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const narrow = mobile;

  const go = (key) => () => {
    setMenuOpen(false);
    onNavigate(key);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "14px clamp(12px,3vw,28px)",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "10px 12px 10px 22px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          background: "rgba(22,17,15,.72)",
          backdropFilter: "blur(18px) saturate(1.3)",
          borderRadius: 999,
          boxShadow:
            "0 18px 50px rgba(0,0,0,.55), inset 0 0 0 1px rgba(246,239,228,.08)",
        }}
      >
        <button
          onClick={go("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: "0 0 auto",
          }}
        >
          <img
            src="/images/logo.webp"
            alt="KBC Original"
            style={{ height: 40, width: "auto" }}
          />
        </button>

        <nav
          style={{
            display: mobile ? "none" : "flex",
            flexWrap: "wrap",
            gap: 4,
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          {NAV.map((item) => {
            const active = page === item.key;
            return (
              <button
                key={item.key}
                onClick={go(item.key)}
                className="kbc-hover-red"
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: 999,
                  padding: "10px 16px",
                  fontFamily: CONDENSED,
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      background: "rgba(226,59,42,.18)",
                      boxShadow: "inset 0 0 0 1px rgba(226,59,42,.55)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <a
          href="tel:+94756882698"
          style={{
            flex: "0 0 auto",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#E23B2A",
            color: "#fff",
            fontFamily: CONDENSED,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            borderRadius: 999,
            ...(narrow
              ? { marginLeft: mobile ? "auto" : undefined, width: 46, height: 46, padding: 0 }
              : { padding: "12px 20px" }),
          }}
        >
          <span style={{ display: narrow ? "none" : "inline" }}>
            075 688 2698
          </span>
          <span
            style={{
              display: narrow ? "inline" : "none",
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            &#9742;
          </span>
        </a>

        {mobile && (
          <button
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Menu"
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(246,239,228,.08)",
            }}
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 2,
                borderRadius: 2,
                background: "#F6EFE4",
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 2,
                borderRadius: 2,
                background: "#F6EFE4",
              }}
            />
            <span
              style={{
                display: "block",
                width: 14,
                height: 2,
                borderRadius: 2,
                background: "#F6EFE4",
              }}
            />
          </button>
        )}
      </div>

      <div
        style={{
          overflow: "hidden",
          maxWidth: 1360,
          margin: "0 auto",
          display: mobile ? "grid" : "none",
          gap: 8,
          transition:
            "max-height .45s cubic-bezier(.16,1,.3,1), opacity .35s ease, margin-top .35s ease",
          maxHeight: menuOpen ? 440 : 0,
          opacity: menuOpen ? 1 : 0,
          marginTop: menuOpen ? 10 : 0,
          padding: menuOpen ? 14 : "0 14px",
          background: "rgba(22,17,15,.92)",
          backdropFilter: "blur(18px)",
          borderRadius: 28,
          boxShadow: menuOpen
            ? "0 22px 50px rgba(0,0,0,.55), inset 0 0 0 1px rgba(246,239,228,.08)"
            : "none",
        }}
      >
        {NAV.map((item) => (
          <button
            key={item.key}
            onClick={go(item.key)}
            style={{
              textAlign: "left",
              padding: "14px 18px",
              borderRadius: 18,
              fontFamily: CONDENSED,
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              background:
                page === item.key
                  ? "rgba(226,59,42,.2)"
                  : "rgba(246,239,228,.05)",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
