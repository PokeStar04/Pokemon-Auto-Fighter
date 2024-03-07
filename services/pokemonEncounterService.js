const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllPokemonIdByEncounterId(idEncounter) {
    const rows = await db.query(`SELECT idPokemon FROM PokemonEncounter WHERE idEncounter = ?`, [idEncounter]);
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getAllPokemonIdByEncounterId,
};