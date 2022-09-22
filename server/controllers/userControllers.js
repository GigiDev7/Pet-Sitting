const User = require("../models/userSchema");
const {
  registerUser,
  loginUser,
  uploadImage,
  refresh,
  logoutUser,
  sendMessage,
} = require("../services/userServices");

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

const refreshToken = async (req, res, next) => {
  try {
    const { newAccessToken, newRefreshToken } = await refresh(
      req.body.refreshToken
    );
    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await logoutUser(req.body.refreshToken);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const uploadProfileImage = async (req, res, next) => {
  try {
    const editedUser = await uploadImage(req.user._id, req.file);
    const { __v, password, ...user } = editedUser._doc;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const controlHelpMessages = async (req, res, next) => {
  try {
    const newMessage = await sendMessage(req.user._id, req.body);
    res.status(200).json(newMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  uploadProfileImage,
  logout,
  controlHelpMessages,
};
