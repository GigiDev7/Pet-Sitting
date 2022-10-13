const mongoose = require("mongoose");
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

const findSitter = async (sitterId) => {
  //return User.findById(sitterId, "-password -__v").populate("comments");
  const sitter = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(sitterId) } },
    {
      $unset: ["password", "__v"],
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "author",
              pipeline: [
                {
                  $unset: [
                    "password",
                    "__v",
                    "ratings",
                    "comments",
                    "country",
                    "city",
                    "bio",
                    "mobile",
                    "pets",
                    "dateOfBirth",
                    "lastname",
                    "memberType",
                    "avgRating",
                  ],
                },
              ],
            },
          },
          {
            $unwind: "$author",
          },
          {
            $unset: ["__v", "userId"],
          },
        ],
      },
    },
  ]);

  return sitter[0];
};

module.exports = {
  searchSitters,
  findSitter,
};
