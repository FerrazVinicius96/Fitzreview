const pool = require('../db/db.js');

// Camada Repository: única que executa SQL. Recebe dados já validados do Service.
class UsuarioRepository {
	async criarUsuario(nome, email, senha_hash) {
		const query = `
            INSERT INTO usuarios (nome, email, senha_hash)
            VALUES ($1, $2, $3)
            RETURNING id, nome, email, criado_em;
        `;
		const resultado = await pool.query(query, [nome, email, senha_hash]);
		return resultado.rows[0];
	}

	async buscarPorEmail(email) {
		const resultado = await pool.query(
			'SELECT id, nome, email, criado_em FROM usuarios WHERE email = $1',
			[email],
		);
		return resultado.rows[0];
	}

	async buscarPorNome(nome) {
		const resultado = await pool.query(
			'SELECT id, nome, email, criado_em FROM usuarios WHERE nome = $1',
			[nome],
		);
		return resultado.rows[0];
	}

	async buscarPorId(id) {
		const resultado = await pool.query(
			'SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1',
			[id],
		);
		return resultado.rows[0];
	}

	async atualizar(id, camposTratados) {
		const chaves = Object.keys(camposTratados);
		const valores = Object.values(camposTratados);

		// Monta SET dinâmico com placeholders ($1, $2...) para evitar SQL injection
		const setString = chaves
			.map((chave, index) => `${chave} = $${index + 1}`)
			.join(', ');

		valores.push(id);

		const query = `
            UPDATE usuarios
            SET ${setString}
            WHERE id = $${valores.length}
            RETURNING id, nome, email, criado_em;
        `;

		const resultado = await pool.query(query, valores);
		return resultado.rows[0];
	}
}

module.exports = new UsuarioRepository();
