import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  criarAvaliacao,
  deletarAvaliacao,
  listarAvaliacoesPorLivro,
  obterLivro,
} from '../api/client';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { useUsuarioLocal } from '../hooks/useUsuarioLocal';

export default function BookDetailsPage() {
  const { id } = useParams();
  const { garantirUsuario } = useUsuarioLocal();

  const [livro, setLivro] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  // Carrega detalhes (Google Books + cache no Postgres) e reviews do livro
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
      <p className="font-mono text-sm text-ash">Carregando ficha do livro…</p>
    );
  }

  if (erro) {
    return (
      <div className="space-y-4">
        <p className="border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {erro}
        </p>
        <Link to="/" className="font-mono text-sm text-bronze-bright">
          ← Voltar à busca
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-10">
      <Link
        to="/"
        className="inline-block font-mono text-xs uppercase tracking-wider text-ash transition hover:text-bronze-bright"
      >
        ← Voltar à busca
      </Link>

      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
        <div className="h-72 w-full max-w-[200px] overflow-hidden border border-steel bg-steel">
          {livro.url_capa ? (
            <img
              src={livro.url_capa.replace('http:', 'https:')}
              alt={`Capa de ${livro.titulo}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-ash">
              SEM CAPA
            </div>
          )}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-bronze">
            Ficha técnica
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-fog sm:text-4xl">
            {livro.titulo}
          </h1>
          <p className="mt-2 font-mono text-sm text-ash">{livro.autores}</p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ash">
            {livro.descricao}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-fog">
            Avaliações
            <span className="ml-2 font-mono text-sm text-bronze-bright">
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
