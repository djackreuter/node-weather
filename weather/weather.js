const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/555043ed4e082f1418d2cd042d2ac61c/${lat},${lng}`,
    json: true
  }, (err, resp, body) => {
    if (!err && resp.statusCode === 200) {
      callback(undefined, {
        summary: body.currently.summary,
        temperature: body.currently.temperature,
        feelsLike: body.currently.apparentTemperature,
        chanceOfPrecip: body.currently.precipProbability,
        humidity: body.currently.humidity * 100,
        wind: body.currently.windSpeed
      });
    } else {
      callback('Unable to fetch weather', err);
    }
  });
};

module.exports.getWeather = getWeather;