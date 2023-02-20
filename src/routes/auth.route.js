const express = require('express');
const authRouter = express.Router();
const constants = require("../constants");
const { MESSAGES } = constants;
const authController = require("../controllers/auth.controller");

authRouter.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});
authRouter.get("/token", authController.refreshAccessToken);

authRouter.post("/login", authController.login);

authRouter.delete("/logout", authController.logout);



module.exports = authRouter;