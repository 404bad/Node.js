import fs from "fs";
import path from "path";

// Logs folder inside src/
const logDir = path.join(process.cwd(), "src", "logs");

// Ensure logs folder exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Log file paths
const accessLogPath = path.join(logDir, "access.log");
const errorLogPath = path.join(logDir, "errorlog.txt");

fs.access(accessLogPath, fs.constants.F_OK, (err) => {
  if (err) fs.writeFile(accessLogPath, "", (err) => err && console.error(err));
});
fs.access(errorLogPath, fs.constants.F_OK, (err) => {
  if (err) fs.writeFile(errorLogPath, "", (err) => err && console.error(err));
});

// Log route access
export const logAccess = (req) => {
  const logMessage = `${new Date().toISOString()} [${req.method}] ${
    req.originalUrl
  }\n`;
  fs.appendFile(accessLogPath, logMessage, "utf8", (err) => {
    if (err) console.error("Failed to write access log:", err);
  });
};

// Log errors
export const logError = (err) => {
  const logMessage = `${new Date().toISOString()} [ERROR] ${
    err.stack || err
  }\n`;
  fs.appendFile(errorLogPath, logMessage, "utf8", (err) => {
    if (err) console.error("Failed to write error log:", err);
  });
};
