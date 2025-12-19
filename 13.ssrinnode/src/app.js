import express from "express";
import urlRoutes from "./routes/urls.route.js";

const app = express();

///middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from SSR ");
});

app.use("/", urlRoutes);

export default app;
