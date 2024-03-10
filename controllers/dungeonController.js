const dungeonsService = require('../services/dungeonService');
const dungeonController = {
    getAllDungeons: async (req, res, next) => {
        try {
            const page = req.query.page || 1;
            const result = await dungeonsService.getAllDungeons(page);
            res.json(result);
        } catch (err) {
            console.error('Error while getting dungeons ', err.message);
            next(err);
        }
    },
    getDungeonById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const dungeon = await dungeonsService.getDungeonById(id);
            if (!dungeon) {
                return res.status(404).send('Dungeon not found');
            }
            res.json(dungeon);
        } catch (err) {
            console.error('Error while getting dungeon by ID ', err.message);
            next(err);
        }
    },
};
module.exports = dungeonController;
