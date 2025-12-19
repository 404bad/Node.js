import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import urlRoutes from "./routes/urls.route.js";
import { renderUrlsTable } from "../src/controllers/urls.controler.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

///middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.get("/", renderUrlsTable);
app.use("/", urlRoutes);

export default app;
