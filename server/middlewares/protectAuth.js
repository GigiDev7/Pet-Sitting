const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

exports.protectAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!req.headers.authorization || !token) {
    throw new CustomError("Authorization Error", "Authorization failed");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedData) => {
    if (err) {
      throw new CustomError("Authorization Error", "Authorization failed");
    }
    req.user = await User.findById(decodedData.id);
    next();
  });
};
