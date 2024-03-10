const loginDB = require("./loginDB.js");
loginDB.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    let pokemonEncounter = [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [3, 2],
        [2, 2],
        [1, 2],
        [1, 3],
        [3, 3],
        [2, 3],
        [3, 4],
        [2, 4],
        [1, 4],
        [1, 5],
        [3, 5],
        [2, 5],
        [3, 6],
        [2, 6],
        [1, 6],
    ];
    let pokemonEncounterSql = `
    INSERT INTO PokemonEncounter (idPokemon, idEncounter) VALUES ?
  `;
    loginDB.query(pokemonEncounterSql, [pokemonEncounter], function (err, result) {
        if (err) throw err;
        console.log("PokemonEncounter créé");
    });
});
