import express from "express";
// import {
//   restrictToLoggedinUserOnly,
//   checkAuth,
// } from "../middleware/authStateful.middleware.js";

import {
  checkForAuthentication,
  restrictTo,
} from "../middleware/authStateless.middleware.js";

import {
  handleGenerateShortid,
  handleRedirectUrl,
  handleGetAnalytics,
  handleGetAllUrls,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", checkForAuthentication, handleGenerateShortid);
router.get("/:shortId", handleRedirectUrl);

router.get("/analytics/:shortId", checkForAuthentication, handleGetAnalytics);
router.get("/", checkForAuthentication, restrictTo("admin"), handleGetAllUrls);

export default router;
