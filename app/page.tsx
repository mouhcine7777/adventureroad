'use client';
import StickyMenu from './components/StickyMenu';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperiencesSection from './components/ExperiencesSection';
import RaidSection from './components/RaidSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <StickyMenu />
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <RaidSection />
      <ContactSection />
    </main>
  );
}