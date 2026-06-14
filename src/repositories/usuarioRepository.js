const pool = require('../config/db/db.js');

const cadastrarUsuario = async (nome, email) => {
	try {
		const result = await pool.query(
			'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
			[nome, email],
		);
		return result.rows[0];
	} catch (error) {
		console.error('Erro ao cadastrar usuário:', error);
		throw error;
	}
};

module.exports = { cadastrarUsuario };
