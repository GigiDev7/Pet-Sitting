const Country = require("../models/countrySchema");

const findAllCountries = () => {
  return Country.find().select("country city -_id");
};

module.exports = findAllCountries;
