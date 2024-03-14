const express = require("express");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");
const connectToDB = require("./db");

const server = express();

const PORT = 3000;

connectToDB();

server.use(
  express.static(__dirname + "/public"), 
  express.json(),
  cors()
);

server.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

server.use("/api/note", noteRoutes);

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
