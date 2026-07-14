const avaliacaoService = require('../services/avaliacaoService.js');

const criarAvaliacao = async (req, res) => {
	const { livro_id, usuario_id, nota, comentario } = req.body;

	try {
		const novaAvaliacao = await avaliacaoService.cadastrarAvaliacao({
			livro_id,
			usuario_id,
			nota,
			comentario,
		});

		res.status(201).json(novaAvaliacao);
	} catch (error) {
		console.error('Erro ao cadastrar avaliação:', error);
		res.status(500).json({ error: 'Erro ao cadastrar avaliação' });
	}
};

module.exports = {
	criarAvaliacao,
};
