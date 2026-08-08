const repository = require('../repositories/usuarioRepository');

// Camada Service: regras de negócio e validações (não fala com HTTP nem SQL).
class UsuarioService {
	constructor() {
		this.repository = repository;
	}

	async criarUsuario(nome, email, senha_hash) {
		if (!nome || !email || !senha_hash) {
			throw new Error('nome, email e senha_hash são obrigatórios');
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error('E-mail inválido');
		}

		const usuarioExistente = await this.repository.buscarPorEmail(email);
		if (usuarioExistente) {
			throw new Error('Usuário com este email já existe');
		}

		return await this.repository.criarUsuario(nome, email, senha_hash);
	}

	async buscarUsuario(nome) {
		if (!nome) {
			throw new Error('Obrigatório inserir nome para pesquisa.');
		}

		const usuario = await this.repository.buscarPorNome(nome);
		if (!usuario) {
			throw new Error('Usuário não cadastrado no sistema.');
		}

		return usuario;
	}

	async atualizarUsuario(id, dadosDoBody) {
		const camposPermitidos = ['nome', 'email'];
		const camposTratados = {};

		for (const campo of camposPermitidos) {
			if (dadosDoBody[campo] !== undefined) {
				camposTratados[campo] = dadosDoBody[campo];
			}
		}

		if (Object.keys(camposTratados).length === 0) {
			throw new Error('Nenhum campo válido fornecido para atualização.');
		}

		// Correção: usar this.repository (antes referenciava variável inexistente)
		const usuarioAtualizado = await this.repository.atualizar(
			id,
			camposTratados,
		);

		if (!usuarioAtualizado) {
			throw new Error('Usuário não encontrado no sistema.');
		}

		return usuarioAtualizado;
	}
}

module.exports = UsuarioService;
