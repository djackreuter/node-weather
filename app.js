const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  },
}).help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.a, (err, results) => {
  if (err) {
    console.log('Error: ', err);
  } else {
    console.log('Weather for: ', results.address);
    weather.getWeather(results.lat, results.lng, (errMsg, weatherResults) => {
      if (errMsg) {
        console.log(errMsg);
      } else {
        console.log(weatherResults.summary);
        console.log(`Current temperature: ${weatherResults.temperature}`);
        console.log(`Feels like: ${weatherResults.feelsLike}`);
        console.log(`Chance of precip: ${weatherResults.chanceOfPrecip}%`);
        console.log(`Humidity: ${weatherResults.humidity}%`);
        console.log(`Wind: ${weatherResults.wind} mph`);
      }
    });
  }
});