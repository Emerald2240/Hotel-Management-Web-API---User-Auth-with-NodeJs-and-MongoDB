const express = require('express')
const hotelRoomRouter = express.Router()
const hotelController = require('../controllers/hotel.controller')
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")

hotelRoomRouter.get("/", authenticateToken, hotelController.fetchAllRooms);
hotelRoomRouter.get("/:id", authenticateToken, hotelController.fetchRoomBasic);
hotelRoomRouter.get("/search", authenticateToken, hotelController.fetchRoomAdvanced);

hotelRoomRouter.post("/", authenticateToken, adminAuthorization, hotelController.createRoom);

hotelRoomRouter.patch("/:roomId", authenticateToken, adminAuthorization, hotelController.editRoom);

hotelRoomRouter.delete("/:roomId", authenticateToken, adminAuthorization, hotelController.deleteRoom);

module.exports = hotelRoomRouter;