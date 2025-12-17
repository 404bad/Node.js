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
  } catch (error) {
    return res.status(500).json({ error: "Failed : Internal Server Error" });
  }
};
