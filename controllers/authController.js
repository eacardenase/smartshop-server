const {Op} = require("sequelize");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

const models = require("../models");

exports.register = async (req, res) => {
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

    try {
        const {username, password} = req.body;

        const existingUser = await models.User.findOne({
            where: {
                username: {[Op.iLike]: username},
            },
        });

        if (existingUser) {
            return res.json({
                success: false,
                message: "username already taken",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = models.User.create({
            username,
            password: hash,
        });

        res.status(201).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
