import { useState } from 'react';

export default function ReviewForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    nota: 5,
    comentario: '',
  });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!form.nome.trim() || !form.email.trim() || !form.comentario.trim()) {
      setErro('Preencha nome, e-mail e comentário.');
      return;
    }

    try {
      await onSubmit(form);
      setForm((prev) => ({ ...prev, comentario: '', nota: 5 }));
    } catch (error) {
      setErro(error.response?.data?.error || error.message);
    }
  };

  const fieldClass =
    'w-full border border-steel bg-ink px-3 py-2 text-fog outline-none transition focus:border-bronze';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-bronze-soft/40 bg-charcoal p-5">
      <div>
        <h3 className="text-lg font-medium text-fog">Nova avaliação</h3>
        <p className="mt-1 font-mono text-xs text-ash">
          Fluxo: formulário → axios → Express → Service → Repository → PostgreSQL
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1 text-sm">
          <span className="font-mono text-xs uppercase tracking-wider text-ash">Nome</span>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Seu nome"
          />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-mono text-xs uppercase tracking-wider text-ash">E-mail</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
            placeholder="voce@email.com"
          />
        </label>
      </div>

      <label className="block space-y-1 text-sm">
        <span className="font-mono text-xs uppercase tracking-wider text-ash">Nota</span>
        <select
          name="nota"
          value={form.nota}
          onChange={handleChange}
          className={fieldClass}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} / 5
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1 text-sm">
        <span className="font-mono text-xs uppercase tracking-wider text-ash">Comentário</span>
        <textarea
          name="comentario"
          rows={4}
          value={form.comentario}
          onChange={handleChange}
          className={fieldClass}
          placeholder="O que achou da leitura?"
        />
      </label>

      {erro && (
        <p className="border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="border border-bronze bg-bronze/20 px-5 py-2.5 font-mono text-sm uppercase tracking-wider text-bronze-bright transition hover:bg-bronze/30 disabled:opacity-50"
      >
        {loading ? 'Enviando…' : 'Publicar review'}
      </button>
    </form>
  );
}
