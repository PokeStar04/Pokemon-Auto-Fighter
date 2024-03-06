const loginDB = require("./loginDB.js");
const axios = require('axios');


// Tries to connect
loginDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // Import API (tous les pokemon)
  // For de 0 à 1025 for maVar = 0; maVar < 1025
  `
  name VARCHAR(255), 
  type1 VARCHAR(50), 
  type2 VARCHAR(50), 
  hp INT, 
  attack INT,
  defence INT,
  specialAttack INT,
  specialDefence INT,
  speed INT,
  experience INT,
  rarity INT
`
  async function getPokemonDataById(pokemonId) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
      return response.data; // Return the Pokémon data
    } catch (error) {
      console.error(`Error fetching data for Pokémon with ID ${pokemonId}:`, error.message);
      throw error;
    }
  }

  for (let pokemonCurrentIndex = 150; pokemonCurrentIndex < 151; pokemonCurrentIndex++) {
    getPokemonDataById(pokemonCurrentIndex)
      .then(pokemonData => {
        console.log(pokemonData.name)
        const name = pokemonData.name;
        const type1 = pokemonData.types[0].type.name;
        if (pokemonData.types[1] && pokemonData.types[1].type) {
          type2 = pokemonData.types[1].type.name;
        } else {
          type2 = "vide";
        }
        const hp = pokemonData.stats[0].base_stat;
        const attack = pokemonData.stats[1].base_stat;
        const defence = pokemonData.stats[2].base_stat;
        const specialAttack = pokemonData.stats[3].base_stat;
        const specialDefence = pokemonData.stats[4].base_stat;
        const speed = +pokemonData.stats[5].base_stat;
        const experience = 0
        const rarity = hp + attack + defence + specialAttack + specialDefence + speed

        let sql = "INSERT INTO characters (name, hitpoints) VALUES ?";
        console.log(rarity)
      })
      .catch(error => {
        console.error(`Failed to fetch data for Pokémon with ID ${pokemonCurrentIndex}:`, error.message);
      });
  }
});


