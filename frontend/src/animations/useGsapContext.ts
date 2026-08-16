import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from './gsapRuntime';

/**
 * Como evitar memory leaks com GSAP no React
 * ----------------------------------------
 * 1. useLayoutEffect — o DOM já existe, mas o browser ainda não pintou.
 *    Evita um frame com o estado "errado" (FOUC da animação).
 *
 * 2. gsap.context(fn, scope) — agrupa todos os tweens e ScrollTriggers
 *    criados dentro de `fn`, limitando seletores ao elemento `scope`.
 *
 * 3. ctx.revert() no cleanup — desfaz estilos inline, mata tweens e
 *    ScrollTriggers. Sem isso, o React 18+ StrictMode (mount → unmount →
 *    mount) duplica listeners de scroll no `window` e a página “trava”.
 *
 * Nunca faça `gsap.to(...)` solto no corpo do componente.
 * Nunca esqueça o return do effect: é o equivalente a removeEventListener.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  animate: () => void,
  deps: DependencyList = [],
): void {
  useLayoutEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(animate, scope);

    return () => {
      ctx.revert();
    };
    // animate é recriada a cada render; o caller controla a identidade via deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
