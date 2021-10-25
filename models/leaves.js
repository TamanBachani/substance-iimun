const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaveSchema = new Schema({
  intern: {
    type: Schema.Types.ObjectId,
    ref: 'interns'
  },
  subject: String,
  message: String,
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
});

const Leaves = mongoose.model("leaves", leaveSchema);
module.exports = Leaves;
