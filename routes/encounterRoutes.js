const express = require('express');
const router = express.Router();
const encounterController = require('../controllers/encounterController'); // Assurez-vous que le chemin est correct

router.get('/:stageId', encounterController.getAllEncounterByStageId);

module.exports = router;
