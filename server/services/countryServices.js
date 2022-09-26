const Country = require("../models/countrySchema");

const findAllCountries = () => {
  return Country.find();
};

module.exports = findAllCountries;
