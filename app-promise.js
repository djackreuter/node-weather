const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/555043ed4e082f1418d2cd042d2ac61c/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((res) => {
  console.log(`currently: ${res.data.currently.temperature}`);
  console.log(`Summary: ${res.data.currently.summary}`);
  console.log(`Feels like: ${res.data.currently.apparentTemperature}`);
  console.log(`Chance of precip: ${res.data.currently.precipProbability}%`);
  console.log(`Humidity: ${res.data.currently.humidity * 100}`);
  console.log(`Wind: ${res.data.currently.windSpeed}`);
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('Error: Unable to connect to servers');
  } else {
    console.log(err.message);
  }
});

