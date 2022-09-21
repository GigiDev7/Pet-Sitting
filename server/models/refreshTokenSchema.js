const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
  },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
