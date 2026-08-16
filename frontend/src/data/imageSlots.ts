/**
 * Slots de imagem — coloque os arquivos em `frontend/public/images/`.
 * Se o arquivo não existir, AtmosphereImage some e o layout segue no grain/CSS.
 *
 * Nomes esperados (veja recomendações de busca no comentário de cada chave):
 */
export const imageSlots = {
  /** Unsplash: "dark bookshelf cinematic", "library night warm light" */
  heroAtmosphere: '/images/hero-atmosphere.jpg',
  /** Unsplash: "open book dark table", "still life books bronze lamp" */
  catalogStill: '/images/catalog-still.jpg',
  /**
   * Fundo do Hero e da transição pós-Hero: lâmpada incandescente acesa sobre
   * um livro aberto, em preto e branco. Preenchida (`reading-lamp.jpg`) —
   * é a imagem real que substitui a estante ilustrada como pano de fundo
   * protagonista do Hero.
   */
  readingLamp: '/images/reading-lamp.jpg',
  /** Unsplash: "handmade paper texture dark", "linen fabric close up dark" */
  paperFiber: '/images/texture-paper.jpg',
} as const;
