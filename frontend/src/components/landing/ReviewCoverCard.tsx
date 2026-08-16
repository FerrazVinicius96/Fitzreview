import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cardHover, fadeUpCard } from '../../animations/motionVariants';
import type { FeaturedReview } from '../../data/featuredReviews';

const toneBorder: Record<FeaturedReview['tone'], string> = {
  bronze: 'border-bronze-soft/50 hover:border-bronze',
  steel: 'border-steel hover:border-mist/30',
  paper: 'border-fog/15 hover:border-paper/40',
};

type Props = {
  review: FeaturedReview;
  index: number;
};

/**
 * Cartão da coluna direita — micro-interação via Framer Motion (whileInView).
 * GSAP fica reservado ao scroll pesado (Hero / Footer); aqui o custo é baixo.
 */
export function ReviewCoverCard({ review, index }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      variants={fadeUpCard}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: Math.min(index * 0.04, 0.2) }}
      whileHover={reduce ? undefined : cardHover}
      className={`group relative border bg-charcoal/40 p-8 sm:p-10 ${toneBorder[review.tone]}`}
    >
      <div className="glow-bronze-sm pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100" />

      <p className="landing-kicker">{review.category}</p>

      <h3 className="text-display mt-5 text-4xl leading-tight text-paper sm:text-5xl">
        {review.title}
      </h3>
      <p className="mt-3 font-mono text-xs tracking-wide text-ash">
        {review.author} · {review.year}
      </p>

      <p className="mt-8 max-w-md text-[15px] leading-relaxed text-mist">
        {review.excerpt}
      </p>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-bronze">
        {review.note}
      </p>

      <Link
        to="/catalogo"
        className="mt-10 inline-block font-mono text-xs uppercase tracking-[0.22em] text-paper/80 transition hover:text-bronze-bright"
      >
        Abrir no catálogo →
      </Link>
    </motion.article>
  );
}
