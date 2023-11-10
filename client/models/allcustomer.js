import { Schema, model, models } from "mongoose";

// ========== Model all customer to get in database ==========
const allcustomerModels = new Schema({
  date: String,
  // fullname: String,
  title: String,
  firstname: String,
  surname: String,
  email: String,
  cn: String,
  roomType: String,
  roomNumber: Number,
  timeFrom: Number,
  timeTo: Number,
});
// ====================================================

const AllCustomer =
  models["allcustomer"] || model("allcustomer", allcustomerModels); // models["AllCustomer"] mean collecttion allCustomer

export default AllCustomer;
