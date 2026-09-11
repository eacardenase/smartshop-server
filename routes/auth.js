const express = require("express");
const {body} = require("express-validator");

const router = express.Router();

const registerValidator = [
    body("username", "username cannot be empty").not().isEmpty(),
    body("password", "password cannot be empty").not().isEmpty(),
];

router.post("/register", registerValidator, authController.register);

module.exports = router;
