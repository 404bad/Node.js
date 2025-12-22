import express from "express";
import {
  restrictToLoggedinUserOnly,
  checkAuth,
} from "../middleware/authStateful.middleware.js";

import {
  handleGenerateShortid,
  handleRedirectUrl,
  handleGetAnalytics,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", checkAuth, handleGenerateShortid);
router.get("/:shortId", handleRedirectUrl);

router.get("/analytics/:shortId", checkAuth, handleGetAnalytics);

export default router;
