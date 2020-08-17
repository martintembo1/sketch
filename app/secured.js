const http = require('http');
const https = require('https');
const fs = require('fs');
const httpsOptions = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/cert.pem')
    };
const app = function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
  }
console.log('Secured')
http.createServer(app).listen(8888);
https.createServer(httpsOptions, app).listen(4433);