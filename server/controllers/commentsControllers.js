const {
  addComment,
  updateComment,
  deleteComment,
  getCommentsBySitter,
} = require("../services/commentsServices");

const { findSitter } = require("../services/sitterServices");

const findComments = async (req, res, next) => {
  try {
    const { sitterId } = req.params;
    const comments = await getCommentsBySitter(sitterId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const { sitterId } = req.params;
    await addComment(comment, req.user._id, sitterId);
    const sitter = await findSitter(sitterId);
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

const removeComment = async (req, res, next) => {
  try {
    const { commentId, sitterId } = req.params;
    const sitter = await deleteComment(commentId, req.user._id, sitterId);
    res.status(201).json(sitter);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  patchComment,
  removeComment,
  findComments,
};
