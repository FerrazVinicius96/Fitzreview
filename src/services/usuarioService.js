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

module.exports = validacaoUsuario;
