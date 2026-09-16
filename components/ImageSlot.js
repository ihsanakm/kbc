"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "kbc-image-slots";

function readStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(store) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

/**
 * Lightweight stand-in for the design canvas's <image-slot> web component.
 * Click or drag-and-drop an image to fill the slot; the dropped image
 * persists per-browser via localStorage, keyed by `id`.
 */
export default function ImageSlot({
  id,
  shape = "rounded",
  radius = 12,
  mask,
  placeholder = "Drop an image",
  src,
  style,
}) {
  const [url, setUrl] = useState(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const store = readStore();
    if (id && store[id]) setUrl(store[id]);
  }, [id]);

  const ingest = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setUrl(dataUrl);
      if (id) {
        const store = readStore();
        store[id] = dataUrl;
        writeStore(store);
      }
    };
    reader.readAsDataURL(file);
  };

  let borderRadius = "";
  if (shape === "circle") borderRadius = "50%";
  else if (shape === "pill") borderRadius = "9999px";
  else if (shape === "rounded") borderRadius = `${radius}px`;

  const shown = url || src || null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        aspectRatio: "3/2",
        overflow: "hidden",
        background: "rgba(127,127,127,.08)",
        borderRadius: mask ? undefined : borderRadius,
        clipPath: mask || undefined,
        cursor: "pointer",
        ...style,
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) ingest(file);
      }}
    >
      {shown ? (
        <img
          src={shown}
          alt={placeholder}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            textAlign: "center",
            padding: 12,
            color: "inherit",
            opacity: 0.75,
            font: "13px/1.3 system-ui,-apple-system,sans-serif",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <div style={{ maxWidth: "90%", fontWeight: 500, letterSpacing: ".01em" }}>
            {placeholder}
          </div>
          <div style={{ fontSize: 11 }}>
            or <u style={{ textUnderlineOffset: 2 }}>browse files</u>
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          border: mask ? "none" : "1.5px dashed currentColor",
          opacity: over ? 1 : shown ? 0 : 0.35,
          borderColor: over ? "#c96442" : undefined,
          borderRadius: mask ? undefined : borderRadius,
          transition: "opacity .12s, border-color .12s",
        }}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        hidden
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) ingest(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
