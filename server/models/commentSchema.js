const mongoose = require("mongoose");

exports.commentSchema = new mongoose.Schema(
  {
    comment: String,
    userId: mongoose.Types.ObjectId,
  },
  {
    _id: false,
    timestamps: true,
  }
);
