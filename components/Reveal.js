"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, style, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transition:
          "opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(34px)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
