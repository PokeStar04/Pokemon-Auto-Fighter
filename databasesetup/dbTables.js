const loginDB = require("./loginDB.js");

// Tries to connect
loginDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let pokemonTableSql = `
    CREATE TABLE IF NOT EXISTS Pokemon (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255), 
      type1 VARCHAR(50), 
      type2 VARCHAR(50), 
      hp INT,
      maxHp INT, 
      attack INT,
      defence INT,
      specialAttack INT,
      specialDefence INT,
      speed INT,
      experience INT,
      rarity INT,
      frontSprite VARCHAR(255), 
      backSprite VARCHAR(255)
    )
  `;







  let pokemonInTeam = `
  CREATE TABLE IF NOT EXISTS PokemonTeam(
      id INT AUTO_INCREMENT PRIMARY KEY,
      idTeam INT,
      idPokemonInventory INT,
      slot INT,
      FOREIGN KEY (idPokemonInventory) REFERENCES PokemonInventory(id) ON DELETE CASCADE

    )
    `;



  let pokemonInventory = `
  CREATE TABLE IF NOT EXISTS PokemonInventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idStats INT,
    idUser INT,
    slot INT
)

`;

  loginDB.query(pokemonInventory, function (err, result) {
    if (err) throw err;
    console.log("pokemonInventory table created");
  });


  let Team = `
  CREATE TABLE IF NOT EXISTS Team(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT,
    isActive BOOLEAN
  )
`;


  loginDB.query(Team, function (err, result) {
    if (err) throw err;
    console.log("Team table created");
  });


  loginDB.query(pokemonInTeam, function (err, result) {
    if (err) throw err;
    console.log("PokemonTeam table created");
  });
  let pokemonStats = `
CREATE TABLE IF NOT EXISTS PokemonStat(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idPokemonInventory INT,
    name VARCHAR(255), 
    type1 VARCHAR(50), 
    type2 VARCHAR(50), 
    hp INT,
    maxHp INT, 
    attack INT,
    defence INT,
    specialAttack INT,
    specialDefence INT,
    speed INT,
    experience INT,
    rarity INT,
    frontSprite VARCHAR(255), 
    backSprite VARCHAR(255),
    FOREIGN KEY (idPokemonInventory) REFERENCES PokemonInventory(id) ON DELETE CASCADE
)
`;

  loginDB.query(pokemonStats, function (err, result) {
    if (err) throw err;
    console.log("pokemonStat table created");
  });







  loginDB.query(pokemonTableSql, function (err, result) {
    if (err) throw err;
    console.log("Pokemon table created");
  });

  let dungeonsTableSql = `
    CREATE TABLE IF NOT EXISTS Dungeon(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      rewardXp INT,
      rewardGold INT
    )
    `;

  loginDB.query(dungeonsTableSql, function (err, result) {
    if (err) throw err;
    console.log("Dungeon table created");
  });

  let usersTableSql = `
    CREATE TABLE IF NOT EXISTS User(
      id INT AUTO_INCREMENT PRIMARY KEY,
      userName VARCHAR(255),
      idTeam INT,
      gold INT,
      inventory INT
    )
    `;

  loginDB.query(usersTableSql, function (err, result) {
    if (err) throw err;
    console.log("User table created");
  });


  let stageTableSql = `
    CREATE TABLE IF NOT EXISTS Stage(
      id INT AUTO_INCREMENT PRIMARY KEY,
      idDungeon INT,
      levelStage INT,
      reward INT,
      FOREIGN KEY(idDungeon) REFERENCES Dungeon(id)
    )
    `;

  loginDB.query(stageTableSql, function (err, result) {
    if (err) throw err;
    console.log("Stage table created");
  });

  // encounter == combat
  let encounterTableSql = `
    CREATE TABLE IF NOT EXISTS Encounter(
      id INT AUTO_INCREMENT PRIMARY KEY,
      idStage INT,
      statModifier INT,
      FOREIGN KEY(idStage) REFERENCES Stage(id)
    )
    `;

  loginDB.query(encounterTableSql, function (err, result) {
    if (err) throw err;
    console.log("Encounter table created");
  });

  let pokemonEncounterTableSql = `
    CREATE TABLE IF NOT EXISTS PokemonEncounter(
      id INT AUTO_INCREMENT PRIMARY KEY,
      idPokemon INT,
      idEncounter INT,
      FOREIGN KEY(idPokemon) REFERENCES Pokemon(id),
      FOREIGN KEY(idEncounter) REFERENCES Encounter(id)
    )
    `;

  loginDB.query(pokemonEncounterTableSql, function (err, result) {
    if (err) throw err;
    console.log("PokemonEncounter table created");
  });


  // Close the connection after all tables are created
  loginDB.end();
});


