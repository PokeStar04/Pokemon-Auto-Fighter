// dungeonRoutes.js
const express = require('express');
const router = express.Router();
const dungeonController = require('../controllers/dungeonController.js'); // Assurez-vous que le chemin est correct

router.get('/', dungeonController.getAllDungeons);
router.get('/:id', dungeonController.getDungeonById);

module.exports = router;
