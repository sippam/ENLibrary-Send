import { Schema, model, models } from "mongoose";

// ========== Model exam period to get in database ==========
const examModels = new Schema({
    examStart: String,
    examEnd: String,
    isEnable: Boolean,
});
// ==========================================================

const Exam = models["examperiods"] || model("examperiods", examModels); // models["examperiods"] mean collecttion examperiods

export default Exam;