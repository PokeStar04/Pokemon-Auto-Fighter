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

  loginDB.query(pokemonTableSql, function (err, result) {
    if (err) throw err;
    console.log("Pokemon table created");
  });

  let dungeonsTableSql = `
    CREATE TABLE IF NOT EXISTS Dungeon (
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
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255), 
      gold INT
    )
  `;

  loginDB.query(usersTableSql, function (err, result) {
    if (err) throw err;
    console.log("User table created");
  });


  let usersTeamSql = `
    CREATE TABLE IF NOT EXISTS UserTeam (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      idUser INT,
      isActive BOOLEAN,
      FOREIGN KEY (idUser) REFERENCES User(id)

    )
  `;

  loginDB.query(usersTeamSql, function (err, result) {
    if (err) throw err;
    console.log("User table created");
  });

  let pokemonTeamSql = `
  CREATE TABLE IF NOT EXISTS PokemonTeam (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    idUserTeam INT,
    idPokemon INT,
    slot INT,
    FOREIGN KEY (idUserTeam) REFERENCES UserTeam(id),
    FOREIGN KEY (idPokemon) REFERENCES Pokemon(id)
  )
`;

  loginDB.query(pokemonTeamSql, function (err, result) {
    if (err) throw err;
    console.log("User table created");
  });


  let stageTableSql = `
    CREATE TABLE IF NOT EXISTS Stage (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      idDungeon INT,
      levelStage INT, 
      reward INT, 
      FOREIGN KEY (idDungeon) REFERENCES Dungeon(id)
    )
  `;

  loginDB.query(stageTableSql, function (err, result) {
    if (err) throw err;
    console.log("Stage table created");
  });

  // encounter == combat
  let encounterTableSql = `
    CREATE TABLE IF NOT EXISTS Encounter (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      idStage INT, 
      statModifier INT,
      FOREIGN KEY (idStage) REFERENCES Stage(id)
    )
  `;

  loginDB.query(encounterTableSql, function (err, result) {
    if (err) throw err;
    console.log("Encounter table created");
  });

  let pokemonEncounterTableSql = `
    CREATE TABLE IF NOT EXISTS PokemonEncounter (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      idPokemon INT, 
      idEncounter INT,
      FOREIGN KEY (idPokemon) REFERENCES Pokemon(id),
      FOREIGN KEY (idEncounter) REFERENCES Encounter(id)
    )
  `;

  loginDB.query(pokemonEncounterTableSql, function (err, result) {
    if (err) throw err;
    console.log("PokemonEncounter table created");
  });


  // Close the connection after all tables are created
  loginDB.end();
});
