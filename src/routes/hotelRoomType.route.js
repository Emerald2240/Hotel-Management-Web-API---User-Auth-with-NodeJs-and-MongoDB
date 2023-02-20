const express = require('express');
const hotelRoomTypeRouter = express.Router()
const hotelController = require('../controllers/hotel.controller');
const adminAuthorization = require('../middlewares/adminPriviledges.middleware');
const authenticateToken = require('../middlewares/auth.middleware')

hotelRoomTypeRouter.get("/", authenticateToken, hotelController.fetchRoomTypes);
hotelRoomTypeRouter.get("/:id", authenticateToken, hotelController.fetchRoomType);

hotelRoomTypeRouter.post("/", authenticateToken, adminAuthorization, hotelController.createRoomType);

hotelRoomTypeRouter.patch("/:roomTypeId", authenticateToken, adminAuthorization, hotelController.editRoomType);

hotelRoomTypeRouter.delete("/:roomTypeId", authenticateToken, adminAuthorization, hotelController.deleteRoomType);


module.exports = hotelRoomTypeRouter;