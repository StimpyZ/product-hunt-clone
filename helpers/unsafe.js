const http = require('http');

function handleRequest(req, res) {
  const userInput = req.url.split('?q=')[1];
  // Unsafe: code injection via eval
  const result = eval(userInput);
  res.end(String(result));
}

http.createServer(handleRequest).listen(3001);
