const pokemonInventoryService = require('../services/pokemonInventory');

const pokemonInventoryController = {
    getPokemonInventoryByUserId: async (req, res, next) => {
        try {
            const { idUser } = req.params; // Utilisez l'identifiant de la scène depuis les paramètres de la requête
            const result = await pokemonInventoryService.getPokemonInventoryByUserId(idUser);
            res.json(result);
        } catch (err) {
            console.error('Error while getting encounters ', err.message);
            next(err);
        }
    },
};

module.exports = pokemonInventoryController;
