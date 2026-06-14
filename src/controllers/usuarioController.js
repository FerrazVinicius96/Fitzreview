const cadastrarUsuario = function (req, res) {
	const usuario = req.body.name;
	res.send(usuario);
};

module.exports = cadastrarUsuario;
