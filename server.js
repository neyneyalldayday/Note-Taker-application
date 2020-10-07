
//required dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//port
const app = express();
const PORT = process.env.PORT || 3030;

//data parsing and middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//listener
app.listen(PORT, function() {
    console.log(`app listening on PORT ${port}`);
})

//route for notes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));

})

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
})

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
})

//route for js file
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

//assign ID to note

app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let newNote = req.body;
    let noteId = noteId;
    savedNotes.push(newNote);

    fs.writeFileSync("db/db.json" , JSON.stringify(savedNotes));
    console.log(`Note saved! Id ${noteId}. Content:`, newNote);
    res.json(savedNotes);
})

//Deletes notes according to id

app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let noteId = req.params.id;
    console.log(`Note ${noteId} deleted.`);
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteId;
    })

    fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})






