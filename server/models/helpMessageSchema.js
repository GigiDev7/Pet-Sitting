const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  questionAbout: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

const HelpMessage = mongoose.model("HelpMessage", messageSchema);

module.exports = HelpMessage;
