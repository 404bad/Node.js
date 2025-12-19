import express from "express";
import {
  handleGenerateShortId,
  handleRedirectUrl,
  handleUrlAnalytics,
} from "../controllers/urls.controler.js";

const router = express.Router();

router.post("/api/urls", handleGenerateShortId);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleUrlAnalytics);

export default router;
