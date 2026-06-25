const router = require('express').Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/usuarios', (req, res) =>
	usuarioController.criarUsuario(req, res),
);

router.get('/usuarios', (req, res) =>
	usuarioController.buscarUsuario(req, res),
);

router.patch('/usuarios/:id', (req, res) =>
	usuarioController.atualizarEmail(req, res),
);

module.exports = router;
