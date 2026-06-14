const validacaoUsuario = require('../services/usuarioService.js');
const usuarioRepository = require('../repositories/usuarioRepository.js');

const cadastrarUsuario = async function (req, res) {
	const nome = req.body.nome;
	const email = req.body.email;

	if (!validacaoUsuario(nome, email)) {
		return res.status(400).send('Dados do usuário inválidos');
	}

	try {
		const novoUsuario = await usuarioRepository.cadastrarUsuario(nome, email);
		res.status(201).send(novoUsuario);
	} catch (error) {
		console.error('Erro ao cadastrar usuário:', error);
		res.status(500).send('Erro ao cadastrar usuário');
	}
};

module.exports = cadastrarUsuario;
