const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");

const {
  signupPostController,
  loginPostController,
} = require("../controllers/auth.controllers");

const {
  isLoggedin,
  isAnon,
  isPublic,
} = require("../middlewares/auth.middlewares.js");

router.get("/", isPublic, (req, res, next) => {
  res.render("home.hbs");
});

router.get(
  "/searchCountry",
  (req, res, next) => {
    if (!req.session.user) {
      res.redirect("/log-in");
      return;
    }
    next();
  },
  (req, res, next) => {
    axios
      .get(
        `https://restcountries.com/v3.1/name/${req.query.countryName}?fullText=true`
      )
      .then((responseFromAPI) => {
        let countryData = responseFromAPI.data[0];
        console.log("RESPONSE:", countryData);

        res.render("searchedRoom.hbs", countryData);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
);

//SIGN UP

router.get("/sign-up", isAnon, (req, res, next) => {
  res.render("signup.hbs");
});

router.post("/sign-up", isAnon, signupPostController);

//SIGNUP END

//LOG IN

router.get("/log-in", isAnon, (req, res, next) => {
  res.render("login.hbs");
});

router.post("/log-in", isAnon, loginPostController);

//LOG IN END

//PROFILE

router.get("/profile", isLoggedin, (req, res, next) => {
  console.log(req.session);

  axios
    .get(
      `https://restcountries.com/v3.1/name/${req.session.user.favoriteCountry}`
    )
    .then((responseFromAPI) => {
      let countryData = responseFromAPI.data[0];
      console.log("RESPONSE:", countryData);

      res.render("profile.hbs", {
        user: req.session.user,
        country: countryData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//PROFILE END

// LOG OUT
router.post("/logout", isLoggedin, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

router.post("/favorite/:countryName", (req, res, next) => {
  // res.send(req.params.countryName)

  User.findByIdAndUpdate(
    req.session.user._id,
    {
      favoriteCountry: req.params.countryName,
    },
    {
      new: true,
    }
  )
    .then((updatedUser) => {
      req.session.user = updatedUser;
      console.log(updatedUser);
      res.send(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
