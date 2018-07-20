var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Args must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(2, '7').then((res) => {
  console.log('Result:', res);
  return asyncAdd(res, 4);
}).then((res) => {
  console.log('New result', res);
}).catch((err) => {
  console.log(err);
});

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey it worked');
//     reject('Error');
//   }, 2500);
// });

// // to actually do something when the promise gets either resolved or rejected
// // you need to call .then()
// somePromise.then((message) => {
//   console.log('Success', message);
// }, (errorMsg) => {
//   console.log('Error', errorMsg);
// })

