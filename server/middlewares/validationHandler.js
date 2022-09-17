const { validationResult } = require("express-validator");
const CustomError = require("../utils/customError");

exports.validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError("Validation Error", errors.array());
  }

  next();
};
