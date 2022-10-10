const express = require("express");
const { getFilteredSitters } = require("../controllers/sitterControllers");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

//router.use(protectAuth)

router.route("/").get(getFilteredSitters);

module.exports = router;
