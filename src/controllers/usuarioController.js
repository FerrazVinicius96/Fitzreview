const service = require('../services/usuarioService');

class UsuarioController {
	constructor() {
		this.service = new service();
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
		const { nome } = req.body;

		try {
			const usuario = await this.service.buscarUsuario(nome);
			res.status(200).json(usuario);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async atualizar(req, res) {
		try {
			// Pegamos QUEM da URL e O QUE do corpo JSON
			const { id } = req.params;
			const dados = req.body;

			// Delegamos a inteligência para o Service
			const usuarioAtualizado = await usuarioService.atualizarUsuario(
				id,
				dados,
			);

			// Devolvemos HTTP 200 OK
			return res.status(200).json({
				mensagem: 'Usuário atualizado com sucesso!',
				usuario: usuarioAtualizado,
			});
		} catch (error) {
			// Se o Service jogar um "throw new Error", cai aqui no Catch.
			// Erro 400 significa "Bad Request" (O React mandou algo errado)
			return res.status(400).json({ erro: error.message });
		}
	}
}

module.exports = new UsuarioController();
