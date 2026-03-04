"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fade-up {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .img-zoom { transition: transform 0.8s cubic-bezier(.16,1,.3,1); }
        .img-zoom:hover { transform: scale(1.06); }
        .cta-shimmer { position: relative; overflow: hidden; }
        .cta-shimmer::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(0,0,0,0.08);
          transform: translateX(-101%); transition: transform 0.35s ease;
        }
        .cta-shimmer:hover::after { transform: translateX(0); }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
        .rotate-slow { animation: rotateSlow 28s linear infinite; }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative bg-[#f7f5f0] overflow-hidden py-20 md:py-28"
      >
        {/* Dot texture */}
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: "radial-gradient(circle, #d4c9b0 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="rotate-slow absolute -top-24 -left-24 w-80 h-80 rounded-full border border-[#F5B800]/20 pointer-events-none" />

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* LABEL */}
          <div className={`flex items-center gap-3 mb-10 md:mb-14 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>
            <div className="w-8 h-px bg-[#F5B800]" />
            <span className="font-barlow-condensed text-[0.65rem] font-semibold tracking-[.4em] uppercase text-[#F5B800]">L'Origine</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">

            {/* ── IMAGE GRID ── */}
            <div className={`fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>

              {/* Row 1: one tall + one square side by side */}
              <div className="flex gap-3">

                {/* Col A: tall image */}
                <div className="relative overflow-hidden flex-none" style={{ width: "58%", height: "380px" }}>
                  <div className="img-zoom w-full h-full relative">
                    <Image src="/buggy.jpg" alt="Buggy" fill className="object-cover" />
                  </div>
                  {/* Gold left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F5B800]" />
                </div>

                {/* Col B: stacked — small top + label block bottom */}
                <div className="flex flex-col gap-3 flex-1">

                  {/* Small square image */}
                  <div className="relative overflow-hidden" style={{ height: "180px" }}>
                    <div className="img-zoom w-full h-full relative">
                      <Image src="/lake.webp" alt="Lalla Takerkoust" fill className="object-cover" />
                    </div>
                  </div>

                  {/* Info block — same height to balance */}
                  <div
                    className="flex-1 flex flex-col justify-between p-4"
                    style={{ background: "#1a1a1a", minHeight: "193px" }}
                  >
                    <div>
                      <div className="w-5 h-[2px] bg-[#F5B800] mb-3" />
                      <p className="font-barlow-condensed text-[0.6rem] font-semibold tracking-[.25em] uppercase text-white/40 mb-1">Localisation</p>
                      <p className="font-bebas text-white text-[1.4rem] leading-tight">Lalla Takerkoust</p>
                    </div>
                    <div>
                      <p className="font-barlow-condensed text-[0.58rem] tracking-[.2em] uppercase text-white/25 mb-1">À seulement</p>
                      <p className="font-bebas text-[#F5B800] text-[2.8rem] leading-none">30'</p>
                      <p className="font-barlow-condensed text-[0.52rem] tracking-[.2em] uppercase text-white/30">de Marrakech</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: wide landscape strip */}
              <div className="relative overflow-hidden mt-3" style={{ height: "160px" }}>
                <div className="img-zoom w-full h-full relative">
                  <Image src="/atlas.jpg" alt="Atlas" fill className="object-cover object-[center_60%]" />
                </div>
                {/* Dark overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <p className="font-barlow-condensed text-[0.58rem] font-semibold tracking-[.3em] uppercase text-[#F5B800] mb-1">Panorama</p>
                  <p className="font-bebas text-white text-[1.3rem] leading-none">Atlas Mountains</p>
                </div>
                {/* Gold bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F5B800]" />
              </div>
            </div>

            {/* ── TEXT ── */}
            <div className="lg:pl-6 xl:pl-10">

              <div className={`mb-6 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.25s" }}>
                <h2
                  className="font-bebas text-[#1a1a1a] leading-[.9] tracking-wide mb-4"
                  style={{ fontSize: "clamp(2.2rem,3.5vw,3.2rem)" }}
                >
                  Nous ne louons pas<br />des buggies.<br />
                  <span className="text-[#F5B800]">Nous créons des expéditions.</span>
                </h2>
                <div className="w-10 h-[2px] bg-[#F5B800]" />
              </div>

              <div className={`space-y-3 mb-8 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.35s" }}>
                <p className="font-barlow font-light text-sm leading-relaxed text-[#1a1a1a]/60">
                  Il y a un moment précis où la route s'arrête. Où l'asphalte
                  laisse place à la poussière. Où le silence devient immense.
                </p>
                <p className="font-barlow font-light text-sm leading-relaxed text-[#1a1a1a]/60">
                  À 30 minutes de Marrakech, entre Lalla Takerkoust
                  et l'Atlas — un territoire brut pour ceux qui cherchent
                  plus qu'une simple sortie en buggy.
                </p>
              </div>

              <div className={`flex gap-8 mb-8 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.45s" }}>
                {[
                  { num: "300", label: "Jours de soleil" },
                  { num: "4",   label: "Expériences" },
                  { num: "6j",  label: "Raids max" },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div className="w-5 h-[2px] bg-[#F5B800] mb-2" />
                    <span className="font-bebas text-[1.8rem] text-[#1a1a1a] leading-none block">{num}</span>
                    <span className="font-barlow-condensed text-[0.52rem] font-semibold tracking-[.2em] uppercase text-[#1a1a1a]/40 mt-0.5 block">{label}</span>
                  </div>
                ))}
              </div>

              <div className={`fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.55s" }}>
                <button
                  onClick={() => document.querySelector("#experiences")?.scrollIntoView({ behavior: "smooth" })}
                  className="cta-shimmer font-barlow-condensed text-[.72rem] font-bold tracking-[.28em] uppercase bg-[#F5B800] text-black px-7 py-3.5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-md"
                >
                  Découvrir nos expériences
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(to right,transparent,#F5B800 30%,#F5B800 70%,transparent)" }}
        />
      </section>
    </>
  );
}