const express = require('express');
const router = express.Router();
const pokemonInventoryController = require('../controllers/pokemonInventoryController'); // Assurez-vous que le chemin est correct

router.get('/:idUser', pokemonInventoryController.getPokemonInventoryByUserId);

module.exports = router;
