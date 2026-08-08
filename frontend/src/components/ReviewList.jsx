export default function ReviewList({ avaliacoes, onDelete }) {
  if (!avaliacoes.length) {
    return (
      <p className="border border-dashed border-steel px-4 py-8 text-center font-mono text-sm text-ash">
        Nenhuma avaliação ainda. Seja o primeiro a registrar.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {avaliacoes.map((item) => (
        <li
          key={item.id}
          className="border border-steel bg-slate-panel/50 px-4 py-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-fog">
                {item.usuario_nome || 'Leitor'}
                <span className="ml-3 font-mono text-sm text-bronze-bright">
                  {item.nota}/5
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ash">
                {item.comentario}
              </p>
              <p className="mt-3 font-mono text-[11px] text-ash/70">
                {new Date(item.criado_em).toLocaleString('pt-BR')}
              </p>
            </div>

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="shrink-0 font-mono text-xs uppercase tracking-wider text-ash transition hover:text-red-400"
              >
                Remover
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
