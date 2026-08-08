const livroRepository = require('../repositories/livroRepository.js');

const GOOGLE_BOOKS_BASE = 'https://www.googleapis.com/books/v1/volumes';

// Normaliza o payload do Google Books para o formato da nossa API/React.
const mapearVolume = (volume) => {
	const info = volume.volumeInfo || {};
	const imageLinks = info.imageLinks || {};

	return {
		id: volume.id,
		titulo: info.title || 'Sem título',
		autores: (info.authors || []).join(', ') || 'Autor desconhecido',
		descricao: info.description || 'Sem descrição disponível.',
		url_capa:
			imageLinks.thumbnail ||
			imageLinks.smallThumbnail ||
			null,
		publicadoEm: info.publishedDate || null,
		paginas: info.pageCount || null,
		categorias: info.categories || [],
	};
};

const buscarLivros = async (termo) => {
	if (!termo || !termo.trim()) {
		throw new Error('Parâmetro q (termo de busca) é obrigatório');
	}

	const key = process.env.GOOGLE_BOOKS_API_KEY;
	const url = new URL(GOOGLE_BOOKS_BASE);
	url.searchParams.set('q', termo.trim());
	url.searchParams.set('maxResults', '20');
	url.searchParams.set('printType', 'books');
	if (key) {
		url.searchParams.set('key', key);
	}

	// Integração externa: Node busca no Google e devolve JSON limpo ao frontend
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Falha ao consultar a API do Google Books');
	}

	const data = await response.json();
	const items = data.items || [];
	return items.map(mapearVolume);
};

const obterLivroPorId = async (id) => {
	if (!id) {
		throw new Error('ID do livro é obrigatório');
	}

	const key = process.env.GOOGLE_BOOKS_API_KEY;
	const url = new URL(`${GOOGLE_BOOKS_BASE}/${id}`);
	if (key) {
		url.searchParams.set('key', key);
	}

	const response = await fetch(url);
	if (response.status === 404) {
		throw new Error('Livro não encontrado na API externa');
	}
	if (!response.ok) {
		throw new Error('Falha ao consultar detalhes do livro');
	}

	const volume = await response.json();
	const livro = mapearVolume(volume);

	// Persiste no PostgreSQL para permitir FK em avaliacao
	await livroRepository.upsertLivro(livro);

	return livro;
};

module.exports = {
	buscarLivros,
	obterLivroPorId,
};
