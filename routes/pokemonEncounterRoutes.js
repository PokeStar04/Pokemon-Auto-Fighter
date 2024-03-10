const express = require('express');
const router = express.Router();
const pokemonEncounterController = require('../controllers/pokemonEncounterController'); // Assurez-vous que le chemin est correct

router.get('/:idEncounter', pokemonEncounterController.getAllEncounterByStageId);

module.exports = router;
