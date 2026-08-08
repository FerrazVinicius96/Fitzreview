const livroService = require('../services/livroService.js');

const buscarLivros = async (req, res) => {
	try {
		const livros = await livroService.buscarLivros(req.query.q);
		res.status(200).json(livros);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const obterLivroPorId = async (req, res) => {
	try {
		const livro = await livroService.obterLivroPorId(req.params.id);
		res.status(200).json(livro);
	} catch (error) {
		const status = error.message.includes('não encontrado') ? 404 : 400;
		res.status(status).json({ error: error.message });
	}
};

module.exports = {
	buscarLivros,
	obterLivroPorId,
};
