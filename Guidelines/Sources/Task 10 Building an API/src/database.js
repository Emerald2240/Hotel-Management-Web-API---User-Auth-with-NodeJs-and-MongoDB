const mongoose = require("mongoose");
const constants = require("./constants");

function database() {
    console.log("connecting to DB...")
    mongoose
    .set('strictQuery', true)
        .connect(constants.DATABASE_URI, {
            // useCreateIndex:true,
            // useNewUrlParser:true,
            // userUnifiedTopology:true,
        })
        .then(() => {
            console.log("Yay! Database Connected Successfully");
        })
        .catch((err) => {
            console.log("There was an error while connecting to the database.");
        });
}

module.exports = database;