const pokemonTeamService = require('../services/pokemonTeam');

const pokemonTeamController = {
    addPokemonInPokemonTeam: async (req, res, next) => {
        try {
            const { teamInfo } = req.body; // Assuming that the teamInfo is part of the request body
            const result = await pokemonTeamService.addPokemonInPokemonTeam(teamInfo);
            res.json(result);
        } catch (err) {
            console.error('Error while adding Pokemon to the team ', err.message);
            next(err);
        }
    },

    getPokemonTeamByTeamId: async (req, res, next) => {
        try {
            const { idTeam, idUser } = req.params;

            const result = await pokemonTeamService.getPokemonTeamByTeamId(idTeam, idUser);
            res.json(result);
        } catch (err) {
            console.error('Error while getting Pokemon team ', err.message);
            next(err);
        }
    },
    getPokemonTeamByUserId: async (req, res, next) => {
        try {

            const { idUser } = req.params;

            const result = await pokemonTeamService.getPokemonTeamByUserId(idUser);
            res.json(result);
        } catch (err) {
            console.error('Error while getting Pokemon team ', err.message);
            next(err);
        }
    },
};

module.exports = pokemonTeamController;
