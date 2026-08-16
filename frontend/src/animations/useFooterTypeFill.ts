import { type RefObject } from 'react';
import { gsap, prefersReducedMotion } from './gsapRuntime';
import { useGsapContext } from './useGsapContext';

const HIDDEN = 'inset(0 100% 0 0)';
const REVEALED = 'inset(0 0% 0 0)';

/**
 * Rodapé — tipografia progressiva (scrub + clip-path)
 *
 * [data-footer-fill] é a camada clara sobre o texto apagado.
 * [data-footer-lamp] acende junto — a lâmpada some quando a frase termina de aparecer.
 * clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
 * revela da esquerda para a direita, amarrado ao eixo Y até o fundo da página.
 */
export function useFooterTypeFill(root: RefObject<HTMLElement | null>): void {
  useGsapContext(
    root,
    () => {
      const rootEl = root.current;
      if (!rootEl) return;

      const fill = rootEl.querySelector<HTMLElement>('[data-footer-fill]');
      const lamp = rootEl.querySelector<HTMLElement>('[data-footer-lamp]');
      if (!fill) return;

      if (prefersReducedMotion()) {
        gsap.set(fill, { clipPath: REVEALED, webkitClipPath: REVEALED });
        if (lamp) gsap.set(lamp, { '--lamp-lit': 1 });
        return;
      }

      gsap.set(fill, { clipPath: HIDDEN, webkitClipPath: HIDDEN });
      if (lamp) gsap.set(lamp, { '--lamp-lit': 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: rootEl,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 0.85,
        },
      });

      tl.to(fill, { clipPath: REVEALED, webkitClipPath: REVEALED }, 0);
      if (lamp) tl.to(lamp, { '--lamp-lit': 1, duration: 0.6 }, 0);
    },
    [root],
  );
}
