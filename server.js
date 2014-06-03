var net = require('net');

var server = net.createServer(function(c) { // Connection Socket Object
  console.log('Server Connected');

  var inData = [];

  c.on('data', function(b) { // Buffer Object
    data = b.toString('utf8');
    inData = data.split('\r\n');

    console.log('Received Request: ' + inData[0]);

    /**
     * Print information in order to understand the request
     *
    console.log(data.replace(/\r\n/g, '**CRLF**\n'));
    var i;
    for (i = 0; i < b.length; i++) {
      process.stdout.write(b[i].toString(16) + ' ');
      if (b[i] == 10) {
        process.stdout.write('\n');
      }
    }
    */

    // Now that we received the input,
    // we send the output
    var http_version = 'HTTP/1.1';
    var status_code = '200';
    var reason_phrase = 'OK';
    var CRLF = '\r\n';

    var responseArray = [];
    responseArray.push(http_version);
    responseArray.push(status_code);
    responseArray.push(reason_phrase);
    responseArray.push(CRLF);
    var response_head = responseArray.join(' ') + CRLF;
    var response_body = '<h1>Hola!</h1>';
    var response = response_head + response_body;

    c.write(response, 'utf8', function() {
      console.log('Wrote to Client');
      console.log(response);
      c.end();
    });


  });

  c.on('end', function() {
    console.log('Server Disconnected');
  });
});

server.listen(8000, function() {
  console.log('Server Bound');
});
