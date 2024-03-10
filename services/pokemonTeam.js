const db = require("./db");
const helper = require("../helper");
const config = require("../config");



async function addPokemonInPokemonTeam(id) {
    const rows = await db.query(`INSERT * FROM PokemonTeam WHERE idPokemonInventory = ?`, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}
async function getPokemonTeamByTeamId(id) {
    const rows = await db.query(`SELECT * FROM PokemonTeam WHERE idTeam = ?`, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    addPokemonInPokemonTeam,
    getPokemonTeamByTeamId,
};
