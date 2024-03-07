const encounterService = require('../services/encounterService');

const encounterController = {
    getAllEncounterByStageId: async (req, res, next) => {
        try {
            const { stageId } = req.params; // Utilisez l'identifiant de la scène depuis les paramètres de la requête
            const result = await encounterService.getAllEncounterByStageId(stageId);
            res.json(result);
        } catch (err) {
            console.error('Error while getting encounters ', err.message);
            next(err);
        }
    },
};

module.exports = encounterController;
