"use client";

import { useEffect, useRef, useState } from "react";

const contacts = [
  {
    label: "Téléphone",
    value: "+212 6 68 70 66 44",
    href: "tel:+212668706644",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3.5 2h3l1.5 3.5-1.75 1.75a10 10 0 004.5 4.5L12.5 10l3.5 1.5v3A1.5 1.5 0 0114.5 16C7.596 16 2 10.404 2 3.5A1.5 1.5 0 013.5 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Email",
    value: "t.daune@sunsethospitality.ma",
    href: "mailto:t.daune@sunsethospitality.ma",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@adventureroad.ma",
    href: "https://instagram.com/adventureroad.ma",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="13" cy="5" r="0.8" fill="currentColor"/>
      </svg>
    ),
  }
];

export default function ContactSection() {
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
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        .contact-link {
          transition: all 0.3s ease;
        }
        .contact-link:hover .contact-icon {
          background: #F5B800;
          color: #000;
          transform: scale(1.05);
        }
        .contact-link:hover .contact-arrow {
          transform: translate(3px, -3px);
        }
        .contact-icon {
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .contact-arrow {
          transition: transform 0.3s ease;
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spin-slow { animation: rotateSlow 30s linear infinite; }
        .spin-slow-rev { animation: rotateSlow 20s linear infinite reverse; }

        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(245,184,0,0); }
          50%      { box-shadow: 0 0 0 8px rgba(245,184,0,0.08); }
        }
        .cta-glow:hover { animation: glowPulse 1.5s ease-in-out infinite; }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className="relative overflow-hidden bg-[#0f0e0c]"
      >
        {/* ── TOP GOLD LINE ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(to right,transparent,#F5B800 30%,#F5B800 70%,transparent)" }}
        />

        {/* ── DECORATIVE CIRCLES ── */}
        <div className="absolute top-1/2 right-[-180px] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#F5B800]/8 spin-slow pointer-events-none" />
        <div className="absolute top-1/2 right-[-100px] -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-[#F5B800]/5 spin-slow-rev pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[360px] h-[360px] rounded-full border border-white/4 spin-slow pointer-events-none" />

        {/* ── GRAIN TEXTURE ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

            {/* ── LEFT — Copy ── */}
            <div>
              {/* Label */}
              <div className={`flex items-center gap-3 mb-8 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>
                <div className="w-8 h-px bg-[#F5B800]" />
                <span className="font-barlow-condensed text-[0.65rem] font-semibold tracking-[.4em] uppercase text-[#F5B800]">
                  Contact
                </span>
              </div>

              {/* Headline */}
              <div className={`mb-8 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
                <h2
                  className="font-bebas text-white leading-[.88] tracking-wide mb-5"
                  style={{ fontSize: "clamp(3rem,6vw,5.5rem)" }}
                >
                  Une aventure<br />
                  se planifie.<br />
                  <span className="text-[#F5B800]">Parlons-en.</span>
                </h2>
                <div className="w-12 h-[2px] bg-[#F5B800]" />
              </div>

              {/* Description */}
              <p className={`font-barlow font-light text-sm leading-relaxed text-white/50 max-w-sm mb-10 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.25s" }}>
                Que ce soit pour une initiation d'une heure ou un raid de six jours
                au cœur de l'Atlas, notre équipe est disponible pour construire
                l'expérience qui vous correspond.
              </p>

              {/* Big CTA button */}
              <div className={`fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.35s" }}>
                <a
                  href="mailto:t.daune@sunsethospitality.ma"
                  className="cta-glow inline-flex items-center gap-4 bg-[#F5B800] text-black px-8 py-4 group hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="font-barlow-condensed text-[0.75rem] font-bold tracking-[.3em] uppercase">
                    Envoyer un message
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="contact-arrow">
                    <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* ── RIGHT — Contact cards ── */}
            <div className="flex flex-col gap-3">
              {contacts.map(({ label, value, href, icon }, i) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`contact-link group flex items-center gap-5 p-5 border border-white/6 hover:border-[#F5B800]/30 bg-white/[0.02] hover:bg-white/[0.04] fade-up ${visible ? "visible" : ""}`}
                  style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                >
                  {/* Icon box */}
                  <div className="contact-icon w-11 h-11 border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                    {icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <span className="font-barlow-condensed text-[0.58rem] font-semibold tracking-[.3em] uppercase text-[#F5B800]/70 block mb-0.5">
                      {label}
                    </span>
                    <span className="font-barlow-condensed text-[0.9rem] font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors truncate block">
                      {value}
                    </span>
                  </div>

                  {/* Arrow */}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="contact-arrow shrink-0 text-white/20 group-hover:text-[#F5B800]" style={{ transition: "color 0.3s" }}>
                    <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>

          </div>

          {/* ── BOTTOM BAR ── */}
          <div className={`mt-20 md:mt-28 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.7s" }}>
            <span className="font-barlow-condensed text-[0.58rem] tracking-[.25em] uppercase text-white/20">
              © 2026 Adventure Road · Buggies Club · Lalla Takerkoust, Marrakech
            </span>
            <span className="font-barlow-condensed text-[0.58rem] tracking-[.2em] uppercase text-white/20">
              Where the road ends, the adventure begins.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}