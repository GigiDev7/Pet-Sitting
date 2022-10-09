const { addComment, updateComment } = require("../services/commentsServices");

const createComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const { sitterId } = req.params;
    const sitter = await addComment(comment, req.user._id, sitterId);
    res.status(201).json(sitter);
  } catch (error) {
    next(error);
  }
};

const patchComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const newComment = await updateComment(comment, req.user._id, commentId);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  patchComment,
};
