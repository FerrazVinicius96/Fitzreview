import { useEffect, useState, type FormEvent } from 'react';
import { buscarLivros } from '../api/client';
import { ScrollTrigger } from '../animations/gsapRuntime';
import {
  FooterProgressive,
  HeroSection,
  LandingNav,
  SearchResultsSection,
  SearchSection,
} from '../components/landing';

type Livro = {
  id: string;
  titulo: string;
  autores: string;
  descricao: string;
  url_capa?: string;
};

/**
 * Página única — Hero (início) → Busca → Resultados → Frase final.
 * Antes havia uma landing (/) e um catálogo (/catalogo) separados;
 * agora é um só fluxo de scroll, com a busca âncorada em #busca.
 */
export default function HomePage() {
  const [termo, setTermo] = useState('');
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [buscou, setBuscou] = useState(false);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  useEffect(() => {
    if (window.location.hash !== '#busca') return;
    const el = document.getElementById('busca');
    el?.scrollIntoView({ block: 'start' });
  }, []);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!termo.trim()) return;

    setLoading(true);
    setErro('');
    setBuscou(true);

    try {
      const resultados = await buscarLivros(termo.trim());
      setLivros(resultados);
    } catch (error: any) {
      setErro(error?.response?.data?.error || 'Falha na busca de livros');
      setLivros([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-obsidian">
      <LandingNav />
      <HeroSection />
      <SearchSection
        termo={termo}
        onTermoChange={setTermo}
        onSubmit={handleSearch}
        loading={loading}
      />
      <SearchResultsSection
        livros={livros}
        loading={loading}
        erro={erro}
        buscou={buscou}
      />
      <FooterProgressive />
    </div>
  );
}
