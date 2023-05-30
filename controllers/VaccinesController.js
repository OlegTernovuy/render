const Vaccine = require("../models/Vaccine");

const getVaccines = async (req, res) => {
  try {
    const data = await Vaccine.find();
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

const addVaccine = async (req, res) => {
  try {
    if (req.body.title && req.body.price) {
      const { title, price } = req.body;
      const newVaccine = new Vaccine({ title: title, price: price });

      const isSuccess = await newVaccine.save();
      if (isSuccess) {
        res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

const removeVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Vaccine.findByIdAndDelete(id);
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

const editVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price } = req.body;
    if (id) {
      const vaccine = await Vaccine.findById(id);
      vaccine.title = title;
      vaccine.price = price;
      const result = await vaccine.save();
      if (result) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err);
  }
};

module.exports = { getVaccines, addVaccine, removeVaccine, editVaccine };
