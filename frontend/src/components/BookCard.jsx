import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cardHover, fadeUpCard } from '../animations/motionVariants';

export default function BookCard({ livro }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      variants={fadeUpCard}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={reduce ? undefined : cardHover}
    >
      <Link
        to={`/livro/${livro.id}`}
        className="group ui-panel relative flex gap-5 p-5 transition duration-500 hover:border-bronze/60 sm:p-6"
      >
        <div className="glow-bronze-sm pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="h-36 w-24 shrink-0 overflow-hidden border border-steel/60 bg-steel">
          {livro.url_capa ? (
            <img
              src={livro.url_capa.replace('http:', 'https:')}
              alt={`Capa de ${livro.titulo}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-wider text-ash">
              Sem capa
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="kicker">Volume</p>
          <h2 className="text-display mt-2 truncate text-2xl leading-tight text-paper transition group-hover:text-bronze-bright sm:text-3xl">
            {livro.titulo}
          </h2>
          <p className="mt-2 truncate font-mono text-xs tracking-wide text-ash">
            {livro.autores}
          </p>
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-mist">
            {livro.descricao}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
