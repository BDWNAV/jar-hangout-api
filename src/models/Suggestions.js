const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  suggestionTitle: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Suggestion", suggestionSchema);