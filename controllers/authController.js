const {Op} = require("sequelize");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

exports.login = async (req, res) => {
    try {
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

        const existingUser = await models.User.findOne({
            where: {
                username: {[Op.iLike]: username},
            },
        });

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Username or password is incorrect",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password,
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Username or password is incorrect",
            });
        }

        const token = jwt.sign({userId: existingUser.id}, "SECRET_KEY", {
            expiresIn: "1h",
        });

        res.status(200).json({
            userId: existingUser.id,
            username,
            token,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
