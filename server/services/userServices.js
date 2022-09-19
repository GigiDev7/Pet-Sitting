const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/customError");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const comparePassowrds = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const registerUser = (userData) => {
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
  user._doc.token = createToken(user?._id);

  return user._doc;
};

const uploadImage = async (userId, file) => {
  return User.findByIdAndUpdate(
    userId,
    { profileImage: file.path },
    { new: true }
  );
};

module.exports = { registerUser, loginUser, uploadImage };
