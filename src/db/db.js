// Carrega as variáveis de ambiente (necessário se este ficheiro for testado isoladamente)
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	// Em produção real (com HTTPS/SSL), costumamos precisar desta flag:
	// ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Captura erros em clientes inativos (evita que o servidor Node caia)
pool.on('error', (err, client) => {
	console.error('Erro inesperado no cliente do pool do PostgreSQL', err);
	process.exit(-1);
});

module.exports = pool;
