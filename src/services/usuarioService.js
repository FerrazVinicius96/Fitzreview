const usuarioRepository = require('../repositories/usuarioRepository.js');

const validacaoUsuario = function (nome, email) {
	if (!nome || !email) {
		return false;
	}

	const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	if (!emailValido) {
		return false;
	}

	return true;
};

const cadastrarUsuario = function (nome, email) {
	if (!validacaoUsuario(nome, email)) {
		throw new Error('Dados do usuário inválidos');
	} else {
		return usuarioRepository.cadastrarUsuario(nome, email);
	}
};

module.exports = {
	validacaoUsuario,
	cadastrarUsuario,
};
