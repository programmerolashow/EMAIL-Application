"use client";

import React, { useEffect, useState } from "react";

const PLACEHOLDER_SRC = "/images/hero-bg-placeholder.webp";
const LOWRES_SRC = "/images/hero-bg-lowres.webp";
const FULL_SRC = "/images/hero-bg.webp";

/**
 * Qorelly-style hero background: a full-bleed photo that loads progressively
 * (blurred placeholder -> low-res -> full) and drifts with a slow cinematic
 * zoom/pan so it reads like video. Motion is disabled for reduced-motion users.
 */
export function HeroBackground() {
  const [lowresLoaded, setLowresLoaded] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const lowres = new Image();
    lowres.onload = () => !cancelled && setLowresLoaded(true);
    lowres.src = LOWRES_SRC;

    const full = new Image();
    full.onload = () => !cancelled && setFullLoaded(true);
    full.src = FULL_SRC;

    return () => {
      cancelled = true;
    };
  }, []);

  const layer = "absolute inset-0 bg-cover bg-center";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-slate-950">
      <style>{`
        @keyframes hero-drift {
          0%   { transform: scale(1.06) translate3d(0, 0, 0); }
          50%  { transform: scale(1.14) translate3d(-1.5%, -1%, 0); }
          100% { transform: scale(1.08) translate3d(1.5%, -2%, 0); }
        }
        .hero-drift { animation: hero-drift 40s ease-in-out infinite alternate; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .hero-drift { animation: none; transform: scale(1.05); }
        }
      `}</style>

      <div className="hero-drift absolute inset-0">
        <div
          className={layer}
          style={{
            backgroundImage: `url(${PLACEHOLDER_SRC})`,
            filter: "blur(12px)",
            transform: "scale(1.05)",
            transition: "opacity 0.5s ease-in-out",
            opacity: fullLoaded ? 0 : 1,
          }}
        />
        <div
          className={layer}
          style={{
            backgroundImage: `url(${LOWRES_SRC})`,
            filter: "blur(4px)",
            transform: "scale(1.02)",
            transition: "opacity 0.4s ease-in-out",
            opacity: lowresLoaded && !fullLoaded ? 1 : 0,
          }}
        />
        <div
          className={layer}
          style={{
            backgroundImage: `url(${FULL_SRC})`,
            transition: "opacity 0.8s ease-in-out",
            opacity: fullLoaded ? 1 : 0,
          }}
        />
      </div>

      {/* Readability: darken behind the nav, headline and feature cards. */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/35 to-slate-950/85" />
    </div>
  );
}
