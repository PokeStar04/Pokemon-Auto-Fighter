const loginDB = require("./loginDB.js");
const axios = require('axios');
// Tries to connect
loginDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  async function getPokemonDataById(pokemonId) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
      return response.data; // Return the Pokémon data
    } catch (error) {
      console.error(`Error fetching data for Pokémon with ID ${pokemonId}:`, error.message);
      throw error;
    }
  }
  let dungeons = [
    ['eau', 100, 100],
    ['feu', 100, 100]
  ];
  let insertDungeonSql = `
    INSERT INTO Dungeon (name, rewardXp, rewardGold) VALUES ?
  `;
  loginDB.query(insertDungeonSql, [dungeons], function (err, result) {
    if (err) throw err;
    console.log("Donjons créés");
  })
  let stageDungeons = [
    [1, 1, 100],
    [1, 2, 120],
    [1, 3, 140],
    [2, 1, 100],
    [2, 2, 120],
    [2, 3, 140]
  ];
  let insertStageSql = `
      INSERT INTO Stage (idDungeon, levelStage, reward) VALUES ?
    `;
  loginDB.query(insertStageSql, [stageDungeons], function (err, result) {
    if (err) throw err;
    console.log("Stages créés");
  })
  let encounter = [
    [1, 1],
    [2, 1.2],
    [3, 1.4],
    [1, 1.0],
    [2, 1.2],
    [3, 1.4]
  ];
  let encounterStageSql = `
        INSERT INTO Encounter (idStage, statModifier) VALUES ?
      `;
  loginDB.query(encounterStageSql, [encounter], function (err, result) {
    if (err) throw err;
    console.log("Encounters créés");
  })
  // Import API (tous les pokemon)
  // For de 0 à 1025 for maVar = 0; maVar < 1025

  let name = "";
  let type1 = "";
  let type2 = "";
  let hp = 0;
  let attack = 0;
  let defence = 0;
  let specialAttack = 0;
  let specialDefence = 0;
  let speed = 0;
  let experience = 0;
  let rarity = 0;
  let frontSprite = "";
  let backSprite = "";

  for (let pokemonCurrentIndex = 1; pokemonCurrentIndex < 8; pokemonCurrentIndex++) {
    getPokemonDataById(pokemonCurrentIndex)
      .then(pokemonData => {
        console.log(pokemonData.name);
        name = pokemonData.name;
        type1 = pokemonData.types[0].type.name;
        if (pokemonData.types[1] && pokemonData.types[1].type) {
          type2 = pokemonData.types[1].type.name;
        } else {
          type2 = "none";
        }
        hp = pokemonData.stats[0].base_stat;
        attack = pokemonData.stats[1].base_stat;
        defence = pokemonData.stats[2].base_stat;
        specialAttack = pokemonData.stats[3].base_stat;
        specialDefence = pokemonData.stats[4].base_stat;
        speed = pokemonData.stats[5].base_stat;
        experience = 0;
        rarity = hp + attack + defence + specialAttack + specialDefence + speed;
        frontSprite = pokemonData.sprites.front_default;
        backSprite = pokemonData.sprites.back_default;
        console.log(pokemonData);
        console.log(frontSprite, backSprite);
        let sql = "INSERT INTO Pokemon (name, type1, type2, hp, attack, defence, specialAttack, specialDefence, speed, experience, rarity, frontSprite, backSprite) VALUES ?";
        let pokemonDataToSend = [[name, type1, type2, hp, attack, defence, specialAttack, specialDefence, speed, experience, rarity, frontSprite, backSprite]];
        loginDB.query(sql, [pokemonDataToSend], function (err, result) {
          if (err) throw err;
          console.log("Pokemon créé");
        });
      })
      .catch(error => {
        console.error(`Failed to fetch data for Pokémon with ID ${pokemonCurrentIndex}:`, error.message);
      });
  }
});

