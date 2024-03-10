// dungeonService.js
const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllDungeons(page = 1) {
    const rows = await db.query(`SELECT * FROM Dungeon`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    };
}

async function getDungeonById(id) {
    const rows = await db.query(`SELECT * FROM Dungeon WHERE id = ?`, [id]);
    const dungeon = helper.emptyOrRows(rows)[0];
    return dungeon;
}

module.exports = {
    getAllDungeons,
    getDungeonById
};
