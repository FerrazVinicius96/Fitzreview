const repositories = require('../repositories/avaliacaoRepository.js');
const livroRepository = require('../repositories/livroRepository.js');
const usuarioRepository = require('../repositories/usuarioRepository.js');

const validarNota = (nota) => {
	const n = Number(nota);
	return Number.isInteger(n) && n >= 1 && n <= 5;
};

const cadastrarAvaliacao = async (avaliacao) => {
	const { livro_id, usuario_id, nota, comentario } = avaliacao;

	if (!livro_id || !usuario_id || !comentario) {
		throw new Error('livro_id, usuario_id e comentario são obrigatórios');
	}

	if (!validarNota(nota)) {
		throw new Error('nota deve ser um inteiro entre 1 e 5');
	}

	const usuario = await usuarioRepository.buscarPorId(usuario_id);
	if (!usuario) {
		throw new Error('Usuário não encontrado');
	}

	// Garante que o livro existe no cache local antes do INSERT (FK)
	const livro = await livroRepository.buscarPorId(livro_id);
	if (!livro) {
		throw new Error(
			'Livro não encontrado no cache. Busque o livro pela API antes de avaliar.',
		);
	}

	try {
		return await repositories.cadastrarAvaliacao({
			livro_id,
			usuario_id,
			nota: Number(nota),
			comentario: comentario.trim(),
		});
	} catch (error) {
		if (error.code === '23505') {
			throw new Error('Este usuário já avaliou este livro');
		}
		throw error;
	}
};

const listarAvaliacoes = async () => repositories.listarAvaliacoes();

const buscarPorId = async (id) => {
	const avaliacao = await repositories.buscarPorId(id);
	if (!avaliacao) {
		throw new Error('Avaliação não encontrada');
	}
	return avaliacao;
};

const listarPorLivro = async (livroId) => {
	if (!livroId) {
		throw new Error('livroId é obrigatório');
	}
	return repositories.listarPorLivro(livroId);
};

const atualizarAvaliacao = async (id, dados) => {
	if (dados.nota !== undefined && !validarNota(dados.nota)) {
		throw new Error('nota deve ser um inteiro entre 1 e 5');
	}

	if (dados.comentario !== undefined && !dados.comentario.trim()) {
		throw new Error('comentario não pode ser vazio');
	}

	const atualizada = await repositories.atualizarAvaliacao(id, {
		nota: dados.nota !== undefined ? Number(dados.nota) : undefined,
		comentario:
			dados.comentario !== undefined
				? dados.comentario.trim()
				: undefined,
	});

	if (!atualizada) {
		throw new Error('Avaliação não encontrada');
	}

	return atualizada;
};

const deletarAvaliacao = async (id) => {
	const removida = await repositories.deletarAvaliacao(id);
	if (!removida) {
		throw new Error('Avaliação não encontrada');
	}
	return removida;
};

module.exports = {
	cadastrarAvaliacao,
	listarAvaliacoes,
	buscarPorId,
	listarPorLivro,
	atualizarAvaliacao,
	deletarAvaliacao,
};
