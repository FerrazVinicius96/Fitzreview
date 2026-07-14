const repositories = require('../repositories/avaliacaoRepository.js');

const validacaoAvaliacao = (avaliacao) => {
	if (
		!avaliacao.livro_id ||
		!avaliacao.usuario_id ||
		!avaliacao.nota ||
		!avaliacao.comentario
	) {
		return false;
	}
	return true;
};

const cadastrarAvaliacao = async (avaliacao) => {
	const novaAvaliacao = avaliacao;

	if (!validacaoAvaliacao(novaAvaliacao)) {
		throw new Error('Dados da avaliação inválidos');
	} else {
		return await repositories.cadastrarAvaliacao(novaAvaliacao);
	}
};

module.exports = {
	cadastrarAvaliacao,
};
