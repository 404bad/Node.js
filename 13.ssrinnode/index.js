import dotenv from "dotenv";
import app from "./src/app.js";

import connectDb from "./src/config/mongo.config.js";

dotenv.config();

connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Server not started");
  });
