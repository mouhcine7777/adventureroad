"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const raids = [
  {
    id: "01",
    days: "2",
    title: "Atlas Escape",
    subtitle: "Raid 2 jours",
    terrain: "Lalla Takerkoust · Plateaux",
    image: "/raid-1.jpg",
    includes: ["Polaris SSV", "Carburant", "Guide", "Mécanicien suiveur", "Repas", "Transferts", "Assurance", "Photos & vidéos"],
  },
  {
    id: "02",
    days: "4",
    title: "Desert & Atlas",
    subtitle: "Raid 4 jours",
    terrain: "Atlas · Désert · Pistes sauvages",
    image: "/raid-2.jpg",
    includes: ["Polaris XP4", "Carburant", "Guide(s)", "Mécanicien suiveur", "Hébergements sélectionnés", "Repas", "Transferts", "Assurance", "Photos & vidéos"],
  },
  {
    id: "03",
    days: "6",
    title: "Grand Raid Maroc",
    subtitle: "Raid 6 jours",
    terrain: "Marrakech → Atlas → Désert → Marrakech",
    image: "/raid-3.jpg",
    includes: ["Polaris XP4", "Carburant", "Guide(s)", "Mécanicien suiveur", "Hébergements sélectionnés", "Repas premium", "Navette VIP", "Assurance", "Photos & vidéos"],
  },
];

function RaidCard({ raid, index, visible }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`raid-card ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: open ? "scale(1.05)" : "scale(1)" }}
        >
          <Image src={raid.image} alt={raid.title} fill className="object-cover" />
        </div>

        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }}
        />

        {/* Ghost day number */}
        <div className="absolute top-4 right-5 font-bebas leading-none text-white/10" style={{ fontSize: "7rem" }}>
          {raid.days}J
        </div>

        {/* Badge */}
        <div className="absolute top-5 left-5 bg-[#F5B800] px-3 py-1.5">
          <span className="font-bebas text-black text-[1rem] leading-none">{raid.days} JOURS</span>
        </div>

        {/* Image bottom text */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-px bg-[#F5B800]" />
            <span className="font-barlow-condensed text-[0.6rem] font-semibold tracking-[.3em] uppercase text-[#F5B800]">
              {raid.subtitle}
            </span>
          </div>
          <h3 className="font-bebas text-white tracking-wide" style={{ fontSize: "2rem" }}>
            {raid.title}
          </h3>
        </div>
      </div>

      {/* Card body — light */}
      <div className="bg-white border border-black/8 p-5 shadow-sm">

        {/* Terrain */}
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 14 14" fill="none">
            <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z" fill="#F5B800" opacity=".9"/>
            <circle cx="7" cy="5" r="1.5" fill="white"/>
          </svg>
          <span className="font-barlow-condensed text-[0.68rem] font-semibold tracking-wide text-black/50">
            {raid.terrain}
          </span>
        </div>

        {/* Toggle included */}
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between cursor-pointer group"
        >
          <span className="font-barlow-condensed text-[0.65rem] font-semibold tracking-[.25em] uppercase text-black/40 group-hover:text-black/70 transition-colors">
            Ce qui est inclus
          </span>
          <div
            className="w-5 h-5 flex items-center justify-center border transition-all duration-300"
            style={{
              background: open ? "#F5B800" : "transparent",
              borderColor: open ? "#F5B800" : "rgba(0,0,0,0.15)",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
              style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
            >
              <path d="M4 1v6M1 4h6" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </button>

        {/* Included list */}
        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
        >
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
            {raid.includes.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#F5B800] shrink-0" />
                <span className="font-barlow-condensed text-[0.62rem] tracking-wide text-black/55">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div className="mt-5 pt-4 border-t border-black/6">
          <span className="font-barlow-condensed text-[0.58rem] tracking-[.2em] uppercase text-black/30">
            Départ · Marrakech
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RaidsSection() {
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
        .raid-card {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .raid-card.visible { opacity: 1; transform: translateY(0); }
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <section
      id="raids"
        ref={sectionRef}
        className="relative overflow-hidden py-20 md:py-28 bg-[#f7f5f0]"
      >
        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #d4c9b0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ghost background text */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center pointer-events-none select-none font-bebas text-black/[0.03] whitespace-nowrap overflow-hidden"
          style={{ fontSize: "clamp(8rem,20vw,22rem)", letterSpacing: "0.08em" }}
        >
          RAIDS
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* ── HEADER ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14 md:mb-18">

            <div className={`fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#F5B800]" />
                <span className="font-barlow-condensed text-[0.65rem] font-semibold tracking-[.4em] uppercase text-[#F5B800]">
                  Nos Raids Signatures
                </span>
              </div>
              <h2
                className="font-bebas text-[#1a1a1a] leading-[.9] tracking-wide"
                style={{ fontSize: "clamp(2.6rem,5vw,4.5rem)" }}
              >
                Partez au cœur<br />
                <span className="text-[#F5B800]">du Maroc sauvage.</span>
              </h2>
            </div>

            <div
              className={`flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 lg:justify-end fade-up ${visible ? "visible" : ""}`}
              style={{ transitionDelay: "0.15s" }}
            >
              <div className="border-l-2 border-[#F5B800]/40 pl-4">
                <span className="font-bebas text-[2rem] text-[#1a1a1a] leading-none block">Marrakech</span>
                <span className="font-barlow-condensed text-[0.6rem] tracking-[.25em] uppercase text-black/35 block mb-1">Départ & Retour</span>
                <p className="font-barlow font-light text-[0.78rem] leading-relaxed text-black/45 max-w-[220px]">
                  Format 2 à 6 jours. Tout inclus, zéro logistique.
                </p>
              </div>

              <div className="flex gap-6 items-end">
                {[
                  { num: "3", label: "Raids" },
                  { num: "6j", label: "Max" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-right">
                    <div className="w-4 h-[2px] bg-[#F5B800] ml-auto mb-2" />
                    <span className="font-bebas text-[2rem] text-[#F5B800] leading-none block">{num}</span>
                    <span className="font-barlow-condensed text-[0.52rem] tracking-[.2em] uppercase text-black/30 block">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-6">
            {raids.map((raid, i) => (
              <RaidCard key={raid.id} raid={raid} index={i} visible={visible} />
            ))}
          </div>

          {/* ── CORPORATE BANNER ── */}
          <div
            className={`mt-12 border border-[#F5B800]/30 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white/60 fade-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0.6s" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-px bg-[#F5B800]" />
                <span className="font-barlow-condensed text-[0.6rem] font-semibold tracking-[.35em] uppercase text-[#F5B800]">
                  Corporate & Incentive
                </span>
              </div>
              <h3 className="font-bebas text-[#1a1a1a] tracking-wide mb-1" style={{ fontSize: "1.6rem" }}>
                Raid sur mesure pour votre équipe ?
              </h3>
              <p className="font-barlow font-light text-[0.78rem] text-black/45 max-w-md">
                Team building · Rallye challenge · Classement & trophée · Dîner privé en bivouac
              </p>
            </div>
            <a
              href="mailto:contact@adventure-road.ma"
              className="shrink-0 font-barlow-condensed text-[0.68rem] font-bold tracking-[.28em] uppercase bg-[#F5B800] text-black px-6 py-3 hover:bg-[#1a1a1a] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Nous contacter
            </a>
          </div>
        </div>

        {/* Bottom gold line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(to right,transparent,#F5B800 30%,#F5B800 70%,transparent)" }}
        />
      </section>
    </>
  );
}