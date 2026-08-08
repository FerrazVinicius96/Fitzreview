const pool = require('../db/db.js');

// Cache local de livros (evita depender só da API externa nas FKs de avaliação).
const upsertLivro = async (livro) => {
	const result = await pool.query(
		`INSERT INTO livros (id, titulo, autores, descricao, url_capa)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE SET
       titulo = EXCLUDED.titulo,
       autores = EXCLUDED.autores,
       descricao = EXCLUDED.descricao,
       url_capa = EXCLUDED.url_capa
     RETURNING *`,
		[
			livro.id,
			livro.titulo,
			livro.autores || null,
			livro.descricao || null,
			livro.url_capa || null,
		],
	);
	return result.rows[0];
};

const buscarPorId = async (id) => {
	const result = await pool.query('SELECT * FROM livros WHERE id = $1', [
		id,
	]);
	return result.rows[0];
};

module.exports = {
	upsertLivro,
	buscarPorId,
};
