const { model } = require("mongoose");

const Schema = require("mongoose").Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  favoriteCountry: {
    type: String,
    default: 'USA'
  }
});

const User = model("User", userSchema);

module.exports = User;
