const mongoose = require('mongoose');
const { Schema } = mongoose;

  const internSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    sub_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    leaves: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["admin", "intern"],
      default: "intern",
    },
  });

const Interns = mongoose.model("interns", internSchema);
module.exports = Interns;
