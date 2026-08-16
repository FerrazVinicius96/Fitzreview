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
  /** Unsplash: "reading lamp warm dark", "desk lamp books night" */
  readingLamp: '/images/reading-lamp.jpg',
  /** Unsplash: "handmade paper texture dark", "linen fabric close up dark" */
  paperFiber: '/images/texture-paper.jpg',
} as const;
