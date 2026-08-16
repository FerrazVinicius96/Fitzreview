import { motion, useReducedMotion } from 'framer-motion';
import { AtmosphereImage } from '../AtmosphereImage';
import BookCard from '../BookCard';
import { imageSlots } from '../../data/imageSlots';
import { IncandescentBulb } from './IncandescentBulb';
import { LampDot } from './LampDot';

type Livro = {
  id: string;
  titulo: string;
  autores: string;
  descricao: string;
  url_capa?: string;
};

type SearchResultsSectionProps = {
  livros: Livro[];
  loading: boolean;
  erro: string;
  buscou: boolean;
};

/**
 * Seção 3 — Resultado da busca.
 * Antes da primeira busca: painel de espera com a lâmpada apagada.
 * Depois: grade de BookCard, como no antigo /catalogo.
 */
export function SearchResultsSection({
  livros,
  loading,
  erro,
  buscou,
}: SearchResultsSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-steel/50 bg-obsidian px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-10">
        {erro && <p className="ui-error">{erro}</p>}

        {!buscou && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden ui-panel"
          >
            <AtmosphereImage
              src={imageSlots.catalogStill}
              className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
            />
            <div className="relative flex flex-col items-center gap-7 px-8 py-20 text-center sm:px-12 sm:py-24">
              <IncandescentBulb className="h-24 w-16" defaultLit={0.14} />
              <div>
                <p className="kicker">A lâmpada aguarda</p>
                <p className="text-display mt-4 max-w-md text-3xl leading-tight text-paper">
                  Comece por um título. Poucos resultados bastam.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {buscou && (
          <div className="space-y-8">
            {!loading && !erro && (
              <p className="landing-kicker inline-flex items-center gap-2">
                <LampDot />
                {livros.length} volume(s)
              </p>
            )}

            <div className="grid gap-4">
              {livros.map((livro) => (
                <BookCard key={livro.id} livro={livro} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
