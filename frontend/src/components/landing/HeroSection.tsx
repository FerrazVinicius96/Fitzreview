import { useRef } from 'react';
import { useHeroReveal } from '../../animations/useHeroReveal';
import { imageSlots } from '../../data/imageSlots';

/**
 * Seção 1 — Hero com scroll-reveal centralizado.
 * Altura extra (150vh) dá pista ao scrub; o palco de texto interno é sticky,
 * mas o fundo fotográfico NÃO é — é uma imagem alta (150vh, object-cover)
 * que preenche a seção inteira e rola normalmente com a página. Esse é o
 * ponto-chave que resolve o "vão preto": antes, o palco sticky se soltava
 * do topo e deixava ~100vh de `bg-obsidian` liso até a seção de busca
 * começar. Agora essa mesma faixa de scroll mostra a parte de baixo da
 * própria foto (o livro, as sombras) em vez de nada — não sobra vão vazio.
 *
 * `reading-lamp.jpg`: foto em preto-e-branco de uma lâmpada incandescente
 * acesa sobre um livro aberto — veio pronta do usuário, é o motivo visual
 * real substituindo a ilustração SVG como protagonista do Hero.
 */
export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  useHeroReveal(rootRef);

  return (
    <section ref={rootRef} className="relative h-[150vh] bg-obsidian">
      {/* Fundo fotográfico — preenche a seção inteira, não é sticky */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src={imageSlots.readingLamp}
          alt=""
          className="h-full w-full object-cover object-[50%_28%]"
        />
        <div
          data-hero-dim
          className="absolute inset-0 bg-void"
          style={{ opacity: 0.52 }}
        />
        <div className="absolute inset-0 bg-obsidian/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-bronze-soft/10 mix-blend-overlay" />
        <div className="texture-grain absolute inset-0 opacity-30" />
        <div
          data-hero-flood
          className="absolute left-1/2 top-[26%] h-[70vh] w-[70vh] max-h-[820px] max-w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--color-bronze-bright) 60%, transparent) 0%, color-mix(in srgb, var(--color-bronze-soft) 32%, transparent) 34%, transparent 68%)',
            filter: 'blur(18px)',
            opacity: 0,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      {/* Palco de texto — sticky, preso ao topo enquanto a seção rola */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-end overflow-hidden px-6 pb-[16vh] sm:pb-[18vh]">
        <div
          data-hero-copy
          className="relative z-20 mx-auto max-w-3xl text-center will-change-transform"
        >
          <p className="landing-kicker">FitzReview · arquivo de leituras</p>
          <h1 className="text-display mt-6 text-5xl font-medium leading-[1.05] text-paper drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] sm:text-6xl md:text-7xl">
            A anatomia de uma boa leitura
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            Um catálogo pessoal de resenhas. Poucos volumes, muito critério.
            O que permanece depois da última página.
          </p>
        </div>

        <p className="relative z-10 mt-16 font-mono text-[10px] uppercase tracking-[0.35em] text-ash/70">
          Role para revelar
        </p>
      </div>
    </section>
  );
}
