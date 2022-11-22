const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
//require("./config")(app);



require("./config/session.config")(app);

require("dotenv/config");


// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const countryRouter = require("./routes/country-route");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/", countryRouter);



mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

app.listen(3000);

