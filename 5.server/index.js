const http = require("http");
const fs = require("fs");

// Create an HTTP server instance
const myServer = http.createServer((req, res) => {
  //   console.log(req);
  const log = `${Date.now()}: ${req.url} New Request Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    if (err) {
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }
    switch (req.url) {
      case "/":
        res.end("Hello from server");
        break;
      case "/about":
        res.end("Iam Kailash Badu");
        break;
      default:
        res.end("404 Not Found");
    }
  });
});

// Start the server and listen on port 8000
myServer.listen(8000, () => {
  console.log("server started");
});
