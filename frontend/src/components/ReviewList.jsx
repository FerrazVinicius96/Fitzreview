export default function ReviewList({ avaliacoes, onDelete }) {
  if (!avaliacoes.length) {
    return (
      <p className="border border-dashed border-steel/70 px-6 py-12 text-center text-sm leading-relaxed text-mist">
        Nenhuma avaliação ainda. Seja o primeiro a registrar o que ficou.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {avaliacoes.map((item) => (
        <li key={item.id} className="ui-panel px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-paper">
                {item.usuario_nome || 'Leitor'}
                <span className="ml-3 font-mono text-sm text-bronze-bright">
                  {item.nota}/5
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {item.comentario}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ash/70">
                {new Date(item.criado_em).toLocaleString('pt-BR')}
              </p>
            </div>

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ash transition hover:text-red-400"
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
