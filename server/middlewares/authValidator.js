const { checkSchema } = require("express-validator");

exports.loginValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
});

exports.registerValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  firstname: {
    in: ["body"],
    isString: {
      errorMessage: "Firstname must be a string",
    },
  },
  lastname: {
    in: ["body"],
    isString: {
      errorMessage: "Lastname must be a string",
    },
  },
  dateOfBirth: {
    in: ["body"],
    isDate: {
      errorMessage: "Date of birth must be a date type",
    },
  },
  country: {
    in: ["body"],
    errorMessage: "Country is required",
  },
  city: {
    in: ["body"],
    errorMessage: "City is required",
  },
  memberType: {
    in: ["body"],
    errorMessage: "Member type must be owner or sitter",
  },
});
