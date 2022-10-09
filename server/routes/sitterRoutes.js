const express = require("express");
const { createComment } = require("../controllers/commentsControllers");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

router.route("/:sitterId/comment").post(protectAuth, createComment);

module.exports = router;
