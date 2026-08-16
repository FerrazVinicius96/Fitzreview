import { useEffect } from 'react';
import { ScrollTrigger } from '../animations/gsapRuntime';
import {
  FooterProgressive,
  HeroSection,
  LandingNav,
  StickyScrollSection,
} from '../components/landing';

/**
 * Landing — Combinação 24
 * 1. Hero: scroll-reveal centralizado (GSAP)
 * 2. Meio: sticky 50/50 (Tailwind + Framer Motion)
 * 3. Fim: tipografia progressiva (GSAP scrub + clip-path)
 *
 * Animações pesadas vivem em src/animations/; os componentes só marcam o DOM.
 */
export default function LandingPage() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <div className="bg-obsidian">
      <LandingNav />
      <HeroSection />
      <StickyScrollSection />
      <FooterProgressive />
    </div>
  );
}
