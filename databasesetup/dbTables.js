const loginDB = require("./loginDB.js");

// Tries to connect
loginDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");




  let pokemonTableSql =
    `CREATE TABLE IF NOT EXISTS Pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255), 
    type1 VARCHAR(50), 
    type2 VARCHAR(50), 
    hp INT, 
    attack INT,
    defence INT,
    specialAttack INT,
    defenceSpe INT,
    speed INT,
    experience INT,
    rarity INT
)`


  loginDB.query(pokemonTableSql, function (err, result) {
    if (err) throw err;
    console.log("Pokemon table created");

    //suite







    // Close the connection after all tables are created
    loginDB.end();
  });
});

