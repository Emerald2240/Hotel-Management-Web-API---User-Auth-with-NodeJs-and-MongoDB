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

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken })
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) { 
        return res.sendStatus(401) 
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        })
    }
}

module.exports = authRouter;