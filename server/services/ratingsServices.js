const User = require("../models/userSchema");

const giveRating = async (rating, userId, sitterId) => {
  const sitter = await User.findById(sitterId);
  const newRating = {
    rating,
    userId,
  };

  const ratingsSum = sitter.avgRating * sitter.ratings.length + rating;

  sitter.ratings.push(newRating);
  const newAverage = ratingsSum / sitter.ratings.length;
  sitter.avgRating = newAverage;

  await sitter.save();

  return sitter;
};

module.exports = {
  giveRating,
};
