const pool = require('../db/db.js');

// Repository de avaliações — SQL puro via pool compartilhado.
const cadastrarAvaliacao = async (avaliacao) => {
	const result = await pool.query(
		`INSERT INTO avaliacao (livro_id, usuario_id, nota, comentario)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
		[
			avaliacao.livro_id,
			avaliacao.usuario_id,
			avaliacao.nota,
			avaliacao.comentario,
		],
	);
	return result.rows[0];
};

const listarAvaliacoes = async () => {
	const result = await pool.query(
		`SELECT a.*, u.nome AS usuario_nome
     FROM avaliacao a
     JOIN usuarios u ON u.id = a.usuario_id
     ORDER BY a.criado_em DESC`,
	);
	return result.rows;
};

const buscarPorId = async (id) => {
	const result = await pool.query(
		`SELECT a.*, u.nome AS usuario_nome
     FROM avaliacao a
     JOIN usuarios u ON u.id = a.usuario_id
     WHERE a.id = $1`,
		[id],
	);
	return result.rows[0];
};

const listarPorLivro = async (livroId) => {
	const result = await pool.query(
		`SELECT a.*, u.nome AS usuario_nome
     FROM avaliacao a
     JOIN usuarios u ON u.id = a.usuario_id
     WHERE a.livro_id = $1
     ORDER BY a.criado_em DESC`,
		[livroId],
	);
	return result.rows;
};

const atualizarAvaliacao = async (id, { nota, comentario }) => {
	const result = await pool.query(
		`UPDATE avaliacao
     SET nota = COALESCE($1, nota),
         comentario = COALESCE($2, comentario)
     WHERE id = $3
     RETURNING *`,
		[nota, comentario, id],
	);
	return result.rows[0];
};

const deletarAvaliacao = async (id) => {
	const result = await pool.query(
		`DELETE FROM avaliacao WHERE id = $1 RETURNING id`,
		[id],
	);
	return result.rows[0];
};

module.exports = {
	cadastrarAvaliacao,
	listarAvaliacoes,
	buscarPorId,
	listarPorLivro,
	atualizarAvaliacao,
	deletarAvaliacao,
};
