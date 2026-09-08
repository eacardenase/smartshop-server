const express = require("express");
const app = express();

const movies = [
    {
        title: "Lord of the Rings",
        genre: "Fiction",
    },
    {
        title: "Finding Nemo",
        genre: "Kids",
    },
];

app.get("/", (req, res) => {
    res.send("Root");
});

app.get("/hello", (req, res) => {
    res.json({
        message: "Hello, World!",
    });
});

app.get("/movies", (req, res) => {
    res.json(movies);
});

app.get("/movies/:genre", (req, res) => {
    let {genre} = req.params;

    res.send(`Yeeey, ${genre} movies!`);
});

app.get("/movies/:genre/year/:year", (req, res) => {
    const {genre, year} = req.params;

    res.send(`You selected ${genre} and the year is ${year}`);
});

app.listen(8080, () => {
    console.log("Server is running");
});
