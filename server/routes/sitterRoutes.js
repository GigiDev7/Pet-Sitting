const express = require("express");
const {
  createComment,
  patchComment,
} = require("../controllers/commentsControllers");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

router.use(protectAuth);

router.route("/:sitterId/comment").post(createComment);
router.route("/:commentId").patch(patchComment);

module.exports = router;
