const { Schema, model } = require("mongoose");

const Price = new Schema({
  title: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
});

module.exports = model("Price", Price);
