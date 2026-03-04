"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const experiences = [
  {
    id: "01",
    title: "Initiation Premium",
    duration: "1h",
    tag: "Découverte",
    desc: "Briefing sécurité, guide professionnel, parcours découverte et photos incluses.",
    image: "/buggy.jpg",
    accent: "#F5B800",
    bg: "from-amber-950/80",
  },
  {
    id: "02",
    title: "Sunset Ride",
    duration: "2h",
    tag: "Signature",
    desc: "Parcours élargi, pause panoramique, vidéo souvenir et moment signature au coucher du soleil.",
    image: "/polaris.webp",
    accent: "#e8520a",
    bg: "from-orange-950/80",
  },
  {
    id: "03",
    title: "Premium Ride",
    duration: "½ Journée",
    tag: "Premium",
    desc: "Itinéraire étendu, collation incluse, expérience immersive pour couples et petits groupes.",
    image: "/buggy2.jpg",
    accent: "#2a7d4f",
    bg: "from-emerald-950/80",
  },
  {
    id: "04",
    title: "Journée Complète",
    duration: "Full Day",
    tag: "Immersif",
    desc: "Déjeuner premium sous tente nomade, navette VIP, parcours sur mesure.",
    image: "/buggy3.jpg",
    accent: "#1d4ed8",
    bg: "from-blue-950/80",
  },
];

function ExperienceCard({ exp, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`fade-card ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${0.1 + index * 0.12}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[480px] sm:h-[520px] overflow-hidden group cursor-pointer card-outer">

        {/* Image */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        >
          <Image src={exp.image} alt={exp.title} fill className="object-cover" />
        </div>

        {/* Constant dark bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)`,
          }}
        />

        {/* Accent color wash on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${exp.accent}55 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Top row — number + tag */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
          <span
            className="font-bebas leading-none"
            style={{ fontSize: "4.5rem", color: exp.accent, opacity: 0.25, lineHeight: 1 }}
          >
            {exp.id}
          </span>
          <span
            className="font-barlow-condensed text-[0.6rem] font-semibold tracking-[.3em] uppercase px-3 py-1.5"
            style={{
              background: exp.accent,
              color: "#000",
            }}
          >
            {exp.tag}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">

          {/* Duration pill */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-px" style={{ background: exp.accent }} />
            <span
              className="font-barlow-condensed text-[0.6rem] font-semibold tracking-[.3em] uppercase"
              style={{ color: exp.accent }}
            >
              {exp.duration}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-bebas text-white leading-none tracking-wide mb-3"
            style={{ fontSize: "clamp(1.6rem,2.5vw,2rem)" }}
          >
            {exp.title}
          </h3>

          {/* Description — slides up on hover */}
          <div
            className="overflow-hidden transition-all duration-500 ease-out"
            style={{ maxHeight: hovered ? "80px" : "0px", opacity: hovered ? 1 : 0 }}
          >
            <p className="font-barlow font-light text-[0.78rem] leading-relaxed text-white/70 mb-4">
              {exp.desc}
            </p>
          </div>

          {/* CTA line */}
          <div
            className="flex items-center gap-3 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0.5, transform: hovered ? "translateX(4px)" : "translateX(0)" }}
          >
            <div className="h-px flex-1" style={{ background: exp.accent }} />
            <span
              className="font-barlow-condensed text-[0.6rem] font-bold tracking-[.3em] uppercase"
              style={{ color: exp.accent }}
            >
              Réservation bientôt
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke={exp.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Left accent bar — animated on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500"
          style={{
            background: exp.accent,
            transform: hovered ? "scaleY(1)" : "scaleY(0.3)",
            transformOrigin: "bottom",
          }}
        />
      </div>
    </div>
  );
}

export default function ExperiencesSection() {
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
        .fade-card {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-card.visible { opacity: 1; transform: translateY(0); }

        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        .card-outer {
          box-shadow: 0 8px 40px rgba(0,0,0,0.18);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .card-outer:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          transform: translateY(-6px);
        }
      `}</style>

      <section
      id="experiences"
        ref={sectionRef}
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #1a1208 0%, #2d1f0a 40%, #1a1510 100%)" }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        {/* Large ghost text background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap font-bebas text-white/[0.02]"
          style={{ fontSize: "clamp(8rem,18vw,20rem)", letterSpacing: "0.1em" }}
        >
          EXPERIENCES
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* ── HEADER ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">

            <div className={`fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#F5B800]" />
                <span className="font-barlow-condensed text-[0.65rem] font-semibold tracking-[.4em] uppercase text-[#F5B800]">
                  Nos Expériences
                </span>
              </div>
              <h2
                className="font-bebas text-white leading-[.9] tracking-wide"
                style={{ fontSize: "clamp(2.4rem,4vw,3.8rem)" }}
              >
                Choisissez votre<br />
                <span className="text-[#F5B800]">aventure.</span>
              </h2>
            </div>

            <p
              className={`font-barlow font-light text-sm leading-relaxed text-white/50 max-w-xs fade-up ${visible ? "visible" : ""}`}
              style={{ transitionDelay: "0.15s" }}
            >
              De l'initiation découverte au raid premium — chaque
              expérience est encadrée, sécurisée et soigneusement orchestrée.
            </p>
          </div>

          {/* ── CARDS GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}