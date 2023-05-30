const { Schema, model } = require("mongoose");

const Vaccine = new Schema({
  title: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
});

module.exports = model("Vaccine", Vaccine);
