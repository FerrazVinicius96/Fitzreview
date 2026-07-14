require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const UsuarioRoutes = require('./routes/UsuarioRoutes.js');
const pool = require('./db/db.js');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('', UsuarioRoutes);

pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('Erro ao conectar ao banco de dados:', err);
	}
	console.log('--- BANCO DE DADOS CONECTADO ---');
});

app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
