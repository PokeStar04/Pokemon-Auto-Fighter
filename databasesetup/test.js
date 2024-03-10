const loginDB = require("./loginDB.js");

// Récupérer les stages du donjon 1
const donjonId = 1;
const queryStages = `
  SELECT *
  FROM Stage
  WHERE idDungeon = ?
`;

loginDB.query(queryStages, [donjonId], function (err, stagesResults) {
    if (err) throw err;

    console.log("Stages du donjon 1 :", stagesResults);

    // Récupérer les encounters de l'étape 1
    const stageId = 1;
    const queryEncounters = `
    SELECT *
    FROM Encounter
    WHERE idStage = ?
  `;

    loginDB.query(queryEncounters, [stageId], function (err, encountersResults) {
        if (err) throw err;

        console.log("Encounters de l'étape 1 :", encountersResults);

        // Récupérer les Pokémon associés à l'encounter 1
        const encounterId = 1; // Remplacez cela par l'ID réel de votre encounter
        const queryPokemonEncounters = `
          SELECT *
          FROM PokemonEncounter
          WHERE idEncounter = ?
        `;

        loginDB.query(queryPokemonEncounters, [encounterId], function (err, encountersPokemonResults) {
            if (err) throw err;

            console.log("Pokémon de l'encounter 1 :", encountersPokemonResults);

            // Récupérer les détails des Pokémon
            const pokemonIDs = encountersPokemonResults.map(row => row.idPokemon);
            const queryPokemon = `
              SELECT *
              FROM Pokemon
              WHERE id IN (?)
            `;

            loginDB.query(queryPokemon, [pokemonIDs], function (err, pokemonResults) {
                if (err) throw err;

                console.log("Détails des Pokémon de l'encounter 1 :", pokemonResults);
            });
        });
    });
});
