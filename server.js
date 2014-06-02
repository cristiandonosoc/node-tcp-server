var net = require('net');

var server = net.createServer(function(c) { // Connection Socket Object
  console.log('Server Connected');

  var inData = [];


  c.on('data', function(b) { // Buffer Object
    data = b.toString('utf8');
    inData = data.split('\r\n');
    console.log(inData.length);
  });

  c.on('end', function() {
    console.log('Server Disconnected');
  });
});

server.listen(8000, function() {
  console.log('Server Bound');
});
