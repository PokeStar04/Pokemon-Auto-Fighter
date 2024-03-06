const mysql = require("mysql");
const config = require("../config.js");

const loginDB = mysql.createConnection(config.db);

module.exports = loginDB;
