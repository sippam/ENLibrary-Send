const mongoose = require("mongoose");


// ========== Model all customer to get in database ==========
const allcustomerModels = new mongoose.Schema({
  date: String,
  // month: String,
  // day: String,
  // name: String,
  email: String,
  // roomName: String,
  roomType: String,
  roomNumber: Number,
  timeFrom: Number,
  timeTo: Number,
});
// ====================================================

const AllCustomer = mongoose.model("allcustomer", allcustomerModels); // models["AllCustomer"] mean collecttion allCustomer

module.exports = AllCustomer;
