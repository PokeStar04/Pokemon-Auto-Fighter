const mysql = require("mysql");
const confif = require("../config.js")

const loginDB = mysql.createConnection(confif.dbVanilla);

loginDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  loginDB.query(`CREATE DATABASE IF NOT EXISTS ${confif.db.database}`, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    loginDB.end();  // Close the connection after the database is created
  });
});
