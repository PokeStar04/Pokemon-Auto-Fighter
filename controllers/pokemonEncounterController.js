const pokemonEncounterService = require('../services/pokemonEncounterService');

const pokemonEncounterController = {
    getAllEncounterByStageId: async (req, res, next) => {
        try {
            const { idEncounter } = req.params; // Utilisez l'identifiant de la scène depuis les paramètres de la requête
            const result = await pokemonEncounterService.getAllPokemonIdByEncounterId(idEncounter);
            res.json(result);
        } catch (err) {
            console.error('Error while getting encounters ', err.message);
            next(err);
        }
    },
};

module.exports = pokemonEncounterController;
