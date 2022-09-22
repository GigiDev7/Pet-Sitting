const express = require("express");
const {
  register,
  login,
  uploadProfileImage,
  refreshToken,
  logout,
  controlHelpMessages,
} = require("../controllers/userControllers");
const {
  loginValidation,
  registerValidation,
} = require("../middlewares/authValidator");
const { messageValidator } = require("../middlewares/helpMessageValidator");
const { validationHandler } = require("../middlewares/validationHandler");
const { protectAuth } = require("../middlewares/protectAuth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "UserImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
});

const router = express.Router();

router.route("/register").post(registerValidation, validationHandler, register);
router.route("/login").post(loginValidation, validationHandler, login);
router.route("/refreshToken").post(refreshToken);
router.route("/logout").post(protectAuth, logout);
router
  .route("/uploadImage")
  .patch(protectAuth, upload.single("profileImage"), uploadProfileImage);

router
  .route("/help-message")
  .post(messageValidator, validationHandler, controlHelpMessages);

module.exports = router;
