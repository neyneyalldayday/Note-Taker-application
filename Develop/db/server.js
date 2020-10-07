
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
    res.sendFile(path.join(__dirname, "public/notes.html"));
})


