const express = require('express')
const hotelRoomRouter = express.Router()
const hotelController = require('../controllers/hotel.controller')
const authenticateToken = require('../middlewares/auth.middleware')

hotelRoomRouter.get("/", authenticateToken, hotelController.fetchAllRooms);
hotelRoomRouter.get("/:id", authenticateToken, hotelController.fetchRoomBasic);
hotelRoomRouter.get("/search", authenticateToken, hotelController.fetchRoomAdvanced);

hotelRoomRouter.post("/", authenticateToken, hotelController.createRoom);

hotelRoomRouter.patch("/:roomId", authenticateToken, hotelController.editRoom);

hotelRoomRouter.delete("/:roomId", authenticateToken, hotelController.deleteRoom);

module.exports = hotelRoomRouter;