const userService = require('../services/user.service');
const constants = require("../constants");
const { MESSAGES } = constants;

class UserController {

    async getStatus(req, res) {
        res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
    };

    async signUp(req, res) {
        try {
            const data = await userService.createUser(req.body);
            res
                .status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async fetchUser(req, res) {
        try {
            const data = await userService.getUser(req.params.email);

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async fetchAllUsers(req, res) {
        try {
            const data = await userService.getAllUsers();

            if (data) {
                res
                    .status(200)
                    .send({ message: MESSAGES.FETCHED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async updateUserProfile(req, res) {
        try {
            const data = await userService.updateUserByEmail(req.params.email, req.body);
            if (data) {
                res
                    .status(201)
                    .send({ message: MESSAGES.UPDATED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

    async deleteUserAccount(req, res) {
        try {
            const data = await userService.deleteUser(req.params.email);
            if (data) {
                res
                    .status(201)
                    .send({ message: MESSAGES.DELETED, success: true, data });
            } else {
                res
                    .status(404)
                    .send({ message: MESSAGES.NOT_FOUND, success: false, data });
            }

        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    }

}

module.exports = new UserController();