const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const charactersRouter = require("./routes/characters");

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

// Shows a "hello world" on the default link
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Shows an "ok" message on the default database link
app.get("/db", (req, res) => {
  res.json({ message: "ok" });
});

// Used to visualize the "characters" table
app.use("/characters", charactersRouter);

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
