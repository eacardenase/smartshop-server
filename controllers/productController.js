const models = require("../models");

exports.getAllProducts = async (req, res) => {
    res.json([]);
};

exports.createProduct = async (req, res) => {
    res.json({
        success: true,
    });
};
