import fs from "fs";

function logReqRes(filename) {
  return (req, res, next) => {
    const logData = `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`;
    fs.appendFile(filename, logData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "InternaL Server Error" });
      }
      next();
    });
  };
}

export default logReqRes;
