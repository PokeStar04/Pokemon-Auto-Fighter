const pokemonService = require('../services/pokemonService');
const pokemonController = {
    getAllPokemonData: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const result = await pokemonService.getAllPokemonData(page);
            res.json(result);
        } catch (err) {
            console.error('Error while getting stages ', err.message);
            next(err);
        }
    },
    getPokemonDataById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const stages = await pokemonService.getPokemonDataById(id);
            if (!stages) {
                return res.status(404).send('Stages not found for the specified Dungeon ID');
            }
            res.json(stages);
        } catch (err) {
            console.error('Error while getting stages by Dungeon ID ', err.message);
            next(err);
        }
    },
};

module.exports = pokemonController;
