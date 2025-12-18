import express from "express";
import {
  handleGeneateShortUrl,
  handleRedirectUrl,
  handleAnalytics,
} from "../controllers/urlShortner.controller.js";

const router = express.Router();

router.post("/api/url", handleGeneateShortUrl);
router.get("/:shortId", handleRedirectUrl);
router.get("/api/analytics/:shortId", handleAnalytics);

export default router;
