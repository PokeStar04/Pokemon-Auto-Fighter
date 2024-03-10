// pokemonTeamRoutes.js
const express = require('express');
const router = express.Router();
const pokemonTeamController = require('../controllers/pokemonTeamController'); // Make sure the path is correct

// Route to add a Pokemon to the team
router.post('/add', pokemonTeamController.addPokemonInPokemonTeam);

// Route to get Pokemon team by team ID and user ID
router.get('/:idTeam/:idUser', pokemonTeamController.getPokemonTeamByTeamId);

module.exports = router;
