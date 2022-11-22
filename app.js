const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
//require("./config")(app);

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const countryRouter = require("./routes/country-route");

app.use("/", countryRouter);

app.listen(3000);
