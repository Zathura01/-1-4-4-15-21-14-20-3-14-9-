const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: String,
  Useremail: String,
  Password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
