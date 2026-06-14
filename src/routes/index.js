const express = require('express');
const router = express.Router();
const cadastrarUsuario = require('../controllers/usuarioController');

router.get('/home', (req, res) => {
	res.type('text/plain');
	res.end('Home page!');
});

router.post('/usuario', (req, res) => {
	cadastrarUsuario(req, res);
});

module.exports = router;
