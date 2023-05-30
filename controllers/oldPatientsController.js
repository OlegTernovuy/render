const OldPatient = require("../models/OldPatient");

const getOldPatients = async (req, res) => {
  try {
    const data = await OldPatient.find();
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

const addOldPatient = async (req, res) => {
  try {
    const { name, date, time, phone, reason, doctor } = req.body;
    const newPatient = new OldPatient({
      name: name,
      date: date,
      time: time,
      phone: phone,
      reason: reason,
      doctor: doctor,
    });

    const isSuccess = await newPatient.save();
    if (isSuccess) {
      res
        .status(200)
        .json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

module.exports = { addOldPatient, getOldPatients };
