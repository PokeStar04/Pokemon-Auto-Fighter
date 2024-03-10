const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const dungeonRoutes = require('./routes/dungeonRoutes.js');
const stageRoutes = require('./routes/stageRoutes.js');
const encounterRoutes = require('./routes/encounterRoutes.js'); // Assurez-vous du bon chemin vers votre fichier encounterRoutes
const pokemonEncounterRoutes = require('./routes/pokemonEncounterRoutes.js'); // Assurez-vous du bon chemin vers votre fichier encounterRoutes
const pokemonRoutes = require('./routes/pokemonRoutes.js'); // Assurez-vous du bon chemin vers votre fichier encounterRoutes
const summonRoutes = require('./routes/summonRoutes.js'); // Assurez-vous du bon chemin vers votre fichier encounterRoutes
const userRoutes = require('./routes/userRoutes.js'); // Assurez-vous du bon chemin vers votre fichier encounterRoutes
const pokemonInventoryRoutes = require('./routes/pokemonInventoryRoutes.js'); // Assurez-vous du bon chemin vers votre fichier encounterRoutes
const pokemonTeamRoutes = require('./routes/pokemonTeamRoutes.js'); // Assurez-vous du bon chemin vers votre fichier encounterRoutes



const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
};

// Use this after the variable declaration
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);



// Shows an "ok" message on the default database link
app.get("/db", (req, res) => {
  res.json({ message: "ok" });
});



app.use('/dungeons', dungeonRoutes);
app.use('/stages', stageRoutes);
app.use('/encounters', encounterRoutes);
app.use('/pokemonEncounters', pokemonEncounterRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/summon', summonRoutes);
app.use('/user', userRoutes);
app.use('/pokemonInventory', pokemonInventoryRoutes);
app.use('/pokemonTeam', pokemonTeamRoutes);










/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});












app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Let the "public" folder be seen by everyone, this is where the game logic should be placed
app.use(express.static("public"));

let server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("Example server listening at http://%s:%s", host, port);
});
