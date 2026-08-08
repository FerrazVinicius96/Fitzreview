require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes/index.js');
const pool = require('./db/db.js');

const port = process.env.PORT || 3000;

// Middlewares globais: CORS libera o React; json parseia o body das requisições
app.use(cors());
app.use(express.json());

// Todas as rotas da API entram por aqui
app.use('/api', routes);

// Teste rápido de conexão com o PostgreSQL na subida do servidor
pool.query('SELECT NOW()', (err) => {
	if (err) {
		console.error('Erro ao conectar ao banco de dados:', err.message);
		return;
	}
	console.log('--- BANCO DE DADOS CONECTADO ---');
});

app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
