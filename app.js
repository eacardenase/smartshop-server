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
    const {genre} = req.params;

    const filteredMovies = movies.filter(
        (movie) => movie.genre.toLowerCase() == genre.toLowerCase(),
    );

    res.json(filteredMovies);
});

app.get("/movies/:genre/year/:year", (req, res) => {
    const {genre, year} = req.params;

    res.send(`You selected ${genre} and the year is ${year}`);
});

app.listen(8080, () => {
    console.log("Server is running");
});
