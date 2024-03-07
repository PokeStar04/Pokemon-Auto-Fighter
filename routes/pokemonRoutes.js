// dungeonRoutes.js
const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController'); // Assurez-vous que le chemin est correct

router.get('/', pokemonController.getAllPokemonData);
router.get('/:id', pokemonController.getPokemonDataById);

module.exports = router;
