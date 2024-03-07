const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "root",
    database: "dbPokemonAutoFighter",
    port: 8889,
    dialect: 'mysql',
  },
  dbVanilla: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
  },
  listPerPage: 10
};
module.exports = config;
