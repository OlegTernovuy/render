const Patient = require("../models/Patient");

const getPatients = async (req, res) => {
  try {
    // const { reason } = req.params.body;
    // console.log(reason);
    const data = await Patient.find();
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

const addPatient = async (req, res) => {
  try {
    const { date, time } = req.body;
    const candidate = await Patient.findOne({ time });
    const candidate2 = await Patient.findOne({ date });
    console.log(candidate, candidate2);

    if ((candidate && candidate2) && (candidate.name == candidate2.name)) {
      return res
        .status(400)
        .json({ message: "Оберіть інший час! ", success: false });
    }
    const newPatient = new Patient({ ...req.body });

    const isSuccess = await newPatient.save();
    if (isSuccess) {
      res
        .status(200)
        .json({ message: "Ви успішно записалися на прийом! ", success: true });
    }
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

const removePatient = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Patient.findByIdAndDelete(id);
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

module.exports = { getPatients, addPatient, removePatient };
