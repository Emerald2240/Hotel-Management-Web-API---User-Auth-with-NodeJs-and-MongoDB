const express = require('express')
const hotelRoomRouter = express.Router()
const hotelController = require('../controllers/hotel.controller')
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth.middleware')

hotelRoomRouter.get("/", authenticateToken, hotelController.fetchAllRooms);
hotelRoomRouter.get("/:id", hotelController.fetchRoomBasic);
hotelRoomRouter.get("/search", hotelController.fetchRoomAdvanced);

hotelRoomRouter.post("/", hotelController.createRoom);

hotelRoomRouter.patch("/:roomId", hotelController.editRoom);

hotelRoomRouter.delete("/:roomId", hotelController.deleteRoom);

module.exports = hotelRoomRouter;