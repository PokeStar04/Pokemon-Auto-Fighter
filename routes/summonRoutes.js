// summonRoutes.js
const express = require('express');
const router = express.Router();
const summonController = require('../controllers/summonController');

// Utilisez router.post car vous effectuez une opération de création (insertion)
router.post('/', summonController.summonPokemon);

module.exports = router;