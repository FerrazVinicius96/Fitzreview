// Pool compartilhado do pg — único ponto de conexão com o PostgreSQL.
// Todos os repositories importam esta instância (não criam Pool próprio).
require('dotenv').config();
const { Pool } = require('pg');

const poolConfig = process.env.DATABASE_URL
	? { connectionString: process.env.DATABASE_URL }
	: {
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			port: Number(process.env.DB_PORT) || 5432,
		};

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
	console.error('Erro inesperado no pool do PostgreSQL:', err);
	process.exit(-1);
});

module.exports = pool;
