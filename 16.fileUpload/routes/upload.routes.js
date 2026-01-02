import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadToCloudinary } from "../services/cloudinary.js";
import fs from "fs";

const router = express.Router();

// POST /upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.path);

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "File uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
