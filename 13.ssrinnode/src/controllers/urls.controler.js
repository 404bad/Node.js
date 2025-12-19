import urlModel from "../models/urls.model.js";
import { generateShortId } from "../utils/genarteNanoid.js";

//handle generate shortcode
export const handleGenerateShortId = async (req, res) => {
  try {
    const ogUrl = req.body;
    if (!ogUrl) {
      return res.status(400).json({ message: "Bad Request : Enter you url" });
    }
    const shortId = generateShortId();
    await urlModel.create({
      shortId,
      redirectUrl: ogUrl.url,
      visitHistory: [],
    });
    res.status(201).json({
      message: "Created",
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Internal Server Error" });
    res.render("index");
  }
};

//Handle redirection
export const handleRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await urlModel.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Handle Click Analytics
export const handleUrlAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const result = await urlModel.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ message: "error :  Url not Found" });
    }
    if (result.visitHistory.length === 0) {
      return res.status(200).json({
        success: true,
        totalClicks: 0,
        visitHistory: [],
        message: "No visits for entered Url",
      });
    }
    return res.status(200).json({
      success: true,
      totalClicks: result.visitHistory.length,
      visitHistory: result.visitHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const renderUrlsTable = async (req, res) => {
  try {
    const urls = await urlModel.find({}).sort({ createdAt: -1 });
    const urlsWithFull = urls.map((u) => ({
      ...u._doc,
      fullUrl: `${req.protocol}://${req.get("host")}/${u.shortId}`,
    }));
    res.render("index", { urls: urlsWithFull });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
