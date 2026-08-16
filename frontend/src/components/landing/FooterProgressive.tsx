import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFooterTypeFill } from '../../animations/useFooterTypeFill';
import { IncandescentBulb } from './IncandescentBulb';

const CTA = 'Volte sempre que terminar a próxima página.';

/**
 * Seção 3 — Rodapé com tipografia progressiva.
 * Duas camadas idênticas: a de baixo permanece apagada; a de cima revela
 * da esquerda para a direita via clip-path (GSAP scrub).
 */
export function FooterProgressive() {
  const rootRef = useRef<HTMLElement>(null);
  useFooterTypeFill(rootRef);

  return (
    <footer
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-end bg-void px-6 pb-10 pt-32 sm:px-12"
    >
      <div className="texture-grain pointer-events-none absolute inset-0 opacity-50" />

      <IncandescentBulb
        hook="footer-lamp"
        defaultLit={0}
        particles={false}
        className="absolute right-6 top-0 h-20 w-12 sm:right-12 sm:h-24 sm:w-16"
      />

      <a href="#busca" className="relative block max-w-[92vw]">
        <p className="text-display text-[clamp(2.4rem,8vw,7.5rem)] leading-[0.95] text-steel">
          {CTA}
        </p>
        <p
          data-footer-fill
          className="text-display pointer-events-none absolute inset-0 text-[clamp(2.4rem,8vw,7.5rem)] leading-[0.95] text-paper"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
          aria-hidden
        >
          {CTA}
        </p>
      </a>

      <nav className="relative mt-24 flex flex-wrap gap-8 border-t border-steel/40 pt-8 font-mono text-xs uppercase tracking-[0.22em] text-ash">
        <a href="#busca" className="transition hover:text-bronze-bright">
          Buscar
        </a>
        <Link to="/" className="transition hover:text-bronze-bright">
          Início
        </Link>
        <span className="text-steel">FitzReview · 2026</span>
      </nav>
    </footer>
  );
}
