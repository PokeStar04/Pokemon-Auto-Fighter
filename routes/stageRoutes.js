const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stageController.js'); // Assurez-vous que le chemin est correct

router.get('/', stageController.getAllStages);
router.get('/:dungeonId', stageController.getStagesByDungeonId);

module.exports = router;
