const { Schema, model } = require("mongoose");

const OldPatient = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  phone: { type: String, required: true },
  reason: { type: String, required: true },
  doctor: { type: String, required: true },
});

module.exports = model("OldPatient", OldPatient);