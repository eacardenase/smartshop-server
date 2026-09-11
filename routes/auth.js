const express = require("express");
const {body} = require("express-validator");

const authController = require("../controllers/authController");

const router = express.Router();

const registerValidator = [
    body("username", "username cannot be empty").not().isEmpty(),
    body("password", "password cannot be empty").not().isEmpty(),
];

router.post("/register", registerValidator, authController.register);
router.post("/login", registerValidator, authController.login);

module.exports = router;
