const { error, log } = require("console");
const fs = require("fs");

//sync
fs.writeFileSync("./test.txt", "hello world");

//async
fs.writeFile("./test.txt", "hello world Async", (error) => {});

//sync
const resilt = fs.readFileSync("./test.txt", "utf-8");
console.log(resilt);

//async
fs.readFile("./test.txt", "utf-8", (error, result2) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result2);
  }
});

//append
fs.appendFileSync("./test.txt", "\nkailash");

//copy
fs.cpSync("./test.txt", "./copy.txt");

//delete a file
fs.unlinkSync("copy.txt");

//status of a file
console.log(fs.statSync("./test.txt"));

//make a directory
fs.mkdirSync("test-folder");
