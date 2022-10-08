const mongoose = require("mongoose");

exports.ratingSchema = new mongoose.Schema(
  {
    rating: Number,
    userId: mongoose.Types.ObjectId,
  },
  {
    _id: false,
    timestamps: true,
  }
);
