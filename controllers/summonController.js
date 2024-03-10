// summonController.js
const summonService = require('../services/summonService');

const summonController = {
    summonPokemon: async (req, res, next) => {
        try {
            const { idUser, pokemonStats } = req.body;
            const result = await summonService.addPokemonInPokemonInventoryByUserId(idUser, pokemonStats);
            res.json(result);
        } catch (err) {
            console.error('Error while summoning a Pokemon ', err.message);
            next(err);
        }
    },
};

module.exports = summonController;
