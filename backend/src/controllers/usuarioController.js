const UsuarioService = require('../services/usuarioService');

// Camada Controller: traduz HTTP ↔ Service (extrai body/params e devolve status).
class UsuarioController {
	constructor() {
		this.service = new UsuarioService();
	}

	async criarUsuario(req, res) {
		const { nome, email, senha_hash } = req.body;
		try {
			const usuarioCriado = await this.service.criarUsuario(
				nome,
				email,
				senha_hash,
			);
			res.status(201).json(usuarioCriado);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async buscarUsuario(req, res) {
		const { nome } = req.params;

		try {
			const usuario = await this.service.buscarUsuario(nome);
			res.status(200).json(usuario);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	}

	async atualizar(req, res) {
		try {
			const { id } = req.params;
			const dados = req.body;

			const usuarioAtualizado = await this.service.atualizarUsuario(
				id,
				dados,
			);

			return res.status(200).json({
				mensagem: 'Usuário atualizado com sucesso!',
				usuario: usuarioAtualizado,
			});
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
}

module.exports = new UsuarioController();
