const stageService = require('../services/stageService');
const stageController = {
    getAllStages: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const result = await stageService.getAllStages(page);
            res.json(result);
        } catch (err) {
            console.error('Error while getting stages ', err.message);
            next(err);
        }
    },
    getStagesByDungeonId: async (req, res, next) => {
        try {
            const { dungeonId } = req.params;
            const stages = await stageService.getAllStagesByDungeonId(dungeonId);
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

module.exports = stageController;
