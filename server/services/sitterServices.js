const User = require("../models/userSchema");

const searchSitters = (country, pets) => {
  return User.aggregate([
    {
      $match: { country, memberType: "sitter", pets: { $all: pets } },
    },
    {
      $unset: ["password", "__v"],
    },
  ]);
};

const findSitter = (sitterId) => {
  return User.findById(sitterId, "-password -__v");
};

module.exports = {
  searchSitters,
  findSitter,
};
