const request = require('request');

var geocodeAddress = (address, callback) => {
  var address = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (err, resp, body) => {
    if (err) {
      callback('Unable to connect to Google servers')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that location');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;

