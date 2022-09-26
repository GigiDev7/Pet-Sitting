const findAllCountries = require("../services/countryServices");

const getCountries = async (req, res, next) => {
  try {
    const countries = await findAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};

module.exports = getCountries;
