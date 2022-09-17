const express = require("express");
const { register, login } = require("../controllers/userControllers");
const {
  loginValidation,
  registerValidation,
} = require("../middlewares/authValidator");
const { validationHandler } = require("../middlewares/validationHandler");

const router = express.Router();

router.route("/register").post(registerValidation, validationHandler, register);
router.route("/login").post(loginValidation, validationHandler, login);

module.exports = router;
