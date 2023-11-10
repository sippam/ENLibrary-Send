const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    date: String,
    year: String,
    month: String,
    day: String,
    // title: String,
    email: String,
    roomName: String,
    roomType: String,
    roomNumber: Number,
    timeFrom: Number,
    timeTo: Number,
    between2days: Boolean,
    inLibrary: Boolean,
})

const User = mongoose.model("Customer", userModel);

module.exports = User;