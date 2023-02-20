const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth.middleware');

//CREATE
userRouter.post("/", userController.signUp);

//READ
userRouter.get("/", userController.fetchAllUsers);
userRouter.get("/:email", userController.fetchUser);

//UPDATE
userRouter.patch("/:email", userController.updateUserProfile);

//DELETE
userRouter.delete("/:email", userController.deleteUserAccount);


module.exports = userRouter;