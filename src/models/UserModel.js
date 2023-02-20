const { model, Schema } = require("mongoose");
const constants = require("../constants");
const { USER_TYPES, DATABASES } = constants;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
        enum: [USER_TYPES.USER, USER_TYPES.ADMIN],
    },
},
    {
        timestamps: true,
    }
);

const User = model(DATABASES.USER, UserSchema);
module.exports = User;