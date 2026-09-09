const express = require("express");

const models = require("./models");

const app = express();

app.use(express.json());

app.post("/register", (req, res) => {
    const {username, password} = req.body;

    const newUser = models.User.create({
        username,
        password,
    });

    res.status(201).json({
        success: true,
    });
});

app.listen(8080, () => {
    console.log("Server is running");
});
