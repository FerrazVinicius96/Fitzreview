import { type RefObject } from 'react';
import { gsap, prefersReducedMotion } from './gsapRuntime';
import { useGsapContext } from './useGsapContext';

/**
 * Hero — Scroll-Reveal centralizado (GSAP ScrollTrigger)
 *
 * Marcadores no markup (sem acoplar a classes Tailwind):
 *   [data-hero-copy]  → bloco de tipografia
 *   [data-hero-panel] → painel/estante que sobe do fundo
 *
 * Propriedades animadas (somente compositing): y, scale, opacity.
 * O palco é sticky no CSS; o ScrollTrigger só faz scrub — evita pin()
 * (que compete com o layout do React e com mobile browsers).
 */
export function useHeroReveal(root: RefObject<HTMLElement | null>): void {
  useGsapContext(
    root,
    () => {
      const rootEl = root.current;
      if (!rootEl) return;

      const copy = rootEl.querySelector<HTMLElement>('[data-hero-copy]');
      const panel = rootEl.querySelector<HTMLElement>('[data-hero-panel]');
      if (!copy || !panel) return;

      if (prefersReducedMotion()) {
        gsap.set(panel, { yPercent: 0, scale: 1, opacity: 0.4 });
        gsap.set(copy, { y: 0, opacity: 1 });
        return;
      }

      gsap.set(panel, {
        yPercent: 78,
        scale: 0.72,
        opacity: 0,
        transformOrigin: '50% 100%',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: rootEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
        },
      });

      tl.to(copy, { y: -128, opacity: 0.08, duration: 1 }, 0);
      tl.to(panel, { yPercent: 0, scale: 1, duration: 0.38 }, 0);
      tl.to(panel, { opacity: 0.38, duration: 0.72 }, 0.08);
    },
    [root],
  );
}
