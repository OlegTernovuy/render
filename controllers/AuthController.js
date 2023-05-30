const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const generateAccessToken = require("../utils/generateAccessToken");
const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        message: "Логін та пароль повинен бути не менше 4 символів",
        errors,
      });
    }

    if (req.body.username && req.body.password) {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(200).json({
          message: "Користувач с таким ім'ям вже існує",
          success: false,
        });
      }
      const salt = 10;
      const hashPass = bcrypt.hashSync(password, salt);
      const user = new User({
        username: username,
        password: hashPass,
        role: "user",
      });
      console.log(user);
      await user.save();
      return res.status(200).json({
        status: true,
        message: "Користувач успішно створений",
        user: { username: user.username, id: user._id },
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Помилка при реєстрації" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "Неправильний логін" });
    }
    const isValidPasword = bcrypt.compareSync(password, user.password);
    if (!isValidPasword) {
      return res
        .status(200)
        .json({ success: false, message: "Неправильний пароль" });
    }

    // const token = generateAccessToken(user._id, user.role);
    const token = jwt.sign({ id: user._id }, 'ejkrgjebrgjherbjgfhbejrjhberjhgbrhjgbhjbgr', {
      expiresIn: "30d",
    });
    return res.status(200).json({
      success: true,
      message: "Ви успішно увійшли в систему",
      token,
      user: { username: user.username, id: user._id, role: user.role },
      role: user.role,
    });
  } catch (err) {
    res.json({ success: false, message: "Some error" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userID);

    if (!user) {
      return res.json({
        message: "Такий користувач не існує",
      });
    }
    const token = jwt.sign({ id: user._id }, 'ejkrgjebrgjherbjgfhbejrjhberjhgbrhjgbhjbgr', {
      expiresIn: "30d",
    });
    return res.json({
      success: true,
      user: { username: user.username, id: user._id, role: user.role },
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

module.exports = { login, registration, getMe };
