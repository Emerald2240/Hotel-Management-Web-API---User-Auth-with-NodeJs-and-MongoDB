const express = require('express');
const router = express.Router();
const authRoute = require("./auth.route");
const hotelRoomRoute = require("./hotelRoom.route");
const hotelRoomTypeRoute = require("./hotelRoomType.route");
const userRoute = require("./user.route");
const constants = require("../constants");
const { MESSAGES } = constants;


router.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});
router.use("/auth", authRoute);
router.use("/room", hotelRoomRoute);
router.use("/room-type", hotelRoomTypeRoute);
router.use("/user", userRoute);

module.exports = router;