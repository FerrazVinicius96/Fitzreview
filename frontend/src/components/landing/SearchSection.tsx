import type { FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LampDot } from './LampDot';

type SearchSectionProps = {
  termo: string;
  onTermoChange: (valor: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

/**
 * Seção 2 — Busca.
 * Âncora `#busca`: o Hero e o rodapé apontam para cá (mesma página, sem rota).
 * A faixa de luz no topo retoma o halo que cresce durante o final do Hero —
 * a transição entre seções fica contínua em vez de um corte seco.
 */
export function SearchSection({
  termo,
  onTermoChange,
  onSubmit,
  loading,
}: SearchSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id="busca"
      className="relative scroll-mt-24 bg-obsidian px-6 py-20 sm:px-10 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bronze/[0.06] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="landing-kicker inline-flex items-center justify-center gap-2">
          <LampDot />
          Acervo pessoal
        </p>
        <h2 className="text-display mt-5 text-4xl leading-tight text-paper sm:text-5xl">
          Busque um volume.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-mist">
          Os metadados vêm do Google Books; as resenhas ficam guardadas aqui,
          no arquivo.
        </p>

        <motion.form
          onSubmit={onSubmit}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="ui-panel mx-auto mt-10 flex max-w-xl flex-col gap-3 p-3 sm:flex-row"
        >
          <input
            value={termo}
            onChange={(e) => onTermoChange(e.target.value)}
            placeholder="Ex: Duna, Le Guin, Solaris…"
            className="ui-field flex-1"
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={reduce || loading ? undefined : { scale: 1.02 }}
            whileTap={reduce || loading ? undefined : { scale: 0.97 }}
            className="ui-btn-solid"
          >
            {loading ? 'Buscando…' : 'Buscar'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
