const express = require('express')
const hotelRoomRouter = express.Router()
const hotelController = require('../controllers/hotel.controller')
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/auth.middleware')

hotelRoomRouter.get("/", authenticateToken, hotelController.fetchAllRooms);
hotelRoomRouter.get("/:id", hotelController.fetchRoomBasic);
hotelRoomRouter.get("/search", hotelController.fetchRoomAdvanced);

hotelRoomRouter.post("/", hotelController.createRoom);

hotelRoomRouter.patch("/:roomId", hotelController.editRoom);

hotelRoomRouter.delete("/:roomId", hotelController.deleteRoom);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({message: err});
        req.user = user;
        next();
    })
}

module.exports = hotelRoomRouter;