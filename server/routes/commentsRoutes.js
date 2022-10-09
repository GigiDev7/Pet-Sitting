const express = require("express");
const {
  createComment,
  patchComment,
  removeComment,
  findComments,
} = require("../controllers/commentsControllers");
const { protectAuth } = require("../middlewares/protectAuth");

const router = express.Router();

router.use(protectAuth);

router.route("/:sitterId").get(findComments);
router.route("/:sitterId").post(createComment);
router.route("/:commentId").patch(patchComment);
router.route("/:commentId/:sitterId").delete(removeComment);

module.exports = router;
