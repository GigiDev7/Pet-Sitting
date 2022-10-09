const express = require("express");
const {
  createComment,
  patchComment,
  removeComment,
} = require("../controllers/commentsControllers");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

router.use(protectAuth);

router.route("/:sitterId/comment").post(createComment);
router.route("/:commentId").patch(patchComment);
router.route("/:commentId/:sitterId").delete(removeComment);

module.exports = router;
