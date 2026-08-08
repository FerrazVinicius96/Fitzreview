import { Link } from 'react-router-dom';

export default function BookCard({ livro }) {
  return (
    <Link
      to={`/livro/${livro.id}`}
      className="group flex gap-4 border border-steel bg-slate-panel/60 p-4 transition hover:border-bronze-soft hover:bg-slate-panel"
    >
      <div className="h-28 w-20 shrink-0 overflow-hidden bg-steel">
        {livro.url_capa ? (
          <img
            src={livro.url_capa.replace('http:', 'https:')}
            alt={`Capa de ${livro.titulo}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-[10px] text-ash">
            SEM CAPA
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-medium text-fog transition group-hover:text-bronze-bright">
          {livro.titulo}
        </h2>
        <p className="mt-1 truncate font-mono text-sm text-ash">{livro.autores}</p>
        <p className="mt-3 line-clamp-2 text-sm text-ash/90">
          {livro.descricao}
        </p>
      </div>
    </Link>
  );
}
