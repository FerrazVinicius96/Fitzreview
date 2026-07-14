const express = require('express');
const router = express.Router();
const cadastrarUsuario = require('../controllers/usuarioController');
const avaliacaoController = require('../controllers/avaliacaoController.js');
const usuario = require('./UsuarioRoutes.js');

router.use('', usuario);

module.exports = router;
