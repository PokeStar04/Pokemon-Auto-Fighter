const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllPokemonStat() {
    const rows = await db.query(`SELECT * FROM PokemonStat`);
    const data = helper.emptyOrRows(rows);
    return data;
}

async function getPokemonStatById(id) {
    const rows = await db.query(`SELECT * FROM PokemonStat WHERE idPokemonInventory = ?`, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getAllPokemonStat,
    getPokemonStatById
};
