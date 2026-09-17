const {validationResult} = require("express-validator");

const models = require("../models");

exports.getAll = async (req, res) => {
    const products = await models.Product.findAll({});

    res.json(products);
};

exports.create = async (req, res) => {
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

    const {name, description, price, photo_url, user_id} = req.body;

    try {
        const newProduct = await models.Product.create({
            name: name,
            description: description,
            price: price,
            photo_url: photo_url,
            user_id: user_id,
        });

        res.status(201).json({
            success: true,
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
