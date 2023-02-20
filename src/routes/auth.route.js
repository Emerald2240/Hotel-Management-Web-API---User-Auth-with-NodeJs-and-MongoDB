const express = require('express');
const authRouter = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const constants = require("../constants");
const { MESSAGES } = constants;

const jwt = require('jsonwebtoken');
let refreshTokenStore = '';

authRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

authRouter.get("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        return res.status(401).send({ message: "Missing refresh token body parameter" });
    } else {
        if (refreshTokenStore !== refreshToken) {
            return res.status(403).send({ message: "Invalid token" });
        } else {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).send(err);
                } else {
                    const accessToken = generateAccessToken({ name: user.name })
                    res.json({ accessToken: accessToken });
                }
            })
        }
    }

});

authRouter.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokenStore = refreshToken;
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
});

authRouter.delete("/logout", (req, res) => {
    if (refreshTokenStore != '') {
        refreshTokenStore = '';
        res.status(200).send({ message: MESSAGES.LOGOUT, success: true });
    } else {
        res.status(404).send({ message: MESSAGES.LOGIN_FIRST, success: true });
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}

module.exports = authRouter;