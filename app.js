const express = require("express");
const {body, validationResult} = require("express-validator");

const models = require("./models");

const app = express();

app.use(express.json());

const registerValidator = [
    body("username", "username cannot be empty").not().isEmpty(),
    body("password", "password cannot be empty").not().isEmpty(),
];

app.post("/register", registerValidator, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let msg = errors
            .array()
            .map((err) => err.msg)
            .join(", ");

        return res.status(422).json({
            success: false,
            message: msg,
        });
    }

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
