var net = require('net');
var fs = require('fs');
var encoder = new require('node-html-encoder').Encoder();

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
    var httpVersion = 'HTTP/1.1';
    var statusCode = '200';
    var reasonPhrase = 'OK';
    var CRLF = '\r\n';

    var responseArray = [];
    responseArray.push(httpVersion);
    responseArray.push(statusCode);
    responseArray.push(reasonPhrase);
    responseArray.push(CRLF);

    // HEADERS
    var responseHeaders = responseArray.join(' ') + CRLF;

    // <HEAD>
    var responseHead = '<!DOCTYPE html><html><head>' +
      '<script type="text/javascript">' +
        fs.readFileSync('js/shCore.js') +
      '</script>' +
      '<script type="text/javascript">' +
        fs.readFileSync('js/shBrushJScript.js') +
      '</script>' +
      '<style type="text/css">' +
        fs.readFileSync('css/shCore.css') +
      '</style>' +
      '<style type="text/css">' +
        fs.readFileSync('css/shThemeDefault.css') +
      '</style>' +
      '<title>NSHS</title>' +
    '</head>';

    // <BODY>
    var responseBody = '<body onload="SyntaxHighlighter.highlight();">';
    responseBody += '<h1>Hola Wooo!</h1>';
    var fileData = fs.readFileSync('server.js');
    responseBody += '<pre class="brush: js;">' +
      encoder.htmlEncode(fileData.toString()) +
    '</pre>';
    responseBody += '</body></html>';

    // The complete response
    var response = responseHead + responseBody;

    // We send the response
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
