"use client";

import { useEffect, useState } from "react";

export default function useViewport() {
  const [vw, setVw] = useState(1280);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return vw;
}
