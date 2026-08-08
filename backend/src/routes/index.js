const express = require('express');
const router = express.Router();

// Agrega todas as rotas do domínio
const usuarioRoutes = require('./usuarioRoutes.js');
const avaliacaoRoutes = require('./avaliacaoRoutes.js');
const livroRoutes = require('./livroRoutes.js');

router.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

router.use(usuarioRoutes);
router.use(avaliacaoRoutes);
router.use(livroRoutes);

module.exports = router;
