export type FeaturedReview = {
  id: string;
  category: string;
  title: string;
  author: string;
  excerpt: string;
  note: string;
  year: string;
  tone: 'bronze' | 'steel' | 'paper';
};

/**
 * Conteúdo curado da seção sticky — independente da API Google Books.
 * A landing precisa ser autônoma: a busca real vive em /catalogo.
 */
export const featuredReviews: FeaturedReview[] = [
  {
    id: 'duna',
    category: 'Ficção científica',
    title: 'Duna',
    author: 'Frank Herbert',
    year: '1965',
    excerpt:
      'Ecologia como destreza política. Arrakis não é cenário: é o argumento. A resenha aqui trata de messianismo, água e o preço de uma profecia bem encenada.',
    note: 'Nota de leitura — império, areia, recusa.',
    tone: 'bronze',
  },
  {
    id: 'neuromancer',
    category: 'Cyberpunk',
    title: 'Neuromancer',
    author: 'William Gibson',
    year: '1984',
    excerpt:
      'A cidade como circuito. Case atravessa o ciberespaço como quem atravessa um corredor de hotel barato: rápido, sujo, sem metáfora sobrando.',
    note: 'Nota de leitura — cromo, chuva, vazio.',
    tone: 'steel',
  },
  {
    id: 'fundacao',
    category: 'Espaço & tempo',
    title: 'Fundação',
    author: 'Isaac Asimov',
    year: '1951',
    excerpt:
      'Psico-história como consolo estatístico. A queda do império é lenta o bastante para caber em atas — e nisso reside o horror civilizado do livro.',
    note: 'Nota de leitura — arquivo, ruína, cálculo.',
    tone: 'paper',
  },
  {
    id: 'solaris',
    category: 'Filosofia de leitura',
    title: 'Solaris',
    author: 'Stanisław Lem',
    year: '1961',
    excerpt:
      'O oceano pensa. Nós projetamos. A resenha não explica o planeta: registra o desconforto de um encontro que recusa ser diálogo.',
    note: 'Nota de leitura — espelho, luto, limite.',
    tone: 'bronze',
  },
  {
    id: 'tres-corpos',
    category: 'Ficção científica',
    title: 'O Problema dos Três Corpos',
    author: 'Liu Cixin',
    year: '2008',
    excerpt:
      'Escala cósmica sem consolo humanista. A pergunta que fica não é “e se estivermos sós?”, e sim “e se a floresta estiver escura de propósito?”.',
    note: 'Nota de leitura — silêncio, jogo, abismo.',
    tone: 'steel',
  },
];
