const User = require("../models/userSchema");
const RefreshToken = require("../models/refreshTokenSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/customError");
const HelpMessage = require("../models/helpMessageSchema");

const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_REFRESH);
};

const comparePassowrds = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const registerUser = async (userData) => {
  const salt = await bcrypt.genSalt(12);
  userData.password = await bcrypt.hash(userData.password, salt);

  return User.create(userData);
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Authentication Error", "User does not exist");
  }
  const isPasswordCorrect = await comparePassowrds(password, user?.password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      "Authentication Error",
      "Incorrect email or password"
    );
  }
  user._doc.accessToken = createAccessToken(user?._id);
  user._doc.refreshToken = createRefreshToken(user?._id);
  await RefreshToken.create({ refreshToken: user._doc.refreshToken });

  return user._doc;
};

const logoutUser = (refreshToken) => {
  return RefreshToken.deleteOne({ refreshToken });
};

const refresh = async (refreshToken) => {
  let newAccessToken;
  let newRefreshToken;

  if (!refreshToken) {
    throw new CustomError("Authentication Error", "Authentication Failed!");
  }

  const existingRefreshToken = await RefreshToken.findOne({ refreshToken });
  if (!existingRefreshToken) {
    throw new CustomError("Authentication Error", "Authentication Failed!");
  }

  await jwt.verify(
    refreshToken,
    process.env.JWT_SECRET_REFRESH,
    async (err, decodedData) => {
      if (err) {
        throw new CustomError("Authentication Error", "Authentication Failed!");
      }

      await RefreshToken.findByIdAndDelete(existingRefreshToken._id);
      newAccessToken = createAccessToken(decodedData.id);
      newRefreshToken = createRefreshToken(decodedData.id);
      await RefreshToken.create({ refreshToken: newRefreshToken });
    }
  );
  return { newAccessToken, newRefreshToken };
};

const uploadImage = async (userId, file) => {
  return User.findByIdAndUpdate(
    userId,
    { profileImage: file.path },
    { new: true }
  );
};

const sendMessage = async (messageData) => {
  const { email, questionAbout, subject, description } = messageData;

  return HelpMessage.create({
    email,
    questionAbout,
    subject,
    description,
  });
};

const editUser = async (userData, userId) => {
  if (userData.password) {
    const salt = await bcrypt.genSalt(12);
    userData.password = await bcrypt.hash(userData.password, salt);
  }
  return User.findByIdAndUpdate(userId, userData, { new: true });
};

module.exports = {
  registerUser,
  loginUser,
  uploadImage,
  refresh,
  logoutUser,
  sendMessage,
  editUser,
};
