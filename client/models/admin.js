import { Schema, model, models } from "mongoose";

// ========== Model admin to get in database ==========
const adminModels = new Schema({
    name: String,
});
// ====================================================

const Admin = models["admin"] || model("admin", adminModels); // models["admin"] mean collecttion admin

export default Admin;