import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Registro único dos plugins GSAP.
 * Importe este módulo uma vez no bootstrap (main.tsx) — nunca dentro de
 * componentes — para não re-registrar a cada render.
 */
gsap.registerPlugin(ScrollTrigger);

gsap.config({
  // Força compositing em GPU (transform/opacity) e evita layout thrashing.
  force3D: true,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
