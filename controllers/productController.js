const models = require("../models");

exports.getAllProducts = async (req, res) => {
    const products = await models.Product.findAll({});

    res.json({
        success: true,
        products,
    });
};

exports.createProduct = async (req, res) => {
    res.json({
        success: true,
    });
};
