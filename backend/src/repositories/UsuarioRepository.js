const pool = require('../db/db.js');

class UsuarioRepository {
	async criarUsuario(nome, email, senha_hash) {
		const query = `
            INSERT INTO usuarios (nome, email, senha_hash)
            VALUES ($1, $2, $3)
            RETURNING id, nome, email, criado_em;
        `;
		const values = [nome, email, senha_hash]; // O pg trata os valores aqui de forma segura (evita SQL Injection)

		const resultado = await pool.query(query, values);
		return resultado.rows[0];
	}

	async buscarPorEmail(email) {
		const query = 'SELECT * FROM usuarios WHERE email = $1';
		const resultado = await pool.query(query, [email]);
		return resultado.rows[0];
	}

	async buscarPorNome(nome) {
		const query = `
			SELECT * FROM usuarios WHERE nome = $1
		`;
		const resultado = await pool.query(query, [nome]);
		return resultado.rows[0];
	}

	// O método de atualizar (PATCH) dinâmico
	async atualizar(id, camposTratados) {
		// Exemplo: camposTratados = { nome: "João", email: "joao@gmail.com" }
		const chaves = Object.keys(camposTratados); // ['nome', 'email']
		const valores = Object.values(camposTratados); // ['João', 'joao@gmail.com']

		// Montamos o "SET nome = $1, email = $2" dinamicamente
		const setString = chaves
			.map((chave, index) => `${chave} = $${index + 1}`)
			.join(', ');

		// Adicionamos o ID no final do array de valores para a cláusula WHERE
		valores.push(id);

		const query = `
            UPDATE usuarios
            SET ${setString}
            WHERE id = $${valores.length}
            RETURNING id, nome, email, criado_em;
        `;

		const resultado = await pool.query(query, valores);
		return resultado.rows[0]; // Retorna os novos dados ou undefined se não achar o ID
	}
}

module.exports = new UsuarioRepository();
