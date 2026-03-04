"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .clip-wrap  { display: block; overflow: hidden; }
        .clip-inner { display: block; transform: translateY(110%);
                      transition: transform 0.75s cubic-bezier(.16,1,.3,1); }
        .clip-inner.d1 { transition-delay: 0.2s; }
        .clip-inner.d2 { transition-delay: 0.35s; }
        .hero-ready .clip-inner { transform: translateY(0); }

        .bar { transition: height 1.1s cubic-bezier(.77,0,.18,1); }

        @keyframes scrollDrop {
          0%   { transform:scaleY(0); transform-origin:top;    opacity:1; }
          50%  { transform:scaleY(1); transform-origin:top;    opacity:1; }
          51%  { transform:scaleY(1); transform-origin:bottom; opacity:1; }
          100% { transform:scaleY(0); transform-origin:bottom; opacity:0; }
        }
        .scroll-drop { animation: scrollDrop 1.8s ease-in-out infinite; }

        @keyframes dotGlow {
          0%,100% { box-shadow:0 0 5px #F5B800; }
          50%      { box-shadow:0 0 18px #F5B800; }
        }
        .dot-glow { animation: dotGlow 2s ease-in-out infinite; }
      `}</style>

      <section id="hero" className={`relative w-full h-screen overflow-hidden bg-black${loaded ? " hero-ready" : ""}`}>

        {/* ── VIDEO BG ── */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          src="/bg.mp4"
          autoPlay loop muted playsInline
        />

        {/* ── LAYERED OVERLAYS ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,184,0,.03) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(245,184,0,.03) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center,transparent 28%,rgba(0,0,0,.8) 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(to top,rgba(0,0,0,.95),transparent)" }}
        />
        <div
          className="absolute inset-y-0 left-0 w-1/2 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(to right,rgba(0,0,0,.65),transparent)" }}
        />

        {/* ── GOLD LEFT EDGE ── */}
        <div
          className={`absolute left-0 inset-y-0 w-[3px] z-[6] transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "linear-gradient(to bottom,transparent,#F5B800 30%,#F5B800 70%,transparent)",
            transitionDelay: "0.8s",
          }}
        />

        {/* ── CINEMATIC BARS ── */}
        <div className={`bar absolute top-0 left-0 right-0 bg-black z-[8] ${loaded ? "h-0" : "h-20"}`} />
        <div className={`bar absolute bottom-0 left-0 right-0 bg-black z-[8] ${loaded ? "h-0" : "h-20"}`} />

        {/* ── LOCATION BADGE (right, vertical) ── */}
        <div
          className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-8 z-[6] flex-col items-center gap-1.5
                      transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1s" }}
        >
          <div className="dot-glow w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
          <span
            className="font-barlow-condensed text-[0.55rem] font-semibold tracking-[.3em] uppercase text-white/40"
            style={{ writingMode: "vertical-rl" }}
          >
            Lalla Takerkoust · Marrakech
          </span>
        </div>

        {/* ── HERO CONTENT ── */}
        <div className="absolute inset-0 z-[5] flex flex-col justify-end px-6 pb-14 sm:px-10 md:px-14 md:pb-20">

          {/* Tagline */}
          <div
            className={`flex items-center gap-3 mb-4 transition-all duration-500 ${loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="w-9 h-px bg-[#F5B800] shrink-0" />
            <span className="font-barlow-condensed text-[0.68rem] font-semibold tracking-[.35em] uppercase text-[#F5B800]">
              Buggies Club · Marrakech · Atlas
            </span>
          </div>

          {/* Main title */}
          <h1
            className="font-bebas text-white mb-5 leading-[.88] tracking-wide"
            style={{ fontSize: "clamp(3.8rem,12vw,9.5rem)" }}
          >
            <span className="clip-wrap">
              <span className="clip-inner d1">Adventure</span>
            </span>
            <span className="clip-wrap">
              <span className="clip-inner d2 text-[#F5B800]">Road.</span>
            </span>
          </h1>

          {/* Bottom row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            {/* Description + buttons */}
            <div
              className={`transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0.45s" }}
            >
              <p className="font-barlow font-light text-sm leading-relaxed text-white/60 max-w-[300px] mb-5">
                Là où l'asphalte laisse place à la poussière. À 30 minutes de
                Marrakech, entre Lalla Takerkoust et l'Atlas — des expéditions
                Polaris premium dans les terrains les plus sauvages du Maroc.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="font-barlow-condensed text-[.75rem] font-bold tracking-[.28em] uppercase bg-[#F5B800]/30 border border-[#F5B800]/40 text-[#F5B800]/70 px-6 py-3 cursor-not-allowed">
                  Réservation bientôt
                </button>
                <button
                  onClick={() => document.querySelector("#raids")?.scrollIntoView({ behavior: "smooth" })}
                  className="font-barlow-condensed text-[.75rem] font-semibold tracking-[.28em] uppercase border border-white/25 text-white/75 px-6 py-3 hover:border-[#F5B800] hover:text-[#F5B800] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Découvrir les Raids
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`flex gap-7 sm:gap-10 transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0.6s" }}
            >
              {[
                { num: "300", label: "Jours de soleil" },
                { num: "4",   label: "Expériences" },
                { num: "30'", label: "De Marrakech" },
              ].map(({ num, label }) => (
                <div key={label} className="text-right">
                  <p className="font-bebas text-[2.2rem] sm:text-[2.6rem] text-[#F5B800] leading-none tracking-wide">
                    {num}
                  </p>
                  <p className="font-barlow-condensed text-[.58rem] font-semibold tracking-[.22em] uppercase text-white/40 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div
          className={`absolute bottom-7 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-2
                      transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1.1s" }}
        >
          <div
            className="scroll-drop w-px h-11"
            style={{ background: "linear-gradient(to bottom,#F5B800,transparent)" }}
          />
          <span className="font-barlow-condensed text-[.55rem] font-semibold tracking-[.35em] uppercase text-white/30">
            Défiler
          </span>
        </div>

      </section>
    </>
  );
}