const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const isEmail = require("validator/lib/isEmail");
const { commentSchema } = require("./commentSchema");
const { ratingSchema } = require("./ratingSchema");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      requried: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      requried: [true, "Password is required"],
      minLength: 6,
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    memberType: {
      type: String,
      enum: {
        values: ["owner", "sitter"],
        message: "{VALUE} is not supported",
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    country: {
      type: String,
      required: [true, "Country is requred"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    profileImage: {
      type: String,
    },
    mobile: {
      type: String,
    },
    bio: {
      type: String,
    },
    comments: {
      type: [commentSchema],
    },
    ratings: {
      type: [ratingSchema],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
