module.exports = function request(config) {
  return new Promise(function (resolve) {
    var request = require('http').request({
      hostname: 'localhost',
      port: config.port,
      path: config.path,
      method: 'POST',
    });

    request.on('response', function (response) {
      response.body = [];
      response.on('data', function (data) {
        response.body.push(data.toString());
      })
      response.on('end', function () {
        response.body = response.body.join('');
        resolve(response);
      });
    });

    request.write(config.body);

    request.end();
  });
};