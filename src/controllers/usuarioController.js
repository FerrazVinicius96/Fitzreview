const services = require('../services/usuarioService.js');

const cadastrarUsuario = async function (req, res) {
	const { nome, email } = req.body;

	try {
		const novoUsuario = await services.cadastrarUsuario(nome, email);
		res.status(201).send(novoUsuario);
	} catch (error) {
		console.error('Erro ao cadastrar usuário:', error);
		res.status(500).send('Erro ao cadastrar usuário');
	}
};

module.exports = cadastrarUsuario;
