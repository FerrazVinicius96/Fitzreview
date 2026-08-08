const avaliacaoService = require('../services/avaliacaoService.js');

const criarAvaliacao = async (req, res) => {
	try {
		const novaAvaliacao = await avaliacaoService.cadastrarAvaliacao(
			req.body,
		);
		res.status(201).json(novaAvaliacao);
	} catch (error) {
		console.error('Erro ao cadastrar avaliação:', error.message);
		res.status(400).json({ error: error.message });
	}
};

const listarAvaliacoes = async (req, res) => {
	try {
		const lista = await avaliacaoService.listarAvaliacoes();
		res.status(200).json(lista);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const buscarPorId = async (req, res) => {
	try {
		const avaliacao = await avaliacaoService.buscarPorId(req.params.id);
		res.status(200).json(avaliacao);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const listarPorLivro = async (req, res) => {
	try {
		const lista = await avaliacaoService.listarPorLivro(
			req.params.livroId,
		);
		res.status(200).json(lista);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const atualizarAvaliacao = async (req, res) => {
	try {
		const atualizada = await avaliacaoService.atualizarAvaliacao(
			req.params.id,
			req.body,
		);
		res.status(200).json(atualizada);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deletarAvaliacao = async (req, res) => {
	try {
		await avaliacaoService.deletarAvaliacao(req.params.id);
		res.status(204).send();
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

module.exports = {
	criarAvaliacao,
	listarAvaliacoes,
	buscarPorId,
	listarPorLivro,
	atualizarAvaliacao,
	deletarAvaliacao,
};
