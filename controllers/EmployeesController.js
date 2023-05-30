const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const data = await Employee.find();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err);
  }
};

module.exports = { getEmployees };
