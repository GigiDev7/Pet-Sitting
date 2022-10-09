const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    userId: mongoose.Types.ObjectId,
    sitterId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
