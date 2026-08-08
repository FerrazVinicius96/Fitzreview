const router = require('express').Router();
const avaliacaoController = require('../controllers/avaliacaoController.js');

// CRUD completo de reviews
router.post('/avaliacoes', avaliacaoController.criarAvaliacao);
router.get('/avaliacoes', avaliacaoController.listarAvaliacoes);
router.get('/avaliacoes/livro/:livroId', avaliacaoController.listarPorLivro);
router.get('/avaliacoes/:id', avaliacaoController.buscarPorId);
router.patch('/avaliacoes/:id', avaliacaoController.atualizarAvaliacao);
router.delete('/avaliacoes/:id', avaliacaoController.deletarAvaliacao);

module.exports = router;
