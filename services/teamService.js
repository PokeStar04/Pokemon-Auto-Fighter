const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllTeamByUserId(id) {
    const rows = await db.query(`SELECT * FROM Team WHERE idUser = ?`, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}
async function getActiveTeamByUserId(id) {
    const rows = await db.query(`SELECT * FROM Team WHERE idUser = ? AND isActive = true`, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}


module.exports = {
    getAllTeamByUserId,
    getActiveTeamByUserId
};
