import express from "express";

import {
  handleGenerateShortid,
  handleRedirectUrl,
  handleGetAnalytics,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", handleGenerateShortid);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
