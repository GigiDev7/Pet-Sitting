require("dotenv").config();
require("./connectDB");
const Country = require("./models/countrySchema");
const countries = require("./utils/countryData");

//add countries to db collection one time

(async () => {
  await Country.create(countries);
})();
