const bcryptjs = require("bcryptjs");
const User = require("../models/User.model.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const signupPostController = (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    res.render("signup.hbs", {
      errorMessage: "Sorry there is no username or password",
    });
    return;
  }
  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (foundUser) {
        res.send("sorry  user already exists");
        return;
      }

      const myHashedPassword = bcryptjs.hashSync(req.body.password);
      return User.create({
        email: req.body.email,
        password: myHashedPassword,
      });
    })
    .then((createdUser) => {
      console.log("heres the new user", createdUser);
      res.send(createdUser);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const loginPostController = (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    res.render("login.hbs", {
      errorMessage: "Sorry there is no username or password",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.render("login.hbs", {
          errorMessage: "User does not exist",
        });
        return;
      }
      const isValidPassword = bcryptjs.compareSync(
        password,
        foundUser.password
      );

      if (!isValidPassword) {
        res.render("login.hbs", { errorMessage: "Sorry wrong password" });
        return;
      }
      req.session.user = foundUser;

      //   res.render("profile.hbs", foundUser);
      res.redirect("/");
    })

    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
module.exports = {
  signupPostController,
  loginPostController,
};
