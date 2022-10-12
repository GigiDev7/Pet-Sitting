const express = require("express");
const {
  getFilteredSitters,
  getSingleSitter,
} = require("../controllers/sitterControllers");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

//router.use(protectAuth);

router.route("/").get(getFilteredSitters);
router.route("/:sitterId").get(getSingleSitter);

module.exports = router;
