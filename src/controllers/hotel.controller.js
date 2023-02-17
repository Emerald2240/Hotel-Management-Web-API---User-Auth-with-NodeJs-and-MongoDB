const hotelService = require('../services/hotel.service')
const constants = require("../constants");
const { MESSAGES } = constants;
//#endregion


class HotelhotelService {

    //#region GET  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //base api
    async getStatus(req, res) {
        res.status(200).send({ message: MESSAGES.FETCHED, success: true });
    };

    //fetch all rooms
    async fetchAllRooms(req, res) {
        try {
            const rooms = await hotelService.getAllRooms();
            res
                .status(200)
                .send({ message: MESSAGES.FETCHED, success: true, data: rooms });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //fetch particular room with its id
    async fetchRoomBasic(req, res) {
        try {
            const users = await hotelService.getRoomById(req.params.id);
            res
                .status(200)
                .send({ message: MESSAGES.FETCHED, success: true, data: users });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //fetch particular room with its roomname or roomtypeid or minimum price or maximum price
    async fetchRoomAdvanced(req, res) {

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
            const users = await hotelService.findRoom(roomName, roomTypeId, minPrice, maxPrice);
            res
                .status(200)
                .send({ message: MESSAGES.FETCHED, success: true, data: users });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };


    //Room Type Section/////////////////////////////////////////////////////////////////


    //fetch all room types
    async fetchRoomTypes(req, res) {
        try {
            const roomTypes = await hotelService.getAllRoomTypes();
            res
                .status(200)
                .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //fetch particular room type with its id
    async fetchRoomType(req, res) {
        try {
            const roomType = await hotelService.getRoomTypeById(req.params.id);
            res
                .status(200)
                .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //#endregion


    //#region POST  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //create a room type
    async createRoomType(req, res) {
        try {
            const data = await hotelService.addRoomType(req.body);
            res
                .status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //create a room
    async createRoom(req, res) {
        try {
            const data = await hotelService.addRoom(req.body);
            res
                .status(201)
                .send({ message: MESSAGES.CREATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //#endregion


    //#region PATCH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //edit a particular room
    async editRoom(req, res) {
        try {
            const data = await hotelService.editRoomById(req.params.roomId, req.body);
            res
                .status(201)
                .send({ message: MESSAGES.UPDATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //edit a particular room type
    async editRoomType(req, res) {
        try {
            const data = await hotelService.editRoomTypeById(req.params.roomTypeId, req.body);
            res
                .status(201)
                .send({ message: MESSAGES.UPDATED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //#endregion


    //#region DELETE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //find room and delete it
    async deleteRoom(req, res) {
        try {
            const data = await hotelService.deleteRoomById(req.params.roomId);
            res
                .status(200)
                .send({ message: MESSAGES.DELETED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //find room type and delete
    async deleteRoomType(req, res) {
        try {
            const data = await hotelService.deleteRoomTypeById(req.params.roomTypeId);
            res
                .status(201)
                .send({ message: MESSAGES.DELETED, success: true, data });
        } catch (err) {
            res
                .status(500)
                .send({ message: err.message || MESSAGES.ERROR, success: false });
        }
    };

    //#endregion

}

module.exports = new HotelhotelService();