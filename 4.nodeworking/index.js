const { error } = require("console");
const os = require("os");
const fs = require("fs");

console.log("iam first");

//blocking
// this line of code blocks the "im end" that is why it is blocking and blocks the nect line of the code since it is a synchronous
const result = fs.readFileSync("file.txt", "utf-8");
console.log(result);

//non-blocking
// in this "im end is stilll suning and even if this line of code take time or crashes the next line wil execute and this line will have enough time to process "
fs.readFile("file.txt", "utf-8", (error, resuly) => {
  console.log(resuly);
});

console.log("im end");

//Deafault Thread Pool size = 4
console.log(os.cpus().length);
