const User = require("../models/userSchema");
const { registerUser, loginUser } = require("../services/userServices");

const register = async (req, res, next) => {
  try {
    const newUser = await registerUser(req.body);
    const { password, __v, ...user } = newUser._doc;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { password, __v, ...user } = await loginUser(
      req.body.email,
      req.body.password
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
