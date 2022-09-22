const { checkSchema } = require("express-validator");

exports.messageValidator = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  subject: {
    in: ["body"],
    isString: true,
    errorMessage: "Subject required",
  },
  description: {
    in: ["body"],
    isString: true,
    errorMessage: "Description required",
  },
  questionAbout: {
    in: ["body"],
    isString: true,
  },
});
