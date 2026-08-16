import type { Variants } from 'framer-motion';

/**
 * Micro-interações de estado (entrada / hover).
 * Scroll pesado e sincronizado fica no GSAP + ScrollTrigger.
 */
export const fadeUpCard: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const cardHover = {
  y: -6,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};
