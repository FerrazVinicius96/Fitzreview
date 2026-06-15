require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index.js');
const pool = require('./config/db/db.js');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('', router);

pool.connect();
pool.on('connect', () => {
	console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

pool.on('error', (err) => {
	console.error('Erro na conexão com o banco de dados:', err);
});

app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
