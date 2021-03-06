const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true, 
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  discriminator: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("User", userSchema);