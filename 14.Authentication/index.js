import dotenv from "dotenv";
import app from "./src/app.js";
import connectDb from "./src/config/mongo.config.js";

dotenv.config();

const PORT = process.env.PORT;
const DB = process.env.MONGO_URI;

connectDb(DB)
  .then(() => {
    app.listen(PORT || 5000, () => {
      console.log(`Server is running at http://localhost:/${PORT}`);
    });
  })
  .catch(() => {
    console.log("Server not started");
  });
