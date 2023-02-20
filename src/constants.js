const constants = {
    DATABASE_URI: process.env.DATABASE_URI,

    DATABASES: {
        ROOM: "room",
        ROOM_TYPE: "room_type"
    },

    MESSAGES: {
        FETCHED: "Resource fetched successfully",
        UPDATED: "Resource updated successfully",
        ERROR: "Resource error",
        CREATED: "Resource created successfully",
        DELETED: "Resource deleted successfully",
        DEFAULT: "Hotel Management API is Online. Use either of the following routes: (room, roomtype, auth)",
        HOTEL_ROOM_DEFAULT: "Choose from one of the following routes: \nGET(/ - fetch all rooms, \n/:id - fetch particular room \n/search - Fetch particular room with id, min/max price and room type \n)",
        HOTEL_ROOM_TYPE_DEFAULT: "",
        AUTH_DEFAULT: "",
        LOGOUT: "Successfully logged out! Have a nice day.",
        LOGIN_FIRST: "Error! Login first"
    }
};

module.exports = constants;