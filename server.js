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
    let nId = (sNotes.length + 1).toString();
    nNote.id = nId
    sNotes.push(nNote);

    fs.writeFileSync("db/db.json", JSON.stringify(sNotes));
    console.log(`Your note has been saved! Id ${nId}. Content:`, nNote);
    res.json(sNotes);
})

app.delete("/api/notes/:id", (req, res) => {
    let sNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let nId = req.params.id;
    console.log(`Note ${nId} has been deleted.`);
    sNotes = sNotes.filter(currNote => {
        return currNote.id != nId;
    })

    fs.writeFileSync("db/db.json", JSON.stringify(sNotes));
    res.json(sNotes);
})

app.listen(PORT, function () {
    console.log(`listening on PORT ${PORT}`);
})