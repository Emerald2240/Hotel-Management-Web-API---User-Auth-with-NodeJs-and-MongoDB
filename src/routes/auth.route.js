const express = require('express');
const authRouter = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const constants = require("../constants");
const { MESSAGES } = constants;

const jwt = require('jsonwebtoken');


authRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

authRouter.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

module.exports = authRouter;