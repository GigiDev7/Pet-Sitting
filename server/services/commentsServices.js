const User = require("../models/userSchema");
const Comment = require("../models/commentSchema");
const CustomError = require("../utils/customError");

const addComment = async (comment, userId, sitterId) => {
  const newComment = await Comment.create({ comment, userId, sitterId });
  const sitter = await User.findById(sitterId);
  sitter.comments.push(newComment._id);
  await sitter.save();
  return sitter;
};

const updateComment = async (newComment, userId, commentId) => {
  const oldComment = await Comment.findById(commentId);

  if (!oldComment.userId.equals(userId)) {
    throw new CustomError("Authentication Error", "Access denied");
  }

  oldComment.comment = newComment;
  await oldComment.save();
  return oldComment;
};

module.exports = {
  addComment,
  updateComment,
};
