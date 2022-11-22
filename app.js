
//require("./db");
const express = require("express");
const hbs = require("hbs");

const app = express();
//require("./config")(app);


const countryRouter = require("./routes/country-route");

app.use("/", countryRouter);

app.listen(3000)
