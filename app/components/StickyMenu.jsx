"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navItems = [
  { label: "Accueil",      href: "#hero" },
  { label: "L'Origine",   href: "#about" },
  { label: "Expériences", href: "#experiences" },
  { label: "Raids",       href: "#raids" },
  { label: "Contact",     href: "#contact" },
];

const NAV_H = 64;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Nav blur on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active tracking via scroll position (most reliable for tall sections) ── */
  useEffect(() => {
    const getActive = () => {
      const scrollY = window.scrollY + NAV_H + 80; // offset so it triggers a bit early
      let current = navItems[0].href;
      for (const { href } of navItems) {
        const el = document.querySelector(href);
        if (!el) continue;
        if (el.offsetTop <= scrollY) current = href;
      }
      setActive(current);
    };

    // Run once on mount
    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  /* ── Close mobile menu on scroll ── */
  useEffect(() => {
    const close = () => { if (menuOpen) setMenuOpen(false); };
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const handleClick = (href) => {
    setMenuOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nav-blur { backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }

        @keyframes navDrop {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .nav-enter { animation: navDrop 0.6s cubic-bezier(.16,1,.3,1) both; }

        .mob-menu {
          transition: transform 0.4s cubic-bezier(.16,1,.3,1), opacity 0.3s ease, visibility 0s linear 0.4s;
          transform: translateY(-8px);
          opacity: 0;
          visibility: hidden;
        }
        .mob-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
          transition: transform 0.4s cubic-bezier(.16,1,.3,1), opacity 0.3s ease, visibility 0s;
        }

        .hline {
          display: block; width: 22px; height: 1.5px;
          background: currentColor;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .burger-open .hline:nth-child(1) { transform: translateY(5px) rotate(45deg); }
        .burger-open .hline:nth-child(2) { opacity: 0; }
        .burger-open .hline:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }
      `}</style>

      {/* ── NAV BAR ── */}
      <nav
        className={`nav-enter fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between
                    px-5 sm:px-8 lg:px-12 xl:px-16 transition-all duration-500
                    ${scrolled ? "nav-blur bg-black/85 shadow-[0_1px_0_rgba(245,184,0,0.12)]" : "bg-transparent"}`}
      >
        {/* LOGO */}
        <button onClick={() => handleClick("#hero")} className="cursor-pointer shrink-0">
          <div className="relative w-11 h-11">
            <Image src="/logo.png" alt="Adventure Road" fill className="object-contain" />
          </div>
        </button>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className={`font-barlow-condensed text-[0.72rem] font-semibold tracking-[0.25em] uppercase transition-colors duration-200 cursor-pointer ${
                  active === href ? "text-white" : "text-white/45 hover:text-white/80"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* DESKTOP CTA */}
        <a
          href="mailto:contact@adventure-road.ma"
          className="hidden md:block font-barlow-condensed text-[0.68rem] font-bold tracking-[.28em] uppercase bg-[#F5B800] text-black px-5 py-2.5 hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
        >
          Nous contacter
        </a>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className={`md:hidden flex flex-col gap-[5.5px] p-1 text-white cursor-pointer ${menuOpen ? "burger-open" : ""}`}
          aria-label="Toggle menu"
        >
          <span className="hline" />
          <span className="hline" />
          <span className="hline" />
        </button>
      </nav>

      {/* ── MOBILE DROPDOWN ── */}
      <div
        className={`mob-menu md:hidden fixed left-0 right-0 z-40 nav-blur bg-black/90 border-t border-b border-[#F5B800]/15 ${menuOpen ? "open" : ""}`}
        style={{ top: `${NAV_H}px` }}
      >
        <ul className="flex flex-col px-5 py-4">
          {navItems.map(({ label, href }, i) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className="w-full text-left flex items-center gap-4 py-3.5 border-b border-white/5 cursor-pointer group"
              >
                <span
                  className="font-bebas text-[1rem] leading-none transition-colors duration-200"
                  style={{ color: active === href ? "#F5B800" : "rgba(255,255,255,0.2)" }}
                >
                  0{i + 1}
                </span>
                <span className={`font-barlow-condensed text-[0.82rem] font-semibold tracking-[.25em] uppercase transition-colors duration-200 ${
                  active === href ? "text-white" : "text-white/55 group-hover:text-white"
                }`}>
                  {label}
                </span>
                {active === href && <div className="ml-auto w-4 h-px bg-[#F5B800]" />}
              </button>
            </li>
          ))}
          <li className="pt-3 pb-1">
            <a
              href="mailto:contact@adventure-road.ma"
              className="block w-full text-center font-barlow-condensed text-[0.7rem] font-bold tracking-[.28em] uppercase bg-[#F5B800] text-black py-3 hover:bg-white transition-colors duration-200"
            >
              Nous contacter
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}