import { generateNanoid } from "../utils/generateNanoid.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import urlModel from "../models/url.model.js";

// Handle Generate ShortID
export const handleGenerateShortid = catchAsync(async (req, res) => {
  const { url } = req.body;
  if (!url) {
    throw new AppError("All fields are required", 400);
  }
  const shortId = generateNanoid();
  await urlModel.create({
    shortId,
    redirectUrl: url,
    visitHistory: [],
  });
  res.status(201).json({
    message: "Created",
    shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
  });
});

// Handle Redirect Url
export const handleRedirectUrl = catchAsync(async (req, res) => {
  const shortId = req.params.shortId;
  //   console.log(shortId);
  const entry = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  //   console.log(entry);
  if (!entry) {
    throw new AppError("Short URL not found", 404);
  }
  return res.redirect(entry.redirectUrl);
});

// Handle get Analytics
export const handleGetAnalytics = catchAsync(async (req, res) => {
  const shortId = req.params.shortId;
  const result = await urlModel.findOne({ shortId });
  if (!result) {
    throw new AppError("error :  Url not Found", 404);
  }
  const clickCount = result.visitHistory.length;

  return res.status(200).json({
    success: true,
    totalClicks: clickCount,
    visitHistory: result.visitHistory,
  });
});
