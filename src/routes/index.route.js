const express = require('express');
const router = express.Router();
const hotelRoomRoute = require("./hotelRoom.route");
const hotelRoomTypeRoute = require("./hotelRoomType.route");

router.use("/room", hotelRoomRoute);
router.use("/room-type", hotelRoomTypeRoute);

module.exports = router;