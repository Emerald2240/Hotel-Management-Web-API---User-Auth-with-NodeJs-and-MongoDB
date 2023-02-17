const Room = require("./RoomModel");
const RoomType = require("./RoomTypeModel");

class Controller {
    async getAllRooms() {
        return await Room.find().populate('room_type');
    }

    async addRoom(room) {
        return await Room.create(room);
    }

    async getRoomById(id) {
        return await Room.findOne({ _id: id }).populate('room_type');
    }

    async findRoom(roomName, roomTypeId, minPrice, maxPrice) {
        let roomNameRegex = new RegExp(roomName, 'i');


        return await Room.find().
            and([
                {
                    $or: [
                        { name: roomNameRegex },
                        { room_type: roomTypeId },
                    ]
                },
                { 'price': { $gt: minPrice, $lt: maxPrice } }
            ]).
            limit(10).
            populate('room_type');
    }

    async editRoomById(id, data) {
        return await Room.findByIdAndUpdate({ _id: id }, data, { new: true }).populate('room_type');
    }

    async deleteRoomById(id) {
        return await Room.findByIdAndDelete({ _id: id }).populate('room_type');
    }

    async deleteRoomTypeById(id) {
        return await Room.findByIdAndDelete({ _id: id }).populate('room_type');
    }


    //Room Type Section
    async getAllRoomTypes() {
        // return await RoomType.find()
        //     .select('name description');

        return await RoomType.find();
    }

    async addRoomType(roomType) {
        return await RoomType.create(roomType);
    }

    async getRoomTypeById(id) {
        return await RoomType.findOne({ _id: id });
    }

    async editRoomTypeById(id, data) {
        return await RoomType.findByIdAndUpdate({ _id: id }, data, { new: true });
    }

    async deleteRoomTypeById(id) {
        return await RoomType.findOneAndDelete({ _id: id });
    }
}

module.exports = new Controller();