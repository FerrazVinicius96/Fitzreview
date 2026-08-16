import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  criarAvaliacao,
  deletarAvaliacao,
  listarAvaliacoesPorLivro,
  obterLivro,
} from '../api/client';
import { AtmosphereImage } from '../components/AtmosphereImage';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { imageSlots } from '../data/imageSlots';
import { useUsuarioLocal } from '../hooks/useUsuarioLocal';

export default function BookDetailsPage() {
  const { id } = useParams();
  const { garantirUsuario } = useUsuarioLocal();

  const [livro, setLivro] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      setLoading(true);
      setErro('');
      try {
        const [dadosLivro, lista] = await Promise.all([
          obterLivro(id),
          listarAvaliacoesPorLivro(id),
        ]);
        if (!ativo) return;
        setLivro(dadosLivro);
        setAvaliacoes(lista);
      } catch (error) {
        if (!ativo) return;
        setErro(error.response?.data?.error || 'Erro ao carregar o livro');
      } finally {
        if (ativo) setLoading(false);
      }
    };

    carregar();
    return () => {
      ativo = false;
    };
  }, [id]);

  const handleSubmitReview = async (form) => {
    setEnviando(true);
    try {
      const usuario = await garantirUsuario({
        nome: form.nome,
        email: form.email,
      });

      await criarAvaliacao({
        livro_id: id,
        usuario_id: usuario.id,
        nota: Number(form.nota),
        comentario: form.comentario,
      });

      const lista = await listarAvaliacoesPorLivro(id);
      setAvaliacoes(lista);
    } finally {
      setEnviando(false);
    }
  };

  const handleDelete = async (avaliacaoId) => {
    await deletarAvaliacao(avaliacaoId);
    setAvaliacoes((prev) => prev.filter((a) => a.id !== avaliacaoId));
  };

  if (loading) {
    return (
      <p className="kicker">Carregando ficha do volume…</p>
    );
  }

  if (erro) {
    return (
      <div className="space-y-6">
        <p className="ui-error">{erro}</p>
        <Link
          to="/catalogo"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-bronze-bright"
        >
          ← Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="relative space-y-16">
      <AtmosphereImage
        src={imageSlots.readingLamp}
        className="pointer-events-none absolute -right-8 top-0 h-72 w-72 rounded-full object-cover opacity-20 mix-blend-screen blur-sm"
      />

      <Link
        to="/catalogo"
        className="inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition hover:text-bronze-bright"
      >
        ← Voltar ao catálogo
      </Link>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
        <div className="glow-bronze aspect-[3/4] w-full max-w-[240px] overflow-hidden border border-bronze-soft/50 bg-steel">
          {livro.url_capa ? (
            <img
              src={livro.url_capa.replace('http:', 'https:')}
              alt={`Capa de ${livro.titulo}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-wider text-ash">
              Sem capa
            </div>
          )}
        </div>

        <div>
          <p className="kicker">Ficha técnica</p>
          <h1 className="text-display mt-4 text-4xl leading-[1.05] text-paper sm:text-5xl">
            {livro.titulo}
          </h1>
          <p className="mt-3 font-mono text-xs tracking-wide text-ash">
            {livro.autores}
          </p>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-mist">
            {livro.descricao}
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-display text-3xl text-paper">
            Avaliações
            <span className="ml-3 font-mono text-sm text-bronze-bright">
              ({avaliacoes.length})
            </span>
          </h2>
          <ReviewList avaliacoes={avaliacoes} onDelete={handleDelete} />
        </div>

        <ReviewForm onSubmit={handleSubmitReview} loading={enviando} />
      </div>
    </section>
  );
}
