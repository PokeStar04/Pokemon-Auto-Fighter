// dungeonService.js
const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllStages(page = 1) {
    const rows = await db.query(`SELECT * FROM Stage`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    };
}

async function getAllStagesByDungeonId(id) {
    const rows = await db.query(`SELECT * FROM Stage WHERE idDungeon = ?`, [id]);
    const stages = helper.emptyOrRows(rows);
    return stages;
}

module.exports = {
    getAllStages,
    getAllStagesByDungeonId
};
