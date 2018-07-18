const request = require('request');
const yargs = require('yargs');

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

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20michigan%20ave%20chicago',
  json: true
}, (err, resp, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Lat: ${body.results[0].geometry.location.lat}`);
  console.log(`Lng: ${body.results[0].geometry.location.lng}`);
});