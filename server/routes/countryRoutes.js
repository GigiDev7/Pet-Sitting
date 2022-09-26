const express = require("express");
const getCountries = require("../controllers/countryControllers");

const router = express.Router();

router.route("/").get(getCountries);

module.exports = router;
