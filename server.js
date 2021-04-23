const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;
const primeDir = path.join(__dirname, "/public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(primeDir, "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
  let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(saveNotes[Number(req.params.id)]);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(primeDir, "index.html"));
});

app.post("/api/notes", function (res, req) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNotes = req.body;
  let uniqueId = savedNotes.lenght.toString();
  newNotes.id = uniqueId;
  savedNotes.push(newNotes);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Notes have been saved to db.json. Content: ", newNotes);
  res.json(savedNotes);
});

app.listen(PORT, function () {
  console.log(`Now listening on port ${PORT}.`);
});
