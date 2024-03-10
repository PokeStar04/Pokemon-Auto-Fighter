const db = require("./db");
const helper = require("../helper");
const config = require("../config");


async function addPokemonInPokemonTeam(teamInfo) {
    try {
        const idTeam = 0;
        const idInventoryArray = teamInfo.idPokemonInventory; // Assuming idPokemonInventory is an array

        const slot = teamInfo.slot;

        // Assuming idPokemonInventory is an array, insert each element separately
        const insertPromises = idInventoryArray.map(async (idInventory) => {
            const rows = await db.query(
                `INSERT INTO PokemonTeam (idTeam, IdInventory, slot) VALUES (?, ?, ?)`,
                [idTeam, idInventory, slot]
            );
            return helper.emptyOrRows(rows);
        });

        const result = await Promise.all(insertPromises);

        return result;
    } catch (error) {
        console.error('Error while adding Pokemon to the team', error.message);
        throw error;
    }
}


async function getPokemonTeamByTeamId(idTeam, idUser) {
    const query = `
    SELECT *
    FROM PokemonTeam
    WHERE PokemonTeam.idInventory = PokemonInventory.id
     
    
    
    `;

    const rows = await db.query(query, [idTeam, idUser]);
    const data = helper.emptyOrRows(rows);
    return data;
}


module.exports = {
    addPokemonInPokemonTeam,
    getPokemonTeamByTeamId,
};
