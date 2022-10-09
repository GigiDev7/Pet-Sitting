const User = require("../models/userSchema");

const addComment = async (comment, userId, sitterId) => {
  const sitter = await User.findById(sitterId);
  sitter.comments.push({ comment, userId });
  await sitter.save();
  return sitter;
};

module.exports = {
  addComment,
};
