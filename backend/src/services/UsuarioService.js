const repository = require('../repositories/usuarioRepository');

class UsuarioService {
	constructor() {
		this.repository = repository;
	}
	async criarUsuario(nome, email, senha_hash) {
		// Aqui você pode adicionar validações de negócio, como:
		// - Verificar se o email já existe
		const usuarioExistente = await this.repository.buscarPorEmail(email);
		if (usuarioExistente) {
			throw new Error('Usuário com este email já existe');
		}

		return await this.repository.criarUsuario(nome, email, senha_hash);
	}

	async buscarUsuario(nome) {
		// 1. Validação inicial (Cláusula de Guarda)
		if (!nome) {
			throw new Error('Obrigatório inserir nome para pesquisa.');
		}

		// 2. Busca de dados
		const usuario = await this.repository.buscarPorNome(nome);

		// 3. Validação do resultado
		if (!usuario) {
			throw new Error('Usuário não cadastrado no sistema.');
		}

		// 4. Retorno do sucesso
		return usuario;
	}

	async atualizarUsuario(id, dadosDoBody) {
		// 1. BLINDAGEM (Sanitização): Quais campos o usuário PODE alterar?
		const camposPermitidos = ['nome', 'email'];
		const camposTratados = {};

		// Varremos o Body recebido. Se o campo existir na lista VIP, nós copiamos.
		// Se o hacker mandar "id" ou "criado_em", este loop ignora.
		for (const campo of camposPermitidos) {
			if (dadosDoBody[campo] !== undefined) {
				camposTratados[campo] = dadosDoBody[campo];
			}
		}

		// 2. REGRA DE NEGÓCIO: Ele tentou atualizar algo válido?
		if (Object.keys(camposTratados).length === 0) {
			throw new Error('Nenhum campo válido fornecido para atualização.');
		}

		// 3. ENVIO: Mandamos os dados limpos para o banco
		const usuarioAtualizado = await usuarioRepository.atualizar(
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
