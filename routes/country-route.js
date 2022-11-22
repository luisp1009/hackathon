const router = require("express").Router();
const axios = require("axios");


router.get("/", (req, res, next) => {
    let countryName = req.query.countryName
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    axios.get(finalURL)
    .then(responseFromAPI => {
        console.log(responseFromAPI)
        console.log(responseFromAPI.data)
        res.send(responseFromAPI.data)
    })
    .catch((err)=>{
console.log(err.response.data)
res.send('error')
    })
    
}) 

router.post("/searchCountry", (req, res, next) => {

})

module.exports = router;