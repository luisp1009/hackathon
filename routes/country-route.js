const router = require("express").Router();
const axios = require("axios");


// router.get("/", (req, res, next) => {
//     let countryName = req.query.countryName
//     let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    
//     axios.get(finalURL)
// .then(responseFromAPI => {
//         console.log(responseFromAPI)
//         console.log(responseFromAPI.data)
//         res.send(responseFromAPI.data)
//       res.render("layout.hbs");
//     })
//     .catch((err)=>{
// console.log(err.response.data)
// res.send('error')
//     })
    
// }) 

// router.get("/home")



// router.get("/characters/:id", (req, res, next) => {
//   axios
//     .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
//     .then((responseFromAPI) => {
//       // console.log("details: ", responseFromAPI.data)
//       res.render("characters/details-character", {
//         character: responseFromAPI.data,
//       });
//     })
//     .catch((err) => console.error(err));
// });


router.get("/", (req,res,next) => { 
      res.render("home.hbs")
    
  })

router.get("/searchCountry", (req, res, next) => {
axios.get(
       `https://restcountries.com/v3.1/name/${req.query.countryName}?fullText=true`
     ) .then(responseFromAPI => {
 res.send(responseFromAPI.data)
     })

})

module.exports = router;