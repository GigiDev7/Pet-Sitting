const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

exports.protectAuth = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    throw new CustomError("Authorization Error", "Authorization failed");
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedData) => {
    try {
      if (err) {
        throw new CustomError("Authorization Error", "Authorization failed");
      }
      req.user = await User.findById(decodedData.id);
      next();
    } catch (error) {
      next(error);
    }
  });
};
