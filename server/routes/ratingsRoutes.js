const express = require("express");
const { addRating, updateRating } = require("../controllers/ratingsController");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

router.use(protectAuth);

router.route("/:sitterId").post(addRating).patch(updateRating);

module.exports = router;
