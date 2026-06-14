const express = require('express');
const router = express.Router();
const cadastrarUsuario = require('../controllers/usuarioController');
// invoked to any requests passed to this router

router.use((req, res, next) => {
	// .. some logic here .. like any other middleware

	next();
});

router.get('/home', (req, res) => {
	res.type('text/plain');
	res.end('Home page!');
});

router.post('/usuario', (req, res) => {
	cadastrarUsuario(req, res);
});

module.exports = router;
