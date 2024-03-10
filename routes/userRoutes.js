// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Use router.get for retrieving data
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.get('/gold/:id', userController.getUserGoldById);  // Assuming you want to retrieve gold by user ID
// Use router.post for updating data (assuming you're updating gold with newGold)
router.post('/updateGold/:id', userController.updateUserGoldById);

module.exports = router;
