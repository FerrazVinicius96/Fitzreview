const pool = require('../config/db/db.js');
const pg = require('pg');

const cadastrarAvaliacao = async (avaliacao) => {
	try {
		const result = await pool.query(
			'INSERT INTO avaliacao (livro_id, usuario_id, nota, comentario) VALUES ($1, $2, $3, $4)',
			[
				avaliacao.livro_id,
				avaliacao.usuario_id,
				avaliacao.nota,
				avaliacao.comentario,
			],
		);
		return result.rows[0];
	} catch (error) {
		console.error('Erro ao cadastrar avaliação:', error);
		throw new Error('Erro ao cadastrar avaliação');
	}
};

module.exports = { cadastrarAvaliacao };
