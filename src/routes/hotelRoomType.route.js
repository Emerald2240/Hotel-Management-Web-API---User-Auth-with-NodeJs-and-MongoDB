const express = require('express');
const hotelRoomTypeRouter = express.Router()
const hotelController = require('../controllers/hotel.controller')
const authenticate = require('../middlewares/auth.middleware')

hotelRoomTypeRouter.get("", hotelController.getStatus);
hotelRoomTypeRouter.get("/", hotelController.fetchRoomTypes);
hotelRoomTypeRouter.get("/:id", hotelController.fetchRoomType);

hotelRoomTypeRouter.post("/", hotelController.createRoomType);

hotelRoomTypeRouter.patch("/:roomTypeId", hotelController.editRoomType);

hotelRoomTypeRouter.delete("/:roomTypeId", hotelController.deleteRoomType);


module.exports = hotelRoomTypeRouter;