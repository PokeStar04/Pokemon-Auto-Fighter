const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllPokemonIdByEncounterId(idEncounter) {
    const rows = await db.query(`
        SELECT p.*
        FROM Pokemon p
        JOIN PokemonEncounter pe ON p.id = pe.idPokemon
        WHERE pe.idEncounter = ?
    `, [idEncounter]);

    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getAllPokemonIdByEncounterId,
};
