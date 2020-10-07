var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));

})

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
})

app.get("/api/notes/:id", function (req, res) {
    let sNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(sNotes[Number(req.params.id)]);
})


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.post("/api/notes", (req, res) => {
    let sNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let nNote = req.body;
    let noteId = noteId;
    sNotes.push(nNote);

    fs.writeFileSync("db/db.json", JSON.stringify(sNotes));
    console.log(`Note saved! Id ${noteId}. Content:`, nNote);
    res.json(sNotes);
})

app.delete("/api/notes/:id", (req, res) => {
    let sNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let noteId = req.params.id;
    console.log(`Note ${noteId} deleted.`);
    sNotes = sNotes.filter(currentNote => {
        return currentNote.id != noteId;
    })

    fs.writeFileSync("db/db.json", JSON.stringify(sNotes));
    res.json(sNotes);
})

app.listen(PORT, function () {
    console.log(`app listening on PORT ${PORT}`);
})