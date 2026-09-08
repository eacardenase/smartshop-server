const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Root");
});

app.get("/hello", (req, res) => {
    res.send("Hello, World!");
});

app.get("/movies/:genre", (req, res) => {
    let {genre} = req.params;

    res.send(`Yeeey, ${genre} movies!`);
});

app.listen(8080, () => {
    console.log("Server is running");
});
