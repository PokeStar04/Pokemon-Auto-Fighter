const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllPokemonData() {
    const rows = await db.query(`SELECT * FROM Pokemon`);
    const data = helper.emptyOrRows(rows);
    return data;
}

async function getPokemonDataById(id) {
    const rows = await db.query(`SELECT * FROM Pokemon WHERE id = ?`, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getAllPokemonData,
    getPokemonDataById
};
