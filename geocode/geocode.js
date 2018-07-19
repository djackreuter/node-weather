const request = require('request');

var geocodeAddress = (address) => {
  var address = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (err, resp, body) => {
    if (err) {
      console.log('Unable to connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to find that location');
    } else if (body.status === 'OK') {
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Lat: ${body.results[0].geometry.location.lat}`);
      console.log(`Lng: ${body.results[0].geometry.location.lng}`);
    }
  });
}




module.exports.geocodeAddress = geocodeAddress;

