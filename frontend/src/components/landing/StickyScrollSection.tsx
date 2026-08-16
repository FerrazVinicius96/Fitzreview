import { featuredReviews } from '../../data/featuredReviews';
import { ReviewCoverCard } from './ReviewCoverCard';

/**
 * Seção 2 — Sticky Scroll 50/50.
 * Esquerda: narrativa pinada com Tailwind (`sticky top-0`).
 * Direita: cartões fluem; entrada com Framer Motion (whileInView).
 */
export function StickyScrollSection() {
  return (
    <section className="relative border-t border-steel/50 bg-obsidian">
      <div className="grid lg:grid-cols-2">
        <aside className="border-b border-steel/50 px-6 py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:border-b-0 lg:border-r lg:border-steel/50 lg:px-12 xl:px-16">
          <div className="max-w-md">
            <p className="landing-kicker">Filosofia de leitura</p>
            <h2 className="text-display mt-5 text-4xl leading-tight text-paper sm:text-5xl">
              Critério, não volume.
            </h2>
            <p className="mt-8 text-[15px] leading-relaxed text-mist">
              O catálogo não é uma prateleira infinita. É um arquivo pessoal:
              o que ficou, o que ressoou, o que ainda ocupa espaço depois do
              último capítulo. A resenha boa não resume — anatomiza.
            </p>
            <ul className="mt-10 space-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              <li className="border-l border-bronze pl-4 text-paper">
                Ficção científica
              </li>
              <li className="border-l border-steel pl-4">Cyberpunk</li>
              <li className="border-l border-steel pl-4">Espaço & tempo</li>
              <li className="border-l border-steel pl-4">Filosofia de leitura</li>
            </ul>
            <p className="mt-10 text-[15px] leading-relaxed text-mist/80">
              Notas de FC: mundos especulativos como laboratório ético. Herbert,
              Gibson, Lem — engenharia de hipóteses, não só cenário.
            </p>
          </div>
        </aside>

        <div className="space-y-16 px-6 py-20 lg:space-y-24 lg:px-12 lg:py-32 xl:px-16">
          {featuredReviews.map((review, index) => (
            <ReviewCoverCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
