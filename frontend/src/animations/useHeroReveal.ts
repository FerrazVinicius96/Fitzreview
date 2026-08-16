import { type RefObject } from 'react';
import { gsap, prefersReducedMotion } from './gsapRuntime';
import { useGsapContext } from './useGsapContext';

/**
 * Hero — Scroll-Reveal centralizado (GSAP ScrollTrigger)
 *
 * Marcadores no markup (sem acoplar a classes Tailwind):
 *   [data-hero-copy]  → bloco de tipografia
 *   [data-hero-dim]   → camada escura sobre a foto de fundo (as luzes sobem)
 *   [data-hero-flood] → halo de luz quente ancorado na lâmpada da foto
 *
 * Propriedades animadas (somente compositing): y, scale, opacity.
 * O palco de texto é sticky no CSS; o ScrollTrigger só faz scrub — evita
 * pin() (que compete com o layout do React e com mobile browsers). A foto
 * de fundo não é sticky — ela é alta (150vh) e rola normalmente, então o
 * "vão preto" que existia depois do Hero virou a parte de baixo da própria
 * foto, sem precisar de mais nenhuma lógica de scroll.
 *
 * `data-hero-dim` começa quase opaco e clareia cedo (~55% do scrub) — efeito
 * de "as luzes sobem" assim que a página carrega o Hero. `data-hero-flood`
 * cresce do início ao fim (100% do scrub), inclusive durante o trecho em
 * que o palco de texto se solta do topo: em vez de um trecho de scroll
 * "morto", a luz segue se espalhando até se fundir ao degradê que introduz
 * a seção de busca.
 */
export function useHeroReveal(root: RefObject<HTMLElement | null>): void {
  useGsapContext(
    root,
    () => {
      const rootEl = root.current;
      if (!rootEl) return;

      const copy = rootEl.querySelector<HTMLElement>('[data-hero-copy]');
      const dim = rootEl.querySelector<HTMLElement>('[data-hero-dim]');
      const flood = rootEl.querySelector<HTMLElement>('[data-hero-flood]');
      if (!copy) return;

      if (prefersReducedMotion()) {
        gsap.set(copy, { y: 0, opacity: 1 });
        if (dim) gsap.set(dim, { opacity: 0.32 });
        if (flood) gsap.set(flood, { opacity: 0.3, scale: 1.4 });
        return;
      }

      gsap.set(copy, { y: 0, opacity: 1 });
      if (dim) gsap.set(dim, { opacity: 0.52 });
      if (flood) {
        gsap.set(flood, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' });
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: rootEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
        },
      });

      tl.to(copy, { y: -32, opacity: 0.2, duration: 0.6 }, 0.32);
      if (dim) tl.to(dim, { opacity: 0.16, duration: 0.55 }, 0);
      if (flood) tl.to(flood, { opacity: 0.4, scale: 2.4, duration: 1 }, 0.05);
    },
    [root],
  );
}
