const { model } = require("mongoose");

const Schema = require("mongoose").Schema;

const userSchema = new Schema({
  email: String,
  password: String,
});

const User = model("User", userSchema);

module.exports = User;
