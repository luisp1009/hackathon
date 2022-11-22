const router = require("express").Router();
const axios = require("axios");


router.get("/", (req, res, next) => {
  res.render("home.hbs");
});

router.get("/searchCountry", (req, res, next) => {
  axios
    .get(
      `https://restcountries.com/v3.1/name/${req.query.countryName}?fullText=true`
    )
    .then((responseFromAPI) => {
        let countryData = responseFromAPI.data[0]
console.log("RESPONSE:", countryData)

      res.render("searchedRoom.hbs", countryData)
    })
    .catch(err => {
console.log(err)
res.send(err)
} )
});






module.exports = router