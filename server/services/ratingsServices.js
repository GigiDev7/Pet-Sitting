const User = require("../models/userSchema");

const giveRating = async (rating, userId, sitterId) => {
  const sitter = await User.findById(sitterId);

  const oldRating = sitter.ratings.find((rating) =>
    rating.userId.equals(userId)
  );

  if (oldRating) {
    const newAvg =
      (sitter.avgRating * sitter.ratings.length - oldRating.rating + rating) /
      sitter.ratings.length;

    oldRating.rating = rating;
    sitter.avgRating = newAvg;

    await sitter.save();
    return sitter;
  }

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

const editRating = async (newRating, userId, sitterId) => {
  const sitter = await User.findById(sitterId);
  const oldRating = sitter.ratings.find((rating) =>
    rating.userId.equals(userId)
  );

  const newAvg =
    (sitter.avgRating * sitter.ratings.length - oldRating.rating + newRating) /
    sitter.ratings.length;

  oldRating.rating = newRating;
  sitter.avgRating = newAvg;

  await sitter.save();
  return sitter;
};

module.exports = {
  giveRating,
  editRating,
};
