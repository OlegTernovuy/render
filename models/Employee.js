const { Int32 } = require("mongodb");
const { Schema, model } = require("mongoose");

const Employee = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  access: { type: String, required: true },
});

module.exports = model("Employee", Employee);
