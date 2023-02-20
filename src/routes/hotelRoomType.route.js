const express = require('express');
const hotelRoomTypeRouter = express.Router()
const hotelController = require('../controllers/hotel.controller')
const authenticateToken = require('../middlewares/auth.middleware')

hotelRoomTypeRouter.get("/", authenticateToken, hotelController.fetchRoomTypes);
hotelRoomTypeRouter.get("/:id", authenticateToken, hotelController.fetchRoomType);

hotelRoomTypeRouter.post("/", authenticateToken, hotelController.createRoomType);

hotelRoomTypeRouter.patch("/:roomTypeId", authenticateToken, hotelController.editRoomType);

hotelRoomTypeRouter.delete("/:roomTypeId", authenticateToken, hotelController.deleteRoomType);


module.exports = hotelRoomTypeRouter;