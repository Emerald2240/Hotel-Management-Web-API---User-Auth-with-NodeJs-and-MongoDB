const express = require('express');
const authRouter = express.Router();
const dotenv = require("dotenv");
dotenv.config();
userController = require("../controllers/user.controller")
const constants = require("../constants");
const { MESSAGES } = constants;
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

class AuthService {

    //Compare user email and encrypted password
    async login(email, password) {
        let emailRegexed = new RegExp(email, 'i');

        const user = await User.findOne({ email: emailRegexed });

        if (!user) {
            return null;
        } else {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return {first_name: user.first_name, last_name: user.last_name, email: user.email, user_type: user.user_type};
                }
            } catch {
                return null;
            }
        }

    }

}

module.exports = new AuthService();