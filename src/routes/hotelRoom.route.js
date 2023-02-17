const express = require('express')
const hotelRoomRouter = express.Router()
const hotelController = require('../controllers/hotel.controller')
const authenticate = require('../middlewares/auth.middleware')

hotelRoomRouter.get("", hotelController.getStatus);
hotelRoomRouter.get("/", hotelController.fetchAllRooms);
hotelRoomRouter.get("/:id", hotelController.fetchRoomBasic);
hotelRoomRouter.get("/search", hotelController.fetchRoomAdvanced);

hotelRoomRouter.post("/", hotelController.createRoom);

hotelRoomRouter.patch("/:roomId", hotelController.editRoom);

hotelRoomRouter.delete("/:roomId", hotelController.deleteRoom);

module.exports = hotelRoomRouter;