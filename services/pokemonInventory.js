const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getPokemonInventoryByUserId(idUser) {
    const rows = await db.query(`SELECT * FROM PokemonInventory WHERE idUser = ?`, [idUser]);
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getPokemonInventoryByUserId,
};
