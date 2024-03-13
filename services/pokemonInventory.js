const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getPokemonInventoryByUserId(idUser) {
    const query = `
    SELECT pi.*, ps.*
    FROM PokemonInventory AS pi
    JOIN PokemonStat AS ps ON pi.id = ps.idPokemonInventory
    WHERE pi.idUser = ?
  `;

    const rows = await db.query(query, [idUser]);
    const data = helper.emptyOrRows(rows);
    return data;
}


module.exports = {
    getPokemonInventoryByUserId,
};
