const db = require("./db");

async function addPokemonInPokemonInventoryByUserId(idUser, pokemonStats) {
    try {
        // Insert a new entry into PokemonInventory
        const resultInventory = await db.query(
            "INSERT INTO PokemonInventory (idUser, slot) VALUES (?, ?)",
            [idUser, 1]
        );
        // Check the property that holds the last inserted ID, it might be 'insertId'
        const idPokemonInventory = resultInventory.insertId;
        // Check if idPokemonInventory is valid
        if (!idPokemonInventory) {
            throw new Error("Failed to retrieve idPokemonInventory");
        }

        try {
            // Insert Pokémon stats into PokemonStat with idPokemonInventory
            const resultStats = await db.query(
                "INSERT INTO PokemonStat (idPokemonInventory, name, type1, type2, hp, maxHp, attack, defence, specialAttack, specialDefence, speed, experience, rarity, frontSprite, backSprite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    idPokemonInventory,
                    pokemonStats[0].name,
                    pokemonStats[0].type1,
                    pokemonStats[0].type2,
                    pokemonStats[0].hp,
                    pokemonStats[0].maxHp,
                    pokemonStats[0].attack,
                    pokemonStats[0].defence,
                    pokemonStats[0].specialAttack,
                    pokemonStats[0].specialDefence,
                    pokemonStats[0].speed,
                    pokemonStats[0].experience,
                    pokemonStats[0].rarity,
                    pokemonStats[0].frontSprite,
                    pokemonStats[0].backSprite
                ]
            );
            const updateInventoryResult = await db.query(
                "UPDATE PokemonInventory SET idStats = ? WHERE id = ?",
                [resultStats.insertId, idPokemonInventory]
            );
            return {
                success: true,
                message: "Pokemon ajouté avec succès dans PokemonInventory et PokemonStat.",
            };
        } catch (errorStats) {
            // Handle errors specific to PokemonStat insertion
            return {
                success: false,
                message: "Une erreur s'est produite lors de l'ajout du Pokemon dans PokemonStat.",
                error: errorStats.message,
            };
        }
    } catch (errorInventory) {
        // Handle errors specific to PokemonInventory insertion
        return {
            success: false,
            message: "Une erreur s'est produite lors de l'ajout du Pokemon dans PokemonInventory.",
            error: errorInventory.message,
        };
    }
}

module.exports = {
    addPokemonInPokemonInventoryByUserId,
};
