import express from "express";
import { handleGeneateShortUrl } from "../controllers/urlShortner.controller.js";

const router = express.Router();

router.get("/", handleGeneateShortUrl);

export default router;
