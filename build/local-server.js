const express = require('express');
const app = express();
var compression = require('compression');
app.use(compression());

app.use('/static', express.static('./dist/static'))
app.use('/test', express.static('./dist'))

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});