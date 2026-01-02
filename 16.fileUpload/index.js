import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", uploadRoutes);

// Test page
app.get("/", (req, res) => {
  res.send(`
    <h2>Upload a file</h2>
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
