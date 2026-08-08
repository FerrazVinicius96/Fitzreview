const router = require('express').Router();
const livroController = require('../controllers/livroController.js');

// Proxy da API externa de livros (Google Books)
router.get('/livros/busca', livroController.buscarLivros);
router.get('/livros/:id', livroController.obterLivroPorId);

module.exports = router;
