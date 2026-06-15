const express = require('express');
const router = express.Router();
const cadastrarUsuario = require('../controllers/usuarioController');
const avaliacaoController = require('../controllers/avaliacaoController.js');

router.get('/home', (req, res) => {
	res.type('text/plain');
	res.end('Home page!');
});

router.post('/usuario', (req, res) => {
	cadastrarUsuario(req, res);
});

router.post('/avaliacao', (req, res) => {
	avaliacaoController.criarAvaliacao(req, res);
});

module.exports = router;
