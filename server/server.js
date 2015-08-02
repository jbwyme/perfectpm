var routedApp = require('./routed-app');
var config = require('../config/base.json');

var server = routedApp.listen(config.host.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
