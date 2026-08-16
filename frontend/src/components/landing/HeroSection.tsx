import { useRef } from 'react';
import { useHeroReveal } from '../../animations/useHeroReveal';
import { HeroShelfPanel } from './HeroShelfPanel';

/**
 * Seção 1 — Hero com scroll-reveal centralizado.
 * Altura extra (220vh) dá pista ao scrub; o palco interno é sticky.
 * GSAP não usa pin() aqui: sticky CSS é mais estável com o React e no mobile.
 */
export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  useHeroReveal(rootRef);

  return (
    <section ref={rootRef} className="relative h-[220vh] bg-obsidian">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          data-hero-panel
          className="absolute inset-0 z-0 origin-bottom translate-y-[78%] scale-[0.72] opacity-0 will-change-transform"
          aria-hidden
        >
          <HeroShelfPanel />
        </div>

        <div
          data-hero-copy
          className="relative z-10 mx-auto max-w-3xl px-6 text-center will-change-transform"
        >
          <p className="landing-kicker">FitzReview · arquivo de leituras</p>
          <h1 className="text-display mt-6 text-5xl font-medium leading-[1.05] text-paper sm:text-6xl md:text-7xl">
            A anatomia de uma boa leitura
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            Um catálogo pessoal de resenhas. Poucos volumes, muito critério.
            O que permanece depois da última página.
          </p>
        </div>

        <p className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-ash/70">
          Role para revelar
        </p>
      </div>
    </section>
  );
}
