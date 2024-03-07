const loginDB = require("./loginDB.js");
loginDB.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    let pokemonEncounter = [
        [1, 1],
        [3, 1],
        [2, 1],
        [3, 2],
        [2, 2],
        [1, 2],
    ];
    let pokemonEncounterSql = `
    INSERT INTO PokemonEncounter (idPokemon, idEncounter) VALUES ?
  `;
    loginDB.query(pokemonEncounterSql, [pokemonEncounter], function (err, result) {
        if (err) throw err;
        console.log("PokemonEncounter créé");
    });
});
