const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from the server");
});

app.get("/about", (req, res) => {
  return res.send("About Page");
});

// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//   console.log("Server started");
// });
app.listen(8000, () => {
  console.log("Server Started");
});
