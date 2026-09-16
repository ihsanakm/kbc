"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeSection from "@/components/sections/HomeSection";
import MenuSection from "@/components/sections/MenuSection";
import LocationsSection from "@/components/sections/LocationsSection";
import AboutSection from "@/components/sections/AboutSection";
import CareersSection from "@/components/sections/CareersSection";
import useViewport from "@/hooks/useViewport";

export default function Page() {
  const [page, setPage] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const vw = useViewport();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, []);

  const go = (key) => {
    setPage(key);
    window.scrollTo(0, 0);
  };

  // Tablets get the same stacked/single-column treatment as phones —
  // side-by-side layouts (map+cards, hero grid) don't have room to
  // breathe below ~1024px.
  const mobile = vw <= 1024;
  const narrow = vw <= 1024;

  return (
    <div style={{ minHeight: "100vh", background: "#0D0B0A" }}>
      <Loader loaded={loaded} />

      <Header page={page} onNavigate={go} mobile={mobile} />

      {page === "home" && (
        <HomeSection
          goMenu={() => go("menu")}
          goLocations={() => go("locations")}
          goAbout={() => go("about")}
          goCareers={() => go("careers")}
          narrow={narrow}
        />
      )}

      {page === "menu" && <MenuSection />}

      {page === "locations" && <LocationsSection />}

      {page === "about" && (
        <AboutSection
          goMenu={() => go("menu")}
          goLocations={() => go("locations")}
        />
      )}

      {page === "careers" && <CareersSection />}

      <Footer />
    </div>
  );
}
