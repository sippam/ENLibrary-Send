import { Schema, model, models } from "mongoose";

// ========== Model customer to get in database ==========
const customerModels = new Schema({
  date: String,
  year: String,
  month: String,
  day: String,
  // fullname: String,
  title: String,
  firstname: String,
  surname: String,
  email: String,
  cn: String,
  roomName: String,
  roomType: String,
  roomNumber: Number,
  timeFrom: Number,
  timeTo: Number,
  between2days: Boolean,
  inLibrary: Boolean,
});
// ====================================================

const Customer = models["Customer"] || model("Customer", customerModels); // models["Customer"] mean collecttion customer

export default Customer;