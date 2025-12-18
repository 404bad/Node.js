import { nanoid } from "nanoid";
import urlShortnerModel from "../models/urlShortner.model.js";

export const handleGeneateShortUrl = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url)
      return res.status(400).json({ message: "Bad Request : Enter you url" });
    const shortId = nanoid(8);
    await urlShortnerModel.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });
    return res.status(201).json({ message: "success", id: shortId });
  } catch (error) {
    return res.status(500).json({ error: "Failed : Internal Server Error" });
  }
};

export const handleRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await urlShortnerModel.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    // Handle auto Deletion Auto-delete if clicks > 10
    if (entry.visitHistory.length >= 10) {
      await urlShortnerModel.deleteOne({ shortId });

      return res.status(410).json({
        message: "This short URL has expired",
      });
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await urlShortnerModel.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Url Not Foundr" });
    }
    if (result.visitHistory.length === 0) {
      return res.status(200).json({
        success: true,
        totalClicks: 0,
        visitHistory: [],
        message: "No visits for this URL yet",
      });
    }

    return res.status(200).json({
      success: true,
      TotalClicks: result.visitHistory.length,
      visitHistory: result.visitHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
