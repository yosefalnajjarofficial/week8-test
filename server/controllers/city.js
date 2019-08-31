const { getCities } = require('../database/queries/getCities');
const { addCity } = require('../database/queries/addCity');

exports.getAllCities = (req, res) => {
  getCities()
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => console.log('err:', err));
};

exports.add = (req, res) => {
  const cityInfo = req.body;
  addCity(cityInfo)
    .then(() => res.redirect('/'))
    .catch(err => console.log('err:', err));
};
