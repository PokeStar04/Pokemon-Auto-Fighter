const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllEncounterByStageId(stageId) {
    const rows = await db.query(`SELECT * FROM Encounter WHERE idStage = ?`, [stageId]);
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getAllEncounterByStageId,
};
