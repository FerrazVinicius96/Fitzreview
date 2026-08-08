import { useState } from 'react';
import { buscarLivros } from '../api/client';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const [termo, setTermo] = useState('');
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [buscou, setBuscou] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!termo.trim()) return;

    setLoading(true);
    setErro('');
    setBuscou(true);

    try {
      // React chama o backend; o backend consulta o Google Books
      const resultados = await buscarLivros(termo.trim());
      setLivros(resultados);
    } catch (error) {
      setErro(error.response?.data?.error || 'Falha na busca de livros');
      setLivros([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-10">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-bronze">
          Arquivo industrial
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fog sm:text-5xl">
          Busque livros.
          <span className="block text-bronze-bright">Registre leituras.</span>
        </h1>
        <p className="mt-4 max-w-xl text-ash">
          Catálogo de reviews conectado ao PostgreSQL, com metadados vindos da
          API do Google Books.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 border border-steel bg-charcoal/70 p-3 sm:flex-row"
      >
        <input
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Ex: Duna, Orwell, design patterns…"
          className="flex-1 border border-steel bg-ink px-4 py-3 text-fog outline-none focus:border-bronze"
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-bronze bg-bronze px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-ink transition hover:bg-bronze-bright disabled:opacity-60"
        >
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {erro && (
        <p className="border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {erro}
        </p>
      )}

      <div className="space-y-4">
        {buscou && !loading && !erro && (
          <p className="font-mono text-xs uppercase tracking-wider text-ash">
            {livros.length} resultado(s)
          </p>
        )}

        <div className="grid gap-3">
          {livros.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </div>
      </div>
    </section>
  );
}
