const { searchSitters, findSitter } = require("../services/sitterServices");

const getFilteredSitters = async (req, res, next) => {
  try {
    const { country, pets } = req.query;
    const sitters = await searchSitters(country, pets.split(","));
    res.status(200).json(sitters);
  } catch (error) {
    next(error);
  }
};

const getSingleSitter = async (req, res, next) => {
  try {
    const { sitterId } = req.params;
    const totalComments = req.query.totalComments || 1;
    const sitter = await findSitter(sitterId, totalComments);
    res.status(200).json(sitter);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFilteredSitters,
  getSingleSitter,
};
