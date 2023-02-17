//#region Setup and Initialisation ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//All modules/files/classes are imported and initialized
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const constants = require("./src/constants");
const database = require("./src/database");
const Controller = require("./src/controller");
const app = express();
const { MESSAGES } = constants;

//CORS ensures our app can be accessed by anyone. This is ofcourse not advisable for a live project
app.use(cors({origin: "*"}));
app.use(express.json());

//Set our default port to 5000
const PORT = process.env.PORT || 5000;

//#endregion


//#region GET  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//base api
app.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});

//fetch all rooms
app.get("/api/v1/rooms", async (req, res) => {
    try {
        const rooms = await Controller.getAllRooms();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: rooms });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//fetch particular room with its id
app.get("/api/v1/room/:id", async (req, res) => {
    try {
        const users = await Controller.getRoomById(req.params.id);
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: users });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//fetch particular room with its roomname or roomtypeid or minimum price or maximum price
app.get("/api/v1/room-search", async (req, res) => {

    let roomName = req.query.roomName;
    let roomTypeId = req.query.roomType;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;

    //Set the defaults incase they are not entered by the user
    if (roomName === undefined) {
        //Impossible to match value
        roomName = "######################";
    }

    if (roomTypeId === undefined) {
        //invalid and null roomType id
        roomTypeId = "63e77e9aadc3942c919e9160";
    }

    if (minPrice === undefined) {
        minPrice = 0;
    }

    if (maxPrice === undefined) {
        //Impossible to reach max value
        maxPrice = 999999999999999999999999999999999999999;
    }

    try {
        const users = await Controller.findRoom(roomName, roomTypeId, minPrice, maxPrice);
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: users });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});


//Room Type Section/////////////////////////////////////////////////////////////////


//fetch all room types
app.get("/api/v1/room-types", async (req, res) => {
    try {
        const roomTypes = await Controller.getAllRoomTypes();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//fetch particular room type with its id
app.get("/api/v1/room-type/:id", async (req, res) => {
    try {
        const roomType = await Controller.getRoomTypeById(req.params.id);
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//#endregion


//#region POST  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//create a room type
app.post("/api/v1/room-type", async (req, res) => {
    try {
        const data = await Controller.addRoomType(req.body);
        res
            .status(201)
            .send({ message: MESSAGES.CREATED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//create a room
app.post("/api/v1/room", async (req, res) => {
    try {
        const data = await Controller.addRoom(req.body);
        res
            .status(201)
            .send({ message: MESSAGES.CREATED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//#endregion


//#region PATCH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//edit a particular room
app.patch("/api/v1/room/:roomId", async (req, res) => {
    try {
        const data = await Controller.editRoomById(req.params.roomId, req.body);
        res
            .status(201)
            .send({ message: MESSAGES.UPDATED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//edit a particular room type
app.patch("/api/v1/room-type/:roomTypeId", async (req, res) => {
    try {
        const data = await Controller.editRoomTypeById(req.params.roomTypeId, req.body);
        res
            .status(201)
            .send({ message: MESSAGES.UPDATED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//#endregion


//#region DELETE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//find room and delete it
app.delete("/api/v1/room/:roomId", async (req, res) => {
    try {
        const data = await Controller.deleteRoomById(req.params.roomId);
        res
            .status(200)
            .send({ message: MESSAGES.DELETED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//find room type and delete
app.delete("/api/v1/room-type/:roomTypeId", async (req, res) => {
    try {
        const data = await Controller.deleteRoomTypeById(req.params.roomTypeId);
        res
            .status(201)
            .send({ message: MESSAGES.DELETED, success: true, data });
    } catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

//#endregion


// App/Server Start Section
app.listen(PORT, () => {
    database();
    console.log(`Server started on port: ${PORT}`);
});