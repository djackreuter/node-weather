const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (err, resp, body) => {
      if (err) {
        reject('Unable to connect to Google servers')
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that location');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        });
      }
    });
  });
}


geocodeAddress('87110').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (err) => {
  console.log('Error', err);
});