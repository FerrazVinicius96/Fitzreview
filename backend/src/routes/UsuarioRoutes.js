const router = require('express').Router();
const usuarioController = require('../controllers/usuarioController');

// Rotas de usuário — entrada HTTP da arquitetura em camadas
router.post('/usuarios', (req, res) =>
	usuarioController.criarUsuario(req, res),
);

router.get('/usuarios/:nome', (req, res) =>
	usuarioController.buscarUsuario(req, res),
);

router.patch('/usuarios/:id', (req, res) =>
	usuarioController.atualizar(req, res),
);

module.exports = router;
