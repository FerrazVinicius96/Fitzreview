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

  return (
    <form onSubmit={handleSubmit} className="ui-panel space-y-5 p-6 sm:p-8">
      <div>
        <p className="kicker">Nova avaliação</p>
        <h3 className="text-display mt-3 text-3xl text-paper">O que ficou.</h3>
        <p className="mt-2 font-mono text-[11px] tracking-wide text-ash">
          Formulário → axios → Express → Service → Repository → PostgreSQL
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Nome
          </span>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="ui-field"
            placeholder="Seu nome"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            E-mail
          </span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="ui-field"
            placeholder="voce@email.com"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Nota
        </span>
        <select
          name="nota"
          value={form.nota}
          onChange={handleChange}
          className="ui-field"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} / 5
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Comentário
        </span>
        <textarea
          name="comentario"
          rows={4}
          value={form.comentario}
          onChange={handleChange}
          className="ui-field"
          placeholder="O que o livro fez com a atenção?"
        />
      </label>

      {erro && <p className="ui-error">{erro}</p>}

      <button type="submit" disabled={loading} className="ui-btn">
        {loading ? 'Enviando…' : 'Publicar review'}
      </button>
    </form>
  );
}
