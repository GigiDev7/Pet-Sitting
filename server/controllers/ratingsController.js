const { giveRating, editRating } = require("../services/ratingsServices");
const { findSitter } = require("../services/sitterServices");

const addRating = async (req, res, next) => {
  try {
    const { sitterId } = req.params;
    const { rating } = req.body;
    await giveRating(rating, req.user._id, sitterId);
    const sitter = await findSitter(sitterId);
    res.status(200).json(sitter);
  } catch (error) {
    next(error);
  }
};

const updateRating = async (req, res, next) => {
  try {
    const { sitterId } = req.params;
    const { rating } = req.body;
    await editRating(rating, req.user._id, sitterId);
    const sitter = await findSitter(sitterId);
    res.status(201).json(sitter);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRating,
  updateRating,
};
