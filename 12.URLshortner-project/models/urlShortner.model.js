import mongoose from "mongoose";

const urlShortnerSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const urlShortnerModel = mongoose.model("url", urlShortnerSchema);
export default urlShortnerModel;
