const { getCities } = require('../database/queries/getCities');
const { addCity } = require('../database/queries/addCity');

exports.getAllCities = (req, res, next) => {
  getCities()
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
};

exports.add = (req, res, next) => {
  const cityInfo = req.body;
  addCity(cityInfo)
    .then(() => res.redirect('/'))
    .catch(err => next(err));
};
