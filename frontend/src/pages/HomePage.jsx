import { useState } from 'react';
import { buscarLivros } from '../api/client';
import { AtmosphereImage } from '../components/AtmosphereImage';
import BookCard from '../components/BookCard';
import { imageSlots } from '../data/imageSlots';

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
    <section className="space-y-14">
      <div className="max-w-2xl">
        <p className="kicker">Catálogo</p>
        <h1 className="text-display mt-5 text-5xl leading-[1.05] text-paper sm:text-6xl">
          Busque volumes.
          <span className="mt-2 block italic text-mist">Registre o que ficou.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-mist">
          O mesmo arquivo da landing: critério, não volume. Metadados vêm do
          Google Books; as resenhas permanecem no PostgreSQL.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="ui-panel flex flex-col gap-3 p-3 sm:flex-row"
      >
        <input
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Ex: Duna, Le Guin, Solaris…"
          className="ui-field flex-1"
        />
        <button type="submit" disabled={loading} className="ui-btn-solid">
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </form>

      {erro && <p className="ui-error">{erro}</p>}

      {!buscou && (
        <div className="relative overflow-hidden ui-panel">
          <AtmosphereImage
            src={imageSlots.catalogStill}
            className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="relative px-8 py-20 sm:px-12 sm:py-24">
            <p className="kicker">O arquivo espera</p>
            <p className="text-display mt-4 max-w-md text-3xl leading-tight text-paper">
              Comece por um título. Poucos resultados bastam.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {buscou && !loading && !erro && (
          <p className="kicker">
            {livros.length} volume(s)
          </p>
        )}

        <div className="grid gap-4">
          {livros.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </div>
      </div>
    </section>
  );
}
