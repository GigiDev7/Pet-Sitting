const express = require("express");
const { addRating } = require("../controllers/ratingsController");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

router.use(protectAuth);

router.route("/:sitterId").post(addRating);

module.exports = router;
