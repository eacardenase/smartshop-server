const express = require("express");

const productController = require("../controllers/productController");
const {body} = require("express-validator");

const router = express.Router();

const productValidator = [
    body("name", "name cannot be empty").notEmpty(),
    body("description", "description cannot be empty").notEmpty(),
    body("price", "price cannot be empty")
        .notEmpty()
        .isFloat({min: 0.01})
        .withMessage("price must be a positive decimal number"),
    body("photo_url").notEmpty().withMessage("photo_url cannot be empty"),
    body("user_id").notEmpty().isInt().withMessage("user_id cannot be empty"),
];

router.get("/", productController.getAll);
router.post("/", productValidator, productController.create);

module.exports = router;
