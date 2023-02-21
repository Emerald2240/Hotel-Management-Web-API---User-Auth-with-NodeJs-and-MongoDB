const express = require('express');
const authRouter = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const constants = require("../constants");
const { MESSAGES } = constants;
const authService = require("../services/auth.service");
const joi = require('joi');
const jwt = require('jsonwebtoken');

var user = [];
var refreshTokenStore = '';

class AuthController {

    async refreshAccessToken(req, res) {
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
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                        res.json({ accessToken: accessToken });
                    }
                })
            }
        }
    }

    async login(req, res) {

        const joiSchema = joi.object({

            email: joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),

            password: joi.string()
                .min(5)
                .max(200)
                .required(),
        });

        try {
            const value = await joiSchema.validateAsync({ email: req.body.email, password: req.body.password });

            user = await authService.login(req.body.email, req.body.password);
            console.log(user);
            if (user) {
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                refreshTokenStore = refreshToken;
                res.status(200)
                    .json({ message: MESSAGES.LOGGED_IN, accessToken: accessToken, refreshToken: refreshToken });
            } else {
                res.status(403)
                    .send({ message: MESSAGES.LOGIN_FAILURE });
            }

        } catch (err) {
            res.status(418).send({ message: "Invalid credentials" })
        }
    }

    async logout(req, res) {
        if (refreshTokenStore != '') {
            refreshTokenStore = '';
            res.status(200).send({ message: MESSAGES.LOGOUT, success: true });
        } else {
            res.status(404).send({ message: MESSAGES.LOGIN_FIRST, success: true });
        }
    }

}

module.exports = new AuthController();