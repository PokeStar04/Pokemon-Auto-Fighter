const userService = require('../services/userService');

const userController = {
    getAllUser: async (req, res, next) => {
        try {
            const result = await userService.getAllUser();
            res.json(result);
        } catch (err) {
            console.error('Error while getting encounters ', err.message);
            next(err);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params; // Extract id from request parameters
            const result = await userService.getUserById(id);
            res.json(result);
        } catch (err) {
            console.error('Error while getting encounters ', err.message);
            next(err);
        }
    },
    getUserGoldById: async (req, res, next) => {
        try {
            const { id } = req.params; // Extract id from request parameters
            const result = await userService.getUserGoldById(id);
            res.json(result);
        } catch (err) {
            console.error('Error while getting encounters ', err.message);
            next(err);
        }
    },
    updateUserGoldById: async (req, res, next) => {
        try {
            const { id } = req.params; // Extract id from request parameters
            const { newGold } = req.body; // Extract newGold from request body

            const result = await userService.updateUserGoldById(id, newGold);
            res.json(result);
        } catch (err) {
            console.error('Error while getting encounters ', err.message);
            next(err);
        }
    },
};

module.exports = userController;
